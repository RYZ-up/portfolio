import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, m, useInView } from 'motion/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AiBrain01Icon, CpuIcon } from '@hugeicons/core-free-icons';
import { useI18n } from '@/i18n/I18nProvider.jsx';
import { gallery } from '@/data/projects.js';
import { skillKeys, skills } from '@/data/site.js';
import { openProject } from '@/components/site/site-footer.jsx';
import { FrameRule } from '@/components/site/frame.jsx';

// three.js is heavy: the keyboard is only fetched once the section is near,
// and never on phones, where a grid of logos does the same job.
const MechKeyboard = lazy(() => import('@/components/ui/mech-keyboard').then(mod => ({ default: mod.MechKeyboard })));

const HIGHLIGHT = Object.keys(skillKeys).map(k => `Key${k}`);
const ICONS = { cpu: CpuIcon, brain: AiBrain01Icon };

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

// Strip under the keyboard: the tool behind the last key, and its projects.
function SkillStrip({ letter, lang, t }) {
  const skill = skillKeys[letter];
  const used = useMemo(() => (skill ? gallery.filter(p => p.tags.some(tag => skill.match.test(tag))) : []), [skill]);

  // Fixed height (just above the tallest tool card) so the section never resizes.
  return (
    <div className="relative h-52 overflow-hidden pt-1" data-skill-strip>
      <AnimatePresence mode="wait" initial={false}>
        {skill ? (
          <m.div
            key={letter}
            className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8"
            initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -6, filter: 'blur(6px)' }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex shrink-0 items-center gap-3">
              <span className="grid size-12 place-items-center rounded-xl border bg-background">
                <SkillLogo skill={skill} className="size-7" />
              </span>
              <div>
                <p className="font-serif text-3xl leading-none">{skill.name}</p>
                <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                  {skills.key[lang]} <kbd className="rounded border px-1">{letter}</kbd>
                </p>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{skill.text[lang]}</p>
            {used.length > 0 && (
              <div className="flex flex-wrap gap-1.5 md:ml-auto md:max-w-xs md:justify-end">
                {used.map(p => (
                  <button key={p.id} type="button" onClick={() => openProject(p.id)} className="rounded-full border px-2.5 py-1 text-xs text-foreground/80 transition-colors hover:border-foreground/30 hover:text-foreground">
                    {t(`g.${p.id}.name`)}
                  </button>
                ))}
              </div>
            )}
          </m.div>
        ) : (
          <m.div key="hint" className="flex flex-wrap items-center gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <p className="font-serif text-2xl">{skills.hintTitle[lang]}</p>
            <p className="text-sm text-muted-foreground">{skills.hint[lang]}</p>
            <div className="flex flex-wrap gap-1.5 md:ml-auto">
              {Object.keys(skillKeys).map(k => (
                <kbd key={k} className="grid size-7 place-items-center rounded-md border bg-background font-mono text-xs text-muted-foreground">{k}</kbd>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function KeyboardSection() {
  const { lang, t } = useI18n();
  const ref = useRef(null);
  const near = useInView(ref, { once: true, margin: '400px 0px' });
  const desktop = useDesktop();
  const [letter, setLetter] = useState(null);

  // Phones: no playground at all (the 3D keyboard is the point of the section).
  if (!desktop) return null;

  const onKey = (code, pressed) => {
    const k = code.startsWith('Key') ? code.slice(3) : null;
    if (pressed && k && skillKeys[k]) setLetter(k);
  };

  return (
    <section id="competences" ref={ref} className="relative mx-auto max-w-5xl scroll-mt-20 px-5 pt-20 pb-8 md:px-6 md:pt-28 md:pb-10">
      <FrameRule className="top-0" />
      <SectionHead kicker={skills.kicker[lang]} title={skills.title[lang]} sub={skills.subDesktop[lang]} />

      <div className="mt-10">
        <div className="relative h-112">
          {near && (
            <Suspense fallback={null}>
              <MechKeyboard className="absolute inset-0" interactive recorder={false} sound={false} highlight={HIGHLIGHT} onKey={onKey} />
            </Suspense>
          )}
        </div>
        <SkillStrip letter={letter} lang={lang} t={t} />
      </div>
    </section>
  );
}
