import type { Locale } from './locales';

export const destinationPageCopy: Record<
  Locale,
  {
    meta: {
      title: string;
      description: string;
    };
    hero: {
      eyebrow: string;
      heading: string;
      body: string;
    };
    grid: {
      srTitle: string;
    };
    filter: {
      label: string;
      allThemes: string;
      empty: string;
      emptyCta: string;
      recommended: (days: number) => string;
      stayAdvice: (days: number) => string;
      cardCta: (name: string) => string;
    };
    why: {
      eyebrow: string;
      heading: string;
      paragraphs: string[];
    };
    cta: {
      eyebrow: string;
      heading: string;
      body: string;
      button: string;
    };
  }
> = {
  en: {
    meta: {
      title: 'Destinations · 8 China route starters | pandatravel',
      description:
        'Eight focused China destination starters, designed to help inbound travelers choose a route direction before a specialist customizes the trip.',
    },
    hero: {
      eyebrow: 'Destinations',
      heading: 'Eight places to start your China route',
      body:
        'This is not a catalogue of every city in China. Start with the place that pulls you most, then let Lin shape the rest around your month, pace and travel style.',
    },
    grid: {
      srTitle: 'Filter and browse eight China destinations',
    },
    filter: {
      label: 'Filter by theme',
      allThemes: 'All themes',
      empty:
        'No destination matches this theme yet. Try another filter, or tell Lin the China you have in mind and we will shape a route around it.',
      emptyCta: 'Tell Lin my version',
      recommended: (days) => `Recommended ${days} ${days === 1 ? 'day' : 'days'}`,
      stayAdvice: (days) =>
        `Plan around ${days} ${days === 1 ? 'day' : 'days'} · leave room for 1-2 memorable moments`,
      cardCta: (name) => `Plan a trip to ${name}`,
    },
    why: {
      eyebrow: 'Why 8, not 28',
      heading: 'A focused map is more useful than a long list',
      paragraphs: [
        'China has far more than eight places worth visiting. For v1, this page focuses on eight route starters that are easier to discuss responsibly: Beijing, Xi\'an, Shanghai, Guilin, Zhangjiajie, Jiuzhaigou, Dali and Huangshan.',
        'The job of this page is not to sell a fixed package. It helps you choose a starting point, understand the rhythm, and decide what kind of China you want before a specialist writes the route.',
        'If your city is not here, we can still include it in a custom plan. Chengdu, Hangzhou, Dunhuang, Xinjiang and Tibet can all be discussed through the request form.',
      ],
    },
    cta: {
      eyebrow: 'Tailor-make',
      heading: 'Do you already have another place in mind?',
      body:
        'Send Lin the city, landscape or family stop you care about. We will tell you whether it works as an anchor, a side trip, or something to save for another route.',
      button: 'Tell Lin where I want to go →',
    },
  },
  zh: {
    meta: {
      title: '目的地 · 8 个中国路线起点 | pandatravel',
      description:
        '8 个中国目的地起点，帮入境旅客先判断路线方向，再由顾问按月份、节奏和同行人定制。',
    },
    hero: {
      eyebrow: '目的地',
      heading: '8 个起点，先选一种进入中国的方式',
      body:
        '这不是一份中国城市大全。先选一个最能拉住你的地方，再让 Lin 按你的月份、节奏和旅行风格，把剩下的中国串起来。',
    },
    grid: {
      srTitle: '按主题筛选并查看 8 个中国目的地',
    },
    filter: {
      label: '按主题筛选',
      allThemes: '全部主题',
      empty:
        '目前没有这个主题的目的地。换一个主题再看，或者直接告诉 Lin 你想要的中国，我们替你串。',
      emptyCta: '告诉 Lin 我想要的版本',
      recommended: (days) => `推荐 ${days} 天`,
      stayAdvice: (days) => `建议停留 ${days} 天 · 安排 1-2 个记得住的瞬间`,
      cardCta: (name) => `定制前往 ${name}`,
    },
    why: {
      eyebrow: '为什么是 8 个',
      heading: '比起长清单，我们先给你一张能判断方向的地图',
      paragraphs: [
        '中国当然不止 8 个值得去的地方。v1 先聚焦北京、西安、上海、桂林、张家界、九寨沟、大理、黄山这 8 个路线起点，因为它们更适合作为第一次沟通时的方向锚点。',
        '这页不是固定套餐目录，而是帮你判断：你想从城市、历史、自然、慢节奏还是户外开始。方向清楚之后，顾问再把天数、月份、预算和同行人收进一条具体路线。',
        '不在这 8 个里面的目的地也可以聊。成都、杭州、敦煌、新疆、西藏都可以通过需求表单告诉 Lin，再判断适合做主线、支线，还是留给下一趟。',
      ],
    },
    cta: {
      eyebrow: '定制路线',
      heading: '想去的城市不在这 8 个里？',
      body:
        '把你在意的城市、风景或探亲节点发给 Lin。我们会先判断它适合做路线核心、顺路支线，还是应该留给另一趟。',
      button: '告诉 Lin 我想去哪 →',
    },
  },
};
