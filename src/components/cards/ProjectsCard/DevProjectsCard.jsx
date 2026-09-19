import { CodeIcon } from '../../icons/index.js';
import ProjectsCard from './ProjectsCard.jsx';

const SHAPE_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path fill="#000" d="M78,40 L28,100 L78,160 L95,145 L58,100 L95,55 Z"/><path fill="#000" d="M122,40 L172,100 L122,160 L105,145 L142,100 L105,55 Z"/></svg>';

const projects = [13, 12, 5, 6, 7].map(n => ({ name: 'g.p' + n + '.name', desc: 'g.p' + n + '.desc' }));

export default function DevProjectsCard() {
  return (
    <ProjectsCard
      className="cell-dev-projects"
      Icon={CodeIcon}
      titleKey="hdr.projDev"
      shapeSvg={SHAPE_SVG}
      projects={projects}
    />
  );
}
