'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { CTAPrimary } from '@/components/atoms/CTAGhost';
import { useLocale } from '@/components/i18n/LocaleProvider';
import {
  evaluateEligibility,
  findOnward,
  findPort,
  findRule,
  PORT_TYPE_LABEL,
  PORT_TYPE_ORDER,
  REGION_LABEL,
  THIRD_DESTINATIONS,
  VISA_FREE_PORTS,
  VISA_FREE_RULES,
  type EligibilityReasonCode,
  type EntryPort,
  type EntryPortType,
  type StayDuration,
} from '@/lib/data/visa-free';
import {
  buildWhatsAppDeepLink,
  groupTextFrom,
  interestsTextFrom,
  whenTextFrom,
} from '@/lib/wizard-payload';
import { cn } from '@/lib/utils';

type Locale = ReturnType<typeof useLocale>['locale'];
type T = ReturnType<typeof useLocale>['t']['home']['visaFree'];

// Public placeholder advisor number is gated behind the mock guard. Replace
// before launch via lib/data/advisors.ts.
const ADVISOR_PHONE = '861300000000';

const inputCls =
  'h-11 w-full rounded-md border border-ink/15 bg-soft-ivory px-3 text-[14px] text-ink shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-cream';

const REASON_TO_KEY: Record<EligibilityReasonCode, keyof T['reasons']> = {
  'pending-input': 'pendingInput',
  'passport-not-eligible': 'passportNotEligible',
  'port-not-in-passport-list': 'portNotInPassportList',
  'port-not-applicable-for-stay': 'portNotApplicableForStay',
  'duration-not-eligible-for-passport': 'durationNotEligibleForPassport',
  'onward-same-as-passport': 'onwardSameAsPassport',
  'onward-not-recognised': 'onwardNotRecognised',
  eligible: 'eligible',
};

function groupPortsByType(ports: EntryPort[]) {
  const buckets = new Map<EntryPortType, EntryPort[]>();
  for (const p of ports) {
    const arr = buckets.get(p.type) ?? [];
    arr.push(p);
    buckets.set(p.type, arr);
  }
  return PORT_TYPE_ORDER.filter((t) => buckets.has(t)).map((t) => ({
    type: t,
    ports: buckets.get(t)!.sort((a, b) => a.en.localeCompare(b.en)),
  }));
}

function PassportSelect({
  value,
  onChange,
  label,
  placeholder,
  locale,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
  placeholder: string;
  locale: Locale;
}) {
  const items = useMemo(
    () =>
      [...VISA_FREE_RULES].sort((a, b) =>
        (locale === 'zh' ? a.passportCountryName.zh : a.passportCountryName.en).localeCompare(
          locale === 'zh' ? b.passportCountryName.zh : b.passportCountryName.en,
          locale,
        ),
      ),
    [locale],
  );
  return (
    <label className="flex flex-col gap-2">
      <span className="sr-only">{label}</span>
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls}
      >
        <option value="">{placeholder}</option>
        {items.map((r) => (
          <option key={r.passportCountry} value={r.passportCountry}>
            {locale === 'zh' ? r.passportCountryName.zh : r.passportCountryName.en} (
            {r.passportCountry})
          </option>
        ))}
      </select>
    </label>
  );
}

function PortSelect({
  value,
  onChange,
  label,
  placeholder,
  locale,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
  placeholder: string;
  locale: Locale;
}) {
  const grouped = useMemo(() => groupPortsByType(VISA_FREE_PORTS), []);
  return (
    <label className="flex flex-col gap-2">
      <span className="sr-only">{label}</span>
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls}
      >
        <option value="">{placeholder}</option>
        {grouped.map(({ type, ports }) => (
          <optgroup
            key={type}
            label={locale === 'zh' ? PORT_TYPE_LABEL[type].zh : PORT_TYPE_LABEL[type].en}
          >
            {ports.map((p) => (
              <option key={p.slug} value={p.slug}>
                {locale === 'zh' ? `${p.cn} · ${p.province}` : `${p.en} · ${p.province}`}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </label>
  );
}

function OnwardSelect({
  value,
  onChange,
  label,
  placeholder,
  locale,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
  placeholder: string;
  locale: Locale;
}) {
  const items = useMemo(
    () =>
      [...THIRD_DESTINATIONS].sort((a, b) =>
        (locale === 'zh' ? a.countryName.zh : a.countryName.en).localeCompare(
          locale === 'zh' ? b.countryName.zh : b.countryName.en,
          locale,
        ),
      ),
    [locale],
  );
  return (
    <label className="flex flex-col gap-2">
      <span className="sr-only">{label}</span>
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls}
      >
        <option value="">{placeholder}</option>
        {items.map((d) => (
          <option key={d.countryCode} value={d.countryCode}>
            {locale === 'zh' ? d.countryName.zh : d.countryName.en}
          </option>
        ))}
      </select>
    </label>
  );
}

function StayRadio({
  value,
  onChange,
  rule,
  port,
  t,
}: {
  value: StayDuration | '';
  onChange: (v: StayDuration) => void;
  rule: ReturnType<typeof findRule> | undefined;
  port: ReturnType<typeof findPort> | undefined;
  t: T;
}) {
  const allow24 =
    !rule || !port || (rule.eligibleStays.includes('24h') && port.applicableStays.includes('24h'));
  const allow240 =
    !rule || !port || (rule.eligibleStays.includes('240h') && port.applicableStays.includes('240h'));
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="sr-only">{t.tool.steps.d.heading}</legend>
      <label
        className={cn(
          'flex cursor-pointer items-start gap-3 rounded-md border p-3 ring-offset-cream',
          value === '24h' ? 'border-vermilion bg-vermilion-soft/40' : 'border-ink/15 bg-soft-ivory',
          !allow24 && 'opacity-50',
        )}
      >
        <input
          type="radio"
          name="stay"
          value="24h"
          checked={value === '24h'}
          disabled={!allow24}
          onChange={() => onChange('24h')}
          className="mt-1"
        />
        <span className="flex flex-col gap-0.5">
          <span className="text-[14px] font-misans-bold text-ink">{t.tool.steps.d.options24}</span>
          <span className="text-[12px] text-ink/65">{t.tool.steps.d.options24Help}</span>
        </span>
      </label>
      <label
        className={cn(
          'flex cursor-pointer items-start gap-3 rounded-md border p-3 ring-offset-cream',
          value === '240h' ? 'border-vermilion bg-vermilion-soft/40' : 'border-ink/15 bg-soft-ivory',
          !allow240 && 'opacity-50',
        )}
      >
        <input
          type="radio"
          name="stay"
          value="240h"
          checked={value === '240h'}
          disabled={!allow240}
          onChange={() => onChange('240h')}
          className="mt-1"
        />
        <span className="flex flex-col gap-0.5">
          <span className="text-[14px] font-misans-bold text-ink">{t.tool.steps.d.options240}</span>
          <span className="text-[12px] text-ink/65">{t.tool.steps.d.options240Help}</span>
        </span>
      </label>
    </fieldset>
  );
}

export function DecisionTool() {
  const { locale, t } = useLocale();
  const dict = t.home.visaFree;

  const [passport, setPassport] = useState('');
  const [portSlug, setPortSlug] = useState('');
  const [onwardCode, setOnwardCode] = useState('');
  const [stay, setStay] = useState<StayDuration | ''>('');

  const rule = findRule(passport);
  const port = findPort(portSlug);
  const onward = findOnward(onwardCode);
  const result = evaluateEligibility(rule, port, onward, stay || null);

  const reasonText = dict.reasons[REASON_TO_KEY[result.reasonCode]];

  // WhatsApp deep link — uses the v1 wizard payload format.
  const wa = useMemo(() => {
    const passportLabel = rule
      ? locale === 'zh'
        ? rule.passportCountryName.zh
        : rule.passportCountryName.en
      : '';
    const portLabel = port ? (locale === 'zh' ? port.cn : port.en) : '';
    const onwardLabel = onward ? (locale === 'zh' ? onward.countryName.zh : onward.countryName.en) : '';
    const whenText = whenTextFrom({
      tripWindow: 'considering',
      tripMonth: '',
      tripLength: stay === '240h' ? '8-10-days' : '5-7-days',
    });
    const groupText = groupTextFrom({ groupType: 'visa-free', adultsCount: 1, childrenAgeTiers: [] });
    const interestsText = interestsTextFrom({
      chips: ['visa-free', passportLabel, portLabel, `→ ${onwardLabel}`].filter(Boolean) as string[],
      notes: stay ? `${stay} transit` : '',
    });
    return buildWhatsAppDeepLink(ADVISOR_PHONE, {
      whenText: whenText || 'visa-free transit',
      groupText: groupText || 'solo / unspecified',
      interestsText,
    });
  }, [locale, rule, port, onward, stay]);

  const planQuery = new URLSearchParams({ type: 'visa-free' });
  if (portSlug) planQuery.set('port', portSlug);
  if (onwardCode) planQuery.set('onward', onwardCode);
  if (stay) planQuery.set('stay', stay);
  const planHref = `/plan?${planQuery.toString()}`;

  return (
    <div
      data-testid="visa-free-decision-tool"
      data-eligible={result.eligible ? 'yes' : 'no'}
      data-reason={result.reasonCode}
      className="grid grid-cols-1 gap-8 rounded-[12px] bg-paper p-6 ring-1 ring-ink/10 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:p-10"
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-[24px] font-misans-heavy text-ink lg:text-[32px]">{dict.tool.heading}</h2>
          <p className="text-[14px] text-ink/70">{dict.tool.body}</p>
        </div>

        <fieldset className="flex flex-col gap-2">
          <legend className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
            {dict.tool.steps.a.label}
          </legend>
          <h3 className="text-[16px] font-misans-bold text-ink">{dict.tool.steps.a.heading}</h3>
          <PassportSelect
            value={passport}
            onChange={setPassport}
            label={dict.tool.steps.a.heading}
            placeholder={dict.placeholders.passport}
            locale={locale}
          />
          <p className="text-[12px] text-ink/70">{dict.tool.steps.a.help}</p>
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <legend className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
            {dict.tool.steps.b.label}
          </legend>
          <h3 className="text-[16px] font-misans-bold text-ink">{dict.tool.steps.b.heading}</h3>
          <PortSelect
            value={portSlug}
            onChange={setPortSlug}
            label={dict.tool.steps.b.heading}
            placeholder={dict.placeholders.port}
            locale={locale}
          />
          <p className="text-[12px] text-ink/70">{dict.tool.steps.b.help}</p>
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <legend className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
            {dict.tool.steps.c.label}
          </legend>
          <h3 className="text-[16px] font-misans-bold text-ink">{dict.tool.steps.c.heading}</h3>
          <OnwardSelect
            value={onwardCode}
            onChange={setOnwardCode}
            label={dict.tool.steps.c.heading}
            placeholder={dict.placeholders.onward}
            locale={locale}
          />
          <p className="text-[12px] text-ink/70">{dict.tool.steps.c.help}</p>
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <legend className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
            {dict.tool.steps.d.label}
          </legend>
          <h3 className="text-[16px] font-misans-bold text-ink">{dict.tool.steps.d.heading}</h3>
          <StayRadio value={stay} onChange={setStay} rule={rule} port={port} t={dict} />
          <p className="text-[12px] text-ink/70">{dict.tool.steps.d.help}</p>
        </fieldset>
      </div>

      <div
        aria-live="polite"
        data-testid="visa-free-result"
        className={cn(
          'flex h-fit flex-col gap-5 rounded-[10px] p-6 ring-1',
          result.reasonCode === 'eligible'
            ? 'bg-vermilion-soft/60 ring-vermilion/30 text-ink'
            : 'bg-paper ring-ink/10 text-ink',
        )}
      >
        <div className="flex flex-col gap-1">
          <span className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
            {result.reasonCode === 'eligible'
              ? dict.result.eligibleHeading
              : dict.result.ineligibleHeading}
          </span>
          <p className="text-[15px] font-misans-bold leading-snug text-ink">{result.reason[locale]}</p>
          <p className="text-[12px] text-ink/65">{reasonText}</p>
        </div>

        {result.eligible && (
          <>
            <div className="flex flex-col gap-2">
              <span className="text-[12px] font-misans-regular tracking-[0.14em] uppercase text-ink/70">
                {dict.result.regionsLabel}
              </span>
              <ul className="flex flex-wrap gap-2">
                {result.allowedRegions.map((r) => (
                  <li
                    key={r}
                    className="rounded-full bg-soft-ivory px-3 py-1 text-[12px] font-misans-regular text-ink ring-1 ring-ink/10"
                  >
                    {locale === 'zh' ? REGION_LABEL[r].zh : REGION_LABEL[r].en}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[12px] font-misans-regular tracking-[0.14em] uppercase text-ink/70">
                {dict.result.portsLabel}
              </span>
              <ul className="flex flex-col gap-1.5 text-[13px] text-ink/85">
                {result.allowedPorts.map((p) => (
                  <li key={p.slug} className="flex items-baseline justify-between gap-3">
                    <span>{locale === 'zh' ? p.cn : p.en}</span>
                    <span className="text-[11px] uppercase tracking-[0.14em] text-ink/70">
                      {locale === 'zh' ? PORT_TYPE_LABEL[p.type].zh : PORT_TYPE_LABEL[p.type].en}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        <div className="flex flex-col gap-2">
          <span className="text-[12px] font-misans-regular tracking-[0.14em] uppercase text-ink/70">
            {dict.result.risksHeading}
          </span>
          <ul className="flex flex-col gap-1.5 text-[12px] leading-relaxed text-ink/75">
            {dict.result.risks.map((r) => (
              <li key={r} className="flex gap-2">
                <span aria-hidden className="mt-1 size-1.5 shrink-0 rounded-full bg-vermilion" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <CTAPrimary href={planHref} className="h-11">
            {dict.result.cta.plan}
          </CTAPrimary>
          <a
            href={wa.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-misans-regular text-ink/75 underline-offset-4 hover:text-jade hover:underline"
          >
            {dict.result.cta.chat} →
          </a>
          <Link
            href="/"
            className="text-[12px] font-misans-regular text-ink/70 underline-offset-4 hover:text-jade hover:underline"
          >
            ← {locale === 'zh' ? '回首页' : 'Back to home'}
          </Link>
        </div>
      </div>
    </div>
  );
}
