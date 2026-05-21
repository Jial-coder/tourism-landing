'use client';

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { useRef, useState, type ReactNode } from 'react';
import { useMounted } from './use-mounted';

interface Tilt3DProps {
  children: ReactNode;
  className?: string;
  max?: number;
}

export function Tilt3D({ children, className, max = 12 }: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const mounted = useMounted();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 22 });
  const sy = useSpring(y, { stiffness: 220, damping: 22 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [max, -max]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-max, max]);

  const hx = useMotionValue(50);
  const hy = useMotionValue(50);
  const shx = useSpring(hx, { stiffness: 200, damping: 24 });
  const shy = useSpring(hy, { stiffness: 200, damping: 24 });
  const xPct = useTransform(shx, (v) => `${v}%`);
  const yPct = useTransform(shy, (v) => `${v}%`);
  const highlight = useMotionTemplate`radial-gradient(circle at ${xPct} ${yPct}, color-mix(in oklch, var(--color-jade-soft) 55%, transparent) 0%, transparent 45%)`;

  const [hovered, setHovered] = useState(false);

  if (reduce || !mounted) {
    return (
      <div className={className} suppressHydrationWarning>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1200,
        position: 'relative',
      }}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width;
        const ny = (e.clientY - rect.top) / rect.height;
        x.set(nx - 0.5);
        y.set(ny - 0.5);
        hx.set(nx * 100);
        hy.set(ny * 100);
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
        hx.set(50);
        hy.set(50);
        setHovered(false);
      }}
    >
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-screen"
        style={{
          backgroundImage: highlight,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 220ms ease-out',
        }}
      />
    </motion.div>
  );
}

export default Tilt3D;
