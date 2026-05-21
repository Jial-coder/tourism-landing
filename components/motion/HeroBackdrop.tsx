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
  '/landmarks/beijing.jpg',
  '/landmarks/guilin.jpg',
  '/landmarks/zhangjiajie.jpg',
  '/landmarks/jiuzhaigou.jpg',
];

export function HeroBackdrop({
  src,
  slides,
  alt = '',
  intervalMs = 6500,
}: HeroBackdropProps) {
  const reduce = useReducedMotion();
  const list =
    slides && slides.length > 0
      ? slides
      : src
        ? Array.from(new Set([src, ...DEFAULT_SLIDES]))
        : DEFAULT_SLIDES;
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (reduce || list.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % list.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [reduce, list.length, intervalMs]);

  if (reduce || !mounted) {
    return (
      <div className="absolute inset-0 overflow-hidden" suppressHydrationWarning>
        {list.map((slide, i) => (
          <Image
            key={slide}
            src={slide}
            alt={i === index ? alt : ''}
            fill
            priority={i === 0}
            sizes="100vw"
            quality={90}
            className={`object-cover transition-opacity duration-200 ease-out ${
              i === index ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        {mounted && list.length > 1 && (
          <div className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-3 md:flex">
            {list.map((slide, i) => (
              <button
                key={slide}
                type="button"
                aria-label={`View hero image ${i + 1} of ${list.length}`}
                aria-pressed={i === index}
                onClick={() => setIndex(i)}
                className={`relative h-20 w-[120px] overflow-hidden rounded-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade ${
                  i === index
                    ? 'ring-2 ring-jade'
                    : 'ring-1 ring-soft-ivory/50 opacity-80 hover:opacity-100 hover:ring-soft-ivory/80'
                }`}
              >
                <Image
                  src={slide}
                  alt=""
                  fill
                  sizes="120px"
                  quality={75}
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={list[index]}
          className="absolute inset-0 will-change-transform"
          initial={{ opacity: 0, scale: 1.04, x: 24 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.98, x: -24 }}
          transition={{ duration: 1.0, ease: 'easeInOut' }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ transformOrigin: '50% 55%' }}
            initial={{ scale: 1.04 }}
            animate={{ scale: [1.0, 1.06, 1.0] }}
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

      {/* slide indicators (md+) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-2 md:flex"
      >
        {list.map((_, i) => (
          <span
            key={i}
            className={`h-[3px] rounded-full transition-all duration-500 ${
              i === index ? 'w-10 bg-jade' : 'w-4 bg-soft-ivory/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroBackdrop;
