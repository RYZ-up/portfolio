import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useSpring } from 'motion/react';
import './RailToc.css';

// Adapted from RareUI "Rail TOC" (rareui.com/components/railtoc): a dotted
// rail that fills as the reader scrolls, with a small plane that travels
// along it, turns around when scrolling back up, and settles on each section.
// Plain CSS instead of Tailwind; works with a scroll container (containerRef).

const RAIL_X = 5;
const LABEL_GAP = 14;
const TRAVEL_SPRING = { stiffness: 140, damping: 26, mass: 0.6 };
const TURN_SPRING = { stiffness: 260, damping: 30 };
const TURN_SLACK = 2;
const PLANE = 'M12 2 20.5 21 12 17.5 3.5 21z';
const PLANE_HOLE = 4;

function buildPath(nodes) {
  const points = [{ x: nodes[0].x, y: 0 }, nodes[0]];
  for (let i = 1; i < nodes.length; i++) points.push(nodes[i]);
  return points.map((p, i) => `${i ? 'L' : 'M'}${p.x} ${p.y}`).join(' ');
}

function lengthAtY(path, total, y) {
  let lo = 0;
  let hi = total;
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    if (path.getPointAtLength(mid).y < y) lo = mid;
    else hi = mid;
  }
  return hi;
}

export default function RailToc({ items, containerRef, offset = 96, title, className = '' }) {
  const reduceMotion = useReducedMotion();
  const maskId = `rail-toc-${useId().replace(/[^\w-]/g, '')}`;

  const listRef = useRef(null);
  const rowRefs = useRef([]);
  const pathRef = useRef(null);
  const holeRefs = useRef([]);

  const [geometry, setGeometry] = useState();
  const [reached, setReached] = useState(1);

  const lengths = useRef([]);
  const total = useRef(0);
  const placed = useRef(false);
  const pinned = useRef(null);
  const userScrolled = useRef(false);
  const facing = useRef(1);
  const turnFrom = useRef(0);

  const target = useMotionValue(0);
  const travel = useSpring(target, TRAVEL_SPRING);
  const distance = reduceMotion ? target : travel;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const heading = useMotionValue(180);
  const turn = useSpring(heading, TURN_SPRING);
  const filled = useMotionValue(0);

  const pose = useCallback(
    l => {
      const path = pathRef.current;
      const length = total.current;
      if (!path || !length) return;
      const at = path.getPointAtLength(l);
      const behind = path.getPointAtLength(Math.max(0, l - 1));
      const ahead = path.getPointAtLength(Math.min(length, l + 1));
      x.set(at.x);
      holeRefs.current.forEach(hole => {
        hole?.setAttribute('cx', `${at.x}`);
        hole?.setAttribute('cy', `${at.y}`);
      });
      y.set(at.y);
      const angle = (Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * 180) / Math.PI + 90 + (facing.current < 0 ? 180 : 0);
      const prev = heading.get();
      heading.set(angle + 360 * Math.round((prev - angle) / 360));
      filled.set(l / length);
      setReached(lengths.current.filter(n => n <= l + 0.5).length);
    },
    [x, y, heading, filled]
  );

  useMotionValueEvent(distance, 'change', pose);

  const aim = useCallback(
    next => {
      const from = turnFrom.current;
      if ((next - from) * facing.current > 0) turnFrom.current = next;
      else if (Math.abs(next - from) > TURN_SLACK) {
        facing.current = facing.current > 0 ? -1 : 1;
        turnFrom.current = next;
      }
      target.set(next);
    },
    [target]
  );

  const sync = useCallback(() => {
    const nodes = lengths.current;
    if (!nodes.length) return;
    if (pinned.current !== null) {
      aim(nodes[pinned.current] ?? nodes[0]);
      return;
    }
    const scroller = containerRef?.current;
    const scrollTop = scroller ? scroller.scrollTop : window.scrollY;
    const viewHeight = scroller ? scroller.clientHeight : window.innerHeight;
    const scrollHeight = scroller ? scroller.scrollHeight : document.documentElement.scrollHeight;
    const originTop = scroller ? scroller.getBoundingClientRect().top : 0;
    const remaining = Math.max(0, scrollHeight - viewHeight - scrollTop);
    const line = Math.min(offset, scrollTop);
    const anchor = line + Math.max(0, viewHeight - line - remaining);
    const tops = items.map(item => {
      const el = document.getElementById(item.id);
      return el ? el.getBoundingClientRect().top - originTop : Infinity;
    });
    let index = -1;
    for (let i = tops.length - 1; i >= 0; i--) {
      if (tops[i] <= anchor) {
        index = i;
        break;
      }
    }
    let next;
    // At the very top, always the first section (short panels would otherwise start further down).
    if (scrollTop < 4 || index === -1) next = nodes[0];
    else if (index === nodes.length - 1) next = nodes[index];
    else {
      const span = tops[index + 1] - tops[index];
      const progress = span > 0 ? (anchor - tops[index]) / span : 0;
      next = nodes[index] + Math.min(1, Math.max(0, progress)) * (nodes[index + 1] - nodes[index]);
    }
    aim(next);
    if (!placed.current) {
      placed.current = true;
      travel.jump(next);
      pose(next);
      turn.jump(heading.get());
    }
  }, [containerRef, items, offset, aim, travel, turn, heading, pose]);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list || !items.length) return undefined;
    const measure = () => {
      const nodes = items.map((_, i) => {
        const row = rowRefs.current[i];
        return { x: RAIL_X, y: row ? row.offsetTop + row.offsetHeight / 2 : 0 };
      });
      setGeometry({ nodes, d: buildPath(nodes), width: RAIL_X * 2 + 4, height: list.offsetHeight });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => ro.disconnect();
  }, [items]);

  useLayoutEffect(() => {
    const path = pathRef.current;
    if (!path || !geometry) return;
    total.current = path.getTotalLength();
    lengths.current = geometry.nodes.map(n => lengthAtY(path, total.current, n.y));
    sync();
    pose(distance.get());
  }, [geometry, sync, pose, distance]);

  useEffect(() => {
    const scroller = containerRef?.current ?? window;
    const onIntent = () => {
      userScrolled.current = true;
    };
    const onScroll = () => {
      if (pinned.current !== null && userScrolled.current) pinned.current = null;
      sync();
    };
    scroller.addEventListener('scroll', onScroll, { passive: true });
    scroller.addEventListener('wheel', onIntent, { passive: true });
    scroller.addEventListener('touchstart', onIntent, { passive: true });
    scroller.addEventListener('pointerdown', onIntent);
    window.addEventListener('keydown', onIntent);
    window.addEventListener('resize', sync);
    return () => {
      scroller.removeEventListener('scroll', onScroll);
      scroller.removeEventListener('wheel', onIntent);
      scroller.removeEventListener('touchstart', onIntent);
      scroller.removeEventListener('pointerdown', onIntent);
      window.removeEventListener('keydown', onIntent);
      window.removeEventListener('resize', sync);
    };
  }, [containerRef, sync]);

  const select = index => {
    const el = document.getElementById(items[index].id);
    if (!el) return;
    pinned.current = index;
    userScrolled.current = false;
    sync();
    const scroller = containerRef?.current;
    const top = scroller
      ? el.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop
      : el.getBoundingClientRect().top + window.scrollY;
    (scroller ?? window).scrollTo({ top: top - offset, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  const active = Math.max(0, reached - 1);

  return (
    <nav className={`rail-toc ${className}`} aria-label={title}>
      <p className="rail-toc__title">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
          <path d="M2 4h12M2 8h8M2 12h10" />
        </svg>
        {title}
      </p>
      <ul ref={listRef} className="rail-toc__list">
        {geometry && (
          <svg className="rail-toc__svg" width={geometry.width} height={geometry.height} aria-hidden>
            <linearGradient id={`${maskId}-fade`} gradientUnits="userSpaceOnUse" x1={0} y1={0} x2={0} y2={geometry.nodes[0].y - 4}>
              <stop offset="0" stopColor="black" />
              <stop offset="1" stopColor="white" />
            </linearGradient>
            <mask id={maskId} maskUnits="userSpaceOnUse" x={-8} y={-8} width={geometry.width + 16} height={geometry.height + 16}>
              <rect x={-8} y={-8} width={geometry.width + 16} height={geometry.height + 16} fill={`url(#${maskId}-fade)`} />
              {geometry.nodes.map((node, i) => (
                <circle key={i} cx={node.x} cy={node.y} r={4} fill="black" />
              ))}
              <circle ref={el => (holeRefs.current[0] = el)} r={PLANE_HOLE} fill="black" />
            </mask>
            <mask id={`${maskId}-nodes`} maskUnits="userSpaceOnUse" x={-8} y={-8} width={geometry.width + 16} height={geometry.height + 16}>
              <rect x={-8} y={-8} width={geometry.width + 16} height={geometry.height + 16} fill="white" />
              <circle ref={el => (holeRefs.current[1] = el)} r={PLANE_HOLE} fill="black" />
            </mask>
            <g mask={`url(#${maskId})`}>
              <path ref={pathRef} d={geometry.d} fill="none" strokeWidth="1.25" strokeDasharray="2 5" strokeLinecap="round" className="rail-toc__dash" />
              <motion.path d={geometry.d} fill="none" strokeWidth="1.25" className="rail-toc__fill" style={{ pathLength: filled }} />
            </g>
            <g mask={`url(#${maskId}-nodes)`}>
              {geometry.nodes.map((node, i) => (
                <circle
                  key={items[i]?.id ?? i}
                  cx={node.x}
                  cy={node.y}
                  r={i < reached ? 3 : 3.25}
                  strokeWidth="1.25"
                  className={`rail-toc__node${i < reached ? ' is-covered' : ''}`}
                />
              ))}
            </g>
          </svg>
        )}
        {geometry && (
          <motion.div className="rail-toc__plane" style={{ x, y, rotate: reduceMotion ? heading : turn }} aria-hidden>
            <svg viewBox="0 0 24 24">
              <path d={PLANE} fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </motion.div>
        )}
        {items.map((item, i) => (
          <li key={item.id} ref={el => (rowRefs.current[i] = el)}>
            <button
              type="button"
              onClick={() => select(i)}
              aria-current={i === active ? 'location' : undefined}
              className={`rail-toc__item${i === active ? ' is-active' : ''}`}
              style={{ paddingLeft: RAIL_X + LABEL_GAP }}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
