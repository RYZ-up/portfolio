import { useEffect, useState } from 'react';
import { BentoCard } from '../../ui/BentoCard/BentoCard.jsx';
import { GithubIcon } from '../../icons/index.js';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import { applyTheme, storeTheme } from '../../../lib/theme.js';
import './LatestPushCard.css';

// The public repository Rayane pushed to last (GitHub API), with how long ago.
const LOGIN = 'RYZ-up';
const CACHE_KEY = 'gh-latest-push-v1';

async function load() {
  try {
    const hit = JSON.parse(sessionStorage.getItem(CACHE_KEY));
    if (hit && Date.now() - hit.at < 30 * 60 * 1000) return hit.data;
  } catch {
    /* storage unavailable */
  }
  const res = await fetch(`https://api.github.com/users/${LOGIN}/repos?sort=pushed&per_page=1`);
  if (!res.ok) throw new Error(String(res.status));
  const [r] = await res.json();
  if (!r) throw new Error('no repo');
  const data = { name: r.name, desc: r.description, lang: r.language, url: r.html_url, at: r.pushed_at };
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }));
  } catch {
    /* storage unavailable */
  }
  return data;
}

function ago(iso, lang) {
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' });
  const s = (new Date(iso) - Date.now()) / 1000;
  for (const [unit, n] of [['day', 86400], ['hour', 3600], ['minute', 60]]) {
    if (Math.abs(s) >= n) return rtf.format(Math.round(s / n), unit);
  }
  return rtf.format(0, 'minute');
}

export default function LatestPushCard() {
  const { t, lang } = useI18n();
  const [repo, setRepo] = useState(null);
  const [failed, setFailed] = useState(false);

  // The old light theme is gone: visitors who had picked it are put back on
  // the dark one (this cell used to hold the theme switch).
  useEffect(() => {
    applyTheme(false);
    storeTheme(false);
    load().then(setRepo, () => setFailed(true));
  }, []);

  return (
    <BentoCard className="cell-theme push-card">
      <a className="bento-card-inner push-card__inner" href={repo?.url ?? `https://github.com/${LOGIN}`} target="_blank" rel="noreferrer">
        <p className="push-card__label">
          <span className="push-card__dot" aria-hidden="true" />
          {t('push.label')}
        </p>
        {repo ? (
          <>
            <p className="push-card__name">
              <GithubIcon size={16} /> {repo.name}
            </p>
            {repo.desc && <p className="push-card__desc">{repo.desc}</p>}
            <p className="push-card__meta">
              {repo.lang && <span>{repo.lang}</span>}
              <time dateTime={repo.at}>{ago(repo.at, lang)}</time>
            </p>
          </>
        ) : (
          <p className="push-card__desc">{failed ? t('push.error') : t('push.loading')}</p>
        )}
      </a>
    </BentoCard>
  );
}
