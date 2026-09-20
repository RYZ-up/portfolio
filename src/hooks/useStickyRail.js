import { useEffect, useRef } from 'react';

/**
 * Keeps the sticky left rail fully reachable on short windows.
 *
 * The rail is `position: sticky` with `top: min(nav, 100dvh - --sidebar-h - gap)`.
 * When it is taller than the window that `top` goes negative: the rail scrolls
 * with the page until its bottom edge is on screen, then pins there, so every
 * section can be reached without a nested scrollbar and nothing is clipped.
 * This hook only publishes the rail's natural (content) height as `--sidebar-h`.
 */
export default function useStickyRail() {
  const ref = useRef(null);

  useEffect(() => {
    const rail = ref.current;
    if (!rail) return undefined;

    let frame = null;
    const measure = () => {
      frame = null;
      // Read the natural height: drop the "fill the viewport" min-height for the
      // duration of the read (same task, so nothing is painted in between).
      rail.classList.add('is-measuring');
      const height = rail.offsetHeight;
      rail.classList.remove('is-measuring');
      rail.style.setProperty('--sidebar-h', `${height}px`);
    };
    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(measure);
    };

    schedule();
    window.addEventListener('resize', schedule, { passive: true });
    window.addEventListener('load', schedule);
    document.fonts?.ready.then(schedule).catch(() => {});

    let observer = null;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(schedule);
      observer.observe(rail);
    }

    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('load', schedule);
      observer?.disconnect();
    };
  }, []);

  return ref;
}
