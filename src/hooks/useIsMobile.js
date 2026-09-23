import { useEffect, useState } from 'react';

/**
 * True below `maxWidth` (700 by default: the site's phone breakpoint).
 * Used only where a phone genuinely needs different markup, not just
 * different CSS (e.g. swapping a mouse-drag carousel for a native
 * scroll-snap gallery) — everywhere else stays pure CSS media queries.
 */
export default function useIsMobile(maxWidth = 700) {
  const query = `(max-width: ${maxWidth}px)`;
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setIsMobile(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return isMobile;
}
