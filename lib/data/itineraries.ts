/**
 * lib/data/itineraries.ts — 5 itinerary mock 数据（Phase 2.5）。
 *
 * 整套 itinerary data 标 status: 'hidden'，由页面级 <MockBadge /> 守门
 * （spec §6.5 Mock guard release gate 扫描该字段 + JSX 引用）。
 *
 * 文案为 worker 自写占位（不复制 chinahighlights 任何文字）：
 *   - 价格区间 USD 起价占位（标 MockBadge 参考价位）
 *   - 酒店等级真实分级（3-star / 4-star / 5-star）但具体酒店名字不放
 *   - 含/不含项写实，但不绑定具体供应商
 *   - 行程逐日 morning/afternoon/evening 节奏自写
 *
 * 真值字段：
 *   - days、bestMonths（月份冷暖大势按真实历史平均）
 *   - city 名（GPS 真实地理）
 *   - 240h 过境免签 24 省级区域 / 65 口岸（NIA 2025-11-04 公告，参考 visa-free.ts）
 */

import type { DestinationSlug } from '@/lib/data/destinations';

export type Bilingual = { zh: string; en: string };

export type HotelClass =
  | '3-star'
  | '4-star'
  | '5-star'
  | 'luxury'
  | 'simple';

export type DayPart = 'morning' | 'afternoon' | 'evening';

export type DayActivity = {
  activity: Bilingual;
  minutes: number;
  note?: Bilingual;
};

export type DayBlock = {
  day: number;
  city: string;
  cityCn?: string;
  morning: DayActivity[];
  afternoon: DayActivity[];
  evening: DayActivity[];
  images: { src: string; alt: Bilingual }[];
  tailorMakeTip?: Bilingual;
};

export type GlanceRow = {
  day: number;
  cities: string[];
  oneLine: Bilingual;
};

export type Highlight = {
  icon: 'wall' | 'mountain' | 'water' | 'temple' | 'food' | 'sunrise' | 'sunset' | 'compass' | 'star' | 'heart' | 'family' | 'photo';
  zh: string;
  en: string;
};

export type ItineraryTheme =
  | 'first-time'
  | 'visa-free'
  | 'family'
  | 'honeymoon'
  | 'nature'
  | 'culture'
  | 'food';

export type Itinerary = {
  slug: string;
  title: Bilingual;
  kicker: Bilingual;
  days: number;
  priceFromUsd: number;
  bestMonths: string[];
  themes: ItineraryTheme[];
  destinations: (DestinationSlug | string)[];
  hero: { src: string; alt: Bilingual };
  intro: Bilingual;
  glance: GlanceRow[];
  dayByDay: DayBlock[];
  highlights: Highlight[];
  pricing: {
    base: { hotelClass: HotelClass; usdPerNight: number; note?: Bilingual }[];
    inclusions: Bilingual[];
    exclusions: Bilingual[];
  };
  tailorMakeTips: Bilingual[];
  tripNotes: {
    accommodation: Bilingual;
    transportation: Bilingual;
    meals: Bilingual;
    visa: Bilingual;
  };
  advisorSlug: string;
  status: 'hidden';
};

const HERO_BY_SLUG: Record<string, { src: string; alt: Bilingual }> = {
  'sample-10d': {
    src: '/landmarks/beijing.jpg',
    alt: {
      zh: '北京慕田峪长城秋色，城楼在金黄树林中蜿蜒',
      en: 'Mutianyu Great Wall winding through autumn forest near Beijing',
    },
  },
  'visa-free-240h-beijing': {
    src: '/landmarks/beijing.jpg',
    alt: {
      zh: '北京天坛祈年殿前的红墙广场',
      en: 'Hall of Prayer for Good Harvests at the Temple of Heaven, Beijing',
    },
  },
  'family-12d': {
    src: '/landmarks/zhangjiajie.jpg',
    alt: {
      zh: '张家界国家森林公园砂岩峰林晨雾',
      en: 'Sandstone pillars rising from morning mist in Zhangjiajie National Forest Park',
    },
  },
  'honeymoon-9d': {
    src: '/landmarks/lijiang-night.jpg',
    alt: {
      zh: '丽江古城夜色，红灯笼倒映在四方街水道里',
      en: 'Lijiang old town at night, red lanterns reflected on the Sifang canal',
    },
  },
  'nature-14d': {
    src: '/landmarks/jiuzhaigou.jpg',
    alt: {
      zh: '九寨沟五花海秋色，翡翠水面映出层林',
      en: 'Five Flower Lake in Jiuzhaigou, autumn forest mirrored on jade water',
    },
  },
};

// ─── 1. sample-10d ─────────────────────────────────────────
const sample10d: Itinerary = {
  slug: 'sample-10d',
  title: {
    zh: '10 天第一次来中国 · 文化与山水平衡线',
    en: '10-day first-timer China · Culture & landscape balanced',
  },
  kicker: {
    zh: 'ROUTE · FIRST TIME IN CHINA',
    en: 'ROUTE · FIRST TIME IN CHINA',
  },
  days: 10,
  priceFromUsd: 2800,
  bestMonths: ['Apr', 'May', 'Sep', 'Oct'],
  themes: ['first-time', 'culture', 'nature'],
  destinations: ['beijing', 'xian', 'zhangjiajie', 'guilin', 'shanghai'],
  hero: HERO_BY_SLUG['sample-10d'],
  intro: {
    zh: '第一次来中国不要赶 12 站。这条 10 天路线是我们写过最稳的入门节奏：北京两天古都厚重感，西安两天秦汉骨架，张家界两天峰林透气，桂林两天山水抒情，上海两天现代收尾。每一段你都有半天的留白，回酒店休息或者随便走走。',
    en: "First time in China? Don't try to cram in 12 cities. This 10-day baseline is the steadiest first-timer rhythm we know: two days in Beijing for imperial weight, two in Xi'an for Han-Tang bones, two in Zhangjiajie to breathe, two in Guilin for lyrical karst, two in Shanghai to land back in the present. Every leg includes a half day of slack so you can nap or just wander.",
  },
  glance: [
    {
      day: 1,
      cities: ['Beijing'],
      oneLine: { zh: '抵达北京 · 胡同安顿', en: 'Land in Beijing · settle in a hutong' },
    },
    {
      day: 2,
      cities: ['Beijing'],
      oneLine: { zh: '故宫开门即入 · 长城慕田峪段', en: 'Forbidden City at opening · Mutianyu wall ramble' },
    },
    {
      day: 3,
      cities: ['Beijing', "Xi'an"],
      oneLine: { zh: '高铁 4.5h 转西安 · 城墙骑行', en: "4.5h bullet train to Xi'an · cycle the city wall" },
    },
    {
      day: 4,
      cities: ["Xi'an"],
      oneLine: { zh: '兵马俑半日 · 回民街晚饭', en: 'Terracotta Warriors half day · Muslim Quarter dinner' },
    },
    {
      day: 5,
      cities: ["Xi'an", 'Zhangjiajie'],
      oneLine: { zh: '飞张家界 · 进山休整', en: 'Fly to Zhangjiajie · ease into the mountains' },
    },
    {
      day: 6,
      cities: ['Zhangjiajie'],
      oneLine: { zh: '袁家界峰林 · 玻璃栈道', en: 'Yuanjiajie sandstone pillars · glass walkway' },
    },
    {
      day: 7,
      cities: ['Zhangjiajie', 'Guilin'],
      oneLine: { zh: '飞桂林 · 漓江日落', en: 'Fly to Guilin · sunset on the Li River' },
    },
    {
      day: 8,
      cities: ['Guilin', 'Yangshuo'],
      oneLine: { zh: '漓江竹筏 · 阳朔骑行', en: 'Bamboo raft on the Li · cycle around Yangshuo' },
    },
    {
      day: 9,
      cities: ['Guilin', 'Shanghai'],
      oneLine: { zh: '飞上海 · 外滩夜色', en: 'Fly to Shanghai · the Bund after dark' },
    },
    {
      day: 10,
      cities: ['Shanghai'],
      oneLine: { zh: '老城厢 · 自由时间 · 返程', en: 'Old town wander · free time · departure' },
    },
  ],
  dayByDay: [
    {
      day: 1,
      city: 'Beijing',
      cityCn: '北京',
      morning: [
        {
          activity: { zh: '抵达首都机场，司机在出口举名牌接你', en: 'Land at PEK · advisor-arranged driver meets you with a name card' },
          minutes: 60,
          note: { zh: '海关高峰期可以走电子通道，免排长队；如果你有加急，顾问会提前发短信告知队伍状态', en: 'Use the e-channel at peak hours to skip the long queue; the advisor texts you the line status before you land if it spikes' },
        },
        {
          activity: { zh: '车上喝顾问准备的清茶 + 一份当天行程便签', en: 'Sip jasmine tea on the way in · the advisor leaves a one-page schedule on the seat' },
          minutes: 30,
        },
      ],
      afternoon: [
        {
          activity: { zh: '入住胡同精品酒店 · 短暂午休', en: 'Check in at a hutong boutique hotel · short rest' },
          minutes: 90,
          note: { zh: '我们会预留早入住，房间提前打扫好；若航班严重晚点，顾问可改成隔日补课方案', en: 'We block early check-in so the room is ready; if your flight slips dramatically the advisor reshuffles day one without losing time' },
        },
        {
          activity: { zh: '钟鼓楼一带轻散步，找一家本地面馆吃第一顿', en: 'Easy stroll around the Bell & Drum Tower; first meal at a neighbourhood noodle shop' },
          minutes: 90,
          note: { zh: '走路别走太远，倒时差第一天体力先存着', en: 'Keep distance short — save energy for jet-lag day one' },
        },
        {
          activity: { zh: '南锣鼓巷北端书店半小时 · 让眼睛习惯北京的字体', en: 'Drop into a calm bookshop on the quiet north end of Nanluoguxiang for thirty minutes' },
          minutes: 30,
        },
      ],
      evening: [
        {
          activity: { zh: '什刹海湖边晚饭，看老北京晚课鸽哨', en: 'Dinner by Shichahai lake — listen for the dusk pigeon whistles of old Beijing' },
          minutes: 90,
          note: { zh: '湖边是北京最像电影的一段；选靠水侧的桌子，鸽哨从屋顶飘过来时停下吃半口', en: 'The lakeside is the most cinematic block in Beijing — pick a table by the water and pause when the pigeon whistles drift over the rooftops' },
        },
        {
          activity: { zh: '回酒店泡温水澡 · 行前支持信息确认明早叫醒和早餐时间', en: 'Warm bath at the hotel · support note confirms tomorrow\'s wake-up and breakfast time' },
          minutes: 60,
        },
      ],
      images: [
        {
          src: '/landmarks/beijing.jpg',
          alt: { zh: '北京胡同清晨光线', en: 'Morning light filtering through a Beijing hutong' },
        },
        {
          src: '/landmarks/beijing.jpg',
          alt: { zh: '什刹海黄昏的渔船和鸽群', en: 'Fishing boats and pigeon flocks at dusk on Shichahai lake' },
        },
      ],
      tailorMakeTip: {
        zh: '想直接进 798 看当代艺术？也可以把 D1 下午改成艺术区半日。',
        en: 'Prefer to swap in a half day at the 798 art district? Easy to rearrange.',
      },
    },
    {
      day: 2,
      city: 'Beijing',
      cityCn: '北京',
      morning: [
        {
          activity: { zh: '7:30 进故宫午门，赶在团客之前走完三大殿', en: 'At the Meridian Gate by 7:30 — finish the three main halls before tour groups arrive' },
          minutes: 180,
          note: { zh: '导览预约必须提前 7 天，我们会替你抢；顾问还会准备一张折页讲解每殿的功能与脊兽含义', en: 'Slots open 7 days ahead and we book the moment they release; the guide hands you a leaflet that decodes each hall and the roof beasts above it' },
        },
        {
          activity: { zh: '从神武门出 · 景山万春亭俯看故宫中轴线', en: 'Exit via Shenwumen · climb to Wanchun Pavilion on Jingshan to see the full Forbidden City axis' },
          minutes: 60,
        },
      ],
      afternoon: [
        {
          activity: { zh: '驱车 90 分钟到慕田峪长城，缆车上去走 4–10 号烽火台', en: 'Drive 90 min to Mutianyu · cable car up, walk towers 4–10' },
          minutes: 240,
          note: { zh: '比八达岭少一半人，城墙原状更完整；缆车上下都可选，膝盖不舒服的旅客直接坐缆车', en: 'Half the crowds of Badaling, more original masonry; cable car works both ways for travellers with knee concerns' },
        },
        {
          activity: { zh: '滑车下山 · 体验段不算景点的"非典型长城"亮点', en: 'Toboggan back down — an off-script highlight that isn\'t in the official brochure' },
          minutes: 30,
          note: { zh: '滑车是孩子和成年人都偷偷喜欢的部分；雨天会停运，顾问当天定', en: 'Both kids and adults secretly love the toboggan; we confirm same-day since it pauses in heavy rain' },
        },
      ],
      evening: [
        {
          activity: { zh: '回城路上吃顺义本地烤鸭店 · 不是观光街那家', en: 'Stop at a Shunyi-side roast duck spot on the way back — not the tourist branch' },
          minutes: 90,
          note: { zh: '我们带去的店连侍者都用筷子帮你切鸭皮蘸糖；前门那家的等位你不会想排', en: 'The waiter cuts the crisp skin to dip in sugar at our pick — you do not want the Qianmen tourist queue' },
        },
        {
          activity: { zh: '酒店附近老茶馆喝一壶花茶 · 简短聊明早行程', en: 'Wind down with a pot of jasmine tea at a hotel-side teahouse · advisor walks you through tomorrow\'s rail leg' },
          minutes: 60,
        },
      ],
      images: [
        {
          src: '/landmarks/beijing.jpg',
          alt: { zh: '故宫太和殿前广场清晨', en: 'Empty courtyard before the Hall of Supreme Harmony at dawn' },
        },
        {
          src: '/landmarks/beijing.jpg',
          alt: { zh: '慕田峪长城原状段秋色', en: 'Unrestored Mutianyu Wall in autumn light' },
        },
        {
          src: '/landmarks/beijing.jpg',
          alt: { zh: '景山万春亭俯瞰故宫中轴线', en: 'Forbidden City central axis seen from Wanchun Pavilion' },
        },
      ],
    },
    {
      day: 3,
      city: "Xi'an",
      cityCn: '西安',
      morning: [
        {
          activity: { zh: '北京南站 9:00 高铁出发 · 4.5 小时到西安北', en: '09:00 bullet train from Beijing South · 4.5h to Xi\'an North' },
          minutes: 270,
          note: { zh: '商务座单人 USD 110，一等座 USD 70；推荐一等座，餐车走一趟看高铁怎么穿过华北平原', en: 'Business pod is USD 110, first class USD 70; we suggest first class — walk to the dining car at least once to watch the train slice through the North China plain' },
        },
      ],
      afternoon: [
        {
          activity: { zh: '入住钟楼酒店 · 步行 5 分钟即古城墙', en: 'Check in near the Bell Tower · 5-min walk to the city wall' },
          minutes: 60,
        },
        {
          activity: { zh: '城墙上租自行车骑一圈 13.7 公里 · 城外是夜市，城内是回族老坊', en: 'Rent a bike on top of the wall · 13.7km loop, dusk markets outside and Hui-quarter alleys inside' },
          minutes: 150,
          note: { zh: '黄昏前上城墙最舒服，避开正午暴晒；老人和孩子可以租电瓶车环城，半小时绕完', en: 'Climb up before dusk to dodge the midday glare; older travellers and kids can take the electric carts and finish the loop in half an hour' },
        },
        {
          activity: { zh: '城墙下永宁门看一段唐礼仪式表演 · 免费露天', en: 'Stop at the foot of Yongning Gate for the open-air Tang court ritual · free, full kit' },
          minutes: 30,
        },
      ],
      evening: [
        {
          activity: { zh: '回民街吃 biangbiang 面 + 葫芦头泡馍', en: 'Muslim Quarter dinner — biangbiang noodles and hulutou paomo' },
          minutes: 90,
          note: { zh: '主街太挤，我们带你绕进侧巷的本地铺；点单用顾问写好的中文便签直接递给老板', en: 'Skip the main drag — we take you to the side-alley spots locals queue at, and your advisor pre-writes a Chinese order slip you hand the cook' },
        },
        {
          activity: { zh: '回酒店楼下打包一壶西凤酒 · 晚上跟同行人小酌一杯', en: 'Pick up a flask of Xifeng spirits on the way back · share a small toast with your travel partners' },
          minutes: 30,
        },
      ],
      images: [
        {
          src: '/landmarks/xian.jpg',
          alt: { zh: '西安古城墙黄昏骑行', en: 'Cycling on top of the Xi\'an city wall at dusk' },
        },
        {
          src: '/landmarks/xian.jpg',
          alt: { zh: '西安回民街夜灯下的人潮', en: 'Lantern-lit crowds in the Xi\'an Muslim Quarter' },
        },
        {
          src: '/landmarks/xian.jpg',
          alt: { zh: '永宁门唐礼仪式表演', en: 'Tang dynasty ritual reenactment at Yongning Gate' },
        },
      ],
      tailorMakeTip: {
        zh: '不想骑车？换成城墙慢走 + 城内书院门古书市半日。',
        en: 'Skip the bike? Swap in a slow wall walk plus the Shuyuanmen calligraphy lane.',
      },
    },
    {
      day: 4,
      city: "Xi'an",
      cityCn: '西安',
      morning: [
        {
          activity: { zh: '8:30 出发兵马俑 · 1 号坑先看，再倒回去 2、3 号', en: '08:30 to the Terracotta Warriors · pit 1 first, then 2 and 3 in reverse' },
          minutes: 240,
          note: { zh: '逆时针参观避开人潮高峰', en: 'Going counter-clockwise dodges the busiest pit-1 crowd window' },
        },
      ],
      afternoon: [
        {
          activity: { zh: '回西安市区，午饭在大唐不夜城旁边一家面庄歇脚', en: 'Back to Xi\'an for lunch at a noodle house just off Datang Everbright City' },
          minutes: 90,
        },
        {
          activity: { zh: '陕西历史博物馆 · 重点看周秦汉唐四个展厅', en: 'Shaanxi History Museum · focus on the Zhou, Qin, Han and Tang halls' },
          minutes: 150,
          note: { zh: '免费票需要预约，我们提前帮你订好', en: 'Free tickets must be reserved 1–2 days ahead; we book for you' },
        },
      ],
      evening: [
        {
          activity: { zh: '大雁塔北广场喷泉 · 自由时间逛唐风街区', en: 'Big Wild Goose Pagoda fountain show · self-paced wander through the Tang-style streets' },
          minutes: 120,
        },
      ],
      images: [
        {
          src: '/landmarks/xian.jpg',
          alt: { zh: '西安兵马俑一号坑全景', en: 'Panorama of pit one at the Terracotta Warriors site' },
        },
      ],
    },
    {
      day: 5,
      city: 'Zhangjiajie',
      cityCn: '张家界',
      morning: [
        {
          activity: { zh: '上午西安飞张家界 · 飞行 2.5 小时', en: 'Morning flight to Zhangjiajie · 2.5h in the air' },
          minutes: 180,
        },
      ],
      afternoon: [
        {
          activity: { zh: '入住国家森林公园外的景区酒店 · 在公园门口', en: 'Check in at a park-gate hotel just outside Zhangjiajie National Forest Park' },
          minutes: 60,
        },
        {
          activity: { zh: '走金鞭溪溪谷一段轻徒步 · 不进核心景区，先适应海拔', en: 'Easy walk along the Golden Whip Stream · stay out of the cable-car zone today, ease into the altitude' },
          minutes: 180,
          note: { zh: '第一天进山不上玻璃栈道，腿留给明天', en: "Don't tackle the glass walkway today — save your legs for tomorrow" },
        },
      ],
      evening: [
        {
          activity: { zh: '酒店里吃湘西土家菜 · 早睡，明天 6 点出发', en: 'Tujia mountain dinner at the hotel · early bed, 06:00 start tomorrow' },
          minutes: 60,
        },
      ],
      images: [
        {
          src: '/landmarks/zhangjiajie.jpg',
          alt: { zh: '张家界峰林晨雾', en: 'Sandstone pillars in morning mist, Zhangjiajie' },
        },
      ],
      tailorMakeTip: {
        zh: '高血压或膝盖不好的旅客，我们会把 D6 玻璃栈道直接换成袁家界缆车线。',
        en: 'For travellers with knee or pressure concerns, we swap the D6 glass walkway for the Yuanjiajie cable line.',
      },
    },
    {
      day: 6,
      city: 'Zhangjiajie',
      cityCn: '张家界',
      morning: [
        {
          activity: { zh: '6:00 进山 · 百龙天梯上袁家界 · 看哈利路亚山日出后的雾', en: '06:00 enter park · Bailong elevator up to Yuanjiajie · watch the post-dawn mist around the Hallelujah pillar' },
          minutes: 240,
          note: { zh: '6 点开闸的人是当天最少的；天梯垂直 326 米只要 1 分 58 秒，建议站缆厢中段以减晕眩', en: 'A 6 a.m. arrival hits the lightest crowd window of the day; the lift climbs 326 m in 1 min 58 s — stand mid-cabin to ease the swing' },
        },
        {
          activity: { zh: '迷魂台 · 御笔峰 · 几个不挤的小观景台轮一圈', en: 'Loop the quieter viewpoints — Mihun, Yubi and a couple of side terraces' },
          minutes: 60,
        },
      ],
      afternoon: [
        {
          activity: { zh: '天子山高山线 · 步行 6 公里看 6 个观景台', en: 'Tianzi mountain ridge trail · 6km past 6 viewpoints' },
          minutes: 180,
          note: { zh: '走完一段在贺龙公园歇脚 · 那里有少见的角度看砂岩从林海里冒出来', en: 'Take the break at He Long Park — it offers a less-photographed angle on the pillars rising out of the canopy' },
        },
        {
          activity: { zh: '景区内吃湘西土家米饭团 + 腌菜简餐', en: 'In-park lunch — a Tujia rice ball with pickled greens · the only honest meal inside the gates' },
          minutes: 60,
        },
      ],
      evening: [
        {
          activity: { zh: '回酒店泡澡 · 不安排表演 · 让山的安静收尾', en: "Back to hotel for a soak · no shows tonight · let the mountain quiet land" },
          minutes: 90,
          note: { zh: '魅力湘西大型表演口碑两极，我们默认不排，需要可以加；今晚把空白还给山的余响', en: 'Opinions on the "Charming Xiangxi" mega-show are split — we keep the night blank by default so the mountain stays in your head' },
        },
        {
          activity: { zh: '酒店阳台听蛙声 · 顾问发明天天气 + 出发时间', en: 'Listen to frogs from the balcony · advisor pings tomorrow\'s weather and call time' },
          minutes: 30,
        },
      ],
      images: [
        {
          src: '/landmarks/zhangjiajie.jpg',
          alt: { zh: '袁家界天子山观景台峰林', en: 'Sandstone pillars seen from the Tianzi ridge viewpoint' },
        },
        {
          src: '/landmarks/zhangjiajie.jpg',
          alt: { zh: '哈利路亚山雾中露出的尖峰', en: 'Hallelujah pillar emerging through morning mist' },
        },
        {
          src: '/landmarks/zhangjiajie.jpg',
          alt: { zh: '百龙天梯垂直上升画面', en: 'The Bailong elevator rising along the cliff face' },
        },
      ],
    },
    {
      day: 7,
      city: 'Guilin',
      cityCn: '桂林',
      morning: [
        {
          activity: { zh: '张家界荷花机场早班飞桂林 · 飞行 1.5 小时', en: 'Early flight from Zhangjiajie to Guilin · 1.5h' },
          minutes: 90,
          note: { zh: '建议靠左侧靠窗位 · 飞越喀斯特云贵接界处时风景比片子还好看', en: 'Ask for a left-window seat — crossing the karst belt at the Yunnan-Guizhou edge is more cinematic than any drone reel' },
        },
        {
          activity: { zh: '桂林两江机场 · 司机直接送阳朔 · 1 小时高速', en: 'Guilin Liangjiang airport · driver heads straight to Yangshuo · 1h on the expressway' },
          minutes: 60,
        },
      ],
      afternoon: [
        {
          activity: { zh: '入住阳朔西街酒店 · 不留在桂林市区', en: 'Check in at a Yangshuo West Street hotel · skip Guilin city, base in Yangshuo' },
          minutes: 60,
          note: { zh: '阳朔住一晚比桂林市住三晚有趣；我们选离西街 5 分钟但拐进竹林的小酒店，避开酒吧街声音', en: 'One night in Yangshuo beats three in Guilin city — that\'s where the karst lives; we book a small hotel five minutes off West Street, tucked behind bamboo, away from the bar lane noise' },
        },
        {
          activity: { zh: '遇龙河竹筏漂流半日 · 比漓江主流人少', en: 'Half-day bamboo raft on the Yulong River · quieter than the main Li River route' },
          minutes: 180,
          note: { zh: '阳朔遇龙河比桂林漓江主航道少 60% 人；筏工是顾问签约长期合作的，会带你停在 4 个本地拍照点', en: 'Yulong runs about 60 % less crowded than the main Guilin–Yangshuo Li River route, and our long-term raft pilots stop at four photo points other crews skip' },
        },
      ],
      evening: [
        {
          activity: { zh: '阳朔西街 · 不去酒吧街，找城南本地餐馆吃啤酒鱼', en: 'Yangshuo West Street · avoid the bar lane, head south to a local spot for beer fish' },
          minutes: 120,
          note: { zh: '啤酒鱼用的是漓江野生剑骨鱼 + 漓泉啤酒；本地店把鱼现杀，整鱼半小时上桌，皮焦肉嫩', en: 'Beer fish uses wild Lijiang dagger fish with Lijiang Spring beer; the local spot prepares it on the spot — half an hour from kitchen to table, crisp skin and silky flesh' },
        },
        {
          activity: { zh: '回酒店阳台 · 山的轮廓在月光下变成剪影', en: 'Back to the hotel balcony · karst silhouettes against moonlight' },
          minutes: 30,
        },
      ],
      images: [
        {
          src: '/landmarks/guilin.jpg',
          alt: { zh: '漓江竹筏与喀斯特山', en: 'Bamboo raft drifting past karst peaks on the Li River' },
        },
        {
          src: '/landmarks/guilin.jpg',
          alt: { zh: '阳朔西街拐进竹林的小巷', en: 'Bamboo lane just off Yangshuo West Street' },
        },
      ],
    },
    {
      day: 8,
      city: 'Yangshuo',
      cityCn: '阳朔',
      morning: [
        {
          activity: { zh: '骑电瓶车去十里画廊 · 月亮山下停下来吃早餐', en: 'E-bike along the Ten-Mile Gallery · breakfast stop under Moon Hill' },
          minutes: 180,
        },
      ],
      afternoon: [
        {
          activity: { zh: '兴坪老镇午饭 · 20 元人民币背面那个角度的兴坪段漓江', en: 'Lunch in Xingping old town · the exact bend on the back of the 20-yuan note' },
          minutes: 150,
        },
        {
          activity: { zh: '回阳朔小住 · 西街口找本地茶馆喝壶绿茶', en: 'Back to Yangshuo · slow tea at a low-key teahouse near West Street' },
          minutes: 90,
        },
      ],
      evening: [
        {
          activity: { zh: '印象刘三姐户外山水实景表演 · 张艺谋早年作品', en: 'Impression Sanjie Liu open-air show · Zhang Yimou\'s early karst spectacle' },
          minutes: 90,
          note: { zh: '只在好天气演，雨天会取消，我们会按天气当日确认', en: 'Show is weather-dependent — we re-confirm same day' },
        },
      ],
      images: [
        {
          src: '/landmarks/guilin.jpg',
          alt: { zh: '阳朔月亮山骑行', en: 'Cycling past Moon Hill, Yangshuo' },
        },
      ],
      tailorMakeTip: {
        zh: '不喜欢人多的实景演出？换成漓江边夜骑 + 民宿喝啤酒。',
        en: 'Skip the mass show? Swap in an evening river-side cycle plus a guesthouse beer.',
      },
    },
    {
      day: 9,
      city: 'Shanghai',
      cityCn: '上海',
      morning: [
        {
          activity: { zh: '桂林两江机场飞上海虹桥 · 2.5 小时', en: 'Flight from Guilin Liangjiang to Shanghai Hongqiao · 2.5h' },
          minutes: 150,
        },
      ],
      afternoon: [
        {
          activity: { zh: '入住外滩或新天地酒店 · 半小时午休', en: 'Check in at a Bund or Xintiandi hotel · 30-min nap' },
          minutes: 60,
        },
        {
          activity: { zh: '田子坊 + 武康路一带步行 · 老法租界街区', en: 'Walk Tianzifang + Wukang Road · old French Concession streets' },
          minutes: 150,
        },
      ],
      evening: [
        {
          activity: { zh: '外滩夜景 · 浦东对岸天际线 · 沿江散步到豫园', en: 'Bund at night · Pudong skyline across the river · stroll on to Yuyuan' },
          minutes: 120,
        },
      ],
      images: [
        {
          src: '/landmarks/shanghai.jpg',
          alt: { zh: '上海外滩夜景与浦东天际线', en: 'Shanghai Bund at night with the Pudong skyline' },
        },
      ],
    },
    {
      day: 10,
      city: 'Shanghai',
      cityCn: '上海',
      morning: [
        {
          activity: { zh: '老城厢早餐 · 生煎 + 小笼 · 不去城隍庙观光排档', en: 'Old town breakfast · pan-fried buns and xiaolongbao · skip the Yuyuan tourist row' },
          minutes: 90,
        },
      ],
      afternoon: [
        {
          activity: { zh: '自由时间 · 想买茶可以去湖心亭，想看艺术去 M50', en: 'Free time · Huxinting teahouse if you want tea, M50 if you want contemporary art' },
          minutes: 180,
        },
      ],
      evening: [
        {
          activity: { zh: '司机送浦东机场 · 支持团队确认你过完安检', en: 'Driver to Pudong Airport · support team confirms once you clear security' },
          minutes: 90,
        },
      ],
      images: [
        {
          src: '/landmarks/shanghai.jpg',
          alt: { zh: '上海老城厢生煎包', en: 'Pan-fried sheng jian bao at a Shanghai old town stall' },
        },
      ],
    },
  ],
  highlights: [
    { icon: 'wall', zh: '慕田峪长城走原状段，避开八达岭团客', en: 'Walk an original-masonry stretch of Mutianyu, far from Badaling crowds' },
    { icon: 'temple', zh: '故宫开门第一刻进太和殿前广场', en: 'Step into the Forbidden City the moment the gates open' },
    { icon: 'mountain', zh: '袁家界峰林晨雾，6 点进山的特权', en: 'Yuanjiajie pillars in dawn mist — the privilege of arriving at 06:00' },
    { icon: 'water', zh: '阳朔遇龙河竹筏，比漓江主流安静', en: 'Bamboo raft on the Yulong — quieter than the main Li River route' },
    { icon: 'sunset', zh: '上海外滩夜，对岸是浦东天际线', en: "Shanghai's Bund at night with the Pudong skyline opposite" },
  ],
  pricing: {
    base: [
      { hotelClass: '3-star', usdPerNight: 110, note: { zh: '本地老牌三星 · 干净安静', en: 'Locally-run 3-star · clean and quiet' } },
      { hotelClass: '4-star', usdPerNight: 220, note: { zh: '国际品牌四星 · 中央区位', en: 'International-brand 4-star · central location' } },
      { hotelClass: '5-star', usdPerNight: 420, note: { zh: '国际五星 · 行政楼层 · 含早餐', en: 'International 5-star · executive floor · breakfast included' } },
    ],
    inclusions: [
      { zh: '4 晚 / 5 晚酒店住宿（按所选等级）', en: 'Hotel nights at the chosen class' },
      { zh: '私人英语导游 · 每个城市一名', en: 'Private English-speaking guide in each city' },
      { zh: '私人司机 + 商务车', en: 'Private driver and business van' },
      { zh: '所有城际高铁 / 国内航班 / 接送机', en: 'All inter-city bullet trains, domestic flights, airport transfers' },
      { zh: '景点门票 + 提前预约', en: 'All entry tickets and timed reservations' },
      { zh: '行前包写清出行支持与紧急联系人', en: 'Pre-departure pack documents trip support and emergency contacts' },
    ],
    exclusions: [
      { zh: '中国签证 / 国际机票', en: 'China visa and international flights' },
      { zh: '午晚餐（除非另有标注）', en: 'Lunches and dinners unless noted' },
      { zh: '小费 / 个人消费', en: 'Tips and personal spending' },
      { zh: '旅行保险', en: 'Travel insurance' },
    ],
  },
  tailorMakeTips: [
    { zh: '不想坐 4.5h 高铁？西安换成飞机 1.5h，多 USD 80 / 人。', en: "Don't fancy 4.5h on the bullet train? Fly Xi'an instead, +USD 80pp." },
    { zh: '只想看长城不想看故宫？两者都可以独立替换为 798 艺术区或国子监。', en: 'Skip the Forbidden City? Swap in 798 art district or the Confucius Temple instead.' },
    { zh: '腿不好的旅客张家界换成袁家界缆车线 + 黄龙洞。', en: 'For travellers with knee issues, we swap Zhangjiajie for the Yuanjiajie cable line plus Huanglong Cave.' },
    { zh: '想加蜜月私享段？阳朔可加私人船河 + 江景晚餐。', en: 'Honeymoon mode? Add a private river boat plus sunset dinner in Yangshuo.' },
  ],
  tripNotes: {
    accommodation: {
      zh: '北京 / 西安选历史街区精品酒店 · 张家界住景区门口 · 阳朔住西街 · 上海住外滩或法租界。所选酒店都有英语前台。',
      en: 'Beijing & Xi\'an in heritage-district boutiques · Zhangjiajie at park-gate hotels · Yangshuo on West Street · Shanghai on the Bund or in the French Concession. All have English-speaking reception.',
    },
    transportation: {
      zh: '北京-西安高铁 4.5h；西安-张家界、张家界-桂林、桂林-上海三段国内航班；城市内私人司机 + 商务车。',
      en: "Beijing–Xi'an by 4.5h bullet train; three domestic flights for Xi'an–Zhangjiajie, Zhangjiajie–Guilin, Guilin–Shanghai; private driver in cities.",
    },
    meals: {
      zh: '含早餐每天；午晚餐建议跟着顾问推荐的清单走，可加预订餐厅或留自由时间。',
      en: 'Breakfast daily; lunches and dinners follow the advisor\'s shortlist — pre-book or keep free as you prefer.',
    },
    visa: {
      zh: '大部分护照需要 L 类旅游签或 240h 过境免签（如果你符合条件）。我们会先确认你的护照类型再回方案。',
      en: 'Most passports need an L-class tourist visa or 240h transit visa-free (if you qualify). We confirm your passport type before drafting.',
    },
  },
  advisorSlug: 'lin',
  status: 'hidden',
};

// ─── 2. visa-free-240h-beijing ─────────────────────────────
const visaFree240hBeijing: Itinerary = {
  slug: 'visa-free-240h-beijing',
  title: {
    zh: '240h 过境免签 · 京津冀 10 天',
    en: '240h transit visa-free · Beijing–Tianjin–Hebei in 10 days',
  },
  kicker: {
    zh: 'NIA 240h · 用满 10 天再走',
    en: 'NIA 240h · use the full 10 days',
  },
  days: 10,
  priceFromUsd: 2400,
  bestMonths: ['Apr', 'May', 'Sep', 'Oct'],
  themes: ['visa-free', 'culture', 'first-time'],
  destinations: ['beijing'],
  hero: HERO_BY_SLUG['visa-free-240h-beijing'],
  intro: {
    zh: '从国家移民管理局 2025-11-04 公告之后，北京-天津-河北属于 240h 过境免签 24 个省级区域之一。这条路线是按"用满 10 天再走"设计的：北京 6 天古都 + 长城 + 现代区，天津 1 天近代史 + 早茶街，河北 1 天承德避暑山庄，最后回北京 2 天等回程航班。整段不会跨省，符合 NIA 同区域出境约束。',
    en: 'Since the NIA 2025-11-04 announcement, the Beijing–Tianjin–Hebei zone has been one of the 24 provincial regions covered by 240h transit visa-free. This baseline assumes you use the full 10 days: 6 days in Beijing for imperial Beijing, the Wall and modern districts; 1 day in Tianjin for treaty-era streets and breakfast lanes; 1 day in Chengde for the Qing summer palace; 2 days back in Beijing to soft-land before your onward flight. We never leave the region — clean exit at any of the in-zone ports.',
  },
  glance: [
    { day: 1, cities: ['Beijing'], oneLine: { zh: '抵达 PEK · 边检申报 240h', en: 'Land at PEK · declare 240h at immigration' } },
    { day: 2, cities: ['Beijing'], oneLine: { zh: '故宫 + 景山日落', en: 'Forbidden City + Jingshan sunset' } },
    { day: 3, cities: ['Beijing'], oneLine: { zh: '慕田峪长城整日', en: 'Full day on Mutianyu Wall' } },
    { day: 4, cities: ['Beijing'], oneLine: { zh: '颐和园 + 798 艺术区', en: 'Summer Palace + 798 art district' } },
    { day: 5, cities: ['Beijing', 'Tianjin'], oneLine: { zh: '高铁去天津一日来回', en: 'Day-trip to Tianjin by bullet train' } },
    { day: 6, cities: ['Beijing', 'Chengde'], oneLine: { zh: '高铁去承德避暑山庄', en: 'Bullet train to Chengde Mountain Resort' } },
    { day: 7, cities: ['Beijing'], oneLine: { zh: '胡同骑行 + 烤鸭晚餐', en: 'Hutong cycle + Peking duck dinner' } },
    { day: 8, cities: ['Beijing'], oneLine: { zh: '天坛 + 古玩市场', en: 'Temple of Heaven + antique market' } },
    { day: 9, cities: ['Beijing'], oneLine: { zh: '国贸 + 三里屯 现代北京', en: 'Guomao + Sanlitun · modern Beijing' } },
    { day: 10, cities: ['Beijing'], oneLine: { zh: 'PEK 离境 · 第三国去向', en: 'Onward flight from PEK · third country' } },
  ],
  dayByDay: [
    {
      day: 1,
      city: 'Beijing',
      cityCn: '北京',
      morning: [
        {
          activity: { zh: '抵达 PEK · 边检前出示 240h 资格三件套（机票第三国 + 酒店 + 行程）', en: 'Land at PEK · at immigration show the 240h trio: onward third-country ticket, hotel booking, itinerary' },
          minutes: 90,
          note: { zh: '走 240h 专用通道，边检会盖一个红章并写明你必须在 10 天内从同区域口岸离境；红章下方手写日期是关键，离境时要核对', en: 'Use the 240h channel — the officer stamps a red seal noting you must exit within 10 days from an in-zone port, and the hand-written date below the stamp is the one immigration matches on departure' },
        },
        {
          activity: { zh: '出关 · 支持团队确认你已成功用 240h · 司机举名牌等你', en: 'After clearance · support team confirms a clean 240h entry · driver waits with a name card at arrivals' },
          minutes: 30,
        },
      ],
      afternoon: [
        {
          activity: { zh: '司机送酒店 · 选王府井或东四胡同片区，方便走路觅食', en: 'Driver drops you at the hotel · we recommend Wangfujing or Dongsi hutong area for walkable dinner options' },
          minutes: 60,
          note: { zh: '我们故意不选机场酒店或 CBD · 240h 第一晚住胡同片区，第二天醒来推开门就是真实北京', en: 'We deliberately skip airport hotels and the CBD — your 240h first night should be in a hutong block so you wake up inside real Beijing, not a glass tower' },
        },
        {
          activity: { zh: '短午休 · 支持团队确认你已成功用 240h 入境', en: 'Brief nap · support team confirms successful 240h entry' },
          minutes: 90,
        },
        {
          activity: { zh: '附近便利店买北冰洋汽水 + 小零食 · 北京独有口味', en: 'Walk to a corner store for a Beibingyang orange soda and a snack — a flavour you cannot get back home' },
          minutes: 30,
        },
      ],
      evening: [
        {
          activity: { zh: '附近吃一顿便当晚饭 · 早睡', en: 'Casual dinner nearby · early bed' },
          minutes: 60,
          note: { zh: '240h 第一晚务必早睡 · 明天 7:30 故宫开门要赶在团客之前进去，第一天熬夜会拖累整周节奏', en: 'Sleep early on 240h day one — the 7:30 Forbidden City opening tomorrow needs you ahead of the tour groups, and a late first night drags the whole week' },
        },
      ],
      images: [
        { src: '/landmarks/beijing.jpg', alt: { zh: '北京东四胡同夜', en: 'Dongsi hutong at night, Beijing' } },
        { src: '/landmarks/beijing.jpg', alt: { zh: '王府井小吃街灯笼', en: 'Lanterns over Wangfujing snack street' } },
      ],
      tailorMakeTip: {
        zh: '想直接利用 240h 玩遍京津冀 + 上长城？我们会按你的回程航班反推节奏。',
        en: 'Want to maximize 240h across all three regions and add the Wall? We schedule backwards from your onward flight.',
      },
    },
    {
      day: 2,
      city: 'Beijing',
      cityCn: '北京',
      morning: [
        {
          activity: { zh: '7:30 故宫午门入园 · 中轴线一路到神武门', en: 'Forbidden City Meridian Gate at 07:30 · walk the central axis to Shenwumen' },
          minutes: 240,
        },
      ],
      afternoon: [
        {
          activity: { zh: '景山公园上万春亭看故宫全景', en: 'Climb up Jingshan to Wanchun Pavilion for the full Forbidden City vista' },
          minutes: 60,
        },
        {
          activity: { zh: '国子监 + 雍和宫片区慢走', en: 'Slow walk through the Guozijian and Yonghegong area' },
          minutes: 120,
        },
      ],
      evening: [
        {
          activity: { zh: '南锣鼓巷北段安静一段吃晚饭 · 不进主商业街', en: 'Dinner at the quieter north end of Nanluoguxiang · skip the busy commercial stretch' },
          minutes: 90,
        },
      ],
      images: [{ src: '/landmarks/beijing.jpg', alt: { zh: '故宫太和殿', en: 'Hall of Supreme Harmony, Forbidden City' } }],
    },
    {
      day: 3,
      city: 'Beijing',
      cityCn: '北京',
      morning: [
        {
          activity: { zh: '6:00 出发 · 90 分钟到慕田峪长城', en: '06:00 departure · 90 min drive to Mutianyu' },
          minutes: 90,
          note: { zh: '6 点出发能赶在第一缆车开舱时上山，比 8 点出发的人少 70%；车上司机会给你递保温瓶和小笼包', en: 'Leaving at 6 puts you on the first cable car of the day — about 70% fewer people than the 8 a.m. wave, and the driver hands you a thermos and steamed buns en route' },
        },
        {
          activity: { zh: '缆车上 · 4-10 号烽火台 + 14 号原状烽火台往返', en: 'Cable car up · towers 4–10 plus the unrestored tower 14 round trip' },
          minutes: 240,
          note: { zh: '14 号是少修过的原状段，砖块磨损能看清明朝戍守的脚印；保留这段是慕田峪比八达岭更值得去的关键', en: 'Tower 14 sits on the unrestored section — you can read Ming garrison footprints worn into the bricks; that detail is why Mutianyu beats the polished Badaling stretch' },
        },
      ],
      afternoon: [
        {
          activity: { zh: '回程经过怀柔虹鳟鱼一条街吃午饭', en: 'Lunch on the Huairou trout street on the way back' },
          minutes: 90,
          note: { zh: '怀柔虹鳟养殖场都用山泉水放养 · 整鱼烤盐烤 + 蘸雁栖湖辣椒酱，是长城下来最稳的一顿', en: 'The Huairou trout are raised in mountain-spring runs · whole-fish salt bake plus Yanqi Lake chili paste — the most reliable meal you\'ll get on a Wall day' },
        },
        {
          activity: { zh: '回酒店泡澡补眠', en: 'Hotel soak and nap' },
          minutes: 120,
        },
        {
          activity: { zh: '酒店附近茶馆喝一壶花茶 · 整理今天 200+ 张照片', en: 'Tea house nearby · sort the 200+ photos you took this morning' },
          minutes: 60,
        },
      ],
      evening: [
        {
          activity: { zh: '烤鸭晚餐 · 选东四附近的非旅游店', en: 'Roast duck dinner at a non-tourist spot near Dongsi' },
          minutes: 90,
          note: { zh: '我们选的店 75 年历史，木炭挂炉 · 鸭子按 3 段切（皮 + 半瘦肉 + 整鸭骨架熬汤），跟前门那家全切薄片完全不同', en: 'Our pick has been roasting on charcoal hooks for 75 years; they cut the duck three ways — skin, semi-lean meat, then carcass into soup — completely different from the all-slice tourist branches' },
        },
        {
          activity: { zh: '回酒店看顾问发的 D4 颐和园 + 798 路线图', en: 'Back at hotel · review the advisor\'s map for D4 Summer Palace + 798' },
          minutes: 30,
        },
      ],
      images: [
        { src: '/landmarks/beijing.jpg', alt: { zh: '慕田峪长城原状段秋色', en: 'Unrestored Mutianyu Wall in autumn' } },
        { src: '/landmarks/beijing.jpg', alt: { zh: '14 号烽火台砖块磨损', en: 'Worn brickwork at unrestored tower 14' } },
        { src: '/landmarks/beijing.jpg', alt: { zh: '怀柔虹鳟鱼盐烤', en: 'Salt-baked Huairou trout' } },
      ],
      tailorMakeTip: {
        zh: '想看更野的长城？司马台或箭扣需要专业领队，可以加 1 天替换慕田峪。',
        en: 'Want a wilder Wall? Simatai or Jiankou needs a guided lead — we can swap in a +1 day for that.',
      },
    },
    {
      day: 4,
      city: 'Beijing',
      cityCn: '北京',
      morning: [
        {
          activity: { zh: '颐和园 · 从北宫门进，先看苏州街再南下昆明湖', en: 'Summer Palace · enter at North Palace Gate, do Suzhou Street first, then south to Kunming Lake' },
          minutes: 240,
        },
      ],
      afternoon: [
        {
          activity: { zh: '798 艺术区 · 看 3-4 个画廊就走 · 不要试图刷完', en: '798 art district · pick 3–4 galleries · resist the urge to do them all' },
          minutes: 180,
        },
      ],
      evening: [
        {
          activity: { zh: '酒仙桥附近本地小馆吃手工面', en: 'Hand-pulled noodles at a local spot near Jiuxianqiao' },
          minutes: 90,
        },
      ],
      images: [{ src: '/landmarks/beijing.jpg', alt: { zh: '颐和园昆明湖与万寿山', en: 'Kunming Lake and Longevity Hill, Summer Palace' } }],
    },
    {
      day: 5,
      city: 'Tianjin',
      cityCn: '天津',
      morning: [
        {
          activity: { zh: '北京南站 9:00 城际高铁去天津 · 30 分钟到', en: '09:00 inter-city bullet train to Tianjin · 30-min ride' },
          minutes: 30,
          note: { zh: '京津城际高铁 350km/h，提前 15 分钟到南站候车 · 顾问会发车次截图给你', en: 'The Beijing–Tianjin line runs at 350 km/h; arrive at South Station 15 min early — your advisor sends the train number screenshot' },
        },
        {
          activity: { zh: '五大道租自行车骑老租界 · 看英法德意四国老建筑', en: 'Cycle the Five Avenues old concession area · British, French, German and Italian architecture' },
          minutes: 150,
          note: { zh: '五大道是天津最完整的近代史街区 · 230+ 栋老洋房，骑车 1.5 小时穿过，比走路看 4 条已是高效', en: 'The Five Avenues hold the most intact Republican-era streetscape in Tianjin — 230+ old mansions; cycling four streets in 1.5h is the efficient way' },
        },
      ],
      afternoon: [
        {
          activity: { zh: '南市食品街吃天津早茶 · 狗不理别去观光店，去南门口本地店', en: "Tianjin breakfast lane in Nanshi · for goubuli skip the tourist branch, head to the Nanmen-area local one" },
          minutes: 90,
          note: { zh: '南门口的狗不理是 1858 年原址 · 18 个褶儿 + 滚汤鸡汤 + 现包；前门外那家全是预制冷冻包', en: 'The Nanmen branch occupies the 1858 original site — 18 folds, fresh chicken broth, hand-wrapped on the spot; the Qianmen-style outlets are pre-formed and frozen' },
        },
        {
          activity: { zh: '海河边步行 + 解放桥 + 古文化街', en: 'Walk along the Hai River, cross the Jiefang Bridge, end at Guwenhua Street' },
          minutes: 180,
          note: { zh: '解放桥每天傍晚 6 点开桥让大型船过 · 留意时间能看到老桥实际抬升 30 米的瞬间', en: 'The Jiefang Bridge lifts at 6 p.m. each evening to let large vessels through — time it right to watch the old span actually rise 30 m' },
        },
        {
          activity: { zh: '古文化街买一个泥人张', en: 'Pick up a Niren Zhang clay figurine in Guwenhua Street' },
          minutes: 30,
        },
      ],
      evening: [
        {
          activity: { zh: '末班高铁回北京 · 半小时到南站', en: 'Last bullet train back to Beijing · 30 min to South Station' },
          minutes: 30,
          note: { zh: '21:30 末班车回京 · 不要赶 22 点之后，间隔变成 1 小时一班 · 顾问把座位定靠走廊好下车', en: 'Take the 21:30 service — after that frequency drops to one per hour; we book aisle seats so you can disembark fast' },
        },
        {
          activity: { zh: '南站打车回酒店 · 顾问已下单接驾', en: 'Cab from South Station — advisor pre-orders a Didi to your hotel' },
          minutes: 30,
        },
      ],
      images: [
        { src: '/landmarks/beijing.jpg', alt: { zh: '天津五大道老租界街区', en: 'Five Avenues old concession block in Tianjin' } },
        { src: '/landmarks/beijing.jpg', alt: { zh: '海河解放桥傍晚开桥', en: 'Jiefang Bridge lifting at dusk over the Hai River' } },
        { src: '/landmarks/beijing.jpg', alt: { zh: '古文化街泥人张作坊', en: 'Niren Zhang clay figurine workshop in Guwenhua Street' } },
      ],
    },
    {
      day: 6,
      city: 'Chengde',
      cityCn: '承德',
      morning: [
        {
          activity: { zh: '北京朝阳站 7:30 高铁去承德 · 1.5 小时', en: 'Chaoyang Station 07:30 bullet train to Chengde · 1.5h' },
          minutes: 90,
        },
        {
          activity: { zh: '避暑山庄丽正门入园 · 上午湖区 · 下午山区', en: 'Mountain Resort Lizhengmen entry · lakes in the morning, hills after lunch' },
          minutes: 180,
        },
      ],
      afternoon: [
        {
          activity: { zh: '外八庙片区看普陀宗乘之庙 · 仿布达拉宫', en: 'Outer Eight Temples · Putuo Zongcheng (the mini-Potala)' },
          minutes: 150,
        },
      ],
      evening: [
        {
          activity: { zh: '末班车回北京 · 21:30 抵北京', en: 'Last train back · arrive Beijing 21:30' },
          minutes: 90,
        },
      ],
      images: [{ src: '/landmarks/beijing.jpg', alt: { zh: '承德避暑山庄湖区', en: 'Lake area of the Chengde Mountain Resort' } }],
      tailorMakeTip: {
        zh: '不想 D6 当天来回？可以承德住一晚，第二天看完外八庙再回北京。',
        en: 'Prefer not to day-trip Chengde? Spend a night and finish the temples next morning.',
      },
    },
    {
      day: 7,
      city: 'Beijing',
      cityCn: '北京',
      morning: [
        {
          activity: { zh: '什刹海租自行车 · 鼓楼 → 钟楼 → 烟袋斜街 → 后海一圈', en: 'Cycle Shichahai · Drum → Bell → Yandai → Houhai loop' },
          minutes: 180,
        },
      ],
      afternoon: [
        {
          activity: { zh: '老北京铜锅涮肉 · 不去东来顺连锁，找帽儿胡同的私房', en: 'Old Beijing copper-pot lamb hotpot · skip the chain, hit a Mao\'er Hutong family spot' },
          minutes: 120,
        },
      ],
      evening: [
        {
          activity: { zh: '空闲时间 · 顾问推荐三家深夜书店', en: 'Free evening · advisor sends three late-night bookstore recs' },
          minutes: 120,
        },
      ],
      images: [{ src: '/landmarks/beijing.jpg', alt: { zh: '什刹海后海冬日傍晚', en: 'Houhai lake at winter dusk' } }],
    },
    {
      day: 8,
      city: 'Beijing',
      cityCn: '北京',
      morning: [
        {
          activity: { zh: '天坛公园 · 进东门看祈年殿 + 圜丘', en: 'Temple of Heaven · east gate to Hall of Prayer for Good Harvests + Circular Mound' },
          minutes: 150,
        },
      ],
      afternoon: [
        {
          activity: { zh: '潘家园古玩市场 · 周六最热闹', en: 'Panjiayuan antiques market · Saturdays are the busiest and best' },
          minutes: 150,
        },
      ],
      evening: [
        {
          activity: { zh: '京剧或相声二选一 · 半小时迷你场而非旅游团式', en: 'Pick Beijing opera or xiangsheng comedy · short 30-min sets, not a 2h tourist show' },
          minutes: 90,
        },
      ],
      images: [{ src: '/landmarks/beijing.jpg', alt: { zh: '天坛祈年殿', en: 'Hall of Prayer for Good Harvests, Temple of Heaven' } }],
    },
    {
      day: 9,
      city: 'Beijing',
      cityCn: '北京',
      morning: [
        {
          activity: { zh: '国贸 CBD · 从 SKP 走到日坛 · 现代北京切片', en: 'Guomao CBD · walk from SKP to Ritan Park · modern Beijing slice' },
          minutes: 150,
        },
      ],
      afternoon: [
        {
          activity: { zh: '三里屯太古里逛街 · 午饭找 Chao 酒店楼下', en: 'Sanlitun Taikoo Li · lunch at the ground floor of the Chao hotel building' },
          minutes: 180,
        },
      ],
      evening: [
        {
          activity: { zh: '工人体育场附近本地酒馆 · 收尾餐', en: 'Local pub near the Workers\' Stadium · farewell dinner' },
          minutes: 120,
        },
      ],
      images: [{ src: '/landmarks/beijing.jpg', alt: { zh: '三里屯太古里夜景', en: 'Sanlitun Taikoo Li at night' } }],
    },
    {
      day: 10,
      city: 'Beijing',
      cityCn: '北京',
      morning: [
        {
          activity: { zh: '酒店早餐 · 司机提前 4 小时送 PEK · 240h 边检盖出境章', en: "Hotel breakfast · driver to PEK 4h ahead · 240h exit stamp at immigration" },
          minutes: 60,
        },
      ],
      afternoon: [
        {
          activity: { zh: '航班飞第三国 · 支持团队确认你过完安检并按流程收尾', en: 'Flight to your declared third country · support team confirms post-security status and closes the loop' },
          minutes: 60,
          note: { zh: '出境必须从京津冀区域内的口岸（PEK / 天津 / 石家庄等），不能跨区出境', en: 'Exit must be from an in-zone port (PEK / Tianjin / Shijiazhuang) — leaving from another region invalidates 240h' },
        },
      ],
      evening: [
        {
          activity: { zh: '到第三国 · 顾问最后一条消息：祝旅途愉快', en: 'Land in your third country · advisor signs off with a safe-travels note' },
          minutes: 30,
        },
      ],
      images: [{ src: '/landmarks/beijing.jpg', alt: { zh: 'PEK T3 国际出发航站楼', en: 'PEK T3 international departures' } }],
    },
  ],
  highlights: [
    { icon: 'compass', zh: '240h 全程合规：京津冀区域内出境', en: '240h fully compliant: exit from an in-zone port' },
    { icon: 'wall', zh: '慕田峪长城原状段一整天', en: 'A full day on the original-masonry stretch of Mutianyu' },
    { icon: 'temple', zh: '故宫开门即入，避开旅行团高峰', en: 'Forbidden City the moment the gates open' },
    { icon: 'photo', zh: '承德避暑山庄 + 仿布达拉宫的外八庙', en: 'Chengde Mountain Resort plus the mini-Potala temple' },
    { icon: 'food', zh: '北京 · 天津两地早餐对照课', en: 'Side-by-side Beijing and Tianjin breakfast culture' },
  ],
  pricing: {
    base: [
      { hotelClass: '3-star', usdPerNight: 95, note: { zh: '王府井 / 东四老牌三星 · 步行可达地铁', en: 'Established 3-star around Wangfujing / Dongsi · walk-to-metro' } },
      { hotelClass: '4-star', usdPerNight: 195, note: { zh: '王府井 / CBD 四星 · 含早餐', en: '4-star at Wangfujing / CBD · breakfast included' } },
      { hotelClass: '5-star', usdPerNight: 380, note: { zh: '北京五星酒店 · 行政楼层 · 故宫主题视野', en: '5-star with executive floor · Forbidden City-area views' } },
    ],
    inclusions: [
      { zh: '8-9 晚北京酒店住宿', en: '8–9 nights of hotel accommodation in Beijing' },
      { zh: '私人英语导游 + 私人司机', en: 'Private English-speaking guide and private driver' },
      { zh: '所有城内 + 城际高铁 + 接送机', en: 'All in-city transport, inter-city bullet trains, airport transfers' },
      { zh: '240h 入境证件预审 + 边检材料 PDF 包', en: '240h pre-screening review + immigration documents PDF pack' },
      { zh: '景点门票 + 提前预约 · 故宫 / 颐和园 / 避暑山庄', en: 'Entry tickets and timed reservations: Forbidden City, Summer Palace, Mountain Resort' },
      { zh: '行前包写清出行支持与紧急联系人', en: 'Pre-departure pack documents trip support and emergency contacts' },
    ],
    exclusions: [
      { zh: '国际机票 · 第三国机票需自行预订（必须）', en: 'International flights · third-country onward ticket is on you (mandatory for 240h)' },
      { zh: '午晚餐（除非另有标注）', en: 'Lunches and dinners unless noted' },
      { zh: '小费 / 个人消费', en: 'Tips and personal spending' },
      { zh: '旅行保险', en: 'Travel insurance' },
    ],
  },
  tailorMakeTips: [
    { zh: '回程航班只有 7 天？我们把 D5/D6 天津承德合并成一日。', en: 'Only 7 days before your onward flight? We merge D5 and D6 into a single combined day.' },
    { zh: '想去上海一段？必须出京津冀回到北京口岸再走，不算 240h 区域。', en: 'Wanting to add Shanghai? It exits the 240h Beijing–Tianjin–Hebei zone — re-enter Beijing for departure.' },
    { zh: '想看冬奥延庆？把 D3 长城换成延庆 + 八达岭长城（同区域内合规）。', en: 'Curious about Winter Olympic sites? Swap D3 Mutianyu for Yanqing + Badaling — still in-zone.' },
    { zh: '蜜月版可以加私人晚宴在故宫紧邻的院落餐厅。', en: 'Honeymoon version: private dinner at a courtyard restaurant minutes from the Forbidden City.' },
    { zh: '不想坐高铁去承德？飞机也行，但单程也是 1.5h，不省时间。', en: 'Skip the bullet train to Chengde? Flying takes the same 1.5h — no real win.' },
  ],
  tripNotes: {
    accommodation: {
      zh: '统一住北京 · 王府井 / CBD / 三里屯三大区域可选 · 不调换酒店，省下打包时间。',
      en: 'Single hotel base in Beijing · pick from Wangfujing, CBD or Sanlitun · no hotel changes mid-trip — saves you 2 mornings of packing.',
    },
    transportation: {
      zh: '城际高铁北京-天津 30min · 北京-承德 1.5h；城内私人司机 + 商务车；240h 边检走专用通道。',
      en: 'Inter-city bullet trains Beijing–Tianjin 30 min and Beijing–Chengde 1.5h; private driver and van in town; 240h dedicated channel at immigration.',
    },
    meals: {
      zh: '含早餐每天；午晚餐顾问每天给两家选项，按你心情挑或留自由时间。',
      en: 'Breakfast daily; for lunch and dinner the advisor sends 2 options each day — pick or skip as you go.',
    },
    visa: {
      zh: '本路线是 240h 过境免签专属。需要：第三国机票（不是回出发国）+ 北京酒店预订 + 出境口岸在京津冀区域内。我们会先确认这三件再开始排路线。',
      en: 'This itinerary is 240h transit visa-free only. Required: onward third-country ticket (not back to departure country), Beijing hotel booking, exit port in the Beijing–Tianjin–Hebei zone. We confirm all three before drafting.',
    },
  },
  advisorSlug: 'lin',
  status: 'hidden',
};

// ─── 3. family-12d ─────────────────────────────────────────
const family12d: Itinerary = {
  slug: 'family-12d',
  title: {
    zh: '12 天家庭带娃 · 北京 + 西安 + 张家界 + 上海',
    en: '12-day family with kids · Beijing, Xi\'an, Zhangjiajie & Shanghai',
  },
  kicker: {
    zh: 'FAMILY · 4-12 岁友好节奏',
    en: 'FAMILY · pace that suits ages 4–12',
  },
  days: 12,
  priceFromUsd: 4200,
  bestMonths: ['Apr', 'May', 'Jun', 'Sep', 'Oct'],
  themes: ['family', 'culture', 'nature'],
  destinations: ['beijing', 'xian', 'zhangjiajie', 'shanghai'],
  hero: HERO_BY_SLUG['family-12d'],
  intro: {
    zh: '带娃来中国不能按蜜月节奏排。我们给四组带过中国的家庭顾问会议过的版本：每天最多 1 个深度景点 + 1 个体验 + 长午休，住的酒店都有家庭房或两间互通房，每段都留半天给孩子睡个回笼觉。12 天分四城，每城 3 晚整，省下打包行李的时间给孩子多睡。',
    en: 'Family travel in China can\'t use a honeymoon tempo. This is the version four of our family advisors converged on: at most one deep stop and one hands-on activity per day, plus a long midday rest. Every hotel has family rooms or interconnecting twins, and every leg keeps a half-day buffer for nap recovery. Twelve days, four cities, three nights each — fewer packing mornings, more sleep for the kids.',
  },
  glance: [
    { day: 1, cities: ['Beijing'], oneLine: { zh: '抵达 · 倒时差日', en: 'Arrival · jet-lag recovery day' } },
    { day: 2, cities: ['Beijing'], oneLine: { zh: '故宫上午 · 下午午休', en: 'Forbidden City morning · afternoon nap' } },
    { day: 3, cities: ['Beijing'], oneLine: { zh: '长城慕田峪段 + 缆车', en: 'Mutianyu Wall + cable car for kids' } },
    { day: 4, cities: ['Beijing', "Xi'an"], oneLine: { zh: '高铁去西安 · 入住中央区', en: "Bullet train to Xi'an · check in centrally" } },
    { day: 5, cities: ["Xi'an"], oneLine: { zh: '兵马俑半日 · 钟楼骑车', en: 'Terracotta half day · bell tower cycle' } },
    { day: 6, cities: ["Xi'an"], oneLine: { zh: '国宝大熊猫基地 · 西安特色面食工作坊', en: 'Panda centre + noodle-making workshop' } },
    { day: 7, cities: ["Xi'an", 'Zhangjiajie'], oneLine: { zh: '飞张家界 · 入住景区门口', en: 'Fly to Zhangjiajie · park-gate hotel' } },
    { day: 8, cities: ['Zhangjiajie'], oneLine: { zh: '袁家界缆车线 · 不上玻璃栈道', en: 'Yuanjiajie via cable car · skip the glass walkway' } },
    { day: 9, cities: ['Zhangjiajie'], oneLine: { zh: '黄龙洞钟乳石 · 短徒步', en: 'Huanglong Cave + short walk' } },
    { day: 10, cities: ['Zhangjiajie', 'Shanghai'], oneLine: { zh: '飞上海 · 入住外滩或法租界', en: 'Fly to Shanghai · Bund / French Concession base' } },
    { day: 11, cities: ['Shanghai'], oneLine: { zh: '上海科技馆全天 · 适合孩子', en: 'Shanghai Science Museum full day · kid-favorite' } },
    { day: 12, cities: ['Shanghai'], oneLine: { zh: '老城厢早茶 · 返程', en: 'Old town breakfast · departure' } },
  ],
  dayByDay: [
    {
      day: 1,
      city: 'Beijing',
      cityCn: '北京',
      morning: [
        { activity: { zh: '抵达 PEK · 司机举家庭名牌接机', en: 'Land at PEK · driver waits with a family-name placard' }, minutes: 60 },
      ],
      afternoon: [
        { activity: { zh: '入住带连通房的家庭酒店 · 提前安排婴儿床或加床', en: 'Family hotel with interconnecting rooms · cot or extra bed pre-set' }, minutes: 60, note: { zh: '我们提前确认婴儿床尺寸 + 是否过敏材质', en: 'We confirm cot size and any allergy-relevant materials in advance' } },
        { activity: { zh: '酒店附近公园短散步 · 吹风让孩子调时差', en: 'Short walk in a hotel-adjacent park · fresh air helps the kids reset' }, minutes: 60 },
      ],
      evening: [
        { activity: { zh: '酒店内或周边餐厅吃简餐 · 早睡', en: 'Casual dinner in or near the hotel · early bed' }, minutes: 60 },
      ],
      images: [{ src: '/landmarks/beijing.jpg', alt: { zh: '北京胡同里小朋友追鸽子', en: 'Kids chasing pigeons in a Beijing hutong' } }],
      tailorMakeTip: { zh: '婴儿车需求？我们租大轮全地形款，不用你扛过来。', en: 'Need a stroller? We rent an all-terrain one — no need to fly yours over.' },
    },
    {
      day: 2,
      city: 'Beijing',
      cityCn: '北京',
      morning: [
        { activity: { zh: '8:30 进故宫 · 选孩子能记住的几件事 · 不试图全看', en: '08:30 Forbidden City · pick a few things the kids will remember · don\'t try to do it all' }, minutes: 150, note: { zh: '故宫 90 分钟为限，超过孩子注意力崩溃 · 我们准备一张"找一找"任务清单（金缸、九龙壁、滴水兽）让孩子边走边玩', en: 'Cap the Forbidden City at 90 min for kids — beyond that, attention collapses; we hand out a kid-sized scavenger sheet (gilded cauldrons, the Nine Dragon Wall, drain dragons) so they hunt as they walk' } },
        { activity: { zh: '出神武门 · 在景山小坡上吃北冰洋汽水 · 短暂解放', en: 'Exit at Shenwumen · sit on the slope of Jingshan with a Beibingyang orange soda · short release' }, minutes: 30 },
      ],
      afternoon: [
        { activity: { zh: '酒店午休 2 小时', en: 'Two-hour hotel nap' }, minutes: 120, note: { zh: '中午回胡同酒店午休是孩子能撑过下半天的关键 · 不要塞景点', en: 'A real midday nap back at the hutong hotel is what gets kids through the afternoon — do not cram more sights in here' } },
        { activity: { zh: '什刹海湖边喂鸽子 + 吃冰糖葫芦', en: 'Lakeside at Shichahai · pigeons + sugar-glazed haw skewers' }, minutes: 90, note: { zh: '冰糖葫芦买一串两人分 · 整串小朋友一手拿不稳 · 顾问会准备湿纸巾', en: 'Buy one tanghulu skewer to share — small hands cannot grip a full one; the advisor brings wet wipes' } },
        { activity: { zh: '湖边租电瓶船 30 分钟 · 孩子掌舵', en: 'Rent a 30-min electric paddle boat on the lake · let the kid steer' }, minutes: 30 },
      ],
      evening: [
        { activity: { zh: '本地家庭友好烤鸭店 · 不要去前门旅游店', en: 'Family-friendly roast duck · skip the Qianmen tourist spots' }, minutes: 90, note: { zh: '我们选东城的店 · 有儿童碗 + 高脚椅 + 不是切薄片那种 · 孩子可以自己卷饼', en: 'Our Dongcheng pick keeps kid bowls and high chairs, and the duck is sliced thicker so kids can roll their own pancakes' } },
      ],
      images: [
        { src: '/landmarks/beijing.jpg', alt: { zh: '什刹海湖边老北京冰糖葫芦', en: 'Sugar-glazed haw skewers by Shichahai lake' } },
        { src: '/landmarks/beijing.jpg', alt: { zh: '故宫鎏金大缸前小朋友找九龙', en: 'Kid hunting dragons by a gilded cauldron in the Forbidden City' } },
      ],
    },
    {
      day: 3,
      city: 'Beijing',
      cityCn: '北京',
      morning: [
        { activity: { zh: '7:00 出发慕田峪 · 司机准备孩子的简易早餐盒', en: '07:00 to Mutianyu · driver brings a kid-sized breakfast box' }, minutes: 90, note: { zh: '早餐盒含小馒头 + 茶叶蛋 + 黄瓜条 · 孩子在车上吃完省去早晨饿哭风险', en: 'The box has small mantou, a tea egg and cucumber sticks — kids finish in the car so no morning meltdown' } },
        { activity: { zh: '缆车上山 · 走到 14 号烽火台原状段 · 滑车下山', en: 'Cable car up · walk to unrestored tower 14 · toboggan down' }, minutes: 180, note: { zh: '滑车是孩子最爱的部分 · 大人也能玩；6 岁以下必须跟成年人共乘一辆，刹车在右手', en: 'The toboggan is the kids\' favorite part — adults love it too; under-6s must share a sled with an adult, brake on the right' } },
      ],
      afternoon: [
        { activity: { zh: '回程经怀柔吃午饭 · 农家虹鳟鱼', en: 'Lunch on the Huairou trout street en route home' }, minutes: 90, note: { zh: '虹鳟鱼现捞现做 · 孩子可以在池边喂鱼半小时打发等菜的时间', en: 'Trout is netted and cooked fresh; kids can feed the pond fish for half an hour while the meal grills' } },
        { activity: { zh: '回酒店午休', en: 'Hotel nap' }, minutes: 120 },
        { activity: { zh: '酒店泳池放风 30 分钟', en: 'Half-hour decompression in the hotel pool' }, minutes: 30 },
      ],
      evening: [
        { activity: { zh: '王府井小吃街买点零食带回酒店吃', en: 'Wangfujing snack street · take treats back to the hotel' }, minutes: 90, note: { zh: '不在小吃街现场吃 · 人太挤 · 带回酒店把零食摊在床上挑着吃才是孩子最爽的体验', en: 'Don\'t eat on the snack lane itself — too crowded; the real kid bliss is laying everything out on the hotel bed and picking through' } },
      ],
      images: [
        { src: '/landmarks/beijing.jpg', alt: { zh: '慕田峪长城滑车下山', en: 'Toboggan ride down from Mutianyu Wall' } },
        { src: '/landmarks/beijing.jpg', alt: { zh: '怀柔虹鳟鱼餐厅小池子', en: 'Trout pond at a Huairou restaurant' } },
        { src: '/landmarks/beijing.jpg', alt: { zh: '王府井小吃街灯笼下', en: 'Wangfujing snack street under lanterns' } },
      ],
      tailorMakeTip: { zh: '6 岁以下孩子建议直接坐缆车上下，不走 6 公里山路。', en: 'For kids under 6, take the cable car both ways — skip the 6km hike.' },
    },
    {
      day: 4,
      city: "Xi'an",
      cityCn: '西安',
      morning: [
        { activity: { zh: '北京南站 9:30 高铁去西安 · 4.5 小时 · 商务座家庭包厢', en: '09:30 bullet train Beijing South to Xi\'an · 4.5h · family pod in business class' }, minutes: 270, note: { zh: '商务座家庭票贵 USD 60/人但孩子能拉床睡', en: 'Family business pod is +USD 60pp — kids can lie down and sleep' } },
      ],
      afternoon: [
        { activity: { zh: '入住钟楼酒店 · 步行 5 分钟到城墙', en: 'Check in near the Bell Tower · 5-min walk to the wall' }, minutes: 60 },
        { activity: { zh: '酒店午休', en: 'Hotel rest' }, minutes: 90 },
      ],
      evening: [
        { activity: { zh: '酒店楼下吃面 · 孩子点儿童碗', en: 'Noodles at the hotel-side spot · kid-size bowls' }, minutes: 60 },
      ],
      images: [{ src: '/landmarks/xian.jpg', alt: { zh: '西安钟楼夜景', en: 'Bell Tower at night, Xi\'an' } }],
    },
    {
      day: 5,
      city: "Xi'an",
      cityCn: '西安',
      morning: [
        { activity: { zh: '8:30 兵马俑 · 1 号坑解说重点 · 2/3 号 30 分钟即出', en: '08:30 Terracotta · pit-1 deep talk · 30 min combined for pits 2 and 3' }, minutes: 180, note: { zh: '不要排青铜车马展，孩子排队要崩', en: 'Skip the bronze chariot exhibit — the queue defeats most kids' } },
      ],
      afternoon: [
        { activity: { zh: '回西安市区午饭 + 长午休', en: 'Back to town for lunch and a long midday rest' }, minutes: 180 },
        { activity: { zh: '城墙上电瓶车环绕 · 不走全程', en: 'Electric cart loop on the city wall · don\'t cycle the whole 13.7km' }, minutes: 90 },
      ],
      evening: [
        { activity: { zh: '回民街吃 biangbiang 面 · 顾问带去本地店', en: 'Muslim Quarter biangbiang noodles · advisor takes you to the local-only shop' }, minutes: 90 },
      ],
      images: [{ src: '/landmarks/xian.jpg', alt: { zh: '西安城墙电瓶车', en: 'Electric cart on the Xi\'an city wall' } }],
    },
    {
      day: 6,
      city: "Xi'an",
      cityCn: '西安',
      morning: [
        { activity: { zh: '秦岭野生动物园看大熊猫', en: 'Qinling Panda Centre · giant pandas in their conservation habitat' }, minutes: 240, note: { zh: '比成都熊猫基地小但人少 · 上午孩子精力够 · 园方允许 50cm 距离观察吃竹叶的瞬间', en: 'Smaller than Chengdu but quieter — works for fresh-morning energy; the centre allows 50 cm observation of bamboo-feeding panda cubs' } },
        { activity: { zh: '园内午餐 · 孩子还可以看一段熊猫纪录片', en: 'On-site lunch · screen a 20-min panda doc to keep them anchored' }, minutes: 60 },
      ],
      afternoon: [
        { activity: { zh: '回酒店午休', en: 'Hotel rest' }, minutes: 120 },
        { activity: { zh: '面食工作坊 · 学做 biangbiang 面 + 葫芦头泡馍', en: 'Noodle-making workshop · biangbiang and hulutou paomo' }, minutes: 120, note: { zh: '面食师傅会让孩子摔面 · biangbiang 名字本身就是这个动作的拟声字 · 父母拍视频留念', en: 'The master lets the kid slap the noodle dough — biangbiang is the onomatopoeia of that exact slap; parents film for the highlight reel' } },
        { activity: { zh: '工作坊隔壁书店买一本写给孩子的丝路绘本', en: 'Pop into the bookshop next door · pick up a Silk Road kids\' picture book' }, minutes: 30 },
      ],
      evening: [
        { activity: { zh: '吃自己做的面 · 顾问发视频证据', en: 'Eat what you made · advisor records video evidence' }, minutes: 60, note: { zh: '吃自己做的面对孩子的成就感是这趟旅行的高分时刻 · 顾问现场剪 30 秒短片发到家庭群', en: 'Kids eating noodles they slapped themselves is one of the trip\'s peak moments — your advisor cuts a 30-sec reel for your family group chat right then' } },
        { activity: { zh: '回酒店泡澡 + 早睡', en: 'Hotel bath · early bed' }, minutes: 60 },
      ],
      images: [
        { src: '/landmarks/xian.jpg', alt: { zh: '西安面食工作坊孩子学做 biangbiang 面', en: 'Kid learning to make biangbiang noodles in a Xi\'an workshop' } },
        { src: '/landmarks/xian.jpg', alt: { zh: '秦岭野生动物园大熊猫吃竹', en: 'Giant panda eating bamboo at the Qinling Panda Centre' } },
        { src: '/landmarks/xian.jpg', alt: { zh: '工作坊孩子摔面瞬间', en: 'Kid slapping noodle dough in the workshop' } },
      ],
      tailorMakeTip: { zh: '想看真大熊猫繁育基地？飞成都加 2 天可以串进来。', en: 'Want the real panda breeding base? Add a 2-day Chengdu loop.' },
    },
    {
      day: 7,
      city: 'Zhangjiajie',
      cityCn: '张家界',
      morning: [
        { activity: { zh: '飞张家界 · 中午前抵达', en: 'Flight to Zhangjiajie · arrive by noon' }, minutes: 180 },
      ],
      afternoon: [
        { activity: { zh: '入住公园门口酒店 · 步行 10 分钟即景区入口', en: 'Park-gate hotel · 10-min walk to entrance' }, minutes: 60 },
        { activity: { zh: '酒店泳池或庭院 · 让孩子放电', en: 'Hotel pool or courtyard · let the kids burn energy' }, minutes: 120 },
      ],
      evening: [
        { activity: { zh: '酒店内吃湘西土家菜 · 不辣版本', en: 'Tujia mountain food at the hotel · ask for the non-spicy version' }, minutes: 60 },
      ],
      images: [{ src: '/landmarks/zhangjiajie.jpg', alt: { zh: '张家界国家森林公园门口', en: 'Entrance to Zhangjiajie National Forest Park' } }],
    },
    {
      day: 8,
      city: 'Zhangjiajie',
      cityCn: '张家界',
      morning: [
        { activity: { zh: '6:30 进山 · 百龙天梯上袁家界 · 看哈利路亚山雾', en: '06:30 enter · Bailong elevator up to Yuanjiajie · Hallelujah pillar in the mist' }, minutes: 180 },
      ],
      afternoon: [
        { activity: { zh: '天子山 · 短观景台路线 1 公里 · 不走 6 公里高山线', en: 'Tianzi mountain short viewpoint loop (1km) · skip the 6km ridge' }, minutes: 90 },
        { activity: { zh: '回酒店午休', en: 'Hotel nap' }, minutes: 120 },
      ],
      evening: [
        { activity: { zh: '酒店内简餐 · 早睡', en: 'Hotel dinner · early bed' }, minutes: 60 },
      ],
      images: [{ src: '/landmarks/zhangjiajie.jpg', alt: { zh: '袁家界哈利路亚山雾', en: 'Hallelujah pillar in mist, Yuanjiajie' } }],
      tailorMakeTip: { zh: '玻璃栈道默认不上 · 12 岁以上 + 父母都同意才安排。', en: 'Default skip the glass walkway · only with parents\' consent for kids 12+.' },
    },
    {
      day: 9,
      city: 'Zhangjiajie',
      cityCn: '张家界',
      morning: [
        { activity: { zh: '黄龙洞看钟乳石 · 室内适合下雨天', en: 'Huanglong Cave stalactites · indoor option that rescues a rainy day' }, minutes: 180 },
      ],
      afternoon: [
        { activity: { zh: '宝峰湖游船 · 30 分钟环湖', en: 'Baofeng Lake boat ride · 30-min loop' }, minutes: 90 },
        { activity: { zh: '回酒店午休', en: 'Hotel nap' }, minutes: 120 },
      ],
      evening: [
        { activity: { zh: '酒店泳池 + 简餐', en: 'Hotel pool + simple dinner' }, minutes: 90 },
      ],
      images: [{ src: '/landmarks/zhangjiajie.jpg', alt: { zh: '黄龙洞钟乳石', en: 'Stalactites inside Huanglong Cave' } }],
    },
    {
      day: 10,
      city: 'Shanghai',
      cityCn: '上海',
      morning: [
        { activity: { zh: '飞上海 · 上午抵达虹桥', en: 'Fly to Shanghai · land at Hongqiao mid-morning' }, minutes: 180 },
      ],
      afternoon: [
        { activity: { zh: '入住法租界亲子酒店 · 院子里能放电', en: 'Family hotel in the French Concession · courtyard for kids to run around' }, minutes: 60 },
        { activity: { zh: '武康路 + 衡山路慢走 + 法式面包房下午茶', en: 'Wukang Road + Hengshan Road slow walk + French bakery afternoon tea' }, minutes: 120 },
      ],
      evening: [
        { activity: { zh: '田子坊吃面 · 早睡', en: 'Tianzifang dinner · early bed' }, minutes: 90 },
      ],
      images: [{ src: '/landmarks/shanghai.jpg', alt: { zh: '上海法租界武康大楼', en: 'Wukang Mansion in the French Concession' } }],
    },
    {
      day: 11,
      city: 'Shanghai',
      cityCn: '上海',
      morning: [
        { activity: { zh: '上海科技馆 · 整上午馆内互动', en: 'Shanghai Science Museum · whole morning of hands-on exhibits' }, minutes: 240, note: { zh: '科技馆是孩子最容易过 4 小时的地方', en: 'Easiest 4-hour stretch you\'ll get with kids in China' } },
      ],
      afternoon: [
        { activity: { zh: '世纪公园野餐 · 下午自由', en: 'Century Park picnic · free afternoon' }, minutes: 180 },
      ],
      evening: [
        { activity: { zh: '外滩夜景 · 浦东对岸天际线', en: 'Bund at night · Pudong skyline opposite' }, minutes: 120 },
      ],
      images: [{ src: '/landmarks/shanghai.jpg', alt: { zh: '上海科技馆儿童区', en: 'Kid zone at Shanghai Science Museum' } }],
    },
    {
      day: 12,
      city: 'Shanghai',
      cityCn: '上海',
      morning: [
        { activity: { zh: '老城厢早茶 · 生煎 + 小笼 · 收尾餐', en: 'Old town breakfast · pan-fried buns and xiaolongbao · farewell meal' }, minutes: 90 },
      ],
      afternoon: [
        { activity: { zh: '司机送浦东机场 · 支持团队确认过完安检', en: 'Driver to Pudong Airport · support team confirms security clearance' }, minutes: 90 },
      ],
      evening: [
        { activity: { zh: '航班 · 顾问最后一条消息送祝福', en: 'Flight home · advisor sends a final safe-travels note' }, minutes: 60 },
      ],
      images: [{ src: '/landmarks/shanghai.jpg', alt: { zh: '上海老城厢生煎包', en: 'Pan-fried sheng jian bao at a Shanghai old town stall' } }],
    },
  ],
  highlights: [
    { icon: 'family', zh: '每个城市 3 晚整 · 减少打包行李对孩子的消耗', en: 'Three nights per city — fewer packing mornings, more child sleep' },
    { icon: 'wall', zh: '慕田峪长城滑车 · 孩子记得最久的瞬间', en: 'Mutianyu toboggan ride — the moment they\'ll remember the longest' },
    { icon: 'food', zh: '西安面食工作坊 · 自己做完自己吃', en: 'Xi\'an noodle workshop — make it, then eat it' },
    { icon: 'mountain', zh: '袁家界缆车线 · 不走玻璃栈道也看够峰林', en: 'Yuanjiajie via cable car — no glass walkway needed for the views' },
    { icon: 'star', zh: '上海科技馆 · 孩子能开心 4 小时的地方', en: 'Shanghai Science Museum — easy 4-hour kid-friendly stretch' },
  ],
  pricing: {
    base: [
      { hotelClass: '4-star', usdPerNight: 240, note: { zh: '家庭房 / 连通房 · 含早餐', en: 'Family or interconnecting rooms · breakfast included' } },
      { hotelClass: '5-star', usdPerNight: 460, note: { zh: '5 星家庭套房 · 婴儿床免费 · 儿童俱乐部', en: '5-star family suite · free cot · kids club' } },
      { hotelClass: 'luxury', usdPerNight: 780, note: { zh: '奢华品牌 · 私人管家 · 儿童 menu', en: 'Luxury brand · private butler · dedicated children\'s menu' } },
    ],
    inclusions: [
      { zh: '11 晚酒店 · 家庭房 / 连通房', en: '11 nights of hotel accommodation · family / interconnecting rooms' },
      { zh: '私人英语导游 · 在家庭组带过 200+ 团', en: 'Private English-speaking guide with 200+ family-trip experience' },
      { zh: '私人司机 + 商务车 + 儿童安全座椅', en: 'Private driver, business van and child seat' },
      { zh: '所有城际高铁商务座 / 国内航班 / 接送机', en: 'Inter-city bullet trains in business class, domestic flights, airport transfers' },
      { zh: '景点门票 + 提前预约', en: 'All entry tickets and timed reservations' },
      { zh: '面食工作坊 + 滑车 + 科技馆票', en: 'Noodle workshop, toboggan, Science Museum tickets included' },
      { zh: '行前包写清出行支持 + 紧急医疗联系人', en: 'Pre-departure support plan plus emergency medical contact' },
    ],
    exclusions: [
      { zh: '中国签证 / 国际机票 / 第三国签证（如适用）', en: 'China visa, international flights, third-country visas if applicable' },
      { zh: '午晚餐（顾问每天给候选餐厅 list）', en: 'Lunches and dinners (advisor sends a daily shortlist)' },
      { zh: '小费 / 个人消费 / 儿童玩具购买', en: 'Tips, personal spending, kids souvenirs' },
      { zh: '旅行保险（强烈建议）', en: 'Travel insurance (strongly recommended)' },
    ],
  },
  tailorMakeTips: [
    { zh: '12 天觉得太长？砍掉张家界压成 9 天，留下三城。', en: 'Twelve days too long? Drop Zhangjiajie for a 9-day three-city version.' },
    { zh: '想看大熊猫？飞成都基地 +2 天 · 替代西安半段。', en: 'Want pandas? Replace half of Xi\'an with a 2-day Chengdu base trip.' },
    { zh: '4 岁以下宝宝不建议张家界 · 我们替换成杭州西湖 + 西溪湿地。', en: 'For under-4 kids we swap Zhangjiajie for Hangzhou (West Lake + Xixi wetland).' },
    { zh: '想加迪士尼？上海段 +1 天可整入。', en: 'Add Disneyland? Stretch Shanghai by +1 day.' },
    { zh: '春节 / 国庆出行的家庭，强烈不建议这条路线（人潮 + 涨价）。', en: 'Avoid this itinerary during Chinese New Year or National Day Golden Week — too crowded, double prices.' },
  ],
  tripNotes: {
    accommodation: {
      zh: '每段酒店都验过家庭房 / 连通房可用 + 婴儿床尺寸 + 早餐含儿童选项 + 24h 热水。',
      en: 'Every hotel verified for family / interconnecting rooms, cot size, kid breakfast options, and 24h hot water.',
    },
    transportation: {
      zh: '高铁商务座家庭包厢；张家界航段可申请儿童单独预订座位；私人司机配儿童安全座椅。',
      en: 'Bullet train family pod in business class; pre-book child seats on the Zhangjiajie flights; private driver with child safety seat.',
    },
    meals: {
      zh: '每餐有儿童版本 · 不辣 / 低盐 / 软口选项；过敏前提交告诉我们，餐厅厨房会单独安排。',
      en: 'Kid-friendly versions at every meal · low-spice, low-salt, soft-textured options; declare allergies in advance and the kitchen prepares a separate plate.',
    },
    visa: {
      zh: '大部分护照需要 L 类旅游签 · 全家护照同时办最稳。带未成年儿童需户口本翻译件 / 父母同意书。',
      en: 'Most passports need an L-class tourist visa · easiest to apply as a family. Travelling with minors may need notarized parental consent.',
    },
  },
  advisorSlug: 'lin',
  status: 'hidden',
};

// ─── 4. honeymoon-9d ───────────────────────────────────────
const honeymoon9d: Itinerary = {
  slug: 'honeymoon-9d',
  title: {
    zh: '9 天蜜月 · 杭州 + 桂林 + 大理 + 上海',
    en: '9-day honeymoon · Hangzhou, Guilin, Dali & Shanghai',
  },
  kicker: {
    zh: 'HONEYMOON · 慢节奏 + 私享段',
    en: 'HONEYMOON · slow tempo + private moments',
  },
  days: 9,
  priceFromUsd: 5400,
  bestMonths: ['Apr', 'May', 'Sep', 'Oct', 'Nov'],
  themes: ['honeymoon', 'culture', 'nature', 'food'],
  destinations: ['shanghai', 'guilin', 'dali'],
  hero: HERO_BY_SLUG['honeymoon-9d'],
  intro: {
    zh: '蜜月版我们减城市加私享：杭州 2 晚西湖晨雾 · 桂林 + 阳朔 3 晚漓江私船 · 大理 2 晚洱海日落 · 上海 1 晚收尾。每一段都有一次只属于两个人的私享场景：包船 / 包院 / 包餐厅小厅。我们不上人多的大景点，节奏跟你的相机和你们俩的心情走。',
    en: 'Honeymoon version: fewer cities, more private moments. Two nights in Hangzhou for misty West Lake mornings, three nights split between Guilin and Yangshuo for a private bamboo raft on the Li, two nights in Dali for Erhai Lake sunsets, one night in Shanghai to soft-land. Every leg has at least one moment built for two: a private boat, a private courtyard, a private dining room. No crowded landmarks, tempo set by your camera and your mood.',
  },
  glance: [
    { day: 1, cities: ['Shanghai', 'Hangzhou'], oneLine: { zh: '抵达上海 · 高铁去杭州', en: 'Land in Shanghai · bullet train to Hangzhou' } },
    { day: 2, cities: ['Hangzhou'], oneLine: { zh: '西湖晨雾私船 · 龙井村下午茶', en: 'Misty West Lake by private boat · Longjing tea afternoon' } },
    { day: 3, cities: ['Hangzhou', 'Guilin'], oneLine: { zh: '飞桂林 · 入住阳朔河景酒店', en: 'Fly to Guilin · Yangshuo riverside hotel' } },
    { day: 4, cities: ['Yangshuo'], oneLine: { zh: '漓江私人竹筏 · 兴坪日落', en: 'Private bamboo raft on the Li · Xingping at sunset' } },
    { day: 5, cities: ['Yangshuo'], oneLine: { zh: '私人骑行 · 田园下午茶', en: 'Private cycle · countryside afternoon tea' } },
    { day: 6, cities: ['Yangshuo', 'Dali'], oneLine: { zh: '飞大理 · 洱海边精品酒店', en: 'Fly to Dali · Erhai-side boutique hotel' } },
    { day: 7, cities: ['Dali'], oneLine: { zh: '环洱海私人车 · 喜洲白族餐', en: 'Private Erhai loop · Bai-style lunch in Xizhou' } },
    { day: 8, cities: ['Dali', 'Shanghai'], oneLine: { zh: '飞上海 · 外滩夜景晚餐', en: 'Fly to Shanghai · Bund-view dinner' } },
    { day: 9, cities: ['Shanghai'], oneLine: { zh: '法租界早午餐 · 返程', en: 'French Concession brunch · departure' } },
  ],
  dayByDay: [
    {
      day: 1,
      city: 'Hangzhou',
      cityCn: '杭州',
      morning: [
        { activity: { zh: '抵达上海浦东 · 司机接送至上海虹桥火车站', en: 'Land at Pudong · driver transfers you to Hongqiao Station' }, minutes: 90 },
      ],
      afternoon: [
        { activity: { zh: '虹桥 14:30 高铁去杭州 · 1 小时', en: '14:30 bullet train to Hangzhou · 1h' }, minutes: 60 },
        { activity: { zh: '入住西湖湖畔精品酒店 · 主卧带湖景阳台', en: 'Check in at a West Lake boutique hotel · master bedroom with lake-view balcony' }, minutes: 60 },
      ],
      evening: [
        { activity: { zh: '湖畔私人晚餐 · 顾问安排杭帮菜小厅 · 不在公开餐厅吃', en: 'Private lakeside dinner · advisor books a private room at a Hangzhou-cuisine spot · no public dining' }, minutes: 120 },
      ],
      images: [{ src: '/landmarks/hangzhou.jpg', alt: { zh: '西湖湖畔黄昏', en: 'Dusk at West Lake, Hangzhou' } }],
      tailorMakeTip: { zh: '想要婚纱补拍？我们对接湖畔 1-2 个本地摄影师 · 半日 USD 800 起。', en: 'Want post-wedding photos? We line up 1–2 local photographers · half day from USD 800.' },
    },
    {
      day: 2,
      city: 'Hangzhou',
      cityCn: '杭州',
      morning: [
        { activity: { zh: '6:30 西湖私人摇橹船 · 雾里看雷峰塔倒影', en: '06:30 private rowing boat · Leifeng Pagoda mirrored in mist' }, minutes: 120, note: { zh: '私船 + 一名摇船师傅，我们提前包定 · 这位师傅家三代摇船，对每片荷叶后头藏着哪个角度的取景都门儿清', en: 'Private boat with one boatman, pre-booked exclusively for you; our boatman is third-generation — he knows the camera angle hiding behind every lotus leaf' } },
        { activity: { zh: '湖畔早餐 · 杭州小笼 + 江南粥', en: 'Lakeside breakfast · Hangzhou xiaolongbao + congee' }, minutes: 60, note: { zh: '吃早餐的茶馆 1923 年开始营业 · 老板娘会主动给你拍一张俩人的合照，挂上墙', en: 'The teahouse has been open since 1923; the owner always insists on a couple shot to add to her wall' } },
        { activity: { zh: '茶馆主屋包间留 30 分钟 · 看老相册', en: '30 min in the teahouse private room · flip through her century of customer photo albums' }, minutes: 30 },
      ],
      afternoon: [
        { activity: { zh: '龙井村茶山下午茶 · 包间 · 老茶师演示采茶炒茶', en: 'Private tea-house in a Longjing tea village · master demonstrates picking and pan-firing' }, minutes: 180, note: { zh: '老茶师 60+ 年龙井经验 · 现摘 + 现炒 + 现泡的 90 分钟从你们一起体验 · 顾问拍 30 秒视频做纪念', en: 'Our master has 60+ years pan-firing Longjing — pluck, fire, brew, all 90 min hands-on for you both; advisor films a 30-sec keepsake reel' } },
        { activity: { zh: '茶山步道散步 · 拍婚纱补拍备选机位', en: 'Walk the tea-terrace lanes · scout post-wedding photo angles for tomorrow' }, minutes: 60 },
      ],
      evening: [
        { activity: { zh: '晚餐 · 顾问推荐西湖南山路一家慢餐厅', en: 'Dinner at an unhurried place on Nanshan Road, west bank of the lake' }, minutes: 120, note: { zh: '主厨用龙井虾仁 + 莼菜汤 + 西湖醋鱼三道菜复述 1000 年杭帮菜 · 现场配你们点的私人晚酒', en: 'The chef threads Longjing shrimp, water-shield soup and West Lake vinegar fish into a thousand-year Hangzhou-cuisine narrative paired with your private wine' } },
        { activity: { zh: '湖边夜步 · 桥灯倒影', en: 'Night walk along the lake · bridge lanterns reflected on dark water' }, minutes: 60 },
      ],
      images: [
        { src: '/landmarks/hangzhou.jpg', alt: { zh: '西湖摇橹船晨雾', en: 'Rowing boat in West Lake morning mist' } },
        { src: '/landmarks/hangzhou.jpg', alt: { zh: '龙井村茶山现摘茶叶', en: 'Hand-plucked Longjing leaves in the tea village' } },
        { src: '/landmarks/hangzhou.jpg', alt: { zh: '南山路私人慢餐厅烛光晚餐', en: 'Candlelit private dinner on Nanshan Road' } },
      ],
    },
    {
      day: 3,
      city: 'Yangshuo',
      cityCn: '阳朔',
      morning: [
        { activity: { zh: '杭州萧山机场飞桂林 · 2 小时', en: 'Flight from Hangzhou Xiaoshan to Guilin · 2h' }, minutes: 120 },
      ],
      afternoon: [
        { activity: { zh: '司机直接送阳朔河景酒店 · 不在桂林市区停', en: 'Driver takes you straight to a Yangshuo riverside hotel · skip Guilin city' }, minutes: 90 },
        { activity: { zh: '酒店阳台喝茶 · 看漓江下午光线', en: 'Tea on the balcony · watch the afternoon light on the Li River' }, minutes: 90 },
      ],
      evening: [
        { activity: { zh: '酒店主厨为你们准备私人晚餐 · 阳台上吃 · 不进公共餐厅', en: 'Hotel chef prepares a private dinner served on your balcony · no public restaurant' }, minutes: 120 },
      ],
      images: [{ src: '/landmarks/guilin.jpg', alt: { zh: '阳朔漓江畔精品酒店阳台', en: 'Boutique hotel balcony overlooking the Li River, Yangshuo' } }],
    },
    {
      day: 4,
      city: 'Yangshuo',
      cityCn: '阳朔',
      morning: [
        { activity: { zh: '6:30 私人竹筏 · 漓江精华段 · 雾散时拍照最美', en: '06:30 private bamboo raft · Li River signature stretch · best light when the mist lifts' }, minutes: 180, note: { zh: '私筏老板是顾问 5 年合作伙伴 · 包定 6:30 是漓江雾散光开的黄金窗口 · 他知道哪 4 个停顿点拍出来不像普通游客', en: 'Our private rafter has worked with the advisor for 5 years — 06:30 is the golden window when the Li River mist lifts and the light opens; he knows four pauses that don\'t look like every other tourist photo' } },
        { activity: { zh: '筏上早餐 · 顾问准备的本地点心 + 茶', en: 'Breakfast on the raft · local pastries and tea packed by your advisor' }, minutes: 60 },
      ],
      afternoon: [
        { activity: { zh: '兴坪老镇午饭 · 吃啤酒鱼 · 私人厨房', en: 'Lunch in Xingping old town · beer fish in a private kitchen' }, minutes: 120, note: { zh: '私人厨房不在主街上 · 老房子改的 · 用漓江野生剑骨鱼 + 本地漓泉啤酒 + 院子里现摘的紫苏', en: 'The private kitchen is off the main lane in a converted old house — wild Lijiang dagger fish, local Lijiang Spring beer, perilla picked from the courtyard' } },
        { activity: { zh: '回酒店午休', en: 'Hotel rest' }, minutes: 120 },
      ],
      evening: [
        { activity: { zh: '兴坪段日落 · 20 元人民币背面那个位置 · 顾问陪同', en: 'Xingping sunset at the exact 20-yuan note bend · advisor accompanies' }, minutes: 90, note: { zh: '20 元背面那段是漓江最经典的 frame · 顾问会在你拍完后留下来给你们拍一张俩人合影 · 不收额外费', en: 'The 20-yuan note view is the Li River\'s most iconic frame; after your shot the advisor stays to take a clean couple photo at no extra charge' } },
        { activity: { zh: '回酒店阳台喝当地米酒 · 月光下的山', en: 'Hotel balcony with a local rice wine · karst silhouettes under moonlight' }, minutes: 60 },
      ],
      images: [
        { src: '/landmarks/guilin.jpg', alt: { zh: '兴坪漓江日落', en: 'Li River sunset at Xingping' } },
        { src: '/landmarks/guilin.jpg', alt: { zh: '漓江清晨竹筏雾散', en: 'Bamboo raft on the Li River as morning mist lifts' } },
        { src: '/landmarks/guilin.jpg', alt: { zh: '兴坪私人厨房院落啤酒鱼', en: 'Beer fish in a private courtyard kitchen, Xingping' } },
      ],
      tailorMakeTip: { zh: '想 2 人独享印象刘三姐 VIP 包间？需要 USD 200 加价 · 提前 5 天预订。', en: 'Want a 2-seat VIP box at the Impression Sanjie Liu show? +USD 200 · 5-day pre-booking.' },
    },
    {
      day: 5,
      city: 'Yangshuo',
      cityCn: '阳朔',
      morning: [
        { activity: { zh: '私人公路自行车 · 骑十里画廊 · 月亮山下停', en: 'Private road-bike ride · Ten-Mile Gallery · stop under Moon Hill' }, minutes: 180 },
      ],
      afternoon: [
        { activity: { zh: '田园下午茶 · 顾问包定一家本地茶园院子', en: 'Countryside tea · advisor books a local tea-garden courtyard for two' }, minutes: 150 },
        { activity: { zh: '回酒店泡澡 · 阳台喝酒看日落', en: 'Back to hotel · long bath · sunset and a glass on the balcony' }, minutes: 90 },
      ],
      evening: [
        { activity: { zh: '主厨私人晚餐 · 户外烤鱼 · 江景座位', en: 'Chef\'s private dinner · river-side grilled fish · river-view seating' }, minutes: 120 },
      ],
      images: [{ src: '/landmarks/guilin.jpg', alt: { zh: '阳朔月亮山下骑行', en: 'Cycling under Moon Hill, Yangshuo' } }],
    },
    {
      day: 6,
      city: 'Dali',
      cityCn: '大理',
      morning: [
        { activity: { zh: '桂林两江机场飞大理 · 2 小时', en: 'Flight from Guilin to Dali · 2h' }, minutes: 120, note: { zh: '建议右窗 · 飞经云贵高原能看到山脉俯瞰画面 · 顾问准备一张本地白族音乐播放清单给你们路上听', en: 'Right-window seat is best — you cross the Yunnan-Guizhou plateau and see the mountains from above; advisor preloads a Bai-music playlist for the ride' } },
      ],
      afternoon: [
        { activity: { zh: '入住洱海西岸精品酒店 · 主卧朝湖', en: 'Check in at an Erhai west-shore boutique · master bedroom faces the lake' }, minutes: 60 },
        { activity: { zh: '酒店私人庭院午茶 · 苍山做背景', en: 'Hotel private courtyard tea · Cangshan range as backdrop' }, minutes: 120, note: { zh: '酒店主厨用本地三道茶（苦/甜/回味）作为下午茶 · 配大理金花糕 · 庭院里有 200 年老海棠', en: 'The chef serves the local three-course tea (bitter / sweet / aftertaste) with Dali jinhua cake under a 200-year-old crabapple in the courtyard' } },
        { activity: { zh: '酒店阳台躺一会 · 看洱海下午光线变化', en: 'Lie on the balcony · watch how Erhai\'s afternoon light shifts' }, minutes: 60 },
      ],
      evening: [
        { activity: { zh: '酒店主厨白族餐 · 在湖畔露台开 · 私人桌', en: 'Bai-cuisine dinner from the hotel chef · lakeside terrace · private table' }, minutes: 120, note: { zh: '主厨白族出身 · 4 道主菜（生皮 + 砂锅鱼 + 乳扇 + 雕梅扣肉）+ 顾问预订露台位 · 看洱海日落同步进行', en: 'The chef is Bai-born — four mains (raw pork carpaccio, claypot fish, milk-fan cheese, plum-glazed pork belly) served on the terrace as the Erhai sunset runs alongside' } },
        { activity: { zh: '湖畔散步 · 月光下的洱海', en: 'Lakeside walk · Erhai under moonlight' }, minutes: 30 },
      ],
      images: [
        { src: '/landmarks/dali.jpg', alt: { zh: '洱海西岸日落', en: 'Sunset on the western shore of Erhai Lake' } },
        { src: '/landmarks/dali.jpg', alt: { zh: '酒店庭院三道茶', en: 'Three-course Bai tea in the hotel courtyard' } },
        { src: '/landmarks/dali.jpg', alt: { zh: '苍山做背景的露台白族晚餐', en: 'Bai dinner on the terrace with the Cangshan range behind' } },
      ],
    },
    {
      day: 7,
      city: 'Dali',
      cityCn: '大理',
      morning: [
        { activity: { zh: '私人车环洱海 · 半圈停喜洲', en: 'Private car around Erhai · pause in Xizhou' }, minutes: 240 },
      ],
      afternoon: [
        { activity: { zh: '喜洲白族院落午饭 · 私人厨房 · 学做一盘喜洲粑粑', en: 'Lunch at a Bai courtyard in Xizhou · private kitchen · learn to make one Xizhou flatbread' }, minutes: 180 },
        { activity: { zh: '回酒店泡澡 · 看洱海下午光线', en: 'Hotel soak · afternoon light on Erhai' }, minutes: 90 },
      ],
      evening: [
        { activity: { zh: '私人晚餐 · 顾问安排大理古城内一处院落', en: 'Private dinner · advisor books a Dali old-town courtyard' }, minutes: 120 },
      ],
      images: [{ src: '/landmarks/dali.jpg', alt: { zh: '喜洲白族院落', en: 'Bai courtyard in Xizhou, Dali' } }],
      tailorMakeTip: { zh: '想看苍山日出？需要 4:00 起床上山 · 默认不排，问意愿。', en: 'Cangshan sunrise? Means 04:00 alarm · default skip, ask if you want it.' },
    },
    {
      day: 8,
      city: 'Shanghai',
      cityCn: '上海',
      morning: [
        { activity: { zh: '大理飞上海虹桥 · 2.5 小时', en: 'Flight from Dali to Shanghai Hongqiao · 2.5h' }, minutes: 150 },
      ],
      afternoon: [
        { activity: { zh: '入住外滩 5 星酒店 · 浦东天际线房', en: 'Check in at a Bund 5-star hotel · Pudong-skyline room' }, minutes: 60 },
        { activity: { zh: '法租界武康路 + 衡山路午后散步', en: 'Afternoon walk on Wukang Road and Hengshan Road, French Concession' }, minutes: 120 },
      ],
      evening: [
        { activity: { zh: '外滩 18 号顶楼私人晚餐 · 浦东全景灯光秀', en: 'Private rooftop dinner at Bund 18 · the full Pudong light show' }, minutes: 150 },
      ],
      images: [{ src: '/landmarks/shanghai.jpg', alt: { zh: '上海外滩夜景晚餐桌', en: 'Dinner table overlooking the Shanghai Bund at night' } }],
    },
    {
      day: 9,
      city: 'Shanghai',
      cityCn: '上海',
      morning: [
        { activity: { zh: '法租界一家咖啡馆早午餐 · 自由时间', en: 'Brunch at a French Concession café · free time' }, minutes: 120 },
      ],
      afternoon: [
        { activity: { zh: '司机送浦东机场 · 支持团队确认送机收尾', en: 'Driver to Pudong Airport · support team confirms departure handoff' }, minutes: 90 },
      ],
      evening: [
        { activity: { zh: '航班 · 顾问最后一条消息', en: 'Flight home · advisor sends a final note' }, minutes: 30 },
      ],
      images: [{ src: '/landmarks/shanghai.jpg', alt: { zh: '上海法租界咖啡馆', en: 'Café in the Shanghai French Concession' } }],
    },
  ],
  highlights: [
    { icon: 'heart', zh: '西湖私人摇橹船 · 雾里只有你们俩', en: 'Private West Lake rowing boat · only you two in the mist' },
    { icon: 'water', zh: '漓江私人竹筏 · 兴坪日落 · 顾问陪到取景点离开', en: 'Private Li River raft · Xingping sunset · advisor guides through composition' },
    { icon: 'sunset', zh: '洱海西岸日落 · 苍山做远景', en: 'Sunset on Erhai\'s west shore · Cangshan as the backdrop' },
    { icon: 'food', zh: '每一晚都是私人晚餐 · 不是公共餐厅', en: 'Every dinner is private · never in a public dining room' },
    { icon: 'photo', zh: '婚纱补拍 · 西湖 / 漓江 / 洱海三选一', en: 'Optional post-wedding photo session · pick West Lake, Li River or Erhai' },
  ],
  pricing: {
    base: [
      { hotelClass: '5-star', usdPerNight: 540, note: { zh: '湖景 / 河景房 · 含私人早餐', en: 'Lake- or river-view rooms · private breakfast included' } },
      { hotelClass: 'luxury', usdPerNight: 980, note: { zh: '奢华品牌 · 主卧 + 起居室 · 私人管家', en: 'Luxury brand · suite with master bedroom + living room · private butler' } },
      { hotelClass: 'simple', usdPerNight: 220, note: { zh: '设计酒店 · 不挂奢华标但氛围足', en: 'Design hotel · not branded luxury but atmosphere intact' } },
    ],
    inclusions: [
      { zh: '8 晚酒店 · 全程主卧带阳台 / 露台', en: '8 nights of hotel accommodation · master bedroom with balcony or terrace' },
      { zh: '4 次私人晚餐 / 主厨晚餐 · 全程不进公共餐厅', en: '4 private dinners / chef\'s dinners · no public dining throughout' },
      { zh: '私人英语向导 · 蜜月组顾问带过 80+ 蜜月团', en: 'Private English-speaking guide with 80+ honeymoon trips experience' },
      { zh: '私人司机 + 高端商务车 · 全程跟到底', en: 'Private driver and premium business van throughout' },
      { zh: '所有城际高铁 / 国内航班 / 接送机', en: 'All inter-city bullet trains, domestic flights, airport transfers' },
      { zh: '西湖私船 + 漓江私筏 + 洱海私人环湖车', en: 'Private West Lake boat + private Li River raft + private Erhai loop' },
      { zh: '行前包写清出行支持方式', en: 'Pre-departure pack documents support channels' },
    ],
    exclusions: [
      { zh: '中国签证 / 国际机票', en: 'China visa and international flights' },
      { zh: '婚纱摄影服务（如需要可加 USD 800-2,500）', en: 'Wedding-photography service (optional add-on, USD 800–2,500)' },
      { zh: '红酒 / 香槟 / 单次酒水（餐厅按需要点）', en: 'Wine, champagne, single-pour drinks (ordered as you go)' },
      { zh: '小费 / 个人消费', en: 'Tips and personal spending' },
      { zh: '旅行保险', en: 'Travel insurance' },
    ],
  },
  tailorMakeTips: [
    { zh: '想加日本一段做"中日蜜月"？我们可以从上海段直接接 240h 路径回东京。', en: 'Add a Japan leg as "China + Japan honeymoon"? We can connect Shanghai directly to a Tokyo onward via 240h.' },
    { zh: '只有 7 天？砍掉大理段，杭州 + 桂林 + 上海能压成 7 天蜜月。', en: 'Only 7 days? Drop Dali — Hangzhou + Guilin + Shanghai compresses to a 7-day honeymoon.' },
    { zh: '想要一段海岛？舟山 / 三亚可以替换大理段。', en: 'Want a beach leg? Zhoushan or Sanya can replace Dali.' },
    { zh: '过敏 / 素食？所有私人晚餐预订时同步告诉我们，主厨单独安排。', en: 'Allergies or vegetarian? Tell us when booking — every chef adapts privately.' },
    { zh: '想求婚？告诉顾问，我们 +USD 600 安排西湖船头或洱海露台时间锁定 + 摄影。', en: 'Planning to propose? +USD 600 for a locked West Lake boat-bow or Erhai terrace moment + photographer.' },
  ],
  tripNotes: {
    accommodation: {
      zh: '每段都是 5 星或精品酒店主卧 · 早餐私人送餐 · 阳台 / 露台是必需。',
      en: 'Every leg in a 5-star or boutique master bedroom · breakfast served privately · balcony or terrace required.',
    },
    transportation: {
      zh: '私人高端商务车全程跟到底；高铁商务座 + 国内航班直飞段；阳朔段配本地骑行向导。',
      en: 'Premium private van throughout; bullet train business class + non-stop domestic flights; Yangshuo leg includes a local cycling guide.',
    },
    meals: {
      zh: '8 顿晚餐含 4 顿私人晚餐 / 主厨晚餐 · 早午餐含进酒店预订。',
      en: '8 dinners include 4 private chef\'s dinners · breakfasts and brunches included with hotel.',
    },
    visa: {
      zh: '大部分护照需要 L 类旅游签 · 蜜月期建议提前 6 周办签证 + 国际机票。',
      en: 'Most passports need an L-class tourist visa · for honeymoon timing apply 6 weeks ahead with international tickets locked.',
    },
  },
  advisorSlug: 'lin',
  status: 'hidden',
};

// ─── 5. nature-14d ─────────────────────────────────────────
const nature14d: Itinerary = {
  slug: 'nature-14d',
  title: {
    zh: '14 天自然摄影 · 九寨沟 + 张家界 + 黄山 + 桂林',
    en: '14-day nature & photography · Jiuzhaigou, Zhangjiajie, Huangshan & Guilin',
  },
  kicker: {
    zh: 'NATURE · 4 个 UNESCO + 摄影向',
    en: 'NATURE · 4 UNESCO sites + photography focus',
  },
  days: 14,
  priceFromUsd: 5800,
  bestMonths: ['Apr', 'May', 'Sep', 'Oct'],
  themes: ['nature', 'culture'],
  destinations: ['jiuzhaigou', 'zhangjiajie', 'huangshan', 'guilin'],
  hero: HERO_BY_SLUG['nature-14d'],
  intro: {
    zh: '14 天 4 个 UNESCO 自然遗产：九寨沟翡翠水 + 张家界峰林 + 黄山云海 + 桂林喀斯特。这条路线是给摄影向 / 长徒步向旅客写的，每个景区都有 3-4 天深度，不是飞过场。日程会根据你的体力做减法，但每段都有一次"清晨 5 点起床"的奖励 - 雾散光开的那一刻。',
    en: 'Fourteen days, four UNESCO natural sites: Jiuzhaigou jade water, Zhangjiajie pillars, Huangshan sea of clouds, Guilin karst. This is the photography / long-trek itinerary — three to four days at each site, not a fly-by. Pace adjusts to your fitness, but every leg includes one 05:00 alarm — the moment the mist breaks and the light opens.',
  },
  glance: [
    { day: 1, cities: ["Chengdu"], oneLine: { zh: '抵达成都 · 入住宽窄巷子', en: 'Land in Chengdu · check in near Kuanzhai Alley' } },
    { day: 2, cities: ["Chengdu", "Jiuzhaigou"], oneLine: { zh: '飞九寨沟 · 高原适应', en: 'Fly to Jiuzhaigou · acclimatize to altitude' } },
    { day: 3, cities: ['Jiuzhaigou'], oneLine: { zh: '九寨沟 Y 沟核心 · 五花海', en: 'Jiuzhaigou Y-valley core · Five Flower Lake' } },
    { day: 4, cities: ['Jiuzhaigou'], oneLine: { zh: '日则沟 · 长海 + 五彩池', en: 'Rize valley · Long Lake + Multicolored Pond' } },
    { day: 5, cities: ['Jiuzhaigou'], oneLine: { zh: '黄龙 · 钙化彩池', en: 'Huanglong · travertine terrace pools' } },
    { day: 6, cities: ['Jiuzhaigou', 'Zhangjiajie'], oneLine: { zh: '飞张家界 · 入住景区门口', en: 'Fly to Zhangjiajie · park-gate hotel' } },
    { day: 7, cities: ['Zhangjiajie'], oneLine: { zh: '袁家界 · 哈利路亚山摄影', en: 'Yuanjiajie · Hallelujah pillar photo session' } },
    { day: 8, cities: ['Zhangjiajie'], oneLine: { zh: '天子山高山线 · 6km 步行', en: 'Tianzi mountain ridge · 6km hike' } },
    { day: 9, cities: ['Zhangjiajie', 'Huangshan'], oneLine: { zh: '飞黄山 · 上山住山顶', en: 'Fly to Huangshan · sleep on the summit' } },
    { day: 10, cities: ['Huangshan'], oneLine: { zh: '黄山日出 + 西海大峡谷', en: 'Huangshan sunrise + West Sea Grand Canyon' } },
    { day: 11, cities: ['Huangshan'], oneLine: { zh: '宏村 · 徽派建筑半日', en: 'Hongcun village · half day of Hui-style architecture' } },
    { day: 12, cities: ['Huangshan', 'Guilin'], oneLine: { zh: '飞桂林 · 入住阳朔', en: 'Fly to Guilin · base in Yangshuo' } },
    { day: 13, cities: ['Yangshuo'], oneLine: { zh: '漓江摄影日 · 兴坪日落', en: 'Li River photo day · Xingping sunset' } },
    { day: 14, cities: ['Guilin'], oneLine: { zh: '飞回出发城市 · 顾问送机', en: 'Fly to your departure city · advisor handover' } },
  ],
  dayByDay: [
    {
      day: 1,
      city: 'Chengdu',
      cityCn: '成都',
      morning: [
        { activity: { zh: '抵达成都双流 · 司机接机', en: 'Land at Chengdu Shuangliu · driver pickup' }, minutes: 60 },
      ],
      afternoon: [
        { activity: { zh: '入住宽窄巷子片区精品酒店', en: 'Check in at a Kuanzhai Alley boutique hotel' }, minutes: 60 },
        { activity: { zh: '宽窄巷子茶馆下午茶 · 看采耳师傅', en: 'Tea-house in Kuanzhai · watch the ear-cleaning artisans' }, minutes: 120 },
      ],
      evening: [
        { activity: { zh: '锦里晚饭 · 川菜小厅', en: 'Jinli dinner · Sichuan in a private room' }, minutes: 90 },
      ],
      images: [{ src: '/landmarks/chengdu.jpg', alt: { zh: '成都宽窄巷子茶馆', en: 'Tea house at Kuanzhai Alley, Chengdu' } }],
      tailorMakeTip: { zh: '想看成都熊猫基地？提前一天来，D0 加 1 天上午半日。', en: 'Want the panda base? Add a +1 day arriving early, half-day at D0.' },
    },
    {
      day: 2,
      city: 'Jiuzhaigou',
      cityCn: '九寨沟',
      morning: [
        { activity: { zh: '成都飞九寨沟黄龙机场 · 1 小时 · 海拔 3,500m', en: 'Fly Chengdu to Jiuzhaigou Huanglong · 1h · airport at 3,500m' }, minutes: 90, note: { zh: '高原反应预防：抵达后第一天不安排徒步 · 多喝热水', en: 'Altitude prep: no hikes day one · plenty of warm water' } },
      ],
      afternoon: [
        { activity: { zh: '司机送景区门口酒店 · 海拔 2,000m 段 · 适应一晚', en: 'Driver to a park-gate hotel · descended to 2,000m for the first night' }, minutes: 90 },
        { activity: { zh: '酒店附近藏寨慢散步 · 不徒步', en: 'Slow walk through nearby Tibetan villages · no hiking' }, minutes: 90 },
      ],
      evening: [
        { activity: { zh: '酒店内吃藏餐 · 早睡', en: 'Tibetan dinner at the hotel · early bed' }, minutes: 60 },
      ],
      images: [{ src: '/landmarks/jiuzhaigou.jpg', alt: { zh: '九寨沟藏寨彩绘房', en: 'Tibetan painted houses near Jiuzhaigou' } }],
    },
    {
      day: 3,
      city: 'Jiuzhaigou',
      cityCn: '九寨沟',
      morning: [
        { activity: { zh: '6:00 进九寨沟 · 树正沟 · 摄影最佳光线', en: '06:00 enter Jiuzhaigou · Shuzheng valley · best photography light' }, minutes: 240, note: { zh: '6 点是 Y 沟核心区一天里光线最干净的窗口 · 顾问预订景区第一班观光车 · 比 8 点排队的人少 80%', en: '06:00 is the cleanest light window of the day in the Y-valley core; advisor pre-books the first park shuttle, putting you 80% ahead of the 8 a.m. queues' } },
        { activity: { zh: '诺日朗瀑布等彩虹 · 配 ND 滤镜慢门拍水', en: 'Nuorilang Falls — wait for a rainbow, fit an ND filter for slow-shutter water' }, minutes: 60 },
      ],
      afternoon: [
        { activity: { zh: '则查洼沟 · 五花海 · 翡翠水拍摄', en: 'Zechawa valley · Five Flower Lake · jade-water shoot' }, minutes: 180, note: { zh: '上午 11 点前最美 · 下午光线变硬；用 CPL 滤镜消除水面反光，能看清水底彩色钙化层', en: 'Best before 11:00 — light gets harsh after; a CPL filter cuts the surface glare so you can read the coloured calcified bed underneath' } },
        { activity: { zh: '景区内午餐 · 在长海餐厅吃藏族手抓饭 + 酥油茶', en: 'In-park lunch — Tibetan hand-grabbed rice and butter tea at the Long Lake canteen' }, minutes: 60 },
      ],
      evening: [
        { activity: { zh: '回酒店 · 整理摄影素材', en: 'Back to hotel · review the day\'s photographs' }, minutes: 90, note: { zh: '一天 600+ 张片子 · 顾问帮你按时段 + 沟段标签整理 · 离开九寨前导出工程文件', en: 'Today\'s 600+ files — your advisor helps tag them by time of day and valley segment, then exports the project before you leave' } },
        { activity: { zh: '酒店阳台一杯青稞酒 · 看星空（海拔 2,000m 无光污染）', en: 'A pour of barley liquor on the balcony · star-watching at 2,000 m with zero light pollution' }, minutes: 30 },
      ],
      images: [
        { src: '/landmarks/jiuzhaigou.jpg', alt: { zh: '九寨沟五花海翡翠水', en: 'Jade water of Five Flower Lake, Jiuzhaigou' } },
        { src: '/landmarks/jiuzhaigou.jpg', alt: { zh: '诺日朗瀑布慢门水雾', en: 'Slow-shutter mist at Nuorilang Falls' } },
        { src: '/landmarks/jiuzhaigou.jpg', alt: { zh: '九寨沟树正沟早晨光线', en: 'Morning light in Shuzheng valley, Jiuzhaigou' } },
      ],
    },
    {
      day: 4,
      city: 'Jiuzhaigou',
      cityCn: '九寨沟',
      morning: [
        { activity: { zh: '6:00 进园 · 日则沟 · 长海 + 五彩池', en: '06:00 enter · Rize valley · Long Lake + Multicolored Pond' }, minutes: 300 },
      ],
      afternoon: [
        { activity: { zh: '熊猫海 + 箭竹海 · 短徒步', en: 'Panda Lake + Arrow Bamboo Lake · short walks' }, minutes: 180 },
      ],
      evening: [
        { activity: { zh: '酒店休息 · 明天黄龙日出早起', en: 'Hotel rest · early start for Huanglong sunrise tomorrow' }, minutes: 60 },
      ],
      images: [{ src: '/landmarks/jiuzhaigou.jpg', alt: { zh: '九寨沟五彩池晨光', en: 'Multicolored Pond at dawn, Jiuzhaigou' } }],
      tailorMakeTip: { zh: '体力一般？把 D3+D4 合并成一日游核心区，省一天给黄龙。', en: 'Lower fitness? Merge D3 and D4 into one core-area day, save a day for Huanglong.' },
    },
    {
      day: 5,
      city: 'Jiuzhaigou',
      cityCn: '九寨沟',
      morning: [
        { activity: { zh: '6:30 出发黄龙 · 1.5h 车程 · 海拔 3,500m', en: '06:30 to Huanglong · 1.5h drive · altitude 3,500m' }, minutes: 90, note: { zh: '车上备好红景天 + 葡萄糖 · 海拔从 2,000 到 3,500 一小时内拉升，需要循序适应', en: 'Have rhodiola tablets and glucose ready — climbing from 2,000 to 3,500 m within an hour means you should ease the body into it' } },
        { activity: { zh: '索道上 · 走钙化彩池栈道下 · 4h', en: 'Cable car up · walk down through travertine pool boardwalks · 4h' }, minutes: 240, note: { zh: '高原徒步 · 慢走 · 携带氧气罐；钙化池上午 10–12 点光线最好，五彩池色彩饱和度最高', en: 'High-altitude trek · slow pace · carry an oxygen canister; the travertine pools peak 10:00–12:00 when colour saturation hits its highest at the top Multicolored Pond' } },
      ],
      afternoon: [
        { activity: { zh: '回九寨沟县城 · 酒店午休', en: 'Back to Jiuzhaigou county · hotel rest' }, minutes: 120, note: { zh: '黄龙下来后必须真正午休 2 小时 · 多人轻微高反，不要立即坐车出发去藏寨', en: 'A real two-hour nap after Huanglong is non-negotiable — mild altitude reactions are common, do not immediately drive to a Tibetan village' } },
        { activity: { zh: '酒店附近藏寨手作店 · 看本地银匠打银 30 分钟', en: 'Tibetan handicraft shop near the hotel · watch a local silversmith forge 30 min' }, minutes: 60 },
      ],
      evening: [
        { activity: { zh: '酒店简餐 · 早睡', en: 'Hotel simple dinner · early bed' }, minutes: 60, note: { zh: '明天飞张家界要 6 点起 · 今晚 9 点必须躺床 · 顾问在 8:30 发明早叫醒 + 行李整理清单', en: 'Tomorrow needs a 6 a.m. start for the Zhangjiajie flight; lights out by 9 p.m.; the advisor pings the wake-up + luggage checklist at 8:30' } },
      ],
      images: [
        { src: '/landmarks/jiuzhaigou.jpg', alt: { zh: '黄龙钙化彩池', en: 'Travertine pools at Huanglong' } },
        { src: '/landmarks/jiuzhaigou.jpg', alt: { zh: '黄龙五彩池正午光线', en: 'Multicolored Pond at midday, Huanglong' } },
        { src: '/landmarks/jiuzhaigou.jpg', alt: { zh: '九寨沟县藏寨银匠铺', en: 'Tibetan silversmith workshop in Jiuzhaigou county' } },
      ],
    },
    {
      day: 6,
      city: 'Zhangjiajie',
      cityCn: '张家界',
      morning: [
        { activity: { zh: '九寨沟黄龙机场飞张家界 · 转机成都', en: 'Fly Jiuzhaigou Huanglong to Zhangjiajie · transit Chengdu' }, minutes: 360 },
      ],
      afternoon: [
        { activity: { zh: '抵达后司机送景区门口酒店', en: 'On arrival, driver takes you to a park-gate hotel' }, minutes: 90 },
        { activity: { zh: '入住 · 短散步 · 不进山', en: 'Check in · short walk · no entering the park today' }, minutes: 90 },
      ],
      evening: [
        { activity: { zh: '酒店湘西土家菜', en: 'Hotel Tujia mountain dinner' }, minutes: 60 },
      ],
      images: [{ src: '/landmarks/zhangjiajie.jpg', alt: { zh: '张家界国家森林公园门口', en: 'Entrance to Zhangjiajie National Forest Park' } }],
    },
    {
      day: 7,
      city: 'Zhangjiajie',
      cityCn: '张家界',
      morning: [
        { activity: { zh: '5:30 进山 · 百龙天梯上 · 6:30 上袁家界看日出 + 雾', en: '05:30 enter · Bailong elevator · arrive Yuanjiajie 06:30 for sunrise + mist' }, minutes: 180, note: { zh: '雾里峰林是这条路线的关键画面 · 不能错过；日出后 30 分钟雾气最厚，光从云缝里斜进来', en: 'Mist + pillars is the iconic shot of this trip — do not miss; the mist is heaviest 30 min after sunrise when light slices through the cloud gaps' } },
        { activity: { zh: '迷魂台 + 后花园 · 不挤的备选机位', en: 'Mihun Terrace + Back Garden · less-photographed alternates' }, minutes: 60 },
      ],
      afternoon: [
        { activity: { zh: '哈利路亚山观景台 · 不同角度 3-4 个机位', en: 'Hallelujah pillar viewpoint · 3–4 different angles' }, minutes: 180, note: { zh: '哈利路亚山有 4 个观景台 · 顺时针走能拍到 3 种不同的雾散节奏 · 顾问提供机位地图', en: 'Four viewpoints around the Hallelujah pillar — going clockwise catches three distinct mist-clearing rhythms; advisor hands you a pre-marked angles map' } },
        { activity: { zh: '景区内简餐 · 米饭团 + 腌菜', en: 'Park snack — rice ball with pickled greens' }, minutes: 30 },
      ],
      evening: [
        { activity: { zh: '回酒店 · 整理素材', en: 'Hotel · review files' }, minutes: 60, note: { zh: '把今天的雾景片子按 RAW + 时间戳归档 · 重要：今晚备份 SD 卡到笔记本', en: 'Archive today\'s misty RAWs by timestamp; important — back the SD card up to your laptop tonight' } },
        { activity: { zh: '酒店附近土家小馆 · 山珍菇汤 + 腊肉', en: 'Tujia hole-in-the-wall near hotel — wild mushroom soup and cured pork' }, minutes: 60 },
      ],
      images: [
        { src: '/landmarks/zhangjiajie.jpg', alt: { zh: '袁家界哈利路亚山雾', en: 'Hallelujah pillar in mist, Yuanjiajie' } },
        { src: '/landmarks/zhangjiajie.jpg', alt: { zh: '迷魂台后花园隐蔽机位', en: 'Hidden viewpoint at Mihun Back Garden, Zhangjiajie' } },
        { src: '/landmarks/zhangjiajie.jpg', alt: { zh: '袁家界日出后雾散瞬间', en: 'Mist clearing 30 min after sunrise at Yuanjiajie' } },
      ],
    },
    {
      day: 8,
      city: 'Zhangjiajie',
      cityCn: '张家界',
      morning: [
        { activity: { zh: '6:00 进山 · 天子山高山线 6km 徒步 · 6 个观景台', en: '06:00 enter · Tianzi ridge 6km hike · 6 viewpoints' }, minutes: 300 },
      ],
      afternoon: [
        { activity: { zh: '金鞭溪溪谷 · 1.5km 平缓徒步', en: 'Golden Whip Stream · 1.5km easy walk' }, minutes: 120 },
      ],
      evening: [
        { activity: { zh: '酒店泡脚 · 早睡', en: 'Hotel foot soak · early bed' }, minutes: 60 },
      ],
      images: [{ src: '/landmarks/zhangjiajie.jpg', alt: { zh: '天子山高山线观景台', en: 'Viewpoint along the Tianzi ridge trail' } }],
      tailorMakeTip: { zh: '想要更野的徒步？大峡谷 + 凤凰古城可以加 +2 天替换 D8/D9。', en: 'Want a wilder trek? Add Grand Canyon + Phoenix Old Town as +2 days replacing D8/D9.' },
    },
    {
      day: 9,
      city: 'Huangshan',
      cityCn: '黄山',
      morning: [
        { activity: { zh: '张家界飞黄山屯溪 · 1.5h', en: 'Fly Zhangjiajie to Huangshan Tunxi · 1.5h' }, minutes: 90 },
      ],
      afternoon: [
        { activity: { zh: '司机送黄山南门 · 索道上山 · 入住山顶酒店', en: 'Driver to Huangshan south gate · cable car to summit · check in at a summit hotel' }, minutes: 180, note: { zh: '山顶酒店紧张，蜜月版 / 摄影版必须提前 6 周预订', en: 'Summit hotels are scarce — for honeymoon and photo trips book 6 weeks ahead' } },
      ],
      evening: [
        { activity: { zh: '酒店夕阳露台 · 看光明顶日落', en: 'Hotel sunset terrace · Bright Top sunset' }, minutes: 90 },
      ],
      images: [{ src: '/landmarks/huangshan.jpg', alt: { zh: '黄山光明顶日落', en: 'Sunset from Bright Top, Huangshan' } }],
    },
    {
      day: 10,
      city: 'Huangshan',
      cityCn: '黄山',
      morning: [
        { activity: { zh: '4:30 起床 · 走 1.5km 到光明顶看日出 · 云海最美', en: '04:30 alarm · 1.5km to Bright Top for sunrise · best sea-of-cloud window' }, minutes: 120 },
      ],
      afternoon: [
        { activity: { zh: '西海大峡谷 · 索道环线 · 半日徒步', en: 'West Sea Grand Canyon · cable-car loop · half-day hike' }, minutes: 240 },
      ],
      evening: [
        { activity: { zh: '回山顶酒店 · 露台晚餐 · 早睡', en: 'Back to summit hotel · terrace dinner · early bed' }, minutes: 90 },
      ],
      images: [{ src: '/landmarks/huangshan.jpg', alt: { zh: '黄山云海日出', en: 'Sea of clouds at sunrise, Huangshan' } }],
    },
    {
      day: 11,
      city: 'Huangshan',
      cityCn: '黄山',
      morning: [
        { activity: { zh: '索道下山 · 司机送宏村', en: 'Cable car down · driver to Hongcun village' }, minutes: 90 },
        { activity: { zh: '宏村半日 · 徽派建筑 · 月沼 + 南湖', en: 'Half day in Hongcun · Hui-style architecture · Moon Pond + South Lake' }, minutes: 180 },
      ],
      afternoon: [
        { activity: { zh: '宏村农家午饭 · 徽菜', en: 'Local family lunch in Hongcun · Hui cuisine' }, minutes: 90 },
        { activity: { zh: '回屯溪老街 · 入住酒店', en: 'Back to Tunxi old street · check in at a heritage hotel' }, minutes: 90 },
      ],
      evening: [
        { activity: { zh: '屯溪老街晚餐 · 自由时间', en: 'Tunxi old street dinner · free time' }, minutes: 90 },
      ],
      images: [{ src: '/landmarks/huangshan.jpg', alt: { zh: '宏村月沼徽派建筑', en: 'Hui-style architecture around Moon Pond, Hongcun' } }],
    },
    {
      day: 12,
      city: 'Yangshuo',
      cityCn: '阳朔',
      morning: [
        { activity: { zh: '黄山屯溪飞桂林 · 1.5h', en: 'Fly Tunxi to Guilin · 1.5h' }, minutes: 90 },
      ],
      afternoon: [
        { activity: { zh: '司机送阳朔西街 · 不在桂林市区停', en: 'Driver to Yangshuo West Street · skip Guilin city' }, minutes: 90 },
        { activity: { zh: '酒店泡澡 · 调整状态', en: 'Hotel soak · settle in' }, minutes: 90 },
      ],
      evening: [
        { activity: { zh: '阳朔西街周边晚餐', en: 'Dinner around Yangshuo West Street' }, minutes: 90 },
      ],
      images: [{ src: '/landmarks/guilin.jpg', alt: { zh: '阳朔西街夜市', en: 'Yangshuo West Street at night' } }],
    },
    {
      day: 13,
      city: 'Yangshuo',
      cityCn: '阳朔',
      morning: [
        { activity: { zh: '5:30 起床 · 漓江清晨摄影包船 · 兴坪段', en: '05:30 alarm · private morning Li River photography boat · Xingping stretch' }, minutes: 240, note: { zh: '清晨雾气最足 · 比下午好拍十倍', en: 'Best mist at dawn · ten times better than afternoon shoots' } },
      ],
      afternoon: [
        { activity: { zh: '回阳朔午餐 + 长午休', en: 'Back to Yangshuo for lunch and a long midday rest' }, minutes: 180 },
        { activity: { zh: '十里画廊电瓶车 + 月亮山', en: 'E-cart along Ten-Mile Gallery + Moon Hill' }, minutes: 90 },
      ],
      evening: [
        { activity: { zh: '兴坪段日落 · 包私人小船到取景点', en: 'Xingping sunset · private small boat to the optimal spot' }, minutes: 90 },
      ],
      images: [{ src: '/landmarks/guilin.jpg', alt: { zh: '兴坪漓江摄影日落', en: 'Photography sunset on the Li at Xingping' } }],
      tailorMakeTip: { zh: '想看龙脊梯田？4 月 / 9 月最美 · D14 前 +1 天可以串。', en: 'Want the Longji rice terraces? Best in April / September · add +1 day before D14.' },
    },
    {
      day: 14,
      city: 'Guilin',
      cityCn: '桂林',
      morning: [
        { activity: { zh: '酒店退房 · 司机送桂林两江机场', en: 'Hotel checkout · driver to Guilin Liangjiang Airport' }, minutes: 90 },
      ],
      afternoon: [
        { activity: { zh: '飞回出发城市 · 支持团队确认收尾', en: 'Fly home or onward · support team confirms the closing handoff' }, minutes: 60 },
      ],
      evening: [
        { activity: { zh: '航班 · 顾问最后一条消息', en: 'Final flight · advisor sends a closing note' }, minutes: 30 },
      ],
      images: [{ src: '/landmarks/guilin.jpg', alt: { zh: '桂林两江机场', en: 'Guilin Liangjiang Airport' } }],
    },
  ],
  highlights: [
    { icon: 'water', zh: '九寨沟翡翠水 · 5 点进园的奖励', en: 'Jiuzhaigou jade water · the 05:00 entry reward' },
    { icon: 'mountain', zh: '袁家界峰林雾 · 砂岩柱在云里浮起来', en: 'Yuanjiajie pillar mist · sandstone columns floating above cloud' },
    { icon: 'sunrise', zh: '黄山光明顶日出云海', en: 'Huangshan Bright Top sunrise above the cloud sea' },
    { icon: 'photo', zh: '漓江私人摄影船 · 兴坪雾散瞬间', en: 'Private Li River photo boat · the moment Xingping mist breaks' },
    { icon: 'temple', zh: '宏村徽派月沼倒影', en: 'Hongcun · Moon Pond reflecting Hui-style architecture' },
  ],
  pricing: {
    base: [
      { hotelClass: '4-star', usdPerNight: 220, note: { zh: '景区门口酒店 · 起早 5 点进园方便', en: 'Park-gate hotels · easy 05:00 starts' } },
      { hotelClass: '5-star', usdPerNight: 480, note: { zh: '黄山山顶酒店 · 5 星品牌 · 必预订', en: 'Huangshan summit 5-star · brand operator · required booking' } },
      { hotelClass: 'simple', usdPerNight: 120, note: { zh: '景区简朴酒店 · 9 折省钱版', en: 'No-frills park-gate hotel · the 90% budget option' } },
    ],
    inclusions: [
      { zh: '13 晚酒店 · 含黄山山顶 + 九寨沟海拔 2,000m 段', en: '13 nights of hotel accommodation · includes Huangshan summit + Jiuzhaigou 2,000m segment' },
      { zh: '私人英语向导 · 摄影向 + 长徒步领队', en: 'Private English-speaking guide · photography + long-trek lead' },
      { zh: '私人司机 + 大轮商务车 · 摄影器材随车', en: 'Private driver, larger van for camera gear' },
      { zh: '所有国内航班 / 高铁 / 索道票 / 接送机', en: 'All domestic flights, bullet trains, cable car tickets, airport transfers' },
      { zh: '九寨沟 + 黄山 + 张家界 + 漓江景区门票 + 提前预约', en: 'Park entries for Jiuzhaigou, Huangshan, Zhangjiajie, Li River + timed reservations' },
      { zh: '漓江私人摄影船 + 张家界私人观景台时间锁定', en: 'Private Li River photography boat + Zhangjiajie private viewpoint slots' },
      { zh: '高原适应方案 · 氧气瓶 + 海拔渐进', en: 'Altitude acclimatization protocol · oxygen + gradual ascent' },
      { zh: '行前包写清出行支持方式', en: 'Pre-departure pack documents support channels' },
    ],
    exclusions: [
      { zh: '中国签证 / 国际机票', en: 'China visa and international flights' },
      { zh: '专业摄影向导（如要可加 USD 1,200/3 天）', en: 'Pro photography guide (optional add-on, USD 1,200 / 3 days)' },
      { zh: '午晚餐（除非另有标注）', en: 'Lunches and dinners unless noted' },
      { zh: '小费 / 个人消费 / 摄影器材租赁', en: 'Tips, personal spending, camera-gear rental' },
      { zh: '旅行保险（必备 · 含高原 / 高海拔徒步险）', en: 'Travel insurance (mandatory · with altitude / hike coverage)' },
    ],
  },
  tailorMakeTips: [
    { zh: '想拍秋季九寨沟（10 月中-11 月初）？需要提前 4 个月锁酒店。', en: 'Aiming for autumn Jiuzhaigou (mid-Oct to early Nov)? Lock hotels 4 months ahead.' },
    { zh: '高血压 / 心脏风险旅客建议跳过黄龙 D5，替换为牟尼沟。', en: 'Travellers with hypertension / cardiac risk should skip the D5 Huanglong altitude push, swap in Mounigou.' },
    { zh: '只有 10 天？砍掉黄山段 · 14 → 10 天专攻九寨 + 张家界 + 桂林。', en: 'Only 10 days? Drop Huangshan · stay deep in Jiuzhaigou + Zhangjiajie + Guilin.' },
    { zh: '想要专业摄影向导？我们可以叫上一位获国际奖的本地摄影师同行。', en: 'Want a pro photography guide? We can engage an internationally-awarded local photographer to walk with you.' },
    { zh: '雨天计划：每段都有室内备选（黄龙洞 / 屯溪老街 / 宏村）。', en: 'Rain backup: every leg has an indoor alternative (Huanglong Cave / Tunxi old street / Hongcun).' },
  ],
  tripNotes: {
    accommodation: {
      zh: '九寨沟段海拔渐进；黄山山顶酒店紧张需提前订；其他段都是景区门口或市区精品。',
      en: 'Jiuzhaigou leg uses gradual altitude; Huangshan summit hotels are scarce, book early; other legs use park-gate or city boutiques.',
    },
    transportation: {
      zh: '4 段国内直飞航班；私人司机大轮 SUV 装摄影器材；黄山索道双向。',
      en: 'Four direct domestic flights; private driver in a larger SUV to fit camera gear; Huangshan cable car both ways.',
    },
    meals: {
      zh: '含早餐每天；摄影日早餐打包带走 (5:30 出发);午晚餐顾问每天给候选清单。',
      en: 'Breakfast daily; on photography days breakfast is packed for 05:30 departures; advisor sends a daily lunch/dinner shortlist.',
    },
    visa: {
      zh: '大部分护照需要 L 类旅游签 · 摄影器材按 GST 申报，顾问可提供报关清单。',
      en: 'Most passports need an L-class tourist visa · declare camera gear at customs, advisor provides a packing inventory if needed.',
    },
  },
  advisorSlug: 'lin',
  status: 'hidden',
};

// ─── exports ───────────────────────────────────────────────
export const ITINERARIES: Record<string, Itinerary> = {
  'sample-10d': sample10d,
  'visa-free-240h-beijing': visaFree240hBeijing,
  'family-12d': family12d,
  'honeymoon-9d': honeymoon9d,
  'nature-14d': nature14d,
};

export const ITINERARY_SLUGS: string[] = [
  'sample-10d',
  'visa-free-240h-beijing',
  'family-12d',
  'honeymoon-9d',
  'nature-14d',
];

export const PUBLIC_ITINERARY_SLUGS: string[] = ITINERARY_SLUGS.filter(
  (slug) => ITINERARIES[slug]?.status !== 'hidden',
);

export function getItinerary(slug: string): Itinerary | null {
  if (PUBLIC_ITINERARY_SLUGS.includes(slug)) {
    return ITINERARIES[slug];
  }
  return null;
}

export function listItineraries(): Itinerary[] {
  return PUBLIC_ITINERARY_SLUGS.map((slug) => ITINERARIES[slug]);
}
