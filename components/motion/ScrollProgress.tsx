'use client';

import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import { useMounted } from './use-mounted';

export function ScrollProgress() {
  const reduce = useReducedMotion();
  const mounted = useMounted();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    restDelta: 0.001,
  });

  if (!mounted || reduce) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-50 h-px origin-left bg-jade"
      style={{ scaleX }}
    />
  );
}

export default ScrollProgress;
