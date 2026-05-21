'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

interface HeroBackdropProps {
  src?: string;
  slides?: string[];
  alt?: string;
  intervalMs?: number;
}

const DEFAULT_SLIDES = [
  '/landmarks/hero-gen/v4-a.webp',
  '/landmarks/hero-gen/v3-a.webp',
  '/landmarks/hero-gen/v2-c.webp',
  '/landmarks/hero-gen/v3-c.webp',
];

const PARTICLES = [
  { left: '8%', top: '18%', delay: '0s', dur: '11s', size: 3, hue: 'gold' },
  { left: '17%', top: '64%', delay: '1.2s', dur: '13s', size: 2, hue: 'jade' },
  { left: '24%', top: '32%', delay: '2.0s', dur: '12s', size: 4, hue: 'gold' },
  { left: '32%', top: '78%', delay: '0.6s', dur: '14s', size: 3, hue: 'jade' },
  { left: '40%', top: '22%', delay: '3.2s', dur: '12s', size: 2, hue: 'gold' },
  { left: '46%', top: '52%', delay: '1.8s', dur: '13s', size: 4, hue: 'jade' },
  { left: '54%', top: '14%', delay: '0.9s', dur: '15s', size: 3, hue: 'gold' },
  { left: '60%', top: '70%', delay: '2.4s', dur: '12s', size: 2, hue: 'jade' },
  { left: '66%', top: '36%', delay: '0.3s', dur: '14s', size: 4, hue: 'gold' },
  { left: '72%', top: '58%', delay: '3.6s', dur: '13s', size: 3, hue: 'jade' },
  { left: '78%', top: '24%', delay: '1.5s', dur: '12s', size: 2, hue: 'gold' },
  { left: '83%', top: '76%', delay: '2.7s', dur: '15s', size: 4, hue: 'jade' },
  { left: '88%', top: '40%', delay: '0.8s', dur: '13s', size: 3, hue: 'gold' },
  { left: '92%', top: '62%', delay: '2.1s', dur: '14s', size: 2, hue: 'jade' },
  { left: '13%', top: '48%', delay: '4.0s', dur: '12s', size: 3, hue: 'gold' },
  { left: '37%', top: '8%', delay: '1.0s', dur: '13s', size: 2, hue: 'jade' },
  { left: '57%', top: '88%', delay: '3.0s', dur: '15s', size: 4, hue: 'gold' },
  { left: '76%', top: '6%', delay: '0.5s', dur: '12s', size: 2, hue: 'jade' },
];

export function HeroBackdrop({
  src,
  slides,
  alt = '',
  intervalMs = 7000,
}: HeroBackdropProps) {
  const reduce = useReducedMotion();
  const list =
    slides && slides.length > 0
      ? slides
      : src
        ? Array.from(new Set([src, ...DEFAULT_SLIDES]))
        : DEFAULT_SLIDES;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || list.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % list.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [reduce, list.length, intervalMs]);

  if (reduce) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={list[0]}
          alt={alt}
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={list[index]}
          className="absolute inset-0 will-change-transform"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ transformOrigin: '50% 55%' }}
            initial={{ scale: 1.04 }}
            animate={{ scale: [1.0, 1.18, 1.0] }}
            transition={{ duration: 18, ease: 'easeInOut', repeat: Infinity }}
          >
            <Image
              src={list[index]}
              alt={alt}
              fill
              priority={index === 0}
              sizes="100vw"
              quality={90}
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div
        aria-hidden="true"
        className="hero-lightray pointer-events-none absolute inset-0 hidden md:block"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden md:block"
      >
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className={`hero-particle absolute rounded-full ${
              p.hue === 'jade' ? 'hero-particle-jade' : 'hero-particle-gold'
            }`}
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.dur,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        :global(.hero-lightray) {
          background: linear-gradient(
            120deg,
            transparent 28%,
            color-mix(in oklch, var(--color-jade-soft) 80%, transparent) 50%,
            transparent 72%
          );
          mix-blend-mode: screen;
          opacity: 0.22;
          animation: hero-lightray 14s linear infinite;
          transform: translateX(-50%);
        }
        :global(.hero-particle) {
          animation-name: hero-particle-float;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          will-change: transform, opacity;
        }
        :global(.hero-particle-gold) {
          background: color-mix(in oklch, var(--color-gold) 75%, transparent);
          box-shadow: 0 0 8px color-mix(in oklch, var(--color-gold) 80%, transparent);
        }
        :global(.hero-particle-jade) {
          background: color-mix(in oklch, var(--color-jade-soft) 70%, transparent);
          box-shadow: 0 0 8px color-mix(in oklch, var(--color-jade-soft) 70%, transparent);
        }
        @keyframes hero-lightray {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(50%); }
        }
        @keyframes hero-particle-float {
          0%, 100% { transform: translateY(20px); opacity: 0.45; }
          50% { transform: translateY(-22px); opacity: 0.7; }
        }
        @media (prefers-reduced-motion: reduce) {
          :global(.hero-lightray),
          :global(.hero-particle) {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default HeroBackdrop;
