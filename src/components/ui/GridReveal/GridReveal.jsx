import { useEffect, useState } from 'react';
import './GridReveal.css';

// Grid reveal (hand-made after RareUI "Grid Reveal", whose source page is
// not reachable): a grid of tiles covers the image and falls away in a
// diagonal wave once the image has loaded, on the first page load only.
// Drop it inside the image's positioned box, next to the <img>.
let played = false;

export default function GridReveal({ src, cols = 8, rows = 6, step = 70 }) {
  const [state, setState] = useState(() =>
    played || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'off' : 'wait'
  );

  // Start once the image is decoded, so the wave never uncovers an empty box.
  useEffect(() => {
    if (state !== 'wait') return undefined;
    let off = false;
    const img = new Image();
    img.src = src;
    const go = () => !off && setState('run');
    (img.decode ? img.decode() : Promise.resolve()).then(go, go);
    return () => {
      off = true;
    };
  }, [src, state]);

  if (state === 'off') return null;
  const n = cols * rows;
  const total = (cols + rows - 2) * step + 600;
  return (
    <div
      className={`grid-reveal${state === 'run' ? ' is-running' : ''}`}
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}
      aria-hidden="true"
      onAnimationEnd={e => {
        if (e.target === e.currentTarget.lastChild) {
          played = true;
          setState('off');
        }
      }}
    >
      {Array.from({ length: n }, (_, i) => {
        const x = i % cols;
        const y = Math.floor(i / cols);
        return <span key={i} style={{ animationDelay: `${(x + y) * step}ms` }} />;
      })}
      <i style={{ animationDelay: `${total}ms` }} />
    </div>
  );
}
