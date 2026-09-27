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
  const fabRef = useRef(null);

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

  // Desktop bar, home page: "Projets" lights up only while one of the two
  // projects cards is actually in the middle of the screen (a band at 40-50%
  // of the height), and goes back to "Accueil" once they have scrolled past.
  // (It used to stay on "Projets" for the whole rest of the page.) The phone
  // menu skips this: both of its entries change page, so on the home page
  // "Accueil" is simply the current one.
  useEffect(() => {
    if (onProjects || isMobile || typeof IntersectionObserver === 'undefined') {
      setActive('home');
      return undefined;
    }
    const inBand = new Set();
    let scrolled = window.scrollY > 40;
    const sync = () => setActive(scrolled && inBand.size > 0 ? 'projects' : 'home');
    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) inBand.add(e.target);
          else inBand.delete(e.target);
        }
        sync();
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );
    // The cards are remounted by a language switch or a page change: follow
    // the live elements.
    let targets = [];
    const attach = () => {
      if (targets.length && targets.every(el => el.isConnected)) return;
      io.disconnect();
      inBand.clear();
      targets = [...document.querySelectorAll('.cell-dev-projects, .cell-eng-projects')];
      targets.forEach(el => io.observe(el));
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
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [onProjects, isMobile]);

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
      // Phones: one floating button, bottom right. Tapping it opens a small
      // menu card above it: the two pages as large labelled rows, then the
      // visit counter and the language switch. Opaque (no backdrop blur: it
      // sits over the page through every scroll frame) and animated with
      // opacity/transform only.
      <div ref={fabRef} className={`bento-fab${fabOpen ? ' is-open' : ''}`}>
        <div className="bento-fab__panel" id="fab-panel" inert={!fabOpen}>
          <nav className="bento-fab__nav" aria-label="Navigation">
            {LINKS.map(link => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`bento-fab__link${current === link.id ? ' is-active' : ''}`}
                aria-current={current === link.id ? 'page' : undefined}
                onClick={e => go(e, link)}
              >
                <span className="bento-fab__link-icon">
                  <link.Icon aria-hidden size={18} />
                </span>
                <span className="bento-fab__link-label">{t(link.key)}</span>
              </a>
            ))}
          </nav>
          <div className="bento-fab__footer">
            {visitsPill}
            <LangSwitch />
          </div>
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
