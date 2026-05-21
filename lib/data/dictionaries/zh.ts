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
    nav: {
      ariaLabel: '主导航',
      brand: 'pandatravel',
      items: [
        { href: '/destinations', label: '目的地', soft404: false },
        { href: '/itineraries', label: '行程', soft404: false },
        { href: '/advisors', label: '顾问', soft404: false },
        { href: '/stories', label: '旅行故事', soft404: true },
        { href: '/about', label: '关于我们', soft404: false },
      ],
      more: '更多',
      ctaPlan: '免费定制行程',
      whatsappLabel: 'WhatsApp · 值班',
      whatsappAria: 'WhatsApp 值班顾问',
      authTrigger: '登录',
      authMenuLabel: '登录菜单',
      authWelcome: '欢迎',
      authSignIn: '登录',
      authSignUp: '创建账号',
      authNote: '保存草稿和聊天记录，下次回来继续。',
      authMobileLink: '登录 →',
      mobileMenuOpen: '打开菜单',
      mobileMenuClose: '关闭菜单',
      mobileMenuLabel: '移动端菜单',
      languageHeading: 'LANGUAGE · 语言',
      soft404Title: '这一栏将在第二阶段开放',
      soft404Body: '这部分将在第二阶段上线，想第一时间收到通知吗？',
      soft404Notify: 'Notify me · 通知我',
      soft404Close: 'Esc 关闭',
      contactSpecialist: '直接联系顾问',
    },
    hero: {
      eyebrow: '中国定制旅行',
      headline: '和本地顾问，把中国玩成你自己的样子',
      subheadline:
        '从故宫日出到云南私享小环线，每一条路线都是你和北京顾问真人对话拼出来的，不是模板。',
      primaryCta: '开始定制',
      secondaryCta: '直接联系顾问',
      contactModalTitle: '直接联系顾问',
      contactModalDescription: '挑一个你顺手的渠道，北京顾问会在 24 小时内回复（中国节假日除外）。',
    },
    trustStrip: {
      items: [
        { value: 10000, suffix: '+', label: '已为 10,000+ 位旅客做过定制' },
        { value: 98.8, decimals: 1, suffix: '%', label: '五星好评率（样本）' },
        { value: 8, suffix: ' 年', label: '顾问平均从业年限' },
        { value: 24, suffix: ' 小时', label: '内回复（中国节假日除外）' },
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
    leadForm: {
      eyebrow: '与顾问一起规划',
      heading: '说说你想要的中国 —— 顾问 24 小时内回复',
      body: '没有销售推销。这些信息只用于为你起草一条私人路线。',
      submit: '发送给顾问',
      submitting: '发送中…',
      requiredHint: '必填',
      requiredAria: '必填字段',
      errors: {
        required: '这一项是必填的',
        invalidEmail: '请填写一个能收到邮件的邮箱',
        tooShort: '内容太短，请再补充一下',
        tooLong: '字数超出上限',
        invalidNumber: '请填一个有效的数字',
        outOfRange: '不在允许范围内',
        turnstileMissing: '人机校验未完成，请稍候再试',
        generic: '这里填得有点问题，请检查一下',
      },
      labels: {
        name: '你的称呼',
        email: '邮箱',
        phone: '电话（选填）',
        country: '国家 / 地区',
        travelMonth: '出行月份',
        durationDays: '行程天数',
        partySize: '出行人数',
        preferredChannel: '希望的回复方式',
        budgetRange: '人均预算（选填）',
        notes: '想跟顾问说点什么（选填）',
      },
      placeholders: {
        name: '请填写姓名',
        email: 'you@email.com',
        phone: '+86 138 0000 0000',
        country: '中国',
        travelMonth: '例：2026 年 10 月',
        notes: '节奏、必去、饮食禁忌、想去的目的地、旅行风格…… 任何对你重要的细节。',
      },
      budgetOptions: [
        { id: 'tbd', label: '暂时没想好' },
        { id: 'under_5000usd', label: '人均 5,000 美元以内' },
        { id: '5000_15000usd', label: '人均 5,000 – 15,000 美元' },
        { id: '15000_30000usd', label: '人均 15,000 – 30,000 美元' },
        { id: '30000usd_plus', label: '人均 30,000 美元以上' },
      ],
      consent: '提交即同意顾问与你联系。当前为示例占位文案，上线前替换为正式隐私声明。',
      toasts: {
        verificationFailed: '人机校验失败，请重试。',
        rateLimited: '提交过于频繁，请稍后再试。',
        genericError: '出了点小问题，可重试或通过 WhatsApp 联系我们。',
        success: '已收到，顾问会在 24 小时内回复。',
      },
    },
    leadFormSuccess: {
      title: '收到了，谢谢。',
      subtitle: '北京顾问会在 24 小时内亲自回复你（中国节假日除外）。',
      channelsHeading: '想要更快回复？也可以直接：',
    },
    faq: {
      eyebrow: '常见问题',
      heading: '出发前常见问题集合',
      ctaHint: '还没找到答案？把问题写在表单里。',
      cta: '直接问顾问',
      items: [
        {
          q: '需要中国签证吗？',
          a: '截至 2026 年，38 个国家旅客可享 30 天免签入境；我们会在收到咨询后 24 小时内确认你的资格。（示例占位 —— 上线前由运营核实最新政策。）',
        },
        {
          q: '需要多早开始计划？',
          a: '定制行程通常需要提前 4–8 周以便预订酒店与向导。两周内的临时出行也能做，但选择有限。',
        },
        {
          q: '一个人 / 一家人去中国安全吗？',
          a: '中国是全球最安全的主流目的地之一。顾问会为带小孩或长辈的家庭单独安排节奏与无障碍方案。',
        },
        {
          q: '可以安排会说英文以外语种的向导吗？',
          a: '我们的向导都流利英语；西班牙语、德语、法语、日语向导可提前安排。',
        },
        {
          q: '怎么付款？',
          a: '支持国际信用卡、银行转账与 Stripe。行程未确认前不收取任何费用。',
        },
        {
          q: '取消政策如何？',
          a: '出发前 30 天以上免费取消；14–30 天部分退款；具体写入合同。',
        },
        {
          q: '中国上网 / VPN 怎么处理？',
          a: '我们会提前告知你能用的本地 App（微信、支付宝、地图）并提供旅行 SIM 卡，行程内可访问 Google 等服务。',
        },
        {
          q: '能处理特殊需求（饮食 / 无障碍）吗？',
          a: '可以 —— 在表单里写明或随时告诉顾问；清真、犹太洁食、无麸质、轮椅出行都能安排。',
        },
      ],
    },
    trustGrid: {
      eyebrow: '为什么留下来',
      heading: '顾问、案例、评价与小字',
      body: '当前为示例占位内容；所有模块都接到结构化数据层，运营可一键替换为真实素材。',
      sections: {
        advisors: {
          title: '真人顾问，而不是客服话术',
          body: '全职、签约、每条回复都署名。',
        },
        cases: {
          title: '我们起草过的范例旅程',
          body: '概念性范例 —— 你的行程会从对话出发重新搭建。',
        },
        reviews: {
          title: '旅客怎么说',
          body: '示例占位评价 —— 真实 Tripadvisor 和 Google 评价由运营接入。',
        },
        credentials: {
          title: '正经但有用的小字',
          body: '资质、支付合作、隐私声明 —— 法务确认前先用占位。',
        },
      },
    },
    pathCFooter: {
      brandTagline: '中国本地顾问真人在线，把你的想法慢慢谈成一条只属于你的路线。',
      quickLinksHeading: '探索',
      contactHeading: '联系顾问',
      legalHeading: '小字',
      languageHint: '可在页面顶部切换语言。',
      legal: [
        { label: '隐私', href: '/legal/privacy' },
        { label: '条款', href: '/legal/terms' },
        { label: 'ICP 占位', href: '/legal/icp' },
      ],
      mockNotice: '示例占位内容 —— 上线前替换',
      copyright: '© 2026 Tourism Landing Demo · 版权所有',
      quickLinks: [
        { label: '目的地', href: '#destinations' },
        { label: '顾问', href: '#specialists' },
        { label: '常见问题', href: '#faq' },
        { label: '联系顾问', href: '#lead-form' },
      ],
    },
  },
} as const;
