import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * TileCaption — DESIGN.md §7.11 collage.
 * Three lines: EN·CN / GPS / IATA.
 */
type TileCaptionProps = {
  en: string;
  cn: string;
  gps: string;
  iata: string;
  className?: string;
};

export function TileCaption({ en, cn: cnText, gps, iata, className }: TileCaptionProps) {
  return (
    <div
      className={cn(
        "mt-2.5 pointer-events-none flex flex-col gap-0.5",
        "text-soft-ivory drop-shadow-md",
        className,
      )}
    >
      <div className="text-[12px] font-misans-bold tracking-wide text-soft-ivory/90">
        {en} · {cnText}
      </div>
      <div className="text-[11px] font-misans-regular text-soft-ivory/60">
        {gps}
      </div>
      <div className="text-[10px] font-misans-regular tracking-widest text-soft-ivory/50">
        {iata}
      </div>
    </div>
  );
}

/**
 * DestinationTile — DESIGN.md §7.4 + §7.11.
 * Floating photo tile, micro-rotated, with TileCaption underneath.
 *
 * When `href` is provided, the entire tile becomes a clickable Link with hover
 * affordance: lift 4px + alpine-blue stroke + ArrowUpRight glyph in the corner.
 */
type DestinationTileProps = {
  src: string;
  alt: string;
  width?: number;
  rotate?: string;
  caption?: Omit<TileCaptionProps, "className">;
  href?: string;
  ariaLabel?: string;
  className?: string;
};

export function DestinationTile({
  src,
  alt,
  width = 220,
  rotate = "-2deg",
  caption,
  href,
  ariaLabel,
  className,
}: DestinationTileProps) {
  const photoBox = (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`${width}px`}
        className="object-cover motion-safe:transition-transform motion-safe:duration-300 group-hover:scale-[1.04]"
      />
      {href && (
        <span
          aria-hidden
          className={cn(
            "absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full",
            "bg-charcoal-blue/70 backdrop-blur-md text-soft-ivory",
            "opacity-0 motion-safe:transition-all motion-safe:duration-200",
            "group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
          )}
        >
          <ArrowUpRight size={14} />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-label={ariaLabel ?? alt}
        className={cn("group block cursor-pointer", className)}
        style={{ width, transform: `rotate(${rotate})` }}
      >
        <div
          className={cn(
            "relative aspect-[4/3] overflow-hidden rounded-[6px]",
            "border border-soft-ivory/12 shadow-[0_15px_40px_rgba(15,23,42,0.5)]",
            "motion-safe:transition-all motion-safe:duration-300",
            "group-hover:-translate-y-1 group-hover:border-alpine-blue/45 group-hover:shadow-[0_20px_50px_rgba(15,23,42,0.6)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alpine-blue/70",
          )}
        >
          {photoBox}
        </div>
        {caption && <TileCaption {...caption} />}
      </Link>
    );
  }

  return (
    <div
      className={cn(className)}
      style={{ width, transform: `rotate(${rotate})` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[6px] border border-soft-ivory/10 shadow-[0_15px_40px_rgba(15,23,42,0.5)]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={`${width}px`}
          className="object-cover"
        />
      </div>
      {caption && <TileCaption {...caption} />}
    </div>
  );
}
