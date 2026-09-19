import { useEffect, useRef, useState } from 'react';
import LangSwitch from './LangSwitch.jsx';
import { motion, useReducedMotion } from 'motion/react';
import { FiEye, FiFolder, FiHome, FiMenu, FiX } from 'react-icons/fi';
import Logo from './Logo.jsx';
import CountUp from '../ui/CountUp/CountUp.jsx';
import { useI18n } from '../../i18n/I18nProvider.jsx';
import useVisitCount from '../../hooks/useVisitCount.js';
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
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);

  // Phone menu: close on Escape, on an outside tap, and whenever the page changes.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = e => e.key === 'Escape' && setOpen(false);
    const onDown = e => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [open]);

  // On the home page, highlight "Projets" once the page has scrolled down to the projects cards.
  useEffect(() => {
    if (onProjects) return undefined;
    let frame = null;
    const update = () => {
      frame = null;
      const projects = document.querySelector('.cell-eng-projects');
      // "Home" stays active until the visitor has actually scrolled: on a tall
      // window the projects cards are already on screen at scroll 0.
      const reached =
        window.scrollY > 40 && projects && projects.getBoundingClientRect().top < window.innerHeight * 0.45;
      setActive(reached ? 'projects' : 'home');
    };
    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [onProjects]);

  const go = (e, { id }) => {
    e.preventDefault();
    setOpen(false);
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

  return (
    <nav ref={navRef} className={`bento-nav${centered ? ' is-centered' : ''}${open ? ' is-open' : ''}`}>
      <motion.a
        layout="position"
        transition={spring}
        href="#home"
        className="bento-nav__logo"
        aria-label="Rayane Yazid"
        onClick={e => go(e, LINKS[0])}
      >
        <Logo />
      </motion.a>
      <div className="bento-nav__scrim" aria-hidden="true" onClick={() => setOpen(false)} />
      <div className="bento-nav__menu" id="nav-menu">
      <motion.ul layout="position" transition={{ ...spring, delay: reduce ? 0 : 0.05 }} className="bento-nav__links">
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
      <motion.div layout="position" transition={{ ...spring, delay: reduce ? 0 : 0.1 }} className="bento-nav__tools">
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
        <LangSwitch />
      </motion.div>
      </div>
      {/* Phones: the visit counter stays in the bar, next to the burger (the copy in the menu is hidden there). */}
      <div className="bento-nav__actions">
        <span className="bento-nav__visits bento-nav__visits--bar" aria-label={t('nav.visits')}>
          <FiEye aria-hidden size="1em" />
          <CountUp
            key={lang}
            to={visits ?? 0}
            duration={2.2}
            locale={lang === 'fr' ? 'fr-FR' : 'en-GB'}
            className="bento-nav__visits-count"
          />
        </span>
        <button
          type="button"
          className="bento-nav__burger"
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="nav-menu"
          onClick={() => setOpen(o => !o)}
        >
          {open ? <FiX aria-hidden size="1.4rem" /> : <FiMenu aria-hidden size="1.4rem" />}
        </button>
      </div>
    </nav>
  );
}
