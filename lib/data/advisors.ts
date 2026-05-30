/**
 * lib/data/advisors.ts — pandatravel 顾问真名透明数据层（Phase 2.6 §5.11）
 *
 * v1 全 mock 占位 + status: 'hidden'，渲染由 <MockBadge> 守门，并被
 * scripts/prelaunch-mock-guard.ts 在 production build 前扫描拦截。
 *
 * 上线前由用户提供顾问真名 / 真号 / 真照片替换：
 *   - name.zh / name.en / role
 *   - whatsappPhone（E.164 格式国际号，去掉前导 +）
 *   - avatar.src（替换 placeholder initials）
 *   - vlogUrl（可选，30s 顾问自我介绍视频）
 *
 * 字段约束：
 *   - bio 双语 200-400 字，第一人称口吻，不打鸡血
 *   - caseSnippet 双语 80-150 字，写一个真实可考的服务片段（v1 用 mock 占位）
 *   - status 必为 'mock' 直到 prod ship 当天替换
 */

export type AdvisorBilingual = { zh: string; en: string };

export type AdvisorAvatar = {
  src?: string;
  placeholder: {
    initials: string;
    bg: 'jade' | 'vermilion' | 'gold';
  };
};

export type Advisor = {
  slug: string;
  name: AdvisorBilingual;
  role: AdvisorBilingual;
  bio: AdvisorBilingual;
  caseSnippet: AdvisorBilingual;
  whatsappPhone: string;
  avatar: AdvisorAvatar;
  vlogUrl?: string;
  languages: string[];
  status: 'hidden';
};

const lin: Advisor = {
  slug: 'lin',
  name: {
    zh: '顾问团队 · demo-01',
    en: 'Planning desk · demo-01',
  },
  role: {
    zh: '中国顾问团队 · 第一次来中国 / 历史文化路线',
    en: 'China planning team · First-timer & culture trips',
  },
  bio: {
    zh: '这是一张隐藏的顾问资料占位。正式展示前，需要替换成真实姓名、真实角色、联系方式、照片授权和可核验服务经历。当前公开页面只承诺真人顾问团队阅读需求，不承诺未核验个人或固定回复时效。',
    en: 'This is a hidden advisor-profile placeholder. Before public display, replace it with a verified name, role, contact channel, photo permission and service background. Current public pages only promise human review by the planning team, not an unverified person or fixed response window.',
  },
  caseSnippet: {
    zh: '上周给一组澳洲家庭（爸妈 + 9 岁双胞胎）写了 12 天「北京 · 西安 · 上海」的草稿。爸爸想看长城，孩子想坐高铁，妈妈想吃地道烤鸭——三件事都给安排进了，烤鸭那家是我自己每周也去的。',
    en: 'Last week I wrote a 12-day Beijing / Xi\'an / Shanghai draft for an Australian family — parents and twin nine-year-olds. Dad wanted the Great Wall, the kids wanted high-speed trains, mum wanted real Peking duck. All three made it in, and the duck spot is the one I go to myself every week.',
  },
  whatsappPhone: '',
  avatar: {
    placeholder: {
      initials: 'L',
      bg: 'vermilion',
    },
  },
  languages: ['中文', 'English'],
  status: 'hidden',
};

const mei: Advisor = {
  slug: 'mei',
  name: {
    zh: 'Mei · 顾问编号 demo',
    en: 'Mei · advisor demo-02',
  },
  role: {
    zh: '上海顾问 · 蜜月 / 慢节奏 / 山水路线',
    en: 'Shanghai-based advisor · Honeymoon, slow trips & landscape',
  },
  bio: {
    zh: '从前在一家国际酒店集团做客户体验，2021 年回来做私人顾问。我接的客户里蜜月夫妇最多——他们要的不是拍照打卡，而是「我们这一周不被打扰」。所以我写出来的草稿里很少出现大景区主入口，更多是清晨私船、寺院隔间、可以推开门就看见竹林的小院子。我会问你想要的中国安静到什么程度，再决定要不要把上海或者北京写进去。',
    en: 'I used to run guest experience at an international hotel group, then went private in 2021. The couples I serve most are honeymooners — what they want is not a photo checklist but a week that nobody disturbs them. My drafts rarely begin at the main entrance of a famous park; they begin with a private boat at dawn, a quiet wing of a temple, a courtyard you can open onto a bamboo grove. I ask how quiet your version of China should be before I decide whether Shanghai or Beijing belongs in the plan.',
  },
  caseSnippet: {
    zh: '今年三月给一对纽约的蜜月夫妇写了 9 天「桂林 · 阳朔 · 大理」。他们点名「不要任何旅行团出现的角度」——所以我把他们的清晨放在漓江私家船上，下午住阳朔山谷里只有 6 间房的小院，最后两天在大理喜洲找了一户可以同住的本地白族人家。',
    en: 'This March I wrote nine days through Guilin, Yangshuo and Dali for a New York honeymoon couple. They asked for "no angle a tour group would ever stand at" — so their mornings became private boats on the Li River, their afternoons a six-room courtyard tucked in a Yangshuo valley, and their last two days a homestay with a Bai family in Xizhou.',
  },
  whatsappPhone: '',
  avatar: {
    placeholder: {
      initials: 'M',
      bg: 'jade',
    },
  },
  languages: ['中文', 'English', '日本語 (basic)'],
  status: 'hidden',
};

const wei: Advisor = {
  slug: 'wei',
  name: {
    zh: 'Wei · 顾问编号 demo',
    en: 'Wei · advisor demo-03',
  },
  role: {
    zh: '广州顾问 · 240h 过境免签 / 短路线 / 商务延伸',
    en: 'Guangzhou-based advisor · 240h transit, short trips, business add-ons',
  },
  bio: {
    zh: '我在广州，做过 8 年来华商务客户的行程协调，2023 年开始接定制旅行。我手上的客户大多数是路过——商务出差顺便玩三五天、或者拿 240h 过境免签把广州 / 深圳 / 香港这一片串起来。这种行程最难的不是塞满，是该删掉哪些。我会先问你这次出差的真实余量，再决定要不要把澳门拉进来或者把第三天直接还给你睡觉。',
    en: 'I am based in Guangzhou. I spent eight years coordinating itineraries for inbound business travellers before going private in 2023. Most of my clients are passing through — a few extra days tacked onto a meeting, or a 240-hour transit-visa loop linking Guangzhou, Shenzhen and Hong Kong. The hard part of these trips is not what to add; it is what to cut. I always start by asking how much energy you really have left from the meeting, before deciding whether Macau belongs in the draft or whether day three should just be sleep.',
  },
  caseSnippet: {
    zh: '上个月给一位新加坡的工程师写了 6 天「广州 · 港珠澳大桥 · 香港」240h 过境免签线路。他原计划塞满，我帮他砍掉了珠海半天，换成在香港中环住一晚不用早起。回来他给我发了一句：「第一次出差回来不累。」',
    en: 'Last month I wrote a six-day "Guangzhou · HZMB Bridge · Hong Kong" 240h transit loop for a Singapore-based engineer. He wanted it packed; I cut half a day in Zhuhai and gave him one night in Central Hong Kong without an early call. His message after the trip was one line: "first business trip I came back from rested."',
  },
  whatsappPhone: '',
  avatar: {
    placeholder: {
      initials: 'W',
      bg: 'gold',
    },
  },
  languages: ['中文', 'English', '粤语'],
  status: 'hidden',
};

export const ADVISORS: Advisor[] = [lin, mei, wei];

export function getAdvisor(slug: string): Advisor | null {
  return ADVISORS.find((a) => a.slug === slug) ?? null;
}

export function getDefaultAdvisor(): Advisor {
  return lin;
}
