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
  { id: 'budgetRange', required: false, type: 'select' },
  { id: 'notes', required: false, type: 'textarea', maxLength: 2000 },
];

export type LeadFormState =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'error'; messageKey: string }
  | { kind: 'success'; submissionId: string };

/**
 * @deprecated Replaced by LeadFormInput. Retained for transitional reads.
 */
export interface LeadPayload {
  locale: 'en' | 'zh';
  source: 'home-hero' | 'home-mid' | 'home-footer' | 'chat-launcher';
  fields: Partial<Record<LeadFieldId, string | string[] | number>>;
  submittedAt: string;
}

export const leadFormSchema = z.object({
  locale: z.enum(['en', 'zh']),
  source: z.enum(['home-hero', 'home-mid', 'home-footer', 'chat-launcher', 'plan-wizard']),
  name: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(120),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  preferredChannel: z.string().min(1),
  country: z.string().trim().max(80).optional().or(z.literal('')),
  travelMonth: z.string().trim().min(1).max(40),
  durationDays: z.coerce.number().int().min(1).max(365),
  partySize: z.coerce.number().int().min(1).max(50),
  budgetRange: z.string().optional().or(z.literal('')),
  notes: z.string().max(2000).optional().or(z.literal('')),
  company_website: z.string().max(0, { message: 'honeypot_hit' }).optional(),
  turnstileToken: z.string().min(1, { message: 'turnstile_missing' }),
});

export type LeadFormInput = z.input<typeof leadFormSchema>;
export type LeadFormOutput = z.output<typeof leadFormSchema>;

/* ============================================================
 * Plan wizard (5-step) — spec §5.12 / §5.12.1
 * Stored locally as draft; on final submit, mapped onto the API
 * contract (leadFormSchema) inside the wizard component.
 * ============================================================ */

export const PLAN_DRAFT_STORAGE_KEY = 'pandatravel:plan-draft';
export const PLAN_DRAFT_VERSION = 1;

export const TRIP_WINDOW = ['precise', 'approximate', 'considering'] as const;
export type TripWindow = (typeof TRIP_WINDOW)[number];

export const TRIP_LENGTH_OPTIONS = [
  '5-7-days',
  '8-10-days',
  '11-14-days',
  '15-plus-days',
  'unsure',
] as const;
export type TripLengthOption = (typeof TRIP_LENGTH_OPTIONS)[number];

export const GROUP_TYPE = [
  'solo',
  'couple',
  'family',
  'friends',
  'business-plus',
] as const;
export type GroupType = (typeof GROUP_TYPE)[number];

export const CHILD_AGE_TIERS = ['0-3', '4-8', '9-12', '13-17'] as const;
export type ChildAgeTier = (typeof CHILD_AGE_TIERS)[number];

export const INTEREST_CHIPS = [
  'nature',
  'history',
  'food',
  'slow',
  'modern-city',
  'outdoor',
  'honeymoon',
  'visa-free',
] as const;
export type InterestChip = (typeof INTEREST_CHIPS)[number];

export const BUDGET_TIER = [
  'usd-1500-3000',
  'usd-3000-6000',
  'usd-6000-10000',
  'usd-10000-plus',
  'unsure',
] as const;
export type BudgetTier = (typeof BUDGET_TIER)[number];

export const HOTEL_CLASS = [
  '3-star',
  '4-star',
  '5-star',
  'luxury',
  'no-pref',
  'recommend',
] as const;
export type HotelClass = (typeof HOTEL_CLASS)[number];

export const planWizardSchema = z.object({
  // step 1
  tripWindow: z.enum(TRIP_WINDOW, { message: 'required' }),
  tripMonth: z.string().trim().max(40).optional().or(z.literal('')),
  tripLength: z.enum(TRIP_LENGTH_OPTIONS, { message: 'required' }),
  // step 2
  groupType: z.enum(GROUP_TYPE, { message: 'required' }),
  adultsCount: z.coerce.number().int().min(1).max(50),
  childrenAgeTiers: z.array(z.enum(CHILD_AGE_TIERS)).max(8).default([]),
  // step 3
  interests: z.array(z.enum(INTEREST_CHIPS)).max(INTEREST_CHIPS.length).default([]),
  notesUserText: z.string().trim().max(800).optional().or(z.literal('')),
  // step 4
  budgetTier: z.enum(BUDGET_TIER, { message: 'required' }),
  hotelClass: z.enum(HOTEL_CLASS, { message: 'required' }),
  // step 5
  name: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(120),
  countryCode: z.string().trim().min(1).max(8),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  whatsappOk: z.boolean().default(false),
  wechatOk: z.boolean().default(false),
  termsAccepted: z.literal(true, { message: 'required' }),
  // anti-bot
  company_website: z.string().max(0, { message: 'honeypot_hit' }).optional(),
  turnstileToken: z.string().optional().default(''),
});

export type PlanWizardInput = z.input<typeof planWizardSchema>;
export type PlanWizardOutput = z.output<typeof planWizardSchema>;

export const PLAN_WIZARD_DEFAULTS: PlanWizardInput = {
  tripWindow: undefined as unknown as TripWindow,
  tripMonth: '',
  tripLength: undefined as unknown as TripLengthOption,
  groupType: undefined as unknown as GroupType,
  adultsCount: 2,
  childrenAgeTiers: [],
  interests: [],
  notesUserText: '',
  budgetTier: undefined as unknown as BudgetTier,
  hotelClass: undefined as unknown as HotelClass,
  name: '',
  email: '',
  countryCode: 'US',
  phone: '',
  whatsappOk: false,
  wechatOk: false,
  termsAccepted: undefined as unknown as true,
  company_website: '',
  turnstileToken: '',
};
