import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
  FiChevronLeft,
  FiChevronRight,
  FiCode,
  FiCpu,
  FiPause,
  FiPlay,
  FiX
} from 'react-icons/fi';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import { categoryOf, gallery } from '../../../data/projects.js';
import { PATHS, projectFromPath, projectPath } from '../../../lib/routes.js';
import ProjectDetails from './ProjectDetails.jsx';
import './ProjectsPage.css';

const pad = n => String(n).padStart(2, '0');
const canHover = () => window.matchMedia?.('(hover: hover) and (pointer: fine)').matches;
// Grid covers: a light 720x450 WebP cut from each project's best photo
// (`cover.webp` next to its media), not the first video frame (often black).
const coverOf = p => p.media[0].src.replace(/[^/]+$/, 'cover.webp');

/* ------------------------------------------------------------------------- */
/* Page header                                                               */
/* ------------------------------------------------------------------------- */

function PageIntro({ category, projects }) {
  const { t } = useI18n();
  const other = category === 'dev' ? 'eng' : 'dev';
  const Icon = category === 'dev' ? FiCode : FiCpu;
  const techs = new Set(projects.flatMap(p => p.tags ?? [])).size;
  const years = projects.map(p => Number(p.year)).filter(Boolean);
  const lo = Math.min(...years);
  const hi = Math.max(...years);
  const span = years.length ? (lo === hi ? `${hi}` : `${lo}–${hi}`) : '';
  const goOther = e => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('app:navigate', { detail: other }));
  };
  const stats = [
    [projects.length, t('page.stat.projects')],
    [techs, t('page.stat.techs')],
    span && [span, t('page.stat.years')]
  ].filter(Boolean);

  return (
    <header className="pj-intro">
      <span className="pj-intro__eyebrow">
        <Icon aria-hidden /> {t(`page.${category}.eyebrow`)}
      </span>
      <h1 className="pj-intro__title">{t(`nav.${category}`)}</h1>
      <p className="pj-intro__lead">{t(`page.${category}.lead`)}</p>
      <div className="pj-intro__foot">
        <dl className="pj-intro__stats">
          {stats.map(([value, label]) => (
            <div key={label}>
              <dd>{value}</dd>
              <dt>{label}</dt>
            </div>
          ))}
        </dl>
        <a className="pj-intro__switch" href={PATHS[other]} onClick={goOther}>
          {t(`page.see.${other}`)} <FiArrowRight aria-hidden />
        </a>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------------- */
/* Grid                                                                      */
/* ------------------------------------------------------------------------- */

/** Cover image; on a real mouse, the preview clip plays while the card is hovered. */
function CardMedia({ project, hovered }) {
  const first = project.media[0];
  const video = first.type === 'video' ? first : null;
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!hovered) setReady(false);
  }, [hovered]);
  return (
    <div className="pj-card__media">
      <img src={coverOf(project)} alt="" loading="lazy" decoding="async" draggable={false} />
      {video && hovered && (
        <video
          src={video.src}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          aria-hidden
          className={ready ? 'is-ready' : undefined}
          onPlaying={() => setReady(true)}
        />
      )}
    </div>
  );
}

function ProjectCard({ project, index, onOpen, view }) {
  const { t } = useI18n();
  const [hovered, setHovered] = useState(false);
  const name = t(`g.${project.id}.name`);
  const tags = project.tags ?? [];
  const open = e => {
    // Let ctrl/cmd/middle clicks open the project URL in a new tab.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    onOpen(project.id, e.currentTarget);
  };
  return (
    <li className="pj-card" style={{ '--i': index }}>
      <a
        href={projectPath(view, project.id)}
        className="pj-card__link"
        onClick={open}
        onPointerEnter={e => e.pointerType === 'mouse' && canHover() && setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <CardMedia project={project} hovered={hovered} />
        <div className="pj-card__body">
          <div className="pj-card__meta">
            <span>{project.year}</span>
            <span className={`pj-status pj-status--${project.status}`}>{t(`g.${project.status}`)}</span>
          </div>
          <h2 className="pj-card__title">
            {name}
            <FiArrowUpRight aria-hidden className="pj-card__arrow" />
          </h2>
          <p className="pj-card__desc">{t(`g.${project.id}.desc`)}</p>
          <ul className="pj-tags" aria-label={t('showcase.stack')}>
            {tags.slice(0, 3).map(tag => (
              <li key={tag}>{tag}</li>
            ))}
            {tags.length > 3 && <li className="pj-tags__more">+{tags.length - 3}</li>}
          </ul>
        </div>
      </a>
    </li>
  );
}

/* ------------------------------------------------------------------------- */
/* Project panel                                                             */
/* ------------------------------------------------------------------------- */

/** A video slide: plays (muted, looping) only while it is the slide in view. */
function SlideVideo({ item, active, label }) {
  const { t } = useI18n();
  const ref = useRef(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    setPaused(false);
    if (active) v.play()?.catch(() => setPaused(true));
    else v.pause();
  }, [active]);
  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play()?.catch(() => {});
      setPaused(false);
    } else {
      v.pause();
      setPaused(true);
    }
  };
  return (
    <>
      <video
        ref={ref}
        src={item.src}
        poster={item.poster}
        muted
        loop
        playsInline
        preload={active ? 'auto' : 'none'}
        aria-label={label}
        onClick={toggle}
      />
      <button
        type="button"
        className="pj-viewer__pp"
        onClick={toggle}
        aria-label={paused ? t('showcase.play') : t('showcase.pause')}
      >
        {paused ? <FiPlay aria-hidden /> : <FiPause aria-hidden />}
      </button>
    </>
  );
}

/**
 * Media viewer: a native horizontal scroll-snap track (swipe on touch,
 * trackpad on desktop, pinch-zoom kept), driven by arrows, thumbnails and
 * the keyboard. The slide in view is tracked by an IntersectionObserver.
 */
function Viewer({ project, name }) {
  const { t } = useI18n();
  const media = project.media;
  const trackRef = useRef(null);
  const thumbsRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number(e.target.dataset.index));
        }
      },
      { root: track, threshold: 0.6 }
    );
    [...track.children].forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [media]);

  // Keep the current thumbnail visible (scrolls the strip only, never the page).
  useEffect(() => {
    const strip = thumbsRef.current;
    const thumb = strip?.children[active];
    if (!strip || !thumb) return;
    const left = thumb.offsetLeft - (strip.clientWidth - thumb.clientWidth) / 2;
    strip.scrollTo({ left, behavior: 'smooth' });
  }, [active]);

  const go = useCallback(
    i => {
      const track = trackRef.current;
      if (!track) return;
      const next = Math.max(0, Math.min(media.length - 1, i));
      track.scrollTo({ left: next * track.clientWidth, behavior: 'smooth' });
    },
    [media.length]
  );

  useEffect(() => {
    const onKey = e => {
      if (e.target.closest?.('input, textarea, select')) return;
      if (e.key === 'ArrowLeft') go(active - 1);
      else if (e.key === 'ArrowRight') go(active + 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, go]);

  return (
    <div className="pj-viewer">
      <div className="pj-viewer__stage">
        <div className="pj-viewer__track" ref={trackRef} tabIndex={-1}>
          {media.map((item, i) => {
            const label = `${name}, ${t('g.image')} ${i + 1}`;
            return (
              <figure className="pj-viewer__slide" key={item.src} data-index={i}>
                {item.type === 'video' ? (
                  <SlideVideo item={item} active={i === active} label={label} />
                ) : (
                  <img
                    src={item.src}
                    alt={label}
                    loading={Math.abs(i - active) <= 1 ? 'eager' : 'lazy'}
                    decoding="async"
                    draggable={false}
                  />
                )}
              </figure>
            );
          })}
        </div>
        {media.length > 1 && (
          <>
            <button
              type="button"
              className="pj-viewer__arrow pj-viewer__arrow--prev"
              onClick={() => go(active - 1)}
              disabled={active === 0}
              aria-label={t('showcase.prevImage')}
            >
              <FiChevronLeft aria-hidden />
            </button>
            <button
              type="button"
              className="pj-viewer__arrow pj-viewer__arrow--next"
              onClick={() => go(active + 1)}
              disabled={active === media.length - 1}
              aria-label={t('showcase.nextImage')}
            >
              <FiChevronRight aria-hidden />
            </button>
          </>
        )}
        <span className="pj-viewer__count" aria-live="polite">
          {pad(active + 1)} <i>/ {pad(media.length)}</i>
        </span>
      </div>
      {media.length > 1 && (
        <div className="pj-viewer__thumbs" ref={thumbsRef}>
          {media.map((item, i) => (
            <button
              type="button"
              key={item.src}
              className={i === active ? 'is-active' : undefined}
              aria-label={`${t('g.image')} ${i + 1}`}
              aria-current={i === active ? 'true' : undefined}
              onClick={() => go(i)}
            >
              <img src={item.type === 'video' ? item.poster : item.src} alt="" loading="lazy" decoding="async" />
              {item.type === 'video' && <FiPlay aria-hidden className="pj-viewer__thumb-play" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectPanel({ project, projects, onClose, onOpen }) {
  const { t } = useI18n();
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const idx = projects.findIndex(p => p.id === project.id);
  const prev = projects[idx - 1];
  const next = projects[idx + 1];
  const name = t(`g.${project.id}.name`);
  const desc = t(`g.${project.id}.desc`);
  const detailKey = `g.${project.id}.detail`;
  const extra = t(detailKey) === detailKey ? '' : t(detailKey);

  // Lock the page behind, close on Escape, keep Tab inside the panel.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('pj-locked');
    const onKey = e => {
      if (e.key === 'Escape') onClose();
      if (e.key !== 'Tab' || !panelRef.current) return;
      const items = panelRef.current.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), video'
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      root.classList.remove('pj-locked');
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  // New project: back to the top of the panel, focus on the close button.
  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0 });
    closeRef.current?.focus({ preventScroll: true });
  }, [project.id]);

  return createPortal(
    <div className="pj-modal" role="presentation" onMouseDown={e => e.target === e.currentTarget && onClose()}>
      <article
        className="pj-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pj-panel-title"
        key={project.id}
      >
        <div className="pj-panel__bar">
          <span className="pj-panel__crumb">
            {pad(idx + 1)} <i>/ {pad(projects.length)}</i>
          </span>
          <div className="pj-panel__nav">
            <button type="button" onClick={() => prev && onOpen(prev.id)} disabled={!prev} aria-label={t('showcase.prev')}>
              <FiArrowLeft aria-hidden />
            </button>
            <button type="button" onClick={() => next && onOpen(next.id)} disabled={!next} aria-label={t('showcase.next')}>
              <FiArrowRight aria-hidden />
            </button>
            <button type="button" ref={closeRef} className="pj-panel__close" onClick={onClose} aria-label={t('showcase.close')}>
              <FiX aria-hidden />
            </button>
          </div>
        </div>

        <header className="pj-panel__head">
          <div className="pj-card__meta">
            <span>{project.year}</span>
            <span className={`pj-status pj-status--${project.status}`}>{t(`g.${project.status}`)}</span>
          </div>
          <h2 id="pj-panel-title" className="pj-panel__title">
            {name}
          </h2>
        </header>

        <Viewer project={project} name={name} />

        <div className="pj-panel__body">
          <section className="pj-panel__text">
            <h3>{t('showcase.about')}</h3>
            <p>{desc}</p>
            {extra &&
              extra.split('\n\n').map((para, k) => (
                <p key={k}>{para}</p>
              ))}
          </section>
          <aside className="pj-panel__side">
            <h3>{t('showcase.sheet')}</h3>
            <dl className="pj-sheet">
              <div>
                <dt>{t('showcase.year')}</dt>
                <dd>{project.year}</dd>
              </div>
              <div>
                <dt>{t('showcase.status')}</dt>
                <dd>{t(`g.${project.status}`)}</dd>
              </div>
              <div>
                <dt>{t('showcase.images')}</dt>
                <dd>{project.media.length}</dd>
              </div>
            </dl>
            <h3>{t('showcase.stack')}</h3>
            <ul className="pj-tags pj-tags--lg">
              {(project.tags ?? []).map(tag => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="pj-panel__details">
          <ProjectDetails project={project} />
        </div>

        {(prev || next) && (
          <nav className="pj-panel__pager" aria-label={t('showcase.progress')}>
            {prev ? (
              <button type="button" onClick={() => onOpen(prev.id)}>
                <span>
                  <FiArrowLeft aria-hidden /> {t('showcase.prev')}
                </span>
                <strong>{t(`g.${prev.id}.name`)}</strong>
              </button>
            ) : (
              <span />
            )}
            {next && (
              <button type="button" className="is-next" onClick={() => onOpen(next.id)}>
                <span>
                  {t('showcase.next')} <FiArrowRight aria-hidden />
                </span>
                <strong>{t(`g.${next.id}.name`)}</strong>
              </button>
            )}
          </nav>
        )}
      </article>
    </div>,
    document.body
  );
}

/* ------------------------------------------------------------------------- */
/* Page                                                                      */
/* ------------------------------------------------------------------------- */

/** A projects page (software or hardware): header, tech filters, card grid, project panel. */
export default function ProjectsPage({ category }) {
  const { t } = useI18n();
  const projects = useMemo(
    () => gallery.filter(p => p.media?.length && categoryOf(p.id) === category),
    [category]
  );
  const [filter, setFilter] = useState(null);
  const valid = useCallback(id => (projects.some(p => p.id === id) ? id : null), [projects]);
  const [openId, setOpenId] = useState(() => valid(projectFromPath()));
  const opener = useRef(null);

  // The most used technologies of this page become filter chips.
  const filters = useMemo(() => {
    const counts = new Map();
    projects.forEach(p => (p.tags ?? []).forEach(tag => counts.set(tag, (counts.get(tag) ?? 0) + 1)));
    return [...counts]
      .filter(([, n]) => n > 1)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 6)
      .map(([tag]) => tag);
  }, [projects]);
  const shown = filter ? projects.filter(p => p.tags?.includes(filter)) : projects;

  // Unknown project in the URL: fall back to the list URL.
  useEffect(() => {
    const id = projectFromPath();
    if (id && !valid(id)) window.history.replaceState(null, '', PATHS[category]);
  }, [category, valid]);

  // Back/forward buttons (and the nav bar) open/close the panel through the URL.
  useEffect(() => {
    const sync = () => setOpenId(valid(projectFromPath()));
    window.addEventListener('popstate', sync);
    window.addEventListener('app:route', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('app:route', sync);
    };
  }, [valid]);

  const open = useCallback(
    (id, from) => {
      if (from) opener.current = from;
      const url = projectPath(category, id);
      // Opening from the grid adds a history entry (Back closes the panel);
      // prev/next inside the panel only replace it.
      if (projectFromPath()) window.history.replaceState({ pj: true }, '', url);
      else window.history.pushState({ pj: true }, '', url);
      setOpenId(id);
    },
    [category]
  );

  const close = useCallback(() => {
    if (window.history.state?.pj) window.history.back();
    else {
      window.history.replaceState(null, '', PATHS[category]);
      setOpenId(null);
    }
  }, [category]);

  // Panel closed: focus goes back to the card that opened it.
  useEffect(() => {
    if (openId) return;
    const el = opener.current;
    opener.current = null;
    el?.focus?.({ preventScroll: true });
  }, [openId]);

  const current = openId ? projects.find(p => p.id === openId) : null;

  return (
    <div className="pj-page">
      <PageIntro category={category} projects={projects} />

      {filters.length > 0 && (
        <div className="pj-filters" role="toolbar" aria-label={t('showcase.filter')}>
          <button type="button" aria-pressed={!filter} onClick={() => setFilter(null)}>
            {t('showcase.all')} <span>{projects.length}</span>
          </button>
          {filters.map(tag => (
            <button
              type="button"
              key={tag}
              aria-pressed={filter === tag}
              onClick={() => setFilter(f => (f === tag ? null : tag))}
            >
              {tag} <span>{projects.filter(p => p.tags?.includes(tag)).length}</span>
            </button>
          ))}
        </div>
      )}

      <ul className="pj-grid" key={filter ?? 'all'}>
        {shown.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} onOpen={open} view={category} />
        ))}
      </ul>

      {current && <ProjectPanel project={current} projects={projects} onClose={close} onOpen={open} />}
    </div>
  );
}
