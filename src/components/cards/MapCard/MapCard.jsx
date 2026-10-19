import { useEffect, useState } from 'react';
import { ClockIcon } from '../../icons/index.js';
import { BentoCard } from '../../ui/BentoCard/BentoCard.jsx';
import map3 from '../../../assets/images/city-map.webp';
import cloudsSky from '../../../assets/textures/clouds-sky.webp';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import useInView from '../../../hooks/useInView.js';
import './MapCard.css';

const TIME_API_URL = 'https://timeapi.io/api/time/current/zone?timeZone=Europe%2FParis';

const formatTime = date =>
  date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Paris' });

const formatDate = (date, lang) =>
  date.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-GB', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Europe/Paris'
  });

const parisISODate = date => {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Europe/Paris'
  }).formatToParts(date).map(({ type, value }) => [type, value]));
  return `${parts.year}-${parts.month}-${parts.day}`;
};

export default function MapCard() {
  const { lang, t } = useI18n();
  const [mapRef, inView] = useInView();
  const [now, setNow] = useState(() => new Date());
  const [serverOffsetMs, setServerOffsetMs] = useState(0);
  // Chosen once per mount: the marker doesn't jump around as the clock ticks.
  const [marker] = useState(() => ({ x: 12 + Math.random() * 76, y: 22 + Math.random() * 58 }));

  // Sync once against a real time API so the clock reflects the actual
  // time in Paris rather than trusting the visitor's own device
  // clock; falls back silently to local time if the API is unreachable.
  useEffect(() => {
    let cancelled = false;
    fetch(TIME_API_URL)
      .then(res => res.json())
      .then(data => {
        if (cancelled || !data?.dateTime) return;
        const apiTimeMs = new Date(data.dateTime).getTime();
        if (Number.isFinite(apiTimeMs)) setServerOffsetMs(apiTimeMs - Date.now());
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const tick = () => setNow(new Date(Date.now() + serverOffsetMs));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, [serverOffsetMs]);

  return (
    <BentoCard className="cell-map map-card">
      {/* The decorative loops only run while the card is on screen. */}
      <div ref={mapRef} className={`citymap${inView ? '' : ' is-paused'}`}>
        <div
          className="citymap__img"
          style={{
            backgroundImage: `linear-gradient(rgba(6, 6, 9, 0.68), rgba(6, 6, 9, 0.82)), url(${map3})`
          }}
        />

        <div className="citymap__clouds" style={{ '--clouds-image': `url(${cloudsSky})` }} />

        <div className="citymap__badge citymap__badge--time">
          <span className="citymap__badge-icon">
            <ClockIcon size={14} />
          </span>
          <span className="citymap__badge-text">
            <strong>{formatTime(now)}</strong>
            <small>{t('map.localTime')}</small>
          </span>
        </div>

        <div className="citymap__you-are-here" style={{ '--pin-x': `${marker.x}%`, '--pin-y': `${marker.y}%` }} aria-hidden="true">
          <span className="citymap__pulse-ring" />
          <span className="citymap__pulse-dot" />
        </div>

        <time className="citymap__date" dateTime={parisISODate(now)}>
          {formatDate(now, lang)}
        </time>

      </div>
    </BentoCard>
  );
}
