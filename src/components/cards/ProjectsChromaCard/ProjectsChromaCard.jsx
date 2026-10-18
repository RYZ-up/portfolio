import { BentoCard } from '../../ui/BentoCard/BentoCard.jsx';
import ChromaGrid from '../../ui/ChromaGrid/ChromaGrid.jsx';
import { StackIcon } from '../../icons/index.js';
import { categoryOf } from '../../../data/projects.js';
import { projectPath } from '../../../lib/routes.js';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import './ProjectsChromaCard.css';

// The public software and web projects in black and white: the spotlight under
// the cursor brings their colour back (React Bits ChromaGrid). A click opens
// the project. (Robotics projects are in the photo stack card.)
const PICKS = [
  { id: 'p13', accent: '#f5b941' },
  { id: 'p16', accent: '#ff7a3d' },
  { id: 'p6', accent: '#a78bfa' },
  { id: 'p9', accent: '#ff6ec7' },
  { id: 'p7', accent: '#38bdf8' },
  { id: 'p11', accent: '#4ade80' }
];

const open = (view, id) => e => {
  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  window.history.pushState(null, '', projectPath(view, id));
  window.dispatchEvent(new PopStateEvent('popstate'));
};

export default function ProjectsChromaCard() {
  const { t } = useI18n();
  const items = PICKS.map(({ id, accent }) => {
    const view = categoryOf(id);
    return {
      image: `/images/projects/gallery/${id}/cover.webp`,
      title: t(`g.${id}.name`),
      subtitle: t(`page.${view}.title`),
      accent,
      url: projectPath(view, id),
      onClick: open(view, id)
    };
  });
  return (
    <BentoCard className="cell-tools chroma-card-cell">
      <div className="bento-card-inner">
        <div className="card-header">
          <span className="card-header__label">
            <StackIcon size={16} /> {t('hdr.picks')}
          </span>
        </div>
        <ChromaGrid items={items} columns={3} minCardWidth={150} gap={10} cardRadius={14} radius={220} aspectRatio="16 / 10" theme="light" />
      </div>
    </BentoCard>
  );
}
