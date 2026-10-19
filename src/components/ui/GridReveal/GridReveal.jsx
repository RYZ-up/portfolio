import { useEffect, useMemo, useState } from 'react';
import './GridReveal.css';

// Grid reveal, "un-gridding": the image arrives in pieces. Each tile is a
// slice of the image itself (a full-size copy offset inside it, so it lines
// up exactly with the <img>'s object-fit: cover); the tiles start scattered,
// turned and blurred, then fly into place from the centre outwards until the
// picture is whole. First page load only, once the image is decoded. Drop it
// inside the image's positioned box, next to the <img>.
let played = false;

export default function GridReveal({ src, cols = 6, rows = 6, step = 45 }) {
  const [state, setState] = useState(() =>
    played || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'off' : 'wait'
  );

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

  // Random scatter per tile, chosen once.
  const tiles = useMemo(() => {
    const cx = (cols - 1) / 2;
    const cy = (rows - 1) / 2;
    return Array.from({ length: cols * rows }, (_, i) => {
      const x = i % cols;
      const y = Math.floor(i / cols);
      const angle = Math.atan2(y - cy, x - cx) + (Math.random() - 0.5) * 0.9;
      const far = 60 + Math.random() * 90;
      return {
        x,
        y,
        dx: Math.cos(angle) * far,
        dy: Math.sin(angle) * far,
        r: (Math.random() - 0.5) * 70,
        delay: Math.hypot(x - cx, y - cy) * step + Math.random() * 120
      };
    });
  }, [cols, rows, step]);

  if (state === 'off') return null;
  const total = Math.max(...tiles.map(t => t.delay)) + 900;
  return (
    <div
      className={`grid-reveal${state === 'run' ? ' is-running' : ''}`}
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}
      aria-hidden="true"
      onAnimationEnd={e => {
        if (e.target.classList.contains('grid-reveal__done')) {
          played = true;
          setState('off');
        }
      }}
    >
      {tiles.map(t => (
        <span
          key={`${t.x}-${t.y}`}
          className="grid-reveal__tile"
          style={{
            '--dx': `${t.dx}%`,
            '--dy': `${t.dy}%`,
            '--r': `${t.r}deg`,
            animationDelay: `${t.delay}ms`
          }}
        >
          <span
            className="grid-reveal__slice"
            style={{
              width: `${cols * 100}%`,
              height: `${rows * 100}%`,
              left: `${-t.x * 100}%`,
              top: `${-t.y * 100}%`,
              backgroundImage: `url(${src})`
            }}
          />
        </span>
      ))}
      <i className="grid-reveal__done" style={{ animationDelay: `${total}ms` }} />
    </div>
  );
}
