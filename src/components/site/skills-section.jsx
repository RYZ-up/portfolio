import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, m, useInView, useReducedMotion } from 'motion/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AiBrain01Icon, CpuIcon } from '@hugeicons/core-free-icons';
import { cn } from '@/lib/utils';
import { useI18n } from '@/i18n/I18nProvider.jsx';
import { gallery } from '@/data/projects.js';
import { skillKeys, skills } from '@/data/site.js';
import { FrameRule } from '@/components/site/frame.jsx';

// three.js is heavy: the keyboard is only fetched once the section is near,
// and never on phones, where a grid of keycaps does the same job.
const MechKeyboard = lazy(() => import('@/components/ui/mech-keyboard').then(mod => ({ default: mod.MechKeyboard })));

const LETTERS = Object.keys(skillKeys);

// Codes are physical positions named after QWERTY: on AZERTY, the key printed A sends KeyQ.
const AZERTY_CODE = { A: 'KeyQ', Z: 'KeyW', Q: 'KeyA', W: 'KeyZ', M: 'Semicolon' };
const AZERTY_LABEL = { KeyQ: 'A', KeyW: 'Z', KeyA: 'Q', KeyZ: 'W', Semicolon: 'M', KeyM: ',', Comma: ';', Period: ':', Slash: '!' };
const codeOf = (letter, layout) => (layout === 'azerty' && AZERTY_CODE[letter]) || `Key${letter}`;
function letterOf(code, layout) {
  if (layout === 'azerty' && AZERTY_LABEL[code]) return /^[A-Z]$/.test(AZERTY_LABEL[code]) ? AZERTY_LABEL[code] : null;
  return code.startsWith('Key') ? code.slice(3) : null;
}
// Real layout where the browser exposes it (Chromium), else a guess from the browser language.
function useKeyboardLayout() {
  const [layout, setLayout] = useState(() => (/^fr/i.test(navigator.language || '') ? 'azerty' : 'qwerty'));
  useEffect(() => {
    let alive = true;
    navigator.keyboard?.getLayoutMap?.()
      .then(map => {
        const q = map.get('KeyQ');
        if (alive && q) setLayout(q.toLowerCase() === 'a' ? 'azerty' : 'qwerty');
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);
  return layout;
}
const ICONS = { cpu: CpuIcon, brain: AiBrain01Icon };

// Heat map: a key glows with the number of projects that use its tool.
const USED = Object.fromEntries(LETTERS.map(k => [k, gallery.filter(p => p.tags.some(tag => skillKeys[k].match.test(tag)))]));
const MAX_USED = Math.max(1, ...LETTERS.map(k => USED[k].length));
const HEAT_OF = k => 0.3 + 0.7 * (USED[k].length / MAX_USED);


// Live key display. Local labels: importing them from the keyboard module would pull three.js into the main bundle.
const IS_MAC = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
const MODS = ['Control', 'Alt', 'Shift', 'Meta'];
const modOf = code => MODS.find(mod => code.startsWith(mod)) ?? null;
const NAMED = {
  Space: { fr: 'Espace', en: 'Space' }, Enter: '↵', Backspace: '⌫', Escape: 'Esc', Tab: '⇥', CapsLock: '⇪', Delete: 'Suppr',
  ArrowUp: '↑', ArrowDown: '↓', ArrowLeft: '←', ArrowRight: '→', Slash: '/', Period: '.', Comma: ',', Semicolon: ';', Minus: '-', Equal: '=', Quote: "'", Backquote: '`', BracketLeft: '[', BracketRight: ']', Backslash: '\\'
};
const MOD_LABEL = IS_MAC ? { Control: '⌃', Alt: '⌥', Shift: '⇧', Meta: '⌘' } : { Control: 'Ctrl', Alt: 'Alt', Shift: '⇧', Meta: 'Win' };
function keyLabel(code, lang, layout) {
  const mod = modOf(code);
  if (mod) return MOD_LABEL[mod];
  if (layout === 'azerty' && AZERTY_LABEL[code]) return AZERTY_LABEL[code];
  const named = NAMED[code];
  if (named) return typeof named === 'string' ? named : named[lang];
  const match = /^(?:Key|Digit|Numpad)(.+)$/.exec(code);
  return match ? match[1] : code;
}
// Modifiers first (one per kind), then the other keys in the order pressed.
function sortChord(codes) {
  const mods = MODS.map(mod => codes.find(code => modOf(code) === mod)).filter(Boolean);
  return [...mods, ...codes.filter(code => !modOf(code))];
}
function shortcutName(codes, lang, layout) {
  const command = codes.some(code => modOf(code) === (IS_MAC ? 'Meta' : 'Control'));
  const keys = codes.filter(code => !modOf(code));
  if (!command || keys.length !== 1) return null;
  const letter = letterOf(keys[0], layout);
  const id = letter ? `Key${letter}` : layout === 'qwerty' ? keys[0] : null;
  const shift = codes.some(code => modOf(code) === 'Shift');
  if (shift && id === 'KeyZ') return skills.shortcuts.KeyY[lang];
  return (id && skills.shortcuts[id]?.[lang]) ?? null;
}

// The keyboard types a few keys by itself the first time it is seen, then stops for good.
const DEMO = [
  [700, 'KeyE', 160],
  [2300, 'KeyJ', 160],
  [3900, IS_MAC ? 'MetaLeft' : 'ControlLeft', 900],
  [4100, 'KeyC', 450]
];

// Brand logo from public/logos, or a Hugeicons glyph for tools without one.
function SkillLogo({ skill, className }) {
  if (skill.icon) return <HugeiconsIcon icon={ICONS[skill.icon]} className={className} />;
  return <img src={`/logos/${skill.logo}.svg`} alt="" className={`${className} object-contain`} loading="lazy" />;
}

function useDesktop() {
  const [desktop, setDesktop] = useState(() => window.matchMedia('(min-width: 768px)').matches);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)');
    const sync = () => setDesktop(media.matches);
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);
  return desktop;
}

export function SectionHead({ kicker, title, sub }) {
  return (
    <>
      <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">{kicker}</p>
      <h2 className="mt-2 font-serif text-4xl tracking-tight md:text-5xl">{title}</h2>
      <p className="mt-3 max-w-xl text-muted-foreground">{sub}</p>
    </>
  );
}

// Keys held right now (or the last chord, for a moment after release), with the shortcut's name.
function LiveKeys({ codes, lang, layout }) {
  const name = codes.length ? shortcutName(codes, lang, layout) : null;
  const letter = codes.length === 1 ? letterOf(codes[0], layout) : null;
  const tool = letter && skillKeys[letter]?.name;
  return (
    <div aria-live="polite" className="pointer-events-none absolute inset-x-0 top-0 z-10 flex h-10 justify-center">
      <AnimatePresence mode="wait" initial={false}>
        {codes.length ? (
          <m.div
            key={codes.join('+')}
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-background/80 px-2 py-1.5 shadow-[0_10px_30px_-12px_black] backdrop-blur-md"
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.16 }}
          >
            {codes.map((code, i) => (
              <span key={code} className="flex items-center gap-1.5">
                {i > 0 && <span className="text-xs text-muted-foreground">+</span>}
                <kbd className="grid h-7 min-w-7 place-items-center rounded-md border border-b-2 border-white/15 bg-card px-1.5 font-mono text-xs text-foreground">{keyLabel(code, lang, layout)}</kbd>
              </span>
            ))}
            {(name || tool) && <span className="ml-1.5 pr-1.5 text-sm text-foreground/80">{name || tool}</span>}
          </m.div>
        ) : (
          <m.p key="idle" className="flex items-center gap-2 self-center font-mono text-[11px] tracking-wide text-muted-foreground transition-colors group-has-focus-visible/kb:text-foreground" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {skills.live[lang]}
            <span className="inline-block h-3.5 w-1.5 animate-pulse bg-foreground/50" />
          </m.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// Phones: the keyboard becomes a grid of keycaps, lit with the same heat map.
function KeycapGrid({ letter, onPick }) {
  return (
    <div className="mt-8 grid grid-cols-6 gap-2 sm:grid-cols-8">
      {LETTERS.map(k => (
        <button
          key={k}
          type="button"
          onClick={() => onPick(k)}
          aria-label={skillKeys[k].name}
          aria-pressed={letter === k}
          style={{ '--heat': HEAT_OF(k) }}
          className={cn(
            'relative grid aspect-square place-items-center rounded-xl border border-b-[3px] bg-card shadow-[0_0_calc(var(--heat)*18px)_-4px_rgb(224_86_159/calc(var(--heat)*0.7))] transition-transform active:translate-y-px',
            letter === k ? 'border-[#E0569F]/70' : 'border-white/10'
          )}
        >
          <SkillLogo skill={skillKeys[k]} className="size-5" />
          <span className="absolute top-1 left-1.5 font-mono text-[9px] text-muted-foreground">{k}</span>
        </button>
      ))}
    </div>
  );
}

// Strip under the keyboard: only the logo and name of the tool behind the last key.
function SkillStrip({ letter, lang }) {
  const skill = skillKeys[letter];
  return (
    <div className="relative mt-6 flex h-28 items-center justify-center overflow-hidden border-t border-dotted border-foreground/15" data-skill-strip>
      <AnimatePresence mode="wait" initial={false}>
        {skill ? (
          <m.div
            key={letter}
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -6, filter: 'blur(6px)' }}
            transition={{ duration: 0.25 }}
          >
            <span className="grid size-14 place-items-center rounded-2xl border bg-background">
              <SkillLogo skill={skill} className="size-8" />
            </span>
            <p className="font-serif text-xl leading-none">{skill.name}</p>
          </m.div>
        ) : (
          <m.p key="hint" className="text-sm text-muted-foreground" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {skills.hintTitle[lang]}
          </m.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function KeyboardSection() {
  const { lang } = useI18n();
  const ref = useRef(null);
  const frameRef = useRef(null);
  const near = useInView(ref, { once: true, margin: '400px 0px' });
  const seen = useInView(frameRef, { once: true, amount: 0.6 });
  const desktop = useDesktop();
  const reduce = useReducedMotion();
  const layout = useKeyboardLayout();
  const highlight = useMemo(() => LETTERS.map(k => codeOf(k, layout)), [layout]);
  const heat = useMemo(() => Object.fromEntries(LETTERS.map(k => [codeOf(k, layout), HEAT_OF(k)])), [layout]);
  const [letter, setLetter] = useState(null);
  const [live, setLive] = useState([]);
  const held = useRef([]);
  const hideTimer = useRef(0);
  const control = useRef(null);

  useEffect(() => () => clearTimeout(hideTimer.current), []);

  // Auto demo, once: waits for the keyboard to load, stops at the first real key or click.
  useEffect(() => {
    if (!desktop || !seen || reduce) return;
    const timers = [];
    let stopped = false;
    const stop = () => {
      stopped = true;
      timers.forEach(clearTimeout);
      window.removeEventListener('keydown', stop, true);
      window.removeEventListener('pointerdown', stop, true);
    };
    window.addEventListener('keydown', stop, true);
    window.addEventListener('pointerdown', stop, true);
    const start = Date.now();
    const run = () => {
      if (stopped) return;
      if (!control.current) {
        if (Date.now() - start < 8000) timers.push(setTimeout(run, 200));
        return;
      }
      for (const [at, code, ms] of DEMO) timers.push(setTimeout(() => !stopped && control.current?.tap(code, ms), at));
      timers.push(setTimeout(stop, DEMO.at(-1)[0] + 1000));
    };
    run();
    return stop;
  }, [desktop, seen, reduce]);

  const onKey = (code, pressed) => {
    held.current = pressed ? [...held.current.filter(c => c !== code), code] : held.current.filter(c => c !== code);
    clearTimeout(hideTimer.current);
    if (pressed) {
      setLive(sortChord(held.current));
      // A letter typed with a modifier is a shortcut, not a tool pick.
      const k = letterOf(code, layout);
      if (k && skillKeys[k] && !held.current.some(modOf)) setLetter(k);
    } else if (held.current.length === 0) {
      hideTimer.current = setTimeout(() => setLive([]), 1400);
    }
  };

  return (
    <section id="competences" ref={ref} className="relative mx-auto max-w-5xl scroll-mt-20 px-5 pt-20 pb-8 md:px-6 md:pt-28 md:pb-10">
      <FrameRule className="top-0" />
      <SectionHead kicker={skills.kicker[lang]} title={skills.title[lang]} sub={desktop ? skills.subDesktop[lang] : skills.sub[lang]} />

      {desktop ? (
        <div className="mt-10">
          {/* No frame or background, even on focus: keyboard users see the hint above light up instead. */}
          <div ref={frameRef} className="group/kb relative h-112">
            <LiveKeys codes={live} lang={lang} layout={layout} />
            {near && (
              <Suspense fallback={null}>
                <MechKeyboard className="absolute inset-0 rounded-3xl focus-visible:ring-0" interactive recorder={false} sound={false} layout={layout} highlight={highlight} heat={heat} controlRef={control} onKey={onKey} />
              </Suspense>
            )}
          </div>
          <SkillStrip letter={letter} lang={lang} />
        </div>
      ) : (
        <>
          <KeycapGrid letter={letter} onPick={setLetter} />
          <SkillStrip letter={letter} lang={lang} />
        </>
      )}
    </section>
  );
}
