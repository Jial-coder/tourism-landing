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
    'Lin, a Beijing-based China travel advisor, replies within 4 hours (Chinese holidays excluded).',
  home: {
    nav: {
      ariaLabel: 'Primary navigation',
      brand: 'pandatravel',
      items: [
        { href: '/destinations', label: 'Destinations', soft404: false },
        { href: '/itineraries', label: 'Itineraries', soft404: false },
        { href: '/advisors', label: 'Specialists', soft404: false },
        { href: '/stories', label: 'Stories', soft404: true },
        { href: '/about', label: 'About', soft404: false },
      ],
      more: 'More',
      ctaPlan: 'Plan my trip',
      whatsappLabel: 'WhatsApp · on-call',
      whatsappAria: 'WhatsApp on-call specialist',
      authTrigger: 'Sign in',
      authMenuLabel: 'Sign-in menu',
      authWelcome: 'Welcome',
      authSignIn: 'Sign in',
      authSignUp: 'Create account',
      authNote: 'Save drafts and chats so you can pick up where you left off.',
      authMobileLink: 'Sign in →',
      mobileMenuOpen: 'Open menu',
      mobileMenuClose: 'Close menu',
      mobileMenuLabel: 'Mobile menu',
      languageHeading: 'LANGUAGE · 语言',
      soft404Title: 'This corner is opening in Phase 2',
      soft404Body: "This corner of the site is opening in Phase 2. Want us to email you when it's live?",
      soft404Notify: 'Notify me · 通知我',
      soft404Close: 'Esc to close',
      contactSpecialist: 'Talk to a specialist',
    },
    hero: {
      eyebrow: 'Tailor-made China',
      headline: 'Plan your private China trip with local experts',
      subheadline:
        'From the Forbidden City sunrises to a private Yunnan loop — every itinerary is a real conversation between you and a Beijing-based specialist.',
      primaryCta: 'Start planning',
      secondaryCta: 'Talk to a specialist',
      contactModalTitle: 'Talk to a specialist',
      contactModalDescription:
        'Pick the channel that suits you. A Beijing specialist replies within 24 hours (Chinese holidays excluded).',
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
      heading: 'Tell us your trip — Lin replies within 4h',
      body: 'No obligation. We use these details to draft a private route, not a sales call.',
      submit: 'Send to a specialist',
      submitting: 'Sending…',
      requiredHint: 'Required',
      requiredAria: 'required field',
      errors: {
        required: 'This field is required',
        invalidEmail: 'Please enter an email we can reach you at',
        tooShort: 'A bit too short — please add more detail',
        tooLong: 'This is over the maximum length',
        invalidNumber: 'Please enter a valid number',
        outOfRange: 'That value is outside the allowed range',
        turnstileMissing: 'Verification not complete yet — please try again',
        generic: "Something looks off here — please double-check",
      },
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
      },
      placeholders: {
        name: 'Jane Traveler',
        email: 'you@email.com',
        phone: '+1 555 0100',
        country: 'United States',
        travelMonth: 'e.g. October 2026',
        notes: 'Pace, must-sees, dietary needs, destinations of interest, travel style — anything that matters.',
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
        success: 'Sent. Lin will reply within 4h.',
      },
    },
    leadFormSuccess: {
      title: 'Thanks — your request is in.',
      subtitle: 'Lin, a Beijing-based China specialist, will reply personally within 4 hours (Chinese holidays excluded).',
      channelsHeading: 'Prefer a faster reply? Reach us directly:',
      advisorPromiseEyebrow: '1:1 advisor commitment',
      advisorPromiseTitle: 'Lin (Beijing) will reply within 4 hours',
      advisorPromiseBody:
        'No round-robin queue. The same specialist sees your draft, replies, and stays with you until departure.',
      directWhatsApp: 'Talk now on WhatsApp →',
      directWeChat: 'Open WeChat (CN priority) →',
      backHome: '← Back to home',
    },
    planWizard: {
      eyebrow: 'Plan my China trip',
      heading: 'Send your idea to a Beijing-based advisor',
      body:
        'Five short steps about the kind of trip you want — not a 49-field interrogation. Lin (Beijing) replies within 4 hours.',
      progressLabel: 'Step',
      of: 'of',
      back: 'Back',
      next: 'Next →',
      submit: 'Send to a specialist',
      submitting: 'Sending…',
      whyAsk: 'Why we ask',
      requiredAria: 'required field',
      jumpWhatsAppHeading: 'Want to chat now? Skip the rest →',
      jumpWhatsAppBody:
        'Tap to open WhatsApp with your trip-intent prefilled. Lin reads it, replies in your timezone.',
      jumpWhatsAppCta: 'WhatsApp Lin now',
      jumpWhatsAppMockHint: 'WhatsApp number is a placeholder until launch.',
      filledHeading: 'So far',
      resumeHint: 'We saved your last draft — pick up where you left off.',
      resumeClear: 'Clear and start over',
      errors: {
        required: 'This field is required',
        invalidEmail: 'Please enter an email we can reach you at',
        tooShort: 'A bit too short — please add more detail',
        tooLong: 'This is over the maximum length',
        invalidNumber: 'Please enter a valid number',
        termsRequired: 'Please confirm before sending',
        generic: "Something looks off here — please double-check",
      },
      summary: {
        when: 'When',
        group: 'Travelers',
        interests: 'You want',
        budget: 'Budget',
        hotel: 'Hotels',
      },
      step1: {
        heading: 'When do you plan to come?',
        body: 'Even a rough month helps us check weather windows and crowd peaks.',
        whyAsk: 'Some months (Golden Week, Chinese New Year) are crowded; others are perfect for specific regions. We use this to suggest the right pace.',
        windowLabel: 'How precise are your dates?',
        windowOptions: [
          { id: 'precise', label: 'Precise dates' },
          { id: 'approximate', label: 'A flexible month' },
          { id: 'considering', label: 'Still considering' },
        ],
        monthLabel: 'Which month roughly?',
        monthPlaceholder: 'e.g. April 2027',
        lengthLabel: 'Roughly how many days?',
        lengthOptions: [
          { id: '5-7-days', label: '5–7 days' },
          { id: '8-10-days', label: '8–10 days' },
          { id: '11-14-days', label: '11–14 days' },
          { id: '15-plus-days', label: '15+ days' },
          { id: 'unsure', label: 'Not sure yet' },
        ],
      },
      step2: {
        heading: 'Who is travelling with you?',
        body: 'We tune the pace, hotels, and meals to your group.',
        whyAsk: 'A honeymoon and a 4-generation family ask for very different drafts. This is the single most useful signal.',
        groupLabel: 'Who is going?',
        groupOptions: [
          { id: 'solo', label: 'Just me' },
          { id: 'couple', label: 'Couple' },
          { id: 'family', label: 'Family with kids' },
          { id: 'friends', label: 'Friends' },
          { id: 'business-plus', label: 'Business + leisure' },
        ],
        adultsLabel: 'How many adults?',
        childrenLabel: 'Children — pick the age tiers that apply',
        childTiers: [
          { id: '0-3', label: 'Under 4' },
          { id: '4-8', label: '4–8 years' },
          { id: '9-12', label: '9–12 years' },
          { id: '13-17', label: '13–17 years' },
        ],
      },
      step3: {
        heading: 'What kind of China do you want?',
        body: 'Pick a few — there is no wrong answer.',
        whyAsk: 'These chips become the soul of your draft. Pick three over ten — focus beats coverage.',
        chips: [
          { id: 'nature', label: 'Nature & landscapes' },
          { id: 'history', label: 'History & culture' },
          { id: 'food', label: 'Food obsession' },
          { id: 'slow', label: 'Slow pace' },
          { id: 'modern-city', label: 'Modern cities' },
          { id: 'outdoor', label: 'Outdoor adventure' },
          { id: 'honeymoon', label: 'Honeymoon' },
          { id: 'visa-free', label: 'Transit visa-free' },
        ],
        notesLabel: 'Tell us in your own words (optional)',
        notesPlaceholder:
          'A morning at a hidden temple. A cooking class with a grandmother. Whatever you secretly want.',
        skippedHint:
          'You arrived from the visa-free tool — we already pinned “Transit visa-free” for you.',
      },
      step4: {
        heading: 'Budget & hotel preference',
        body: 'These two ranges decide which routes we actually draft.',
        whyAsk: 'High-season private cars + 5-star hotels in Beijing run differently from a slow Yunnan mid-tier loop. We need a rough range to draft something realistic.',
        budgetLabel: 'Budget per person (USD)',
        budgetOptions: [
          { id: 'usd-1500-3000', label: '$1,500 – $3,000' },
          { id: 'usd-3000-6000', label: '$3,000 – $6,000' },
          { id: 'usd-6000-10000', label: '$6,000 – $10,000' },
          { id: 'usd-10000-plus', label: '$10,000+' },
          { id: 'unsure', label: 'Not sure yet' },
        ],
        hotelLabel: 'Hotel class',
        hotelOptions: [
          { id: '3-star', label: '3-star' },
          { id: '4-star', label: '4-star' },
          { id: '5-star', label: '5-star' },
          { id: 'luxury', label: 'Luxury / boutique' },
          { id: 'no-pref', label: 'No preference' },
          { id: 'recommend', label: 'Recommend for me' },
        ],
      },
      step5: {
        heading: 'How should Lin reach you?',
        body: 'Lin (Beijing) replies within 4 hours, in your timezone, by your channel of choice.',
        whyAsk: 'We need at least an email to send the first draft. Phone + WhatsApp / WeChat are optional, but speed up the back-and-forth.',
        nameLabel: 'Your name',
        namePlaceholder: 'Jane Traveler',
        emailLabel: 'Email',
        emailPlaceholder: 'you@email.com',
        countryCodeLabel: 'Country',
        phoneLabel: 'Phone (optional)',
        phonePlaceholder: '5550100',
        whatsappLabel: 'OK to message me on WhatsApp',
        wechatLabel: 'Reply via WeChat (CN priority)',
        termsLabel:
          'I agree to be contacted by a Beijing-based specialist about this trip request.',
        termsLink: 'Privacy notice',
      },
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
