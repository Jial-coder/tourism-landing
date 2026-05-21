export default {
  // TODO_COPY
  nav: {},
  // TODO_COPY
  hero: {},
  // TODO_COPY
  diagnostic: {},
  // TODO_COPY
  destinations: {},
  // TODO_COPY
  visa: {},
  // TODO_COPY
  advisor: {},
  // TODO_COPY
  concierge: {},
  // TODO_COPY
  leadForm: {},
  // TODO_COPY
  leadFormSuccess: {},
  // TODO_COPY
  trust: {},
  // TODO_COPY
  contact: {},
  // TODO_COPY
  faq: {},
  // TODO_COPY
  footer: {},
  // TODO_COPY
  chat: {},
  leadResponsePromise: '我们的中国旅行顾问通常会在 24 小时内回复你（中国节假日除外）',
  home: {
    hero: {
      eyebrow: '中国定制旅行',
      headline: '和本地顾问，把中国玩成你自己的样子',
      subheadline:
        '从故宫日出到云南私享小环线，每一条路线都是你和北京顾问真人对话拼出来的，不是模板。',
      primaryCta: '开始定制',
      secondaryCta: '直接联系顾问',
    },
    trustStrip: {
      items: [
        { stat: '10,000+', label: '已为 10,000+ 位旅客做过定制' },
        { stat: '98.8%', label: '五星好评率（样本）' },
        { stat: '8 年', label: '顾问平均从业年限' },
        { stat: '24 小时', label: '内回复（中国节假日除外）' },
      ],
    },
    howWeWork: {
      eyebrow: '我们的工作方式',
      heading: '三步从想法到行程',
      steps: [
        {
          num: '01',
          title: '联系顾问',
          body: '告诉我们你的旅行月份、人数、节奏，以及你想象中的中国。没有打包菜单。',
        },
        {
          num: '02',
          title: '量身路线',
          body: '顾问为你画一条私人路线、选酒店、配向导和节奏；不合适就改到合适为止。',
        },
        {
          num: '03',
          title: '全程后援',
          body: '北京顾问做你的全程后援 —— 航班延误、临时改方案、饮食过敏，都按你的时区处理。',
        },
      ],
      cta: '开始定制',
    },
    destinations: {
      eyebrow: '目的地',
      heading: '从一个让你心动的地方开始',
      body: '选一个你想象过的地方，剩下的中国由我们串起来。',
      items: [
        { slug: 'beijing', name: '北京', hook: '故宫日出，胡同清晨' },
        { slug: 'xian', name: '西安', hook: '兵马俑与盛唐夜市' },
        { slug: 'shanghai', name: '上海', hook: '外滩夜色与弄堂早茶' },
        { slug: 'guilin', name: '桂林', hook: '喀斯特山水与竹筏' },
        { slug: 'zhangjiajie', name: '张家界', hook: '阿凡达云海之上' },
        { slug: 'jiuzhaigou', name: '九寨沟', hook: '藏地秘境与翡翠水' },
        { slug: 'dali', name: '大理', hook: '云南慢节奏湖畔' },
        { slug: 'huangshan', name: '黄山', hook: '云海之上的水墨' },
      ],
    },
    sampleItineraries: {
      eyebrow: '范例行程',
      heading: '别人这样和我们一起出发',
      body: '概念性范例 —— 你的行程从对话出发，不从货架上选。',
      cta: '定制类似行程',
    },
    specialists: {
      eyebrow: '你的顾问',
      heading: '每条回复背后都是真人',
      body: '北京 / 成都 / 上海全职顾问，签约不外包。',
      cta: '联系顾问',
    },
  },
} as const;
