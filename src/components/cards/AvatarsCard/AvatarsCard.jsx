import { BentoCard } from '../../ui/BentoCard/BentoCard.jsx';
import MaskedAvatars from '../../ui/MaskedAvatars/MaskedAvatars.jsx';
import { UsersIcon } from '../../icons/index.js';
import { categoryOf } from '../../../data/projects.js';
import { projectPath } from '../../../lib/routes.js';
import { useI18n } from '../../../i18n/I18nProvider.jsx';

// Next to the GitHub card: a few projects as masked avatars (VengeanceUI);
// hovering one wraps its short name around it, a click opens the project.
const PICKS = [
  { id: 'p13', name: 'Bee' },
  { id: 'p3', name: 'Drone' },
  { id: 'p16', name: 'Linguify' },
  { id: 'p8', name: 'Chassis' },
  { id: 'p2', name: 'IoT box' }
];

const open = (view, id) => e => {
  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  window.history.pushState(null, '', projectPath(view, id));
  window.dispatchEvent(new PopStateEvent('popstate'));
};

const AVATARS = PICKS.map(({ id, name }) => {
  const view = categoryOf(id);
  return { name, avatar: `/images/projects/gallery/${id}/cover.webp`, href: projectPath(view, id), onClick: open(view, id) };
});

export default function AvatarsCard() {
  const { t } = useI18n();
  return (
    <BentoCard className="cell-avatars">
      <div className="bento-card-inner">
        <div className="card-header">
          <span className="card-header__label">
            <UsersIcon size={16} /> {t('hdr.projects')}
          </span>
        </div>
        <div style={{ display: 'grid', flex: 1, placeItems: 'center', paddingTop: '1.75rem' }}>
          <MaskedAvatars avatars={AVATARS} size={64} column={34} />
        </div>
      </div>
    </BentoCard>
  );
}
