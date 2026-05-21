'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { useMounted } from './use-mounted';

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

export function CursorAura() {
  const reduce = useReducedMotion();
  const canHover = useHoverCapability();
  const mounted = useMounted();
  const [variant, setVariant] = useState<'default' | 'link' | 'text'>('default');
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 200, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 22, mass: 0.4 });

  useEffect(() => {
    if (!canHover || reduce) return;
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX - 6);
      y.set(e.clientY - 6);
      setVisible(true);
      const target = e.target as HTMLElement | null;
      if (!target) {
        setVariant('default');
        return;
      }
      const interactive = target.closest('a, button, [role="button"], input, select, textarea, label');
      if (interactive) {
        setVariant('link');
        return;
      }
      const tag = target.tagName;
      if (
        tag === 'P' ||
        tag === 'H1' ||
        tag === 'H2' ||
        tag === 'H3' ||
        tag === 'H4' ||
        tag === 'SPAN' ||
        tag === 'LI'
      ) {
        setVariant('text');
        return;
      }
      setVariant('default');
    };
    const onLeave = () => setVisible(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, [canHover, reduce, x, y]);

  if (!mounted || !canHover || reduce) return null;

  const scale = variant === 'link' ? 2.5 : variant === 'text' ? 0.5 : 1;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-50 size-3 rounded-full bg-jade/35 mix-blend-multiply"
      style={{ x: sx, y: sy }}
      animate={{ scale, opacity: visible ? 1 : 0 }}
      transition={{ scale: { duration: 0.2 }, opacity: { duration: 0.2 } }}
    />
  );
}

export default CursorAura;
