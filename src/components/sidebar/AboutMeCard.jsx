import { useEffect, useState } from 'react';
import { LinkedinIcon } from '../icons/index.js';
import portrait from '../../assets/images/portrait-tesla.webp';
import { socials } from '../../data/socials.js';
import { gallery } from '../../data/projects.js';
import { PATHS } from '../../lib/routes.js';
import { useI18n } from '../../i18n/I18nProvider.jsx';
import SpotlightCard from '../ui/SpotlightCard/SpotlightCard.jsx';
import './AboutMe.css';

// The presentation as a social profile (Instagram-like), in a React Bits
// Spotlight Card: handle, avatar in a story ring, three real counts, name,
// category and bio, two actions, and "highlights" opening the three project
// pages. Counts come from the site's own data and the GitHub calendar (no
// client count: that stays private).
const LOGIN = 'RYZ-up';
const linkedin = socials.find(s => s.label === 'LinkedIn')?.href;
const PROJECTS = gallery.length;
const HIGHLIGHTS = [
  { to: 'eng', key: 'nav.eng', cover: '/images/projects/gallery/p2/cover.webp' },
  { to: 'dev', key: 'nav.dev', cover: '/images/projects/gallery/p13/cover.webp' },
  { to: 'web', key: 'nav.web', cover: '/images/projects/gallery/p16/cover.webp' }
];

const go = to => e => {
  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  window.dispatchEvent(new CustomEvent('app:navigate', { detail: to }));
};

export default function AboutMeCard() {
  const { t, lang } = useI18n();
  const locale = lang === 'fr' ? 'fr-FR' : 'en-GB';
  const [commits, setCommits] = useState(null);

  useEffect(() => {
    let off = false;
    fetch('/api/github')
      .then(r => (r.ok ? r.json() : null))
      .then(d => !off && d?.total?.lastYear != null && setCommits(d.total.lastYear))
      .catch(() => {});
    return () => {
      off = true;
    };
  }, []);

  const stats = [
    { n: PROJECTS, label: t('ig.projects') },
    { n: 3, label: t('ig.fields') },
    { n: commits, label: t('ig.commits') }
  ];

  return (
    <SpotlightCard
      className="sidebar-section about-card ig"
      aria-labelledby="about-title"
      theme="dark"
      spotlightColor="#ffffff"
      intensity={0.12}
      spotlightSize={240}
      softness={0.7}
      borderGlow={0.6}
      proximity={80}
      smoothing={0.3}
      style={{ '--spotlight-card-surface': 'var(--card-bg, #16161a)', '--spotlight-card-border': 'var(--card-border)' }}
    >
      <div className="ig__top">
        <a className="ig__handle" href={`https://github.com/${LOGIN}`} target="_blank" rel="noopener noreferrer">
          {LOGIN.toLowerCase()}
        </a>
        <span className="ig__version">v4.50</span>
      </div>

      <div className="ig__head">
        <span className="ig__ring">
          <img src={portrait} alt={t('about.portrait')} title={t('about.portrait')} width="480" height="480" draggable={false} />
        </span>
        <ul className="ig__stats">
          {stats.map(s => (
            <li key={s.label}>
              <strong>{s.n == null ? '–' : s.n.toLocaleString(locale)}</strong>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="ig__bio">
        <h1 id="about-title" className="ig__name">
          Rayane Yazid
        </h1>
        <p className="ig__category">{t('about.title')}</p>
        <p>{t('about.pitch')}</p>
        <p className="ig__edu">
          {t('about.v.edu')}
          <br />
          {t('about.v.prev')}
        </p>
      </div>

      <div className="ig__actions">
        <a className="ig__btn ig__btn--primary" href={PATHS.eng} onClick={go('eng')}>
          {t('about.cta.projects')}
        </a>
        {linkedin && (
          <a className="ig__btn" href={linkedin} target="_blank" rel="noopener noreferrer">
            <LinkedinIcon size={15} /> LinkedIn
          </a>
        )}
      </div>

      <ul className="ig__highlights">
        {HIGHLIGHTS.map(h => (
          <li key={h.to}>
            <a href={PATHS[h.to]} onClick={go(h.to)}>
              <span className="ig__story">
                <img src={h.cover} alt="" loading="lazy" draggable={false} />
              </span>
              <span>{t(h.key)}</span>
            </a>
          </li>
        ))}
      </ul>
    </SpotlightCard>
  );
}
