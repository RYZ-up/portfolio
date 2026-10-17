import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react';
import './CursorCard.css';

// Adapted from VengeanceUI "Cursor Card" (vengenceui.com/components/cursor-card):
// an inline link that shows a preview card (image + description) following
// the cursor on a spring. Touch: the first tap shows the card under the word,
// a second tap follows the link; a tap anywhere else closes it.
const W = 240;

export default function CursorCard({ children, image, description, href, onNavigate, fit = 'cover' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  // Pointer type of the last press: a click event does not carry it everywhere (Safari).
  const lastPointer = useRef('mouse');
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { damping: 25, stiffness: 300 });
  const sy = useSpring(y, { damping: 25, stiffness: 300 });

  const place = (cx, cy) => {
    const left = Math.min(Math.max(8, cx - W / 2), window.innerWidth - W - 8);
    const below = cy + 20;
    const top = below + 260 > window.innerHeight ? cy - 280 : below;
    x.set(left);
    y.set(Math.max(8, top));
  };

  useEffect(() => {
    if (!open) return undefined;
    const away = e => !ref.current?.contains(e.target) && setOpen(false);
    const close = () => setOpen(false);
    document.addEventListener('pointerdown', away);
    window.addEventListener('scroll', close, { passive: true });
    return () => {
      document.removeEventListener('pointerdown', away);
      window.removeEventListener('scroll', close);
    };
  }, [open]);

  const onClick = e => {
    const touch = lastPointer.current !== 'mouse';
    if (touch && !open) {
      e.preventDefault();
      const r = ref.current.getBoundingClientRect();
      place(r.left + r.width / 2, r.bottom - 10);
      setOpen(true);
      return;
    }
    if (!href) {
      e.preventDefault();
      return;
    }
    if (onNavigate) {
      e.preventDefault();
      setOpen(false);
      onNavigate();
    }
  };

  return (
    <>
      <a
        ref={ref}
        href={href || '#'}
        className="cursor-card__link"
        onMouseEnter={e => {
          place(e.clientX, e.clientY);
          setOpen(true);
        }}
        onMouseMove={e => place(e.clientX, e.clientY)}
        onMouseLeave={() => setOpen(false)}
        onPointerDown={e => (lastPointer.current = e.pointerType)}
        onClick={onClick}
      >
        {children}
      </a>
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              className="cursor-card"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              style={{ x: sx, y: sy, width: W }}
              aria-hidden="true"
            >
              <img src={image} alt="" className={fit === 'contain' ? 'is-contain' : undefined} />
              <p>{description}</p>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
