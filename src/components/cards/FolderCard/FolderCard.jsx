import { useEffect, useState } from 'react';
import { BentoCard } from '../../ui/BentoCard/BentoCard.jsx';
import { GaugeIcon } from '../../icons/index.js';
import { loadRepos, timeAgo } from '../../../lib/repos.js';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import './FolderCard.css';

// A folder (hand-made after RareUI "Folder", whose source page is not
// reachable) holding Rayane's latest public repositories as sheets. Hover or
// tap: the front flap tips forward and the sheets rise and fan out; each
// sheet opens its repository.
const LOGIN = 'RYZ-up';

export default function FolderCard() {
  const { t, lang } = useI18n();
  const [repos, setRepos] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let off = false;
    loadRepos().then(
      d => !off && setRepos(d.recent ?? []),
      () => !off && setRepos([])
    );
    return () => {
      off = true;
    };
  }, []);

  const sheets = repos ?? [];
  return (
    <BentoCard className="cell-figures folder-card">
      <div className="bento-card-inner">
        <div className="card-header">
          <span className="card-header__label">
            <GaugeIcon size={16} /> {t('hdr.active')}
          </span>
        </div>
        <div
          className={`folder${open ? ' is-open' : ''}`}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          onFocus={() => setOpen(true)}
          onBlur={e => !e.currentTarget.contains(e.relatedTarget) && setOpen(false)}
        >
          <div className="folder__back">
            <span className="folder__tab">github.com/{LOGIN}</span>
          </div>
          <ul className="folder__sheets" style={{ '--n': sheets.length }}>
            {sheets.map((r, i) => (
              <li key={r.name} style={{ '--i': i }}>
                <a className="folder__sheet" href={r.url} target="_blank" rel="noopener noreferrer">
                  <strong>{r.name}</strong>
                  <span className="folder__sheet-meta">
                    {r.lang && <em>{r.lang}</em>}
                    {t('ap.commits').replace('{n}', String(r.commits))}
                  </span>
                  <time dateTime={r.pushedAt}>{timeAgo(r.pushedAt, lang)}</time>
                </a>
              </li>
            ))}
          </ul>
          <button type="button" className="folder__front" aria-expanded={open} onClick={() => setOpen(o => !o)}>
            <span className="folder__title">{t('folder.title')}</span>
            <span className="folder__hint">
              {repos === null ? t('folder.loading') : repos.length ? t('folder.hint').replace('{n}', String(repos.length)) : t('ap.error')}
            </span>
          </button>
        </div>
      </div>
    </BentoCard>
  );
}
