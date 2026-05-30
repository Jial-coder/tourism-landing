import type { Locale } from './locales';

export const aboutPageCopy: Record<
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
    origin: {
      eyebrow: string;
      heading: string;
      paragraphs: string[];
    };
    promise: {
      eyebrow: string;
      heading: string;
      body: string;
      items: {
        kicker: string;
        title: string;
        body: string;
      }[];
    };
    how: {
      eyebrow: string;
      heading: string;
      body: string;
      steps: {
        num: string;
        title: string;
        body: string;
        hint: string;
      }[];
    };
    pricing: {
      eyebrow: string;
      heading: string;
      body: string;
      rows: {
        marker: string;
        label: string;
        body: string;
      }[];
      note: string;
    };
    cta: {
      eyebrow: string;
      heading: string;
      body: string;
      primary: string;
      secondary: string;
    };
  }
> = {
  en: {
    meta: {
      title: 'About pandatravel · Beijing-based China planning team',
      description:
        'pandatravel is a Beijing-based China travel planning team focused on clear process, specialist-written routes, transparent proposals and verified public claims.',
    },
    hero: {
      eyebrow: 'About pandatravel',
      heading: 'A Beijing-based planning team with a clear process',
      body:
        'We do not sell one-click China packages or pretend a complex trip is simple. A specialist first reads your request, then shapes the route around your party, pace, budget range and travel season.',
    },
    origin: {
      eyebrow: 'Why we exist',
      heading: 'China is easier to visit when someone local owns the route',
      paragraphs: [
        'Most inbound travelers can find a list of famous places. The hard part is knowing which places belong together, which transfers are realistic, and which day should be intentionally slower.',
        'pandatravel is built around that gap. We start with a short request, have a local planning team review it, and turn your interests into a route that can be discussed before anything is booked.',
        'The public site only states what we are ready to stand behind: human planning, visible tradeoffs, no fake reviews, no unverified awards, and no hidden shopping-stop model.',
      ],
    },
    promise: {
      eyebrow: 'Our promise',
      heading: 'Six standards you can hold us to',
      body:
        'These are operating standards, not campaign slogans. Ask the planning team about any of them before you continue.',
      items: [
        {
          kicker: '01',
          title: 'Human request review',
          body:
            'A real specialist reviews your request before any route direction is drafted, with Chinese public holidays handled separately.',
        },
        {
          kicker: '02',
          title: 'Clear price bands',
          body:
            'Proposal drafts show realistic price bands and what drives them, instead of hiding everything behind a generic inquiry button.',
        },
        {
          kicker: '03',
          title: 'No shopping-stop route model',
          body:
            'Routes are not built around commission shopping stops. If a commercial stop is ever relevant, it must be disclosed and optional.',
        },
        {
          kicker: '04',
          title: 'Named specialist handoff',
          body:
            'Your request has a named owner. External direct channels stay private until verified, but the same request thread keeps the context.',
        },
        {
          kicker: '05',
          title: 'No payment before terms are clear',
          body:
            'Drafting and discussion come first. Any payment request must follow a written proposal and service terms.',
        },
        {
          kicker: '06',
          title: 'Bounded use of your data',
          body:
            'Your trip details are used to discuss this trip, not sold to third parties or reused for unrelated advertising.',
        },
      ],
    },
    how: {
      eyebrow: 'How we work',
      heading: 'From first request to post-trip feedback',
      body:
        'Each step has a clear owner and decision point. The point is not to make travel planning artificially fast; it is to make the slow parts visible.',
      steps: [
        {
          num: '1',
          title: 'Intake · we understand the trip',
          body:
            'You send the short request. A specialist reads party size, dates, pace, dietary needs and must-see places before drafting.',
          hint: 'first reply target',
        },
        {
          num: '2',
          title: 'Draft · first route direction',
          body:
            'You receive a route direction with day-by-day rhythm, stay level, price drivers and the tradeoffs we made for you.',
          hint: 'after scope is clear',
        },
        {
          num: '3',
          title: 'Refine · keep, drop, swap',
          body:
            'You can add, remove or swap details in the same thread. The goal is to improve the route without losing context.',
          hint: 'usually 2-3 rounds',
        },
        {
          num: '4',
          title: 'Confirm · proposal and terms',
          body:
            'Once the route is ready, the formal proposal explains inclusions, exclusions, cancellation terms and payment steps.',
          hint: 'before payment',
        },
        {
          num: '5',
          title: 'Travel · support boundaries',
          body:
            'Before departure, the support contacts, response windows and local handoff details are written into the trip materials.',
          hint: 'pre-trip pack',
        },
        {
          num: '6',
          title: 'Debrief · improve the next route',
          body:
            'After the trip, we ask what worked and what did not. That feedback improves future route drafts instead of becoming fake marketing copy.',
          hint: 'after return',
        },
      ],
    },
    pricing: {
      eyebrow: 'Pricing transparency',
      heading: 'What the proposal should make visible',
      body:
        'Every confirmed trip is different, so this page should not pretend there is one universal margin formula. The proposal should separate the main cost categories before you commit.',
      rows: [
        {
          marker: 'Costs',
          label: 'Ground services',
          body:
            'Hotels, drivers, guides, admissions, restaurants, trains and domestic flights where applicable.',
        },
        {
          marker: 'Time',
          label: 'Planning and advisory work',
          body:
            'The specialist time spent reading your request, drafting the route, refining details and keeping context.',
        },
        {
          marker: 'Ops',
          label: 'Operations and support',
          body:
            'Coordination, local handoff, support preparation, company operations and risk buffers.',
        },
        {
          marker: 'Margin',
          label: 'Company margin',
          body:
            'The business margin should be visible enough to discuss, not hidden inside forced shopping stops.',
        },
      ],
      note:
        'Final numbers belong in the formal proposal. If a line item feels unclear, ask us to explain or revise it before payment.',
    },
    cta: {
      eyebrow: 'Talk to an advisor',
      heading: 'Start with the trip, then meet the right specialist',
      body:
        'Public specialist cards will appear after profile verification. For now, send the 5-step request and we will assign the right owner for your route.',
      primary: 'Fill the 5-step request',
      secondary: 'See how we work',
    },
  },
  zh: {
    meta: {
      title: '关于 pandatravel · 北京本地中国旅行规划团队',
      description:
        'pandatravel 是北京本地中国旅行规划团队，强调清楚流程、真人顾问、透明方案和可核验公开信息。',
    },
    hero: {
      eyebrow: '关于 pandatravel',
      heading: '北京本地规划团队，把流程说清楚',
      body:
        '我们不卖一键购买的中国套餐，也不把复杂行程包装成简单按钮。顾问会先读你的需求，再按同行人、节奏、预算范围和出行季节整理路线。',
    },
    origin: {
      eyebrow: '为什么做这件事',
      heading: '来中国旅行，真正缺的是有人替这条路线负责',
      paragraphs: [
        '海外旅客并不缺景点清单。真正难的是判断哪些地方适合串在一起、哪段转场现实、哪一天应该故意慢下来。',
        'pandatravel 就围绕这个缺口来做：先用简短需求表单收集信息，由本地顾问团队阅读，再把你的兴趣整理成一条可以讨论的路线。',
        '公开页面只写我们愿意负责的事：真人规划、清楚取舍、不造评价、不挂未核验奖项、不靠购物店模型赚钱。',
      ],
    },
    promise: {
      eyebrow: '我们的承诺',
      heading: '你可以拿这 6 条反问我们',
      body:
        '这些不是营销口号，而是当前工作标准。继续往下走之前，任何一条都可以直接问顾问团队。',
      items: [
        {
          kicker: '01',
          title: '人工阅读需求',
          body: '真人顾问会先阅读你的需求，再开始整理路线方向；中国公共节假日会单独说明回复安排。',
        },
        {
          kicker: '02',
          title: '清楚起价区间',
          body: '方案草稿会写明真实价格区间和影响价格的因素，不用“点击咨询”挡住所有信息。',
        },
        {
          kicker: '03',
          title: '不靠购物店模型排路线',
          body: '路线不围绕佣金购物点来设计。如果商业停留有必要，必须提前说明且可以拒绝。',
        },
        {
          kicker: '04',
          title: '固定顾问接手',
          body: '你的需求有明确负责人。外部直连渠道核验前不公开，但同一条需求线程会保留上下文。',
        },
        {
          kicker: '05',
          title: '条款清楚前不收款',
          body: '先讨论草稿和方案。任何付款请求都必须在书面方案和服务条款之后。',
        },
        {
          kicker: '06',
          title: '数据只用于本次沟通',
          body: '你填的信息只用于讨论这次旅行，不卖给第三方，也不拿去做无关广告推送。',
        },
      ],
    },
    how: {
      eyebrow: '我们怎么做',
      heading: '从第一次提交到回家后的反馈',
      body:
        '每一步都说明负责人和决策点。重点不是假装规划很快，而是把慢的地方讲清楚。',
      steps: [
        {
          num: '1',
          title: 'Intake · 先了解这趟旅行',
          body:
            '你提交简短需求。顾问先读同行人、日期、节奏、饮食需求和最想看的地方，再开始写。',
          hint: '首次回复目标',
        },
        {
          num: '2',
          title: 'Draft · 第一版路线方向',
          body:
            '你会收到路线方向：逐日节奏、住宿等级、价格影响因素，以及顾问替你做过的取舍。',
          hint: '范围清楚后',
        },
        {
          num: '3',
          title: 'Refine · 加减和替换',
          body:
            '你可以在同一条线程里继续补充想加、想减、想换的细节。目标是改路线，不丢上下文。',
          hint: '通常 2-3 轮',
        },
        {
          num: '4',
          title: 'Confirm · 方案与条款',
          body:
            '路线确认后，正式方案会说明包含、不包含、取消条款和付款步骤。',
          hint: '付款之前',
        },
        {
          num: '5',
          title: 'Travel · 支持边界',
          body:
            '出发前，支持联系人、响应时段和本地交接方式会写进行前材料。',
          hint: '行前包说明',
        },
        {
          num: '6',
          title: 'Debrief · 用反馈改进下一条路线',
          body:
            '回程后我们会问哪里好、哪里不好。这些反馈会进入之后的路线草稿，不会被包装成假营销文案。',
          hint: '回程后',
        },
      ],
    },
    pricing: {
      eyebrow: '价格透明',
      heading: '正式方案应该把什么说清楚',
      body:
        '每条确认行程都不同，所以这里不假装有一套通用利润公式。真正重要的是：付款前，方案必须把主要成本类别拆开讲。',
      rows: [
        {
          marker: '成本',
          label: '落地服务',
          body: '酒店、司机、导游、门票、餐厅、火车和适用的中国境内航班。',
        },
        {
          marker: '时间',
          label: '规划与顾问工作',
          body: '顾问读需求、写路线、改细节、保留上下文所投入的时间。',
        },
        {
          marker: '运营',
          label: '运营与支持',
          body: '后端协调、本地交接、支持准备、公司运营和风险缓冲。',
        },
        {
          marker: '利润',
          label: '公司利润',
          body: '公司需要赚钱，但不应该藏在强制购物点里，而应该可以被讨论。',
        },
      ],
      note:
        '最终数字以正式方案为准。任何一项看不明白，都可以在付款前要求解释或修改。',
    },
    cta: {
      eyebrow: '联系顾问',
      heading: '先说这趟旅行，再匹配合适的顾问',
      body:
        '公开顾问名片会在资料核验后上线。现在先提交 5 步需求，我们会为你的路线分配合适负责人。',
      primary: '填写 5 步需求',
      secondary: '查看流程说明',
    },
  },
};
