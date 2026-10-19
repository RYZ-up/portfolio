import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import './MaskedAvatars.css';

// VengeanceUI "Masked Avatars" (vengenceui.com/components/masked-avatars),
// in JS + plain CSS: overlapping round avatars, each one cut by the next
// with a mask; hovering one lifts it and wraps its name around it. Items may
// carry an `onClick` (with `href` for the link).
export default function MaskedAvatars({
  avatars,
  size = 70,
  border = 8,
  column = 40,
  movement = 0.72,
  transition = 0.18,
  ringed = true,
  offset = -3,
  blurOnRest = true,
  className = ''
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const { dynamicSize, maskImage } = useMemo(() => {
    const circle = (border * 2 + size) / 2;
    const radX = circle - column - border;
    return {
      dynamicSize: `clamp(${size - 20}px, ${size}px, ${size + 30}px)`,
      maskImage: `radial-gradient(${circle}px ${circle}px at ${radX}px 50%, transparent ${circle - 0.5}px, white ${circle}px)`
    };
  }, [size, border, column]);

  const spring = { type: 'spring', stiffness: 260, damping: 20 };

  return (
    <div className={`masked-avatars ${className}`} style={{ gap: `min(6vw, ${size * 0.5}px)` }} role="group">
      <ul
        className="masked-avatars__list"
        // No sideways shift: each avatar already sticks out (size - column) / 2
        // on the left, and the last one as much on the right, so the group stays centred.
        style={{ height: column, gridAutoColumns: column }}
      >
        {avatars.map((person, index) => {
          const isHovered = hoveredIndex === index;
          const isPrevHovered = hoveredIndex === index - 1;
          const baseOffset = -size * 1.5;
          const moveOffset = size * movement;
          const maskPosition = isPrevHovered
            ? `0 ${baseOffset - moveOffset}px`
            : isHovered
              ? `0 ${baseOffset + moveOffset}px`
              : `0 ${baseOffset}px`;

          return (
            <li
              key={person.name}
              className="masked-avatars__item"
              style={{
                width: dynamicSize,
                transform: `translate(${(size - column) * -0.5}px, ${(size - column) * 0.5}px)`,
                zIndex: avatars.length - index
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {ringed && (
                <div
                  className="masked-avatars__name"
                  aria-hidden="true"
                  style={{
                    width: size,
                    height: size,
                    transform: `translate(-50%, ${isHovered ? -movement * 100 : 0}%)`,
                    transition: `transform ${transition}s ease-out`
                  }}
                >
                  {person.name.split('').map((char, i) => (
                    <span
                      key={i}
                      style={{
                        offsetDistance: `${(offset + i) * 0.75}ch`,
                        transform: isHovered ? 'translate(0, 0)' : 'translate(0, 100%)',
                        filter: isHovered ? 'blur(0px)' : blurOnRest ? 'blur(4px)' : 'blur(0px)',
                        opacity: isHovered ? 1 : 0,
                        transition: `transform ${transition}s ease-out, opacity ${transition}s ease-out, filter ${transition}s ease-out`
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </div>
              )}

              <div className="masked-avatars__holder">
                <motion.a
                  className="masked-avatars__avatar"
                  href={person.href}
                  onClick={person.onClick}
                  aria-label={person.name}
                  onFocus={() => setHoveredIndex(index)}
                  onBlur={() => setHoveredIndex(null)}
                  onTouchStart={() => setHoveredIndex(index)}
                  style={{
                    maskImage: index === 0 ? 'none' : maskImage,
                    WebkitMaskImage: index === 0 ? 'none' : maskImage,
                    maskSize: '100% 400%',
                    WebkitMaskSize: '100% 400%',
                    maskRepeat: 'no-repeat'
                  }}
                  animate={{
                    maskPosition: index === 0 ? '0 0' : maskPosition,
                    y: isHovered ? `${-movement * 100}%` : '0%',
                    scale: isHovered ? 1.05 : 1,
                    opacity: hoveredIndex !== null && hoveredIndex !== index ? 0.7 : 1
                  }}
                  transition={spring}
                >
                  <img src={person.avatar} alt="" loading="lazy" draggable={false} />
                </motion.a>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
