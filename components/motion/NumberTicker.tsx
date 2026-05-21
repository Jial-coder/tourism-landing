'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useMotionValue, useReducedMotion } from 'framer-motion';
import { useMounted } from './use-mounted';

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
  duration = 1.6,
  delay = 0.3,
  className,
  prefix = '',
  suffix = '',
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);
  const reduce = useReducedMotion();
  const mounted = useMounted();
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState(() => formatNumber(0, decimals));

  useEffect(() => {
    if (!mounted) return;
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin: '-80px 0px -80px 0px', threshold: 0 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [mounted]);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      motionValue.set(value);
      setDisplay(formatNumber(value, decimals));
      return;
    }
    let controls: ReturnType<typeof animate> | null = null;
    const startTimer = window.setTimeout(() => {
      controls = animate(motionValue, value, {
        duration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => setDisplay(formatNumber(v, decimals)),
      });
    }, delay * 1000);
    return () => {
      window.clearTimeout(startTimer);
      controls?.stop();
    };
  }, [inView, reduce, value, decimals, delay, duration, motionValue]);

  if (!mounted) {
    return (
      <span ref={ref} className={className} suppressHydrationWarning>
        {prefix}
        {formatNumber(0, decimals)}
        {suffix}
      </span>
    );
  }

  return (
    <span ref={ref} className={className} style={{ display: 'inline-block', fontWeight: 700 }}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export default NumberTicker;
