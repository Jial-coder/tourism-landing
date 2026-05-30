import { DESTINATION_THEMES, getDestination } from '@/lib/data/destinations';
import { getItinerary } from '@/lib/data/itineraries';
import {
  findOnward,
  findPort,
  type StayDuration,
} from '@/lib/data/visa-free';
import type { InterestChip } from '@/lib/data/lead-form';

type LocaleText = { en: string; zh: string };

export type PlanContextItem = {
  id: string;
  label: LocaleText;
  value: LocaleText;
};

export type PlanInitialContext = {
  items: PlanContextItem[];
  interestChips: InterestChip[];
  startStep: 0 | 1 | 2 | 3 | 4;
};

type SearchParamsRecord = Record<string, string | string[] | undefined>;

const THEME_LABELS: Record<string, LocaleText> = {
  family: { en: 'Family travel', zh: '家庭亲子' },
  nature: { en: 'Nature first', zh: '自然山水' },
  'business-add-on': { en: 'Business add-on', zh: '商务延伸' },
  heritage: { en: 'Heritage + leisure', zh: '探亲 + 旅行' },
};

const INTENT_LABELS: Record<string, LocaleText> = {
  chat: { en: 'Chat question', zh: '站内聊天问题' },
  notify: { en: 'Notify me', zh: '上线通知' },
  'stories-notify': { en: 'Stories notification', zh: '旅行故事上线通知' },
  'quick-question': { en: 'Quick question', zh: '快速问题' },
  newsletter: { en: 'Monthly inspiration updates', zh: '月度灵感通知' },
};

const PATH_LABELS: Record<string, LocaleText> = {
  undecided: { en: 'Not sure yet', zh: '还没想好' },
};

const pickFirst = (value: string | string[] | undefined): string | undefined => {
  const raw = Array.isArray(value) ? value[0] : value;
  const trimmed = raw?.trim();
  return trimmed || undefined;
};

const unique = <T extends string>(items: T[]): T[] => Array.from(new Set(items));

export function buildPlanInitialContext(
  params: SearchParamsRecord,
): PlanInitialContext | null {
  const items: PlanContextItem[] = [];
  const chips: InterestChip[] = [];

  const type = pickFirst(params.type);
  const destinationSlug = pickFirst(params.destination);
  const itinerarySlug = pickFirst(params.itinerary);
  const themeSlug = pickFirst(params.theme);
  const advisorSlug = pickFirst(params.advisor);
  const intent = pickFirst(params.intent);
  const path = pickFirst(params.path);
  const portSlug = pickFirst(params.port);
  const onwardCode = pickFirst(params.onward);
  const stay = pickFirst(params.stay) as StayDuration | undefined;

  if (type === 'visa-free') {
    chips.push('visa-free');
    items.push({
      id: 'type',
      label: { en: 'Trip type', zh: '行程类型' },
      value: { en: '240h transit visa-free', zh: '240 小时过境免签' },
    });
  }

  if (destinationSlug) {
    const destination = getDestination(destinationSlug);
    if (destination) {
      items.push({
        id: 'destination',
        label: { en: 'Destination', zh: '目的地' },
        value: {
          en: `${destination.en} · ${destination.cn}`,
          zh: `${destination.cn} · ${destination.en}`,
        },
      });
      for (const theme of destination.themes ?? DESTINATION_THEMES[destination.slug] ?? []) {
        if (theme === 'nature') chips.push('nature');
        if (theme === 'history') chips.push('history');
        if (theme === 'food') chips.push('food');
        if (theme === 'slow') chips.push('slow');
        if (theme === 'city') chips.push('modern-city');
        if (theme === 'outdoor') chips.push('outdoor');
      }
    }
  }

  if (itinerarySlug) {
    const itinerary = getItinerary(itinerarySlug);
    if (itinerary) {
      items.push({
        id: 'itinerary',
        label: { en: 'Route direction', zh: '路线方向' },
        value: itinerary.title,
      });
      for (const theme of itinerary.themes) {
        if (theme === 'visa-free') chips.push('visa-free');
        if (theme === 'family') chips.push('nature');
        if (theme === 'honeymoon') chips.push('honeymoon');
        if (theme === 'nature') chips.push('nature');
        if (theme === 'culture') chips.push('history');
        if (theme === 'food') chips.push('food');
      }
    }
  }

  if (themeSlug && THEME_LABELS[themeSlug]) {
    const theme = THEME_LABELS[themeSlug];
    items.push({
      id: 'theme',
      label: { en: 'Travel style', zh: '旅行主题' },
      value: theme,
    });
    if (themeSlug === 'family') chips.push('slow');
    if (themeSlug === 'nature') chips.push('nature');
    if (themeSlug === 'business-add-on') chips.push('modern-city');
  }

  if (advisorSlug === 'lin') {
    items.push({
      id: 'advisor',
      label: { en: 'Contact requested', zh: '联系对象' },
      value: { en: 'Planning team', zh: '顾问团队' },
    });
  }

  if (intent && INTENT_LABELS[intent]) {
    items.push({
      id: 'intent',
      label: { en: 'Intent', zh: '意图' },
      value: INTENT_LABELS[intent],
    });
  }

  if (path && PATH_LABELS[path]) {
    items.push({
      id: 'path',
      label: { en: 'Starting point', zh: '切入点' },
      value: PATH_LABELS[path],
    });
  }

  if (portSlug) {
    const port = findPort(portSlug);
    if (port) {
      items.push({
        id: 'port',
        label: { en: 'Entry port', zh: '入境口岸' },
        value: { en: port.en, zh: port.cn },
      });
    }
  }

  if (onwardCode) {
    const onward = findOnward(onwardCode);
    if (onward) {
      items.push({
        id: 'onward',
        label: { en: 'Onward destination', zh: '离境目的地' },
        value: onward.countryName,
      });
    }
  }

  if (stay === '24h' || stay === '240h') {
    items.push({
      id: 'stay',
      label: { en: 'Transit stay', zh: '停留时长' },
      value: {
        en: stay === '240h' ? '240 hours / 10 days' : '24-hour direct transit',
        zh: stay === '240h' ? '240 小时 / 10 天' : '24 小时直接过境',
      },
    });
  }

  if (items.length === 0) return null;

  return {
    items,
    interestChips: unique(chips),
    startStep: 0,
  };
}
