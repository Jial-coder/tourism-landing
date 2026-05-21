import { z } from 'zod';

export type LeadFieldId =
  | 'name'
  | 'email'
  | 'phone'
  | 'preferredChannel'
  | 'country'
  | 'travelMonth'
  | 'durationDays'
  | 'partySize'
  | 'travelStyle'
  | 'destinations'
  | 'budgetRange'
  | 'notes';

export interface LeadFieldSpec {
  id: LeadFieldId;
  required: boolean;
  type: 'text' | 'email' | 'tel' | 'select' | 'multiselect' | 'textarea' | 'number';
  options?: ReadonlyArray<{ id: string; label: { en: string; zh: string } }>;
  maxLength?: number;
}

export const LEAD_FIELDS: LeadFieldSpec[] = [
  { id: 'name', required: true, type: 'text', maxLength: 80 },
  { id: 'email', required: true, type: 'email', maxLength: 120 },
  { id: 'phone', required: false, type: 'tel', maxLength: 40 },
  { id: 'preferredChannel', required: true, type: 'select' },
  { id: 'country', required: false, type: 'text', maxLength: 80 },
  { id: 'travelMonth', required: true, type: 'text', maxLength: 40 },
  { id: 'durationDays', required: true, type: 'number' },
  { id: 'partySize', required: true, type: 'number' },
  { id: 'travelStyle', required: false, type: 'multiselect' },
  { id: 'destinations', required: false, type: 'multiselect' },
  { id: 'budgetRange', required: false, type: 'select' },
  { id: 'notes', required: false, type: 'textarea', maxLength: 2000 },
];

export type LeadFormState =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'error'; messageKey: string }
  | { kind: 'success'; submissionId: string };

/**
 * @deprecated 由 LeadFormInput 接管，保留供过渡期参考。新代码请使用 LeadFormInput。
 */
export interface LeadPayload {
  locale: 'en' | 'zh';
  source: 'home-hero' | 'home-mid' | 'home-footer' | 'chat-launcher';
  fields: Partial<Record<LeadFieldId, string | string[] | number>>;
  submittedAt: string;
}

export const leadFormSchema = z.object({
  locale: z.enum(['en', 'zh']),
  source: z.enum(['home-hero', 'home-mid', 'home-footer', 'chat-launcher']),
  name: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(120),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  preferredChannel: z.string().min(1),
  country: z.string().trim().max(80).optional().or(z.literal('')),
  travelMonth: z.string().trim().min(1).max(40),
  durationDays: z.coerce.number().int().min(1).max(365),
  partySize: z.coerce.number().int().min(1).max(50),
  travelStyle: z.array(z.string()).default([]),
  destinations: z.array(z.string()).default([]),
  budgetRange: z.string().optional().or(z.literal('')),
  notes: z.string().max(2000).optional().or(z.literal('')),
  company_website: z.string().max(0, { message: 'honeypot_hit' }).optional(),
  turnstileToken: z.string().min(1, { message: 'turnstile_missing' }),
});

export type LeadFormInput = z.infer<typeof leadFormSchema>;
