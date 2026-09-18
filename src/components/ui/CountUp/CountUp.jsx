import { useInView, useMotionValue, useSpring } from 'motion/react';
import { useCallback, useEffect, useRef } from 'react';

// React Bits "Count Up" (https://reactbits.dev/text-animations/count-up):
// a spring-driven number that counts once it scrolls into view. `locale`
// drives the thousands separator so it follows the site language.
export default function CountUp({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  duration = 2,
  className = '',
  startWhen = true,
  locale = 'en-US',
  onStart,
  onEnd
}) {
  const ref = useRef(null);
  const motionValue = useMotionValue(direction === 'down' ? to : from);

  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);
  const springValue = useSpring(motionValue, { damping, stiffness });
  const isInView = useInView(ref, { once: true, margin: '0px' });

  const getDecimals = num => {
    const str = num.toString();
    if (str.includes('.')) {
      const decimals = str.split('.')[1];
      if (parseInt(decimals, 10) !== 0) return decimals.length;
    }
    return 0;
  };
  const maxDecimals = Math.max(getDecimals(from), getDecimals(to));

  const format = useCallback(
    latest =>
      new Intl.NumberFormat(locale, {
        useGrouping: true,
        minimumFractionDigits: maxDecimals,
        maximumFractionDigits: maxDecimals
      }).format(latest),
    [locale, maxDecimals]
  );

  useEffect(() => {
    if (ref.current) ref.current.textContent = format(direction === 'down' ? to : from);
  }, [from, to, direction, format]);

  useEffect(() => {
    if (!(isInView && startWhen)) return;
    onStart?.();
    const timeoutId = setTimeout(() => motionValue.set(direction === 'down' ? from : to), delay * 1000);
    const durationTimeoutId = setTimeout(() => onEnd?.(), delay * 1000 + duration * 1000);
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(durationTimeoutId);
    };
  }, [isInView, startWhen, motionValue, direction, from, to, delay, duration, onStart, onEnd]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', latest => {
      if (ref.current) ref.current.textContent = format(latest);
    });
    return () => unsubscribe();
  }, [springValue, format]);

  return <span className={className} ref={ref} />;
}
