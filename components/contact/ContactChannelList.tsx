'use client';

import {
  ClipboardList,
  Mail,
  MessageCircle,
  MessageSquare,
  Phone,
  Share2,
  type LucideIcon,
} from 'lucide-react';
import {
  CONTACT_CHANNELS,
  overseasOrder,
  type ContactChannel,
} from '@/lib/data/contact-channels';
import { useLocale } from '@/components/i18n/LocaleProvider';
import { cn } from '@/lib/utils';

type Locale = 'en' | 'zh';
type Variant = 'grid' | 'list';

const ICON: Record<ContactChannel['kind'], LucideIcon> = {
  form: ClipboardList,
  email: Mail,
  whatsapp: MessageCircle,
  phone: Phone,
  wechat: MessageSquare,
  social: Share2,
};

export function ContactChannelList({
  variant = 'grid',
  locale: localeProp,
  channels = CONTACT_CHANNELS,
  className,
  onNavigate,
}: {
  variant?: Variant;
  locale?: Locale;
  channels?: ContactChannel[];
  className?: string;
  onNavigate?: () => void;
}) {
  const ctx = useLocale();
  const locale: Locale = localeProp ?? ctx.locale;
  const ordered = overseasOrder(channels).filter(
    (c) => c.visibility !== 'hidden' && c.status !== 'hidden',
  );

  if (variant === 'list') {
    return (
      <ul className={cn('flex flex-col gap-2 text-sm', className)}>
        {ordered.map((channel) => {
          const label = channel.label[locale] ?? channel.label.en;
          const Icon = ICON[channel.kind];
          return (
            <li key={channel.id} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-jade/10 text-jade"
              >
                <Icon size={15} strokeWidth={1.9} />
              </span>
              <a
                href={channel.href}
                className="underline-offset-4 hover:underline"
                rel="noopener noreferrer"
                onClick={onNavigate}
              >
                {label}
              </a>
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
        const Icon = ICON[channel.kind];
        return (
          <li key={channel.id}>
            <a
              href={channel.href}
              rel="noopener noreferrer"
              onClick={onNavigate}
              className="group flex h-full flex-col gap-2 rounded-2xl border border-ink/10 bg-cream p-4 transition-colors hover:border-jade/40 hover:bg-paper"
            >
              <span
                aria-hidden="true"
                className="inline-flex size-9 items-center justify-center rounded-full bg-jade/10 text-jade transition-colors group-hover:bg-jade group-hover:text-soft-ivory"
              >
                <Icon size={18} strokeWidth={1.9} />
              </span>
              <span className="font-serif text-base leading-snug text-ink">{label}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default ContactChannelList;
