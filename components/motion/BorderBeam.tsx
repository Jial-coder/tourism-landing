'use client';

import { useReducedMotion } from 'framer-motion';
import type { CSSProperties } from 'react';

interface BorderBeamProps {
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  className?: string;
}

export function BorderBeam({
  duration = 6,
  delay = 0,
  colorFrom = 'var(--color-jade)',
  colorTo = 'var(--color-gold)',
  className,
}: BorderBeamProps) {
  const reduce = useReducedMotion();
  if (reduce) return null;

  const style: CSSProperties = {
    border: '1px solid transparent',
    background: [
      'linear-gradient(transparent, transparent) padding-box',
      `conic-gradient(from var(--border-beam-angle), transparent 0deg, ${colorFrom} 120deg, ${colorTo} 180deg, transparent 360deg) border-box`,
    ].join(', '),
    animation: `border-beam ${duration}s ${delay}s linear infinite`,
    ['--border-beam-angle' as string]: '0deg',
  };

  return (
    <div
      aria-hidden="true"
      className={[
        'pointer-events-none absolute inset-0 rounded-[inherit]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    />
  );
}

export default BorderBeam;
