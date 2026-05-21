/**
 * WhatsApp deep link payload — pandatravel plan wizard.
 *
 * Spec source: docs/superpowers/specs/2026-05-22-pandatravel-design-spec.md §5.12.1
 * Schema (v1):  v1 | pandatravel | <when_text> | <group_text> | <interests_text>
 * Example:      v1 | pandatravel | Apr 2027 / ~12 days | family +2 kids 6&9 | nature, food, slow
 *
 * Privacy invariants enforced by the type signature: callers cannot pass
 * email/phone/name/IDs — only the three trip-intent strings.
 */

export const PAYLOAD_VERSION = 'v1';
export const PAYLOAD_BRAND = 'pandatravel';
export const PAYLOAD_SEPARATOR = ' | ';

export const PAYLOAD_LIMITS = {
  whenText: 60,
  groupText: 60,
  interestsText: 80,
  total: 220,
} as const;

const INTERESTS_FALLBACK = 'see web form for details';

export interface WizardPayloadParts {
  whenText: string;
  groupText: string;
  interestsText: string;
}

export interface WizardPayloadResult {
  payload: string;
  encoded: string;
  truncated: boolean;
}

const truncate = (text: string, max: number): string => {
  const trimmed = text.trim();
  if (trimmed.length <= max) return trimmed;
  return trimmed.slice(0, Math.max(0, max - 1)).trimEnd() + '…';
};

/**
 * Build the unencoded payload string. Field caps applied per spec §5.12.1.
 * If the assembled payload exceeds the total cap, interests_text is replaced
 * with INTERESTS_FALLBACK; if still over, when/group are individually clipped.
 */
export function buildWizardPayload(parts: WizardPayloadParts): WizardPayloadResult {
  const whenText = truncate(parts.whenText || '—', PAYLOAD_LIMITS.whenText);
  const groupText = truncate(parts.groupText || '—', PAYLOAD_LIMITS.groupText);
  let interestsText = truncate(
    parts.interestsText || '—',
    PAYLOAD_LIMITS.interestsText,
  );

  let truncated = false;

  const join = (interests: string): string =>
    [PAYLOAD_VERSION, PAYLOAD_BRAND, whenText, groupText, interests].join(
      PAYLOAD_SEPARATOR,
    );

  let assembled = join(interestsText);
  if (assembled.length > PAYLOAD_LIMITS.total) {
    interestsText = INTERESTS_FALLBACK;
    truncated = true;
    assembled = join(interestsText);
  }
  if (assembled.length > PAYLOAD_LIMITS.total) {
    const overflow = assembled.length - PAYLOAD_LIMITS.total;
    const trimmedGroup = truncate(
      groupText,
      Math.max(4, groupText.length - overflow),
    );
    assembled = [
      PAYLOAD_VERSION,
      PAYLOAD_BRAND,
      whenText,
      trimmedGroup,
      interestsText,
    ].join(PAYLOAD_SEPARATOR);
    truncated = true;
  }

  return {
    payload: assembled,
    encoded: encodeURIComponent(assembled),
    truncated,
  };
}

/**
 * Build the wa.me deep link.
 * advisorPhone must be E.164 digits-only with country code (no + / spaces).
 */
export function buildWhatsAppDeepLink(
  advisorPhone: string,
  parts: WizardPayloadParts,
): { href: string; result: WizardPayloadResult } {
  const result = buildWizardPayload(parts);
  const phone = advisorPhone.replace(/[^\d]/g, '');
  return {
    href: `https://wa.me/${phone}?text=${result.encoded}`,
    result,
  };
}

/**
 * Compose a human-readable when_text from wizard step-1 state.
 */
export function whenTextFrom({
  tripWindow,
  tripMonth,
  tripLength,
}: {
  tripWindow: 'precise' | 'approximate' | 'considering' | '';
  tripMonth: string;
  tripLength: string;
}): string {
  const parts: string[] = [];
  if (tripWindow === 'precise') parts.push('precise dates');
  if (tripWindow === 'approximate' && tripMonth) parts.push(tripMonth);
  if (tripWindow === 'approximate' && !tripMonth) parts.push('flexible month');
  if (tripWindow === 'considering') parts.push('still considering');
  if (tripLength) parts.push(`~${tripLength}`);
  return parts.join(' / ');
}

/**
 * Compose group_text from wizard step-2 state.
 */
export function groupTextFrom({
  groupType,
  adultsCount,
  childrenAgeTiers,
}: {
  groupType: string;
  adultsCount: number;
  childrenAgeTiers: string[];
}): string {
  if (!groupType) return '';
  if (childrenAgeTiers.length === 0) {
    return adultsCount > 1 ? `${groupType} ×${adultsCount}` : groupType;
  }
  return `${groupType} +${childrenAgeTiers.length} kids ${childrenAgeTiers.join(', ')}`;
}

/**
 * Compose interests_text from wizard step-3 chips + free-text notes.
 */
export function interestsTextFrom({
  chips,
  notes,
}: {
  chips: string[];
  notes: string;
}): string {
  const chipPart = chips.join(', ');
  if (!notes.trim()) return chipPart;
  if (!chipPart) return notes.trim();
  return `${chipPart} (+ note)`;
}
