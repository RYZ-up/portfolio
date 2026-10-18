import { useEffect, useState } from 'react';
import { StackIcon } from '../icons/index.js';
import { categoryOf } from '../../data/projects.js';
import { projectPath } from '../../lib/routes.js';
import { useI18n } from '../../i18n/I18nProvider.jsx';
import './Sidebar.css';

// Under the carousel: the projects no other home card shows, one at a time
// (cross-fade every 5 s, paused on hover). A click opens the project.
const IDS = ['p8', 'p11', 'p7', 'p9', 'p6'];
const DELAY = 5000;

const open = (view, id) => e => {
  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  window.history.pushState(null, '', projectPath(view, id));
  window.dispatchEvent(new PopStateEvent('popstate'));
};

export default function MoreProjectsCard() {
  const { t } = useI18n();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const timer = setTimeout(() => setI(n => (n + 1) % IDS.length), DELAY);
    return () => clearTimeout(timer);
  }, [i, paused]);

  const id = IDS[i];
  const view = categoryOf(id);
  return (
    <section
      className="sidebar-section more-projects"
      aria-label={t('hdr.more')}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <p className="more-projects__label">
        <StackIcon size={14} /> {t('hdr.more')}
      </p>
      <a className="more-projects__card" href={projectPath(view, id)} onClick={open(view, id)}>
        <span className="more-projects__media">
          {IDS.map((p, k) => (
            <img
              key={p}
              src={`/images/projects/gallery/${p}/cover.webp`}
              alt=""
              loading="lazy"
              draggable={false}
              className={k === i ? 'is-on' : undefined}
            />
          ))}
        </span>
        <span className="more-projects__text">
          <span className="more-projects__title">{t(`g.${id}.name`)}</span>
          <span className="more-projects__cat">{t(`page.${view}.title`)}</span>
        </span>
      </a>
      <div className="more-projects__dots" role="tablist">
        {IDS.map((p, k) => (
          <button
            key={p}
            type="button"
            role="tab"
            aria-selected={k === i}
            aria-label={t(`g.${p}.name`)}
            className={k === i ? 'is-on' : undefined}
            onClick={() => setI(k)}
          />
        ))}
      </div>
    </section>
  );
}
