import { useEffect, useState } from 'react';
import { BentoCard } from '../../ui/BentoCard/BentoCard.jsx';
import { CodeIcon, CpuIcon, GaugeIcon, GithubIcon } from '../../icons/index.js';
import { loadRepos, timeAgo } from '../../../lib/repos.js';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import './ActiveProjectsCard.css';

// Laid out like Obsidian UI "Active Sessions" (obsidianui.dev/docs/active-
// sessions), but each row is one of Rayane's public repositories, most
// recently pushed first: "Active now" under an hour, else how long ago.
const LOGIN = 'RYZ-up';
const ACTIVE_MS = 60 * 60 * 1000;
const HARDWARE_LANGS = new Set(['C', 'C++', 'Arduino', 'Assembly']);

function Row({ repo, first, t, lang }) {
  const Icon = HARDWARE_LANGS.has(repo.lang) ? CpuIcon : CodeIcon;
  const active = Date.now() - new Date(repo.pushedAt) < ACTIVE_MS;
  return (
    <li>
      <a className="ap-row" href={repo.url} target="_blank" rel="noopener noreferrer">
        <span className="ap-row__icon">
          <Icon size={16} aria-hidden />
        </span>
        <span className="ap-row__body">
          <span className="ap-row__title">
            <span className="ap-row__name">{repo.name}</span>
            {first && <span className="ap-row__badge">{t('ap.latest')}</span>}
            {repo.lang && <span className="ap-row__tag">{repo.lang}</span>}
          </span>
          <span className="ap-row__meta">
            <span>{t('ap.commits').replace('{n}', String(repo.commits))}</span>
            <span aria-hidden className="ap-row__sep">·</span>
            {active ? (
              <span className="ap-row__live">
                <span aria-hidden className="ap-row__ping-wrap">
                  <span className="ap-row__ping" />
                  <span className="ap-row__dot" />
                </span>
                {t('ap.now')}
              </span>
            ) : (
              <time dateTime={repo.pushedAt}>{t('ap.last').replace('{t}', timeAgo(repo.pushedAt, lang))}</time>
            )}
          </span>
        </span>
      </a>
    </li>
  );
}

export default function ActiveProjectsCard() {
  const { t, lang } = useI18n();
  const [repos, setRepos] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let off = false;
    loadRepos().then(
      d => !off && setRepos(d.recent ?? []),
      () => !off && setFailed(true)
    );
    return () => {
      off = true;
    };
  }, []);

  return (
    <BentoCard className="cell-figures ap-card">
      <div className="bento-card-inner">
        <div className="card-header">
          <span className="card-header__label">
            <GaugeIcon size={16} /> {t('hdr.active')}
          </span>
        </div>
        <header className="ap-head">
          <p className="ap-head__desc">{t('ap.desc')}</p>
          <a className="ap-head__btn" href={`https://github.com/${LOGIN}?tab=repositories`} target="_blank" rel="noopener noreferrer">
            <GithubIcon size={14} /> {t('ap.all')}
          </a>
        </header>
        <div className="ap-list">
          {failed ? (
            <p className="ap-list__empty">{t('ap.error')}</p>
          ) : (
            <ul aria-busy={!repos || undefined}>
              {repos
                ? repos.map((r, i) => <Row key={r.name} repo={r} first={i === 0} t={t} lang={lang} />)
                : Array.from({ length: 4 }, (_, i) => (
                    <li key={i} aria-hidden="true">
                      <span className="ap-row ap-row--skeleton">
                        <span className="ap-row__icon" />
                        <span className="ap-row__body">
                          <span className="ap-skel ap-skel--title" />
                          <span className="ap-skel ap-skel--meta" />
                        </span>
                      </span>
                    </li>
                  ))}
            </ul>
          )}
        </div>
      </div>
    </BentoCard>
  );
}
