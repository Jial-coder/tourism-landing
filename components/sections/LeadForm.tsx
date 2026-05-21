'use client';

import { useEffect, useState } from 'react';
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
  FormDescription,
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

export function LeadForm({ source }: { source: LeadSource }) {
  const { locale, t } = useLocale();
  const ld = t.home.leadForm;
  const [state, setState] = useState<LeadFormState>({ kind: 'idle' });

  const form = useForm<LeadFormInput>({
    resolver: zodResolver(leadFormSchema),
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
      travelStyle: [],
      destinations: [],
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
                      <FormLabel className="text-ink">{ld.labels.name}</FormLabel>
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
                      <FormLabel className="text-ink">{ld.labels.email}</FormLabel>
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
                      <FormLabel className="text-ink">{ld.labels.travelMonth}</FormLabel>
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
                      <FormLabel className="text-ink">{ld.labels.durationDays}</FormLabel>
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
                      <FormLabel className="text-ink">{ld.labels.partySize}</FormLabel>
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
                      <FormLabel className="text-ink">{ld.labels.preferredChannel}</FormLabel>
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
                      <FormLabel className="text-ink">{ld.labels.budgetRange}</FormLabel>
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
                name="travelStyle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-ink">{ld.labels.travelStyle}</FormLabel>
                    <FormControl>
                      <Textarea
                        readOnly
                        placeholder={ld.placeholders.travelStyle}
                        className="min-h-12 bg-paper text-ink-soft"
                        value={Array.isArray(field.value) ? field.value.join(', ') : ''}
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-ink-soft">
                      Multi-select coming later — describe your style in the notes below for now.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="destinations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-ink">{ld.labels.destinations}</FormLabel>
                    <FormControl>
                      <Textarea
                        readOnly
                        placeholder={ld.placeholders.destinations}
                        className="min-h-12 bg-paper text-ink-soft"
                        value={Array.isArray(field.value) ? field.value.join(', ') : ''}
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-ink-soft">
                      Multi-select coming later — list interest areas in the notes below for now.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-ink">{ld.labels.notes}</FormLabel>
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
