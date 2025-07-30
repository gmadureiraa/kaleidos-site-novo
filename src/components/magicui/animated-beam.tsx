"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface AnimatedBeamProps {
  containerRef: React.RefObject<HTMLElement | null>;
  fromRef: React.RefObject<HTMLElement | null>;
  toRef: React.RefObject<HTMLElement | null>;
  curvature?: number;
  endYOffset?: number;
  reverse?: boolean;
}

export function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  endYOffset = 0,
  reverse = false,
}: AnimatedBeamProps) {
  const [path, setPath] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current || !fromRef.current || !toRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const fromRect = fromRef.current.getBoundingClientRect();
      const toRect = toRef.current.getBoundingClientRect();

      const fromX = fromRect.left + fromRect.width / 2 - containerRect.left;
      const fromY = fromRect.top + fromRect.height / 2 - containerRect.top;
      const toX = toRect.left + toRect.width / 2 - containerRect.left;
      const toY = toRect.top + toRect.height / 2 - containerRect.top + endYOffset;

      const midX = (fromX + toX) / 2;
      const midY = (fromY + toY) / 2 + curvature;

      const newPath = `M ${fromX} ${fromY} Q ${midX} ${midY} ${toX} ${toY}`;
      setPath(newPath);
      
      // Delay para mostrar a animação
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setIsVisible(true), 100);
    };

    updatePath();
    window.addEventListener("resize", updatePath);
    
    return () => {
      window.removeEventListener("resize", updatePath);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [containerRef, fromRef, toRef, curvature, endYOffset]);

  if (!path) return null;

  return (
    <svg
      className="absolute inset-0 z-0 h-full w-full"
      style={{ pointerEvents: "none" }}
    >
      <defs>
        <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="#00FF88" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <motion.path
        d={path}
        stroke="url(#beam-gradient)"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: isVisible ? 1 : 0, 
          opacity: isVisible ? 0.8 : 0 
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
        }}
      />
      {isVisible && (
        <motion.circle
          r="2"
          fill="#00FF88"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <animateMotion
            dur={reverse ? "4s" : "3s"}
            repeatCount="indefinite"
            path={path}
          />
        </motion.circle>
      )}
    </svg>
  );
} 