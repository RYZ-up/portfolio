import { useEffect, useState } from 'react';
import { RouterIcon } from '../../icons/index.js';
import { BentoCard } from '../../ui/BentoCard/BentoCard.jsx';
import StatusBars from '../../ui/StatusBars/StatusBars.jsx';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import './ApiStatusCard.css';

// The services the site relies on, last 30 days (Obsidian UI Status Bars).
// Real data only (/api/status): hourly checks recorded by a scheduled
// function, GitHub's official incident history, and a live check for today.
const PLACEHOLDER = ['AI', 'Weather', 'Time', 'GitHub'].map(label => ({ id: label, label, days: [] }));

export default function ApiStatusCard() {
  const { t, lang } = useI18n();
  const [services, setServices] = useState(null);

  useEffect(() => {
    let off = false;
    fetch('/api/status')
      .then(r => (r.ok ? r.json() : null))
      .then(d => !off && setServices(d?.services ?? []))
      .catch(() => !off && setServices([]));
    return () => {
      off = true;
    };
  }, []);

  const loading = services === null;
  const list = loading ? PLACEHOLDER : services;
  return (
    <BentoCard className="cell-api-status">
      <div className="bento-card-inner">
        <div className="card-header">
          <span className="card-header__label">
            <RouterIcon aria-hidden size="1em" /> {t('hdr.apiStatus')}
          </span>
        </div>
        {!loading && !list.length ? (
          <p className="api-status__error">{t('api.error')}</p>
        ) : (
          <div className="api-status__list">
            {list.map((s, i) => (
              <StatusBars
                key={s.id}
                label={s.label}
                days={s.days}
                current={s.online == null ? undefined : s.online ? 'up' : 'down'}
                maxDays={30}
                minBarWidth={4}
                footer={i === list.length - 1}
                loading={loading}
                lang={lang}
              />
            ))}
          </div>
        )}
      </div>
    </BentoCard>
  );
}
