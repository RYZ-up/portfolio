import { motion, useMotionValue, useTransform } from 'motion/react';
import { useState, useEffect } from 'react';
import './Stack.css';

function CardRotate({ children, onSendToBack, sensitivity, disableDrag = false }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_, info) {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  if (disableDrag) {
    return (
      <motion.div className="card-rotate-disabled" style={{ x: 0, y: 0 }}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="card-rotate"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: 'grabbing' }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

export default function Stack({
  randomRotation = false,
  rotationRange = 5,
  stackRotation = 4,
  sensitivity = 200,
  cards = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false,
  fanOffset = 0,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  mobileClickOnly = false,
  mobileBreakpoint = 768,
  mirror = false,
  fanOnHover = false,
  fanAngle = 14,
  fanBounce = { stiffness: 380, damping: 11 },
  fanDrop = 0,
  staticStack = false,
  restRotations = null
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isFanned, setIsFanned] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [mobileBreakpoint]);

  const shouldDisableDrag = staticStack || (mobileClickOnly && isMobile);
  // A static stack cannot be dragged, but a click still sends the top card to the back.
  const shouldEnableClick = sendToBackOnClick || shouldDisableDrag;

  const [stack, setStack] = useState(() => {
    if (cards.length) {
      return cards.map((content, index) => ({ id: index + 1, content }));
    } else {
      return [
        {
          id: 1,
          content: (
            <img
              src="https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format"
              alt="card-1"
              className="card-image"
            />
          )
        },
        {
          id: 2,
          content: (
            <img
              src="https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format"
              alt="card-2"
              className="card-image"
            />
          )
        },
        {
          id: 3,
          content: (
            <img
              src="https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format"
              alt="card-3"
              className="card-image"
            />
          )
        },
        {
          id: 4,
          content: (
            <img
              src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format"
              alt="card-4"
              className="card-image"
            />
          )
        }
      ];
    }
  });

  useEffect(() => {
    if (cards.length) {
      setStack(cards.map((content, index) => ({ id: index + 1, content })));
    }
  }, [cards]);

  const sendToBack = id => {
    setStack(prev => {
      const newStack = [...prev];
      const index = newStack.findIndex(card => card.id === id);
      const [card] = newStack.splice(index, 1);
      newStack.unshift(card);
      return newStack;
    });
  };

  useEffect(() => {
    if (autoplay && stack.length > 1 && !isPaused) {
      const interval = setInterval(() => {
        const topCardId = stack[stack.length - 1].id;
        sendToBack(topCardId);
      }, autoplayDelay);

      return () => clearInterval(interval);
    }
  }, [autoplay, autoplayDelay, stack, isPaused]);

  return (
    <div
      className="stack-container"
      onMouseEnter={() => {
        if (pauseOnHover) setIsPaused(true);
        if (fanOnHover) setIsFanned(true);
      }}
      onMouseLeave={() => {
        if (pauseOnHover) setIsPaused(false);
        if (fanOnHover) setIsFanned(false);
      }}
    >
      {stack.map((card, index) => {
        const randomRotate = randomRotation ? Math.random() * rotationRange * 2 - rotationRange : 0;
        const depthFromTop = stack.length - 1 - index;
        const direction = mirror ? -1 : 1;
        return (
          <CardRotate
            key={card.id}
            onSendToBack={() => sendToBack(card.id)}
            sensitivity={sensitivity}
            disableDrag={shouldDisableDrag}
          >
            <motion.div
              className="card"
              onClick={() => shouldEnableClick && sendToBack(card.id)}
              animate={
                fanOnHover && isFanned
                  ? {
                      x: 0,
                      y: depthFromTop * fanDrop,
                      rotateZ: depthFromTop * fanAngle * direction,
                      scale: 1 + index * 0.06 - stack.length * 0.06,
                      transformOrigin: mirror ? '10% 90%' : '90% 90%'
                    }
                  : {
                      x: depthFromTop * fanOffset * direction,
                      y: depthFromTop * fanOffset,
                      rotateZ: restRotations
                        ? restRotations[index % restRotations.length] * direction
                        : (depthFromTop * stackRotation + randomRotate) * direction,
                      scale: restRotations ? 1 : 1 + index * 0.06 - stack.length * 0.06,
                      transformOrigin: restRotations ? '50% 50%' : mirror ? '10% 90%' : '90% 90%'
                    }
              }
              initial={false}
              transition={{
                type: 'spring',
                stiffness: fanOnHover ? fanBounce.stiffness : animationConfig.stiffness,
                damping: fanOnHover ? fanBounce.damping : animationConfig.damping,
                delay: fanOnHover && isFanned ? depthFromTop * 0.03 : 0
              }}
            >
              {card.content}
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}
