import { lazy, Suspense } from 'react';
import { Cloud1Icon } from '../../icons/index.js';
import { BentoCard } from '../../ui/BentoCard/BentoCard.jsx';
import { weather } from '../../../data/stats.js';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import useWeather from '../../../hooks/useWeather.js';
import './WeatherCard.css';

// Lottie + its JSON files are code-split: the card paints first, the icon follows.
const WeatherAnimation = lazy(() => import('./WeatherAnimation.jsx'));

export default function WeatherCard() {
  const { t, lang } = useI18n();
  const live = useWeather(lang);
  const kind = live ? live.kind : 'cloudy';
  const temp = live ? live.temp : weather.temp;
  const condition = live ? live.text : t(`weather.${weather.condition.toLowerCase()}`);

  return (
    <BentoCard className="cell-weather">
      <div className="bento-card-inner weather-card">
        <div className="card-header">
          <span className="card-header__label">
            <Cloud1Icon aria-hidden size="1em" /> {t('hdr.weather')}
          </span>
        </div>
        <Suspense fallback={<div className="weather-card__anim" />}>
          <WeatherAnimation kind={kind} />
        </Suspense>
        <div className="weather-card__temp">{temp}</div>
        <div className="weather-card__condition">{condition}</div>
      </div>
    </BentoCard>
  );
}
