'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { CSSProperties, ReactNode } from 'react';
import { useMounted } from './use-mounted';

interface RevealProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  y?: number;
  once?: boolean;
  duration?: number;
}

const EASE = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

export function Reveal({
  children,
  className,
  style,
  delay = 0,
  y = 24,
  once = true,
  duration = 0.45,
}: RevealProps) {
  const reduce = useReducedMotion();
  const mounted = useMounted();

  if (reduce || !mounted) {
    return (
      <div className={className} style={style} suppressHydrationWarning>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;
