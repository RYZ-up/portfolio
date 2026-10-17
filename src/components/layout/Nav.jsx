import LangSwitch from './LangSwitch.jsx';
import { CodeIcon, CpuIcon, EyeIcon, GlobeIcon, HomeIcon } from '../icons/index.js';
import Logo from './Logo.jsx';
import CountUp from '../ui/CountUp/CountUp.jsx';
import { useI18n } from '../../i18n/I18nProvider.jsx';
import useVisitCount from '../../hooks/useVisitCount.js';
import { PATHS } from '../../lib/routes.js';
import './Nav.css';

const LINKS = [
  { id: 'home', key: 'nav.home', Icon: HomeIcon },
  { id: 'dev', key: 'nav.dev', Icon: CodeIcon },
  { id: 'web', key: 'nav.web', Icon: GlobeIcon },
  { id: 'eng', key: 'nav.eng', Icon: CpuIcon }
];

export default function Nav({ view, onNavigate }) {
  const { lang, t } = useI18n();
  const visits = useVisitCount();

  const go = (event, id) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (id === 'home' && view === 'home') {
      const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
      window.scrollTo({ top: 0, behavior });
    } else {
      onNavigate(id);
    }
  };

  return (
    <nav className="bento-nav" aria-label="Navigation" data-enc-skip>
      <a href="/" className="bento-nav__logo" aria-label="Rayane Yazid" onClick={event => go(event, 'home')}>
        <Logo />
      </a>
      <ul className="bento-nav__links">
        {LINKS.map(link => (
          <li key={link.id}>
            <a
              href={PATHS[link.id]}
              className={view === link.id ? 'is-active' : ''}
              aria-current={view === link.id ? 'page' : undefined}
              onClick={event => go(event, link.id)}
            >
              <link.Icon size={18} aria-hidden="true" />
              <span className="bento-nav__link-label">{t(link.key)}</span>
            </a>
          </li>
        ))}
      </ul>
      <div className="bento-nav__tools">
        <span className="bento-nav__visits">
          <EyeIcon size={15} aria-hidden="true" />
          {visits == null ? (
            <span className="bento-nav__visits-count">&ndash;</span>
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
        <LangSwitch />
      </div>
    </nav>
  );
}
