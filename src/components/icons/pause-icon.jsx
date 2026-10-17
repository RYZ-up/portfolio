// Its Hover has no pause icon: same component as player-icon.jsx with two bars.
import { forwardRef, useImperativeHandle, useCallback } from "react";
import { motion, useAnimate } from "motion/react";

const PauseIcon = forwardRef(
  (
    { size = 24, className = "", color = "currentColor", strokeWidth = 2 },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      await animate(
        ".pause-icon",
        {
          scale: [1, 0.8],
        },
        {
          duration: 0.4,
          ease: "easeOut",
        },
      );
    }, [animate]);

    const stop = useCallback(async () => {
      await animate(
        ".pause-icon",
        {
          scale: [0.8, 1],
        },
        {
          duration: 0.4,
          ease: "easeOut",
        },
      );
    }, [animate]);

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    return (
      <motion.div
        ref={scope}
        onTap={start}
        onHoverStart={start}
        onHoverEnd={stop}
        className={`inline-flex cursor-pointer ${className}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          color={color}
          className="pause-icon"
          style={{ transformOrigin: "50% 50%" }}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <rect x="6" y="4" width="4" height="16" rx="1" />
          <rect x="14" y="4" width="4" height="16" rx="1" />
        </svg>
      </motion.div>
    );
  },
);

PauseIcon.displayName = "PauseIcon";
export default PauseIcon;
