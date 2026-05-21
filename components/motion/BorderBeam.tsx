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
  accent?: 'normal' | 'subtle';
}

export function BorderBeam({
  duration = 5,
  delay = 0,
  colorFrom = '#3DA866',
  colorTo = 'var(--color-gold)',
  className,
  accent = 'normal',
}: BorderBeamProps) {
  const reduce = useReducedMotion();
  if (reduce) return null;

  const strokeWidth = accent === 'subtle' ? '1px' : '1.5px';

  const style: CSSProperties = {
    border: `${strokeWidth} solid transparent`,
    background: [
      'linear-gradient(transparent, transparent) padding-box',
      `conic-gradient(from var(--border-beam-angle), transparent 0deg, ${colorFrom} 120deg, ${colorTo} 200deg, transparent 360deg) border-box`,
    ].join(', '),
    animation: `border-beam var(--bb-duration, ${duration}s) ${delay}s linear infinite`,
    ['--border-beam-angle' as string]: '0deg',
    ['--bb-duration' as string]: `${duration}s`,
  };

  return (
    <div
      aria-hidden="true"
      className={[
        'border-beam pointer-events-none absolute inset-0 rounded-[inherit]',
        'opacity-50 transition-[opacity,box-shadow] duration-300',
        'group-hover:opacity-100 group-hover:[--bb-duration:2.5s]',
        'group-hover:shadow-[inset_0_0_24px_rgba(61,168,102,0.35)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    />
  );
}

export default BorderBeam;
