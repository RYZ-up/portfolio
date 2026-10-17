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
      {/* Efferd testimonials-2, reproduced in plain CSS: avatar framed by
          fading cross-hair lines, then the quote, the name and the role. */}
      <figure className="testi">
        <div className="testi__frame" title={t('about.portrait')}>
          <span className="testi__line testi__line--v testi__line--left" aria-hidden="true" />
          <span className="testi__line testi__line--v testi__line--right" aria-hidden="true" />
          <span className="testi__line testi__line--h testi__line--top" aria-hidden="true" />
          <span className="testi__line testi__line--h testi__line--bottom" aria-hidden="true" />
          <img className="testi__avatar" src={portrait} alt={t('about.portrait')} width="480" height="480" draggable={false} />
        </div>
        <figcaption className="testi__caption">
          <blockquote className="testi__quote">
            &quot;
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
            &quot;
          </blockquote>
          <div>
            <h1 id="about-title" className="testi__name">
              <span className="sr-only">{t('about.greeting')} </span>
              {aboutMe.name}
            </h1>
            <p className="testi__role">{t('about.role')}</p>
            <p className="testi__credit">{t('about.portrait')}</p>
          </div>
        </figcaption>
      </figure>
      {/* Studies: the school's logo shows up on hover (first tap on touch). */}
      <ul className="about-card__edu" aria-label={t('about.edu')}>
        {EDU.map(e => (
          <li key={e.key}>
            <CursorCard image={e.logo} fit="contain" description={t(`about.card.${e.key}`)}>
              <span className="about-card__edu-title">{t(`about.edu.${e.key}`)}</span>
            </CursorCard>
            <span className="about-card__edu-meta">{e.meta}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
