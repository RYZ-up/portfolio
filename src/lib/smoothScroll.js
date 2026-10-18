import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { isLowPower } from './device.js';

// Smoothed page scrolling (Lenis), desktop only: a mouse wheel on a real
// pointer, not on phones (native touch scrolling is already smooth and Lenis
// would only cost battery), not on small machines, not with reduced motion.
// Inner scroll areas (project panel, chat, left rail, menus) keep scrolling
// natively thanks to `allowNestedScroll`.
export function startSmoothScroll() {
  const ok =
    !isLowPower &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!ok) return null;
  const lenis = new Lenis({
    lerp: 0.11,
    wheelMultiplier: 1,
    allowNestedScroll: true,
    autoRaf: true
  });
  // Pause while a full-screen layer (project panel, phone menu) locks the page.
  const sync = () => {
    const locked = document.documentElement.classList.contains('fab-locked') || document.body.style.overflow === 'hidden';
    if (locked) lenis.stop();
    else lenis.start();
  };
  const mo = new MutationObserver(sync);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  mo.observe(document.body, { attributes: true, attributeFilter: ['style', 'class'] });
  return lenis;
}
