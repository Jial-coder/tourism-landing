/**
 * lib/data/destinations.ts — 8 城 destination 深化数据（Phase 2.2）。
 *
 * 文案为占位 mock，整套 destination data 标 status: 'mock'，
 * 渲染时由页面级 <MockBadge> 守门（spec §6.5 Mock guard release gate 扫描该字段）。
 *
 * 真值字段（GPS / IATA / 月份冷暖大势）保留真实参考；wowPoints / whyVisit / durations / nearby
 * 文案为 worker 自写占位，lead 审稿后逐目的地替换为顾问亲笔。
 */

export type DestinationSlug =
  | 'beijing'
  | 'xian'
  | 'shanghai'
  | 'guilin'
  | 'zhangjiajie'
  | 'jiuzhaigou'
  | 'dali'
  | 'huangshan';

export type Bilingual = { zh: string; en: string };

export type WowPoint = {
  icon: string;
  zh: string;
  en: string;
};

export type MonthRating = 'best' | 'good' | 'avoid';
export type Month =
  | 'jan' | 'feb' | 'mar' | 'apr' | 'may' | 'jun'
  | 'jul' | 'aug' | 'sep' | 'oct' | 'nov' | 'dec';

export type BestTime = {
  months: Record<Month, MonthRating>;
  summary: Bilingual;
};

export type Duration = {
  days: number;
  label: Bilingual;
  pitch: Bilingual;
};

export type NearbyRef = {
  slug: DestinationSlug;
  days: number;
  reason: Bilingual;
};

export type DestinationTheme =
  | 'nature'
  | 'history'
  | 'food'
  | 'slow'
  | 'city'
  | 'outdoor';

export type Destination = {
  slug: DestinationSlug;
  cn: string;
  en: string;
  iata: string;
  gps: string;
  hero: { src: string; alt: Bilingual; credit?: string };
  tagline: Bilingual;
  whyVisit: Bilingual;
  wowPoints: WowPoint[];
  bestTime: BestTime;
  durations: Duration[];
  nearby: NearbyRef[];
  matchedItineraries: { slug: string; label: Bilingual; available: boolean }[];
  advisorAnchor: string;
  themes?: DestinationTheme[];
  status: 'mock';
};

export const DESTINATION_THEMES: Record<DestinationSlug, DestinationTheme[]> = {
  beijing: ['history', 'city', 'food'],
  xian: ['history', 'food'],
  shanghai: ['city', 'food'],
  guilin: ['nature', 'slow'],
  zhangjiajie: ['nature', 'outdoor'],
  jiuzhaigou: ['nature', 'slow'],
  dali: ['nature', 'slow'],
  huangshan: ['nature', 'outdoor'],
};

export const DESTINATION_THEME_LABELS: Record<DestinationTheme, Bilingual> = {
  nature: { zh: '自然山水', en: 'Nature & Landscape' },
  history: { zh: '历史文化', en: 'History & Culture' },
  food: { zh: '美食', en: 'Food' },
  slow: { zh: '慢节奏', en: 'Slow Pace' },
  city: { zh: '城市现代', en: 'City Life' },
  outdoor: { zh: '户外步行', en: 'Outdoor & Hiking' },
};

export const DESTINATION_THEME_ORDER: DestinationTheme[] = [
  'nature',
  'history',
  'food',
  'slow',
  'city',
  'outdoor',
];

export const MONTH_LABELS: Record<Month, Bilingual> = {
  jan: { zh: '1 月', en: 'Jan' },
  feb: { zh: '2 月', en: 'Feb' },
  mar: { zh: '3 月', en: 'Mar' },
  apr: { zh: '4 月', en: 'Apr' },
  may: { zh: '5 月', en: 'May' },
  jun: { zh: '6 月', en: 'Jun' },
  jul: { zh: '7 月', en: 'Jul' },
  aug: { zh: '8 月', en: 'Aug' },
  sep: { zh: '9 月', en: 'Sep' },
  oct: { zh: '10 月', en: 'Oct' },
  nov: { zh: '11 月', en: 'Nov' },
  dec: { zh: '12 月', en: 'Dec' },
};

export const MONTH_ORDER: Month[] = [
  'jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec',
];

const beijing: Destination = {
  slug: 'beijing',
  cn: '北京',
  en: 'Beijing',
  iata: 'PEK',
  gps: '39.9042° N · 116.4074° E',
  hero: {
    src: '/landmarks/beijing.jpg',
    alt: {
      zh: '北京慕田峪长城秋色，城楼在金黄树林中蜿蜒',
      en: 'Mutianyu Great Wall winding through autumn forest near Beijing',
    },
  },
  tagline: {
    zh: '故宫红墙 · 长城秋色 · 胡同晨光',
    en: 'Forbidden City crimson, autumn ramparts, hutong at dawn',
  },
  whyVisit: {
    zh: '故宫的清晨没什么人，光从太和殿一侧斜进来，红墙黄瓦特别沉。10–11 月秋色压住整座城，长城慕田峪段的金黄能看一整天。我们会帮你跳过八达岭那种排队景点，安排一段需要走两小时的野长城，再回胡同里吃一顿熟人家的家常菜。',
    en: 'Beijing rewards travellers who slow down. The Forbidden City is best at opening hour, when low light cuts across the empty courtyards. Late October paints the city gold, and Mutianyu — quieter than Badaling — gives you the wall almost to yourself. We swap the queue-heavy stops for a two-hour ramble on a wilder section, then a home-style dinner in a hutong our advisor knows by name.',
  },
  wowPoints: [
    {
      icon: 'wall',
      zh: '走一段没修过的长城',
      en: 'Walk an unrestored stretch of the Great Wall',
    },
    {
      icon: 'sunrise',
      zh: '太和殿开门那一刻进故宫',
      en: 'Step into the Forbidden City the moment the gates open',
    },
    {
      icon: 'tea',
      zh: '在胡同人家厨房吃一顿家常菜',
      en: 'Sit in a hutong kitchen for a real home-cooked meal',
    },
    {
      icon: 'art',
      zh: '798 跟当代艺术家工作室面对面',
      en: 'Meet a working contemporary artist in 798',
    },
    {
      icon: 'lantern',
      zh: '雍和宫看一场早课',
      en: "Catch morning chants at Yonghe Lama Temple",
    },
  ],
  bestTime: {
    months: {
      jan: 'avoid', feb: 'avoid', mar: 'good', apr: 'best', may: 'best', jun: 'good',
      jul: 'avoid', aug: 'avoid', sep: 'best', oct: 'best', nov: 'good', dec: 'avoid',
    },
    summary: {
      zh: '4–5 月槐花和柳絮一起来，9–10 月秋色最稳。冬天干冷雾霾偶发，盛夏闷热多雨。',
      en: 'April–May brings blossom; September–October is the cleanest, golden window. Winters are dry and biting, summers humid with sudden storms.',
    },
  },
  durations: [
    {
      days: 2,
      label: { zh: '周末', en: 'Weekend' },
      pitch: {
        zh: '只够看故宫 + 一小段长城。半天胡同 + 半天景山日落，紧但能感受北京的轮廓。',
        en: 'Just enough for the Forbidden City and one short Great Wall section, plus a hutong morning and a Jingshan sunset. Tight, but you leave with a real outline of the city.',
      },
    },
    {
      days: 4,
      label: { zh: '4 天', en: '4 days' },
      pitch: {
        zh: '故宫 + 慕田峪 + 颐和园 + 一晚国话或评剧。第四天可以留给 798 或郊区古寺，节奏舒服。',
        en: 'Forbidden City, Mutianyu, the Summer Palace, and one evening of Beijing opera or modern theatre. The fourth day frees up 798 or a temple in the western hills.',
      },
    },
    {
      days: 8,
      label: { zh: '8 天', en: '8 days' },
      pitch: {
        zh: '可以串西安或承德。北京本地深一层：天坛清晨太极、雍和宫早课、潘家园找老物件、当代艺术家工作室。',
        en: 'Pair Beijing with Xi\'an or the imperial summer retreat at Chengde. Locally, you get tai-chi at Tiantan, morning chants at Yonghe, antique-hunting at Panjiayuan, and a private studio visit with a working artist.',
      },
    },
    {
      days: 12,
      label: { zh: '12 天 +', en: '12 days +' },
      pitch: {
        zh: '加上山西 / 河北古建一线：五台山、平遥、悬空寺。北京是入口，不是终点。',
        en: 'Make Beijing your gateway to ancient timber architecture in Shanxi — Wutaishan, Pingyao, the Hanging Monastery. The capital becomes your starting line, not your finish.',
      },
    },
  ],
  nearby: [
    {
      slug: 'xian',
      days: 4,
      reason: {
        zh: '高铁 4.5 小时，北京 + 西安串成中国最经典的古都两站。',
        en: 'Just 4.5 hours by high-speed rail. The classic two-capital pairing for first-time travellers.',
      },
    },
    {
      slug: 'shanghai',
      days: 3,
      reason: {
        zh: '高铁 4.5 小时，北方厚重 + 上海摩登的对比一周看完。',
        en: '4.5 hours by rail. North vs. south, history vs. modernity — both sides of China in one week.',
      },
    },
    {
      slug: 'huangshan',
      days: 3,
      reason: {
        zh: '飞 2.5 小时进徽州，北京古都之后看南方山水的对照。',
        en: 'A 2.5-hour flight south. Trade imperial walls for misty peaks and Hui-style villages.',
      },
    },
  ],
  matchedItineraries: [
    {
      slug: 'sample-10d',
      label: { zh: '10 天第一次来中国样板', en: '10-day first-timer sample' },
      available: true,
    },
    {
      slug: 'beijing-xian-shanghai-7d',
      label: { zh: '7 天京西沪三城', en: '7-day Beijing · Xi\'an · Shanghai' },
      available: false,
    },
  ],
  advisorAnchor: '/about#lin',
  status: 'mock',
};

const xian: Destination = {
  slug: 'xian',
  cn: '西安',
  en: "Xi'an",
  iata: 'XIY',
  gps: '34.3416° N · 108.9398° E',
  hero: {
    src: '/landmarks/xian.jpg',
    alt: {
      zh: '西安城墙夜灯，红灯笼挂在城楼下',
      en: "Xi'an city wall at dusk, red lanterns lit beneath the gate tower",
    },
  },
  tagline: {
    zh: '兵马俑 · 城墙 · 回坊夜市',
    en: 'Terracotta army, ramparts, lantern-lit Muslim Quarter',
  },
  whyVisit: {
    zh: '十三朝古都，地下两米就可能埋着唐代的瓦。秦始皇陵兵马俑值得一上午，但更好玩的是骑车绕城墙一圈，14 公里的明城墙在脚下一直延伸。3–5 月或 9–10 月最舒服，傍晚去回坊吃一顿羊肉泡馍，顺便看看老城的烟火。',
    en: "Thirteen dynasties left their layers under Xi'an, and you can still feel them. Spend a morning with the Terracotta Warriors, then rent a bike on the 14-km Ming city wall — the loop gives you the old town from above. Best in spring or autumn. End the day in the Muslim Quarter for hand-pulled lamb soup and the smell of cumin smoke.",
  },
  wowPoints: [
    {
      icon: 'army',
      zh: '兵马俑开馆第一拨进去',
      en: 'Walk in with the very first wave at the Terracotta Army',
    },
    {
      icon: 'bike',
      zh: '骑车绕明城墙 14 公里一圈',
      en: 'Cycle the 14-km loop on the Ming city wall',
    },
    {
      icon: 'noodle',
      zh: '回坊吃一碗手撕羊肉泡馍',
      en: 'Tear flatbread into a bowl of lamb paomo in the Muslim Quarter',
    },
    {
      icon: 'pagoda',
      zh: '大雁塔脚下听一段唐代古乐',
      en: 'Hear a Tang-dynasty music set under the Big Wild Goose Pagoda',
    },
  ],
  bestTime: {
    months: {
      jan: 'avoid', feb: 'avoid', mar: 'good', apr: 'best', may: 'best', jun: 'good',
      jul: 'avoid', aug: 'avoid', sep: 'best', oct: 'best', nov: 'good', dec: 'avoid',
    },
    summary: {
      zh: '4–5 月最舒服，9–10 月天高云清。盛夏闷热，冬天干冷且偶有雾。',
      en: 'Spring blossoms and autumn skies are the sweet spots. Summers are hot and dusty, winters cold with occasional haze.',
    },
  },
  durations: [
    {
      days: 2,
      label: { zh: '周末', en: 'Weekend' },
      pitch: {
        zh: '兵马俑半天 + 城墙骑行 + 回坊夜市，刚好够建立第一印象。',
        en: 'Half a day with the warriors, an afternoon on the wall, one night in the lantern alleys. Enough for a first taste.',
      },
    },
    {
      days: 3,
      label: { zh: '3 天', en: '3 days' },
      pitch: {
        zh: '加一天去华清池或华山。或者留半天给陕西历史博物馆——很多旅客说那是真正的高潮。',
        en: 'Add Huaqing Pool or a Huashan day-trip. Or save half a day for the Shaanxi History Museum — many guests rate it the real highlight.',
      },
    },
    {
      days: 5,
      label: { zh: '5 天', en: '5 days' },
      pitch: {
        zh: '西安 + 一段丝路：法门寺、乾陵、关中民居古镇袁家村，慢一拍。',
        en: "Xi'an plus a slow-paced Silk Road taster — Famen Temple, the Qianling tombs, and a stay in a courtyard village like Yuanjiacun.",
      },
    },
  ],
  nearby: [
    {
      slug: 'beijing',
      days: 4,
      reason: {
        zh: '高铁 4.5 小时，两座古都的对照课。',
        en: '4.5 hours by rail — two ancient capitals back-to-back.',
      },
    },
    {
      slug: 'huangshan',
      days: 3,
      reason: {
        zh: '飞 1.5 小时进黄山，从厚重古都跳到南方山水。',
        en: 'A 90-minute flight south swaps loess walls for misty Anhui peaks.',
      },
    },
  ],
  matchedItineraries: [
    {
      slug: 'sample-10d',
      label: { zh: '10 天样板里 D3-D4', en: '10-day sample · D3-D4' },
      available: true,
    },
    {
      slug: 'silk-road-12d',
      label: { zh: '12 天丝路精选', en: '12-day Silk Road' },
      available: false,
    },
  ],
  advisorAnchor: '/about#lin',
  status: 'mock',
};

const shanghai: Destination = {
  slug: 'shanghai',
  cn: '上海',
  en: 'Shanghai',
  iata: 'PVG',
  gps: '31.2304° N · 121.4737° E',
  hero: {
    src: '/landmarks/shanghai.jpg',
    alt: {
      zh: '上海外滩夜景，对岸陆家嘴天际线灯火通明',
      en: 'Shanghai Bund at night with the Lujiazui skyline lit across the river',
    },
  },
  tagline: {
    zh: '外滩天际线 · 法租界梧桐 · 弄堂早茶',
    en: 'Bund skyline, plane-tree avenues, alleyway breakfasts',
  },
  whyVisit: {
    zh: '黄浦江两岸是两个时代叠在一起。傍晚走外滩看陆家嘴亮灯，第二天清晨去武康路喝杯咖啡，下午钻进弄堂看晾衣杆下的真实生活。4–5 月或 10–11 月气候最稳，我们会安排一个本地建筑师带你走老租界，听老房子背后的故事。',
    en: 'Two centuries face each other across the Huangpu. One evening on the Bund, one morning sipping coffee under plane trees on Wukang Road, one afternoon disappearing into a lane where laundry still hangs out the windows. Spring and autumn are the calm-weather windows; we partner with a local architect who can read every old façade for you.',
  },
  wowPoints: [
    {
      icon: 'skyline',
      zh: '日落 30 分钟前站上外滩源',
      en: 'Stand on the Rockbund 30 minutes before sunset',
    },
    {
      icon: 'tree',
      zh: '法租界梧桐下找一家本地咖啡',
      en: 'Hunt down a local coffee under the plane trees of the old French Concession',
    },
    {
      icon: 'shrimp',
      zh: '老弄堂早晨吃一笼生煎',
      en: 'Catch the lane just as the morning shengjianbao basket comes off the pan',
    },
    {
      icon: 'museum',
      zh: '看一场当代美术馆的特展',
      en: 'Pick one contemporary museum and stay for the full exhibition',
    },
  ],
  bestTime: {
    months: {
      jan: 'avoid', feb: 'good', mar: 'good', apr: 'best', may: 'best', jun: 'good',
      jul: 'avoid', aug: 'avoid', sep: 'good', oct: 'best', nov: 'best', dec: 'good',
    },
    summary: {
      zh: '4–5 月梧桐绿、10–11 月银杏黄是上海最好看的两段。盛夏闷热多台风，深冬阴冷潮湿。',
      en: 'Spring and late autumn are when the city looks its best. Avoid the typhoon-prone summer and the damp, grey winter low.',
    },
  },
  durations: [
    {
      days: 2,
      label: { zh: '周末', en: 'Weekend' },
      pitch: {
        zh: '外滩夜景 + 武康路漫步 + 一顿弄堂早餐 + 一个美术馆。把上海当一个氛围而不是清单。',
        en: 'Bund at night, Wukang Road by morning, one alley breakfast, one museum. Treat Shanghai as an atmosphere, not a checklist.',
      },
    },
    {
      days: 4,
      label: { zh: '4 天', en: '4 days' },
      pitch: {
        zh: '加一天去乌镇或周庄，再留半天给当代设计 / 老唱片小店 / 茶馆听评弹。节奏舒服。',
        en: 'Add a canal-town day in Wuzhen or Zhujiajiao, then keep half a day for design shops, vinyl stores, or a Suzhou pingtan storytelling house.',
      },
    },
    {
      days: 7,
      label: { zh: '7 天', en: '7 days' },
      pitch: {
        zh: '上海 + 杭州 + 苏州小三角，水乡 + 茶山 + 园林一条线。',
        en: "Pair Shanghai with Hangzhou's tea hills and Suzhou's classical gardens for a slow Yangtze-delta loop.",
      },
    },
  ],
  nearby: [
    {
      slug: 'huangshan',
      days: 3,
      reason: {
        zh: '高铁 3 小时，沪 + 黄山 + 宏村是最经典的现代 + 古典对照线。',
        en: '3 hours by rail. Shanghai → Huangshan → Hongcun is the classic modern-meets-ancient pairing.',
      },
    },
    {
      slug: 'beijing',
      days: 3,
      reason: {
        zh: '高铁 4.5 小时，南北两端一周看完。',
        en: '4.5 hours by rail — north and south of the country in one week.',
      },
    },
    {
      slug: 'guilin',
      days: 4,
      reason: {
        zh: '飞 2.5 小时进桂林，城市感之后接一段山水。',
        en: 'A 2.5-hour flight south takes you straight into Guilin\'s karst landscape.',
      },
    },
  ],
  matchedItineraries: [
    {
      slug: 'sample-10d',
      label: { zh: '10 天样板里 D9-D10', en: '10-day sample · D9-D10' },
      available: true,
    },
    {
      slug: 'shanghai-yangtze-delta-7d',
      label: { zh: '7 天江南水乡', en: '7-day Yangtze delta' },
      available: false,
    },
  ],
  advisorAnchor: '/about#lin',
  status: 'mock',
};

const guilin: Destination = {
  slug: 'guilin',
  cn: '桂林',
  en: 'Guilin',
  iata: 'KWL',
  gps: '25.2734° N · 110.2900° E',
  hero: {
    src: '/landmarks/guilin.jpg',
    alt: {
      zh: '漓江清晨喀斯特峰林，水面上一艘竹筏',
      en: 'Bamboo raft drifting through karst peaks on the Li River at dawn',
    },
  },
  tagline: {
    zh: '喀斯特 · 漓江 · 阳朔乡村',
    en: 'Karst peaks, Li River, slow village days in Yangshuo',
  },
  whyVisit: {
    zh: '广西桂林，从市区南下到阳朔的这段漓江，是国画里那种山一样的风景。可以骑行、坐筏、徒步、或者在山脚下的乡村酒店住几天。我们更推荐住进阳朔的村子，让漓江变成你的早晨而不是一个景点。',
    en: 'The stretch of the Li River from Guilin down to Yangshuo is the landscape that became Chinese ink painting. Take it from a bamboo raft, a bike, a kayak, or just a hammock at a village inn. We prefer parking you in a Yangshuo village so the river becomes your morning, not a checkbox.',
  },
  wowPoints: [
    {
      icon: 'river',
      zh: '清晨竹筏顺漓江漂半小时',
      en: 'Drift the Li River by raft for the first 30 minutes of light',
    },
    {
      icon: 'bike',
      zh: '阳朔乡间骑行穿过稻田和水牛',
      en: "Cycle the Yangshuo backroads past paddies and water buffalo",
    },
    {
      icon: 'climb',
      zh: '月亮山下学一次入门攀岩',
      en: 'Try a beginner climb at Moon Hill',
    },
    {
      icon: 'tea',
      zh: '龙脊梯田跟瑶族阿妈学打油茶',
      en: 'Learn yóu chá tea with a Yao grandmother in the Longji rice terraces',
    },
  ],
  bestTime: {
    months: {
      jan: 'avoid', feb: 'good', mar: 'best', apr: 'best', may: 'good', jun: 'avoid',
      jul: 'avoid', aug: 'good', sep: 'best', oct: 'best', nov: 'best', dec: 'good',
    },
    summary: {
      zh: '3–5 月雨后水位最美，9–11 月最舒服。盛夏闷热多雨且漓江有时浑浊。',
      en: 'Spring fills the river; September–November gives the cleanest skies. Mid-summer is muggy and the Li can run muddy.',
    },
  },
  durations: [
    {
      days: 2,
      label: { zh: '周末', en: 'Weekend' },
      pitch: {
        zh: '一次漓江漂、一次骑行、一晚阳朔。够看到典型山水，但乡村感未必到位。',
        en: 'One raft trip, one bike ride, one Yangshuo night. Enough to see the postcard, not yet to feel the slow village rhythm.',
      },
    },
    {
      days: 4,
      label: { zh: '4 天', en: '4 days' },
      pitch: {
        zh: '住进阳朔乡间 2 晚，加一段龙脊梯田 / 兴坪古镇，能看到稻作生活。',
        en: 'Two nights in a Yangshuo village, plus a slow detour to Longji terraces or the old town of Xingping. Now you start to feel rice-country time.',
      },
    },
    {
      days: 7,
      label: { zh: '7 天', en: '7 days' },
      pitch: {
        zh: '桂林 + 阳朔 + 龙脊 + 三江侗族村寨。从汉地山水跨进少数民族文化，节奏立刻变深。',
        en: 'Guilin, Yangshuo, the Longji terraces, and a Dong minority village in Sanjiang. The trip deepens from scenery to culture.',
      },
    },
  ],
  nearby: [
    {
      slug: 'zhangjiajie',
      days: 4,
      reason: {
        zh: '飞 1 小时半进张家界，从喀斯特水景跳到砂岩峰林。',
        en: 'A 90-minute flight north drops you into the sandstone pillars of Zhangjiajie.',
      },
    },
    {
      slug: 'shanghai',
      days: 3,
      reason: {
        zh: '飞 2.5 小时回上海，乡村山水之后接现代城市。',
        en: 'A 2.5-hour flight back to Shanghai trades river silence for skyline.',
      },
    },
  ],
  matchedItineraries: [
    {
      slug: 'sample-10d',
      label: { zh: '10 天样板里 D7-D8', en: '10-day sample · D7-D8' },
      available: true,
    },
    {
      slug: 'guilin-yangshuo-slow-6d',
      label: { zh: '6 天桂林阳朔慢游', en: '6-day Guilin · Yangshuo slow trip' },
      available: false,
    },
  ],
  advisorAnchor: '/about#lin',
  status: 'mock',
};

const zhangjiajie: Destination = {
  slug: 'zhangjiajie',
  cn: '张家界',
  en: 'Zhangjiajie',
  iata: 'DYG',
  gps: '29.0970° N · 110.4795° E',
  hero: {
    src: '/landmarks/zhangjiajie.jpg',
    alt: {
      zh: '张家界砂岩峰林在云海中露出尖端',
      en: 'Sandstone columns rising above a sea of clouds in Zhangjiajie',
    },
  },
  tagline: {
    zh: '砂岩柱林 · 云海 · 武陵源',
    en: 'Sandstone spires, cloud sea, the canyons of Wulingyuan',
  },
  whyVisit: {
    zh: '湖南西北，砂岩柱林从林海中拔地而起，雾气在峰间翻涌。最适合 4–6 月雨后或 10–11 月秋色。我们会帮你避开人流最重的路线，安排一个能在山顶住一晚的版本——清晨拉开窗帘看云从脚下漫过来。',
    en: 'In the northwest of Hunan, three thousand sandstone columns push out of the forest while mist drifts between them. April–June after the rains and October–November are the calmest windows. We route you off the busiest paths and book a peak-top stay so you wake up with clouds running below the window.',
  },
  wowPoints: [
    {
      icon: 'peak',
      zh: '在山顶民宿住一晚看云海漫上来',
      en: 'Spend one night at a peak-top inn so the cloud sea finds you',
    },
    {
      icon: 'glass',
      zh: '走一段不那么吓人的玻璃栈道',
      en: 'Walk a glass plank trail with a guide who knows the calmer ones',
    },
    {
      icon: 'monkey',
      zh: '金鞭溪徒步看猕猴和瀑布',
      en: 'Hike the Golden Whip Stream past macaques and waterfalls',
    },
    {
      icon: 'canyon',
      zh: '大峡谷悬索桥下的回声试一次',
      en: 'Test the echo under the Grand Canyon suspension bridge',
    },
  ],
  bestTime: {
    months: {
      jan: 'avoid', feb: 'avoid', mar: 'good', apr: 'best', may: 'best', jun: 'good',
      jul: 'good', aug: 'good', sep: 'best', oct: 'best', nov: 'best', dec: 'avoid',
    },
    summary: {
      zh: '4–6 月雨后云海最厚，9–11 月秋色和清晨日出最稳。冬天山顶常封路。',
      en: 'Late spring after the rains gives the heaviest cloud seas; autumn delivers steady sunrises. Winters can close peak-top roads.',
    },
  },
  durations: [
    {
      days: 2,
      label: { zh: '周末', en: 'Weekend' },
      pitch: {
        zh: '只够走武陵源核心 + 一段玻璃栈道。山顶住一晚把意境拉满。',
        en: 'Just the Wulingyuan core and one glass-walk trail. Worth the peak-top night to anchor the feeling.',
      },
    },
    {
      days: 4,
      label: { zh: '4 天', en: '4 days' },
      pitch: {
        zh: '武陵源 + 大峡谷 + 天门山。三种地形：峰林、深谷、绝壁，节奏不重复。',
        en: 'Wulingyuan, the Grand Canyon, and Tianmen Mountain — three different landscapes, no repetition in three days.',
      },
    },
    {
      days: 6,
      label: { zh: '6 天', en: '6 days' },
      pitch: {
        zh: '加上湘西凤凰古城的两晚，山水之后看一段民俗。',
        en: 'Add two nights in Fenghuang ancient town for a folk-culture chaser to the mountains.',
      },
    },
  ],
  nearby: [
    {
      slug: 'guilin',
      days: 4,
      reason: {
        zh: '飞 1 小时半，砂岩 + 喀斯特两种中国山水串成一周。',
        en: '90 minutes by air. Sandstone vs. karst — both signature Chinese landscapes in one week.',
      },
    },
    {
      slug: 'huangshan',
      days: 3,
      reason: {
        zh: '飞 1.5 小时进黄山，看南方的另一种山。',
        en: 'A 90-minute flight east hands you the misty Huangshan range.',
      },
    },
  ],
  matchedItineraries: [
    {
      slug: 'sample-10d',
      label: { zh: '10 天样板里 D5-D6', en: '10-day sample · D5-D6' },
      available: true,
    },
    {
      slug: 'nature-14d',
      label: { zh: '14 天自然摄影', en: '14-day nature & photography' },
      available: false,
    },
  ],
  advisorAnchor: '/about#lin',
  status: 'mock',
};

const jiuzhaigou: Destination = {
  slug: 'jiuzhaigou',
  cn: '九寨沟',
  en: 'Jiuzhaigou',
  iata: 'JZH',
  gps: '33.2604° N · 103.9189° E',
  hero: {
    src: '/landmarks/jiuzhaigou.jpg',
    alt: {
      zh: '九寨沟五花海，水底彩色钙化层',
      en: 'Five-Flower Lake at Jiuzhaigou, mineral-stained shallows under turquoise water',
    },
  },
  tagline: {
    zh: '高山湖泊 · 川西秘境 · 九寨黄龙',
    en: 'Alpine lakes, the wild west of Sichuan, Jiuzhai and Huanglong',
  },
  whyVisit: {
    zh: '四川阿坝，海子、瀑布、藏寨。9–10 月秋色最浓，水的颜色从碧绿到孔雀蓝层层叠。建议跟黄龙、若尔盖一起串成 6 天的川西线，气候稍微挑剔但风景在中国少数能进世界顶端的那一类。',
    en: "Sichuan's Aba prefecture: pools, waterfalls, Tibetan villages. September and October layer turquoise on jade on peacock-blue. We pair Jiuzhaigou with Huanglong and Ruoergai into a 6-day western Sichuan loop — the weather has its moods, but the colour palette is among the best in the country.",
  },
  wowPoints: [
    {
      icon: 'lake',
      zh: '清晨第一班车进沟看五花海',
      en: 'Catch the first shuttle to Five-Flower Lake before the crowds',
    },
    {
      icon: 'falls',
      zh: '诺日朗瀑布旁等一次彩虹',
      en: 'Wait for a rainbow over Nuorilang Falls',
    },
    {
      icon: 'temple',
      zh: '黄龙钙化池上方海拔 3500 m 的散步',
      en: 'Walk the calcified pools at Huanglong, 3500 m up',
    },
    {
      icon: 'chant',
      zh: '藏寨家里听一次酥油茶 + 念珠故事',
      en: "Sit in a Tibetan home for butter tea and the story behind the prayer beads",
    },
  ],
  bestTime: {
    months: {
      jan: 'avoid', feb: 'avoid', mar: 'avoid', apr: 'good', may: 'good', jun: 'good',
      jul: 'good', aug: 'good', sep: 'best', oct: 'best', nov: 'good', dec: 'avoid',
    },
    summary: {
      zh: '9–10 月秋色 + 水色最佳，4–6 月夏花季节也好看。冬天结冰但人少，需要专门安排。',
      en: 'September–October is the gold standard for both foliage and water tone. Late spring opens with wildflowers. Winters freeze but reward the few who plan for them.',
    },
  },
  durations: [
    {
      days: 3,
      label: { zh: '3 天', en: '3 days' },
      pitch: {
        zh: '九寨沟两整天 + 黄龙一天。海拔起伏要给身体留时间。',
        en: 'Two full days in Jiuzhai, one in Huanglong. Build in time for altitude — half the magic comes from not rushing it.',
      },
    },
    {
      days: 6,
      label: { zh: '6 天川西', en: '6-day western Sichuan' },
      pitch: {
        zh: '九寨 + 黄龙 + 若尔盖草原 + 一晚藏寨民宿。把川西的多样性看全。',
        en: 'Jiuzhai, Huanglong, the Ruoergai grasslands, and one night in a Tibetan family-run inn. The full breadth of western Sichuan.',
      },
    },
    {
      days: 10,
      label: { zh: '10 天大川西', en: '10-day grand western Sichuan' },
      pitch: {
        zh: '加上四姑娘山 / 海螺沟冰川。要带一些徒步装备，但回报很大。',
        en: 'Add the Four Sisters peaks or the Hailuogou glacier. You\'ll want light hiking gear, and the payoff is on a different scale.',
      },
    },
  ],
  nearby: [
    {
      slug: 'dali',
      days: 4,
      reason: {
        zh: '飞昆明转大理，从川西高原降到云南低海拔。',
        en: 'Fly via Kunming into Dali — drop from highland Sichuan into mellow Yunnan.',
      },
    },
    {
      slug: 'xian',
      days: 3,
      reason: {
        zh: '飞 1.5 小时回西安，从自然山水接古都。',
        en: "A 90-minute flight back to Xi'an pairs raw nature with imperial history.",
      },
    },
  ],
  matchedItineraries: [
    {
      slug: 'nature-14d',
      label: { zh: '14 天自然摄影', en: '14-day nature & photography' },
      available: false,
    },
    {
      slug: 'western-sichuan-6d',
      label: { zh: '6 天川西经典', en: '6-day western Sichuan classic' },
      available: false,
    },
  ],
  advisorAnchor: '/about#lin',
  status: 'mock',
};

const dali: Destination = {
  slug: 'dali',
  cn: '大理',
  en: 'Dali',
  iata: 'DLU',
  gps: '25.6065° N · 100.2675° E',
  hero: {
    src: '/landmarks/dali.jpg',
    alt: {
      zh: '大理洱海岸边白族村寨，远处苍山上有云',
      en: 'A Bai village on the shore of Erhai Lake, with clouds gathering on the Cangshan range',
    },
  },
  tagline: {
    zh: '洱海 · 苍山 · 古城白族',
    en: 'Erhai Lake, the Cangshan range, Bai villages around Old Town',
  },
  whyVisit: {
    zh: '云南大理，苍山在西，洱海在东，中间夹着大理古城。3–5 月气候最舒服，可以骑环湖、白族村寨拜访、或者跟丽江-香格里拉串成 8 天的滇北线。这里的节奏慢得像一种态度，很多旅客来了不想走。',
    en: "Yunnan's Dali sits between the Cangshan range to the west and Erhai Lake to the east, with the old town in between. Spring is the calmest season. You can cycle the lake loop, visit Bai villages, or extend with Lijiang and Shangri-La into an 8-day northern-Yunnan circuit. The pace here is slow on purpose — many travellers don't want to leave.",
  },
  wowPoints: [
    {
      icon: 'lake',
      zh: '清晨在洱海西岸看渔船出港',
      en: 'Watch the fishing boats leave Erhai before sunrise',
    },
    {
      icon: 'tea',
      zh: '白族人家做一次三道茶',
      en: 'Sit through a three-course Bai tea ceremony in a family home',
    },
    {
      icon: 'mountain',
      zh: '苍山上半天徒步看洱海全景',
      en: 'Half-day hike on Cangshan for the full Erhai panorama',
    },
    {
      icon: 'market',
      zh: '周三沙坪赶集挤白族集市',
      en: 'Squeeze through the Wednesday Bai market in Shaping',
    },
  ],
  bestTime: {
    months: {
      jan: 'good', feb: 'good', mar: 'best', apr: 'best', may: 'best', jun: 'avoid',
      jul: 'avoid', aug: 'avoid', sep: 'good', oct: 'best', nov: 'best', dec: 'good',
    },
    summary: {
      zh: '3–5 月和 10–11 月是大理最稳的两段。雨季 6–8 月山上常下雨，但雨后特别好看。',
      en: 'March–May and October–November are the calmest windows. The June–August rains are heavy in the hills, though the air after a downpour is unbeatable.',
    },
  },
  durations: [
    {
      days: 3,
      label: { zh: '3 天', en: '3 days' },
      pitch: {
        zh: '大理古城 + 环洱海骑行半圈 + 白族人家一顿饭。够慢一天。',
        en: 'Old Town, half the Erhai loop by bike, one Bai-family dinner. Slow enough to start letting Dali in.',
      },
    },
    {
      days: 5,
      label: { zh: '5 天', en: '5 days' },
      pitch: {
        zh: '加苍山徒步 + 喜洲古镇 2 晚。喜洲住的是真正的白族大院，不是商业古城。',
        en: 'Add a Cangshan hike and two nights in Xizhou\'s Bai courtyards — actual lived-in homes rather than the commercial old-town strip.',
      },
    },
    {
      days: 8,
      label: { zh: '8 天滇北', en: '8-day northern Yunnan' },
      pitch: {
        zh: '大理 + 丽江 + 玉龙雪山 + 香格里拉。从洱海一路向北上到藏区门口。',
        en: 'Dali, Lijiang, Jade Dragon Snow Mountain, and Shangri-La. The slow drift from Erhai all the way up to the Tibetan plateau\'s edge.',
      },
    },
  ],
  nearby: [
    {
      slug: 'jiuzhaigou',
      days: 4,
      reason: {
        zh: '飞昆明转九寨，云南山水之后接川西高原。',
        en: 'Fly via Kunming into Jiuzhai — pair mellow Yunnan with the high water-and-stone of western Sichuan.',
      },
    },
    {
      slug: 'guilin',
      days: 4,
      reason: {
        zh: '飞 1.5 小时进桂林，山景一个柔一个奇。',
        en: 'A 90-minute flight east into Guilin — soft Yunnan ridges meet the sharper karst of Guangxi.',
      },
    },
  ],
  matchedItineraries: [
    {
      slug: 'yunnan-slow-8d',
      label: { zh: '8 天滇北慢游', en: '8-day northern Yunnan slow trip' },
      available: false,
    },
    {
      slug: 'honeymoon-9d',
      label: { zh: '9 天蜜月专属', en: '9-day honeymoon edit' },
      available: false,
    },
  ],
  advisorAnchor: '/about#lin',
  status: 'mock',
};

const huangshan: Destination = {
  slug: 'huangshan',
  cn: '黄山',
  en: 'Huangshan',
  iata: 'TXN',
  gps: '30.1342° N · 118.1745° E',
  hero: {
    src: '/landmarks/huangshan.jpg',
    alt: {
      zh: '黄山迎客松，云海在悬崖下翻涌',
      en: 'Welcoming Pine on Huangshan with a cloud sea churning below the cliff',
    },
  },
  tagline: {
    zh: '云海 · 奇松怪石 · 日出之巅',
    en: 'Cloud sea, ancient pines, sunrise from the summit',
  },
  whyVisit: {
    zh: '安徽南部的黄山，老一辈山水画里的样子就是从这儿来的。云海在山腰翻涌，迎客松立在悬崖边，凌晨四点起来去光明顶看日出值得一次失眠。3–5 月或 10–11 月最舒服，山上住一晚才能错开下午的索道人流，下山再去宏村看徽派古村，是很完整的两天。',
    en: "Huangshan in southern Anhui is the mountain that taught Chinese ink painting how to draw a peak. Cloud seas roll, ancient pines lean off cliff edges, and a 4 a.m. start at Bright Top is the sleep you happily skip. Spring and autumn are calmest. Stay one night on the summit to escape the afternoon cable-car crowds, then descend to Hongcun's Hui-style villages — together they make one of the most complete two days in China.",
  },
  wowPoints: [
    {
      icon: 'sunrise',
      zh: '光明顶清晨四点等日出',
      en: 'Wait for sunrise at Bright Top from 4 a.m.',
    },
    {
      icon: 'pine',
      zh: '迎客松前等一阵风把云推过来',
      en: 'Stand by the Welcoming Pine and wait for the wind to push the clouds over',
    },
    {
      icon: 'village',
      zh: '宏村月沼边坐一下午写生',
      en: "Spend an afternoon sketching by Hongcun's Moon Pond",
    },
    {
      icon: 'tea',
      zh: '徽州人家泡一泡毛峰',
      en: 'Brew Huangshan Maofeng with a Hui-village tea family',
    },
  ],
  bestTime: {
    months: {
      jan: 'avoid', feb: 'avoid', mar: 'good', apr: 'best', may: 'best', jun: 'good',
      jul: 'avoid', aug: 'avoid', sep: 'best', oct: 'best', nov: 'best', dec: 'avoid',
    },
    summary: {
      zh: '4–5 月云海和野花并存，10–11 月秋色最稳。盛夏闷热多雨，深冬山上结冰索道偶停。',
      en: 'Spring layers cloud sea over wildflowers; mid-autumn delivers the steadiest skies. Summers are humid and stormy, deep winter freezes can stall cable cars.',
    },
  },
  durations: [
    {
      days: 2,
      label: { zh: '周末', en: 'Weekend' },
      pitch: {
        zh: '上山一晚看日出 + 下山去宏村半天。两天看一座山一个古村，时间紧但完整。',
        en: 'One night on the summit for sunrise, half a day in Hongcun on the way down. Tight, but a complete arc — one mountain, one ancient village.',
      },
    },
    {
      days: 4,
      label: { zh: '4 天', en: '4 days' },
      pitch: {
        zh: '黄山 2 晚 + 宏村 / 西递 1 晚 + 屯溪老街半天。徽派建筑一次看够。',
        en: 'Two nights on the mountain, one in Hongcun or Xidi, and an old-street morning in Tunxi. The full Hui-style architecture short course.',
      },
    },
    {
      days: 6,
      label: { zh: '6 天', en: '6 days' },
      pitch: {
        zh: '加上婺源 / 千岛湖。看完云海再看徽州的茶园和水乡，节奏慢下来。',
        en: 'Add Wuyuan or Qiandao Lake. Cloud seas yield to tea hills and lake villages, and the trip relaxes by half a gear.',
      },
    },
  ],
  nearby: [
    {
      slug: 'shanghai',
      days: 3,
      reason: {
        zh: '高铁 3 小时，黄山下山直接进上海。',
        en: '3 hours by rail. Off the mountain and straight into Shanghai.',
      },
    },
    {
      slug: 'xian',
      days: 4,
      reason: {
        zh: '飞 1.5 小时回西安，山水之后接古都。',
        en: "A 90-minute flight to Xi'an pairs misty peaks with imperial history.",
      },
    },
    {
      slug: 'beijing',
      days: 4,
      reason: {
        zh: '飞 2.5 小时回北京，南方山水接北方厚重。',
        en: '2.5-hour flight north — southern peaks meet northern weight.',
      },
    },
  ],
  matchedItineraries: [
    {
      slug: 'huangshan-hongcun-4d',
      label: { zh: '4 天黄山宏村经典', en: '4-day Huangshan · Hongcun classic' },
      available: false,
    },
    {
      slug: 'nature-14d',
      label: { zh: '14 天自然摄影', en: '14-day nature & photography' },
      available: false,
    },
  ],
  advisorAnchor: '/about#lin',
  status: 'mock',
};

export const DESTINATIONS: Record<DestinationSlug, Destination> = {
  beijing,
  xian,
  shanghai,
  guilin,
  zhangjiajie,
  jiuzhaigou,
  dali,
  huangshan,
};

export const DESTINATION_SLUGS: DestinationSlug[] = [
  'beijing','xian','shanghai','guilin','zhangjiajie','jiuzhaigou','dali','huangshan',
];

export function getDestination(slug: string): Destination | null {
  if ((DESTINATION_SLUGS as string[]).includes(slug)) {
    return DESTINATIONS[slug as DestinationSlug];
  }
  return null;
}

