'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { CSSProperties, ReactNode } from 'react';

interface CardStackProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  hoverScale?: number;
}

const EASE = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

export function CardStack({ children, className, style, hoverScale = 1.02 }: CardStackProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      style={style}
      whileHover={{ y: -4, scale: hoverScale }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export default CardStack;
