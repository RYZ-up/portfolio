import { useEffect, useRef, useState } from 'react';
import LangSwitch from './LangSwitch.jsx';
import { motion, useReducedMotion } from 'motion/react';
import { CodeIcon, CpuIcon, EyeIcon, GlobeIcon, HomeIcon } from '../icons/index.js';
import Logo from './Logo.jsx';
import CountUp from '../ui/CountUp/CountUp.jsx';
import { useI18n } from '../../i18n/I18nProvider.jsx';
import useVisitCount from '../../hooks/useVisitCount.js';
import useIsMobile from '../../hooks/useIsMobile.js';
import { PATHS } from '../../lib/routes.js';
import useGooey from '../ui/GooeyNav/useGooey.js';
import '../ui/GooeyNav/GooeyNav.css';
import './Nav.css';

const LINKS = [
  { id: 'home', key: 'nav.home', Icon: HomeIcon },
  { id: 'dev', key: 'nav.dev', Icon: CodeIcon },
  { id: 'web', key: 'nav.web', Icon: GlobeIcon },
  { id: 'eng', key: 'nav.eng', Icon: CpuIcon }
];

// Springy on purpose: when the bar gathers in the middle it overshoots and settles (bounce).
const BOUNCE = { type: 'spring', stiffness: 220, damping: 24, mass: 0.9 };

/** `view` is the page on screen ('home' | 'dev' | 'eng'); `centered` gathers the bar in the middle. */
export default function Nav({ view, centered, onNavigate }) {
  const { lang, t } = useI18n();
  const visits = useVisitCount();
  const reduce = useReducedMotion();
  const spring = reduce ? { duration: 0 } : BOUNCE;
  const onProjects = view !== 'home';
  // Actually not rendered, not just hidden: mounting both the desktop bar and
  // the phone FAB and letting CSS pick one meant two live copies of the
  // visits counter (its own `requestAnimationFrame` count-up) and the
  // language switch on every page, permanently — one of them always doing
  // real work for nothing. Only the relevant one exists in the DOM now.
  const isMobile = useIsMobile(700);
  const [fabOpen, setFabOpen] = useState(false);
  const fabRef = useRef(null);

  // Full-screen phone menu: the page behind is locked, Escape closes it.
  // The circle that grows out of the button must cover the farthest screen
  // corner: its scale is computed from the viewport when the menu opens.
  useEffect(() => {
    if (!fabOpen) return undefined;
    const root = document.documentElement;
    const reach = Math.hypot(window.innerWidth, window.innerHeight) * 2;
    fabRef.current?.style.setProperty('--fab-scale', String(Math.ceil(reach / 52) + 1));
    root.classList.add('fab-locked');
    const onKey = e => e.key === 'Escape' && setFabOpen(false);
    document.addEventListener('keydown', onKey);
    return () => {
      root.classList.remove('fab-locked');
      document.removeEventListener('keydown', onKey);
    };
  }, [fabOpen]);

  const go = (e, { id }) => {
    e.preventDefault();
    setFabOpen(false);
    if (id !== 'home') {
      onNavigate(id);
    } else if (onProjects) {
      onNavigate('home');
    } else {
      const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
      window.scrollTo({ top: 0, behavior });
    }
  };

  // The link of the page on screen; the home page never lights another one.
  const current = view;
  const gooey = useGooey(current);
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    if (isMobile) return undefined;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMobile]);

  const visitsPill = (
    <span className="bento-nav__visits" tabIndex={0} aria-label={t('nav.visits')}>
      <EyeIcon size={15} />
      {visits == null ? (
        // Still loading (or offline with no known total): a dash, never a made-up number.
        <span className="bento-nav__visits-count">–</span>
      ) : (
        <CountUp
          key={lang}
          to={visits}
          duration={2.2}
          locale={lang === 'fr' ? 'fr-FR' : 'en-GB'}
          className="bento-nav__visits-count"
        />
      )}
      <span className="bento-nav__visits-label">{t('nav.visits')}</span>
    </span>
  );

  if (isMobile) {
    return (
      // Phones: one floating button, bottom right. Tapping it grows a circle
      // out of the button until it fills the screen, then the pages come in
      // one after the other as large rows (number, title, one-line hint),
      // with the visits and the language switch at the bottom. Everything
      // animates on transform/opacity only (compositor), and closing plays
      // it backwards.
      <div ref={fabRef} className={`bento-fab${fabOpen ? ' is-open' : ''}`}>
        <div className="bento-fab__bg" aria-hidden="true" />
        <div className="bento-fab__panel" id="fab-panel" inert={!fabOpen}>
          <div className="bento-fab__head" style={{ '--i': -1 }}>
            <span className="bento-fab__logo">
              <Logo />
            </span>
            <span>
              <strong>Rayane Yazid</strong>
              <span>{t('menu.role')}</span>
            </span>
          </div>
          <p className="bento-fab__eyebrow">Menu</p>
          <nav className="bento-fab__nav" aria-label="Navigation">
            {LINKS.map((link, i) => (
              <a
                key={link.id}
                href={PATHS[link.id]}
                style={{ '--i': i }}
                className={`bento-fab__link${current === link.id ? ' is-active' : ''}`}
                aria-current={current === link.id ? 'page' : undefined}
                onClick={e => go(e, link)}
              >
                <span className="bento-fab__link-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="bento-fab__link-text">
                  <span className="bento-fab__link-label">{t(link.key)}</span>
                  <span className="bento-fab__link-hint">{t(`menu.${link.id}`)}</span>
                </span>
                <span className="bento-fab__link-icon">
                  <link.Icon size={18} />
                </span>
              </a>
            ))}
          </nav>
          <div className="bento-fab__footer" style={{ '--i': LINKS.length }}>
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
          {/* Two bars that turn into a cross. */}
          <span className="bento-fab__bars" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </div>
    );
  }

  // Desktop / tablet: a strip pinned to the cork wall; it tightens once the
  // page is scrolled (`is-scrolled`).
  return (
    <nav ref={navRef} className={`bento-nav${centered ? ' is-centered' : ''}${scrolled ? ' is-scrolled' : ''}`}>
      <span className="nav-pin nav-pin--l" aria-hidden="true" />
      <span className="nav-pin nav-pin--r" aria-hidden="true" />
      <motion.a layout="position" layoutDependency={centered} transition={spring} href="/" className="bento-nav__logo" aria-label="Rayane Yazid" onClick={e => go(e, LINKS[0])}>
        <Logo />
      </motion.a>
      <motion.ul ref={gooey.listRef} layout="position" layoutDependency={centered} transition={{ ...spring, delay: reduce ? 0 : 0.05 }} className="bento-nav__links gooey" onLayoutAnimationComplete={gooey.place}>
        <li className="gooey__pill" ref={gooey.pillRef} aria-hidden="true" />
        <li className="gooey__fx" ref={gooey.fxRef} aria-hidden="true" />
        {LINKS.map(link => (
          <li key={link.id}>
            <a
              href={PATHS[link.id]}
              className={current === link.id ? 'is-active' : ''}
              aria-current={current === link.id ? 'page' : undefined}
              onClick={e => {
                if (link.id !== current) gooey.burst(e.currentTarget);
                go(e, link);
              }}
            >
              <link.Icon size={18} />
              <span className="bento-nav__link-label">{t(link.key)}</span>
            </a>
          </li>
        ))}
      </motion.ul>
      <svg className="gooey__svg" aria-hidden="true" focusable="false">
        <filter id="gooey-filter">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feColorMatrix in="blur" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" />
        </filter>
      </svg>
      <motion.div layout="position" layoutDependency={centered} transition={{ ...spring, delay: reduce ? 0 : 0.1 }} className="bento-nav__tools">
        {visitsPill}
        <LangSwitch />
      </motion.div>
    </nav>
  );
}
