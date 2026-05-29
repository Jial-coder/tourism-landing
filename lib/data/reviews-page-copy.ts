import type { Locale } from './locales';

export const reviewsPageCopy: Record<
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
    status: {
      srTitle: string;
      eyebrow: string;
      heading: string;
      body: string;
      meterLabel: string;
      meterValue: string;
      meterUnit: string;
      meterBody: string;
    };
    promise: {
      eyebrow: string;
      heading: string;
      body: string;
    };
    proofNeeded: {
      eyebrow: string;
      heading: string;
      body: string;
      items: {
        title: string;
        body: string;
      }[];
    };
    awards: {
      eyebrow: string;
      heading: string;
      body: string;
      note: string;
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
      title: "Reviews · New company, no fake proof | pandatravel",
      description:
        "pandatravel does not publish fake review counts, star ratings or award logos. This page explains what we can prove now and what needs real traveler consent before publication.",
    },
    hero: {
      eyebrow: "Reviews · proof policy",
      heading: "No fake reviews. No borrowed badges.",
      body:
        "We are not going to pretend we have thousands of public reviews or a five-star platform badge before those proofs exist. Until verified traveler feedback is available, judge us by the operating standards we publish.",
    },
    status: {
      srTitle: "Current review status",
      eyebrow: "Current status",
      heading: "Public traveler reviews are not live yet",
      body:
        "The site is ready to collect real post-trip feedback, but we will not publish quotes, ratings, names, photos or platform widgets until we have permission and a verifiable source.",
      meterLabel: "Public reviews",
      meterValue: "0",
      meterUnit: "verified and published",
      meterBody:
        "Tripadvisor, Google Reviews, Trustindex or other widgets require real platform accounts, real reviews and permission to quote.",
    },
    promise: {
      eyebrow: "What to use before reviews exist",
      heading: "Use these six standards to judge us now",
      body:
        "The same standards also appear on /about. If one of them is unclear, ask Lin before you continue.",
    },
    proofNeeded: {
      eyebrow: "Needs real data",
      heading: "What must be real before it appears here",
      body:
        "These slots are intentionally empty until you provide verified materials or the first travelers give explicit permission.",
      items: [
        {
          title: "Traveler reviews",
          body:
            "Original review text, public link or source capture, travel month, trip type, and permission to publish.",
        },
        {
          title: "Review widgets",
          body:
            "A real Tripadvisor / Google / Trustindex account, widget setup, and confirmation that the displayed count and rating are current.",
        },
        {
          title: "Traveler photos",
          body:
            "Original images, location context, photographer/traveler consent, and website usage permission.",
        },
        {
          title: "Awards or media mentions",
          body:
            "Only published awards or press links with the right to use the name/logo. Otherwise this section stays empty.",
        },
      ],
    },
    awards: {
      eyebrow: "Awards",
      heading: "No awards are published yet",
      body:
        "pandatravel should not display Travel + Leisure, Conde Nast Traveler, TTG, ITB, Tripadvisor or any other badge unless there is a real award, public source and logo usage permission.",
      note:
        "This restraint is intentional. A clean empty state is safer than a badge wall made from unverified material.",
    },
    cta: {
      eyebrow: "Early traveler",
      heading: "Want to help create the first real review?",
      body:
        "Start with a trip request. After travel, we may ask for honest feedback, but publication will only happen with permission.",
      button: "Start my trip request →",
    },
  },
  zh: {
    meta: {
      title: "评价 · 不造评价，不借徽章 | pandatravel",
      description:
        "pandatravel 不展示虚假评价数、星级评分或奖项 logo。本页说明当前能证明什么，以及哪些内容必须等真实旅客授权后才能公开。",
    },
    hero: {
      eyebrow: "评价 · 证据政策",
      heading: "不造评价，也不借别人的徽章",
      body:
        "在真实证据出现之前，我们不会假装自己有几千条公开评价，也不会挂五星平台徽章。真实旅客反馈积累前，请先用我们公开的工作标准来判断。",
    },
    status: {
      srTitle: "当前评价状态",
      eyebrow: "当前状态",
      heading: "公开旅客评价还没有上线",
      body:
        "网站已经为真实行后反馈预留位置，但没有授权和可核验来源之前，不会发布 quote、评分、姓名、照片或第三方评价 widget。",
      meterLabel: "公开评价",
      meterValue: "0",
      meterUnit: "条已核验并发布",
      meterBody:
        "Tripadvisor、Google Reviews、Trustindex 或其它 widget 都需要真实平台账号、真实评价和引用授权。",
    },
    promise: {
      eyebrow: "没有评价前看什么",
      heading: "先用这 6 条标准判断我们",
      body:
        "同样的标准也写在 /about。任何一条不清楚，都可以继续往下走之前直接问 Lin。",
    },
    proofNeeded: {
      eyebrow: "需要真实资料",
      heading: "这些内容必须真实，才会出现在这里",
      body:
        "这些位置会保持空白，直到你提供可核验资料，或首批旅客明确授权公开。",
      items: [
        {
          title: "旅客评价",
          body: "原始评价文字、公开链接或来源截图、出行月份、旅行类型，以及发布授权。",
        },
        {
          title: "评价 widget",
          body: "真实 Tripadvisor / Google / Trustindex 账号、widget 接入，以及当前数量和评分核验。",
        },
        {
          title: "旅客照片",
          body: "原图、地点背景、拍摄者 / 旅客同意，以及网站使用授权。",
        },
        {
          title: "奖项或媒体提及",
          body: "真实公开奖项或媒体链接，并且有权使用名称 / logo；否则本区继续为空。",
        },
      ],
    },
    awards: {
      eyebrow: "奖项",
      heading: "暂不发布任何奖项",
      body:
        "除非有真实奖项、公开来源和 logo 使用许可，否则 pandatravel 不应该展示 Travel + Leisure、Conde Nast Traveler、TTG、ITB、Tripadvisor 或其它徽章。",
      note:
        "这是刻意的克制。干净的空状态，比用未核验材料堆徽章墙更安全。",
    },
    cta: {
      eyebrow: "早期旅客",
      heading: "愿意帮我们留下第一批真实反馈吗？",
      body:
        "先从行程需求开始。旅行结束后，我们可能会邀请你写真实反馈；是否公开，必须由你授权。",
      button: "开始填写我的需求 →",
    },
  },
};
