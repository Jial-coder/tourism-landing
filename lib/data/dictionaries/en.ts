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
  leadResponsePromise:
    'A China travel advisor usually replies within 24 hours (Chinese holidays excluded).',
  home: {
    hero: {
      eyebrow: 'Tailor-made China',
      headline: 'Plan your private China trip with local experts',
      subheadline:
        'From the Forbidden City sunrises to a private Yunnan loop — every itinerary is a real conversation between you and a Beijing-based specialist.',
      primaryCta: 'Start planning',
      secondaryCta: 'Talk to a specialist',
    },
    trustStrip: {
      items: [
        { stat: '10,000+', label: "Travelers we've planned for" },
        { stat: '98.8%', label: '5-star reviews (sample)' },
        { stat: '8 yrs', label: 'Average specialist tenure' },
        { stat: '24 h', label: 'Reply within (China holidays excluded)' },
      ],
    },
    howWeWork: {
      eyebrow: 'How we work',
      heading: 'Three steps from idea to itinerary',
      steps: [
        {
          num: '01',
          title: 'Talk to a specialist',
          body: 'Tell us your travel month, party size, pace and the China you imagine. No package menu.',
        },
        {
          num: '02',
          title: 'Tailor-make a route',
          body: 'Your specialist drafts a private route, hotels, guides and pace; we refine until it fits.',
        },
        {
          num: '03',
          title: 'Travel with backup',
          body: 'On-the-ground support from Beijing — flights delayed, plans changed, food allergies — handled in your timezone.',
        },
      ],
      cta: 'Start planning',
    },
    destinations: {
      eyebrow: 'Destinations',
      heading: 'Start with one place that pulls you',
      body: "Pick the one you've imagined — we'll thread the rest of China around it.",
      items: [
        { slug: 'beijing', name: 'Beijing', hook: 'The Forbidden City at sunrise' },
        { slug: 'xian', name: "Xi'an", hook: 'Terracotta army & Tang dynasty markets' },
        { slug: 'shanghai', name: 'Shanghai', hook: 'Bund nights & lane breakfasts' },
        { slug: 'guilin', name: 'Guilin', hook: 'Karst rivers & bamboo rafts' },
        { slug: 'zhangjiajie', name: 'Zhangjiajie', hook: 'Avatar peaks above the cloud' },
        { slug: 'jiuzhaigou', name: 'Jiuzhaigou', hook: 'Tibetan valleys & turquoise pools' },
        { slug: 'dali', name: 'Dali', hook: 'Slow lakeside Yunnan' },
        { slug: 'huangshan', name: 'Huangshan', hook: 'Cloud sea & ink-painting peaks' },
      ],
    },
    sampleItineraries: {
      eyebrow: 'Sample journeys',
      heading: 'How others have travelled with us',
      body: 'Conceptual examples — your itinerary is built from your conversation, not picked off a shelf.',
      cta: 'Plan a similar trip',
    },
    specialists: {
      eyebrow: 'Your specialists',
      heading: 'Real people behind every reply',
      body: 'Beijing / Chengdu / Shanghai-based, full-time, on contract. No outsourced agents.',
      cta: 'Speak to a specialist',
    },
  },
} as const;
