import { useEffect, useState } from 'react';
import { RadioIcon } from '../../icons/index.js';
import { BentoCard } from '../../ui/BentoCard/BentoCard.jsx';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import { getPresenceAt } from '../../../lib/presenceModel.js';
import './StatusCard.css';

export default function StatusCard() {
  const { t } = useI18n();
  const [presence, setPresence] = useState(() => getPresenceAt());

  // Re-check the schedule every 30 s so the status flips at the right moment.
  useEffect(() => {
    const id = setInterval(() => setPresence(getPresenceAt()), 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <BentoCard className="cell-status">
      <div className="bento-card-inner">
        <div className="card-header">
          <span className="card-header__label">
            <RadioIcon aria-hidden size="1em" /> {t('hdr.status')}
          </span>
        </div>
        <div className={`status-card__body is-${presence}`} role="status">
          <span className="status-card__dot" />
          {t(`status.${presence}`)}
        </div>
      </div>
    </BentoCard>
  );
}
