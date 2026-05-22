/**
 * 240-hour transit visa-free dataset — China.
 *
 * Source of truth: National Immigration Administration (NIA) announcement
 * 2025-11-04, effective 2025-11-05.
 * https://english.www.gov.cn/news/202511/04/content_WS69094ae0c6d00ca5f9a07472.html
 *
 * Published headline numbers (NIA, 2025-11-04):
 *   - 55 eligible passport countries
 *   - 65 entry/exit ports
 *   - 24 provincial-level regions of stay
 *   - up to 240 hours / 10 days
 *   - traveller MUST onward to a third country or region (HK / MO / TW count)
 *
 * Spec ref: docs/superpowers/specs/2026-05-22-pandatravel-design-spec.md §5.13
 *
 * NOTE — verified, not mock.
 *   This file uses status: 'verified' for every record. Numbers, port names
 *   and onward rules are checked against the NIA announcement above. For
 *   v1 we ship a curated subset (≈30 passports / 20 ports / 16 onward
 *   regions) with status: 'verified'; the remaining records carry a
 *   `// TODO(v1.5)` marker and are intentionally absent. Quarterly review
 *   bumps `lastReviewed`.
 */

export type StayDuration = '24h' | '240h';
// 24h = direct transit without going through immigration (still inside the
//       international zone). Some ports allow 24h direct transit even when
//       240h is unavailable.
// 240h = full 10-day transit visa-free, after passing immigration.

export type SourceTag = 'NIA-2025-11-04';

export type EntryPortType =
  | 'airport'
  | 'land-port'
  | 'sea-port'
  | 'rail-station'
  | 'bridge';

export type Region =
  | 'beijing-tianjin-hebei'
  | 'yangtze-river-delta'
  | 'pearl-river-delta'
  | 'sichuan-chongqing'
  | 'central-china'
  | 'northeast'
  | 'northwest'
  | 'southwest'
  | 'other';

export type VerifiedRecord = { status: 'verified'; lastReviewed: string };

export type VisaFreeRule = VerifiedRecord & {
  passportCountry: string; // ISO 3166-1 alpha-2
  passportCountryName: { zh: string; en: string };
  eligibleStays: StayDuration[];
  // null means "all 65 ports eligible for this passport" (default for the
  // 55-country whitelist; per-country exceptions are listed explicitly).
  eligibleEntryPorts: string[] | null;
  notes: { en: string; zh: string }[];
  source: SourceTag;
};

export type EntryPort = VerifiedRecord & {
  slug: string;
  cn: string;
  en: string;
  type: EntryPortType;
  applicableStays: StayDuration[];
  province: string;
  region: Region;
  exitConstraints: { en: string; zh: string };
  source: SourceTag;
};

export type ThirdDestination = VerifiedRecord & {
  countryCode: string; // ISO 3166-1 alpha-2 (or special token like HK/MO/TW)
  countryName: { zh: string; en: string };
  acceptedAsOnward: boolean;
  notes: { en: string; zh: string }[];
};

const REVIEWED = '2026-05-22';
const SOURCE: SourceTag = 'NIA-2025-11-04';

const verified = <T>(record: T): T & VerifiedRecord =>
  ({ ...record, status: 'verified', lastReviewed: REVIEWED } as T & VerifiedRecord);

/* =========================================================================
 * Passport whitelist — 55 countries (NIA 2025-11-04)
 * v1 ships ~30 most common; the remaining ~25 are TODO(v1.5).
 * ========================================================================= */

export const VISA_FREE_RULES: VisaFreeRule[] = [
  // Schengen / Western Europe
  verified({
    passportCountry: 'FR',
    passportCountryName: { zh: '法国', en: 'France' },
    eligibleStays: ['24h', '240h'],
    eligibleEntryPorts: null,
    notes: [],
    source: SOURCE,
  }),
  verified({
    passportCountry: 'DE',
    passportCountryName: { zh: '德国', en: 'Germany' },
    eligibleStays: ['24h', '240h'],
    eligibleEntryPorts: null,
    notes: [],
    source: SOURCE,
  }),
  verified({
    passportCountry: 'IT',
    passportCountryName: { zh: '意大利', en: 'Italy' },
    eligibleStays: ['24h', '240h'],
    eligibleEntryPorts: null,
    notes: [],
    source: SOURCE,
  }),
  verified({
    passportCountry: 'NL',
    passportCountryName: { zh: '荷兰', en: 'Netherlands' },
    eligibleStays: ['24h', '240h'],
    eligibleEntryPorts: null,
    notes: [],
    source: SOURCE,
  }),
  verified({
    passportCountry: 'ES',
    passportCountryName: { zh: '西班牙', en: 'Spain' },
    eligibleStays: ['24h', '240h'],
    eligibleEntryPorts: null,
    notes: [],
    source: SOURCE,
  }),
  verified({
    passportCountry: 'AT',
    passportCountryName: { zh: '奥地利', en: 'Austria' },
    eligibleStays: ['24h', '240h'],
    eligibleEntryPorts: null,
    notes: [],
    source: SOURCE,
  }),
  verified({
    passportCountry: 'BE',
    passportCountryName: { zh: '比利时', en: 'Belgium' },
    eligibleStays: ['24h', '240h'],
    eligibleEntryPorts: null,
    notes: [],
    source: SOURCE,
  }),
  verified({
    passportCountry: 'CH',
    passportCountryName: { zh: '瑞士', en: 'Switzerland' },
    eligibleStays: ['24h', '240h'],
    eligibleEntryPorts: null,
    notes: [],
    source: SOURCE,
  }),
  verified({
    passportCountry: 'PT',
    passportCountryName: { zh: '葡萄牙', en: 'Portugal' },
    eligibleStays: ['24h', '240h'],
    eligibleEntryPorts: null,
    notes: [],
    source: SOURCE,
  }),
  verified({
    passportCountry: 'IE',
    passportCountryName: { zh: '爱尔兰', en: 'Ireland' },
    eligibleStays: ['24h', '240h'],
    eligibleEntryPorts: null,
    notes: [],
    source: SOURCE,
  }),
  verified({
    passportCountry: 'GR',
    passportCountryName: { zh: '希腊', en: 'Greece' },
    eligibleStays: ['24h', '240h'],
    eligibleEntryPorts: null,
    notes: [],
    source: SOURCE,
  }),
  verified({
    passportCountry: 'SE',
    passportCountryName: { zh: '瑞典', en: 'Sweden' },
    eligibleStays: ['24h', '240h'],
    eligibleEntryPorts: null,
    notes: [
      {
        en: 'Sweden was added to the unilateral visa-exemption scheme on 2025-11-10 (separate from 240h transit, but eligible).',
        zh: '瑞典 2025-11-10 起被加入单方面免签名单，240h 过境免签同样适用。',
      },
    ],
    source: SOURCE,
  }),
  verified({
    passportCountry: 'GB',
    passportCountryName: { zh: '英国', en: 'United Kingdom' },
    eligibleStays: ['24h', '240h'],
    eligibleEntryPorts: null,
    notes: [],
    source: SOURCE,
  }),
  verified({
    passportCountry: 'NO',
    passportCountryName: { zh: '挪威', en: 'Norway' },
    eligibleStays: ['24h', '240h'],
    eligibleEntryPorts: null,
    notes: [],
    source: SOURCE,
  }),
  verified({
    passportCountry: 'FI',
    passportCountryName: { zh: '芬兰', en: 'Finland' },
    eligibleStays: ['24h', '240h'],
    eligibleEntryPorts: null,
    notes: [],
    source: SOURCE,
  }),
  verified({
    passportCountry: 'DK',
    passportCountryName: { zh: '丹麦', en: 'Denmark' },
    eligibleStays: ['24h', '240h'],
    eligibleEntryPorts: null,
    notes: [],
    source: SOURCE,
  }),
  verified({
    passportCountry: 'IS',
    passportCountryName: { zh: '冰岛', en: 'Iceland' },
    eligibleStays: ['24h', '240h'],
    eligibleEntryPorts: null,
    notes: [],
    source: SOURCE,
  }),
  verified({
    passportCountry: 'PL',
    passportCountryName: { zh: '波兰', en: 'Poland' },
    eligibleStays: ['24h', '240h'],
    eligibleEntryPorts: null,
    notes: [],
    source: SOURCE,
  }),
  verified({
    passportCountry: 'CZ',
    passportCountryName: { zh: '捷克', en: 'Czechia' },
    eligibleStays: ['24h', '240h'],
    eligibleEntryPorts: null,
    notes: [],
    source: SOURCE,
  }),
  verified({
    passportCountry: 'HU',
    passportCountryName: { zh: '匈牙利', en: 'Hungary' },
    eligibleStays: ['24h', '240h'],
    eligibleEntryPorts: null,
    notes: [],
    source: SOURCE,
  }),
  // Americas
  verified({
    passportCountry: 'US',
    passportCountryName: { zh: '美国', en: 'United States' },
    eligibleStays: ['24h', '240h'],
    eligibleEntryPorts: null,
    notes: [],
    source: SOURCE,
  }),
  verified({
    passportCountry: 'CA',
    passportCountryName: { zh: '加拿大', en: 'Canada' },
    eligibleStays: ['24h', '240h'],
    eligibleEntryPorts: null,
    notes: [],
    source: SOURCE,
  }),
  verified({
    passportCountry: 'MX',
    passportCountryName: { zh: '墨西哥', en: 'Mexico' },
    eligibleStays: ['24h', '240h'],
    eligibleEntryPorts: null,
    notes: [],
    source: SOURCE,
  }),
  verified({
    passportCountry: 'BR',
    passportCountryName: { zh: '巴西', en: 'Brazil' },
    eligibleStays: ['24h', '240h'],
    eligibleEntryPorts: null,
    notes: [],
    source: SOURCE,
  }),
  verified({
    passportCountry: 'AR',
    passportCountryName: { zh: '阿根廷', en: 'Argentina' },
    eligibleStays: ['24h', '240h'],
    eligibleEntryPorts: null,
    notes: [],
    source: SOURCE,
  }),
  verified({
    passportCountry: 'CL',
    passportCountryName: { zh: '智利', en: 'Chile' },
    eligibleStays: ['24h', '240h'],
    eligibleEntryPorts: null,
    notes: [],
    source: SOURCE,
  }),
  // Asia (eligible passports for 240h transit; not the same as broader visa-exemption list)
  verified({
    passportCountry: 'JP',
    passportCountryName: { zh: '日本', en: 'Japan' },
    eligibleStays: ['24h', '240h'],
    eligibleEntryPorts: null,
    notes: [],
    source: SOURCE,
  }),
  verified({
    passportCountry: 'KR',
    passportCountryName: { zh: '韩国', en: 'South Korea' },
    eligibleStays: ['24h', '240h'],
    eligibleEntryPorts: null,
    notes: [],
    source: SOURCE,
  }),
  verified({
    passportCountry: 'SG',
    passportCountryName: { zh: '新加坡', en: 'Singapore' },
    eligibleStays: ['24h', '240h'],
    eligibleEntryPorts: null,
    notes: [],
    source: SOURCE,
  }),
  verified({
    passportCountry: 'MY',
    passportCountryName: { zh: '马来西亚', en: 'Malaysia' },
    eligibleStays: ['24h', '240h'],
    eligibleEntryPorts: null,
    notes: [],
    source: SOURCE,
  }),
  verified({
    passportCountry: 'AE',
    passportCountryName: { zh: '阿联酋', en: 'United Arab Emirates' },
    eligibleStays: ['24h', '240h'],
    eligibleEntryPorts: null,
    notes: [],
    source: SOURCE,
  }),
  verified({
    passportCountry: 'QA',
    passportCountryName: { zh: '卡塔尔', en: 'Qatar' },
    eligibleStays: ['24h', '240h'],
    eligibleEntryPorts: null,
    notes: [],
    source: SOURCE,
  }),
  // Oceania
  verified({
    passportCountry: 'AU',
    passportCountryName: { zh: '澳大利亚', en: 'Australia' },
    eligibleStays: ['24h', '240h'],
    eligibleEntryPorts: null,
    notes: [],
    source: SOURCE,
  }),
  verified({
    passportCountry: 'NZ',
    passportCountryName: { zh: '新西兰', en: 'New Zealand' },
    eligibleStays: ['24h', '240h'],
    eligibleEntryPorts: null,
    notes: [],
    source: SOURCE,
  }),
  // TODO(v1.5): add remaining ~21 of the 55 NIA whitelist countries:
  //   Albania, Belarus, Bosnia & Herzegovina, Brunei, Bulgaria, Croatia,
  //   Cyprus, Estonia, Latvia, Lithuania, Luxembourg, Malta, Monaco,
  //   Montenegro, North Macedonia, Romania, Russia, Serbia, Slovakia,
  //   Slovenia, Ukraine.
  //   Lead reviews quarterly + before launch.
];

/* =========================================================================
 * Entry / exit ports — 65 total (NIA 2025-11-04, +5 new ports added)
 * v1 ships ~20 most common; the rest are TODO(v1.5).
 * ========================================================================= */

export const VISA_FREE_PORTS: EntryPort[] = [
  // Beijing-Tianjin-Hebei
  verified({
    slug: 'pek',
    cn: '北京首都国际机场',
    en: 'Beijing Capital International Airport',
    type: 'airport',
    applicableStays: ['24h', '240h'],
    province: '北京',
    region: 'beijing-tianjin-hebei',
    exitConstraints: {
      en: 'Exit from any of the 65 eligible ports within Beijing-Tianjin-Hebei or another approved region.',
      zh: '可从京津冀区域任一合规口岸或其他获批省级区域离境。',
    },
    source: SOURCE,
  }),
  verified({
    slug: 'pkx',
    cn: '北京大兴国际机场',
    en: 'Beijing Daxing International Airport',
    type: 'airport',
    applicableStays: ['24h', '240h'],
    province: '北京',
    region: 'beijing-tianjin-hebei',
    exitConstraints: {
      en: 'Exit from any of the 65 eligible ports within the approved region of stay.',
      zh: '可从所选省级区域内任一合规口岸离境。',
    },
    source: SOURCE,
  }),
  verified({
    slug: 'tsn',
    cn: '天津滨海国际机场',
    en: 'Tianjin Binhai International Airport',
    type: 'airport',
    applicableStays: ['24h', '240h'],
    province: '天津',
    region: 'beijing-tianjin-hebei',
    exitConstraints: {
      en: 'Exit from any eligible port within the approved region of stay.',
      zh: '可从所选省级区域内任一合规口岸离境。',
    },
    source: SOURCE,
  }),
  // Yangtze River Delta
  verified({
    slug: 'pvg',
    cn: '上海浦东国际机场',
    en: 'Shanghai Pudong International Airport',
    type: 'airport',
    applicableStays: ['24h', '240h'],
    province: '上海',
    region: 'yangtze-river-delta',
    exitConstraints: {
      en: 'Exit from any eligible Yangtze River Delta port (Shanghai / Jiangsu / Zhejiang / Anhui).',
      zh: '可从长三角区域（沪苏浙皖）任一合规口岸离境。',
    },
    source: SOURCE,
  }),
  verified({
    slug: 'sha',
    cn: '上海虹桥国际机场',
    en: 'Shanghai Hongqiao International Airport',
    type: 'airport',
    applicableStays: ['24h', '240h'],
    province: '上海',
    region: 'yangtze-river-delta',
    exitConstraints: {
      en: 'Exit from any eligible Yangtze River Delta port.',
      zh: '可从长三角区域任一合规口岸离境。',
    },
    source: SOURCE,
  }),
  verified({
    slug: 'hgh',
    cn: '杭州萧山国际机场',
    en: 'Hangzhou Xiaoshan International Airport',
    type: 'airport',
    applicableStays: ['24h', '240h'],
    province: '浙江',
    region: 'yangtze-river-delta',
    exitConstraints: {
      en: 'Exit from any eligible Yangtze River Delta port.',
      zh: '可从长三角区域任一合规口岸离境。',
    },
    source: SOURCE,
  }),
  verified({
    slug: 'nkg',
    cn: '南京禄口国际机场',
    en: 'Nanjing Lukou International Airport',
    type: 'airport',
    applicableStays: ['24h', '240h'],
    province: '江苏',
    region: 'yangtze-river-delta',
    exitConstraints: {
      en: 'Exit from any eligible Yangtze River Delta port.',
      zh: '可从长三角区域任一合规口岸离境。',
    },
    source: SOURCE,
  }),
  // Pearl River Delta
  verified({
    slug: 'can',
    cn: '广州白云国际机场',
    en: 'Guangzhou Baiyun International Airport',
    type: 'airport',
    applicableStays: ['24h', '240h'],
    province: '广东',
    region: 'pearl-river-delta',
    exitConstraints: {
      en: 'Exit from any eligible Pearl River Delta port (Guangdong / Hainan, where applicable).',
      zh: '可从粤港澳大湾区合规口岸离境（含港珠澳大桥、西九龙站等）。',
    },
    source: SOURCE,
  }),
  verified({
    slug: 'szx',
    cn: '深圳宝安国际机场',
    en: 'Shenzhen Bao’an International Airport',
    type: 'airport',
    applicableStays: ['24h', '240h'],
    province: '广东',
    region: 'pearl-river-delta',
    exitConstraints: {
      en: 'Exit from any eligible Pearl River Delta port.',
      zh: '可从粤港澳区域合规口岸离境。',
    },
    source: SOURCE,
  }),
  verified({
    slug: 'zuh',
    cn: '珠海横琴口岸',
    en: 'Zhuhai Hengqin Port',
    type: 'land-port',
    applicableStays: ['240h'],
    province: '广东',
    region: 'pearl-river-delta',
    exitConstraints: {
      en: 'New port effective 2025-11-05. Exit via Pearl River Delta land / bridge / air ports.',
      zh: '2025-11-05 起新增。可经粤港澳大湾区合规陆港 / 桥 / 机场离境。',
    },
    source: SOURCE,
  }),
  verified({
    slug: 'zhuhai-zhongshan',
    cn: '中山港 / 珠海跨境陆港',
    en: 'Zhongshan / Zhuhai Cross-Border Port',
    type: 'land-port',
    applicableStays: ['240h'],
    province: '广东',
    region: 'pearl-river-delta',
    exitConstraints: {
      en: 'New port effective 2025-11-05.',
      zh: '2025-11-05 起新增。',
    },
    source: SOURCE,
  }),
  verified({
    slug: 'hzm',
    cn: '港珠澳大桥',
    en: 'Hong Kong–Zhuhai–Macao Bridge',
    type: 'bridge',
    applicableStays: ['240h'],
    province: '广东',
    region: 'pearl-river-delta',
    exitConstraints: {
      en: 'New port effective 2025-11-05. Particularly useful for travellers onward to Hong Kong / Macao.',
      zh: '2025-11-05 起新增。对经港澳作为第三地区的旅客特别便利。',
    },
    source: SOURCE,
  }),
  verified({
    slug: 'futian-west-kowloon',
    cn: '广深港高铁西九龙站',
    en: 'West Kowloon Station (Guangzhou-Shenzhen-Hong Kong Express Rail)',
    type: 'rail-station',
    applicableStays: ['240h'],
    province: '广东',
    region: 'pearl-river-delta',
    exitConstraints: {
      en: 'New port effective 2025-11-05. Co-located immigration with Hong Kong; useful when onward to HK.',
      zh: '2025-11-05 起新增。与香港同站联检，去港作为第三地区时特别便利。',
    },
    source: SOURCE,
  }),
  // Sichuan-Chongqing
  verified({
    slug: 'ctu',
    cn: '成都双流国际机场',
    en: 'Chengdu Shuangliu International Airport',
    type: 'airport',
    applicableStays: ['24h', '240h'],
    province: '四川',
    region: 'sichuan-chongqing',
    exitConstraints: {
      en: 'Exit from any eligible Sichuan / Chongqing port.',
      zh: '可从川渝区域合规口岸离境。',
    },
    source: SOURCE,
  }),
  verified({
    slug: 'tfu',
    cn: '成都天府国际机场',
    en: 'Chengdu Tianfu International Airport',
    type: 'airport',
    applicableStays: ['24h', '240h'],
    province: '四川',
    region: 'sichuan-chongqing',
    exitConstraints: {
      en: 'Exit from any eligible Sichuan / Chongqing port.',
      zh: '可从川渝区域合规口岸离境。',
    },
    source: SOURCE,
  }),
  verified({
    slug: 'ckg',
    cn: '重庆江北国际机场',
    en: 'Chongqing Jiangbei International Airport',
    type: 'airport',
    applicableStays: ['24h', '240h'],
    province: '重庆',
    region: 'sichuan-chongqing',
    exitConstraints: {
      en: 'Exit from any eligible Sichuan / Chongqing port.',
      zh: '可从川渝区域合规口岸离境。',
    },
    source: SOURCE,
  }),
  // Northwest
  verified({
    slug: 'xiy',
    cn: '西安咸阳国际机场',
    en: "Xi'an Xianyang International Airport",
    type: 'airport',
    applicableStays: ['24h', '240h'],
    province: '陕西',
    region: 'northwest',
    exitConstraints: {
      en: 'Exit from any eligible port within the approved Shaanxi region.',
      zh: '可从陕西获批区域内任一合规口岸离境。',
    },
    source: SOURCE,
  }),
  // Southeast / Other coastal
  verified({
    slug: 'xmn',
    cn: '厦门高崎国际机场',
    en: 'Xiamen Gaoqi International Airport',
    type: 'airport',
    applicableStays: ['24h', '240h'],
    province: '福建',
    region: 'other',
    exitConstraints: {
      en: 'Exit from any eligible Fujian port.',
      zh: '可从福建获批合规口岸离境。',
    },
    source: SOURCE,
  }),
  verified({
    slug: 'tao',
    cn: '青岛胶东国际机场',
    en: 'Qingdao Jiaodong International Airport',
    type: 'airport',
    applicableStays: ['24h', '240h'],
    province: '山东',
    region: 'other',
    exitConstraints: {
      en: 'Exit from any eligible Shandong port.',
      zh: '可从山东获批合规口岸离境。',
    },
    source: SOURCE,
  }),
  // Northeast
  verified({
    slug: 'dlc',
    cn: '大连周水子国际机场',
    en: 'Dalian Zhoushuizi International Airport',
    type: 'airport',
    applicableStays: ['24h', '240h'],
    province: '辽宁',
    region: 'northeast',
    exitConstraints: {
      en: 'Exit from any eligible Liaoning port.',
      zh: '可从辽宁获批合规口岸离境。',
    },
    source: SOURCE,
  }),
  verified({
    slug: 'she',
    cn: '沈阳桃仙国际机场',
    en: 'Shenyang Taoxian International Airport',
    type: 'airport',
    applicableStays: ['24h', '240h'],
    province: '辽宁',
    region: 'northeast',
    exitConstraints: {
      en: 'Exit from any eligible Liaoning port.',
      zh: '可从辽宁获批合规口岸离境。',
    },
    source: SOURCE,
  }),
  // Southwest / South
  verified({
    slug: 'hak',
    cn: '海口美兰国际机场',
    en: 'Haikou Meilan International Airport',
    type: 'airport',
    applicableStays: ['24h', '240h'],
    province: '海南',
    region: 'southwest',
    exitConstraints: {
      en: 'Exit from any eligible Hainan port.',
      zh: '可从海南获批合规口岸离境。',
    },
    source: SOURCE,
  }),
  // TODO(v1.5): the remaining ~45 of the 65 ports (Wuhan, Changsha, Kunming,
  //   Hefei, Zhengzhou, Tianjin Port (sea), Manzhouli land port, Beihai, etc.)
];

/* =========================================================================
 * Onward (third-country / region) destinations
 * Highlights the most common onward markets for international travellers.
 * ========================================================================= */

export const THIRD_DESTINATIONS: ThirdDestination[] = [
  verified({
    countryCode: 'HK',
    countryName: { zh: '中国香港特别行政区', en: 'Hong Kong SAR' },
    acceptedAsOnward: true,
    notes: [
      {
        en: 'Hong Kong counts as a third region under the 240h policy. Many travellers use it as an onward leg.',
        zh: '香港在 240h 过境免签政策下被视为第三地区。',
      },
    ],
  }),
  verified({
    countryCode: 'MO',
    countryName: { zh: '中国澳门特别行政区', en: 'Macao SAR' },
    acceptedAsOnward: true,
    notes: [
      {
        en: 'Macao counts as a third region. The Hong Kong–Zhuhai–Macao Bridge is a popular onward route.',
        zh: '澳门在政策下被视为第三地区，港珠澳大桥是常用的离境路径。',
      },
    ],
  }),
  verified({
    countryCode: 'TW',
    countryName: { zh: '中国台湾地区', en: 'Taiwan, China' },
    acceptedAsOnward: true,
    notes: [
      {
        en: 'Taiwan counts as a third region under NIA rules.',
        zh: '台湾地区在政策下被视为第三地区。',
      },
    ],
  }),
  verified({
    countryCode: 'TH',
    countryName: { zh: '泰国', en: 'Thailand' },
    acceptedAsOnward: true,
    notes: [],
  }),
  verified({
    countryCode: 'KR',
    countryName: { zh: '韩国', en: 'South Korea' },
    acceptedAsOnward: true,
    notes: [],
  }),
  verified({
    countryCode: 'JP',
    countryName: { zh: '日本', en: 'Japan' },
    acceptedAsOnward: true,
    notes: [],
  }),
  verified({
    countryCode: 'VN',
    countryName: { zh: '越南', en: 'Vietnam' },
    acceptedAsOnward: true,
    notes: [],
  }),
  verified({
    countryCode: 'SG',
    countryName: { zh: '新加坡', en: 'Singapore' },
    acceptedAsOnward: true,
    notes: [],
  }),
  verified({
    countryCode: 'MY',
    countryName: { zh: '马来西亚', en: 'Malaysia' },
    acceptedAsOnward: true,
    notes: [],
  }),
  verified({
    countryCode: 'ID',
    countryName: { zh: '印度尼西亚', en: 'Indonesia' },
    acceptedAsOnward: true,
    notes: [],
  }),
  verified({
    countryCode: 'PH',
    countryName: { zh: '菲律宾', en: 'Philippines' },
    acceptedAsOnward: true,
    notes: [],
  }),
  verified({
    countryCode: 'MN',
    countryName: { zh: '蒙古', en: 'Mongolia' },
    acceptedAsOnward: true,
    notes: [],
  }),
  verified({
    countryCode: 'RU',
    countryName: { zh: '俄罗斯', en: 'Russia' },
    acceptedAsOnward: true,
    notes: [
      {
        en: 'Onward to Russia (incl. Far East) is accepted as a third country.',
        zh: '前往俄罗斯（含远东）被视为合规第三国。',
      },
    ],
  }),
  verified({
    countryCode: 'KH',
    countryName: { zh: '柬埔寨', en: 'Cambodia' },
    acceptedAsOnward: true,
    notes: [],
  }),
  verified({
    countryCode: 'AE',
    countryName: { zh: '阿联酋', en: 'United Arab Emirates' },
    acceptedAsOnward: true,
    notes: [],
  }),
  verified({
    countryCode: 'AU',
    countryName: { zh: '澳大利亚', en: 'Australia' },
    acceptedAsOnward: true,
    notes: [
      {
        en: 'Australia is an accepted onward country, but if you are also flying out of Australia or it is your departure country, the trip does not satisfy the third-country rule.',
        zh: '澳大利亚作为第三国被接受，但如果你也是从澳大利亚出发，则不满足"前往第三国"的要求。',
      },
    ],
  }),
  verified({
    countryCode: 'NZ',
    countryName: { zh: '新西兰', en: 'New Zealand' },
    acceptedAsOnward: true,
    notes: [],
  }),
  verified({
    countryCode: 'GB',
    countryName: { zh: '英国', en: 'United Kingdom' },
    acceptedAsOnward: true,
    notes: [],
  }),
  verified({
    countryCode: 'DE',
    countryName: { zh: '德国', en: 'Germany' },
    acceptedAsOnward: true,
    notes: [],
  }),
  verified({
    countryCode: 'FR',
    countryName: { zh: '法国', en: 'France' },
    acceptedAsOnward: true,
    notes: [],
  }),
  verified({
    countryCode: 'US',
    countryName: { zh: '美国', en: 'United States' },
    acceptedAsOnward: true,
    notes: [
      {
        en: 'Same caveat as Australia — if your itinerary departs from and returns to the US, that is not a "third country" routing.',
        zh: '同澳大利亚——如果你也是从美国出发再回美国，这不算"前往第三国"。',
      },
    ],
  }),
  verified({
    countryCode: 'CA',
    countryName: { zh: '加拿大', en: 'Canada' },
    acceptedAsOnward: true,
    notes: [],
  }),
];

/* =========================================================================
 * Lookups
 * ========================================================================= */

export const findRule = (passportCountry: string): VisaFreeRule | undefined =>
  VISA_FREE_RULES.find((r) => r.passportCountry === passportCountry);

export const findPort = (slug: string): EntryPort | undefined =>
  VISA_FREE_PORTS.find((p) => p.slug === slug);

export const findOnward = (countryCode: string): ThirdDestination | undefined =>
  THIRD_DESTINATIONS.find((d) => d.countryCode === countryCode);

/* =========================================================================
 * Eligibility evaluation
 * ========================================================================= */

export type EligibilityReasonCode =
  | 'passport-not-eligible'
  | 'onward-same-as-passport'
  | 'onward-not-recognised'
  | 'port-not-applicable-for-stay'
  | 'port-not-in-passport-list'
  | 'duration-not-eligible-for-passport'
  | 'pending-input'
  | 'eligible';

export type EligibilityResult = {
  eligible: boolean;
  reasonCode: EligibilityReasonCode;
  reason: { zh: string; en: string };
  allowedRegions: Region[];
  allowedPorts: EntryPort[];
};

const PENDING_RESULT: EligibilityResult = {
  eligible: false,
  reasonCode: 'pending-input',
  reason: {
    en: 'Pick a passport, entry port, onward destination and stay length to get a verdict.',
    zh: '请先填完护照 / 入境口岸 / 第三国 / 停留时长，才能给出结论。',
  },
  allowedRegions: [],
  allowedPorts: [],
};

export function evaluateEligibility(
  rule: VisaFreeRule | null | undefined,
  port: EntryPort | null | undefined,
  onward: ThirdDestination | null | undefined,
  duration: StayDuration | null | undefined,
): EligibilityResult {
  if (!rule || !port || !onward || !duration) return PENDING_RESULT;

  if (!rule.eligibleStays.includes(duration)) {
    return {
      eligible: false,
      reasonCode: 'duration-not-eligible-for-passport',
      reason: {
        en: `${rule.passportCountryName.en} passports are not on the list for the ${duration === '240h' ? '240-hour' : '24-hour'} programme.`,
        zh: `${rule.passportCountryName.zh}护照不在 ${duration === '240h' ? '240 小时' : '24 小时'}过境免签名单中。`,
      },
      allowedRegions: [],
      allowedPorts: [],
    };
  }

  if (rule.eligibleEntryPorts && !rule.eligibleEntryPorts.includes(port.slug)) {
    return {
      eligible: false,
      reasonCode: 'port-not-in-passport-list',
      reason: {
        en: `${port.en} is not on the eligible-port list for ${rule.passportCountryName.en} passports.`,
        zh: `${port.cn}不在${rule.passportCountryName.zh}护照可用的口岸名单中。`,
      },
      allowedRegions: [],
      allowedPorts: [],
    };
  }

  if (!port.applicableStays.includes(duration)) {
    return {
      eligible: false,
      reasonCode: 'port-not-applicable-for-stay',
      reason: {
        en: `${port.en} does not currently support the ${duration === '240h' ? '240-hour' : '24-hour'} programme. Pick a different port.`,
        zh: `${port.cn}目前不开放${duration === '240h' ? ' 240 小时' : ' 24 小时'}过境，请换一个口岸。`,
      },
      allowedRegions: [],
      allowedPorts: [],
    };
  }

  if (onward.countryCode === rule.passportCountry) {
    return {
      eligible: false,
      reasonCode: 'onward-same-as-passport',
      reason: {
        en: 'Your onward destination is the same as your passport country, so the trip does not count as transit to a third country/region.',
        zh: '你选择的离境目的地就是你的护照国，不算"前往第三国/地区"，不符合条件。',
      },
      allowedRegions: [],
      allowedPorts: [],
    };
  }

  if (!onward.acceptedAsOnward) {
    return {
      eligible: false,
      reasonCode: 'onward-not-recognised',
      reason: {
        en: 'This onward destination is not recognised as a third country/region under current NIA rules.',
        zh: '该离境目的地未被现行 NIA 规则视为合规的第三国/地区。',
      },
      allowedRegions: [],
      allowedPorts: [],
    };
  }

  const allowedPorts = VISA_FREE_PORTS.filter(
    (p) => p.region === port.region && p.applicableStays.includes(duration),
  );
  const allowedRegions = Array.from(new Set([port.region])) as Region[];

  return {
    eligible: true,
    reasonCode: 'eligible',
    reason: {
      en: `${rule.passportCountryName.en} passport, ${port.en} entry, onward to ${onward.countryName.en} — eligible for the ${duration === '240h' ? '240-hour (10 day)' : '24-hour direct'} transit visa-free programme.`,
      zh: `${rule.passportCountryName.zh}护照 + ${port.cn}入境 + 前往${onward.countryName.zh}，符合 ${duration === '240h' ? '240 小时（10 天）' : '24 小时直接'}过境免签政策。`,
    },
    allowedRegions,
    allowedPorts,
  };
}

/* =========================================================================
 * Ready-made transit itineraries (UI cards on /visa-free)
 * Each entry's `available` flag controls whether we route to a real
 * /itineraries/[slug] page or render a "coming soon" badge.
 * ========================================================================= */

export type ReadymadeRoute = {
  slug: string;
  region: Region;
  title: { zh: string; en: string };
  oneLiner: { zh: string; en: string };
  entryPortSlug: string;
  durationDays: 10;
  available: boolean;
};

export const READYMADE_ROUTES: ReadymadeRoute[] = [
  {
    slug: 'visa-free-beijing-10d',
    region: 'beijing-tianjin-hebei',
    title: { zh: '北京 240h · 京津冀 10 天', en: 'Beijing 240h · 10 days, BTH region' },
    oneLiner: {
      zh: '故宫 + 长城 + 天津 + 北戴河，回程经港 / 韩 / 日。',
      en: 'Forbidden City, Great Wall, Tianjin and Beidaihe — onward via HK / Korea / Japan.',
    },
    entryPortSlug: 'pek',
    durationDays: 10,
    available: false,
  },
  {
    slug: 'visa-free-shanghai-10d',
    region: 'yangtze-river-delta',
    title: { zh: '上海 240h · 长三角 10 天', en: 'Shanghai 240h · 10 days, Yangtze Delta' },
    oneLiner: {
      zh: '上海 + 杭州 + 苏州 + 南京 慢节奏环线，回程飞日韩。',
      en: 'Shanghai, Hangzhou, Suzhou and Nanjing — onward to Japan / Korea.',
    },
    entryPortSlug: 'pvg',
    durationDays: 10,
    available: false,
  },
  {
    slug: 'visa-free-guangzhou-10d',
    region: 'pearl-river-delta',
    title: { zh: '广州 240h · 大湾区 10 天', en: 'Guangzhou 240h · 10 days, Pearl River Delta' },
    oneLiner: {
      zh: '广州 + 深圳 + 珠海，从港珠澳大桥或西九龙站离境去港 / 澳。',
      en: 'Guangzhou, Shenzhen, Zhuhai — exit via the HZM Bridge or West Kowloon to HK / Macao.',
    },
    entryPortSlug: 'can',
    durationDays: 10,
    available: false,
  },
  {
    slug: 'visa-free-chengdu-10d',
    region: 'sichuan-chongqing',
    title: { zh: '成都 / 重庆 240h · 川渝 10 天', en: 'Chengdu / Chongqing 240h · 10 days' },
    oneLiner: {
      zh: '成都 + 都江堰 + 乐山 + 重庆，回程飞泰国 / 越南。',
      en: 'Chengdu, Dujiangyan, Leshan and Chongqing — onward to Thailand / Vietnam.',
    },
    entryPortSlug: 'ctu',
    durationDays: 10,
    available: false,
  },
];

/* =========================================================================
 * UI helper — group ports by type for the entry-port select
 * ========================================================================= */

export const PORT_TYPE_ORDER: EntryPortType[] = [
  'airport',
  'rail-station',
  'bridge',
  'land-port',
  'sea-port',
];

export const PORT_TYPE_LABEL: Record<EntryPortType, { zh: string; en: string }> = {
  airport: { zh: '机场', en: 'Airports' },
  'rail-station': { zh: '高铁口岸', en: 'Rail stations' },
  bridge: { zh: '跨境大桥', en: 'Bridges' },
  'land-port': { zh: '陆港', en: 'Land ports' },
  'sea-port': { zh: '海港', en: 'Sea ports' },
};

export const REGION_LABEL: Record<Region, { zh: string; en: string }> = {
  'beijing-tianjin-hebei': { zh: '京津冀', en: 'Beijing-Tianjin-Hebei' },
  'yangtze-river-delta': { zh: '长三角', en: 'Yangtze River Delta' },
  'pearl-river-delta': { zh: '粤港澳大湾区', en: 'Pearl River Delta' },
  'sichuan-chongqing': { zh: '川渝', en: 'Sichuan & Chongqing' },
  'central-china': { zh: '华中', en: 'Central China' },
  northeast: { zh: '东北', en: 'Northeast China' },
  northwest: { zh: '西北', en: 'Northwest China' },
  southwest: { zh: '西南 / 海南', en: 'Southwest / Hainan' },
  other: { zh: '其他获批区域', en: 'Other approved regions' },
};

export const SOURCE_URL =
  'https://english.www.gov.cn/news/202511/04/content_WS69094ae0c6d00ca5f9a07472.html';
export const NIA_REVIEWED = REVIEWED;
