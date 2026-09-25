import { useInView, useMotionValue, useSpring } from 'motion/react';
import { useCallback, useEffect, useMemo, useRef } from 'react';

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

  const getDecimals = num => {
    const str = num.toString();
    if (str.includes('.')) {
      const decimals = str.split('.')[1];
      if (parseInt(decimals, 10) !== 0) return decimals.length;
    }
    return 0;
  };
  const maxDecimals = Math.max(getDecimals(from), getDecimals(to));

  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);
  // This spring is heavily over-damped: with the default rest threshold it
  // kept the animation loop running for ~10 s after the number on screen had
  // stopped changing. Rest as soon as the shown digits are final.
  const restDelta = 0.5 * 10 ** -maxDecimals;
  const springValue = useSpring(motionValue, { damping, stiffness, restDelta, restSpeed: restDelta * 2 });
  const isInView = useInView(ref, { once: true, margin: '0px' });

  // One formatter per locale, not one per animation frame.
  const formatter = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        useGrouping: true,
        minimumFractionDigits: maxDecimals,
        maximumFractionDigits: maxDecimals
      }),
    [locale, maxDecimals]
  );
  const format = useCallback(latest => formatter.format(latest), [formatter]);

  // Only touch the DOM when the shown text changes: the spring keeps easing
  // for seconds in sub-digit steps, and every write re-lays out the nav bar.
  const write = useCallback(text => {
    const el = ref.current;
    if (el && el.textContent !== text) el.textContent = text;
  }, []);

  useEffect(() => {
    write(format(direction === 'down' ? to : from));
  }, [from, to, direction, format, write]);

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
    const unsubscribe = springValue.on('change', latest => write(format(latest)));
    return () => unsubscribe();
  }, [springValue, format, write]);

  return <span className={className} ref={ref} />;
}
