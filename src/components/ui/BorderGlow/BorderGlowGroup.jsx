import { createContext, useContext, useEffect, useRef } from 'react';
import { isLowPower } from '../../../lib/device.js';

const BorderGlowGroupContext = createContext(null);

const FALLOFF_RADIUS = 420;

const CHASE_IDLE_DELAY = 1500;
const CHASE_TURN_MS = 2600;
const CHASE_RAMP_MS = 350;
const CHASE_GAP_MS = 1200;
const CHASE_ANGLE_START = 110;
const CHASE_ANGLE_END = 465;
const CHASE_PEAK_PROXIMITY = 90;

export function BorderGlowGroup({ children, className = '', falloffRadius = FALLOFF_RADIUS }) {
  const cardsRef = useRef(new Set());
  // Cards currently on screen (kept by an IntersectionObserver): the idle chase
  // and the pointer pass only ever touch these, so off-screen cards cost nothing.
  const visibleRef = useRef(new Set());
  const observerRef = useRef(null);
  const lastPointerMoveAtRef = useRef(0);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) visibleRef.current.add(entry.target);
        else visibleRef.current.delete(entry.target);
      }
    });
    observerRef.current = io;
    cardsRef.current.forEach(el => io.observe(el));
    return () => {
      io.disconnect();
      observerRef.current = null;
      visibleRef.current.clear();
    };
  }, []);

  const activeCards = () => (observerRef.current ? visibleRef.current : cardsRef.current);

  // When nobody has touched the mouse for a while, automatically replay the
  // same hover-glow effect on each registered card in turn, forever, a
  // "chase" light going around the page. The moment real pointer movement
  // resumes, this immediately steps aside so it never fights the real
  // mouse-follow glow above.
  useEffect(() => {
    // No idle chase for reduced motion, and none on touch screens: there is no
    // pointer to hand the glow over to, so it would just repaint the masked
    // glow layers forever for nothing.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia?.('(hover: none)').matches) return;
    // Small laptops: the chase is a permanent repaint of the most expensive
    // layers on the page, for a purely decorative effect. Skip it there.
    if (isLowPower) return;

    // Nothing runs while the visitor is active: a timer waits for the pointer
    // (and the scroll) to go quiet, and requestAnimationFrame only runs during
    // a turn. The chase is also refreshed at ~30 fps, which is plenty for a
    // slow sweep and halves its paint cost.
    let rafId = null;
    let timer = null;
    let chaseIndex = 0;
    let turnStart = null;
    let lastFrame = 0;
    let activeEl = null;

    const releaseActive = () => {
      if (!activeEl) return;
      activeEl.style.setProperty('--edge-proximity', '0');
      activeEl.classList.remove('sweep-active');
      activeEl = null;
    };

    const stop = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = null;
      clearTimeout(timer);
      timer = null;
      releaseActive();
      turnStart = null;
    };

    const schedule = delay => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        if (document.hidden) return schedule(CHASE_IDLE_DELAY);
        const idleFor = performance.now() - lastPointerMoveAtRef.current;
        if (idleFor < CHASE_IDLE_DELAY) return schedule(CHASE_IDLE_DELAY - idleFor);
        if (rafId === null) rafId = requestAnimationFrame(tick);
      }, delay);
    };

    const onActivity = () => {
      lastPointerMoveAtRef.current = performance.now();
      if (rafId !== null) stop();
      // The pending timer re-checks the idle time itself when it fires.
      if (timer === null) schedule(CHASE_IDLE_DELAY);
    };

    const tick = now => {
      rafId = requestAnimationFrame(tick);

      if (turnStart === null) {
        const cards = Array.from(activeCards());
        if (cards.length === 0) {
          stop();
          schedule(CHASE_GAP_MS);
          return;
        }
        chaseIndex = chaseIndex % cards.length;
        activeEl = cards[chaseIndex];
        activeEl.classList.add('sweep-active');
        turnStart = now;
        lastFrame = 0;
      }
      if (!activeEl) return;
      if (now - lastFrame < 30) return;
      lastFrame = now;

      const elapsed = now - turnStart;

      let proximity;
      if (elapsed < CHASE_RAMP_MS) {
        proximity = (elapsed / CHASE_RAMP_MS) * CHASE_PEAK_PROXIMITY;
      } else if (elapsed < CHASE_TURN_MS - CHASE_RAMP_MS) {
        proximity = CHASE_PEAK_PROXIMITY;
      } else {
        proximity = CHASE_PEAK_PROXIMITY * (1 - (elapsed - (CHASE_TURN_MS - CHASE_RAMP_MS)) / CHASE_RAMP_MS);
      }
      const angleT = Math.min(elapsed / CHASE_TURN_MS, 1);
      const angle = CHASE_ANGLE_START + (CHASE_ANGLE_END - CHASE_ANGLE_START) * angleT;

      activeEl.style.setProperty('--edge-proximity', `${Math.max(0, proximity).toFixed(3)}`);
      activeEl.style.setProperty('--cursor-angle', `${angle.toFixed(3)}deg`);

      if (elapsed >= CHASE_TURN_MS) {
        stop();
        chaseIndex += 1;
        schedule(CHASE_GAP_MS);
      }
    };

    schedule(CHASE_IDLE_DELAY);
    window.addEventListener('pointermove', onActivity, { passive: true });
    window.addEventListener('scroll', onActivity, { passive: true });
    window.addEventListener('keydown', onActivity);
    return () => {
      stop();
      window.removeEventListener('pointermove', onActivity);
      window.removeEventListener('scroll', onActivity);
      window.removeEventListener('keydown', onActivity);
    };
  }, []);

  useEffect(() => {
    const lastProximity = new WeakMap();
    // How close the pointer is to a card (0-100) and the angle from the card's
    // centre to the pointer.
    const measure = (clientX, clientY, rect) => {
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = clientX - cx;
      const dy = clientY - cy;

      const nearestX = Math.max(rect.left, Math.min(clientX, rect.right));
      const nearestY = Math.max(rect.top, Math.min(clientY, rect.bottom));
      const distance = Math.hypot(clientX - nearestX, clientY - nearestY);

      let proximity;
      if (distance === 0) {
        const halfW = rect.width / 2;
        const halfH = rect.height / 2;
        let kx = Infinity;
        let ky = Infinity;
        if (dx !== 0) kx = halfW / Math.abs(dx);
        if (dy !== 0) ky = halfH / Math.abs(dy);
        proximity = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1) * 100;
      } else {
        proximity = Math.max(0, 100 * (1 - distance / falloffRadius));
      }

      let angle = 0;
      if (dx !== 0 || dy !== 0) {
        const radians = Math.atan2(dy, dx);
        angle = radians * (180 / Math.PI) + 90;
        if (angle < 0) angle += 360;
      }
      return { proximity, angle };
    };

    const applyGlow = (el, proximity, angle) => {
      // Nothing to write when the value would not change (a card already at 0,
      // or a tiny move): each write re-styles and repaints the card.
      const prev = lastProximity.get(el) ?? 0;
      if (proximity <= 0 && prev === 0) return;
      if (Math.abs(proximity - prev) < 0.4 && proximity > 0) {
        el.style.setProperty('--cursor-angle', `${angle.toFixed(1)}deg`);
        return;
      }
      lastProximity.set(el, proximity <= 0 ? 0 : proximity);
      el.style.setProperty('--edge-proximity', proximity.toFixed(2));
      el.style.setProperty('--cursor-angle', `${angle.toFixed(1)}deg`);
    };

    // Style writes happen once per frame at most, in requestAnimationFrame;
    // layout is only ever read in the event handler (see below).
    let rafId = null;
    let pendingX = 0;
    let pendingY = 0;

    // Repainting a card's glow (masked conic gradients + blend modes + blurred
    // shadows) is the expensive part of the page, so when frames are already
    // arriving late the glow is refreshed every other frame instead of piling
    // more paint on top.
    let lastTs = 0;
    let slowFrames = 0;
    let skipThisFrame = false;

    const flushUpdate = ts => {
      rafId = null;
      const dt = ts - lastTs;
      lastTs = ts;
      if (dt > 24 && dt < 120) slowFrames = Math.min(slowFrames + 1, 4);
      else if (dt <= 20) slowFrames = Math.max(slowFrames - 1, 0);
      if (slowFrames >= 2) {
        skipThisFrame = !skipThisFrame;
        if (skipThisFrame) {
          rafId = requestAnimationFrame(flushUpdate);
          return;
        }
      }

      // The glow layers are forced to opacity 0 on any card that is not
      // hovered (BorderGlow.css), so only the card under the pointer needs its
      // variables: writing them on the others only re-styled their whole
      // subtree (the variables inherit) for nothing visible.
      const el = pendingCard;
      if (lastCard && lastCard !== el) applyGlow(lastCard, 0, 0);
      lastCard = el;
      if (!el || !pendingRect) return;
      const m = measure(pendingX, pendingY, pendingRect);
      applyGlow(el, m.proximity, m.angle);
    };

    // The hovered card's rect is read in the event handler, where layout is
    // still clean, and kept until the pointer changes card or the page
    // scrolls. Reading it inside requestAnimationFrame (after other frame
    // callbacks had written styles) forced a full synchronous style + layout
    // pass of the page on every frame.
    let pendingCard = null;
    let pendingRect = null;
    let lastCard = null;
    const handlePointerMove = e => {
      // Touch "moves" are scroll gestures: there is no cursor to follow.
      if (e.pointerType === 'touch') return;
      pendingX = e.clientX;
      pendingY = e.clientY;
      let card = e.target instanceof Element ? e.target.closest('.border-glow-card') : null;
      if (card && !cardsRef.current.has(card)) card = null;
      if (card !== pendingCard || !pendingRect) {
        pendingCard = card;
        pendingRect = card ? card.getBoundingClientRect() : null;
      }
      lastPointerMoveAtRef.current = performance.now();
      if (rafId === null) rafId = requestAnimationFrame(flushUpdate);
    };

    const forgetRect = () => {
      pendingRect = null;
    };

    const handlePointerLeave = () => {
      lastCard = null;
      pendingCard = null;
      pendingRect = null;
      cardsRef.current.forEach(el => {
        if (!lastProximity.get(el)) return;
        lastProximity.set(el, 0);
        el.style.setProperty('--edge-proximity', '0');
      });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', forgetRect, { passive: true });
    window.addEventListener('resize', forgetRect);
    // `pointerleave` never fires on window; the pointer leaving the page shows up
    // as `mouseleave` on the root element (and a blur when the window loses focus).
    document.documentElement.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('blur', handlePointerLeave);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', forgetRect);
      window.removeEventListener('resize', forgetRect);
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('blur', handlePointerLeave);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [falloffRadius]);

  // Touch screens do NOT get an on-screen equivalent of the hover glow: tried
  // once (a continuous requestAnimationFrame loop re-painting one card's
  // masked conic-gradients + blur + blend-mode layers, forever, while it sat
  // centred on screen), and it measured as a real, reported slowdown on
  // phones — exactly the cost this project already benchmarked and disabled
  // touch glow for elsewhere (see the perf notes in global.css/memory: masked
  // gradients + blur are the expensive part, not WebGL). Not reintroducing
  // it without a cheap way to do the same thing.

  const register = el => {
    cardsRef.current.add(el);
    observerRef.current?.observe(el);
  };
  const unregister = el => {
    cardsRef.current.delete(el);
    visibleRef.current.delete(el);
    observerRef.current?.unobserve(el);
  };

  return (
    <BorderGlowGroupContext.Provider value={{ register, unregister }}>
      <div className={className}>{children}</div>
    </BorderGlowGroupContext.Provider>
  );
}

export function useBorderGlowGroup() {
  return useContext(BorderGlowGroupContext);
}
