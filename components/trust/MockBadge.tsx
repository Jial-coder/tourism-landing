import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export function MockBadge({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full bg-gold/20 px-2 py-0.5 text-xs font-medium text-ink ring-1 ring-gold/40',
        className
      )}
    >
      <span className="size-1.5 rounded-full bg-gold" aria-hidden="true" />
      {children ?? 'mock'}
    </span>
  );
}
