import { useEffect, useState } from 'react';
import { FiEye, FiFolder, FiHome } from 'react-icons/fi';
import Logo from './Logo.jsx';
import CountUp from '../ui/CountUp/CountUp.jsx';
import { useI18n } from '../../i18n/I18nProvider.jsx';
import useVisitCount from '../../hooks/useVisitCount.js';
import './Nav.css';

const LINKS = [
  { id: 'home', key: 'nav.home', Icon: FiHome, target: null },
  { id: 'projects', key: 'nav.projects', Icon: FiFolder, target: '.cell-eng-projects' }
];

export default function Nav() {
  const { lang, t, toggle } = useI18n();
  const visits = useVisitCount();
  const [active, setActive] = useState('home');

  // Highlight "Projets" once the page has scrolled down to the projects cards.
  useEffect(() => {
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
  }, []);

  // The target's `scroll-margin-top` (layout.css) keeps it clear of the sticky bar.
  const go = (e, { target }) => {
    e.preventDefault();
    const el = target ? document.querySelector(target) : null;
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    if (el) el.scrollIntoView({ behavior, block: 'start' });
    else window.scrollTo({ top: 0, behavior });
  };

  return (
    <nav className="bento-nav">
      <a href="#home" className="bento-nav__logo" aria-label="Rayane Yazid" onClick={e => go(e, LINKS[0])}>
        <Logo />
      </a>
      <ul className="bento-nav__links">
        {LINKS.map(link => (
          <li key={link.id}>
            <a
              href={`#${link.id}`}
              className={active === link.id ? 'is-active' : ''}
              aria-current={active === link.id ? 'page' : undefined}
              onClick={e => go(e, link)}
            >
              <link.Icon aria-hidden size="1.15em" />
              <span className="bento-nav__link-label">{t(link.key)}</span>
            </a>
          </li>
        ))}
      </ul>
      <div className="bento-nav__tools">
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
        <button type="button" className="bento-nav__lang" onClick={toggle} aria-label={t('nav.switch')}>
          <span className={lang === 'fr' ? 'is-current' : ''}>FR</span>
          <span className="bento-nav__lang-sep">/</span>
          <span className={lang === 'en' ? 'is-current' : ''}>EN</span>
        </button>
      </div>
    </nav>
  );
}
