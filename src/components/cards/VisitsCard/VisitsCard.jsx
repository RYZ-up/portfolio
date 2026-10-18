import { BentoCard } from '../../ui/BentoCard/BentoCard.jsx';
import CountUp from '../../ui/CountUp/CountUp.jsx';
import { EyeIcon } from '../../icons/index.js';
import useVisitCount from '../../../hooks/useVisitCount.js';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import './VisitsCard.css';

// Total visits of the site (Netlify function + Blobs, see useVisitCount).
export default function VisitsCard() {
  const { t, lang } = useI18n();
  const visits = useVisitCount();
  return (
    <BentoCard className="cell-visits visits-card">
      <div className="bento-card-inner">
        <div className="card-header">
          <span className="card-header__label">
            <EyeIcon size={16} /> {t('nav.visits')}
          </span>
        </div>
        <p className="visits-card__count">
          {visits == null ? (
            // Loading, or offline with no known total: a dash, never a made-up number.
            '–'
          ) : (
            <CountUp key={lang} to={visits} duration={2.2} locale={lang === 'fr' ? 'fr-FR' : 'en-GB'} />
          )}
        </p>
        <p className="visits-card__label">{t('visits.since')}</p>
      </div>
    </BentoCard>
  );
}
