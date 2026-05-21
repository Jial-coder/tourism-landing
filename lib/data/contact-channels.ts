export type ChannelKind = 'form' | 'email' | 'whatsapp' | 'phone' | 'wechat' | 'social';

export interface ContactChannel {
  id: string;
  kind: ChannelKind;
  label: { en: string; zh: string };
  href: string;
  visibility: 'always' | 'overseas-priority' | 'cn-priority' | 'hidden';
  status: 'verified' | 'mock' | 'pending';
  note?: { en: string; zh: string };
}

// Entries to be filled in Task 3.1 by migrating from
// components/floating/ChatLauncher.tsx, components/sections/Footer.tsx,
// and components/sections/DualCTA.tsx. Order per spec §4.8:
// form > email > whatsapp > phone > wechat > social.
export const CONTACT_CHANNELS: ContactChannel[] = [];

const priority = (c: ContactChannel): number => {
  if (c.visibility === 'hidden') return 99;
  const order: Record<ChannelKind, number> = {
    form: 0,
    email: 1,
    whatsapp: 2,
    phone: 3,
    wechat: 4,
    social: 5,
  };
  return order[c.kind];
};

export const overseasOrder = (channels: ContactChannel[]): ContactChannel[] =>
  [...channels].sort((a, b) => priority(a) - priority(b));
