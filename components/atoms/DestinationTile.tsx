import Image from "next/image";
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
 */
type DestinationTileProps = {
  src: string;
  alt: string;
  width?: number;
  rotate?: string;
  caption?: Omit<TileCaptionProps, "className">;
  className?: string;
};

export function DestinationTile({
  src,
  alt,
  width = 220,
  rotate = "-2deg",
  caption,
  className,
}: DestinationTileProps) {
  return (
    <div
      className={cn("relative", className)}
      style={{ width, transform: `rotate(${rotate})` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded border border-soft-ivory/10 shadow-[0_15px_40px_rgba(15,23,42,0.5)]">
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
