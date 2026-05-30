import type { Locale } from './locales';

export const THEME_PAGE_SLUGS = [
  'family',
  'nature',
  'business-add-on',
  'heritage',
] as const;

export type ThemePageSlug = (typeof THEME_PAGE_SLUGS)[number];

export const isThemePageSlug = (value: string): value is ThemePageSlug =>
  THEME_PAGE_SLUGS.includes(value as ThemePageSlug);

export const themePageCopy: Record<
  Locale,
  {
    shared: {
      asideHeading: string;
      asideBody: string;
      primaryCta: string;
      backHome: string;
    };
    themes: Record<
      ThemePageSlug,
      {
        meta: {
          title: string;
          description: string;
        };
        kicker: string;
        title: string;
        description: string;
        bullets: string[];
      }
    >;
  }
> = {
  en: {
    shared: {
      asideHeading: 'Ask the planning team to design around this direction',
      asideBody:
        'This is only a starting point. Send it together with your dates, party and must-see places.',
      primaryCta: 'Use this direction',
      backHome: 'Back to home',
    },
    themes: {
      family: {
        meta: {
          title: 'Family China trips · Pace-first planning | pandatravel',
          description:
            'Family China travel should start with pace, hotel changes and recovery time before choosing cities and nature stops.',
        },
        kicker: 'FAMILY TRAVEL',
        title: 'China with kids works best when the pace is right first',
        description:
          'Family travel should not inherit a honeymoon tempo. The planning team first checks ages, stamina, hotel-change tolerance and daily recovery time, then chooses the city and nature mix.',
        bullets: [
          'Family-friendly hotels and realistic transfer days',
          'Rain-plan swaps and rest blocks before they are needed',
          'A balance of hands-on culture, light walking and recovery time',
        ],
      },
      nature: {
        meta: {
          title: 'Nature-first China trips · Landscape route planning | pandatravel',
          description:
            'Start with the kind of landscape you want, then build a China route that does not overload cities or transfers.',
        },
        kicker: 'NATURE FIRST',
        title: 'If nature is the point, do not overpack the cities',
        description:
          'Zhangjiajie, Jiuzhaigou, Guilin, Dali and Huangshan all create different rhythms. Choose the landscape first, then we connect the route without wasting transfers.',
        bullets: [
          'Mountain, lake, karst, cloud-sea and village landscape types',
          'Photography and light-walking windows by month',
          'Fewer low-value transfers and more time near the view',
        ],
      },
      'business-add-on': {
        meta: {
          title: 'China business trip add-ons · 2-5 day leisure planning | pandatravel',
          description:
            'Turn a China business trip gap into a short leisure route based on meeting city, return airport and realistic buffer time.',
        },
        kicker: 'BUSINESS ADD-ON',
        title: 'A few days after work can still feel like a real trip',
        description:
          'Start from your meeting city and return airport. The planning team turns the 2-5 day gap into a city walk, food route or nature short line without risking the business schedule.',
        bullets: [
          'Route planned backward from meeting location and departure airport',
          'Buffer time kept for delays, jet lag and schedule changes',
          'Late-arrival and early-departure flights handled explicitly',
        ],
      },
      heritage: {
        meta: {
          title: 'Heritage and leisure China trips · Family visit route planning | pandatravel',
          description:
            'Combine family visits, ancestral cities or fixed relatives with a China leisure route that respects immovable dates.',
        },
        kicker: 'HERITAGE + LEISURE',
        title: 'Family visits and travel can belong in the same route',
        description:
          'If you have a family city, ancestry clue or relatives to visit, the planning team locks the immovable dates first, then builds the leisure route around them.',
        bullets: [
          'Fixed family-visit dates protected before sightseeing is added',
          'Bilingual notes and local context for sensitive logistics',
          'A slower rhythm for elders, relatives and mixed-purpose days',
        ],
      },
    },
  },
  zh: {
    shared: {
      asideHeading: '让顾问按这个方向设计',
      asideBody:
        '这只是切入点。你可以把它和日期、同行人、目的地一起发给顾问团队。',
      primaryCta: '用这个方向定制行程',
      backHome: '回到首页',
    },
    themes: {
      family: {
        meta: {
          title: '家庭亲子中国旅行 · 先定节奏 | pandatravel',
          description:
            '带孩子来中国要先判断节奏、换酒店次数和恢复时间，再选择城市与自然组合。',
        },
        kicker: 'FAMILY TRAVEL',
        title: '带孩子来中国，节奏要先对',
        description:
          '亲子旅行不能直接套蜜月节奏。顾问团队会先确认孩子年龄、体力、换酒店承受度和每天恢复时间，再推荐城市与自然组合。',
        bullets: [
          '亲子友好的酒店和真实可执行的车程',
          '雨天替换方案和提前留好的恢复时间',
          '动手文化体验、轻徒步和休息时间的平衡',
        ],
      },
      nature: {
        meta: {
          title: '自然山水中国旅行 · 景观优先路线规划 | pandatravel',
          description:
            '先选择想看的景观类型，再规划不塞满城市、不浪费转场的中国自然路线。',
        },
        kicker: 'NATURE FIRST',
        title: '想看自然，就不要把城市塞太满',
        description:
          '张家界、九寨沟、桂林、大理和黄山会走出完全不同的自然节奏。先选你喜欢的景观，我们再拼路线，减少无意义中转。',
        bullets: [
          '山地、湖泊、喀斯特、云海和村落景观类型',
          '适合摄影和轻徒步的月份与时段',
          '减少低价值中转，把时间留在风景旁边',
        ],
      },
      'business-add-on': {
        meta: {
          title: '中国商务出差延伸旅行 · 2-5 天短线规划 | pandatravel',
          description:
            '按会议城市、返程机场和真实缓冲时间，把中国出差后的空档整理成短线旅行。',
        },
        kicker: 'BUSINESS ADD-ON',
        title: '出差后加几天，也能玩得像一趟旅行',
        description:
          '从你的会议城市和返程机场出发，把 2-5 天空档整理成顺路城市漫游、美食路线或自然短线，不影响商务行程。',
        bullets: [
          '按会议地点和返程机场反推路线',
          '为延误、时差和临时改程保留缓冲',
          '明确处理晚到早走航班和行李动线',
        ],
      },
      heritage: {
        meta: {
          title: '探亲与旅行组合 · 中国家族节点路线规划 | pandatravel',
          description:
            '把探亲、祖籍城市或亲友固定安排和中国旅行路线放在同一条线里规划。',
        },
        kicker: 'HERITAGE + LEISURE',
        title: '探亲和旅行可以放在同一条线里',
        description:
          '如果你有家族城市、祖籍线索或亲友安排，顾问团队会先锁住不可移动的探亲节点，再补旅行段。',
        bullets: [
          '先保护固定探亲日期，再安排游览',
          '准备必要的中英文说明和本地语境',
          '适合长辈、亲友和混合目的行程的慢节奏',
        ],
      },
    },
  },
};
