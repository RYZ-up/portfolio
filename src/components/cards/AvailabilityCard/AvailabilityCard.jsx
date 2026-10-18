import { useEffect } from 'react';
import { BentoCard } from '../../ui/BentoCard/BentoCard.jsx';
import { SendIcon } from '../../icons/index.js';
import { contact } from '../../../data/profile.js';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import { applyTheme, storeTheme } from '../../../lib/theme.js';
import './AvailabilityCard.css';

// Availability (in the spirit of Efferd cta-17): a pulsing dot, what Rayane is
// looking for, and a corner button that opens an email.
export default function AvailabilityCard() {
  const { t } = useI18n();

  // The old light theme is gone: visitors who had picked it are put back on
  // the dark one (this card replaced the theme switch).
  useEffect(() => {
    applyTheme(false);
    storeTheme(false);
  }, []);

  return (
    <BentoCard className="cell-theme avail-card">
      <div className="bento-card-inner">
        <p className="avail-card__status">
          <span className="avail-card__dot" aria-hidden="true" />
          {t('avail.status')}
        </p>
        <p className="avail-card__title">{t('avail.title')}</p>
        <a className="avail-card__cta" href={`mailto:${contact.email}`} aria-label={t('avail.cta')}>
          <SendIcon size={18} />
        </a>
      </div>
    </BentoCard>
  );
}
