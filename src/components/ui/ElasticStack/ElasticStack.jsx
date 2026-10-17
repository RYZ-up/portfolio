import { useState } from 'react';
import './ElasticStack.css';

// Adapted from VengeanceUI "Elastic Stack" (vengenceui.com/components/elastic-stack):
// overlapping round items; the hovered one grows and its neighbours slide
// apart with a springy easing. Transform-only (compositor), no JS animation
// loop. Touch: a tap selects an item, a tap elsewhere in the row clears it.
export default function ElasticStack({ items, itemSize = 52, overlap = 20, pushForce = 12, label }) {
  const [active, setActive] = useState(null);
  const total = items.length;

  return (
    <div
      className="estack"
      role="list"
      aria-label={label}
      style={{ '--estack-size': `${itemSize}px`, '--estack-overlap': `${overlap}px` }}
      onMouseLeave={() => setActive(null)}
    >
      {items.map((item, i) => {
        let x = 0;
        let scale = 1;
        let z = i;
        const isActive = active === i;
        if (active !== null) {
          if (i > active) {
            x = Math.max(Math.min(pushForce * (total - i - 1), overlap), overlap - pushForce * (i - active - 1));
          } else if (i < active) {
            x = -Math.min(pushForce * i, overlap);
          } else {
            scale = 1.25;
            z = 100;
          }
        }
        return (
          <div
            key={item.name}
            role="listitem"
            tabIndex={0}
            aria-label={item.name}
            className={`estack__item${isActive ? ' is-active' : ''}`}
            style={{ transform: `translateX(${x}px) scale(${scale})`, zIndex: z }}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(a => (a === i ? null : a))}
            onPointerDown={e => e.pointerType !== 'mouse' && setActive(a => (a === i ? null : i))}
          >
            <img src={item.logo} alt="" draggable={false} loading="lazy" decoding="async" />
            <span className="estack__name" aria-hidden="true">
              {item.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
