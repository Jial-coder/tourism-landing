export type ChannelKind = 'form' | 'email' | 'whatsapp' | 'phone' | 'wechat' | 'social';

export interface ContactChannel {
  id: string;
  kind: ChannelKind;
  label: { en: string; zh: string };
  href: string;
  visibility: 'always' | 'overseas-priority' | 'cn-priority' | 'hidden';
  status: 'verified' | 'mock' | 'pending' | 'hidden';
  note?: { en: string; zh: string };
}

// Public fallback after product decision: keep the lead form visible and hide
// unverified external channels until ops supplies real numbers/handles.
// Order per spec §4.8:
// form > email > whatsapp > phone > wechat > social.
export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    id: 'lead-form',
    kind: 'form',
    label: { en: 'Custom plan request', zh: '提交定制需求' },
    href: '#lead-form',
    visibility: 'always',
    status: 'verified',
  },
  {
    id: 'mock-email',
    kind: 'email',
    label: { en: 'Email a specialist', zh: '邮件联系顾问' },
    href: 'mailto:hello@example-tourism.demo',
    visibility: 'hidden',
    status: 'hidden',
  },
  {
    id: 'mock-whatsapp',
    kind: 'whatsapp',
    label: { en: 'WhatsApp our desk', zh: 'WhatsApp 联系顾问' },
    href: 'https://wa.me/8613000000000',
    visibility: 'hidden',
    status: 'hidden',
  },
  {
    id: 'mock-phone',
    kind: 'phone',
    label: { en: 'Call Beijing office', zh: '电话联系北京办公室' },
    href: 'tel:+861000000000',
    visibility: 'hidden',
    status: 'hidden',
  },
  {
    id: 'mock-wechat',
    kind: 'wechat',
    label: { en: 'WeChat (CN priority)', zh: '微信（国内优先）' },
    href: 'weixin://contacts/profile/demo',
    visibility: 'hidden',
    status: 'hidden',
  },
];

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
