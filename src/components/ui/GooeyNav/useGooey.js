import { useCallback, useLayoutEffect, useRef } from 'react';

// Gooey Nav (after the React Bits / RareUI component), without its click
// burst: a pill that slides to the active item. Returns refs for the list
// and the pill.
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

  return { listRef, pillRef, place };
}
