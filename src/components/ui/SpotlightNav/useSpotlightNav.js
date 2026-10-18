import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { animate } from 'motion/react';

// Spotlight Navbar (after VengeanceUI, vengenceui.com/components/spotlight-
// navbar): a soft light follows the cursor along the bar, and a thin glow
// under the active link springs to it when the page changes; on leaving the
// bar the spotlight springs back to the active link. Positions are CSS
// variables (--spotlight-x, --ambience-x) set on the list.
const SPRING = { type: 'spring', stiffness: 200, damping: 20 };

const centerOf = (el, list) => {
  const a = el.getBoundingClientRect();
  const b = list.getBoundingClientRect();
  return a.left - b.left + a.width / 2;
};

export default function useSpotlightNav(activeKey) {
  const listRef = useRef(null);
  const spot = useRef(0);
  const amb = useRef(0);
  const anims = useRef({});

  const springTo = useCallback((which, target, instant) => {
    const list = listRef.current;
    if (!list) return;
    const ref = which === 'spot' ? spot : amb;
    const prop = which === 'spot' ? '--spotlight-x' : '--ambience-x';
    anims.current[which]?.stop();
    if (instant) {
      ref.current = target;
      list.style.setProperty(prop, `${target}px`);
      return;
    }
    anims.current[which] = animate(ref.current, target, {
      ...SPRING,
      onUpdate: v => {
        ref.current = v;
        list.style.setProperty(prop, `${v}px`);
      }
    });
  }, []);

  const activeCenter = useCallback(() => {
    const list = listRef.current;
    const el = list?.querySelector('[aria-current="page"]');
    return el ? centerOf(el, list) : null;
  }, []);

  // The glow under the active link: jumps there first, then springs on change.
  const first = useRef(true);
  const place = useCallback(() => {
    const x = activeCenter();
    const list = listRef.current;
    if (!list) return;
    list.toggleAttribute('data-has-active', x != null);
    if (x == null) return;
    springTo('amb', x, first.current);
    springTo('spot', x, first.current);
    first.current = false;
  }, [activeCenter, springTo]);

  useLayoutEffect(() => {
    place();
  }, [activeKey, place]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return undefined;
    const move = e => {
      springTo('spot', e.clientX - list.getBoundingClientRect().left, true);
      list.setAttribute('data-hover', '');
    };
    const leave = () => {
      list.removeAttribute('data-hover');
      const x = activeCenter();
      if (x != null) springTo('spot', x);
    };
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => place()) : null;
    ro?.observe(list);
    list.addEventListener('pointermove', move);
    list.addEventListener('pointerleave', leave);
    return () => {
      ro?.disconnect();
      list.removeEventListener('pointermove', move);
      list.removeEventListener('pointerleave', leave);
      Object.values(anims.current).forEach(a => a?.stop());
    };
  }, [activeCenter, place, springTo]);

  return { listRef, place };
}
