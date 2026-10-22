import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { animate, m, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUp02Icon, ArrowUpRight01Icon, Cancel01Icon, Menu01Icon, ViewIcon } from '@hugeicons/core-free-icons';
import { cn } from '@/lib/utils';
import { useI18n } from '@/i18n/I18nProvider.jsx';
import { useVisits } from '@/hooks/use-visits.js';
import { footer, nav, toc } from '@/data/site.js';
import { SiteFooter } from '@/components/site/site-footer.jsx';
import logo from '@/assets/images/avatar.png';

// Section under the reading line, for the header's active link.
function useActiveSection(ids) {
  const [active, setActive] = useState(null);
  useEffect(() => {
    const seen = new Map();
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => seen.set(e.target.id, e.isIntersecting));
        setActive(ids.find(id => seen.get(id)) ?? null);
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

function VisitCounter({ className }) {
  const { lang } = useI18n();
  const count = useVisits();
  const value = useMotionValue(0);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (count == null) return;
    const controls = animate(value, count, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: v => setShown(Math.round(v)) });
    return () => controls.stop();
  }, [count, value]);

  if (count == null) return null;
  return (
    <span
      title={footer.visits[lang]}
      className={cn('inline-flex h-8 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 font-mono text-[11px] text-muted-foreground tabular-nums', className)}
    >
      <HugeiconsIcon icon={ViewIcon} className="size-3.5" />
      {shown.toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-US')}
    </span>
  );
}

function LangSwitch() {
  const { lang, setLang } = useI18n();
  return (
    <div className="relative flex h-8 items-center rounded-full border border-white/10 bg-white/[0.03] p-0.5 font-mono text-[10px]" role="group" aria-label="Language">
      {['fr', 'en'].map(l => (
        <button key={l} type="button" onClick={() => setLang(l)} className={cn('relative h-full rounded-full px-2.5 uppercase transition-colors', l === lang ? 'text-background' : 'text-muted-foreground hover:text-foreground')}>
          {l === lang && <m.span layoutId="lang-pill" className="absolute inset-0 rounded-full bg-foreground" transition={{ type: 'spring', stiffness: 500, damping: 35 }} />}
          <span className="relative">{l}</span>
        </button>
      ))}
    </div>
  );
}

// Floating glass dock: grows out of the portrait on load, a light runs round
// its border, a pill follows the hovered link, a hairline tracks reading.
export function SiteHeader() {
  const { lang } = useI18n();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const menuButton = useRef(null);
  const active = useActiveSection(nav.map(n => n.id));
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)');
    const close = () => media.matches && setOpen(false);
    media.addEventListener('change', close);
    return () => media.removeEventListener('change', close);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = e => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3 md:top-4">
      <m.div
        initial={{ maxWidth: 52, opacity: 0, y: -12 }}
        animate={{ maxWidth: 900, opacity: 1, y: 0 }}
        transition={{ maxWidth: { delay: 0.25, duration: 0.9, ease: [0.76, 0, 0.24, 1] }, default: { duration: 0.4 } }}
        className="header-ring pointer-events-auto relative w-full overflow-hidden rounded-full p-px"
      >
        <nav className="relative flex h-13 items-center gap-2 overflow-hidden rounded-full bg-[#0d0d0d]/80 pr-2 pl-1.5 shadow-[0_20px_50px_-20px_black,inset_0_1px_0_rgb(255_255_255/0.06)] backdrop-blur-xl">
          <a href="#top" className="group flex shrink-0 items-center gap-2.5 rounded-full py-1 pr-3 pl-1">
            <span className="relative">
              <img src={logo} alt="Rayane Yazid" className="size-10 rounded-full border border-white/15 bg-white object-cover transition-transform duration-500 group-hover:rotate-[8deg]" />
              <span className="absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 border-[#0d0d0d] bg-emerald-500" />
            </span>
            <span className="hidden flex-col leading-none whitespace-nowrap sm:flex">
              <span className="font-serif text-lg">Rayane Yazid</span>
              <span className="mt-0.5 font-mono text-[9px] tracking-[0.18em] text-muted-foreground uppercase">{footer.role[lang]}</span>
            </span>
          </a>

          <div className="mx-auto hidden items-center md:flex" onPointerLeave={() => setHovered(null)}>
            {nav.map(link => {
              const isActive = active === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onPointerEnter={() => setHovered(link.id)}
                  className={cn('relative px-2.5 py-2 text-[13px] whitespace-nowrap transition-colors lg:px-3.5', isActive || hovered === link.id ? 'text-foreground' : 'text-muted-foreground')}
                >
                  {hovered === link.id && <m.span layoutId="nav-hover" className="absolute inset-0 rounded-full bg-white/[0.07]" transition={{ type: 'spring', stiffness: 450, damping: 35 }} />}
                  <span className="relative">{link.label[lang]}</span>
                  {isActive && <m.span layoutId="nav-active" className="absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-foreground" />}
                </a>
              );
            })}
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-2 md:ml-0">
            <VisitCounter className="md:hidden lg:inline-flex" />
            <LangSwitch />
            <a href="#contact" className="hidden h-8 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 text-[13px] text-foreground transition-colors hover:border-white/25 hover:bg-white/[0.07] md:inline-flex">
              Contact
            </a>
          </div>

          <m.span aria-hidden="true" style={{ scaleX: progress }} className="absolute inset-x-6 bottom-0 h-px origin-left bg-linear-to-r from-transparent via-white/60 to-transparent" />
        </nav>
      </m.div>

      {createPortal(
        <div className="md:hidden">
          <button
            ref={menuButton}
            type="button"
            className="fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[calc(1rem+env(safe-area-inset-bottom))] z-[72] btn-primary h-12! rounded-full! px-5!"
            aria-controls="mobile-menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <HugeiconsIcon icon={open ? Cancel01Icon : Menu01Icon} className="size-5" />
            {open ? footer.closeMenu[lang] : footer.menu[lang]}
          </button>
          {open && (
            <>
              <div aria-hidden="true" onClick={() => setOpen(false)} className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm" />
              <nav id="mobile-menu" className="fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[calc(5rem+env(safe-area-inset-bottom))] z-[71] w-[calc(100%-2rem)] max-w-sm animate-in rounded-3xl border bg-card p-3 shadow-2xl duration-200 fade-in slide-in-from-bottom-2">
                <div className="flex items-center justify-between px-3 pt-2 pb-3">
                  <p className="text-[10px] font-bold tracking-[0.22em] text-muted-foreground uppercase">{footer.menu[lang]}</p>
                  <VisitCounter />
                </div>
                {nav.filter(link => link.id !== 'competences').map(link => (
                  <a key={link.id} href={`#${link.id}`} onClick={() => setOpen(false)} className="flex min-h-14 items-center gap-3 rounded-2xl px-3 text-sm font-medium transition-colors hover:bg-muted">
                    {link.label[lang]}
                    <HugeiconsIcon icon={ArrowUpRight01Icon} className="ml-auto size-4 text-muted-foreground" />
                  </a>
                ))}
              </nav>
            </>
          )}
        </div>,
        document.body
      )}
    </header>
  );
}

// Round button with a ring that fills as you read.
function ScrollTop() {
  const { lang } = useI18n();
  const { scrollY, scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);
  const ring = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  const dash = useTransform(ring, v => `${v * 125.66} 125.66`);

  useEffect(() => scrollY.on('change', y => setShow(y > 420)), [scrollY]);

  return (
    <m.button
      type="button"
      aria-label={footer.top[lang]}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      initial={false}
      animate={show ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.6, y: 16 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className={cn(
        'group fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[calc(4.75rem+env(safe-area-inset-bottom))] z-[65] grid size-12 place-items-center rounded-full border border-white/10 bg-[#0d0d0d]/80 shadow-[0_12px_30px_-10px_black] backdrop-blur-xl md:right-8 md:bottom-8',
        !show && 'pointer-events-none'
      )}
    >
      <svg viewBox="0 0 44 44" className="absolute inset-0 size-full -rotate-90" aria-hidden="true">
        <circle cx="22" cy="22" r="20" fill="none" stroke="rgb(255 255 255 / 0.08)" strokeWidth="1.5" />
        <m.circle cx="22" cy="22" r="20" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" style={{ strokeDasharray: dash }} />
      </svg>
      <span className="relative h-5 overflow-hidden">
        <span className="flex flex-col transition-transform duration-300 group-hover:-translate-y-5">
          <HugeiconsIcon icon={ArrowUp02Icon} className="size-5" />
          <HugeiconsIcon icon={ArrowUp02Icon} className="size-5" />
        </span>
      </span>
    </m.button>
  );
}

// Reading progress (rareui RailToc), top left on screens wide enough to keep
// it clear of the content; hidden once the footer is on screen.
// Wide screens only: the rail and its code are loaded once the window is wide enough.
const RailToc = lazy(() => import('@/components/ui/rail-toc'));

function useWide() {
  const query = '(min-width: 1400px)';
  const [wide, setWide] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const media = window.matchMedia(query);
    const sync = () => setWide(media.matches);
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);
  return wide;
}

// Reading progress (rareui RailToc), part of the page rather than a card: no box, dimmed
// at rest, full contrast on hover; hidden once the footer is on screen.
function SectionRail() {
  const { lang } = useI18n();
  const wide = useWide();
  const [atEnd, setAtEnd] = useState(false);
  useEffect(() => {
    const el = document.querySelector('footer');
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setAtEnd(entry.isIntersecting), { rootMargin: '0px 0px 120px 0px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!wide) return null;
  const items = [{ id: 'top', label: toc.top[lang] }, ...nav.filter(n => n.id !== 'contact').map(n => ({ id: n.id, label: n.label[lang] }))];

  return (
    <div className={cn('fixed top-32 left-8 z-40 text-[13px] transition-opacity duration-300', atEnd ? 'pointer-events-none opacity-0' : 'opacity-45 hover:opacity-100 focus-within:opacity-100')}>
      <Suspense fallback={null}>
        <RailToc items={items} title={toc.title[lang]} offset={120} className="[&_[data-slot=rail-toc-title]]:font-mono [&_[data-slot=rail-toc-title]]:text-[10px] [&_[data-slot=rail-toc-title]]:tracking-[0.2em] [&_[data-slot=rail-toc-title]]:uppercase" />
      </Suspense>
    </div>
  );
}

export function SitePage({ children }) {
  return (
    <div className="relative min-h-screen w-full overflow-x-clip bg-background text-foreground">
      <SectionRail />
      <SiteHeader />
      <main className="relative">{children}</main>
      <SiteFooter />
      <ScrollTop />
    </div>
  );
}
