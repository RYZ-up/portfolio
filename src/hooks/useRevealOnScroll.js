import { useEffect } from 'react';

// Cards fade and rise into place the first time they enter the screen,
// slightly staggered. Without IntersectionObserver (or with reduced motion)
// nothing is hidden at all.
export default function useRevealOnScroll(selector) {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const els = [...document.querySelectorAll(selector)];
    const root = document.documentElement;
    root.classList.add('reveal-ready');
    let batch = 0;
    let timer = 0;
    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.style.setProperty('--reveal-delay', `${Math.min(batch, 6) * 70}ms`);
          batch++;
          e.target.classList.add('is-revealed');
          io.unobserve(e.target);
        }
        clearTimeout(timer);
        timer = setTimeout(() => (batch = 0), 120);
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    els.forEach(el => io.observe(el));
    return () => {
      io.disconnect();
      clearTimeout(timer);
      root.classList.remove('reveal-ready');
    };
  }, [selector]);
}

/** Drop it next to the elements to reveal: it runs once they are mounted. */
export function RevealOnScroll({ selector }) {
  useRevealOnScroll(selector);
  return null;
}
