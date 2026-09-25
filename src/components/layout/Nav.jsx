import { useEffect, useRef, useState } from 'react';
import LangSwitch from './LangSwitch.jsx';
import { motion, useReducedMotion } from 'motion/react';
import { FiEye, FiFolder, FiHome, FiMenu, FiX } from 'react-icons/fi';
import Logo from './Logo.jsx';
import CountUp from '../ui/CountUp/CountUp.jsx';
import { useI18n } from '../../i18n/I18nProvider.jsx';
import useVisitCount from '../../hooks/useVisitCount.js';
import useIsMobile from '../../hooks/useIsMobile.js';
import './Nav.css';

const LINKS = [
  { id: 'home', key: 'nav.home', Icon: FiHome },
  { id: 'projects', key: 'nav.projects', Icon: FiFolder }
];

// Springy on purpose: when the bar gathers in the middle it overshoots and settles (bounce).
const BOUNCE = { type: 'spring', stiffness: 220, damping: 24, mass: 0.9 };

/** `view` is the page on screen ('home' | 'projects'); `centered` gathers the bar in the middle. */
export default function Nav({ view, centered, onNavigate }) {
  const { lang, t } = useI18n();
  const visits = useVisitCount();
  const [active, setActive] = useState('home');
  const reduce = useReducedMotion();
  const spring = reduce ? { duration: 0 } : BOUNCE;
  const onProjects = view === 'projects';
  // Actually not rendered, not just hidden: mounting both the desktop bar and
  // the phone FAB and letting CSS pick one meant two live copies of the
  // visits counter (its own `requestAnimationFrame` count-up) and the
  // language switch on every page, permanently — one of them always doing
  // real work for nothing. Only the relevant one exists in the DOM now.
  const isMobile = useIsMobile(700);
  const [fabOpen, setFabOpen] = useState(false);
  // The panel clips its content (`overflow: hidden`) while it grows/shrinks —
  // that's the whole "elongates" reveal effect — but the same clipping was
  // also hiding the language switch's own code-notation popup, which pops up
  // above the panel and needs to escape it. Once the opening transition has
  // actually finished, overflow switches to visible so that popup can show;
  // closing drops back to hidden immediately (not on a timer) so the closing
  // animation still clips correctly.
  const [settled, setSettled] = useState(false);
  const fabRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!fabOpen) {
      setSettled(false);
      return undefined;
    }
    const el = panelRef.current;
    if (!el) return undefined;
    const onEnd = e => {
      if (e.target === el && e.propertyName === 'max-width') setSettled(true);
    };
    el.addEventListener('transitionend', onEnd);
    // Reduced motion (or a browser that skips the transition for any reason)
    // never fires `transitionend`: settle immediately so the popup still works.
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) setSettled(true);
    return () => el.removeEventListener('transitionend', onEnd);
  }, [fabOpen]);

  // Close the FAB on Escape, on an outside tap, and whenever the page changes.
  useEffect(() => {
    if (!fabOpen) return undefined;
    const onKey = e => e.key === 'Escape' && setFabOpen(false);
    const onDown = e => {
      if (fabRef.current && !fabRef.current.contains(e.target)) setFabOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [fabOpen]);

  // On the home page, highlight "Projets" once the page has scrolled down to the projects cards.
  useEffect(() => {
    if (onProjects) return undefined;
    // An IntersectionObserver reports when the projects cards cross 45% of the
    // viewport height, so nothing measures layout on each scroll frame (that
    // read, in requestAnimationFrame, forced a synchronous layout per frame).
    // "Home" stays active until the visitor has actually scrolled: on a tall
    // window the projects cards are already on screen at scroll 0.
    let target = null;
    let reachedLine = false;
    let scrolled = window.scrollY > 40;
    const sync = () => setActive(scrolled && reachedLine ? 'projects' : 'home');
    const io =
      typeof IntersectionObserver === 'undefined'
        ? null
        : new IntersectionObserver(
            ([entry]) => {
              const line = entry.rootBounds ? entry.rootBounds.bottom : window.innerHeight * 0.45;
              reachedLine = entry.boundingClientRect.top < line;
              sync();
            },
            { rootMargin: '0px 0px -55% 0px' }
          );
    // The cards are remounted by a language switch or a page change: follow
    // the live element.
    const attach = () => {
      if (!io || (target && target.isConnected)) return;
      io.disconnect();
      target = document.querySelector('.cell-eng-projects');
      if (target) io.observe(target);
    };
    const onScroll = () => {
      scrolled = window.scrollY > 40;
      attach();
      sync();
    };
    attach();
    sync();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      io?.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [onProjects]);

  const go = (e, { id }) => {
    e.preventDefault();
    setFabOpen(false);
    if (id === 'projects') {
      onNavigate('projects');
    } else if (onProjects) {
      onNavigate('home');
    } else {
      const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
      window.scrollTo({ top: 0, behavior });
    }
  };

  const current = onProjects ? 'projects' : active;

  const visitsPill = (
    <span className="bento-nav__visits" tabIndex={0} aria-label={t('nav.visits')}>
      <FiEye aria-hidden size="1em" />
      <CountUp
        key={lang}
        to={visits ?? 0}
        duration={2.2}
        locale={lang === 'fr' ? 'fr-FR' : 'en-GB'}
        className="bento-nav__visits-count"
      />
      <span className="bento-nav__visits-label">{t('nav.visits')}</span>
    </span>
  );

  if (isMobile) {
    return (
      // Phones: one floating button, bottom right. Tapping it elongates it
      // into a pill (plain CSS max-width transition, no layout-tracking
      // animation — the only thing that ever caused it to glitch) that holds
      // the same controls the desktop bar has.
      <div ref={fabRef} className={`bento-fab${fabOpen ? ' is-open' : ''}`}>
        <div
          ref={panelRef}
          className={`bento-fab__panel${settled ? ' is-settled' : ''}`}
          id="fab-panel"
          inert={!fabOpen}
        >
          {LINKS.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`bento-fab__link${current === link.id ? ' is-active' : ''}`}
              aria-current={current === link.id ? 'page' : undefined}
              onClick={e => go(e, link)}
            >
              <link.Icon aria-hidden size="1.2em" />
              <span className="bento-nav__link-label">{t(link.key)}</span>
            </a>
          ))}
          {visitsPill}
          <LangSwitch />
        </div>
        <button
          type="button"
          className="bento-fab__toggle"
          aria-label="Menu"
          aria-expanded={fabOpen}
          aria-controls="fab-panel"
          onClick={() => setFabOpen(o => !o)}
        >
          {/* Pixels: Safari rejects "rem" in an SVG width/height attribute. */}
          {fabOpen ? <FiX aria-hidden size={21} /> : <FiMenu aria-hidden size={21} />}
        </button>
      </div>
    );
  }

  // Desktop / tablet: the classic top bar, unchanged.
  return (
    <nav className={`bento-nav${centered ? ' is-centered' : ''}`}>
      <motion.a layout="position" layoutDependency={centered} transition={spring} href="#home" className="bento-nav__logo" aria-label="Rayane Yazid" onClick={e => go(e, LINKS[0])}>
        <Logo />
      </motion.a>
      <motion.ul layout="position" layoutDependency={centered} transition={{ ...spring, delay: reduce ? 0 : 0.05 }} className="bento-nav__links">
        {LINKS.map(link => (
          <li key={link.id}>
            <a
              href={`#${link.id}`}
              className={current === link.id ? 'is-active' : ''}
              aria-current={current === link.id ? 'page' : undefined}
              onClick={e => go(e, link)}
            >
              <link.Icon aria-hidden size="1.15em" />
              <span className="bento-nav__link-label">{t(link.key)}</span>
            </a>
          </li>
        ))}
      </motion.ul>
      <motion.div layout="position" layoutDependency={centered} transition={{ ...spring, delay: reduce ? 0 : 0.1 }} className="bento-nav__tools">
        {visitsPill}
        <LangSwitch />
      </motion.div>
    </nav>
  );
}
