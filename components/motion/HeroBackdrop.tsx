'use client';

import Image from 'next/image';
import { useReducedMotion } from 'framer-motion';

interface HeroBackdropProps {
  src: string;
  alt?: string;
}

const PARTICLES = [
  { left: '12%', top: '22%', delay: '0s', dur: '11s', size: 2 },
  { left: '28%', top: '72%', delay: '1.4s', dur: '13s', size: 1 },
  { left: '46%', top: '38%', delay: '0.6s', dur: '14s', size: 2 },
  { left: '63%', top: '18%', delay: '2.2s', dur: '12s', size: 1 },
  { left: '78%', top: '64%', delay: '0.9s', dur: '15s', size: 2 },
  { left: '88%', top: '32%', delay: '1.8s', dur: '13s', size: 1 },
  { left: '34%', top: '54%', delay: '3.1s', dur: '12s', size: 1 },
  { left: '70%', top: '82%', delay: '2.5s', dur: '14s', size: 2 },
];

export function HeroBackdrop({ src, alt = '' }: HeroBackdropProps) {
  const reduce = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className={
          reduce
            ? 'absolute inset-0'
            : 'absolute inset-0 hero-kenburns will-change-transform'
        }
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover"
        />
      </div>

      {!reduce && (
        <div
          aria-hidden="true"
          className="hero-lightray pointer-events-none absolute inset-0 hidden md:block"
        />
      )}

      {!reduce && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden md:block"
        >
          {PARTICLES.map((p, i) => (
            <span
              key={i}
              className="hero-particle absolute rounded-full bg-paper-gold/30"
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
      )}

      <style jsx>{`
        :global(.hero-kenburns) {
          animation: hero-kenburns 30s ease-in-out infinite alternate;
          transform-origin: 50% 55%;
        }
        :global(.hero-lightray) {
          background: linear-gradient(
            120deg,
            transparent 30%,
            color-mix(in oklch, var(--color-jade-soft) 60%, transparent) 50%,
            transparent 70%
          );
          mix-blend-mode: overlay;
          opacity: 0.55;
          animation: hero-lightray 24s linear infinite;
          transform: translateX(-50%);
        }
        :global(.hero-particle) {
          animation-name: hero-particle-float;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          will-change: transform, opacity;
          opacity: 0.25;
          box-shadow: 0 0 6px color-mix(in oklch, var(--color-gold) 70%, transparent);
        }
        @keyframes hero-kenburns {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }
        @keyframes hero-lightray {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(50%); }
        }
        @keyframes hero-particle-float {
          0%, 100% { transform: translateY(20px); opacity: 0.15; }
          50% { transform: translateY(-20px); opacity: 0.3; }
        }
        @media (prefers-reduced-motion: reduce) {
          :global(.hero-kenburns),
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
