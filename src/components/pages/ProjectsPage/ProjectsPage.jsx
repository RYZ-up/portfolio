import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FiChevronDown, FiChevronUp, FiPause, FiPlay } from 'react-icons/fi';
import { motion, useDragControls, useIsPresent, useReducedMotion } from 'motion/react';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import { gallery } from '../../../data/projects.js';
import ProjectDetails from './ProjectDetails.jsx';
import './ProjectsPage.css';

const SWIPE_PX = 50;
const SWIPE_VELOCITY = 400; // px/s: a quick flick counts even over a short distance
const WHEEL_COOLDOWN = 450;
// Soft spring: slides overshoot just a touch and settle, like the header on the home page.
const BOUNCE = { type: 'spring', stiffness: 190, damping: 20, mass: 0.9 };
const pad = n => String(n).padStart(2, '0');

/** Distance from the current slide: a straight row, first image centred, no wrap-around. */
const offsetOf = (i, index) => i - index;

/**
 * An image, or a video that plays while its slide is the centred one. A click
 * (not a drag) on the centred video pauses / resumes it.
 */
function Media({ item, active, alt, blocked }) {
  const { t } = useI18n();
  const ref = useRef(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    setPaused(false);
    if (active) v.play()?.catch(() => {});
    else v.pause();
  }, [active]);

  if (item.type !== 'video') {
    return <img src={item.src} alt={alt} draggable={false} decoding="async" loading="lazy" />;
  }
  const toggle = () => {
    const v = ref.current;
    if (!v || blocked()) return;
    if (v.paused) {
      v.play()?.catch(() => {});
      setPaused(false);
    } else {
      v.pause();
      setPaused(true);
    }
  };
  return (
    <>
      <video
        ref={ref}
        src={item.src}
        poster={item.poster}
        muted
        loop
        playsInline
        preload={active ? 'auto' : 'none'}
        aria-label={alt}
        className={active ? 'is-live' : undefined}
      />
      {active && (
        <button
          type="button"
          className={`showcase__pp${paused ? ' is-paused' : ''}`}
          onClick={toggle}
          aria-label={paused ? t('showcase.play') : t('showcase.pause')}
        >
          {paused ? <FiPlay aria-hidden /> : <FiPause aria-hidden />}
        </button>
      )}
    </>
  );
}

/** One project's coverflow over all its images: the centred image is lit, its neighbours dimmed and shadowed. */
function Carousel({ project, number }) {
  const { t } = useI18n();
  const { id, tags, year, status } = project;
  const media = project.media ?? [];
  const N = media.length;
  const desc = t(`g.${id}.desc`);
  // Optional longer write-up: add a `g.<id>.detail` string (paragraphs separated by a blank line).
  const detailKey = `g.${id}.detail`;
  const extra = t(detailKey) === detailKey ? '' : t(detailKey);
  const sentences = desc.split(/(?<=[.!?])\s+/).filter(Boolean);
  const [index, setIndex] = useState(0);
  const lastWheel = useRef(0);
  const stageRef = useRef(null);
  const reduce = useReducedMotion();
  const spring = reduce ? { duration: 0 } : BOUNCE;

  const step = useCallback(dir => setIndex(i => Math.min(N - 1, Math.max(0, i + dir))), [N]);

  // Horizontal trackpad / shift-wheel moves the carousel; plain vertical scroll keeps scrolling the page.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return undefined;
    const onWheel = e => {
      const dx = e.deltaX || (e.shiftKey ? e.deltaY : 0);
      if (Math.abs(dx) < 12 || Math.abs(dx) < Math.abs(e.deltaY) * (e.shiftKey ? 0 : 1)) return;
      e.preventDefault();
      const now = performance.now();
      if (now - lastWheel.current < WHEEL_COOLDOWN) return;
      lastWheel.current = now;
      step(dx > 0 ? 1 : -1);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [step]);

  // The whole row follows the finger (elastic), then springs back to rest with
  // a bounce while the slides settle on the new centre — like the home gallery.
  const controls = useDragControls();
  const dragged = useRef(false);
  const onPointerDown = e => {
    controls.start(e);
  };
  const onDragEnd = (_, info) => {
    const { x } = info.offset;
    const v = info.velocity.x;
    if (x < -SWIPE_PX || v < -SWIPE_VELOCITY) step(1);
    else if (x > SWIPE_PX || v > SWIPE_VELOCITY) step(-1);
    setTimeout(() => (dragged.current = false), 0);
  };
  const onKeyDown = e => {
    if (e.key === 'ArrowLeft') step(-1);
    else if (e.key === 'ArrowRight') step(1);
  };

  return (
    // The entrance animation lives on an inner wrapper: a transform on the snapping
    // <section> itself would shift its snap position and land the project off-place.
    <section className="showcase__section" aria-roledescription="carousel" aria-label={t(`g.${id}.name`)}>
      <motion.div
        className="showcase__inner"
        initial={reduce ? false : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={spring}
      >
      <div
        ref={stageRef}
        className="showcase__stage"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
      >
        <motion.div
          className="showcase__track"
          drag="x"
          dragControls={controls}
          dragListener={false}
          dragSnapToOrigin
          dragElastic={0.35}
          dragConstraints={{ left: 0, right: 0 }}
          dragTransition={{ bounceStiffness: 260, bounceDamping: 16 }}
          onDragStart={() => (dragged.current = true)}
          onDragEnd={onDragEnd}
        >
        {media.map((item, i) => {
          const o = offsetOf(i, index);
          const abs = Math.abs(o);
          if (abs > 3) return null;
          const current = o === 0;
          return (
            <motion.figure
              key={item.src}
              className={`showcase__slide${current ? ' is-current' : ''}`}
              style={{ zIndex: 10 - abs, '--bg': `url("${item.poster || item.src}")` }}
              initial={false}
              animate={{
                x: `${o * 102}%`,
                opacity: abs > 2 ? 0 : 1
              }}
              transition={spring}
              aria-hidden={!current}
              onClick={!current && abs <= 2 ? () => !dragged.current && step(o) : undefined}
            >
              <Media item={item} active={current} blocked={() => dragged.current} alt={`${t(`g.${id}.name`)} — ${t('g.image')} ${i + 1}`} />
              <motion.span
                className="showcase__shade"
                initial={false}
                animate={{ opacity: current ? 0 : Math.min(0.35 + abs * 0.2, 0.8) }}
                transition={{ duration: 0.5 }}
              />
            </motion.figure>
          );
        })}
        </motion.div>
      </div>

      <header className="showcase__head">
        <span className="showcase__badge">
          {pad(number)} · {year} · {t(`g.${status}`)}
        </span>
        <h2 className="showcase__title">{t(`g.${id}.name`)}</h2>
        <span className="showcase__count" aria-live="polite">
          {pad(index + 1)} <i>/ {pad(N)}</i>
        </span>
      </header>

      <div className="showcase__detail">
        <section className="showcase__col">
          <h3>{t('showcase.about')}</h3>
          <p>{desc}</p>
          {extra && extra.split('\n\n').map((para, k) => <p key={k}>{para}</p>)}
        </section>
        <section className="showcase__col">
          <h3>{t('showcase.points')}</h3>
          <ul className="showcase__points">
            {sentences.map((line, k) => (
              <li key={k}>{line}</li>
            ))}
          </ul>
        </section>
        <section className="showcase__col">
          <h3>{t('showcase.stack')}</h3>
          <ul className="showcase__tags">
            {tags.map(tag => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <h3>{t('showcase.sheet')}</h3>
          <dl className="showcase__sheet">
            <dt>{t('showcase.year')}</dt>
            <dd>{year}</dd>
            <dt>{t('showcase.status')}</dt>
            <dd>{t(`g.${status}`)}</dd>
            <dt>{t('showcase.images')}</dt>
            <dd>{N}</dd>
          </dl>
        </section>
      </div>

      <ProjectDetails project={project} />
      </motion.div>
    </section>
  );
}

/**
 * Scroll aim-assist, JS only (no CSS scroll-snap: its proximity snapping jumped
 * across the tall projects and fought the arrow buttons, which read as the
 * screen "teleporting"). It waits until the scroll has been idle, then eases the
 * last stretch when a project's top is already close under the nav bar. Any
 * wheel / touch / key / pointer input cancels it at once, and it never runs
 * while a finger or button is down, so it can only ever finish a scroll.
 */
function useScrollAssist() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let idleTimer = 0;
    let raf = 0;
    let lastInput = 0;
    let down = false;

    const cancel = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const glide = delta => {
      const from = window.scrollY;
      const start = performance.now();
      const dur = Math.min(420, 160 + Math.abs(delta) * 0.9);
      const tick = now => {
        const p = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        window.scrollTo(0, from + delta * eased);
        raf = p < 1 ? requestAnimationFrame(tick) : 0;
      };
      raf = requestAnimationFrame(tick);
    };
    const settle = () => {
      if (down || performance.now() - lastInput < 300) return;
      const nav = parseFloat(getComputedStyle(root).getPropertyValue('--nav-height')) || 60;
      let best = null;
      document.querySelectorAll('.showcase__section').forEach(el => {
        const d = el.getBoundingClientRect().top - nav;
        if (best === null || Math.abs(d) < Math.abs(best)) best = d;
      });
      if (best === null || Math.abs(best) < 8 || Math.abs(best) > window.innerHeight * 0.12) return;
      if (reduce) window.scrollBy(0, best);
      else glide(best);
    };
    const onScroll = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(settle, 220);
    };
    const onInput = () => {
      lastInput = performance.now();
      cancel();
    };
    const onDown = () => {
      down = true;
      onInput();
    };
    const onUp = () => {
      down = false;
      lastInput = performance.now();
    };

    const inputs = ['wheel', 'touchstart', 'touchmove', 'keydown'];
    window.addEventListener('scroll', onScroll, { passive: true });
    inputs.forEach(e => window.addEventListener(e, onInput, { passive: true }));
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    window.addEventListener('pointercancel', onUp, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      inputs.forEach(e => window.removeEventListener(e, onInput));
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      clearTimeout(idleTimer);
      cancel();
    };
  }, []);
}

/** Up / down buttons (bottom right, mouse devices only): previous / next project. */
function ScrollArrows() {
  const { t } = useI18n();
  const present = useIsPresent();
  const [edge, setEdge] = useState({ top: true, bottom: false });

  const sections = () => [...document.querySelectorAll('.showcase__section')];
  const navH = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 60;
  const startOf = el => el.getBoundingClientRect().top + window.scrollY - navH();

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      setEdge({ top: window.scrollY < 4, bottom: atBottom });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const go = dir => {
    const list = sections();
    if (!list.length) return;
    const y = window.scrollY;
    const starts = list.map(startOf);
    let target;
    if (dir > 0) target = starts.find(v => v > y + 8);
    else {
      // Inside a project: back to its start first, then to the previous one.
      const before = starts.filter(v => v < y - 8);
      target = before.length ? before[before.length - 1] : 0;
    }
    if (target === undefined) target = document.documentElement.scrollHeight;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: Math.max(0, target), behavior: reduce ? 'auto' : 'smooth' });
  };

  return createPortal(
    <div className={`showcase__arrows${present ? '' : ' is-leaving'}`}>
      <button type="button" onClick={() => go(-1)} disabled={edge.top} aria-label={t('showcase.prev')}>
        <FiChevronUp aria-hidden />
      </button>
      <button type="button" onClick={() => go(1)} disabled={edge.bottom} aria-label={t('showcase.next')}>
        <FiChevronDown aria-hidden />
      </button>
    </div>,
    document.body
  );
}

/** The projects page: one carousel per project, stacked; the page scrolls vertically through them. */
export default function ProjectsPage() {
  useScrollAssist();
  return (
    <div className="showcase">
      <ScrollArrows />
      {gallery.filter(p => p.media?.length).map((p, i) => (
        <Carousel key={p.id} project={p} number={i + 1} />
      ))}
    </div>
  );
}
