import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { motion, useDragControls, useReducedMotion } from 'motion/react';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import { gallery } from '../../../data/projects.js';
import './ProjectsPage.css';

const SWIPE_PX = 50;
const SWIPE_VELOCITY = 400; // px/s: a quick flick counts even over a short distance
const WHEEL_COOLDOWN = 450;
// Bouncy spring: slides overshoot a little and settle, like the header on the home page.
const BOUNCE = { type: 'spring', stiffness: 190, damping: 13, mass: 0.9 };
const pad = n => String(n).padStart(2, '0');

/** Shortest signed distance from the current slide, so the ring wraps without jumping. */
const offsetOf = (i, index, N) => {
  let d = i - index;
  if (d > N / 2) d -= N;
  else if (d < -N / 2) d += N;
  return d;
};

/** An image, or a video that only plays while its slide is the centred one. */
function Media({ item, active, alt }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (active) v.play()?.catch(() => {});
    else v.pause();
  }, [active]);

  if (item.type !== 'video') {
    return <img src={item.src} alt={alt} draggable={false} decoding="async" loading="lazy" />;
  }
  return (
    <video
      ref={ref}
      src={item.src}
      poster={item.poster}
      muted
      loop
      playsInline
      controls={active}
      preload={active ? 'auto' : 'none'}
      aria-label={alt}
      className={active ? 'is-live' : undefined}
    />
  );
}

/** One project's coverflow over all its images: the centred image is lit, its neighbours dimmed and shadowed. */
function Carousel({ project, number }) {
  const { t } = useI18n();
  const { id, tags, year, status } = project;
  const media = project.media ?? [];
  const N = media.length;
  const desc = t(`g.${id}.desc`);
  // Optional longer write-up: add a `g.<id>.detail` string (paragraphs separated by a blank line).
  const detailKey = `g.${id}.detail`;
  const extra = t(detailKey) === detailKey ? '' : t(detailKey);
  const sentences = desc.split(/(?<=[.!?])\s+/).filter(Boolean);
  const [index, setIndex] = useState(0);
  const lastWheel = useRef(0);
  const stageRef = useRef(null);
  const reduce = useReducedMotion();
  const spring = reduce ? { duration: 0 } : BOUNCE;

  const step = useCallback(dir => setIndex(i => (i + dir + N) % N), [N]);

  // Horizontal trackpad / shift-wheel moves the carousel; plain vertical scroll keeps scrolling the page.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return undefined;
    const onWheel = e => {
      const dx = e.deltaX || (e.shiftKey ? e.deltaY : 0);
      if (Math.abs(dx) < 12 || Math.abs(dx) < Math.abs(e.deltaY) * (e.shiftKey ? 0 : 1)) return;
      e.preventDefault();
      const now = performance.now();
      if (now - lastWheel.current < WHEEL_COOLDOWN) return;
      lastWheel.current = now;
      step(dx > 0 ? 1 : -1);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [step]);

  // The whole row follows the finger (elastic), then springs back to rest with
  // a bounce while the slides settle on the new centre — like the home gallery.
  const controls = useDragControls();
  const dragged = useRef(false);
  const onPointerDown = e => {
    if (e.target.closest('video')) return; // keep the video's own controls usable
    controls.start(e);
  };
  const onDragEnd = (_, info) => {
    const { x } = info.offset;
    const v = info.velocity.x;
    if (x < -SWIPE_PX || v < -SWIPE_VELOCITY) step(1);
    else if (x > SWIPE_PX || v > SWIPE_VELOCITY) step(-1);
    setTimeout(() => (dragged.current = false), 0);
  };
  const onKeyDown = e => {
    if (e.key === 'ArrowLeft') step(-1);
    else if (e.key === 'ArrowRight') step(1);
  };

  return (
    <motion.section
      className="showcase__section"
      initial={reduce ? false : { opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={spring}
      aria-roledescription="carousel" aria-label={t(`g.${id}.name`)}>
      <div
        ref={stageRef}
        className="showcase__stage"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
      >
        <motion.div
          className="showcase__track"
          drag="x"
          dragControls={controls}
          dragListener={false}
          dragSnapToOrigin
          dragElastic={0.35}
          dragConstraints={{ left: 0, right: 0 }}
          dragTransition={{ bounceStiffness: 260, bounceDamping: 16 }}
          onDragStart={() => (dragged.current = true)}
          onDragEnd={onDragEnd}
        >
        {media.map((item, i) => {
          const o = offsetOf(i, index, N);
          const abs = Math.abs(o);
          if (abs > 3) return null;
          const current = o === 0;
          return (
            <motion.figure
              key={item.src}
              className={`showcase__slide${current ? ' is-current' : ''}`}
              style={{ zIndex: 10 - abs }}
              initial={false}
              animate={{
                x: `${o * 68}%`,
                scale: 1 - Math.min(abs, 3) * 0.14,
                y: current ? 0 : abs * 10,
                rotateY: current ? 0 : o * -6,
                opacity: abs > 2 ? 0 : 1
              }}
              transition={spring}
              aria-hidden={!current}
              onClick={!current && abs <= 2 ? () => !dragged.current && step(o) : undefined}
            >
              <Media item={item} active={current} alt={`${t(`g.${id}.name`)} — ${t('g.image')} ${i + 1}`} />
              <motion.span
                className="showcase__shade"
                initial={false}
                animate={{ opacity: current ? 0 : Math.min(0.35 + abs * 0.2, 0.8) }}
                transition={{ duration: 0.5 }}
              />
            </motion.figure>
          );
        })}
        </motion.div>
      </div>

      <header className="showcase__head">
        <span className="showcase__badge">
          {pad(number)} · {year} · {t(`g.${status}`)}
        </span>
        <h2 className="showcase__title">{t(`g.${id}.name`)}</h2>
        <span className="showcase__count" aria-live="polite">
          {pad(index + 1)} <i>/ {pad(N)}</i>
        </span>
      </header>

      <div className="showcase__detail">
        <section className="showcase__col">
          <h3>{t('showcase.about')}</h3>
          <p>{desc}</p>
          {extra && extra.split('\n\n').map((para, k) => <p key={k}>{para}</p>)}
        </section>
        <section className="showcase__col">
          <h3>{t('showcase.points')}</h3>
          <ul className="showcase__points">
            {sentences.map((line, k) => (
              <li key={k}>{line}</li>
            ))}
          </ul>
        </section>
        <section className="showcase__col">
          <h3>{t('showcase.stack')}</h3>
          <ul className="showcase__tags">
            {tags.map(tag => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <h3>{t('showcase.sheet')}</h3>
          <dl className="showcase__sheet">
            <dt>{t('showcase.year')}</dt>
            <dd>{year}</dd>
            <dt>{t('showcase.status')}</dt>
            <dd>{t(`g.${status}`)}</dd>
            <dt>{t('showcase.images')}</dt>
            <dd>{N}</dd>
          </dl>
        </section>
      </div>
    </motion.section>
  );
}

/**
 * Scroll aim-assist: native CSS `scroll-snap` (proximity) glides each project to the
 * top, under the nav bar. It is the ONLY snapping system: an extra JS "settle" pass
 * used to fight it and made the scroll stutter.
 */
function useScrollAssist() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('snap-projects');
    return () => root.classList.remove('snap-projects');
  }, []);
}

/** Up / down buttons (bottom right, mouse devices only): previous / next project. */
function ScrollArrows() {
  const { t } = useI18n();
  const [edge, setEdge] = useState({ top: true, bottom: false });

  const sections = () => [...document.querySelectorAll('.showcase__section')];
  const navH = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 60;
  const startOf = el => el.getBoundingClientRect().top + window.scrollY - navH();

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      setEdge({ top: window.scrollY < 4, bottom: atBottom });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const go = dir => {
    const list = sections();
    if (!list.length) return;
    const y = window.scrollY;
    const starts = list.map(startOf);
    let target;
    if (dir > 0) target = starts.find(v => v > y + 8);
    else {
      // Inside a project: back to its start first, then to the previous one.
      const before = starts.filter(v => v < y - 8);
      target = before.length ? before[before.length - 1] : 0;
    }
    if (target === undefined) target = document.documentElement.scrollHeight;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: Math.max(0, target), behavior: reduce ? 'auto' : 'smooth' });
  };

  return createPortal(
    <div className="showcase__arrows">
      <button type="button" onClick={() => go(-1)} disabled={edge.top} aria-label={t('showcase.prev')}>
        <FiChevronUp aria-hidden />
      </button>
      <button type="button" onClick={() => go(1)} disabled={edge.bottom} aria-label={t('showcase.next')}>
        <FiChevronDown aria-hidden />
      </button>
    </div>,
    document.body
  );
}

/** The projects page: one carousel per project, stacked; the page scrolls vertically through them. */
export default function ProjectsPage() {
  useScrollAssist();
  return (
    <div className="showcase">
      <ScrollArrows />
      {gallery.filter(p => p.media?.length).map((p, i) => (
        <Carousel key={p.id} project={p} number={i + 1} />
      ))}
    </div>
  );
}
