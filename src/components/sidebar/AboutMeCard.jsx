import { ArrowNarrowRightIcon, LinkedinIcon, UserIcon } from '../icons/index.js';
import portrait from '../../assets/images/portrait-tesla.webp';
import { socials } from '../../data/socials.js';
import { PATHS } from '../../lib/routes.js';
import { useI18n } from '../../i18n/I18nProvider.jsx';
import SpotlightCard from '../ui/SpotlightCard/SpotlightCard.jsx';
import './AboutMe.css';

// The presentation as a business card in a React Bits Spotlight Card (a soft
// light follows the pointer and catches the edge): who, what in one line,
// three facts, two actions.
const FACTS = [
  { label: 'about.f.edu', value: 'about.v.edu' },
  { label: 'about.f.prev', value: 'about.v.prev' },
  { label: 'about.f.fields', value: 'about.v.fields' }
];

const linkedin = socials.find(s => s.label === 'LinkedIn')?.href;

const openProjects = e => {
  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  window.dispatchEvent(new CustomEvent('app:navigate', { detail: 'eng' }));
};

export default function AboutMeCard() {
  const { t } = useI18n();
  return (
    <SpotlightCard
      className="sidebar-section about-card bcard"
      aria-labelledby="about-title"
      theme="dark"
      spotlightColor="#ffffff"
      intensity={0.15}
      spotlightSize={240}
      softness={0.7}
      borderGlow={0.6}
      proximity={80}
      smoothing={0.3}
      style={{ '--spotlight-card-surface': 'var(--card-bg, #16161a)', '--spotlight-card-border': 'var(--card-border)' }}
    >
      <div className="card-header">
        <span className="card-header__label">
          <UserIcon aria-hidden size="1em" /> {t('hdr.about')}
        </span>
        <span className="card-header__version">v4.50</span>
      </div>

      <div className="bcard__who">
        <img className="bcard__photo" src={portrait} alt={t('about.portrait')} title={t('about.portrait')} width="480" height="480" draggable={false} />
        <div className="bcard__names">
          <h1 id="about-title" className="bcard__name">
            Rayane Yazid
          </h1>
          <p className="bcard__title">{t('about.title')}</p>
        </div>
      </div>

      <p className="bcard__pitch">{t('about.pitch')}</p>

      <dl className="bcard__facts">
        {FACTS.map(f => (
          <div key={f.label}>
            <dt>{t(f.label)}</dt>
            <dd>{t(f.value)}</dd>
          </div>
        ))}
      </dl>

      <div className="bcard__actions">
        <a className="bcard__btn bcard__btn--primary" href={PATHS.eng} onClick={openProjects}>
          {t('about.cta.projects')} <ArrowNarrowRightIcon size={16} />
        </a>
        {linkedin && (
          <a className="bcard__btn" href={linkedin} target="_blank" rel="noopener noreferrer">
            <LinkedinIcon size={16} /> LinkedIn
          </a>
        )}
      </div>
    </SpotlightCard>
  );
}
