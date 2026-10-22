import { lazy, Suspense, useEffect, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRight01Icon, Clock01Icon, Location01Icon, PackageIcon } from '@hugeicons/core-free-icons';
import { cn } from '@/lib/utils';
// The fire shader is its own chunk: the footer is the last thing anyone reaches.
const ShaderAnimeFire = lazy(() => import('@/components/ui/shader-anime-fire').then(mod => ({ default: mod.ShaderAnimeFire })));
import { Avatar } from '@/components/site/avatar.jsx';
import { useI18n } from '@/i18n/I18nProvider.jsx';
import { gallery } from '@/data/projects.js';
import { socials } from '@/data/socials.js';
import { cta, footer, nav } from '@/data/site.js';

// Footer: contact call and dotted 4-column grid, over a
// greyscale 23rd.dev ShaderAnimeFire kept low and faint at the very bottom.

const FIRE_COLORS = ['#141414', '#353535', '#6e6e6e'];
const featured = [...gallery].sort((a, b) => b.year - a.year).slice(0, 4);
const built = new Date(__BUILD_DATE__);

export const openProject = id => window.dispatchEvent(new CustomEvent('open-project', { detail: id }));

function useParisTime() {
  const fmt = () => new Intl.DateTimeFormat('fr-FR', { timeZone: 'Europe/Paris', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date());
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function ColumnTitle({ children }) {
  return <p className="mb-4 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">{children}</p>;
}

function FooterLink({ href, children, external, onClick }) {
  const Tag = onClick ? 'button' : 'a';
  return (
    <Tag
      {...(onClick ? { type: 'button', onClick } : { href })}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className="group/link inline-flex w-max max-w-full items-center gap-1.5 text-left text-sm text-foreground/70 transition-colors hover:text-foreground"
    >
      {children}
      <HugeiconsIcon icon={ArrowUpRight01Icon} className="size-3 shrink-0 -translate-x-1 opacity-0 transition-all duration-200 group-hover/link:translate-x-0 group-hover/link:opacity-60" />
    </Tag>
  );
}

export function SiteFooter() {
  const { lang, t, setLang } = useI18n();
  const time = useParisTime();
  const linkedin = socials.find(s => s.label === 'LinkedIn').href;

  return (
    <footer className="relative isolate overflow-hidden">
      {/* Fire: low, faint, faded upward so it only warms the bottom edge. */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-[60%] opacity-40 mask-[linear-gradient(to_top,black,transparent_85%)]">
        <Suspense fallback={null}>
          <ShaderAnimeFire className="size-full" colors={FIRE_COLORS} intensity={0.25} height={0.24} speed={0.4} theme="dark" />
        </Suspense>
      </div>

      <div className="relative mx-auto max-w-5xl px-5 md:px-6">
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 hidden border-l border-dotted border-foreground/20 md:block" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden border-r border-dotted border-foreground/20 md:block" />

        {/* Contact call */}
        <section id="contact" className="relative -mx-5 scroll-mt-24 border-t border-dotted border-foreground/20 px-5 py-20 text-center md:-mx-6 md:px-6 md:py-28">
          <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
            <span className="mr-2 inline-block size-1.5 animate-pulse rounded-full bg-emerald-500 align-middle" />
            {footer.available[lang]}
          </p>
          <h2 className="mx-auto mt-5 max-w-2xl font-serif text-4xl leading-[1.05] tracking-tight text-balance md:text-6xl">{cta.title[lang]}</h2>
          <p className="mx-auto mt-4 max-w-md text-balance text-muted-foreground">{cta.sub[lang]}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={linkedin} target="_blank" rel="noreferrer" className="btn-primary">
              {cta.linkedin[lang]} <HugeiconsIcon icon={ArrowUpRight01Icon} className="size-4" />
            </a>
            <a href={socials[0].href} target="_blank" rel="noreferrer" className="btn-ghost">
              GitHub <HugeiconsIcon icon={ArrowUpRight01Icon} className="size-4" />
            </a>
          </div>
        </section>

        {/* Columns */}
        <div className="relative -mx-5 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-dotted border-foreground/20 px-5 py-12 md:-mx-6 md:grid-cols-4 md:px-6">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3">
              <Avatar className="size-10 rounded-lg border" />
              <span className="font-heading text-[15px] font-semibold tracking-tight">
                RAYANE<span className="text-muted-foreground">YAZID</span>
              </span>
            </div>
            <p className="mt-4 max-w-60 text-sm text-balance text-muted-foreground">{footer.pitch[lang]}</p>
          </div>

          <div>
            <ColumnTitle>{footer.sections[lang]}</ColumnTitle>
            <div className="flex flex-col gap-2.5">
              {nav.map(n => (
                <FooterLink key={n.id} href={`#${n.id}`}>{n.label[lang]}</FooterLink>
              ))}
              {socials.map(s => (
                <FooterLink key={s.label} href={s.href} external>{s.label}</FooterLink>
              ))}
            </div>
          </div>

          <div>
            <ColumnTitle>{footer.featured[lang]}</ColumnTitle>
            <div className="flex flex-col gap-2.5">
              {featured.map(p => (
                <FooterLink key={p.id} onClick={() => openProject(p.id)}>
                  <span className={cn('size-1.5 shrink-0 rounded-full', p.status === 'done' ? 'bg-emerald-500' : 'bg-amber-400')} />
                  <span className="truncate">{t(`g.${p.id}.name`)}</span>
                </FooterLink>
              ))}
            </div>
          </div>

          <div className="col-span-2 md:col-span-1">
            <ColumnTitle>{footer.now[lang]}</ColumnTitle>
            <dl className="space-y-3 text-sm">
              <div className="flex items-center gap-2.5">
                <HugeiconsIcon icon={Clock01Icon} className="size-4 text-muted-foreground" />
                <dt className="sr-only">Time</dt>
                <dd className="font-mono tabular-nums">{time} <span className="text-muted-foreground">Paris</span></dd>
              </div>
              <div className="flex items-center gap-2.5">
                <HugeiconsIcon icon={Location01Icon} className="size-4 text-muted-foreground" />
                <dt className="sr-only">Location</dt>
                <dd>Paris-Saclay, FR</dd>
              </div>
              <div className="flex items-center gap-2.5">
                <HugeiconsIcon icon={PackageIcon} className="size-4 text-muted-foreground" />
                <dt className="sr-only">Build</dt>
                <dd className="text-muted-foreground">
                  {footer.updated[lang]} {built.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 border-t border-dotted border-foreground/20 px-5 pt-5 pb-28 text-xs text-muted-foreground sm:flex-row md:px-6 md:pb-6">
        <p>© {new Date().getFullYear()} Rayane Yazid</p>
        <div className="flex items-center gap-3">
          <div className="flex rounded-md border bg-background/40 p-0.5 font-mono text-[10px] backdrop-blur-sm">
            {['fr', 'en'].map(l => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className={cn('rounded px-2 py-0.5 uppercase transition-colors', l === lang ? 'bg-foreground text-background' : 'hover:text-foreground')}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
