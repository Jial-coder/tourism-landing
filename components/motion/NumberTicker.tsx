'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion';

interface NumberTickerProps {
  value: number;
  decimals?: number;
  duration?: number;
  delay?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

function formatNumber(v: number, decimals: number) {
  const fixed = v.toFixed(decimals);
  const [intPart, fracPart] = fixed.split('.');
  const withSep = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return fracPart !== undefined ? `${withSep}.${fracPart}` : withSep;
}

export function NumberTicker({
  value,
  decimals = 0,
  duration = 2.6,
  delay = 0.3,
  className,
  prefix = '',
  suffix = '',
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduce = useReducedMotion();
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0.18,
  });
  const [display, setDisplay] = useState(() => formatNumber(0, decimals));
  const [arrived, setArrived] = useState(false);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(formatNumber(value, decimals));
      setArrived(true);
      return;
    }
    const startTimer = window.setTimeout(() => {
      motionValue.set(value);
    }, delay * 1000);
    const arriveTimer = window.setTimeout(
      () => setArrived(true),
      (delay + duration) * 1000,
    );
    const unsubscribe = spring.on('change', (v) => {
      setDisplay(formatNumber(v, decimals));
    });
    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(arriveTimer);
      unsubscribe();
    };
  }, [inView, reduce, value, decimals, delay, duration, motionValue, spring]);

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ display: 'inline-block', fontWeight: 700 }}
      animate={
        reduce
          ? undefined
          : arrived
            ? {
                scale: [1, 1.06, 1],
                color: [
                  'var(--color-jade)',
                  'var(--color-jade)',
                  'var(--color-ink)',
                ],
              }
            : undefined
      }
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {prefix}
      {display}
      {suffix}
    </motion.span>
  );
}

export default NumberTicker;
