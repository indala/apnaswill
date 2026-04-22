"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function GoldenCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 250 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    setMounted(true);
    
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" || 
        target.tagName === "A" || 
        target.closest("button") || 
        target.closest("a") ||
        target.classList.contains("cursor-pointer")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-9999 hidden lg:block">
      {/* Outer Glow */}
      <motion.div
        style={{
          left: springX,
          top: springY,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          opacity: isHovering ? 0.3 : 0.15,
        }}
        className="absolute w-12 h-12 rounded-full bg-gold blur-xl"
      />
      
      {/* Core Cursor */}
      <motion.div
        style={{
          left: springX,
          top: springY,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          scale: isHovering ? 0.5 : 1,
          backgroundColor: isHovering ? "#B8860B" : "#D4AF37",
        }}
        className="absolute w-4 h-4 rounded-full border-2 border-white shadow-[0_0_15px_rgba(212,175,55,0.8)]"
      >
        {/* Internal Spark */}
        <motion.div 
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
          className="absolute inset-0 bg-white rounded-full blur-[2px]"
        />
      </motion.div>

      {/* Trailing Sparkles (Simplified for performance) */}
      {[...Array(3)].map((_, i) => (
        <Sparkle key={i} x={cursorX} y={cursorY} delay={i * 0.1} />
      ))}
    </div>
  );
}

function Sparkle({ x, y, delay }: { x: any, y: any, delay: number }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const unsubscribeX = x.on("change", (v: number) => setPos(prev => ({ ...prev, x: v })));
    const unsubscribeY = y.on("change", (v: number) => setPos(prev => ({ ...prev, y: v })));
    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [x, y]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        x: pos.x + (Math.random() - 0.5) * 40,
        y: pos.y + (Math.random() - 0.5) * 40,
      }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        delay: delay,
      }}
      className="absolute w-1 h-1 bg-gold rounded-full blur-[1px]"
    />
  );
}
