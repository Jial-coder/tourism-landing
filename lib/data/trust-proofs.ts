export type ProofStatus = 'mock' | 'verified' | 'pending' | 'hidden';

interface BaseProof {
  id: string;
  status: ProofStatus;
  productionVisible: boolean;
  source?: string;
  authorizedAt?: string;
}

export interface ReviewProof extends BaseProof {
  kind: 'A_review';
  platform: 'tripadvisor' | 'google' | 'email' | 'other';
  rating?: number;
  quote: { en: string; zh: string };
  travelType: string;
  destination: string;
  evidenceUrl?: string;
}

export interface AdvisorProof extends BaseProof {
  kind: 'B_advisor';
  displayName: { en: string; zh: string };
  role: { en: string; zh: string };
  languages: string[];
  destinations: string[];
  yearsOfExperience?: number;
  photoSrc?: string;
  responseModel: { en: string; zh: string };
}

export interface CaseProof extends BaseProof {
  kind: 'C_case';
  customerType: string;
  durationDays: number;
  partySize: number;
  destinations: string[];
  challenge: { en: string; zh: string };
  outcome: { en: string; zh: string };
  feedbackAvailable: boolean;
}

export interface CredentialProof extends BaseProof {
  kind: 'D_credential';
  category: 'entity' | 'license' | 'partner' | 'payment' | 'privacy' | 'process';
  displayName: { en: string; zh: string };
  description: { en: string; zh: string };
  publicAllowed: boolean;
}

export type TrustProof = ReviewProof | AdvisorProof | CaseProof | CredentialProof;

export interface StatProof {
  id: string;
  status: ProofStatus;
  productionVisible: boolean;
  stat: string;
  label: { en: string; zh: string };
}

export const TRUST_STATS: StatProof[] = [
  {
    id: 'stat-travelers-count',
    status: 'mock',
    productionVisible: true,
    stat: '10,000+',
    label: { en: "Travelers we've planned for", zh: '已为 10,000+ 位旅客做过定制' },
  },
  {
    id: 'stat-five-star-rate',
    status: 'mock',
    productionVisible: true,
    stat: '98.8%',
    label: { en: '5-star reviews (sample)', zh: '五星好评率（样本）' },
  },
  {
    id: 'stat-specialist-tenure',
    status: 'mock',
    productionVisible: true,
    stat: '8 yrs',
    label: { en: 'Average specialist tenure', zh: '顾问平均从业年限' },
  },
  {
    id: 'stat-reply-window',
    status: 'mock',
    productionVisible: true,
    stat: '24 h',
    label: {
      en: 'Reply within (China holidays excluded)',
      zh: '内回复（中国节假日除外）',
    },
  },
];

export const TRUST_PROOFS: TrustProof[] = [
  {
    id: 'example-trip-classic-12d',
    kind: 'C_case',
    status: 'mock',
    productionVisible: false,
    customerType: 'First-time couple from the US',
    durationDays: 12,
    partySize: 2,
    destinations: ['Beijing', "Xi'an", 'Guilin', 'Shanghai'],
    challenge: {
      en: 'Wanted the classic China loop but no group bus, no rushed museum stops, and a real food day in each city.',
      zh: '想走经典中国一圈，但拒绝大巴团、博物馆走马观花，要每个城市留一天好好吃饭。',
    },
    outcome: {
      en: 'Private guides in each city, Forbidden City sunrise slot, slow Li River bamboo morning, lane breakfast walk in Shanghai.',
      zh: '每城私人向导、故宫日出时段、漓江竹筏慢早晨、上海弄堂早餐徒步。',
    },
    feedbackAvailable: false,
  },
  {
    id: 'example-trip-yunnan-loop-9d',
    kind: 'C_case',
    status: 'mock',
    productionVisible: false,
    customerType: 'Slow-travel couple from the UK',
    durationDays: 9,
    partySize: 2,
    destinations: ['Kunming', 'Dali', 'Lijiang', 'Shangri-La'],
    challenge: {
      en: 'Wanted Yunnan, but allergic to packaged old-town tours and big-bus altitude transfers.',
      zh: '想去云南，又拒绝古镇打卡团和大巴上高原。',
    },
    outcome: {
      en: 'Private driver loop, lakeside Dali stay, Naxi village lunch with a local family, gradual altitude pacing.',
      zh: '私人司机环线、大理湖畔住宿、纳西村午餐做客本地人家、循序上高原。',
    },
    feedbackAvailable: false,
  },
  {
    id: 'example-trip-family-15d',
    kind: 'C_case',
    status: 'mock',
    productionVisible: false,
    customerType: 'Multi-gen family of 5 from Australia',
    durationDays: 15,
    partySize: 5,
    destinations: ['Beijing', "Xi'an", 'Chengdu', 'Zhangjiajie', 'Shanghai'],
    challenge: {
      en: 'Three generations, mixed pace, one wheelchair user; wanted pandas, peaks, and the Bund without losing grandma.',
      zh: '三代同行、节奏不同、一位轮椅长者；既想看熊猫和山，又不想累到长辈。',
    },
    outcome: {
      en: 'Wheelchair-accessible hotels, panda morning slot, Zhangjiajie elevator route, slower city days, family-style dinners booked.',
      zh: '无障碍酒店、熊猫上午时段、张家界百龙电梯线路、放慢市内节奏、合家桌餐预订。',
    },
    feedbackAvailable: false,
  },
  {
    id: 'demo-advisor-yiwen-lu',
    kind: 'B_advisor',
    status: 'mock',
    productionVisible: false,
    displayName: { en: 'Yiwen Lu', zh: '陆奕雯' },
    role: { en: 'Senior China Specialist · Beijing', zh: '资深中国顾问 · 北京' },
    languages: ['English', '中文'],
    destinations: ['Beijing', "Xi'an", 'Inner Mongolia', 'Pingyao'],
    yearsOfExperience: 9,
    responseModel: {
      en: 'Replies within 24h, weekdays Beijing time.',
      zh: '北京工作日 24 小时内回复。',
    },
  },
  {
    id: 'demo-advisor-bo-chen',
    kind: 'B_advisor',
    status: 'mock',
    productionVisible: false,
    displayName: { en: 'Bo Chen', zh: '陈博' },
    role: { en: 'Yunnan & Sichuan Specialist · Chengdu', zh: '云南川藏顾问 · 成都' },
    languages: ['English', '中文', 'Français'],
    destinations: ['Chengdu', 'Dali', 'Lijiang', 'Shangri-La', 'Jiuzhaigou'],
    yearsOfExperience: 7,
    responseModel: {
      en: 'Replies within 24h; on-trip support in Chengdu timezone.',
      zh: '24 小时内回复；行程中按成都时区随叫随到。',
    },
  },
  {
    id: 'demo-advisor-mei-zhang',
    kind: 'B_advisor',
    status: 'mock',
    productionVisible: false,
    displayName: { en: 'Mei Zhang', zh: '张玫' },
    role: { en: 'East China & Shanghai Specialist', zh: '华东上海顾问' },
    languages: ['English', '中文', '日本語'],
    destinations: ['Shanghai', 'Hangzhou', 'Suzhou', 'Huangshan'],
    yearsOfExperience: 8,
    responseModel: {
      en: 'Replies within 24h; reachable on WeChat during the trip.',
      zh: '24 小时内回复；行程中微信常驻。',
    },
  },
  {
    id: 'demo-advisor-jian-li',
    kind: 'B_advisor',
    status: 'mock',
    productionVisible: false,
    displayName: { en: 'Jian Li', zh: '李健' },
    role: { en: 'Family & Multi-gen Specialist · Beijing', zh: '家庭与多代同行顾问 · 北京' },
    languages: ['English', '中文'],
    destinations: ['Beijing', 'Zhangjiajie', 'Guilin', 'Hangzhou'],
    yearsOfExperience: 10,
    responseModel: {
      en: 'Replies within 24h; specialised in accessible & family pacing.',
      zh: '24 小时内回复；擅长无障碍与家庭节奏。',
    },
  },
  {
    id: 'mock-review-tripadvisor-01',
    kind: 'A_review',
    status: 'mock',
    productionVisible: false,
    platform: 'tripadvisor',
    rating: 5,
    quote: {
      en: 'Mock review placeholder — real Tripadvisor reviews to be plugged in by ops before launch.',
      zh: '示例评价占位 —— 上线前由运营替换为真实 Tripadvisor 评价。',
    },
    travelType: 'Couple · 12 days',
    destination: 'Beijing → Xi’an → Guilin → Shanghai',
  },
  {
    id: 'mock-review-google-02',
    kind: 'A_review',
    status: 'mock',
    productionVisible: false,
    platform: 'google',
    rating: 5,
    quote: {
      en: 'Mock review placeholder — real Google reviews to be plugged in by ops before launch.',
      zh: '示例评价占位 —— 上线前由运营替换为真实 Google 评价。',
    },
    travelType: 'Multi-gen family · 15 days',
    destination: 'Beijing → Chengdu → Zhangjiajie',
  },
  {
    id: 'sample-licensed-tour-operator-cn',
    kind: 'D_credential',
    status: 'mock',
    productionVisible: false,
    category: 'license',
    displayName: {
      en: 'Sample Licensed Tour Operator Placeholder',
      zh: '示例合规旅行业资质占位',
    },
    description: {
      en: 'Placeholder for a Chinese tour operator license. Replace with the verified license number and authority before launch.',
      zh: '中国旅行社业务许可的占位文案，上线前替换为真实许可证号与发证机关。',
    },
    publicAllowed: false,
  },
  {
    id: 'sample-payment-stripe-placeholder',
    kind: 'D_credential',
    status: 'mock',
    productionVisible: false,
    category: 'payment',
    displayName: {
      en: 'Sample Payment Partner Placeholder',
      zh: '示例支付合作占位',
    },
    description: {
      en: 'Placeholder for the verified card / Stripe payment partner badge. Awaiting brand-usage approval.',
      zh: '银行卡 / Stripe 支付合作徽章的占位文案，待品牌使用授权后替换。',
    },
    publicAllowed: false,
  },
  {
    id: 'sample-privacy-gdpr-placeholder',
    kind: 'D_credential',
    status: 'mock',
    productionVisible: false,
    category: 'privacy',
    displayName: {
      en: 'Sample Privacy Stance Placeholder',
      zh: '示例隐私声明占位',
    },
    description: {
      en: 'Placeholder for the GDPR / data-handling stance. Replace with the published privacy notice URL once legal signs off.',
      zh: 'GDPR 与数据处理声明占位，待法务确认后替换为正式隐私政策链接。',
    },
    publicAllowed: false,
  },
];

export const renderableProofs = (
  proofs: TrustProof[],
  { isProduction }: { isProduction: boolean }
): TrustProof[] =>
  proofs.filter((p) => {
    if (p.status === 'hidden') return false;
    if (isProduction && p.status === 'mock') return false;
    return p.productionVisible || !isProduction;
  });

export const exampleCases = (proofs: TrustProof[] = TRUST_PROOFS): CaseProof[] =>
  proofs.filter((p): p is CaseProof => p.kind === 'C_case' && p.id.startsWith('example-trip-'));

export const demoAdvisors = (proofs: TrustProof[] = TRUST_PROOFS): AdvisorProof[] =>
  proofs.filter(
    (p): p is AdvisorProof => p.kind === 'B_advisor' && p.id.startsWith('demo-advisor-')
  );

export const reviewProofs = (proofs: TrustProof[] = TRUST_PROOFS): ReviewProof[] =>
  proofs.filter((p): p is ReviewProof => p.kind === 'A_review');

export const credentialProofs = (proofs: TrustProof[] = TRUST_PROOFS): CredentialProof[] =>
  proofs.filter((p): p is CredentialProof => p.kind === 'D_credential');
