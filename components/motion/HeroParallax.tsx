'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

export function HeroParallax({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 120]);
  const brightness = useTransform(scrollY, [0, 800], [1, 0.7]);
  const filter = useTransform(brightness, (v) => `brightness(${v})`);

  if (reduce) {
    return <div className="absolute inset-0">{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ y, filter }}
      className="absolute inset-0 will-change-transform"
    >
      {children}
    </motion.div>
  );
}

export default HeroParallax;
