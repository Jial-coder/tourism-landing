export default {
  meta: {
    title: 'pandatravel · China trips designed by a Beijing local',
    description: 'A Beijing-based human advisor designs your China trip in 4 hours, not a chatbot in 1 working day.',
  },
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
  chat: {
    launcher: {
      showEntry: 'Show chat entry',
      openEntry: 'Chat with our concierge desk',
      dialogLabel: 'Concierge chat',
      title: 'Chat with our concierge desk',
      status: 'Lin · Online · Usually replies within 5 minutes',
      hide: 'Hide',
      close: 'Close',
      prompt:
        'Hi. First question: when are you thinking about coming to China? I will note the season and send you a matching route direction.',
      placeholder: 'Write your question...',
      sendToSpecialist: 'Send this to a specialist →',
    },
  },
  leadResponsePromise:
    'Lin, a Beijing-based China travel advisor, replies within 4 hours (Chinese holidays excluded).',
  home: {
    nav: {
      ariaLabel: 'Primary navigation',
      brand: 'pandatravel',
      items: [
        { href: '/destinations', label: 'Destinations', soft404: false },
        { href: '/itineraries', label: 'Itineraries', soft404: false },
        { href: '/visa-free', label: 'Visa-free', soft404: false },
        { href: '/about#team', label: 'Specialists', soft404: false },
        { href: '/stories', label: 'Stories', soft404: true },
        { href: '/about', label: 'About', soft404: false },
      ],
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
      soft404Body: "This corner of the site is opening in Phase 2. Leave a note now and we will pick it up when the page opens.",
      soft404Notify: 'Notify me · 通知我',
      soft404Close: 'Esc to close',
      contactSpecialist: 'Talk to a specialist',
      softLinks: {
        auth: {
          title: 'Accounts open in v1.5',
          body: 'For now we keep drafts and replies in sync via email and the contact method you leave in the form; account login is on the way. Want the sign-in link the day it ships?',
        },
        themes: {
          title: 'Themed routes coming in v1.5',
          body: 'We are splitting family, nature, business add-on and heritage into their own landing pages. v1.5 will take you straight to route directions for each.',
        },
        legalPrivacy: {
          title: 'Privacy policy in legal review',
          body: 'Our legal team is finalising a PIPL + GDPR aligned privacy policy. The formal page will be published before launch.',
        },
        legalTerms: {
          title: 'Terms of service in legal review',
          body: 'Formal terms of service are in final lawyer review. The formal page will be published before launch.',
        },
        legalIcp: {
          title: 'ICP filing in progress',
          body: 'The China ICP filing is being processed; once we have the number this line will be updated.',
        },
        bestTime: {
          title: '“Best time to visit” guide in progress',
          body: 'We are folding every destination’s best months into one filterable guide. Until then, each destination detail page already has a “Best Time to Visit” section.',
        },
        careers: {
          title: 'Careers not open yet',
          body: 'In v1 we deliberately signed only 3 full-time specialists. The next hiring round will be posted here. Want a heads-up?',
        },
        press: {
          title: 'Press page in progress',
          body: 'Until the press page is live, please leave “Press inquiry” in the request form. We will route it to the right person.',
        },
        wechat: {
          title: 'WeChat contact card in progress',
          body: 'Lin’s personal QR code and WeChat ID will be posted here before launch; for now please leave your preferred contact method in the request form.',
        },
        aboutPromise: {
          title: '“Brand promise” page in progress',
          body: 'The 6 promises currently live in the “Our promise” section on /about. A standalone page will be split out in v1.5.',
        },
        aboutResponsible: {
          title: '“Responsible travel” policy in progress',
          body: 'Our sustainability stance gets its own page in v1.5, with partner hotels and community programs listed.',
        },
        aboutVoices: {
          title: '“Traveler voices” page in progress',
          body: 'Once our first cohort returns home we will collect their voices and photos here. Until then, /reviews already has the promise and evaluation standard.',
        },
      },
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
        'Start with a custom request. A Beijing specialist will reply through the contact method you leave in the form (Chinese holidays excluded).',
      contactModalCloseLabel: 'Close contact specialist dialog',
      anchorCard: {
        eyebrow: 'Route idea · tweak it your way',
        title: '10-day first-timer China · Culture & landscape balanced',
        meta: '10 days · from USD 4,200 · best Apr–May / Sep–Oct',
        cta: 'See full itinerary',
      },
    },
    advisorShortcut: {
      eyebrow: 'Not ready to compare routes yet?',
      heading: 'Get the direction clear before you build the trip',
      body:
        'If you are still weighing cities, seasons, pace or budget, this section helps you get the key points straight first. A Beijing specialist will turn that into a draft route next.',
      primaryCta: 'Start planning',
      secondaryCta: 'Fill in the request',
      points: [
        {
          title: 'Replies within 4 hours',
          body: 'A real Beijing specialist answers, not an auto-reply.',
        },
        {
          title: 'Start with direction',
          body: 'No city picked yet? That is fine. Just bring pace and budget into focus.',
        },
        {
          title: 'Jump straight to planning',
          body: 'If you already know what you want, go directly to the form.',
        },
      ],
    },
    trustStrip: {
      items: [
        { value: 4, suffix: ' h', label: 'First human reply target' },
        { value: 24, suffix: ' h', label: 'Draft route after direction is clear' },
        { value: 1, suffix: ':1', label: 'Beijing specialist handoff' },
        { value: 0, suffix: ' preset menus', label: 'Fixed package menus' },
      ],
    },
    visaFreeBanner: {
      eyebrow: '240h Visa-Free',
      headline: 'Foreign passports can transit through Beijing, Shanghai or Guangzhou for up to 240 hours visa-free.',
      body: 'Official policy covers 55 countries, 65 ports and 24 provincial-level regions. Our tool starts with common traveler passports and ports, then routes you to Lin for a final check.',
      cta: 'See visa-free trips',
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
      eyebrow: 'Route starters',
      heading: 'Pick a direction first, then make it yours',
      body: 'Public destinations give you a clear starting point. Hand Lin the direction you like and we will reshape it around month, budget and pace.',
      cta: 'See direction',
      seeAll: 'Fill in my request',
      meta: {
        days: 'days',
        priceFromUsd: 'From USD {price}',
        bestMonths: 'Best in {months}',
      },
    },
    itineraries: {
      eyebrow: 'Itineraries',
      heroHeading: 'Start from a route direction · then make it yours',
      heroBody: 'Every route direction is clear about what can change. Browse the depth, then tell Lin what to keep, swap or drop.',
      filterDuration: 'Length',
      filterTheme: 'Theme',
      filterMonth: 'Travel month',
      cardLengthLabel: 'days',
      cardCtaLabel: 'See the 10-chapter detail',
      detailGlance: 'One-table glance at the rhythm',
      detailDayByDay: 'Morning · afternoon · evening, day by day',
      detailHighlights: 'Moments most travellers remember',
      detailPrice: 'Price band · final number 1:1 with Lin',
      detailTailorMake: 'Want to make it yours? Common swaps',
      detailTripNotes: 'Where you sleep, how you move, what you eat, visa',
      detailAdvisor: 'Hand it to Lin to make yours',
      detailFinalCta: 'Hand this line to Lin →',
      mockBadge: 'reference band',
    },
    specialists: {
      eyebrow: 'Your specialists',
      heading: 'A real specialist handles your idea first',
      body: 'Public specialist profiles will appear after verification. For now, this shows how your request is handled by humans.',
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
        'By submitting, you agree that we may use these details only to discuss your trip. You can ask the specialist to stop contacting you at any time.',
      toasts: {
        verificationFailed: 'Verification failed, please retry.',
        rateLimited: 'Too many submissions, please retry in a minute.',
        genericError:
          'Something went wrong. Please retry; if it keeps failing, submit again later.',
        success: 'Sent. Lin will reply within 4h.',
      },
    },
    leadFormSuccess: {
      title: 'Thanks — your request is in.',
      subtitle: 'Lin, a Beijing-based China specialist, will reply personally within 4 hours (Chinese holidays excluded).',
      channelsHeading: 'Other verified contact channels:',
      channelsFallback:
        'We already have your request. The specialist will reply through the contact method you left in the form. External direct channels stay hidden until verified.',
      advisorPromiseEyebrow: '1:1 advisor commitment',
      advisorPromiseTitle: 'Lin (Beijing) will reply within 4 hours',
      advisorPromiseBody:
        'No round-robin queue. The same specialist sees your draft, replies, and stays with you until departure.',
      directWhatsApp: 'Message Lin on WhatsApp →',
      directWeChat: 'Message Lin on WeChat →',
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
      jumpWhatsAppMockHint: 'WhatsApp number is not public yet.',
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
        turnstileMissing: 'Verification not complete yet — please try again',
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
        body: 'Lin (Beijing) replies within 4 hours, in your timezone, through the contact method you leave in the form.',
        whyAsk: 'We need at least an email to send the first draft. Phone and contact preferences in your notes are optional, but speed up the back-and-forth.',
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
          a: 'Travelers from more than 40 countries may qualify for 30-day unilateral visa-free entry as of 2026. We confirm your eligibility within 24 hours of your inquiry. Policy changes, so rely on the latest check before booking.',
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
          a: 'No payment is required while we shape the first draft. The final proposal will confirm the available payment methods and operating entity before you pay.',
        },
        {
          q: 'What is the cancellation policy?',
          a: 'Cancellation terms are written into the final service agreement before payment. We do not ask you to pay until those terms are clear.',
        },
        {
          q: 'How is internet / VPN handled in China?',
          a: 'We brief you on essential China apps and current travel SIM or eSIM options before departure. Connectivity rules change, so we confirm the setup close to travel.',
        },
        {
          q: 'Can you handle special requests (dietary, accessibility)?',
          a: 'Yes — note them in the form or message your specialist; halal, kosher, gluten-free, wheelchair access all accommodated.',
        },
      ],
    },
    trustGrid: {
      eyebrow: 'Why travelers stay with us',
      heading: 'If proof is not ready, we do not pretend it is',
      body: 'Reviews, specialist profiles, cases and credentials will go public after verification. Until then, the page only shows process commitments we can stand behind.',
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
          body: 'Verified Tripadvisor and Google reviews appear only after permission and ops checks.',
        },
        credentials: {
          title: 'The boring but useful small print',
          body: 'Licenses, payment partners and privacy stance — interim notes until legal sign-off.',
        },
      },
    },
    visaFree: {
      eyebrow: '240h transit visa-free',
      headline: '240 hours in China without a visa. Use them well.',
      lede:
        'Pick a passport, a port and where you fly to next. We tell you in plain language whether you qualify, what you can see, and where you cannot go.',
      sourceLabel: 'Source · NIA 2025-11-04',
      lastReviewedLabel: 'Last reviewed',
      tool: {
        heading: 'Decision tool',
        body: 'Four short answers, no commitment. We update this tool quarterly against the National Immigration Administration source.',
        steps: {
          a: {
            label: 'Step a · Passport',
            heading: 'Pick your passport country',
            help: 'We start with common passports from the 55-country NIA list; ask Lin if yours is missing.',
            placeholder: 'Search countries',
          },
          b: {
            label: 'Step b · Entry port',
            heading: 'Pick your entry port',
            help: 'We start with common airports, rail stations, bridges and land/sea ports; the official list is broader.',
            placeholder: 'Search ports',
          },
          c: {
            label: 'Step c · Onward destination',
            heading: 'Where do you fly next?',
            help: 'You must onward to a third country / region. Hong Kong, Macao and Taiwan all count.',
            placeholder: 'Search countries / regions',
          },
          d: {
            label: 'Step d · Stay',
            heading: 'How long do you need?',
            help: 'Some ports allow 24h direct transit even when 240h is unavailable.',
            options24: '24h direct transit',
            options24Help: 'Stay airside or in the inspection zone — no need to clear immigration.',
            options240: '240h transit visa-free',
            options240Help: 'Up to 10 full days in approved provincial regions.',
          },
        },
      },
      result: {
        eligibleHeading: 'You qualify',
        ineligibleHeading: 'Not eligible — here is why',
        regionsLabel: 'Provinces and regions you can visit',
        portsLabel: 'Ports in this region you can also use to exit',
        risksHeading: 'Caveats and risks',
        risks: [
          'You must exit through a port within the same approved region — no leaving from a non-approved province.',
          'You cannot extend the 240-hour clock once granted. Plan your onward flight conservatively.',
          'Working, studying, long-term living and investment activities are not allowed under the transit visa-free programme.',
          'If your onward ticket flies back to your departure country, immigration may treat it as a round trip and refuse entry.',
          'Policy is being revised quarterly. Check the NIA source linked above before flying.',
        ],
        cta: {
          plan: 'Tailor-make my route with Lin',
          chat: 'Send these choices to Lin',
        },
      },
      caveats: {
        heading: 'The fine print, written like a person',
        items: [
          {
            title: 'How the clock starts',
            body: 'For 240h, the timer starts at 00:00 on the day after entry, not at the moment your plane lands. Each port may interpret this differently — confirm at inspection.',
          },
          {
            title: 'Where you can go',
            body: '24 provincial-level regions. You may not cross into a province that is outside your entry region without first leaving China.',
          },
          {
            title: 'What you cannot do',
            body: 'No paid work, study, investment or long-term residence. Business meetings sit in a grey zone — keep them light.',
          },
          {
            title: 'When you may be refused',
            body: 'A return ticket back to your departure country, frequent re-entry on the same passport, or unclear onward documentation can each end the trip at the border.',
          },
          {
            title: 'Policy changes fast',
            body: 'China widened transit visa-free in 2024 and 2025 (24 → 55 countries, 144 → 240 hours). Always re-check before booking.',
          },
        ],
      },
      readymade: {
        heading: 'Visa-free route starters',
        body: 'Four 10-day starting points Lin can rearrange to your group, pace and return flight.',
        comingSoonBadge: 'custom-built',
        cta: 'Ask Lin for this route',
      },
      contact: {
        heading: 'Still confused? Skip the form.',
        body: 'Send Lin your passport, entry port and onward country. We check the visa-free boundary first, then suggest a route.',
        whatsappCta: 'Ask Lin to check it',
        embassyCta: 'Need a longer stay? Apply for an L visa →',
        embassyHref: 'https://bj.china-embassy.gov.cn/eng/',
        notOnListCta: 'Passport not listed here? Talk to us anyway →',
      },
      tailorMake: {
        heading: 'Or build a custom route from these answers',
        body: 'We will pre-fill the planner with your visa-free choices so the conversation can start where you left off.',
        cta: 'Tailor-make my visa-free trip',
      },
      sample: {
        passport: 'Passport',
        port: 'Entry port',
        onward: 'Onward to',
        stay: 'Stay',
      },
      placeholders: {
        passport: 'Choose a country',
        port: 'Choose a port',
        onward: 'Choose a country / region',
      },
      reasons: {
        pendingInput: 'Fill in all four steps to see your answer.',
        passportNotEligible: 'Your passport is not in our current tool list. Ask Lin to check the latest policy before booking.',
        portNotInPassportList: 'This port is not allowed for your passport.',
        portNotApplicableForStay: 'This port does not currently support the stay length you picked.',
        durationNotEligibleForPassport: 'Your passport is not on the list for this stay length.',
        onwardSameAsPassport: 'Your onward destination is the same as your passport country, so it does not count as a third country.',
        onwardNotRecognised: 'This destination is not recognised as a third country / region.',
        eligible: 'All four checks pass.',
      },
    },
    pathCFooter: {
      brandTagline:
        'Tailor-made China travel, drafted with a Beijing-based specialist who actually picks up.',
      manifesto: {
        title: 'Highlights happen when you get closer.',
        subtitle: 'The best travel moments rarely happen from far away.',
      },
      newsletter: {
        heading: 'Newsletter',
        body: 'One note a month · 3 specialist-picked China ideas · no ads.',
      },
      legalShortLabels: {
        privacy: 'Privacy',
        terms: 'Terms',
        icp: 'ICP',
      },
      sitemap: {
        plan: {
          heading: 'Plan',
          links: [
            { label: 'Plan my trip', href: '/plan' },
            { label: 'Visa-free 240h', href: '/visa-free' },
            { label: 'Destinations', href: '/destinations' },
          ],
        },
        discover: {
          heading: 'Discover',
          links: [
            { label: 'Itineraries', href: '/itineraries' },
            { label: 'Custom itinerary request', href: '/plan' },
            { label: 'Themes', href: '/themes', soft: 'themes' as const },
          ],
        },
        about: {
          heading: 'About',
          links: [
            { label: 'About pandatravel', href: '/about' },
            { label: 'Reviews', href: '/reviews' },
            { label: 'Contact', href: '/about#contact' },
          ],
        },
        channels: {
          heading: 'Fine print',
          links: [
            { label: 'Privacy', href: '/legal/privacy', soft: 'legalPrivacy' as const },
            { label: 'Terms', href: '/legal/terms', soft: 'legalTerms' as const },
            { label: 'ICP', href: '/legal/icp', soft: 'legalIcp' as const },
          ],
        },
      },
      trustNetwork: {
        heading: 'Trust network',
        body: 'We will plug verified review widgets in here as our first cohort lands.',
        partners: [
          { label: 'Tripadvisor', status: 'verifying' },
          { label: 'Google Reviews', status: 'verifying' },
          { label: 'Feefo', status: 'verifying' },
          { label: 'Trustindex', status: 'verifying' },
        ],
        partnerStatusLabel: 'verifying',
      },
      replyPromise: {
        heading: 'Reply promise',
        body: 'Lin replies in 4 hours from Beijing. No chatbot, no auto-routing.',
        meta: 'Chinese public holidays excluded.',
      },
      whyPanda: {
        heading: 'Why pandatravel',
        body: 'A small Beijing-based studio that designs private China trips around how you actually travel — not a packaged menu, not a 49-field intake form.',
      },
      languageHint: 'Switch language at the top of the page.',
      mockNotice: 'Content follows the final verified version',
      copyright: '© 2026 pandatravel · pandatravel.com.cn · All rights reserved',
    },
  },
} as const;
