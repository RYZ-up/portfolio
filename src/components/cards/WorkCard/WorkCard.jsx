import { BentoCard } from '../../ui/BentoCard/BentoCard.jsx';
import Terminal from './Terminal.jsx';
import './WorkCard.css';

// Next to the GitHub card, across the whole line: the terminal of the site's
// own commands.
export default function WorkCard() {
  return (
    <BentoCard className="cell-work work-card">
      <div className="bento-card-inner">
        <Terminal />
      </div>
    </BentoCard>
  );
}
