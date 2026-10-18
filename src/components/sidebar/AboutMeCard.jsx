import { UserIcon } from '../icons/index.js';
import { aboutMe } from '../../data/profile.js';
import CursorCard from '../ui/CursorCard/CursorCard.jsx';
import portrait from '../../assets/images/portrait-tesla.webp';
import saclayLogo from '../../assets/logos/schools/paris-saclay-dark.svg';
import upecLogo from '../../assets/logos/schools/upec-dark.svg';
import { PATHS } from '../../lib/routes.js';
import { useI18n } from '../../i18n/I18nProvider.jsx';
import './Sidebar.css';

// Words of the introduction that open a preview card (VengeanceUI Cursor Card).
const go = to => () => window.dispatchEvent(new CustomEvent('app:navigate', { detail: to }));
const CARDS = {
  embedded: { image: '/images/projects/gallery/p2/cover.webp', desc: 'about.card.embedded', href: PATHS.eng, to: 'eng' },
  software: { image: '/images/projects/gallery/p13/cover.webp', desc: 'about.card.software', href: PATHS.dev, to: 'dev' }
};

const EDU = [
  { key: 'master', logo: saclayLogo, meta: 'Université Paris-Saclay · 2026–2028' },
  { key: 'licence', logo: upecLogo, meta: 'UPEC · 2023–2026' }
];

// The introduction: who (portrait, name, role), what (bio), then the studies.
export default function AboutMeCard() {
  const { t } = useI18n();
  return (
    <section className="sidebar-section about-card" aria-labelledby="about-title">
      <div className="card-header">
        <span className="card-header__label">
          <UserIcon aria-hidden size="1em" /> {t('hdr.about')}
        </span>
        <span className="card-header__version">v4.50</span>
      </div>
      <div className="intro">
        <div className="intro__head">
          <img className="intro__portrait" src={portrait} alt={t('about.portrait')} title={t('about.portrait')} width="480" height="480" draggable={false} />
          <div>
            <p className="intro__hello">{t('about.greeting')}</p>
            <h1 id="about-title" className="intro__name">{aboutMe.name}</h1>
            <p className="intro__role">{t('about.role')}</p>
            <p className="intro__credit">{t('about.portrait')}</p>
          </div>
        </div>

        <p className="intro__bio">
          {aboutMe.bio.map((chunk, i) =>
            chunk.card ? (
              <CursorCard
                key={i}
                image={CARDS[chunk.card].image}
                description={t(CARDS[chunk.card].desc)}
                href={CARDS[chunk.card].href}
                onNavigate={go(CARDS[chunk.card].to)}
              >
                {t(chunk.text)}
              </CursorCard>
            ) : (
              <span key={i}>{chunk.text === '.' ? '.' : t(chunk.text)}</span>
            )
          )}
        </p>

        {/* Studies: the school's logo shows up on hover (first tap on touch). */}
        <div className="intro__edu">
          <p className="intro__label">{t('about.edu')}</p>
          <ul>
            {EDU.map(e => (
              <li key={e.key}>
                <CursorCard image={e.logo} fit="contain" description={t(`about.card.${e.key}`)}>
                  <span className="intro__edu-title">{t(`about.edu.${e.key}`)}</span>
                </CursorCard>
                <span className="intro__edu-meta">{e.meta}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
