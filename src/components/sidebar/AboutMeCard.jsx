import saclayLogo from '../../assets/logos/schools/paris-saclay.svg';
import { useI18n } from '../../i18n/I18nProvider.jsx';
import './AboutMe.css';

// Signature card: the name on the left, the university's logo (in white) on
// the right, and what Rayane studies underneath.
export default function AboutMeCard() {
  const { t } = useI18n();
  return (
    <section className="sidebar-section about-card about-card--signature" aria-labelledby="about-title">
      <div className="about-card__top">
        <h1 id="about-title">Rayane</h1>
        <img className="about-card__logo" src={saclayLogo} alt="Université Paris-Saclay" width="76" height="27" />
      </div>
      <p className="about-card__study">
        <span>{t('about.study')}</span>
      </p>
    </section>
  );
}
