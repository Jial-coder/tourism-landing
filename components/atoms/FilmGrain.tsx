import { cn } from "@/lib/utils";

type FilmGrainProps = {
  className?: string;
  /** opacity 0-1, defaults to 0.05 per DESIGN.md §5 layer 3 */
  opacity?: number;
};

/**
 * SVG fractalNoise grain layer — DESIGN.md §5 layer 3.
 * Fixed inset-0 absolute; parent must be relative.
 * mix-blend-overlay over the photo + gradient layers.
 */
export function FilmGrain({ className, opacity = 0.05 }: FilmGrainProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 mix-blend-overlay",
        className,
      )}
      style={{ opacity }}
    >
      <svg
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <filter id="film-grain-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#film-grain-noise)" />
      </svg>
    </div>
  );
}
