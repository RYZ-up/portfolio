import saclayLogo from '../../assets/logos/schools/paris-saclay.svg';
import { useI18n } from '../../i18n/I18nProvider.jsx';
import './AboutMe.css';

// Signature card: the initials, the name, and what Rayane studies, with the
// university's logo.
export default function AboutMeCard() {
  const { t } = useI18n();
  return (
    <section className="sidebar-section about-card about-card--signature" aria-labelledby="about-title">
      <span className="about-card__mark" aria-hidden="true">RY</span>
      <h1 id="about-title">Rayane</h1>
      <p className="about-card__study">
        <img src={saclayLogo} alt="Université Paris-Saclay" width="76" height="27" />
        <span>{t('about.study')}</span>
      </p>
    </section>
  );
}
