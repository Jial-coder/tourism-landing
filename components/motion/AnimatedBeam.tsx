'use client';

import { useEffect, useId, useState, type RefObject } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface AnimatedBeamProps {
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  curvature?: number;
  duration?: number;
  delay?: number;
  pathColor?: string;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
}

interface PathState {
  d: string;
  width: number;
  height: number;
  midX: number;
  midY: number;
}

export function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  duration = 1.4,
  delay = 0,
  pathColor = 'var(--color-ink-soft)',
  pathOpacity = 0.32,
  gradientStartColor = '#3DA866',
  gradientStopColor = 'var(--color-gold)',
}: AnimatedBeamProps) {
  const id = useId();
  const reduce = useReducedMotion();
  const [path, setPath] = useState<PathState>({
    d: '',
    width: 0,
    height: 0,
    midX: 0,
    midY: 0,
  });

  useEffect(() => {
    function update() {
      const c = containerRef.current;
      const f = fromRef.current;
      const t = toRef.current;
      if (!c || !f || !t) return;
      const cb = c.getBoundingClientRect();
      const fb = f.getBoundingClientRect();
      const tb = t.getBoundingClientRect();
      const x1 = fb.left - cb.left + fb.width / 2;
      const y1 = fb.top - cb.top + fb.height / 2;
      const x2 = tb.left - cb.left + tb.width / 2;
      const y2 = tb.top - cb.top + tb.height / 2;
      const cx = (x1 + x2) / 2;
      const cy = (y1 + y2) / 2 - curvature;
      const d = `M ${x1},${y1} Q ${cx},${cy} ${x2},${y2}`;
      const midX = (x1 + 2 * cx + x2) / 4;
      const midY = (y1 + 2 * cy + y2) / 4;
      setPath({ d, width: cb.width, height: cb.height, midX, midY });
    }
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [containerRef, fromRef, toRef, curvature]);

  if (reduce || !path.d) return null;

  return (
    <svg
      width={path.width}
      height={path.height}
      className="pointer-events-none absolute left-0 top-0"
      style={{ width: path.width, height: path.height }}
    >
      <defs>
        <linearGradient
          id={id}
          gradientUnits="userSpaceOnUse"
          x1="0%"
          x2="100%"
        >
          <stop offset="0%" stopColor={gradientStartColor} stopOpacity="0" />
          <stop offset="50%" stopColor={gradientStartColor} stopOpacity="1" />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={path.d}
        stroke={pathColor}
        strokeWidth={1}
        strokeOpacity={pathOpacity}
        fill="none"
      />
      <motion.path
        d={path.d}
        stroke={`url(#${id})`}
        strokeWidth={3}
        fill="none"
        initial={{ strokeDasharray: '0 1000', strokeDashoffset: 0 }}
        animate={{ strokeDasharray: '180 600', strokeDashoffset: -1000 }}
        transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
      />
      <motion.circle
        cx={path.midX}
        cy={path.midY}
        fill="none"
        stroke={gradientStartColor}
        strokeWidth={1.5}
        initial={{ r: 0, opacity: 0 }}
        animate={{ r: [0, 24], opacity: [0.6, 0] }}
        transition={{ duration, delay, repeat: Infinity, ease: 'easeOut' }}
      />
    </svg>
  );
}

export default AnimatedBeam;
