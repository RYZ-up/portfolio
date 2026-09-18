import { useRef, useCallback, useEffect, useMemo } from 'react';
import { useBorderGlowGroup } from './BorderGlowGroup.jsx';
import './BorderGlow.css';

function parseHSL(hslStr) {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 40, s: 80, l: 80 };
  return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
}

function buildGlowVars(glowColor, intensity) {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const opacities = [100, 60, 50, 40, 30, 20, 10];
  const keys = ['', '-60', '-50', '-40', '-30', '-20', '-10'];
  const vars = {};
  for (let i = 0; i < opacities.length; i++) {
    vars[`--glow-color${keys[i]}`] = `hsl(${base} / ${Math.min(opacities[i] * intensity, 100)}%)`;
  }
  return vars;
}

const GRADIENT_POSITIONS = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%'];
const GRADIENT_KEYS = ['--gradient-one', '--gradient-two', '--gradient-three', '--gradient-four', '--gradient-five', '--gradient-six', '--gradient-seven'];
const COLOR_MAP = [0, 1, 2, 3, 4, 5, 6];

function buildGradientVars(colors) {
  const vars = {};
  for (let i = 0; i < 7; i++) {
    const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
    vars[GRADIENT_KEYS[i]] = `radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`;
  }
  vars['--gradient-base'] = `linear-gradient(${colors[0]} 0 100%)`;
  return vars;
}

function isLightColor(color) {
  const value = color.trim().replace('#', '');
  if (!/^[\da-f]{3}([\da-f]{3})?$/i.test(value)) return false;
  const hex = value.length === 3 ? value.split('').map(char => char + char).join('') : value;
  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4, 6), 16);
  return red * 0.2126 + green * 0.7152 + blue * 0.0722 > 180;
}

function easeOutCubic(x) { return 1 - Math.pow(1 - x, 3); }
function easeInCubic(x) { return x * x * x; }

function animateValue({ start = 0, end = 100, duration = 1000, delay = 0, ease = easeOutCubic, onUpdate, onEnd }) {
  const t0 = performance.now() + delay;
  function tick() {
    const elapsed = performance.now() - t0;
    const t = Math.min(elapsed / duration, 1);
    onUpdate(start + (end - start) * ease(t));
    if (t < 1) requestAnimationFrame(tick);
    else if (onEnd) onEnd();
  }
  setTimeout(() => requestAnimationFrame(tick), delay);
}

const BorderGlow = ({
  children,
  className = '',
  edgeSensitivity = 30,
  glowColor = '40 80 80',
  backgroundColor = '#131316',
  borderRadius = 28,
  glowRadius = 40,
  glowIntensity = 1.0,
  coneSpread = 25,
  animated = false,
  colors = ['#c084fc', '#f472b6', '#4ade80', '#38bdf8', '#2dd4bf', '#fbbf24', '#fb7185'],
  fillOpacity = 0.5,
  tiltAmplitude = 4,
  // false: a plain container (no glow, no tilt, not tracked by the group) — the
  // sidebar block uses this so it costs nothing per pointer move.
  glow = true,
}) => {
  const cardRef = useRef(null);
  const group = useBorderGlowGroup();

  const tiltRef = useRef({ rect: null, raf: null, x: 0, y: 0, fine: null });

  const handleTiltEnter = useCallback(() => {
    const t = tiltRef.current;
    t.fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    // One layout read per hover instead of one per mousemove.
    t.rect = cardRef.current?.getBoundingClientRect() ?? null;
  }, []);

  const handleTiltMove = useCallback((e) => {
    const t = tiltRef.current;
    if (t.fine === null) handleTiltEnter();
    if (!t.fine || !t.rect || t.rect.width === 0 || t.rect.height === 0) return;
    t.x = e.clientX;
    t.y = e.clientY;
    if (t.raf !== null) return;
    t.raf = requestAnimationFrame(() => {
      t.raf = null;
      const card = cardRef.current;
      if (!card) return;
      // Fresh rect (once per frame) so scrolling mid-hover can't skew the tilt.
      const r = card.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      const relX = (t.x - r.left) / r.width;
      const relY = (t.y - r.top) / r.height;
      card.style.setProperty('--rotate-y', `${((relX - 0.5) * tiltAmplitude * 2).toFixed(2)}deg`);
      card.style.setProperty('--rotate-x', `${((0.5 - relY) * tiltAmplitude * 2).toFixed(2)}deg`);
    });
  }, [handleTiltEnter, tiltAmplitude]);

  const handleTiltLeave = useCallback(() => {
    const t = tiltRef.current;
    if (t.raf !== null) { cancelAnimationFrame(t.raf); t.raf = null; }
    t.rect = null;
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--rotate-x', '0deg');
    card.style.setProperty('--rotate-y', '0deg');
  }, []);

  useEffect(() => {
    if (!glow || !group || !cardRef.current) return;
    const card = cardRef.current;
    group.register(card);
    return () => group.unregister(card);
  }, [group, glow]);

  const getCenterOfElement = useCallback((el) => {
    const { width, height } = el.getBoundingClientRect();
    return [width / 2, height / 2];
  }, []);

  const getEdgeProximity = useCallback((el, x, y) => {
    const [cx, cy] = getCenterOfElement(el);
    const dx = x - cx;
    const dy = y - cy;
    let kx = Infinity;
    let ky = Infinity;
    if (dx !== 0) kx = cx / Math.abs(dx);
    if (dy !== 0) ky = cy / Math.abs(dy);
    return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
  }, [getCenterOfElement]);

  const getCursorAngle = useCallback((el, x, y) => {
    const [cx, cy] = getCenterOfElement(el);
    const dx = x - cx;
    const dy = y - cy;
    if (dx === 0 && dy === 0) return 0;
    const radians = Math.atan2(dy, dx);
    let degrees = radians * (180 / Math.PI) + 90;
    if (degrees < 0) degrees += 360;
    return degrees;
  }, [getCenterOfElement]);

  const handlePointerMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const edge = getEdgeProximity(card, x, y);
    const angle = getCursorAngle(card, x, y);

    card.style.setProperty('--edge-proximity', `${(edge * 100).toFixed(3)}`);
    card.style.setProperty('--cursor-angle', `${angle.toFixed(3)}deg`);
  }, [getEdgeProximity, getCursorAngle]);

  useEffect(() => {
    if (!animated || !cardRef.current) return;
    const card = cardRef.current;
    const angleStart = 110;
    const angleEnd = 465;
    card.classList.add('sweep-active');
    card.style.setProperty('--cursor-angle', `${angleStart}deg`);

    animateValue({ duration: 500, onUpdate: v => card.style.setProperty('--edge-proximity', v) });
    animateValue({ ease: easeInCubic, duration: 1500, end: 50, onUpdate: v => {
      card.style.setProperty('--cursor-angle', `${(angleEnd - angleStart) * (v / 100) + angleStart}deg`);
    }});
    animateValue({ ease: easeOutCubic, delay: 1500, duration: 2250, start: 50, end: 100, onUpdate: v => {
      card.style.setProperty('--cursor-angle', `${(angleEnd - angleStart) * (v / 100) + angleStart}deg`);
    }});
    animateValue({ ease: easeInCubic, delay: 2500, duration: 1500, start: 100, end: 0,
      onUpdate: v => card.style.setProperty('--edge-proximity', v),
      onEnd: () => card.classList.remove('sweep-active'),
    });
  }, [animated]);

  const lightSurface = isLightColor(backgroundColor);
  // Built once per prop change, not on every render of every card.
  const cardStyle = useMemo(
    () => ({
      // Deliberately not setting --card-bg here: it must keep inheriting
      // the theme's own value from :root (dark) / :root.theme-light
      // (light) so cards actually turn light in light mode. `backgroundColor`
      // is only used above to decide whether this card counts as a light
      // surface for the glow/border blend-mode variant.
      '--edge-sensitivity': edgeSensitivity,
      '--border-radius': `${borderRadius}px`,
      '--glow-padding': `${glowRadius}px`,
      '--cone-spread': coneSpread,
      '--fill-opacity': fillOpacity,
      ...buildGlowVars(glowColor, glowIntensity),
      ...buildGradientVars(colors),
    }),
    [edgeSensitivity, borderRadius, glowRadius, coneSpread, fillOpacity, glowColor, glowIntensity, colors]
  );

  return (
    <div
      ref={cardRef}
      onPointerMove={group || !glow ? undefined : handlePointerMove}
      onMouseEnter={glow ? handleTiltEnter : undefined}
      onMouseMove={glow ? handleTiltMove : undefined}
      onMouseLeave={glow ? handleTiltLeave : undefined}
      className={`border-glow-card${lightSurface ? ' border-glow-card--light' : ''} ${className}`}
      style={cardStyle}
    >
      <span className="edge-light" />
      <div className="border-glow-inner">
        {children}
      </div>
    </div>
  );
};

export default BorderGlow;
