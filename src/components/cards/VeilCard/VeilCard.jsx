import { BentoCard } from '../../ui/BentoCard/BentoCard.jsx';
import DitherVeil from '../../ui/DitherVeil/DitherVeil.jsx';
import './VeilCard.css';

// Under the chat: the articulated mobile chassis as a dithered print; the
// photo shows through under the cursor (React Bits Dither Veil).
// Touch screens have no cursor, so the reveal wanders on its own there.
const touch = typeof window !== 'undefined' && window.matchMedia?.('(hover: none)').matches;

export default function VeilCard() {
  return (
    <BentoCard className="cell-veil veil-card">
      <DitherVeil
        src="/images/projects/gallery/p8/hero.jpg"
        fit="cover"
        pixelSize={2}
        inkColor="#0e0d12"
        paperColor="#e9e4f0"
        rimColor="#e0569f"
        rim={0.04}
        revealRadius={150}
        wander={touch}
        clickBurst
      />
    </BentoCard>
  );
}
