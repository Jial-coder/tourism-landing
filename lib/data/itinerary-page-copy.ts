import type { Locale } from './locales';

export type ItineraryEmptyPointIcon = 'calendar' | 'map' | 'route';

export const itineraryPageCopy: Record<
  Locale,
  {
    meta: {
      title: string;
      description: string;
    };
    hero: {
      eyebrow: string;
      publicHeading: string;
      emptyHeading: string;
      publicBody: string;
      emptyBody: string;
      primaryCta: string;
      secondaryCta: string;
    };
    grid: {
      srTitle: string;
    };
    filters: {
      durationLabel: string;
      themeLabel: string;
      monthLabel: string;
      durations: Record<string, string>;
      months: Record<string, string>;
      themes: Record<string, string>;
      empty: string;
      emptyCta: string;
      days: (days: number) => string;
      destinationPrefix: string;
      priceFrom: (price: number) => string;
      cardCta: string;
    };
    emptyStudio: {
      eyebrow: string;
      heading: string;
      body: string;
      cta: string;
      points: {
        icon: ItineraryEmptyPointIcon;
        title: string;
        body: string;
      }[];
    };
    cta: {
      eyebrow: string;
      publicHeading: string;
      emptyHeading: string;
      publicBody: string;
      emptyBody: string;
      button: string;
    };
  }
> = {
  en: {
    meta: {
      title: 'Itineraries · Custom China route directions | pandatravel',
      description:
        'Start with a China route direction or send a custom request. Lin shapes the itinerary around your month, pace, party and must-see places.',
    },
    hero: {
      eyebrow: 'Itineraries',
      publicHeading: 'Start from a route direction, then make it yours',
      emptyHeading: 'Tell us the China you want, and we will shape the route',
      publicBody:
        'These route directions are starting points, not fixed packages. Open one for the rhythm, then tell Lin what to add, drop or swap.',
      emptyBody:
        'The public route library is intentionally quiet for now. Start with your travel month, party, pace and the images you keep thinking about; Lin will turn that into a first route direction.',
      primaryCta: 'Open the 5-step request',
      secondaryCta: 'Browse destinations',
    },
    grid: {
      srTitle: 'Filter and browse China route directions',
    },
    filters: {
      durationLabel: 'Length',
      themeLabel: 'Theme',
      monthLabel: 'Travel month',
      durations: {
        any: 'Any length',
        '5-7': '5-7 days',
        '8-10': '8-10 days',
        '11-14': '11-14 days',
        '15+': '15+ days',
      },
      months: {
        any: 'Any month',
        'Apr-May': 'Apr-May',
        'Jun-Aug': 'Jun-Aug',
        'Sep-Nov': 'Sep-Nov',
        'Dec-Mar': 'Dec-Mar',
      },
      themes: {
        any: 'All themes',
        'first-time': 'First time',
        'visa-free': 'Visa-free transit',
        family: 'Family',
        honeymoon: 'Honeymoon',
        nature: 'Nature & landscape',
        culture: 'History & culture',
        food: 'Food',
      },
      empty:
        'No route direction matches this combination yet. Try another filter, or tell Lin the China you have in mind and we will write a new starting point.',
      emptyCta: 'Tell Lin my version',
      days: (days) => `${days} ${days === 1 ? 'day' : 'days'}`,
      destinationPrefix: 'Main places:',
      priceFrom: (price) => `From USD ${price.toLocaleString()} / person`,
      cardCta: 'See the full route detail',
    },
    emptyStudio: {
      eyebrow: 'Route brief',
      heading: 'Set the travel boundaries before filling the days',
      body:
        'A good itinerary is not a packed city list. It decides what should come closer, what should be skipped, and where the trip needs breathing room.',
      cta: 'Ask Lin for a first draft',
      points: [
        {
          icon: 'calendar',
          title: 'Timing and pace',
          body: 'Month, trip length, and whether each day should feel easy or full decide the route frame first.',
        },
        {
          icon: 'map',
          title: 'Places and images',
          body: 'Start with one place you care about, then decide whether Beijing, Xi\'an, Guilin or Zhangjiajie should connect.',
        },
        {
          icon: 'route',
          title: 'Travel party and tradeoffs',
          body: 'Family, honeymoon, parents, or business add-on all change walking time, transfers and rest days.',
        },
      ],
    },
    cta: {
      eyebrow: "Can't find yours?",
      publicHeading: 'Nothing quite fits? Send Lin your version.',
      emptyHeading: 'Send Lin your version.',
      publicBody:
        'Most of our work is custom planning, not selling fixed templates. Send the China you want and Lin will reply with a route direction.',
      emptyBody:
        'You do not need to choose a template first. Tell us where you want to go, when you travel, and who is coming; Lin will send back a discussable first route.',
      button: 'Tell Lin my version →',
    },
  },
  zh: {
    meta: {
      title: '行程 · 中国定制路线方向 | pandatravel',
      description:
        '先从路线方向或定制需求开始，Lin 会按月份、节奏、同行人和最想看的地方整理中国行程。',
    },
    hero: {
      eyebrow: '行程',
      publicHeading: '先看路线方向，再改成你的版本',
      emptyHeading: '先说你想要的中国，我们写成路线',
      publicBody:
        '这里是路线方向，不是固定套餐。打开看节奏，再告诉 Lin 你想加、减、换的细节。',
      emptyBody:
        '公开路线库先保持精简。把时间、同行人、节奏和最想看的画面告诉 Lin，先拿到一条可讨论的初版路线。',
      primaryCta: '打开 5 步行程表',
      secondaryCta: '先看目的地',
    },
    grid: {
      srTitle: '筛选并查看中国路线方向',
    },
    filters: {
      durationLabel: '天数',
      themeLabel: '主题',
      monthLabel: '出行月份',
      durations: {
        any: '全部天数',
        '5-7': '5-7 天',
        '8-10': '8-10 天',
        '11-14': '11-14 天',
        '15+': '15 天以上',
      },
      months: {
        any: '全部月份',
        'Apr-May': '4-5 月',
        'Jun-Aug': '6-8 月',
        'Sep-Nov': '9-11 月',
        'Dec-Mar': '12-3 月',
      },
      themes: {
        any: '全部主题',
        'first-time': '第一次来',
        'visa-free': '过境免签',
        family: '家庭带娃',
        honeymoon: '蜜月',
        nature: '自然山水',
        culture: '历史文化',
        food: '美食',
      },
      empty:
        '目前没有完全符合的路线方向。换个组合再看，或直接告诉 Lin 你想要的中国，我们替你写一条新的。',
      emptyCta: '告诉 Lin 我想要的版本',
      days: (days) => `${days} 天`,
      destinationPrefix: '主目的地：',
      priceFrom: (price) => `USD ${price.toLocaleString()} 起 / 人`,
      cardCta: '看完整路线详情',
    },
    emptyStudio: {
      eyebrow: '路线简报',
      heading: '先把旅行边界说清楚，再决定每天怎么走',
      body:
        '路线不是把城市排满，而是帮你判断哪些地方值得近一点、哪些地方应该删掉、哪里需要留白。',
      cta: '让 Lin 写初版',
      points: [
        {
          icon: 'calendar',
          title: '时间与节奏',
          body: '几月出发、旅行几天、想松一点还是紧一点，先决定路线骨架。',
        },
        {
          icon: 'map',
          title: '城市与画面',
          body: '从一个最想去的地方开始，再判断要不要串北京、西安、桂林或张家界。',
        },
        {
          icon: 'route',
          title: '同行人与取舍',
          body: '家庭、蜜月、父母同行或商务顺路，都会改变每天的步数和换城方式。',
        },
      ],
    },
    cta: {
      eyebrow: '找不到合适的？',
      publicHeading: '没有完全符合的？告诉 Lin 你的版本。',
      emptyHeading: '把你的版本发给 Lin。',
      publicBody:
        '我们写得最多的是定制行程，不是清单里的固定模板。把你想要的中国发给 Lin，顾问会回一版路线方向。',
      emptyBody:
        '不用先选模板。告诉我们你想去哪里、什么时候出发、同行人是谁，Lin 会先回一条可讨论的初版路线。',
      button: '告诉 Lin 我想要的版本 →',
    },
  },
};
