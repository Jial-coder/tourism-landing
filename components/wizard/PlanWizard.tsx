'use client';

import { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { toast } from 'sonner';

import { useLocale } from '@/components/i18n/LocaleProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { HoneypotField } from '@/components/forms/HoneypotField';
import { TurnstileWidget } from '@/components/forms/TurnstileWidget';
import { LeadFormSuccess } from '@/components/sections/LeadFormSuccess';
import { CONTACT_CHANNELS } from '@/lib/data/contact-channels';
import {
  PLAN_DRAFT_STORAGE_KEY,
  PLAN_DRAFT_VERSION,
  PLAN_WIZARD_DEFAULTS,
  leadFormSchema,
  planWizardSchema,
  type ChildAgeTier,
  type GroupType,
  type HotelClass,
  type InterestChip,
  type PlanWizardInput,
  type TripLengthOption,
  type TripWindow,
  type BudgetTier,
} from '@/lib/data/lead-form';
import {
  buildWhatsAppDeepLink,
  groupTextFrom,
  interestsTextFrom,
  whenTextFrom,
} from '@/lib/wizard-payload';
import type { PlanContextItem, PlanInitialContext } from '@/lib/plan-context';
import { cn } from '@/lib/utils';

type PlanWizardDict = ReturnType<typeof useLocale>['t']['home']['planWizard'];
type Locale = ReturnType<typeof useLocale>['locale'];

type WizardStep = 0 | 1 | 2 | 3 | 4;
type FieldErrors = Record<string, string>;
type ApiResponse = { ok: true; id: string } | { ok: false; error?: string };

type WizardState = PlanWizardInput & {
  currentStep: WizardStep;
};

type WizardAction =
  | { type: 'set'; field: keyof PlanWizardInput; value: PlanWizardInput[keyof PlanWizardInput] }
  | { type: 'setStep'; step: WizardStep }
  | { type: 'toggleInterest'; value: InterestChip }
  | { type: 'toggleChildTier'; value: ChildAgeTier }
  | { type: 'hydrate'; state: Partial<WizardState> }
  | {
      type: 'reset';
      initialVisaFree: boolean;
      initialContext: PlanInitialContext | null;
      locale: Locale;
    };

const TOTAL_STEPS = 5;
const turnstileFallbackToken = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  ? ''
  : 'dev-turnstile-bypass';
const requiresTurnstileToken = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

const uniqueStrings = <T extends string>(items: readonly T[]): T[] => Array.from(new Set(items));

const textForLocale = (text: { en: string; zh: string }, locale: Locale): string =>
  locale === 'zh' ? text.zh : text.en;

function buildContextNote(items: readonly PlanContextItem[], locale: Locale): string {
  if (items.length === 0) return '';
  const heading = locale === 'zh' ? '来自上一页的线索：' : 'Context from previous page:';
  const lines = items.map(
    (item) => `- ${textForLocale(item.label, locale)}: ${textForLocale(item.value, locale)}`,
  );
  return [heading, ...lines].join('\n');
}

function mergeContextNote(contextNote: string, existing: string | undefined): string {
  const trimmedExisting = existing?.trim() ?? '';
  if (!contextNote) return trimmedExisting;
  if (!trimmedExisting) return contextNote;
  if (
    trimmedExisting.includes('Context from previous page:') ||
    trimmedExisting.includes('来自上一页的线索：')
  ) {
    return trimmedExisting;
  }
  return `${contextNote}\n\n${trimmedExisting}`;
}

const makeInitialState = (
  initialVisaFree: boolean,
  initialContext: PlanInitialContext | null,
  locale: Locale,
): WizardState => {
  const contextChips = initialContext?.interestChips ?? [];
  const interests = uniqueStrings([
    ...contextChips,
    ...(initialVisaFree ? (['visa-free'] as const) : []),
  ]);
  return {
    ...PLAN_WIZARD_DEFAULTS,
    interests,
    notesUserText: buildContextNote(initialContext?.items ?? [], locale),
    currentStep: initialContext?.startStep ?? 0,
  };
};

function reducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case 'set':
      return { ...state, [action.field]: action.value };
    case 'setStep':
      return { ...state, currentStep: action.step };
    case 'toggleInterest': {
      const current = state.interests ?? [];
      return {
        ...state,
        interests: current.includes(action.value)
          ? current.filter((v) => v !== action.value)
          : [...current, action.value],
      };
    }
    case 'toggleChildTier': {
      const current = state.childrenAgeTiers ?? [];
      return {
        ...state,
        childrenAgeTiers: current.includes(action.value)
          ? current.filter((v) => v !== action.value)
          : [...current, action.value],
      };
    }
    case 'hydrate':
      return { ...state, ...action.state };
    case 'reset':
      return makeInitialState(action.initialVisaFree, action.initialContext, action.locale);
    default:
      return state;
  }
}

const selectClass =
  'h-11 w-full border-ink/15 bg-soft-ivory text-ink focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-cream';
const inputClass =
  'h-11 border-ink/15 bg-soft-ivory text-ink focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-cream';
const textareaClass =
  'min-h-28 border-ink/15 bg-soft-ivory text-ink focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-cream';
const chipClass =
  'min-h-11 rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-cream';

const countryCodes = [
  { id: 'US', label: 'United States +1' },
  { id: 'AU', label: 'Australia +61' },
  { id: 'GB', label: 'United Kingdom +44' },
  { id: 'CA', label: 'Canada +1' },
  { id: 'SG', label: 'Singapore +65' },
  { id: 'DE', label: 'Germany +49' },
  { id: 'FR', label: 'France +33' },
  { id: 'ES', label: 'Spain +34' },
  { id: 'CN', label: 'China +86' },
  { id: 'OTHER', label: 'Other / tell us later' },
] as const;

const tripLengthDays: Record<TripLengthOption, number> = {
  '5-7-days': 7,
  '8-10-days': 10,
  '11-14-days': 12,
  '15-plus-days': 15,
  unsure: 10,
};

const labelFrom = <T extends string>(
  items: readonly { id: string; label: string }[],
  id: T | string | undefined,
): string => items.find((item) => item.id === id)?.label ?? '';

const errorFor = (errors: FieldErrors, name: string) =>
  errors[name] ? <p className="mt-2 text-sm text-destructive">{errors[name]}</p> : null;

function requiredLabel(label: string, requiredAria: string) {
  return (
    <>
      {label}
      <span aria-hidden="true" className="ml-1 text-vermilion">
        *
      </span>
      <span className="sr-only"> ({requiredAria})</span>
    </>
  );
}

function DetailsHint({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <details className="rounded-2xl border border-vermilion/15 bg-vermilion-soft/35 px-4 py-3 text-sm text-ink-soft">
      <summary className="cursor-pointer font-medium text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-cream">
        {label}
      </summary>
      <p className="mt-2 leading-relaxed">{children}</p>
    </details>
  );
}

function Fieldset({
  legend,
  children,
}: {
  legend: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium text-ink">{legend}</legend>
      {children}
    </fieldset>
  );
}

function RadioCards<T extends string>({
  name,
  value,
  options,
  onChange,
}: {
  name: string;
  value: T | undefined;
  options: readonly { id: string; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((option) => {
        const checked = value === option.id;
        return (
          <label
            key={option.id}
            className={cn(
              'flex min-h-11 cursor-pointer items-center rounded-2xl border px-4 py-3 text-sm transition-colors',
              'focus-within:ring-2 focus-within:ring-jade focus-within:ring-offset-2 focus-within:ring-offset-cream',
              checked
                ? 'border-vermilion bg-vermilion-soft text-ink'
                : 'border-ink/15 bg-soft-ivory text-ink-soft hover:border-jade/50',
            )}
          >
            <input
              className="sr-only"
              type="radio"
              name={name}
              checked={checked}
              onChange={() => onChange(option.id as T)}
            />
            <span>{option.label}</span>
          </label>
        );
      })}
    </div>
  );
}

function ChipGrid<T extends string>({
  selected,
  options,
  onToggle,
}: {
  selected: readonly T[];
  options: readonly { id: string; label: string }[];
  onToggle: (value: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((option) => {
        const active = selected.includes(option.id as T);
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onToggle(option.id as T)}
            className={cn(
              chipClass,
              active
                ? 'border-vermilion bg-vermilion text-soft-ivory'
                : 'border-ink/15 bg-soft-ivory text-ink-soft hover:border-jade/50 hover:text-ink',
            )}
            aria-pressed={active}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function StepHeading({ step, title, body }: { step: number; title: string; body: string }) {
  return (
    <div className="space-y-3">
      <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-vermilion">
        Step {step} / {TOTAL_STEPS}
      </p>
      <h2 className="font-serif text-3xl leading-tight text-ink md:text-4xl">{title}</h2>
      <p className="text-base leading-relaxed text-ink-soft">{body}</p>
    </div>
  );
}

function WizardSummary({
  dict,
  state,
  locale,
}: {
  dict: PlanWizardDict;
  state: WizardState;
  locale: Locale;
}) {
  const lengthLabel = labelFrom(dict.step1.lengthOptions, state.tripLength as string);
  const groupLabel = labelFrom(dict.step2.groupOptions, state.groupType as string);
  const interestLabels = (state.interests ?? [])
    .map((id) => labelFrom(dict.step3.chips, id))
    .filter(Boolean);
  const budgetLabel = labelFrom(dict.step4.budgetOptions, state.budgetTier as string);
  const hotelLabel = labelFrom(dict.step4.hotelOptions, state.hotelClass as string);
  const when =
    state.tripWindow === 'approximate'
      ? [state.tripMonth, lengthLabel].filter(Boolean).join(' / ')
      : [labelFrom(dict.step1.windowOptions, state.tripWindow as string), lengthLabel]
          .filter(Boolean)
          .join(' / ');

  const rows = [
    { k: dict.summary.when, v: when },
    {
      k: dict.summary.group,
      v: groupLabel
        ? `${groupLabel}${Number(state.adultsCount) ? ` ×${state.adultsCount}` : ''}`
        : '',
    },
    { k: dict.summary.interests, v: interestLabels.join(', ') },
    { k: dict.summary.budget, v: budgetLabel },
    { k: dict.summary.hotel, v: hotelLabel },
  ].filter((row) => row.v);

  return (
    <div className="rounded-3xl border border-ink/10 bg-cream p-5 shadow-sm md:sticky md:top-28">
      <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-jade">
        {dict.filledHeading}
      </p>
      {rows.length === 0 ? (
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          {locale === 'zh' ? '从第一步开始，已填内容会显示在这里。' : 'Start with step one; your answers will appear here.'}
        </p>
      ) : (
        <dl className="mt-4 space-y-3">
          {rows.map((row) => (
            <div key={row.k} className="border-b border-ink/10 pb-3 last:border-b-0 last:pb-0">
              <dt className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-soft/70">
                {row.k}
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-ink">{row.v}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

function Step1({
  dict,
  state,
  dispatch,
  errors,
}: {
  dict: PlanWizardDict;
  state: WizardState;
  dispatch: React.Dispatch<WizardAction>;
  errors: FieldErrors;
}) {
  return (
    <div className="space-y-7">
      <StepHeading step={1} title={dict.step1.heading} body={dict.step1.body} />
      <Fieldset legend={requiredLabel(dict.step1.windowLabel, dict.requiredAria)}>
        <RadioCards<TripWindow>
          name="tripWindow"
          value={state.tripWindow as TripWindow | undefined}
          options={dict.step1.windowOptions}
          onChange={(value) => dispatch({ type: 'set', field: 'tripWindow', value })}
        />
        {errorFor(errors, 'tripWindow')}
      </Fieldset>
      {state.tripWindow === 'approximate' && (
        <label className="block space-y-2 text-sm font-medium text-ink">
          {requiredLabel(dict.step1.monthLabel, dict.requiredAria)}
          <Input
            className={inputClass}
            value={state.tripMonth ?? ''}
            placeholder={dict.step1.monthPlaceholder}
            onChange={(event) =>
              dispatch({ type: 'set', field: 'tripMonth', value: event.target.value })
            }
          />
          {errorFor(errors, 'tripMonth')}
        </label>
      )}
      <Fieldset legend={requiredLabel(dict.step1.lengthLabel, dict.requiredAria)}>
        <Select
          value={(state.tripLength as string | undefined) ?? ''}
          onValueChange={(value) =>
            dispatch({ type: 'set', field: 'tripLength', value: value as TripLengthOption })
          }
        >
          <SelectTrigger className={selectClass} aria-label={dict.step1.lengthLabel}>
            <SelectValue placeholder={dict.step1.lengthLabel} />
          </SelectTrigger>
          <SelectContent>
            {dict.step1.lengthOptions.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errorFor(errors, 'tripLength')}
      </Fieldset>
      <DetailsHint label={dict.whyAsk}>{dict.step1.whyAsk}</DetailsHint>
    </div>
  );
}

function Step2({
  dict,
  state,
  dispatch,
  errors,
}: {
  dict: PlanWizardDict;
  state: WizardState;
  dispatch: React.Dispatch<WizardAction>;
  errors: FieldErrors;
}) {
  return (
    <div className="space-y-7">
      <StepHeading step={2} title={dict.step2.heading} body={dict.step2.body} />
      <Fieldset legend={requiredLabel(dict.step2.groupLabel, dict.requiredAria)}>
        <RadioCards<GroupType>
          name="groupType"
          value={state.groupType as GroupType | undefined}
          options={dict.step2.groupOptions}
          onChange={(value) => dispatch({ type: 'set', field: 'groupType', value })}
        />
        {errorFor(errors, 'groupType')}
      </Fieldset>
      <label className="block space-y-2 text-sm font-medium text-ink">
        {dict.step2.adultsLabel}
        <Select
          value={String(state.adultsCount ?? 2)}
          onValueChange={(value) => dispatch({ type: 'set', field: 'adultsCount', value: Number(value) })}
        >
          <SelectTrigger className={selectClass} aria-label={dict.step2.adultsLabel}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 10 }, (_, idx) => idx + 1).map((count) => (
              <SelectItem key={count} value={String(count)}>
                {count}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errorFor(errors, 'adultsCount')}
      </label>
      {state.groupType === 'family' && (
        <Fieldset legend={dict.step2.childrenLabel}>
          <ChipGrid<ChildAgeTier>
            selected={(state.childrenAgeTiers ?? []) as ChildAgeTier[]}
            options={dict.step2.childTiers}
            onToggle={(value) => dispatch({ type: 'toggleChildTier', value })}
          />
          {errorFor(errors, 'childrenAgeTiers')}
        </Fieldset>
      )}
      <DetailsHint label={dict.whyAsk}>{dict.step2.whyAsk}</DetailsHint>
    </div>
  );
}

function Step3({
  dict,
  state,
  dispatch,
  errors,
  initialVisaFree,
}: {
  dict: PlanWizardDict;
  state: WizardState;
  dispatch: React.Dispatch<WizardAction>;
  errors: FieldErrors;
  initialVisaFree: boolean;
}) {
  return (
    <div className="space-y-7">
      <StepHeading step={3} title={dict.step3.heading} body={dict.step3.body} />
      {initialVisaFree && (
        <p className="rounded-2xl border border-jade/20 bg-jade/10 px-4 py-3 text-sm text-ink">
          {dict.step3.skippedHint}
        </p>
      )}
      <ChipGrid<InterestChip>
        selected={(state.interests ?? []) as InterestChip[]}
        options={dict.step3.chips}
        onToggle={(value) => dispatch({ type: 'toggleInterest', value })}
      />
      {errorFor(errors, 'interests')}
      <label className="block space-y-2 text-sm font-medium text-ink">
        {dict.step3.notesLabel}
        <Textarea
          className={textareaClass}
          value={state.notesUserText ?? ''}
          placeholder={dict.step3.notesPlaceholder}
          onChange={(event) =>
            dispatch({ type: 'set', field: 'notesUserText', value: event.target.value })
          }
        />
      </label>
      <DetailsHint label={dict.whyAsk}>{dict.step3.whyAsk}</DetailsHint>
    </div>
  );
}

function Step4({
  dict,
  state,
  dispatch,
  errors,
  whatsappHref,
  whatsappPayload,
}: {
  dict: PlanWizardDict;
  state: WizardState;
  dispatch: React.Dispatch<WizardAction>;
  errors: FieldErrors;
  whatsappHref: string | null;
  whatsappPayload: string | null;
}) {
  return (
    <div className="space-y-7">
      <StepHeading step={4} title={dict.step4.heading} body={dict.step4.body} />
      <div className="grid gap-5 md:grid-cols-2">
        <Fieldset legend={requiredLabel(dict.step4.budgetLabel, dict.requiredAria)}>
          <Select
            value={(state.budgetTier as string | undefined) ?? ''}
            onValueChange={(value) =>
              dispatch({ type: 'set', field: 'budgetTier', value: value as BudgetTier })
            }
          >
            <SelectTrigger className={selectClass} aria-label={dict.step4.budgetLabel}>
              <SelectValue placeholder={dict.step4.budgetLabel} />
            </SelectTrigger>
            <SelectContent>
              {dict.step4.budgetOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errorFor(errors, 'budgetTier')}
        </Fieldset>
        <Fieldset legend={requiredLabel(dict.step4.hotelLabel, dict.requiredAria)}>
          <Select
            value={(state.hotelClass as string | undefined) ?? ''}
            onValueChange={(value) =>
              dispatch({ type: 'set', field: 'hotelClass', value: value as HotelClass })
            }
          >
            <SelectTrigger className={selectClass} aria-label={dict.step4.hotelLabel}>
              <SelectValue placeholder={dict.step4.hotelLabel} />
            </SelectTrigger>
            <SelectContent>
              {dict.step4.hotelOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errorFor(errors, 'hotelClass')}
        </Fieldset>
      </div>
      <DetailsHint label={dict.whyAsk}>{dict.step4.whyAsk}</DetailsHint>
      {whatsappHref && whatsappPayload ? (
      <div className="rounded-3xl border border-jade/30 bg-soft-ivory p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h3 className="font-serif text-2xl text-ink">{dict.jumpWhatsAppHeading}</h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">
              {dict.jumpWhatsAppBody}
            </p>
            <p className="mt-3 break-all rounded-2xl bg-cream px-3 py-2 text-xs text-ink-soft">
              {whatsappPayload}
            </p>
          </div>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-jade px-5 py-3 text-sm font-medium text-jade transition-colors hover:bg-jade hover:text-soft-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
          >
            {dict.jumpWhatsAppCta}
          </a>
        </div>
      </div>
      ) : null}
    </div>
  );
}

function Step5({
  dict,
  state,
  dispatch,
  errors,
}: {
  dict: PlanWizardDict;
  state: WizardState;
  dispatch: React.Dispatch<WizardAction>;
  errors: FieldErrors;
}) {
  return (
    <div className="space-y-7">
      <StepHeading step={5} title={dict.step5.heading} body={dict.step5.body} />
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block space-y-2 text-sm font-medium text-ink">
          {requiredLabel(dict.step5.nameLabel, dict.requiredAria)}
          <Input
            className={inputClass}
            autoComplete="name"
            value={state.name ?? ''}
            placeholder={dict.step5.namePlaceholder}
            onChange={(event) => dispatch({ type: 'set', field: 'name', value: event.target.value })}
          />
          {errorFor(errors, 'name')}
        </label>
        <label className="block space-y-2 text-sm font-medium text-ink">
          {requiredLabel(dict.step5.emailLabel, dict.requiredAria)}
          <Input
            className={inputClass}
            type="email"
            autoComplete="email"
            value={state.email ?? ''}
            placeholder={dict.step5.emailPlaceholder}
            onChange={(event) => dispatch({ type: 'set', field: 'email', value: event.target.value })}
          />
          {errorFor(errors, 'email')}
        </label>
      </div>
      <div className="grid gap-5 md:grid-cols-[0.9fr_1.1fr]">
        <Fieldset legend={dict.step5.countryCodeLabel}>
          <Select
            value={state.countryCode ?? 'US'}
            onValueChange={(value) => dispatch({ type: 'set', field: 'countryCode', value })}
          >
            <SelectTrigger className={selectClass} aria-label={dict.step5.countryCodeLabel}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {countryCodes.map((country) => (
                <SelectItem key={country.id} value={country.id}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errorFor(errors, 'countryCode')}
        </Fieldset>
        <label className="block space-y-2 text-sm font-medium text-ink">
          {dict.step5.phoneLabel}
          <Input
            className={inputClass}
            type="tel"
            autoComplete="tel"
            value={state.phone ?? ''}
            placeholder={dict.step5.phonePlaceholder}
            onChange={(event) => dispatch({ type: 'set', field: 'phone', value: event.target.value })}
          />
          {errorFor(errors, 'phone')}
        </label>
      </div>
      <div className="space-y-3 rounded-2xl border border-ink/10 bg-soft-ivory p-4">
        <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm text-ink">
          <input
            type="checkbox"
            className="size-5 accent-vermilion"
            checked={Boolean(state.whatsappOk)}
            onChange={(event) =>
              dispatch({ type: 'set', field: 'whatsappOk', value: event.target.checked })
            }
          />
          {dict.step5.whatsappLabel}
        </label>
        <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm text-ink">
          <input
            type="checkbox"
            className="size-5 accent-vermilion"
            checked={Boolean(state.wechatOk)}
            onChange={(event) =>
              dispatch({ type: 'set', field: 'wechatOk', value: event.target.checked })
            }
          />
          {dict.step5.wechatLabel}
        </label>
      </div>
      <label className="flex min-h-11 cursor-pointer items-start gap-3 rounded-2xl border border-ink/10 bg-soft-ivory p-4 text-sm leading-relaxed text-ink">
        <input
          type="checkbox"
          className="mt-0.5 size-5 accent-vermilion"
          checked={Boolean(state.termsAccepted)}
          onChange={(event) =>
            dispatch({ type: 'set', field: 'termsAccepted', value: event.target.checked as true })
          }
        />
        <span>{dict.step5.termsLabel}</span>
      </label>
      {errorFor(errors, 'termsAccepted')}
      <HoneypotField
        value={state.company_website ?? ''}
        onChange={(event) =>
          dispatch({ type: 'set', field: 'company_website', value: event.target.value })
        }
      />
      <TurnstileWidget
        onToken={(token) => dispatch({ type: 'set', field: 'turnstileToken', value: token })}
        onExpire={() =>
          dispatch({ type: 'set', field: 'turnstileToken', value: turnstileFallbackToken })
        }
      />
      {errorFor(errors, 'turnstileToken')}
      <DetailsHint label={dict.whyAsk}>{dict.step5.whyAsk}</DetailsHint>
    </div>
  );
}

function validateStep(
  step: WizardStep,
  state: WizardState,
  dict: PlanWizardDict,
): FieldErrors {
  const e: FieldErrors = {};
  if (step === 0) {
    if (!state.tripWindow) e.tripWindow = dict.errors.required;
    if (state.tripWindow === 'approximate' && !state.tripMonth?.trim()) {
      e.tripMonth = dict.errors.required;
    }
    if (!state.tripLength) e.tripLength = dict.errors.required;
  }
  if (step === 1) {
    if (!state.groupType) e.groupType = dict.errors.required;
    if (!Number(state.adultsCount) || Number(state.adultsCount) < 1) {
      e.adultsCount = dict.errors.invalidNumber;
    }
    if (state.groupType === 'family' && (state.childrenAgeTiers ?? []).length === 0) {
      e.childrenAgeTiers = dict.errors.required;
    }
  }
  if (step === 2) {
    if ((state.interests ?? []).length === 0 && !state.notesUserText?.trim()) {
      e.interests = dict.errors.required;
    }
  }
  if (step === 3) {
    if (!state.budgetTier) e.budgetTier = dict.errors.required;
    if (!state.hotelClass) e.hotelClass = dict.errors.required;
  }
  if (step === 4) {
    const parsed = planWizardSchema.safeParse(state);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const field = String(issue.path[0] ?? 'form');
        if (field === 'email') e.email = dict.errors.invalidEmail;
        else if (field === 'termsAccepted') e.termsAccepted = dict.errors.termsRequired;
        else if (!e[field]) e[field] = dict.errors.required;
      }
    }
    if (requiresTurnstileToken && !String(state.turnstileToken ?? '').trim()) {
      e.turnstileToken = dict.errors.turnstileMissing;
    }
  }
  return e;
}

function isWizardStep(value: number): value is WizardStep {
  return Number.isInteger(value) && value >= 0 && value < TOTAL_STEPS;
}

function readDraft(): Partial<WizardState> | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(PLAN_DRAFT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { version?: number; state?: Partial<WizardState> };
    if (parsed.version !== PLAN_DRAFT_VERSION || !parsed.state) return null;
    return parsed.state;
  } catch {
    return null;
  }
}

function writeDraft(state: WizardState) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(
    PLAN_DRAFT_STORAGE_KEY,
    JSON.stringify({ version: PLAN_DRAFT_VERSION, state }),
  );
}

function clearDraft() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(PLAN_DRAFT_STORAGE_KEY);
}

export function PlanWizard({
  initialVisaFree = false,
  initialContext = null,
}: {
  initialVisaFree?: boolean;
  initialContext?: PlanInitialContext | null;
}) {
  const { locale, t } = useLocale();
  const dict = t.home.planWizard;
  const [state, dispatch] = useReducer(
    reducer,
    makeInitialState(initialVisaFree, initialContext, locale),
  );
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [restored, setRestored] = useState(false);
  const didHydrate = useRef(false);

  useEffect(() => {
    const draft = readDraft();
    const contextState = makeInitialState(initialVisaFree, initialContext, locale);
    if (draft) {
      const draftStep = isWizardStep(Number(draft.currentStep))
        ? (Number(draft.currentStep) as WizardStep)
        : undefined;
      const nextStep = draftStep ?? contextState.currentStep;
      dispatch({
        type: 'hydrate',
        state: {
          ...draft,
          interests: uniqueStrings([
            ...((draft.interests ?? []) as InterestChip[]),
            ...((contextState.interests ?? []) as InterestChip[]),
          ]),
          notesUserText: mergeContextNote(
            String(contextState.notesUserText ?? ''),
            String(draft.notesUserText ?? ''),
          ),
          currentStep: nextStep,
        },
      });
      setRestored(true);
    }
    if (!draft && (initialVisaFree || initialContext)) {
      dispatch({ type: 'hydrate', state: contextState });
    }
    didHydrate.current = true;
  }, [initialVisaFree, initialContext, locale]);

  useEffect(() => {
    if (!didHydrate.current) return;
    writeDraft(state);
  }, [state]);

  const advisorPhone = useMemo(() => {
    const href =
      CONTACT_CHANNELS.find(
        (c) => c.kind === 'whatsapp' && c.status === 'verified' && c.visibility !== 'hidden',
      )?.href ?? '';
    return href.replace(/\D/g, '');
  }, []);

  const payloadParts = useMemo(() => {
    const lengthLabel = labelFrom(dict.step1.lengthOptions, state.tripLength as string);
    const groupLabel = labelFrom(dict.step2.groupOptions, state.groupType as string).toLowerCase();
    const childLabels = (state.childrenAgeTiers ?? [])
      .map((tier) => labelFrom(dict.step2.childTiers, tier))
      .filter(Boolean);
    const chipLabels = (state.interests ?? [])
      .map((chip) => labelFrom(dict.step3.chips, chip))
      .filter(Boolean);
    return {
      whenText: whenTextFrom({
        tripWindow: (state.tripWindow ?? '') as TripWindow | '',
        tripMonth: state.tripMonth ?? '',
        tripLength: lengthLabel,
      }),
      groupText: groupTextFrom({
        groupType: groupLabel,
        adultsCount: Number(state.adultsCount) || 1,
        childrenAgeTiers: childLabels,
      }),
      interestsText: interestsTextFrom({ chips: chipLabels, notes: state.notesUserText ?? '' }),
    };
  }, [dict, state]);

  const whatsapp = useMemo(
    () => (advisorPhone ? buildWhatsAppDeepLink(advisorPhone, payloadParts) : null),
    [advisorPhone, payloadParts],
  );

  const goNext = () => {
    const e = validateStep(state.currentStep, state, dict);
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    if (state.currentStep === 4) {
      void submitWizard();
      return;
    }
    dispatch({ type: 'setStep', step: (state.currentStep + 1) as WizardStep });
  };

  const goBack = () => {
    setErrors({});
    dispatch({ type: 'setStep', step: Math.max(0, state.currentStep - 1) as WizardStep });
  };

  const reset = () => {
    clearDraft();
    dispatch({ type: 'reset', initialVisaFree, initialContext, locale });
    setErrors({});
    setRestored(false);
  };

  const submitWizard = async () => {
    const e = validateStep(4, state, dict);
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    const lengthLabel = labelFrom(dict.step1.lengthOptions, state.tripLength as string);
    const windowLabel = labelFrom(dict.step1.windowOptions, state.tripWindow as string);
    const groupLabel = labelFrom(dict.step2.groupOptions, state.groupType as string);
    const interestLabels = (state.interests ?? [])
      .map((chip) => labelFrom(dict.step3.chips, chip))
      .filter(Boolean);
    const budgetLabel = labelFrom(dict.step4.budgetOptions, state.budgetTier as string);
    const hotelLabel = labelFrom(dict.step4.hotelOptions, state.hotelClass as string);
    const childLabels = (state.childrenAgeTiers ?? [])
      .map((tier) => labelFrom(dict.step2.childTiers, tier))
      .filter(Boolean);

    const mapped = {
      locale,
      source: 'plan-wizard' as const,
      name: String(state.name ?? ''),
      email: String(state.email ?? ''),
      phone: String(state.phone ?? ''),
      preferredChannel: state.whatsappOk ? 'whatsapp' : state.wechatOk ? 'wechat' : 'email',
      country: String(state.countryCode ?? ''),
      travelMonth:
        state.tripWindow === 'approximate'
          ? String(state.tripMonth ?? '')
          : windowLabel || 'still considering',
      durationDays: tripLengthDays[state.tripLength as TripLengthOption] ?? 10,
      partySize: Math.max(1, Number(state.adultsCount) || 1) + (state.childrenAgeTiers ?? []).length,
      budgetRange: budgetLabel,
      notes: [
        `Trip window: ${windowLabel}${state.tripMonth ? ` / ${state.tripMonth}` : ''}`,
        `Trip length: ${lengthLabel}`,
        `Group: ${groupLabel} · adults ${state.adultsCount}${childLabels.length ? ` · kids ${childLabels.join(', ')}` : ''}`,
        `Interests: ${interestLabels.join(', ') || '—'}`,
        `Hotels: ${hotelLabel}`,
        state.notesUserText ? `Traveler note: ${state.notesUserText}` : '',
        whatsapp ? `WhatsApp jump payload: ${whatsapp.result.payload}` : '',
      ]
        .filter(Boolean)
        .join('\n'),
      company_website: String(state.company_website ?? ''),
      turnstileToken: String(state.turnstileToken || turnstileFallbackToken),
    };

    const parsed = leadFormSchema.safeParse(mapped);
    if (!parsed.success) {
      toast.error(dict.errors.generic);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      const payload = (await res.json().catch(() => ({}))) as ApiResponse;
      if (res.ok && 'ok' in payload && payload.ok) {
        clearDraft();
        toast.success(t.home.leadForm.toasts.success);
        setSubmissionId(payload.id);
        return;
      }
      if (res.status === 400 && 'error' in payload && payload.error === 'turnstile_failed') {
        setErrors({ turnstileToken: dict.errors.turnstileMissing });
        toast.error(t.home.leadForm.toasts.verificationFailed);
        dispatch({ type: 'set', field: 'turnstileToken', value: turnstileFallbackToken });
        return;
      }
      if (res.status === 429) {
        toast.error(t.home.leadForm.toasts.rateLimited);
        return;
      }
      toast.error(t.home.leadForm.toasts.genericError);
    } catch {
      toast.error(t.home.leadForm.toasts.genericError);
    } finally {
      setSubmitting(false);
    }
  };

  if (submissionId) {
    return <LeadFormSuccess submissionId={submissionId} />;
  }

  const progress = ((state.currentStep + 1) / TOTAL_STEPS) * 100;
  const stepNode = (() => {
    if (state.currentStep === 0) {
      return <Step1 dict={dict} state={state} dispatch={dispatch} errors={errors} />;
    }
    if (state.currentStep === 1) {
      return <Step2 dict={dict} state={state} dispatch={dispatch} errors={errors} />;
    }
    if (state.currentStep === 2) {
      return (
        <Step3
          dict={dict}
          state={state}
          dispatch={dispatch}
          errors={errors}
          initialVisaFree={initialVisaFree}
        />
      );
    }
    if (state.currentStep === 3) {
      return (
        <Step4
          dict={dict}
          state={state}
          dispatch={dispatch}
          errors={errors}
          whatsappHref={whatsapp?.href ?? null}
          whatsappPayload={whatsapp?.result.payload ?? null}
        />
      );
    }
    return <Step5 dict={dict} state={state} dispatch={dispatch} errors={errors} />;
  })();

  return (
    <section id="lead-form" className="bg-paper px-4 pb-16 pt-8 text-ink md:px-6 md:pb-24 md:pt-14">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[minmax(0,1fr)_300px] lg:grid-cols-[minmax(0,760px)_340px]">
        <div className="md:col-span-2">
          <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-jade">
            {dict.eyebrow}
          </p>
          <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight tracking-tight text-ink md:text-5xl lg:text-6xl">
            {dict.heading}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
            {dict.body}
          </p>
          {initialContext && initialContext.items.length > 0 && (
            <div className="mt-5 rounded-2xl border border-vermilion/20 bg-vermilion-soft/35 px-4 py-3 text-sm text-ink">
              <p className="font-medium">
                {locale === 'zh' ? '已带入上一页选择' : 'Carried over from the previous page'}
              </p>
              <dl className="mt-2 grid gap-2 sm:grid-cols-2">
                {initialContext.items.map((item) => (
                  <div key={item.id} className="min-w-0">
                    <dt className="text-[11px] uppercase tracking-[0.14em] text-ink-soft">
                      {textForLocale(item.label, locale)}
                    </dt>
                    <dd className="mt-0.5 break-words text-ink">
                      {textForLocale(item.value, locale)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
          {restored && (
            <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-jade/25 bg-jade/10 px-4 py-3 text-sm text-ink sm:flex-row sm:items-center sm:justify-between">
              <span>{dict.resumeHint}</span>
              <button
                type="button"
                onClick={reset}
                className="min-h-11 rounded-full border border-jade px-4 text-sm font-medium text-jade hover:bg-jade hover:text-soft-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
              >
                {dict.resumeClear}
              </button>
            </div>
          )}
        </div>

        <div className="min-w-0">
          <div className="sticky top-[88px] z-20 -mx-4 border-b border-ink/10 bg-paper/95 px-4 py-4 backdrop-blur md:static md:mx-0 md:border-b-0 md:bg-transparent md:px-0 md:py-0 md:backdrop-blur-none">
            <div className="flex items-center justify-between text-sm font-medium text-ink">
              <span className="text-vermilion">
                {dict.progressLabel} {state.currentStep + 1} {dict.of} {TOTAL_STEPS}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-vermilion-soft">
              <div
                className="h-full rounded-full bg-vermilion transition-[width] duration-150 motion-reduce:transition-none"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="mt-6 rounded-[2rem] border border-ink/10 bg-cream p-5 shadow-sm md:mt-6 md:p-8">
            {stepNode}
          </div>

          <div className="-mx-4 mt-6 border-t border-ink/10 bg-paper px-4 py-3 md:mx-0 md:border-t-0 md:bg-transparent md:px-0 md:py-0">
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={goBack}
                disabled={state.currentStep === 0 || submitting}
                className="min-h-11 rounded-full border-ink/15 bg-soft-ivory px-5 text-ink hover:bg-paper disabled:opacity-40"
              >
                {dict.back}
              </Button>
              <Button
                type="button"
                onClick={goNext}
                disabled={submitting}
                className="min-h-11 flex-1 rounded-full bg-vermilion px-6 font-medium text-soft-ivory shadow-md shadow-vermilion/25 hover:bg-vermilion-deep disabled:opacity-60"
              >
                {submitting ? dict.submitting : state.currentStep === 4 ? dict.submit : dict.next}
              </Button>
            </div>
          </div>
        </div>

        <WizardSummary dict={dict} state={state} locale={locale} />
      </div>
    </section>
  );
}

export default PlanWizard;
