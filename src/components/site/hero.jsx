import { useRef } from 'react';
import { m, useReducedMotion } from 'motion/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Github01Icon, Linkedin01Icon, Mail01Icon } from '@hugeicons/core-free-icons';
import { cn } from '@/lib/utils';
import { useI18n } from '@/i18n/I18nProvider.jsx';
import { socials } from '@/data/socials.js';
import { intro } from '@/data/site.js';
import { Avatar } from '@/components/site/avatar.jsx';
import saclayLogo from '@/assets/logos/schools/paris-saclay.svg';

// Hero modelled on athrix.me: narrow column framed by a dotted guide grid,
// serif name, prose bio with inline tech logos, word-by-word blur reveal and
// a soft spotlight that follows the cursor over the dot grid.

const SOCIAL_ICON = { GitHub: Github01Icon, LinkedIn: Linkedin01Icon };
const EASE = [0.22, 1, 0.36, 1];

function Cross({ className }) {
  return <span aria-hidden="true" className={cn('absolute z-10 size-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/35', className)} />;
}

function DottedFrame() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute inset-y-0 left-0 border-l border-dotted border-foreground/20" />
      <div className="absolute inset-y-0 right-0 border-r border-dotted border-foreground/20" />
      <div className="absolute top-24 left-1/2 w-screen -translate-x-1/2 border-t border-dotted border-foreground/20" />
      <div className="absolute bottom-0 left-1/2 w-screen -translate-x-1/2 border-t border-dotted border-foreground/20" />
      <Cross className="top-24 left-0" />
      <Cross className="top-24 left-full" />
      <Cross className="top-full left-0" />
      <Cross className="top-full left-full" />
    </div>
  );
}

// Splits plain strings into words so every word can fade in on its own.
function Reveal({ parts, start = 0, step = 0.025 }) {
  const reduce = useReducedMotion();
  let i = start;
  return parts.flatMap((part, p) => {
    const words = typeof part === 'string' ? part.split(/(\s+)/).filter(Boolean) : [part];
    return words.map((w, k) => {
      if (typeof w === 'string' && /^\s+$/.test(w)) return w;
      const delay = (i++) * step;
      return (
        <m.span
          key={`${p}-${k}`}
          className="inline-block"
          initial={reduce ? false : { opacity: 0, filter: 'blur(8px)', y: 6 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 0.6, delay, ease: EASE }}
        >
          {typeof w === 'string' ? w : <Token {...w} delay={delay} />}
        </m.span>
      );
    });
  });
}

function Token({ logo, label, strong, underline, delay }) {
  if (underline) {
    return (
      <span className="relative font-medium text-foreground">
        {label}
        <svg aria-hidden="true" viewBox="0 0 200 12" preserveAspectRatio="none" className="absolute -bottom-2 left-0 h-2.5 w-full overflow-visible text-foreground/70">
          <m.path
            d="M2 8 C 40 3, 90 3, 130 6 S 185 9, 198 4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, delay: delay + 0.4, ease: 'easeInOut' }}
          />
        </svg>
      </span>
    );
  }
  if (logo) {
    return (
      <span className="font-medium whitespace-nowrap text-foreground">
        <img src={`/logos/${logo}.svg`} alt="" className="mr-1 inline-block size-[1.05em] object-contain align-[-0.18em]" />
        {label}
      </span>
    );
  }
  return <span className={cn(strong && 'font-medium text-foreground')}>{label}</span>;
}

export function Hero() {
  const { lang } = useI18n();
  const ref = useRef(null);
  const copy = intro[lang];

  const onPointerMove = e => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--x', `${e.clientX - r.left}px`);
    ref.current.style.setProperty('--y', `${e.clientY - r.top}px`);
  };

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={onPointerMove}
      className="group/hero relative overflow-hidden [--x:50%] [--y:30%]"
    >
      {/* Dot grid, lit only around the cursor. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,--theme(--color-foreground/.22)_1px,transparent_1.2px)] bg-size-[22px_22px] opacity-40 mask-[radial-gradient(260px_circle_at_var(--x)_var(--y),black,transparent)] transition-opacity duration-500 md:opacity-0 md:group-hover/hero:opacity-100"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(500px_circle_at_var(--x)_var(--y),--theme(--color-foreground/.05),transparent_70%)]" />

      <div className="relative mx-auto max-w-3xl px-5 pt-40 pb-20 md:px-6">
        <DottedFrame />

        <div className="relative flex items-center gap-5">
          <m.div
            initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="shrink-0 rounded-2xl border bg-card p-1 shadow-[0_0_0_1px_--theme(--color-foreground/.04),0_20px_40px_-20px_black]"
          >
            <Avatar className="size-20 rounded-xl md:size-24" />
          </m.div>
          <div className="min-w-0">
            <h1 className="flex flex-wrap items-center gap-x-2 font-serif text-[2.1rem] leading-tight tracking-tight md:text-5xl">
              <Reveal parts={[copy.hello]} />
              <m.span initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.35, type: 'spring', stiffness: 400, damping: 15 }}>
                <svg viewBox="0 0 24 24" aria-label="Verified" className="size-6 md:size-7">
                  <path fill="#1d9bf0" d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484z" />
                  <path fill="#fff" d="M10.3 16.6 6.7 13l1.4-1.4 2.2 2.2 5.6-5.6 1.4 1.4-7 7z" />
                </svg>
              </m.span>
            </h1>
            <p className="mt-1 font-serif text-lg text-muted-foreground italic md:text-xl">
              <Reveal parts={[copy.tagline]} start={6} />
            </p>
          </div>
        </div>

        <p className="relative mt-10 text-[15px] leading-[1.9] text-muted-foreground md:text-base">
          <Reveal parts={copy.bio} start={10} step={0.018} />
        </p>

        <ul className="relative mt-6 space-y-1.5 text-[15px] text-muted-foreground">
          {copy.points.map((point, i) => (
            <m.li
              key={i}
              className="flex items-start gap-2.5"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 + i * 0.1, duration: 0.5, ease: EASE }}
            >
              <span className="mt-[0.15em] text-foreground/50">✦</span>
              <span>
                {point.map((seg, k) =>
                  typeof seg === 'string' ? (
                    seg
                  ) : (
                    <span key={k} className="inline-flex items-center whitespace-nowrap text-foreground">
                      {seg.label}
                      {seg.school && <img src={saclayLogo} alt="" className="ml-2 h-[1.5em] w-auto" />}
                    </span>
                  )
                )}
              </span>
            </m.li>
          ))}
        </ul>

        <m.div
          className="relative mt-8 flex flex-wrap items-center gap-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 0.5, ease: EASE }}
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg border bg-card px-3 py-1.5 text-sm shadow-[inset_0_1px_0_--theme(--color-foreground/.06)] transition-colors hover:border-foreground/25"
          >
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
            </span>
            {copy.open}
          </a>
        </m.div>

        <m.div
          className="relative mt-10"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5, ease: EASE }}
        >
          <p className="text-sm text-muted-foreground">
            {copy.socialsLead} <span className="text-foreground">{copy.socialsWord}</span>
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {socials.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs text-foreground/80 transition-colors hover:border-foreground/25 hover:text-foreground"
              >
                <HugeiconsIcon icon={SOCIAL_ICON[s.label]} className="size-3.5" />
                {s.label}
              </a>
            ))}
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs text-foreground/80 transition-colors hover:border-foreground/25 hover:text-foreground"
            >
              <HugeiconsIcon icon={Mail01Icon} className="size-3.5" />
              Contact
            </a>
          </div>
        </m.div>
      </div>
    </section>
  );
}
