import { useEffect, useRef, useState } from 'react';

/**
 * Whether the referenced element is (nearly) on screen. Used to pause endless
 * decorative animations and loops while they can't be seen. Reports `true`
 * when IntersectionObserver is unavailable, so nothing is ever left frozen.
 */
export default function useInView(rootMargin = '120px') {
  const ref = useRef(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin });
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return [ref, inView];
}
