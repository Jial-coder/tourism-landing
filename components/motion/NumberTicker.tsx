'use client';

import { useEffect, useRef, useState } from 'react';
import {
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion';

interface NumberTickerProps {
  value: number;
  decimals?: number;
  duration?: number;
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
  duration = 1.6,
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
    bounce: 0,
  });
  const [display, setDisplay] = useState(() => formatNumber(0, decimals));

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(formatNumber(value, decimals));
      return;
    }
    motionValue.set(value);
    const unsubscribe = spring.on('change', (v) => {
      setDisplay(formatNumber(v, decimals));
    });
    return () => unsubscribe();
  }, [inView, reduce, value, decimals, motionValue, spring]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export default NumberTicker;
