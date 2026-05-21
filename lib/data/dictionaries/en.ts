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
        { value: 10000, suffix: '+', label: "Travelers we've planned for" },
        { value: 98.8, decimals: 1, suffix: '%', label: '5-star reviews (sample)' },
        { value: 8, suffix: ' yrs', label: 'Average specialist tenure' },
        { value: 24, suffix: ' h', label: 'Reply within (China holidays excluded)' },
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
    leadForm: {
      eyebrow: 'Plan with a specialist',
      heading: 'Tell us your trip — a specialist replies within 24h',
      body: 'No obligation. We use these details to draft a private route, not a sales call.',
      submit: 'Send to a specialist',
      submitting: 'Sending…',
      labels: {
        name: 'Your name',
        email: 'Email',
        phone: 'Phone (optional)',
        country: 'Country / region',
        travelMonth: 'Travel month',
        durationDays: 'Trip length (days)',
        partySize: 'Travelers',
        preferredChannel: 'Preferred reply channel',
        budgetRange: 'Budget per person (optional)',
        notes: 'Tell us about your trip (optional)',
        travelStyle: 'Travel style notes (optional)',
        destinations: 'Destinations of interest (optional)',
      },
      placeholders: {
        name: 'Jane Traveler',
        email: 'you@email.com',
        phone: '+1 555 0100',
        country: 'United States',
        travelMonth: 'e.g. October 2026',
        notes: 'Pace, must-sees, dietary needs, anything that matters.',
        travelStyle: 'e.g. slow travel, food focus, family pace',
        destinations: 'e.g. Beijing, Yunnan, Guilin',
      },
      budgetOptions: [
        { id: 'tbd', label: 'Not sure yet' },
        { id: 'under_5000usd', label: 'Under $5,000 / person' },
        { id: '5000_15000usd', label: '$5,000 – $15,000 / person' },
        { id: '15000_30000usd', label: '$15,000 – $30,000 / person' },
        { id: '30000usd_plus', label: '$30,000+ / person' },
      ],
      consent:
        'By submitting you agree to be contacted by a specialist. Mock placeholder — replace with verified privacy notice before launch.',
      toasts: {
        verificationFailed: 'Verification failed, please retry.',
        rateLimited: 'Too many submissions, please retry in a minute.',
        genericError:
          'Something went wrong, please retry or contact us via WhatsApp.',
        success: 'Sent. A specialist will reply within 24h.',
      },
    },
    leadFormSuccess: {
      title: 'Thanks — your request is in.',
      subtitle: 'A China specialist will reply personally within 24 hours (Chinese holidays excluded).',
      channelsHeading: 'Prefer a faster reply? Reach us directly:',
    },
    faq: {
      eyebrow: 'FAQ',
      heading: 'Common questions before your China trip',
      ctaHint: 'Still unsure? Send your question with the form.',
      cta: 'Ask a specialist',
      items: [
        {
          q: 'Do I need a visa to visit China?',
          a: 'Most travelers from 38 countries can enter visa-free for 30 days as of 2026. We confirm your eligibility within 24 hours of your inquiry. (Mock placeholder — operations confirms before launch.)',
        },
        {
          q: 'How early should I plan?',
          a: 'Tailor-made trips usually need 4–8 weeks for hotel and guide booking. Last-minute (under 2 weeks) is possible but limited.',
        },
        {
          q: 'Is China safe for solo / family travelers?',
          a: 'China is one of the safest mainstream destinations. Specialist plans accommodate families with children and elderly travelers.',
        },
        {
          q: 'Can you arrange Mandarin-speaking guides?',
          a: 'All our guides speak fluent English; bilingual options (Spanish, German, French, Japanese) available with notice.',
        },
        {
          q: 'How do payments work?',
          a: 'We accept international cards, bank transfer, and Stripe. No payment is required until your itinerary is finalized.',
        },
        {
          q: 'What is the cancellation policy?',
          a: 'Free cancellation 30+ days before departure; partial refund 14–30 days. Specifics on your contract.',
        },
        {
          q: 'How is internet / VPN handled in China?',
          a: 'We brief you on functional apps (WeChat, Alipay, Maps) and travel SIM with Google access during your trip.',
        },
        {
          q: 'Can you handle special requests (dietary, accessibility)?',
          a: 'Yes — note them in the form or message your specialist; halal, kosher, gluten-free, wheelchair access all accommodated.',
        },
      ],
    },
    trustGrid: {
      eyebrow: 'Why travelers stay with us',
      heading: 'Specialists, examples, reviews and the small print',
      body: 'Mock placeholder content for now — every block below is wired to typed proof data so ops can swap real material in one place.',
      sections: {
        advisors: {
          title: 'Real specialists, not call-center scripts',
          body: 'Full-time, on contract, named on every reply.',
        },
        cases: {
          title: 'Example journeys we’ve drafted',
          body: 'Conceptual sketches — your trip is rebuilt from your conversation.',
        },
        reviews: {
          title: 'What travelers say',
          body: 'Mock placeholder reviews — real Tripadvisor and Google reviews to be wired in by ops.',
        },
        credentials: {
          title: 'The boring but useful small print',
          body: 'Licenses, payment partners and privacy stance — placeholders until legal sign-off.',
        },
      },
    },
    pathCFooter: {
      brandTagline:
        'Tailor-made China travel, drafted with a Beijing-based specialist who actually picks up.',
      quickLinksHeading: 'Explore',
      contactHeading: 'Reach a specialist',
      legalHeading: 'Fine print',
      languageHint: 'Switch language at the top of the page.',
      legal: [
        { label: 'Privacy', href: '/legal/privacy' },
        { label: 'Terms', href: '/legal/terms' },
        { label: 'ICP placeholder', href: '/legal/icp' },
      ],
      mockNotice: 'Mock data — replace before launch',
      copyright: '© 2026 Tourism Landing Demo · All rights reserved',
      quickLinks: [
        { label: 'Destinations', href: '#destinations' },
        { label: 'Specialists', href: '#specialists' },
        { label: 'FAQ', href: '#faq' },
        { label: 'Contact', href: '#lead-form' },
      ],
    },
  },
} as const;
