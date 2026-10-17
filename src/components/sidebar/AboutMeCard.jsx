import { UserIcon } from '../icons/index.js';
import { aboutMe } from '../../data/profile.js';
import CursorCard from '../ui/CursorCard/CursorCard.jsx';
import Logo from '../layout/Logo.jsx';
import { PATHS } from '../../lib/routes.js';
import { useI18n } from '../../i18n/I18nProvider.jsx';
import './Sidebar.css';

// Words of the introduction that open a preview card (VengeanceUI Cursor Card).
const go = to => () => window.dispatchEvent(new CustomEvent('app:navigate', { detail: to }));
const CARDS = {
  embedded: { image: '/images/projects/gallery/p2/cover.webp', desc: 'about.card.embedded', href: PATHS.eng, to: 'eng' },
  software: { image: '/images/projects/gallery/p13/cover.webp', desc: 'about.card.software', href: PATHS.dev, to: 'dev' }
};

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
      <div className="about-card__identity">
        <span className="about-card__avatar" aria-hidden="true">
          <Logo className="about-card__logo" />
        </span>
        <div>
          <p className="about-card__greeting">{t('about.greeting')}</p>
          <h1 id="about-title">{aboutMe.name}.</h1>
        </div>
      </div>
      <p className="about-card__role">{t('about.role')}</p>
      <p className="about-card__body">
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
      <ul className="about-card__schools">
        <li>
          <CursorCard description={t('about.card.master')}>{t('about.school1')}</CursorCard>
        </li>
        <li>
          <CursorCard description={t('about.card.licence')}>{t('about.school2')}</CursorCard>
        </li>
      </ul>
    </section>
  );
}
