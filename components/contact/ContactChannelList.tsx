'use client';

import {
  CONTACT_CHANNELS,
  overseasOrder,
  type ContactChannel,
} from '@/lib/data/contact-channels';
import { MockBadge } from '@/components/trust/MockBadge';
import { useLocale } from '@/components/i18n/LocaleProvider';
import { cn } from '@/lib/utils';

type Locale = 'en' | 'zh';
type Variant = 'grid' | 'list';

const ICON: Record<ContactChannel['kind'], string> = {
  form: '✦',
  email: '✉',
  whatsapp: '◐',
  phone: '☏',
  wechat: '◉',
  social: '◇',
};

export function ContactChannelList({
  variant = 'grid',
  locale: localeProp,
  channels = CONTACT_CHANNELS,
  className,
}: {
  variant?: Variant;
  locale?: Locale;
  channels?: ContactChannel[];
  className?: string;
}) {
  const ctx = useLocale();
  const locale: Locale = localeProp ?? ctx.locale;
  const ordered = overseasOrder(channels).filter((c) => c.visibility !== 'hidden');
  const mockLabel = locale === 'zh' ? '占位' : 'mock';

  if (variant === 'list') {
    return (
      <ul className={cn('flex flex-col gap-2 text-sm', className)}>
        {ordered.map((channel) => {
          const label = channel.label[locale] ?? channel.label.en;
          const isMock = channel.status === 'mock';
          return (
            <li key={channel.id} className="flex items-center gap-2">
              <span aria-hidden="true" className="text-jade-soft">
                {ICON[channel.kind]}
              </span>
              <a
                href={channel.href}
                className="underline-offset-4 hover:underline"
                rel="noopener noreferrer"
              >
                {label}
              </a>
              {isMock && <MockBadge>{mockLabel}</MockBadge>}
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <ul
      className={cn(
        'grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5',
        className
      )}
    >
      {ordered.map((channel) => {
        const label = channel.label[locale] ?? channel.label.en;
        const isMock = channel.status === 'mock';
        return (
          <li key={channel.id}>
            <a
              href={channel.href}
              rel="noopener noreferrer"
              className="group flex h-full flex-col gap-2 rounded-2xl border border-ink/10 bg-cream p-4 transition-colors hover:border-jade/40 hover:bg-paper"
            >
              <span
                aria-hidden="true"
                className="text-lg text-jade-soft group-hover:text-jade"
              >
                {ICON[channel.kind]}
              </span>
              <span className="font-serif text-base leading-snug text-ink">{label}</span>
              {isMock && (
                <span className="mt-auto">
                  <MockBadge>{mockLabel}</MockBadge>
                </span>
              )}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default ContactChannelList;
