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
  const [active, setActive] = useState('home');
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
    const sync = () => {
      const card = scrolled ? [...inBand][0] : null;
      setActive(!card ? 'home' : card.classList.contains('cell-eng-projects') ? 'eng' : 'dev');
    };
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
    if (id !== 'home') {
      onNavigate(id);
    } else if (onProjects) {
      onNavigate('home');
    } else {
      const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
      window.scrollTo({ top: 0, behavior });
    }
  };

  const current = onProjects ? view : active;

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

  // Desktop / tablet: the classic top bar, unchanged.
  return (
    <nav className={`bento-nav${centered ? ' is-centered' : ''}`}>
      <motion.a layout="position" layoutDependency={centered} transition={spring} href="/" className="bento-nav__logo" aria-label="Rayane Yazid" onClick={e => go(e, LINKS[0])}>
        <Logo />
      </motion.a>
      <motion.ul layout="position" layoutDependency={centered} transition={{ ...spring, delay: reduce ? 0 : 0.05 }} className="bento-nav__links">
        {LINKS.map(link => (
          <li key={link.id}>
            <a
              href={PATHS[link.id]}
              className={current === link.id ? 'is-active' : ''}
              aria-current={current === link.id ? 'page' : undefined}
              onClick={e => go(e, link)}
            >
              <link.Icon size={18} />
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
