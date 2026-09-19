import { UserIcon } from '../icons/index.js';
import parisSaclayLogo from '../../assets/logos/schools/paris-saclay.svg';
import parisSaclayLogoDark from '../../assets/logos/schools/paris-saclay-dark.svg';
import upecLogo from '../../assets/logos/schools/upec.svg';
import upecLogoDark from '../../assets/logos/schools/upec-dark.svg';
import { aboutMe } from '../../data/profile.js';
import { useI18n } from '../../i18n/I18nProvider.jsx';
import './Sidebar.css';

export default function AboutMeCard() {
  const { t } = useI18n();
  return (
    <section className="sidebar-section">
      <div className="card-header">
        <span className="card-header__label">
          <UserIcon aria-hidden size="1em" /> {t('hdr.about')}
        </span>
        <span className="card-header__version">v4.49</span>
      </div>
      <div className="about-card__body">
        <div className="about-card__avatar-wrap">
          <img src={aboutMe.avatar} alt="" draggable={false} className="about-card__avatar" width="120" height="120" decoding="async" />
        </div>
        <div className="about-card__bio">
          <h1 className="about-card__title">
            {t('about.greeting')} <span className="accent">{aboutMe.name}</span>.
          </h1>
          <p className="about-card__text">
            {aboutMe.bio.map((chunk, i) =>
              chunk.accent ? (
                <span key={i} className="accent">
                  {chunk.text}
                </span>
              ) : chunk.strong ? (
                <strong key={i}>{t(chunk.text)}</strong>
              ) : (
                <span key={i}>{chunk.text === '.' ? '.' : t(chunk.text)}</span>
              )
            )}
          </p>
        </div>
      </div>
      <div className="about-card__schools">
        <div className="about-card__school">
          <span>{t('about.school1')}</span>
          <img className="school-logo school-logo--light" src={parisSaclayLogo} alt="Université Paris-Saclay" draggable={false} />
          <img className="school-logo school-logo--dark" src={parisSaclayLogoDark} alt="Université Paris-Saclay" draggable={false} />
        </div>
        <div className="about-card__school">
          <span>{t('about.school2')}</span>
          <img className="school-logo school-logo--light" src={upecLogo} alt="UPEC" draggable={false} />
          <img className="school-logo school-logo--dark" src={upecLogoDark} alt="UPEC" draggable={false} />
        </div>
      </div>
    </section>
  );
}
