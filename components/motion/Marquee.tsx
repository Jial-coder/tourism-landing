'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState, type ReactNode } from 'react';

interface MarqueeProps {
  items: ReactNode[];
  speed?: number;
  className?: string;
  itemClassName?: string;
}

export function Marquee({ items, speed = 30, className, itemClassName }: MarqueeProps) {
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const doubled = [...items, ...items];

  if (reduce) {
    return (
      <div className={className}>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {items.map((item, idx) => (
            <span key={idx} className={itemClassName}>
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden ${className ?? ''}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        className="flex w-max items-center gap-12 whitespace-nowrap"
        animate={paused ? undefined : { x: ['0%', '-50%'] }}
        transition={{
          duration: speed,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {doubled.map((item, idx) => (
          <span
            key={idx}
            className={`shrink-0 ${itemClassName ?? ''}`}
            aria-hidden={idx >= items.length}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default Marquee;
