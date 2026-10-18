import { useCallback, useLayoutEffect, useRef } from 'react';

// Gooey Nav (after the React Bits / RareUI component): a pill that slides to
// the active item, and on click a burst of particles merged by an SVG "goo"
// filter. Returns refs for the list, the pill and the particle layer, plus a
// `burst(el)` to call from the click handler.
// Position of `el` inside `list`, from their screen boxes (offsetLeft would be
// relative to the item's own <li>). A transform on the list (the bar's layout
// animation) moves both boxes alike, so the difference stays right.
const boxIn = (el, list) => {
  const a = el.getBoundingClientRect();
  const b = list.getBoundingClientRect();
  return { x: a.left - b.left, y: a.top - b.top, w: a.width, h: a.height };
};

export default function useGooey(activeKey) {
  const listRef = useRef(null);
  const pillRef = useRef(null);
  const fxRef = useRef(null);

  const place = useCallback(() => {
    const list = listRef.current;
    const pill = pillRef.current;
    const el = list?.querySelector('[aria-current="page"]');
    if (!pill) return;
    if (!el) {
      pill.style.opacity = '0';
      return;
    }
    const r = boxIn(el, list);
    pill.style.opacity = '1';
    pill.style.transform = `translateX(${r.x}px)`;
    pill.style.width = `${r.w}px`;
    pill.style.height = `${r.h}px`;
    pill.style.top = `${r.y}px`;
  }, []);

  useLayoutEffect(() => {
    place();
  }, [activeKey, place]);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(place);
    ro.observe(list);
    document.fonts?.ready.then(place);
    return () => ro.disconnect();
  }, [place]);

  const burst = useCallback(el => {
    const fx = fxRef.current;
    const list = listRef.current;
    if (!fx || !list || !el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = boxIn(el, list);
    const cx = r.x + r.w / 2;
    const cy = r.y + r.h / 2;
    const N = 14;
    for (let i = 0; i < N; i++) {
      const p = document.createElement('i');
      const a = (Math.PI * 2 * i) / N + Math.random() * 0.4;
      const d = 34 + Math.random() * 30;
      p.className = 'gooey__particle';
      p.style.left = `${cx}px`;
      p.style.top = `${cy}px`;
      p.style.setProperty('--dx', `${Math.cos(a) * d}px`);
      p.style.setProperty('--dy', `${Math.sin(a) * d * 0.55}px`);
      p.style.setProperty('--s', (0.5 + Math.random() * 0.8).toFixed(2));
      p.style.animationDelay = `${Math.random() * 60}ms`;
      fx.appendChild(p);
      p.addEventListener('animationend', () => p.remove(), { once: true });
    }
  }, []);

  return { listRef, pillRef, fxRef, burst, place };
}
