import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowLeft01Icon, ArrowRight01Icon, ArrowUpRight01Icon, Cancel01Icon } from '@hugeicons/core-free-icons';
import { cn } from '@/lib/utils';
import { useI18n } from '@/i18n/I18nProvider.jsx';
import { gallery, categoryOf } from '@/data/projects.js';
import { projects as copy } from '@/data/site.js';

const CATEGORY_KEY = { eng: 'page.eng.title', dev: 'page.dev.title', web: 'page.web.title' };
const SPRING = { type: 'spring', stiffness: 380, damping: 30 };

// 720×450 WebP made for cards (5–40 kB); the originals weigh up to 2.5 MB.
const coverOf = p => `/images/projects/gallery/${p.id}/cover.webp`;

function StatusDot({ status, t }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
      <span className={cn('size-1.5 rounded-full', status === 'done' ? 'bg-emerald-500' : 'bg-amber-400')} />
      {t(`g.${status}`)}
    </span>
  );
}

function ProjectDialog({ project, onClose, t, lang }) {
  const [slide, setSlide] = useState(0);
  const media = project.media;
  const current = media[slide];
  const detail = t(`g.${project.id}.detail`);

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setSlide(s => (s + 1) % media.length);
      if (e.key === 'ArrowLeft') setSlide(s => (s - 1 + media.length) % media.length);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [media.length, onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-black/60 backdrop-blur-sm md:items-center md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={t(`g.${project.id}.name`)}
        className="relative flex max-h-[92dvh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl border bg-card md:rounded-3xl"
        initial={{ y: 40, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.98 }}
        transition={SPRING}
        onClick={e => e.stopPropagation()}
      >
        <div className="relative aspect-16/9 shrink-0 bg-black">
          <AnimatePresence mode="wait">
            {current.type === 'video' ? (
              <motion.video
                key={current.src}
                src={current.src}
                poster={current.poster}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 size-full object-contain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            ) : (
              <motion.img
                key={current.src}
                src={current.src}
                alt=""
                className="absolute inset-0 size-full object-contain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </AnimatePresence>
          {media.length > 1 && (
            <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2">
              <button type="button" aria-label="Previous" onClick={() => setSlide((slide - 1 + media.length) % media.length)} className="grid size-8 place-items-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-md">
                <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
              </button>
              <span className="rounded-full border border-white/15 bg-black/50 px-2.5 py-1 font-mono text-[11px] text-white backdrop-blur-md">
                {slide + 1} / {media.length}
              </span>
              <button type="button" aria-label="Next" onClick={() => setSlide((slide + 1) % media.length)} className="grid size-8 place-items-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-md">
                <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
              </button>
            </div>
          )}
          <button type="button" aria-label={copy.close[lang]} onClick={onClose} className="absolute top-3 right-3 grid size-9 place-items-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-md">
            <HugeiconsIcon icon={Cancel01Icon} className="size-4" />
          </button>
        </div>
        <div className="overflow-y-auto p-6 md:p-8">
          <div className="flex items-center gap-4">
            <StatusDot status={project.status} t={t} />
            <span className="font-mono text-[11px] text-muted-foreground">{project.year}</span>
            <span className="font-mono text-[11px] text-muted-foreground">{t(CATEGORY_KEY[categoryOf(project.id)])}</span>
          </div>
          <h3 className="mt-3 font-heading text-2xl tracking-tight md:text-3xl">{t(`g.${project.id}.name`)}</h3>
          <p className="mt-3 text-foreground/80">{t(`g.${project.id}.desc`)}</p>
          {detail !== `g.${project.id}.detail` &&
            detail.split('\n\n').map(par => (
              <p key={par.slice(0, 24)} className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {par}
              </p>
            ))}
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {project.tags.map(tag => (
              <li key={tag} className="rounded-md border px-2 py-0.5 font-mono text-[11px] text-foreground/70">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}

// One stacked deck per field, web first. The top card flicks to the back on
// click, drag or every few seconds.
const DECKS = {
  web: ['p15', 'p12', 'p16', 'p14', 'p4'],
  eng: ['p2', 'p3', 'p8', 'p1', 'p10'],
  dev: ['p13', 'p6', 'p9', 'p7', 'p11']
};
const DECK_POSE = [
  { x: 0, y: 0, rotate: 0, scale: 1 },
  { x: 22, y: -14, rotate: 4, scale: 0.95 },
  { x: 42, y: -26, rotate: 8, scale: 0.9 },
  { x: 60, y: -36, rotate: 12, scale: 0.85 },
  { x: 74, y: -44, rotate: 15, scale: 0.8 }
];

function Deck({ items, onOpen, t, lang }) {
  const [order, setOrder] = useState(items.map((_, i) => i));
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const next = () => setOrder(o => [...o.slice(1), o[0]]);

  useEffect(() => {
    if (paused || reduce) return;
    const id = setInterval(() => setOrder(o => [...o.slice(1), o[0]]), 4500);
    return () => clearInterval(id);
  }, [paused, reduce]);

  const top = items[order[0]];

  return (
    <div
      className="grid items-center gap-12 md:grid-cols-[1.15fr_1fr] md:gap-14"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div className="relative mr-16 aspect-16/10 md:mr-20">
        {items.map((p, i) => {
          const depth = order.indexOf(i);
          const isTop = depth === 0;
          return (
            <motion.button
              key={p.id}
              type="button"
              aria-label={t(`g.${p.id}.name`)}
              tabIndex={isTop ? 0 : -1}
              className="absolute inset-0 origin-bottom-left cursor-grab overflow-hidden rounded-2xl border bg-card shadow-[0_30px_60px_-25px_black] will-change-transform active:cursor-grabbing"
              style={{ zIndex: items.length - depth }}
              animate={{ ...DECK_POSE[depth], opacity: depth > 3 ? 0 : 1 }}
              transition={{ type: 'spring', stiffness: 220, damping: 26, mass: 0.8 }}
              drag={isTop ? 'x' : false}
              dragSnapToOrigin
              onDragEnd={(_, info) => Math.abs(info.offset.x) > 80 && next()}
              onClick={() => isTop && onOpen(p.id)}
            >
              <img src={coverOf(p)} alt="" draggable={false} decoding="async" className={cn('size-full object-cover', categoryOf(p.id) === 'web' && 'object-top')} />
              <span className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
              {/* Shade deeper cards with an overlay: opacity is cheap, filter is not. */}
              <motion.span className="absolute inset-0 bg-black" initial={false} animate={{ opacity: depth * 0.2 }} transition={{ duration: 0.4 }} />
            </motion.button>
          );
        })}
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={top.id}
            initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex items-center gap-4">
              <span className="font-mono text-[11px] text-muted-foreground">
                {String(order[0] + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </span>
              <StatusDot status={top.status} t={t} />
              <span className="font-mono text-[11px] text-muted-foreground">{top.year}</span>
            </div>
            <h3 className="mt-3 font-serif text-4xl leading-none tracking-tight md:text-5xl">{t(`g.${top.id}.name`)}</h3>
            <p className="mt-4 line-clamp-3 text-muted-foreground">{t(`g.${top.id}.desc`)}</p>
            <ul className="mt-5 flex flex-wrap gap-1.5">
              {top.tags.map(tag => (
                <li key={tag} className="rounded-md border px-2 py-0.5 font-mono text-[11px] text-foreground/70">{tag}</li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button type="button" onClick={() => onOpen(top.id)} className="btn-primary">
            {copy.open[lang]} <HugeiconsIcon icon={ArrowUpRight01Icon} className="size-4" />
          </button>
          <button type="button" onClick={next} className="btn-ghost">
            {copy.next[lang]} <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const { lang, t } = useI18n();
  const [openId, setOpenId] = useState(null);
  const open = gallery.find(p => p.id === openId);
  const [category, setCategory] = useState('web');
  const deck = useMemo(() => DECKS[category].map(id => gallery.find(p => p.id === id)), [category]);

  // Footer "recent work" links open a project's sheet from outside the section.
  useEffect(() => {
    const onOpen = e => setOpenId(e.detail);
    window.addEventListener('open-project', onOpen);
    return () => window.removeEventListener('open-project', onOpen);
  }, []);

  return (
    <section id="projets" className="relative mx-auto max-w-5xl scroll-mt-20 px-5 py-20 md:px-6 md:py-28">
      <div className="mb-14">
        <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">{copy.kicker[lang]}</p>
        <h2 className="mt-2 font-serif text-4xl tracking-tight md:text-5xl">{copy.title[lang]}</h2>
        <p className="mt-3 max-w-lg text-muted-foreground">{copy.sub[lang]}</p>
      </div>

      {/* The pill's spring overshoots the last tab by a few px: no scrollbar for that. */}
      <div className="mb-10 flex w-fit max-w-full gap-1 overflow-x-auto overscroll-x-contain rounded-full border border-white/10 bg-white/[0.03] p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {Object.keys(DECKS).map(c => (
          <button
            key={c}
            type="button"
            onClick={e => {
              setCategory(c);
              e.currentTarget.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
            }}
            className={cn('relative shrink-0 rounded-full px-4 py-1.5 text-sm transition-colors', c === category ? 'text-background' : 'text-muted-foreground hover:text-foreground')}
          >
            {c === category && <motion.span layoutId="deck-tab" className="absolute inset-0 rounded-full bg-foreground" transition={SPRING} />}
            <span className="relative">{t(CATEGORY_KEY[c])}</span>
          </button>
        ))}
      </div>

      <Deck key={category} items={deck} onOpen={setOpenId} t={t} lang={lang} />

      <AnimatePresence>{open && <ProjectDialog key={open.id} project={open} onClose={() => setOpenId(null)} t={t} lang={lang} />}</AnimatePresence>
    </section>
  );
}
