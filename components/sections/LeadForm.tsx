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
  'preferredChannel',
  'travelMonth',
  'durationDays',
  'partySize',
]);

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
      preferredChannel: '',
      country: '',
      travelMonth: '',
      durationDays: 7,
      partySize: 2,
      budgetRange: '',
      notes: '',
      company_website: '',
      turnstileToken: '',
    },
  });

  useEffect(() => {
    form.setValue('locale', locale, { shouldDirty: false, shouldTouch: false });
  }, [locale, form]);

  const channelOptions = CONTACT_CHANNELS.filter((c) => c.kind !== 'form');

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
        form.setValue('turnstileToken', '', { shouldValidate: true });
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
      <FormLabel className="text-ink">
        {label}
        {required && <RequiredMark ariaLabel={ld.requiredAria} />}
      </FormLabel>
    );
  };

  return (
    <section
      id="lead-form"
      data-feedback-id="HOME-LEAD-FORM-01"
      className="bg-paper py-20 lg:py-28"
    >
      <div className="mx-auto w-full max-w-3xl px-6 lg:px-10">
        <Reveal>
          <div className="mb-10 flex flex-col gap-3 text-center">
            <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-jade">
              {ld.eyebrow}
            </p>
            <h2 className="font-serif text-4xl leading-tight tracking-tight text-ink md:text-5xl">
              {ld.heading}
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
              {ld.body}
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mx-auto max-w-2xl rounded-2xl border border-ink/10 bg-cream p-6 shadow-sm md:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      {renderLabel('name', ld.labels.name)}
                      <FormControl>
                        <Input
                          placeholder={ld.placeholders.name}
                          autoComplete="name"
                          className="h-11 bg-paper text-ink"
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
                    <FormItem>
                      {renderLabel('email', ld.labels.email)}
                      <FormControl>
                        <Input
                          type="email"
                          placeholder={ld.placeholders.email}
                          autoComplete="email"
                          className="h-11 bg-paper text-ink"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="travelMonth"
                  render={({ field }) => (
                    <FormItem>
                      {renderLabel('travelMonth', ld.labels.travelMonth)}
                      <FormControl>
                        <Input
                          placeholder={ld.placeholders.travelMonth}
                          className="h-11 bg-paper text-ink"
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
                    <FormItem>
                      {renderLabel('durationDays', ld.labels.durationDays)}
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          max={365}
                          inputMode="numeric"
                          className="h-11 bg-paper text-ink"
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
                    <FormItem>
                      {renderLabel('partySize', ld.labels.partySize)}
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          max={50}
                          inputMode="numeric"
                          className="h-11 bg-paper text-ink"
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

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="preferredChannel"
                  render={({ field }) => (
                    <FormItem>
                      {renderLabel('preferredChannel', ld.labels.preferredChannel)}
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-11 w-full bg-paper text-ink">
                            <SelectValue placeholder={ld.labels.preferredChannel} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {channelOptions.map((opt) => (
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
                    <FormItem>
                      {renderLabel('budgetRange', ld.labels.budgetRange)}
                      <Select onValueChange={field.onChange} value={field.value ?? ''}>
                        <FormControl>
                          <SelectTrigger className="h-11 w-full bg-paper text-ink">
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
                  <FormItem>
                    {renderLabel('notes', ld.labels.notes)}
                    <FormControl>
                      <Textarea
                        rows={5}
                        placeholder={ld.placeholders.notes}
                        className="bg-paper text-ink"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <HoneypotField {...form.register('company_website')} />

              <div className="flex flex-col gap-2">
                <TurnstileWidget
                  onToken={(token) =>
                    form.setValue('turnstileToken', token, { shouldValidate: true })
                  }
                  onExpire={() => form.setValue('turnstileToken', '', { shouldValidate: true })}
                />
                {form.formState.errors.turnstileToken && (
                  <p className="text-sm text-destructive">{ld.toasts.verificationFailed}</p>
                )}
              </div>

              <p className="text-xs leading-relaxed text-ink-soft">{ld.consent}</p>

              <div className="flex justify-center pt-2">
                <MagneticCta>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="h-12 rounded-full bg-jade px-8 py-3 font-medium text-soft-ivory shadow-md transition-colors hover:bg-jade-soft disabled:opacity-60"
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
