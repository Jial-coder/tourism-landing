'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { useMounted } from './use-mounted';

interface MagneticCtaProps {
  children: ReactNode;
  className?: string;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
  asChild?: boolean;
}

const useHoverCapability = () => {
  const [canHover, setCanHover] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setCanHover(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setCanHover(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return canHover;
};

export function MagneticCta({ children, className, href, type, ariaLabel, asChild }: MagneticCtaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const canHover = useHoverCapability();
  const mounted = useMounted();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const enabled = mounted && canHover && !reduce;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    const radius = 100;
    if (dist > radius) {
      x.set(0);
      y.set(0);
      return;
    }
    const strength = 6 / radius;
    x.set(dx * strength);
    y.set(dy * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (!enabled) {
    return asChild ? <>{children}</> : <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default MagneticCta;
