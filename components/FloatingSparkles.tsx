"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FloatingSparkles() {
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; size: number; duration: number }[]>([]);

  useEffect(() => {
    const newSparkles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 10,
    }));
    setSparkles(newSparkles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          initial={{ 
            x: `${sparkle.x}%`, 
            y: `${sparkle.y}%`, 
            opacity: 0,
            scale: 0 
          }}
          animate={{
            y: [`${sparkle.y}%`, `${sparkle.y - 20}%`, `${sparkle.y}%`],
            x: [`${sparkle.x}%`, `${sparkle.x + 5}%`, `${sparkle.x}%`],
            opacity: [0, 0.4, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: sparkle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-full bg-gold/30 blur-[1px]"
          style={{
            width: sparkle.size,
            height: sparkle.size,
          }}
        />
      ))}
    </div>
  );
}
