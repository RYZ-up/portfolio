import { useEffect, useState } from 'react';

// Live weather for Créteil from OpenWeatherMap. Falls back to the last cached
// reading (or nothing, so the card keeps its static default) if the request
// fails, so the card never shows an error.
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const CACHE_KEY = 'weather-cache';
const REFRESH_MS = 10 * 60 * 1000;
const CITY = 'Créteil,FR';

const readCache = lang => {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
    return cached && cached.lang === lang ? cached : null;
  } catch {
    return null;
  }
};

const writeCache = data => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    /* storage unavailable */
  }
};

// OpenWeatherMap condition ids -> animation kind used by WeatherCard.
function kindFor(id) {
  if (id >= 200 && id < 300) return 'storm';
  if (id >= 300 && id < 600) return 'rain';
  if (id === 800) return 'clear';
  if (id === 801 || id === 802) return 'partly';
  return 'cloudy';
}

/**
 * Fallback when there is no live reading (no API key, request failed, old
 * cached entry): night between 20:00 and 07:00, Paris time, whatever the
 * visitor's own time zone.
 */
export function isNightInCreteil(date = new Date()) {
  const hour = Number(
    new Intl.DateTimeFormat('en-GB', { hour: '2-digit', hourCycle: 'h23', timeZone: 'Europe/Paris' }).format(date)
  );
  return hour >= 20 || hour < 7;
}

const capitalize = text => text.charAt(0).toUpperCase() + text.slice(1);

async function fetchWeather(lang, signal) {
  const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(CITY)}` +
    `&units=metric&lang=${lang}&appid=${API_KEY}`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(String(res.status));
  const data = await res.json();
  const condition = data.weather?.[0];
  if (typeof data.main?.temp !== 'number' || !condition) throw new Error('bad payload');
  return {
    lang,
    temp: `${data.main.temp.toFixed(1)}°C`,
    text: capitalize(condition.description || condition.main),
    kind: kindFor(condition.id),
    // OpenWeatherMap icon codes end in "n" between sunset and sunrise.
    night: typeof condition.icon === 'string' ? condition.icon.endsWith('n') : isNightInCreteil()
  };
}

export default function useWeather(lang) {
  const [weather, setWeather] = useState(() => readCache(lang));

  useEffect(() => {
    if (!API_KEY) return undefined;
    let alive = true;
    let ctrl = null;

    const load = async () => {
      ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 8000);
      try {
        const next = await fetchWeather(lang, ctrl.signal);
        if (!alive) return;
        writeCache(next);
        setWeather(next);
      } catch {
        /* keep whatever is displayed */
      } finally {
        clearTimeout(timer);
      }
    };

    setWeather(prev => (prev && prev.lang === lang ? prev : readCache(lang)));
    load();
    // No point refreshing a tab nobody is looking at.
    const id = setInterval(() => {
      if (!document.hidden) load();
    }, REFRESH_MS);
    return () => {
      alive = false;
      clearInterval(id);
      ctrl?.abort();
    };
  }, [lang]);

  return weather;
}
