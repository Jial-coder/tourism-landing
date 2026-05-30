'use client';

import { useEffect, useMemo, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { useLocale } from '@/components/i18n/LocaleProvider';
import { leadFormSchema, type LeadFormInput, type LeadFormState } from '@/lib/data/lead-form';
import { CONTACT_CHANNELS } from '@/lib/data/contact-channels';
import { HoneypotField } from '@/components/forms/HoneypotField';
import { TurnstileWidget } from '@/components/forms/TurnstileWidget';
import { LeadFormSuccess } from '@/components/sections/LeadFormSuccess';
import { Reveal } from '@/components/motion/Reveal';
import { MagneticCta } from '@/components/motion/MagneticCta';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

type LeadSource = LeadFormInput['source'];

type ApiResponse =
  | { ok: true; id: string }
  | { ok: false; error?: string };

const REQUIRED_FIELDS = new Set([
  'name',
  'email',
  'tripFocus',
  'preferredChannel',
  'travelMonth',
  'durationDays',
  'partySize',
]);

const turnstileFallbackToken = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  ? ''
  : 'dev-turnstile-bypass';

type ErrorDict = ReturnType<typeof useLocale>['t']['home']['leadForm']['errors'];

const localizeFromIssue = (
  message: string | undefined,
  type: string | undefined,
  errors: ErrorDict,
): string => {
  const raw = message ?? '';
  if (raw === 'turnstile_missing') return errors.turnstileMissing;
  if (raw === 'honeypot_hit') return errors.generic;

  // zod v4 issue codes routed via @hookform/resolvers as `type` on the field error.
  // For `string().min(1)` (used as our required marker) the type is `too_small` with minimum 1.
  if (type === 'too_small' && /to have >=1\b/.test(raw)) return errors.required;
  if (type === 'invalid_type' && /received undefined|expected string|nullable/i.test(raw)) {
    return errors.required;
  }
  if (type === 'invalid_format' && /email/i.test(raw)) return errors.invalidEmail;
  if (type === 'invalid_string' && /email/i.test(raw)) return errors.invalidEmail;
  if (type === 'too_small') return errors.tooShort;
  if (type === 'too_big') return errors.tooLong;
  if (/email/i.test(raw)) return errors.invalidEmail;
  if (type === 'invalid_type' || /number|integer|nan|finite/i.test(raw)) return errors.invalidNumber;
  return errors.generic;
};

const localizeErrors = (
  errors: Record<string, unknown>,
  dict: ErrorDict,
): Record<string, unknown> => {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(errors)) {
    if (!value || typeof value !== 'object') {
      out[key] = value;
      continue;
    }
    const v = value as { message?: string; type?: string };
    out[key] = {
      ...value,
      message: localizeFromIssue(v.message, v.type, dict),
    };
  }
  return out;
};

const RequiredMark = ({ ariaLabel }: { ariaLabel: string }) => (
  <>
    <span aria-hidden className="ml-1 text-jade">*</span>
    <span className="sr-only"> ({ariaLabel})</span>
  </>
);

const fieldClassName =
  'h-10 w-full min-w-0 rounded-xl border-ink/15 bg-soft-ivory px-3 text-[13px] text-ink placeholder:text-ink/45 focus-visible:border-jade focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-cream md:h-11 md:px-4 md:text-sm';

const selectClassName =
  '!h-10 w-full min-w-0 max-w-full overflow-hidden rounded-xl border-ink/15 bg-soft-ivory px-3 text-[13px] text-ink data-[placeholder]:text-ink/45 focus-visible:border-jade focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-cream md:!h-11 md:px-4 md:text-sm';

const textareaClassName =
  'min-h-16 rounded-xl border-ink/15 bg-soft-ivory px-3 py-2 text-[13px] text-ink placeholder:text-ink/45 focus-visible:border-jade focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-cream md:min-h-32 md:px-4 md:text-sm';

const formItemClassName = 'min-w-0 gap-1 md:gap-2';

const EMAIL_REPLY_OPTION = {
  id: 'email',
  label: { zh: '邮件回复', en: 'Email reply' },
};

export function LeadForm({ source }: { source: LeadSource }) {
  const { locale, t } = useLocale();
  const ld = t.home.leadForm;
  const [state, setState] = useState<LeadFormState>({ kind: 'idle' });

  const localizedResolver = useMemo(() => {
    const base = zodResolver(leadFormSchema);
    const wrapped = async (
      values: Parameters<typeof base>[0],
      ctx: Parameters<typeof base>[1],
      options: Parameters<typeof base>[2],
    ) => {
      const result = await base(values, ctx, options);
      if (!result.errors) return result;
      return {
        ...result,
        errors: localizeErrors(result.errors as Record<string, unknown>, ld.errors),
      };
    };
    return wrapped as typeof base;
  }, [ld.errors]);

  const form = useForm<LeadFormInput>({
    resolver: localizedResolver,
    mode: 'onBlur',
    defaultValues: {
      source,
      locale,
      name: '',
      email: '',
      phone: '',
      preferredChannel: EMAIL_REPLY_OPTION.id,
      country: '',
      tripFocus: '',
      travelMonth: '',
      durationDays: 7,
      partySize: 2,
      budgetRange: '',
      notes: '',
      company_website: '',
      turnstileToken: turnstileFallbackToken,
    },
  });

  useEffect(() => {
    form.setValue('locale', locale, { shouldDirty: false, shouldTouch: false });
  }, [locale, form]);

  const channelOptions = CONTACT_CHANNELS.filter(
    (c) => c.kind !== 'form' && c.status !== 'hidden' && c.visibility !== 'hidden',
  ).map((c) => ({ id: c.id, label: c.label }));

  const preferredChannelOptions = [
    EMAIL_REPLY_OPTION,
    ...channelOptions.filter((c) => c.id !== EMAIL_REPLY_OPTION.id),
  ];

  const onSubmit: SubmitHandler<LeadFormInput> = async (data) => {
    setState({ kind: 'submitting' });
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...data, locale }),
      });
      const payload = (await res.json().catch(() => ({}))) as ApiResponse;
      if (res.status === 200 && 'ok' in payload && payload.ok) {
        toast.success(ld.toasts.success);
        setState({ kind: 'success', submissionId: payload.id });
        form.reset();
        return;
      }
      if (res.status === 400 && 'error' in payload && payload.error === 'turnstile_failed') {
        toast.error(ld.toasts.verificationFailed);
        form.setValue('turnstileToken', turnstileFallbackToken, { shouldValidate: true });
        setState({ kind: 'error', messageKey: 'turnstile' });
        return;
      }
      if (res.status === 400 && 'error' in payload && payload.error === 'honeypot') {
        // Server silently rejects bots; mirror success UX so the bot doesn't iterate.
        setState({ kind: 'success', submissionId: 'silent' });
        return;
      }
      if (res.status === 429) {
        toast.error(ld.toasts.rateLimited);
        setState({ kind: 'error', messageKey: 'rate_limit' });
        return;
      }
      toast.error(ld.toasts.genericError);
      setState({ kind: 'error', messageKey: 'generic' });
    } catch {
      toast.error(ld.toasts.genericError);
      setState({ kind: 'error', messageKey: 'network' });
    }
  };

  if (state.kind === 'success') {
    return <LeadFormSuccess submissionId={state.submissionId} />;
  }

  const submitting = state.kind === 'submitting';
  const renderLabel = (fieldId: string, label: string) => {
    const required = REQUIRED_FIELDS.has(fieldId);
    return (
      <FormLabel className="min-w-0 max-w-full flex-wrap gap-0.5 text-xs font-medium leading-tight text-ink md:text-base">
        {label}
        {required && <RequiredMark ariaLabel={ld.requiredAria} />}
      </FormLabel>
    );
  };

  return (
    <section
      id="lead-form"
      data-feedback-id="HOME-LEAD-FORM-01"
      className="bg-paper py-10 sm:py-16 lg:py-28"
    >
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="mb-5 flex flex-col gap-1.5 text-center md:mb-10 md:gap-3">
            <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-jade">
              {ld.eyebrow}
            </p>
            <h2 className="font-serif text-2xl leading-tight tracking-tight text-ink sm:text-4xl md:text-5xl">
              {ld.heading}
            </h2>
            <p className="mx-auto max-w-2xl text-sm leading-normal text-ink-soft sm:text-base sm:leading-relaxed md:text-lg">
              {ld.body}
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mx-auto max-w-2xl rounded-2xl border border-ink/15 bg-cream p-3 shadow-sm md:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2.5 md:gap-5" noValidate>
              <div className="grid grid-cols-2 gap-2.5 md:gap-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className={formItemClassName}>
                      {renderLabel('name', ld.labels.name)}
                      <FormControl>
                        <Input
                          placeholder={ld.placeholders.name}
                          autoComplete="name"
                          className={fieldClassName}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className={formItemClassName}>
                      {renderLabel('email', ld.labels.email)}
                      <FormControl>
                        <Input
                          type="email"
                          placeholder={ld.placeholders.email}
                          autoComplete="email"
                          className={fieldClassName}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="tripFocus"
                render={({ field }) => (
                  <FormItem className={formItemClassName}>
                    {renderLabel('tripFocus', ld.labels.tripFocus)}
                    <FormControl>
                      <Input
                        placeholder={ld.placeholders.tripFocus}
                        autoComplete="off"
                        className={fieldClassName}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 md:gap-5">
                <FormField
                  control={form.control}
                  name="travelMonth"
                  render={({ field }) => (
                    <FormItem className={`col-span-2 md:col-span-1 ${formItemClassName}`}>
                      {renderLabel('travelMonth', ld.labels.travelMonth)}
                      <FormControl>
                        <Input
                          placeholder={ld.placeholders.travelMonth}
                          className={fieldClassName}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="durationDays"
                  render={({ field }) => (
                    <FormItem className={formItemClassName}>
                      {renderLabel('durationDays', ld.labels.durationDays)}
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          max={365}
                          inputMode="numeric"
                          className={fieldClassName}
                          name={field.name}
                          ref={field.ref}
                          onBlur={field.onBlur}
                          onChange={field.onChange}
                          value={(field.value as number | string | undefined) ?? ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="partySize"
                  render={({ field }) => (
                    <FormItem className={formItemClassName}>
                      {renderLabel('partySize', ld.labels.partySize)}
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          max={50}
                          inputMode="numeric"
                          className={fieldClassName}
                          name={field.name}
                          ref={field.ref}
                          onBlur={field.onBlur}
                          onChange={field.onChange}
                          value={(field.value as number | string | undefined) ?? ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5 md:gap-5">
                <FormField
                  control={form.control}
                  name="preferredChannel"
                  render={({ field }) => (
                    <FormItem className={formItemClassName}>
                      {renderLabel('preferredChannel', ld.labels.preferredChannel)}
                      <Select onValueChange={field.onChange} value={field.value || undefined}>
                        <FormControl>
                          <SelectTrigger
                            aria-label={ld.labels.preferredChannel}
                            className={`${selectClassName} w-full`}
                          >
                            <SelectValue placeholder={ld.labels.preferredChannel} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {preferredChannelOptions.map((opt) => (
                            <SelectItem key={opt.id} value={opt.id}>
                              {locale === 'zh' ? opt.label.zh : opt.label.en}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="budgetRange"
                  render={({ field }) => (
                    <FormItem className={formItemClassName}>
                      {renderLabel('budgetRange', ld.labels.budgetRange)}
                      <Select onValueChange={field.onChange} value={field.value || undefined}>
                        <FormControl>
                          <SelectTrigger
                            aria-label={ld.labels.budgetRange}
                            className={`${selectClassName} w-full`}
                          >
                            <SelectValue placeholder={ld.labels.budgetRange} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {ld.budgetOptions.map((opt) => (
                            <SelectItem key={opt.id} value={opt.id}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem className={formItemClassName}>
                    {renderLabel('notes', ld.labels.notes)}
                    <FormControl>
                      <Textarea
                        rows={4}
                        placeholder={ld.placeholders.notes}
                        className={textareaClassName}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <HoneypotField {...form.register('company_website')} />

              <div className="flex flex-col gap-1.5">
                <TurnstileWidget
                  onToken={(token) =>
                    form.setValue('turnstileToken', token, { shouldValidate: true })
                  }
                  onExpire={() =>
                    form.setValue('turnstileToken', turnstileFallbackToken, {
                      shouldValidate: true,
                    })
                  }
                />
                {form.formState.errors.turnstileToken && (
                  <p className="text-sm text-destructive">{ld.toasts.verificationFailed}</p>
                )}
              </div>

              <p className="text-[11px] leading-normal text-ink-soft md:text-xs md:leading-relaxed">{ld.consent}</p>

              <div className="flex justify-center pt-1 md:pt-2">
                <MagneticCta className="w-full md:w-auto">
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="h-11 w-full rounded-full bg-vermilion px-6 py-3 text-sm font-medium text-soft-ivory shadow-md shadow-vermilion/25 transition-colors hover:bg-vermilion-deep disabled:opacity-60 md:h-12 md:w-auto md:px-8"
                  >
                    {submitting ? ld.submitting : ld.submit}
                  </Button>
                </MagneticCta>
              </div>
            </form>
          </Form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default LeadForm;
