import { useMemo } from 'react';
import Stack from '../../ui/Stack/Stack.jsx';
import { stackFocus, stackImages } from '../../../data/projects.js';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import './ProjectStackCard.css';

export default function ProjectStackCard() {
  const { t } = useI18n();
  // Reversed: the last card in the array is the one on top of the pile.
  const stackCards = useMemo(() => [...stackImages].reverse().map(src => (
    <div key={src} className="photos-stack__item">
      <img
        src={src}
        alt=""
        draggable={false}
        className="card-image"
        loading="lazy"
        decoding="async"
        style={{ objectPosition: stackFocus[Number(src.match(/(\d+)\.(?:jpg|webp)$/)?.[1])] }}
      />
      {/* On every card: whichever one is on top after a click needs its label. */}
      <div className="photos-stack__fade">
        <svg className="photos-stack__info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="4" width="18" height="16" rx="3" />
          <circle cx="9" cy="10" r="1.6" />
          <path d="M3 17l5-4.5 4 3.5 3-2.5 6 4.5" />
        </svg>
        <span className="photos-stack__description">{t('photos.projects')}</span>
      </div>
    </div>
  )), [t]);

  return (
    <div className="cell-project-stack photos-stack-wrap">
      <div className="photos-stack">
        <Stack
          cards={stackCards}
          restRotations={[-3, 2.5, -2, 3, -0.8]}
          fanOffset={0}
          fanAngle={13}
          fanDrop={10}
          fanBounce={{ stiffness: 220, damping: 20 }}
          staticStack
          mirror
          fanOnHover
        />
      </div>
    </div>
  );
}
