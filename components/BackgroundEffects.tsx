"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function BackgroundEffects() {
  const [isMouseDevice, setIsMouseDevice] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth, heavy springs for an elegant, cinematic follow effect
  const springX = useSpring(mouseX, { stiffness: 50, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 25 });

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    
    // Defer state update to avoid synchronous rendering trigger
    const frame = requestAnimationFrame(() => {
      setIsMouseDevice(true);
    });

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Deep Marble Base */}
      <div className="absolute inset-0 bg-[#050507]" />
      
      {/* Antique Architectural Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212, 175, 55, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212, 175, 55, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />
      
      {/* Soft warm light beam/candle-glow falling from top-center */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 15%, rgba(212, 175, 55, 0.07) 0%, rgba(5, 5, 7, 0) 70%)",
        }}
      />

      {/* Atmospheric center focus glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle 50vw at 50% 50%, rgba(212, 175, 55, 0.04) 0%, transparent 80%)",
        }}
      />

      {/* Interactive gold-dust glow tracker (Effect 3) */}
      {isMouseDevice && (
        <motion.div
          className="absolute rounded-full pointer-events-none mix-blend-screen opacity-[0.05] blur-[120px]"
          style={{
            x: springX,
            y: springY,
            width: 450,
            height: 450,
            background: "radial-gradient(circle, rgba(212,175,55,1) 0%, rgba(212,175,55,0) 70%)",
            translateX: "-50%",
            translateY: "-50%",
          }}
        />
      )}
    </div>
  );
}
