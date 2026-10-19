import { UserIcon } from '../icons/index.js';
import { aboutMe } from '../../data/profile.js';
import CursorCard from '../ui/CursorCard/CursorCard.jsx';
import portrait from '../../assets/images/portrait-tesla.webp';
import saclayLogo from '../../assets/logos/schools/paris-saclay-dark.svg';
import upecLogo from '../../assets/logos/schools/upec-dark.svg';
import { PATHS } from '../../lib/routes.js';
import { useI18n } from '../../i18n/I18nProvider.jsx';
import './Sidebar.css';

// Keywords of the paragraph (`[[key|text]]` in about.para) that open a
// preview card (VengeanceUI Cursor Card): a project cover, or the school logo.
const go = to => () => window.dispatchEvent(new CustomEvent('app:navigate', { detail: to }));
const CARDS = {
  master: { image: saclayLogo, fit: 'contain', desc: 'about.card.master' },
  licence: { image: upecLogo, fit: 'contain', desc: 'about.card.licence' },
  embedded: { image: '/images/projects/gallery/p2/cover.webp', desc: 'about.card.embedded', to: 'eng' },
  software: { image: '/images/projects/gallery/p13/cover.webp', desc: 'about.card.software', to: 'dev' },
  web: { image: '/images/projects/gallery/p16/cover.webp', desc: 'about.card.web', to: 'web' }
};

// The introduction: who (portrait, name, role, availability), then one
// paragraph. The portrait's credit is its title and alt text.
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
            <p className="intro__chip">
              <i aria-hidden="true" /> {t('about.open')}
            </p>
          </div>
        </div>

        <p className="intro__bio">
          {t('about.para')
            .split(/(\[\[\w+\|[^\]]+\]\])/)
            .map((chunk, i) => {
              const m = chunk.match(/^\[\[(\w+)\|([^\]]+)\]\]$/);
              if (!m) return chunk;
              const card = CARDS[m[1]];
              return (
                <CursorCard
                  key={i}
                  image={card.image}
                  fit={card.fit}
                  description={t(card.desc)}
                  href={card.to && PATHS[card.to]}
                  onNavigate={card.to && go(card.to)}
                >
                  {m[2]}
                </CursorCard>
              );
            })}
        </p>
      </div>
    </section>
  );
}
