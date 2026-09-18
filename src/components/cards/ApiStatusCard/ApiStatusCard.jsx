import { useEffect, useState } from 'react';
import { RouterIcon } from '../../icons/index.js';
import { BentoCard } from '../../ui/BentoCard/BentoCard.jsx';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import './ApiStatusCard.css';

const DAY_COUNT = 10;

// Deterministic per-label hash so each service's little day-by-day preview
// strip is stable across re-renders (no flicker) yet still varies row to
// row — a real Math.random() here would redraw differently every render.
function hashInt(n) {
  let x = n | 0;
  x = ((x >> 16) ^ x) * 0x45d9f3b;
  x = ((x >> 16) ^ x) * 0x45d9f3b;
  x = (x >> 16) ^ x;
  return x >>> 0;
}

function seedFromLabel(label) {
  let h = 0;
  for (let i = 0; i < label.length; i++) h = (h * 31 + label.charCodeAt(i)) | 0;
  return h;
}

function dayPreview(label) {
  const seed = seedFromLabel(label);
  const days = [];
  for (let i = 0; i < DAY_COUNT; i++) {
    days.push(hashInt(seed + i * 97) % 12 !== 0);
  }
  return days;
}

const BASE_SERVICES = [
  { label: 'AI', online: true },
  { label: 'Weather', online: true },
  { label: 'Music', online: true },
  { label: 'Hardware', online: true }
];

// Pinged live on mount so these two rows reflect a real external check
// instead of a hardcoded "Online", unlike the decorative services above.
const LIVE_CHECKS = [
  { label: 'Heure', url: 'https://timeapi.io/api/time/current/zone?timeZone=Europe%2FParis' },
  { label: 'Statut', url: 'https://www.githubstatus.com/api/v2/status.json' }
];

function useLiveStatus(url) {
  const [online, setOnline] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!cancelled) setOnline(res.ok);
      })
      .catch(() => {
        if (!cancelled) setOnline(false);
      })
      .finally(() => clearTimeout(timeout));
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [url]);

  return online;
}

export default function ApiStatusCard() {
  const { t } = useI18n();
  const heureOnline = useLiveStatus(LIVE_CHECKS[0].url);
  const statutOnline = useLiveStatus(LIVE_CHECKS[1].url);
  const liveOnline = [heureOnline, statutOnline];

  return (
    <BentoCard className="cell-api-status">
      <div className="bento-card-inner">
        <div className="card-header">
          <span className="card-header__label">
            <RouterIcon aria-hidden size="1em" /> {t('hdr.apiStatus')}
          </span>
        </div>
        <ul className="api-status__list">
          {BASE_SERVICES.map(s => (
            <li key={s.label}>
              <span className={`api-status__dot${s.online ? ' is-online' : ''}`} />
              <span className="api-status__label">{s.label}</span>
              <div className="api-status__days">
                {dayPreview(s.label).map((ok, i) => (
                  <span key={i} className={`api-status__day${ok ? '' : ' is-down'}`} />
                ))}
              </div>
              <span className={`api-status__state${s.online ? ' is-online' : ''}`}>
                {s.online ? 'Online' : 'Offline'}
              </span>
            </li>
          ))}
          {LIVE_CHECKS.map((s, i) => {
            const online = liveOnline[i];
            const pending = online === null;
            return (
              <li key={s.label}>
                <span className={`api-status__dot${online ? ' is-online' : ''}${pending ? ' is-pending' : ''}`} />
                <span className="api-status__label">{s.label}</span>
                <div className="api-status__days">
                  {dayPreview(s.label).map((ok, i) => (
                    <span key={i} className={`api-status__day${ok ? '' : ' is-down'}`} />
                  ))}
                </div>
                <span className={`api-status__state${online ? ' is-online' : ''}`}>
                  {pending ? '…' : online ? 'Online' : 'Offline'}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </BentoCard>
  );
}
