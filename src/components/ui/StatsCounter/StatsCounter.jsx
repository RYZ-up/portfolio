import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useSpring } from 'motion/react';

// VengeanceUI "Stats Counter" (vengenceui.com/components/stats-counter), in
// JS: the number springs up from 0 the first time it scrolls into view.
// `locale` adds thousands separators.
export default function StatsCounter({ value, duration = 1.5, prefix = '', suffix = '', decimals = 0, locale, className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, value, motionValue]);

  useEffect(() => springValue.on('change', latest => setDisplayValue(latest)), [springValue]);

  const text = locale
    ? displayValue.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    : displayValue.toFixed(decimals);
  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {prefix}
      {text}
      {suffix}
    </span>
  );
}
