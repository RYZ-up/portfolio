import { useEffect, useState } from 'react';
import { FiClock } from 'react-icons/fi';
import { MapPinIcon } from '../../icons/index.js';
import { BentoCard } from '../../ui/BentoCard/BentoCard.jsx';
import map3 from '../../../assets/images/city-map.webp';
import cloudsSky from '../../../assets/textures/clouds-sky.webp';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import useInView from '../../../hooks/useInView.js';
import './MapCard.css';

const TIME_API_URL = 'https://timeapi.io/api/time/current/zone?timeZone=Europe%2FParis';

const formatTime = date =>
  date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Paris' });

export default function MapCard() {
  const { t } = useI18n();
  const [mapRef, inView] = useInView();
  const [time, setTime] = useState(() => formatTime(new Date()));
  const [serverOffsetMs, setServerOffsetMs] = useState(0);

  // Sync once against a real time API so the clock reflects the actual
  // server time in Créteil rather than trusting the visitor's own device
  // clock; falls back silently to local time if the API is unreachable.
  useEffect(() => {
    let cancelled = false;
    fetch(TIME_API_URL)
      .then(res => res.json())
      .then(data => {
        if (cancelled || !data?.dateTime) return;
        setServerOffsetMs(new Date(data.dateTime).getTime() - Date.now());
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const tick = () => setTime(formatTime(new Date(Date.now() + serverOffsetMs)));
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
            <FiClock aria-hidden size="1em" />
          </span>
          <span className="citymap__badge-text">
            <strong>{time}</strong>
            <small>{t('map.localTime')}</small>
          </span>
        </div>

        <div className="citymap__you-are-here" aria-hidden="true">
          <span className="citymap__pulse-ring" />
          <span className="citymap__pulse-dot" />
        </div>

        <div className="citymap__badge">
          <span className="citymap__badge-icon">
            <MapPinIcon aria-hidden size="1em" />
          </span>
          <span className="citymap__badge-text">
            <strong>Créteil</strong>
            <small>{t('map.region')}</small>
          </span>
        </div>
      </div>
    </BentoCard>
  );
}
