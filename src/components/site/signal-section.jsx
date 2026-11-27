import { useEffect, useMemo, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/i18n/I18nProvider.jsx';
import { signal } from '@/data/site.js';
import { SectionHead } from '@/components/site/skills-section.jsx';
import { FrameRule } from '@/components/site/frame.jsx';

// Wave monitor in an industrial cream finish: chassis, beige screen with a grid and grain,
// a sweeping scan line, a rotary knob for the harmonics, a readout and push buttons.
const BLUE = '#004bff';
const SPEED = 1.6; // rad/s: one period every ~4 s
const MAX_N = 30;
const MAX_ROWS = 4;
const DEG = Math.PI / 180;

// k-th term of each Fourier series: frequency and signed amplitude, for a wave between -1 and 1.
const TERMS = {
  square: k => ({ f: 2 * k - 1, a: 4 / (Math.PI * (2 * k - 1)) }),
  saw: k => ({ f: k, a: (2 / (Math.PI * k)) * (k % 2 ? 1 : -1) }),
  triangle: k => ({ f: 2 * k - 1, a: (8 / (Math.PI ** 2 * (2 * k - 1) ** 2)) * (k % 2 ? 1 : -1) })
};
const IDEAL = {
  square: t => (Math.sin(t) >= 0 ? 1 : -1),
  saw: t => ((((t + Math.PI) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) - Math.PI) / Math.PI,
  triangle: t => (2 / Math.PI) * Math.asin(Math.sin(t))
};
// For the expanded sum: the constant in front, and each term's divisor.
const PRESET = {
  square: { c: ['4', 'π'], den: f => f, minus: () => false },
  saw: { c: ['2', 'π'], den: f => f, minus: k => k % 2 === 0 },
  triangle: { c: ['8', 'π²'], den: f => f * f, minus: k => k % 2 === 0 }
};
const FORMULA_TEXT = {
  square: 'f(t) = 4/π · Σ sin((2k−1)ωt) / (2k−1)',
  saw: 'f(t) = 2/π · Σ (−1)^(k+1) sin(kωt) / k',
  triangle: 'f(t) = 8/π² · Σ (−1)^(k+1) sin((2k−1)ωt) / (2k−1)²',
  custom: 'f(t) = Σ A sin(fωt + φ)'
};

// Screen grain: one static SVG noise tile, rasterized once (a live CSS filter would repaint every frame).
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const LABEL = 'mb-2 block text-[9px] font-bold tracking-[0.06em] text-[#8c8980]';
const BUTTON = 'rounded-[3px] border border-black/10 px-3.5 py-2 text-[11px] font-bold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40';
const BUTTON_ON = 'bg-[#1a1a1a] text-[#f2efe9] shadow-[inset_0_2px_4px_rgb(0_0_0/0.4)]';
const BUTTON_OFF = 'bg-[#e5e1d7] text-[#8c8980] shadow-[0_2px_4px_rgb(0_0_0/0.05)] enabled:hover:text-[#1a1a1a]';
const CELL = 'h-6 w-full min-w-0 rounded-[3px] border border-black/10 bg-[#e5e1d7] px-1.5 text-[12px] text-[#1a1a1a] tabular-nums shadow-[inset_0_1px_2px_rgb(0_0_0/0.06)] outline-none read-only:shadow-none focus:border-[#004bff]/50 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none';

/* ---------- custom signal rows ---------- */

const num = (value, lo, hi, fallback) => {
  const n = parseFloat(String(value).replace(',', '.'));
  return Number.isFinite(n) ? Math.min(hi, Math.max(lo, n)) : fallback;
};
// A row as typed (strings, so a field can be cleared while editing) to a drawable term.
const termOf = row => ({
  f: Math.round(num(row.f, 1, 12, 1)),
  a: num(row.a, 0, 2, 0),
  // cos(x) = sin(x + 90°)
  ph: num(row.ph, -180, 180, 0) * DEG + (row.type === 'cos' ? Math.PI / 2 : 0)
});
const DEFAULT_ROWS = [
  { id: 1, type: 'sin', a: '1', f: '1', ph: '0' },
  { id: 2, type: 'sin', a: '0.33', f: '3', ph: '0' }
];

/* ---------- drawing ---------- */

function geometry(w, h) {
  const R = Math.min(h * 0.3, w * 0.12);
  // Room on the left for the chain of circles, which reaches well past R at high harmonics.
  const cx = Math.max(R * 2, w * 0.18);
  const x0 = cx + R * 1.5 + 24;
  // About two periods visible in the wave area.
  return { R, cx, cy: h / 2, x0, px: (w - x0) / (2.2 * 2 * Math.PI) };
}

const sumAt = (terms, t) => terms.reduce((v, { f, a, ph }) => v + a * Math.sin(f * t + ph), 0);

function draw(ctx, w, h, t, spec, history) {
  const { R: R0, cx, cy, x0, px } = geometry(w, h);
  const R = R0 / spec.norm; // custom sums can exceed 1: scale them back into the screen
  ctx.clearRect(0, 0, w, h);
  ctx.lineWidth = 1;
  ctx.lineCap = 'round';

  // Base line and, for the classic waves, the target shape, dashed.
  ctx.strokeStyle = 'rgba(140,137,128,0.3)';
  ctx.setLineDash([2, 4]);
  ctx.beginPath();
  ctx.moveTo(0, cy);
  ctx.lineTo(w, cy);
  ctx.stroke();
  if (spec.ideal) {
    ctx.strokeStyle = 'rgba(140,137,128,0.6)';
    ctx.setLineDash([3, 4]);
    ctx.beginPath();
    for (let x = x0; x <= w; x += 2) {
      const y = cy - spec.ideal(t - (x - x0) / px) * R;
      x === x0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  ctx.setLineDash([]);

  // Epicycles: each term is a circle riding on the previous one, kept out of the wave area.
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, x0 - 14, h);
  ctx.clip();
  let x = cx;
  let y = cy;
  for (const { f, a, ph } of spec.terms) {
    const r = R * a;
    const angle = f * t + ph;
    const nx = x + r * Math.cos(angle);
    const ny = y - r * Math.sin(angle);
    if (Math.abs(r) > 0.6) {
      ctx.strokeStyle = 'rgba(26,26,26,0.13)';
      ctx.beginPath();
      ctx.arc(x, y, Math.abs(r), 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(26,26,26,0.55)';
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(nx, ny);
    ctx.stroke();
    x = nx;
    y = ny;
  }
  ctx.restore();

  // Tip to wave: a dashed lead, then the traced sum.
  const tipX = Math.min(x, x0 - 14);
  ctx.strokeStyle = 'rgba(0,75,255,0.4)';
  ctx.setLineDash([2, 3]);
  ctx.beginPath();
  ctx.moveTo(tipX, y);
  ctx.lineTo(x0, y);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.strokeStyle = BLUE;
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(x0, y);
  for (let i = history.length - 1; i >= 0; i--) {
    const e = history[i];
    const hx = x0 + (t - e.t) * px;
    if (hx > w) break;
    ctx.lineTo(hx, cy - e.v * R);
  }
  ctx.stroke();

  ctx.fillStyle = BLUE;
  for (const [dx, dy] of [[tipX, y], [x0, y]]) {
    ctx.beginPath();
    ctx.arc(dx, dy, 3, 0, Math.PI * 2);
    ctx.fill();
  }
  // History stores signal values, so a change of scale redraws the past wave at the new scale.
  return { v: (cy - y) / R, keep: (w - x0) / px };
}

/* ---------- math typesetting (LaTeX-like, no library) ---------- */

function Frac({ n, d, small }) {
  return (
    <span className={cn('mx-[0.15em] inline-flex flex-col items-center align-middle leading-[1.15]', small ? 'text-[0.62em]' : 'text-[0.66em]')}>
      <span className="px-[0.2em]">{n}</span>
      <span className="h-px w-full bg-current" />
      <span className="px-[0.2em]">{d}</span>
    </span>
  );
}

function Sigma({ to }) {
  return (
    <span className="mx-[0.2em] inline-flex flex-col items-center align-middle leading-none">
      <span className="text-[0.42em] not-italic tabular-nums">{to}</span>
      <span className="text-[1.4em] leading-[0.95] not-italic">∑</span>
      <span className="text-[0.42em]">k=1</span>
    </span>
  );
}

const Sup = ({ children }) => <sup className="ml-px text-[0.5em]">{children}</sup>;

function PresetFormula({ wave, n }) {
  if (wave === 'square') return <>f(t) =<Frac n="4" d="π" /><Sigma to={n} /><Frac n="sin((2k−1)ωt)" d="2k−1" /></>;
  if (wave === 'saw') return <>f(t) =<Frac n="2" d="π" /><Sigma to={n} />(−1)<Sup>k+1</Sup><Frac n="sin(kωt)" d="k" /></>;
  return <>f(t) =<Frac n="8" d="π²" /><Sigma to={n} />(−1)<Sup>k+1</Sup><Frac n="sin((2k−1)ωt)" d="(2k−1)²" /></>;
}

function CustomFormula({ rows, lang }) {
  const fmt = v => v.toLocaleString(lang === 'en' ? 'en-GB' : 'fr-FR', { maximumFractionDigits: 2 });
  const items = rows
    .map(row => ({ row, a: num(row.a, 0, 2, 0), f: Math.round(num(row.f, 1, 12, 1)), ph: num(row.ph, -180, 180, 0) }))
    .filter(x => x.a > 0);
  return (
    <>
      f(t) =
      {items.length === 0 && <span className="ml-2">0</span>}
      {items.map(({ row, a, f, ph }, i) => (
        <span key={row.id} className="whitespace-nowrap">
          {i > 0 && <span className="mx-2">+</span>}
          {i === 0 && <span className="ml-2" />}
          {a !== 1 && <span className="mr-1 not-italic tabular-nums">{fmt(a)}</span>}
          {row.type}({f > 1 ? f : ''}ωt{ph !== 0 && <> {ph > 0 ? '+' : '−'} {fmt(Math.abs(ph))}°</>})
        </span>
      ))}
    </>
  );
}

// The first terms written out, so the sum reads like ordinary arithmetic.
function Expansion({ wave, n, lang }) {
  const P = PRESET[wave];
  const shown = Math.min(n, 4);
  const count = `${signal.with[lang]} N = ${n} ${(n > 1 ? signal.terms : signal.term)[lang]}`;
  return (
    <p className="flex h-7 flex-wrap items-center gap-y-1 overflow-hidden font-serif text-base text-[#1a1a1a]/85 italic">
      <span className="mr-3 font-sans text-[10px] font-bold tracking-[0.06em] text-[#8c8980] uppercase not-italic">{count}</span>
      f(t) ≈<Frac n={P.c[0]} d={P.c[1]} small />(
      {Array.from({ length: shown }, (_, i) => {
        const k = i + 1;
        const { f } = TERMS[wave](k);
        const den = P.den(f);
        const minus = P.minus(k);
        return (
          <span key={k} className="whitespace-nowrap">
            {(k > 1 || minus) && <span className="mx-1.5">{minus ? '−' : '+'}</span>}
            {den > 1 && <Frac n="1" d={den} small />}sin({f > 1 ? f : ''}ωt)
          </span>
        );
      })}
      {n > shown && <span className="mx-1.5">+ …</span>})
    </p>
  );
}

/* ---------- knob ---------- */

// Rotary knob: drag around it, scroll on it, or use the arrow keys. 270° of travel from 1 to max.
function Knob({ value, max, onChange, label }) {
  const ref = useRef(null);
  const drag = useRef(null);
  const live = useRef({ onChange, max });
  live.current = { onChange, max };
  const clamp = v => Math.max(1, Math.min(live.current.max, v));
  const angle = max > 1 ? -135 + ((value - 1) / (max - 1)) * 270 : -135;

  useEffect(() => {
    const el = ref.current;
    // Native listener: React's wheel handler is passive and cannot stop the page from scrolling.
    const onWheel = e => {
      e.preventDefault();
      live.current.onChange(v => clamp(v + (e.deltaY < 0 ? 1 : -1)));
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pointerAngle = e => {
    const r = ref.current.getBoundingClientRect();
    return (Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180) / Math.PI;
  };
  const onPointerDown = e => {
    ref.current.setPointerCapture(e.pointerId);
    drag.current = { last: pointerAngle(e), deg: angle };
  };
  const onPointerMove = e => {
    if (!drag.current || live.current.max <= 1) return;
    const a = pointerAngle(e);
    let delta = a - drag.current.last;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    drag.current.last = a;
    drag.current.deg = Math.max(-135, Math.min(135, drag.current.deg + delta));
    live.current.onChange(clamp(Math.round(1 + ((drag.current.deg + 135) / 270) * (live.current.max - 1))));
  };
  const onPointerUp = () => {
    drag.current = null;
  };
  const onKeyDown = e => {
    const step = { ArrowUp: 1, ArrowRight: 1, ArrowDown: -1, ArrowLeft: -1, PageUp: 5, PageDown: -5 }[e.key];
    if (step) live.current.onChange(v => clamp(v + step));
    else if (e.key === 'Home') live.current.onChange(1);
    else if (e.key === 'End') live.current.onChange(live.current.max);
    else return;
    e.preventDefault();
  };

  return (
    <div className="grid size-[50px] place-items-center rounded-full bg-[#dedbc2] shadow-[inset_0_2px_4px_rgb(0_0_0/0.1)]">
      <div
        ref={ref}
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={1}
        aria-valuemax={max}
        aria-valuenow={value}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
        style={{ transform: `rotate(${angle}deg)` }}
        className="relative size-[44px] cursor-grab touch-none rounded-full bg-[#f2efe9] shadow-[0_4px_10px_rgb(0_0_0/0.12),inset_0_1px_0_#fff] transition-transform duration-100 ease-out outline-none focus-visible:ring-2 focus-visible:ring-[#004bff]/50 active:cursor-grabbing"
      >
        <span className="absolute top-1 left-1/2 h-2.5 w-[3px] -translate-x-1/2 rounded-[1px] bg-[#1a1a1a]" />
      </div>
    </div>
  );
}

/* ---------- section ---------- */

const MODES = ['custom', 'square', 'saw', 'triangle'];
// The first terms of a classic series, as table rows (amplitude ≥ 0, a negative sign becomes a 180° phase).
const seriesRows = wave =>
  Array.from({ length: MAX_ROWS }, (_, i) => {
    const { f, a } = TERMS[wave](i + 1);
    return { id: `${wave}${i}`, type: 'sin', a: String(Math.round(Math.abs(a) * 100) / 100), f: String(f), ph: a < 0 ? '180' : '0' };
  });

export default function SignalSection() {
  const { lang } = useI18n();
  const reduce = useReducedMotion();
  const [wave, setWave] = useState('custom');
  const [n, setN] = useState(1); // harmonics of the classic waves, 1-30
  const [rows, setRows] = useState(DEFAULT_ROWS);
  const [nCustom, setNCustom] = useState(DEFAULT_ROWS.length); // signals of the table summed, 1-4
  const [live, setLive] = useState(true);
  const nextId = useRef(DEFAULT_ROWS.length + 1);
  const boxRef = useRef(null);
  const canvasRef = useRef(null);
  const redraw = useRef(null);
  const resume = useRef(null);

  const custom = wave === 'custom';
  const shown = custom ? rows : seriesRows(wave);
  const active = custom ? nCustom : n;

  const spec = useMemo(() => {
    if (custom) {
      const terms = rows.slice(0, nCustom).map(termOf).filter(x => x.a > 0);
      return { terms, ideal: null, norm: Math.max(1, terms.reduce((s, x) => s + x.a, 0)) };
    }
    return { terms: Array.from({ length: n }, (_, i) => ({ ...TERMS[wave](i + 1), ph: 0 })), ideal: IDEAL[wave], norm: 1 };
  }, [custom, wave, n, rows, nCustom]);

  const params = useRef({ spec, live });
  params.current = { spec, live };

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w = 0;
    let h = 0;
    let t = 0;
    let last = 0;
    let raf = 0;
    let visible = false;
    let history = [];

    // Reduced motion: one still frame with the whole wave already traced.
    const still = () => {
      const { x0, px } = geometry(w, h);
      const { spec: sp } = params.current;
      history = [];
      for (let s = -(w - x0) / px; s <= 0; s += 0.02) history.push({ t: s, v: sumAt(sp.terms, s) });
      draw(ctx, w, h, 0, sp, history);
    };
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = box.clientWidth;
      h = box.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduce) still();
      else if (!raf) draw(ctx, w, h, t, params.current.spec, history);
    };
    // Runs only while on screen, in a visible tab, and switched to LIVE.
    const frame = now => {
      raf = 0;
      if (!visible || document.hidden || !params.current.live) return;
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      t += dt * SPEED;
      const { v, keep } = draw(ctx, w, h, t, params.current.spec, history);
      history.push({ t, v });
      while (history.length && t - history[0].t > keep + 0.1) history.shift();
      raf = requestAnimationFrame(frame);
    };
    const play = () => {
      if (reduce || raf || !visible || document.hidden || !params.current.live) return;
      last = 0;
      raf = requestAnimationFrame(frame);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(box);
    resize();
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) play();
      else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(box);
    document.addEventListener('visibilitychange', play);
    if (reduce) still();
    redraw.current = () => (reduce ? still() : !raf && draw(ctx, w, h, t, params.current.spec, history));
    resume.current = play;

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', play);
      redraw.current = null;
      resume.current = null;
    };
  }, [reduce]);

  // The loop reads params live; a paused or still screen needs an explicit redraw.
  useEffect(() => {
    redraw.current?.();
    if (live) resume.current?.();
  }, [spec, live]);

  const update = (id, patch) => setRows(list => list.map(r => (r.id === id ? { ...r, ...patch } : r)));
  const remove = id => {
    if (rows.length <= 1) return;
    setRows(rows.filter(r => r.id !== id));
    setNCustom(c => Math.min(c, rows.length - 1));
  };
  const add = () => {
    if (rows.length >= MAX_ROWS) return;
    setRows([...rows, { id: nextId.current++, type: 'sin', a: '0.5', f: String(rows.length * 2 + 1), ph: '0' }]);
    setNCustom(rows.length + 1);
  };
  // Classic wave to the table: its first terms become editable signals.
  const editSeries = () => {
    setRows(seriesRows(wave).map(r => ({ ...r, id: nextId.current++ })));
    setNCustom(Math.min(n, MAX_ROWS));
    setWave('custom');
  };

  const d = signal.device;
  const tb = signal.table;
  return (
    <section id="signal" className="relative mx-auto max-w-5xl scroll-mt-20 px-5 py-20 md:px-6 md:py-28">
      <FrameRule className="top-0" />
      <SectionHead kicker={signal.kicker[lang]} title={signal.title[lang]} sub={signal.sub[lang]} />

      <div className="mx-auto mt-10 max-w-3xl rounded-[6px] bg-[#f2efe9] p-4 font-sans text-[#1a1a1a] [color-scheme:light] shadow-[0_40px_80px_rgb(0_0_0/0.5),inset_0_1px_0_rgb(255_255_255/0.8)] md:p-6">
        <header className="mb-1 flex items-baseline justify-between text-[13px] font-bold tracking-[-0.01em] select-none">
          <span className="tracking-[0.25em]">R·Y</span>
          <span className="font-normal text-[#8c8980]">fourier-monitor · 01</span>
        </header>

        {/* Fixed-height text block, so the monitor never changes size between modes. */}
        <p
          className={cn('flex h-[60px] flex-wrap items-center overflow-hidden font-serif leading-tight text-[#1a1a1a] italic', custom ? 'text-[16px] md:text-[20px]' : 'text-[21px] md:text-[25px]')}
          aria-label={FORMULA_TEXT[wave]}
        >
          {custom ? <CustomFormula rows={rows.slice(0, nCustom)} lang={lang} /> : <PresetFormula wave={wave} n={n} />}
        </p>
        <div className="h-7">
          {custom ? (
            <p className="pt-1.5 text-[10px] font-bold tracking-[0.06em] text-[#8c8980] uppercase">{signal.customHint[lang]}</p>
          ) : (
            <Expansion wave={wave} n={n} lang={lang} />
          )}
        </div>
        {/* Every explanation sits in the same cell: the block is as tall as the longest one. */}
        <div className="mt-1 grid text-[12px] leading-snug text-[#5f5c55]">
          {MODES.map(k => (
            <p key={k} aria-hidden={k !== wave} className={cn('col-start-1 row-start-1', k !== wave && 'invisible')}>
              {signal.explain[k][lang]} {signal.legend[lang]} {signal.knobHint[lang]}
            </p>
          ))}
        </div>

        <div ref={boxRef} className="relative mt-3 h-[140px] overflow-hidden rounded-[3px] bg-[#e5e1d7] shadow-[inset_0_2px_6px_rgb(0_0_0/0.06)] md:h-[170px]">
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(rgb(26_26_26/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(26_26_26/0.05)_1px,transparent_1px)] bg-size-[25px_25px] bg-center" />
          <canvas ref={canvasRef} role="img" aria-label={FORMULA_TEXT[wave]} className="absolute inset-0 z-1 size-full" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-2 animate-[scope-scan_6s_linear_infinite] bg-[linear-gradient(to_bottom,rgb(255_255_255/0),rgb(255_255_255/0.15)_50%,rgb(255_255_255/0))] motion-reduce:hidden" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-3" style={{ backgroundImage: GRAIN }} />
          <span className={cn('pointer-events-none absolute top-2 right-3 z-3 flex items-center gap-1.5 text-[9px] font-bold tracking-[0.06em] text-[#8c8980] uppercase', custom && 'invisible')}>
            <span className="w-4 border-t border-dashed border-[#8c8980]" />
            {signal.target[lang]}
          </span>
        </div>

        <footer className="mt-3 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 select-none">
          <div className="flex items-end gap-5">
            <div className="flex flex-col items-center">
              <span className={LABEL}>{signal.harmonics[lang].toUpperCase()}</span>
              <Knob value={active} max={custom ? rows.length : MAX_N} onChange={custom ? setNCustom : setN} label={signal.harmonics[lang]} />
            </div>
            <div className="flex flex-col">
              <span className={LABEL}>{d.data[lang]}</span>
              <p className="flex h-12 items-center">
                <span className="text-[28px] leading-none font-light tabular-nums">{String(active).padStart(2, '0')}</span>
                <span className="ml-1 self-end pb-2.5 text-xs font-medium text-[#8c8980]">{custom ? tb.unit[lang] : d.unit[lang]}</span>
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex flex-col">
              <span className={LABEL}>{d.shape[lang]}</span>
              <div role="radiogroup" aria-label={d.shape[lang]} className="flex flex-wrap gap-1.5">
                {MODES.map(k => (
                  <button key={k} type="button" role="radio" aria-checked={wave === k} onClick={() => setWave(k)} className={cn(BUTTON, wave === k ? BUTTON_ON : BUTTON_OFF)}>
                    {signal.short[k][lang]}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <span className={LABEL}>{d.mode[lang]}</span>
              <button type="button" aria-pressed={live} onClick={() => setLive(v => !v)} className={cn(BUTTON, 'w-16', live ? BUTTON_ON : BUTTON_OFF)}>
                {live ? d.live[lang] : d.off[lang]}
              </button>
            </div>
          </div>
        </footer>

        {/* The signal table, always there: editable in CUSTOM, the series' first terms otherwise. Always 4 rows tall. */}
        <div className="mt-3 border-t border-black/10 pt-2">
          <table className="w-full table-fixed border-separate border-spacing-y-1 text-left">
            <colgroup>
              <col className="w-5" />
              <col className="w-[92px]" />
              <col />
              <col />
              <col />
              <col className="w-8" />
            </colgroup>
            <thead>
              <tr className="text-[9px] leading-tight font-bold tracking-[0.06em] text-[#8c8980]">
                <th className="font-bold">#</th>
                <th className="font-bold">{tb.type[lang]}</th>
                <th className="pr-1.5 font-bold">{tb.amplitude[lang]}</th>
                <th className="pr-1.5 font-bold">{tb.frequency[lang]}</th>
                <th className="pr-1.5 font-bold">{tb.phase[lang]}</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: MAX_ROWS }, (_, i) => {
                const row = shown[i];
                if (!row) {
                  return (
                    <tr key={`empty${i}`} className="h-8">
                      <td colSpan={6} className="rounded-[3px] border border-dashed border-black/10">
                        {i === rows.length && (
                          <button type="button" onClick={add} className="size-full text-[10px] font-bold tracking-[0.06em] text-[#8c8980] hover:text-[#1a1a1a]">
                            {tb.add2[lang]}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                }
                const on = i < active;
                return (
                  <tr key={row.id} className={cn('h-8 transition-opacity', !on && 'opacity-40')}>
                    <td className="font-mono text-[11px] text-[#8c8980]">{i + 1}</td>
                    <td>
                      <div className="flex gap-1">
                        {['sin', 'cos'].map(type => (
                          <button
                            key={type}
                            type="button"
                            disabled={!custom}
                            aria-pressed={row.type === type}
                            onClick={() => update(row.id, { type })}
                            className={cn(BUTTON, 'px-2 py-1 lowercase disabled:opacity-100', row.type === type ? BUTTON_ON : BUTTON_OFF)}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </td>
                    {[
                      ['a', tb.amplitude, { step: '0.05', min: '0', max: '2', inputMode: 'decimal' }],
                      ['f', tb.frequency, { step: '1', min: '1', max: '12', inputMode: 'numeric' }],
                      ['ph', tb.phase, { step: '15', min: '-180', max: '180', inputMode: 'numeric' }]
                    ].map(([key, label, attrs]) => (
                      <td key={key} className="pr-1.5">
                        <input
                          type="number"
                          {...attrs}
                          readOnly={!custom}
                          value={row[key]}
                          aria-label={`${label[lang]} ${i + 1}`}
                          onChange={e => update(row.id, { [key]: e.target.value })}
                          className={cn(CELL, !custom && 'text-[#8c8980]')}
                        />
                      </td>
                    ))}
                    <td>
                      {custom && (
                        <button type="button" onClick={() => remove(row.id)} disabled={rows.length === 1} aria-label={tb.remove[lang]} className={cn(BUTTON, BUTTON_OFF, 'px-2 py-1')}>
                          ×
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex h-7 items-center justify-between gap-3 text-[10px] font-bold tracking-[0.06em] text-[#8c8980] uppercase">
            <span>{custom ? (rows.length >= MAX_ROWS ? tb.max[lang] : '') : n > MAX_ROWS ? `+ ${n - MAX_ROWS} ${tb.more[lang]}` : ''}</span>
            {!custom && (
              <button type="button" onClick={editSeries} className={cn(BUTTON, BUTTON_OFF, 'py-1.5')}>
                {tb.edit[lang]}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
