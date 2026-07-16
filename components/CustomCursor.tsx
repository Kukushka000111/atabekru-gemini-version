"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const INTERACTIVE_SELECTOR =
  'button, a, input, textarea, select, [data-cursor-hover], [role="button"]';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, { stiffness: 500, damping: 28, mass: 0.5 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28, mass: 0.5 });

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const handleMouseMove = (event: MouseEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      setIsVisible(true);

      const target = event.target as HTMLElement | null;
      setIsHovering(!!target?.closest(INTERACTIVE_SELECTOR));
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        animate={{
          width: isHovering ? 32 : 10,
          height: isHovering ? 32 : 10,
          opacity: isHovering ? 0.5 : 0.85,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="rounded-full bg-gold-400/90 blur-[1px] shadow-[0_0_12px_rgba(212,175,55,0.6)]"
      />
    </motion.div>
  );
}
