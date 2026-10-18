import { useEffect } from 'react';
import { BentoCard } from '../../ui/BentoCard/BentoCard.jsx';
import CircularText from '../../ui/CircularText/CircularText.jsx';
import { SendIcon } from '../../icons/index.js';
import { contact } from '../../../data/profile.js';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import { applyTheme, storeTheme } from '../../../lib/theme.js';
import './AvailabilityCard.css';

// Availability: what Rayane is looking for, as text turning around a round
// email button (React Bits CircularText).
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
        <div className="avail-card__ring">
          <CircularText text={t('avail.ring')} size={118} fontSize={10} fontWeight={600} letterSpacing={2} spinDuration={22} onHover="slowDown">
            <a className="avail-card__cta" href={`mailto:${contact.email}`} aria-label={t('avail.cta')}>
              <SendIcon size={20} />
            </a>
          </CircularText>
        </div>
      </div>
    </BentoCard>
  );
}
