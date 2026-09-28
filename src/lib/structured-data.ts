import { faqs } from './faq-data';
import type { JsonLd } from '@/types';

export const SITE_URL = 'https://reachmyads.com';
export const SITE_NAME = 'Reach My Ads';

/**
 * Other ways people write the name. Search engines use these to tie a
 * search for "reachmyads" or "reach my ads india" back to this site.
 */
export const SITE_ALTERNATE_NAMES = ['ReachMyAds', 'reachmyads.com', 'Reach My Ads India'];

/** The team as listed on /about. Named here so the entity has real people behind it. */
export const TEAM = [
  { name: 'Edwin John', jobTitle: 'Chief Executive Officer' },
  { name: 'Vinay Vincent', jobTitle: 'Chief Technology Officer' },
  { name: 'Divya T A', jobTitle: 'Chief Business Officer' },
] as const;

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

export const businessInfo = {
  email: 'team@reachmyads.com',
  phones: ['+91-62382-99803', '+91-70121-12355'],
  street: 'House No 10, Karippai Lane, Chelakkottukara',
  city: 'Thrissur',
  region: 'Kerala',
  postalCode: '680005',
  country: 'IN',
} as const;

/**
 * Who we are. Referenced by @id from the other graph nodes so search engines
 * and LLM crawlers resolve everything back to one entity.
 */
export function organizationSchema(): JsonLd {
  return {
    // ProfessionalService is a LocalBusiness type: it makes the Thrissur
    // office eligible for local results as well as brand results.
    '@type': ['Organization', 'ProfessionalService'],
    '@id': ORG_ID,
    name: SITE_NAME,
    alternateName: SITE_ALTERNATE_NAMES,
    legalName: SITE_NAME,
    url: SITE_URL,
    slogan: 'We run your ads. You get customers.',
    foundingLocation: {
      '@type': 'Place',
      name: 'Thrissur, Kerala, India',
    },
    knowsAbout: [
      'Google Ads',
      'Meta Ads',
      'Instagram advertising',
      'Facebook advertising',
      'LinkedIn Ads',
      'Click-to-WhatsApp ads',
      'Lead management',
      'Sales attribution',
      'Local business advertising in India',
    ],
    employee: TEAM.map((person) => ({
      '@type': 'Person',
      name: person.name,
      jobTitle: person.jobTitle,
      worksFor: { '@id': ORG_ID },
    })),
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/assets/logo/reachmyads-logo-on-white.png`,
      width: 2788,
      height: 688,
    },
    image: `${SITE_URL}/assets/icons/reachmyads-icon-512.png`,
    description:
      'Reach My Ads runs advertising for small businesses across Google Ads, Meta Ads and LinkedIn Ads from one campaign form, collects every enquiry in one inbox, and reports what each customer cost.',
    email: businessInfo.email,
    telephone: businessInfo.phones[0],
    address: {
      '@type': 'PostalAddress',
      streetAddress: businessInfo.street,
      addressLocality: businessInfo.city,
      addressRegion: businessInfo.region,
      postalCode: businessInfo.postalCode,
      addressCountry: businessInfo.country,
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: businessInfo.email,
      telephone: businessInfo.phones[0],
      areaServed: 'IN',
      availableLanguage: ['en', 'ml', 'hi'],
    },
  };
}

export function websiteSchema(): JsonLd {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    // Google reads these when choosing the site name shown above the result.
    alternateName: SITE_ALTERNATE_NAMES,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-IN',
  };
}

/**
 * The product itself. There is deliberately no Offer node: ad spend goes
 * straight to the platforms and our own fee is quoted per business, so any
 * price here would be a number we cannot stand behind.
 */
export function softwareSchema(): JsonLd {
  return {
    '@type': 'SoftwareApplication',
    '@id': `${SITE_URL}/#software`,
    name: SITE_NAME,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Advertising and lead management',
    operatingSystem: 'Web browser',
    url: SITE_URL,
    publisher: { '@id': ORG_ID },
    description:
      'Advertising and lead tracking for small businesses. Reach My Ads writes, scores and publishes your campaigns to Google Ads, Meta Ads and LinkedIn Ads from a single form, collects every call, WhatsApp message and form fill in one inbox, and follows each enquiry through to the sale — recording who bought, what they bought, and which ad brought them in.',
    featureList: [
      'One campaign form publishes to Google Ads, Meta Ads and LinkedIn Ads, each configured correctly for that network',
      'Covers Google Search, Maps, YouTube and Shopping; Instagram Reels, Feed and Stories; Facebook Feed and Marketplace; click-to-WhatsApp; and LinkedIn',
      'Creative production line — brief, research, strategy, copy, design, then automated scoring before anything can publish',
      'Creatives scored on goal alignment, relevance, copy quality and platform readiness; only approved creatives can be used',
      'AI optimisation suggestions for budget, bidding, creative and audience, each with the reason and expected impact, applied or dismissed by you',
      'Campaign requests and approvals over WhatsApp, with status updates at draft, approval, payment and publication',
      'All enquiries collected in a single inbox with the ad and campaign that produced them',
      'Lead lifecycle tracked from new, to contacted, to qualified, to converted, with alerts for enquiries that have had no reply',
      'Sales and revenue recorded against each converted lead, including order value and the products bought',
      'Best-selling products and highest-value customers traced back to the ad that found them',
      'Pay as you go, credit, pay first or auto-pay, with available funds checked before any campaign launches',
      'Plain-English AI answers about campaign performance, cost per customer and what sells',
      'Seasonal campaign timing built around the Indian festival calendar',
    ],
  };
}

/** Drives the FAQ rich result in Google, and gives LLMs clean Q&A pairs. */
export function faqSchema(): JsonLd {
  return {
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/** The service we sell, broken out by the trades we support. */
export function serviceSchema(): JsonLd {
  const trades = [
    'Clothing and textile shops',
    'Restaurants and catering',
    'Coaching centres and education',
    'Clinics and healthcare',
    'Real estate',
    'Home services and repairs',
    'Jewellery',
    'Salons, gyms and wellness',
  ];

  return {
    '@type': 'Service',
    '@id': `${SITE_URL}/#service`,
    name: 'Done-for-you advertising and lead tracking',
    serviceType: 'Digital advertising management',
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: 'India' },
    description:
      'We write, launch and manage your ads on Google Ads, Meta Ads and LinkedIn Ads from one brief, then capture every enquiry and follow it through to the sale — recording what each customer bought and which ad found them — so you do not need to hire an agency.',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Industries we support',
      itemListElement: trades.map((trade) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: `Advertising for ${trade.toLowerCase()}` },
      })),
    },
  };
}

/**
 * The four-step flow, as a HowTo. This is the node most likely to be lifted
 * verbatim by an assistant answering "how does Reach My Ads work".
 */
export function howToSchema(): JsonLd {
  const steps = [
    {
      name: 'Tell us what you sell',
      text:
        'Send a link to your website, or just your shop name on Google Maps. We fill in your trade, your service area, your busiest seasons and what counts as a sale from the listing.',
    },
    {
      name: 'We build and run the ads',
      text:
        'We write the ad copy, choose the audience, set a sensible budget and publish to every platform at once. No brief to fill in and no kickoff meeting. Campaigns are usually live within a day.',
    },
    {
      name: 'Enquiries land in one inbox',
      text:
        'Phone calls, WhatsApp messages and web form fills all arrive in a single inbox, each tagged with the ad that produced it. Enquiries nobody has replied to are flagged.',
    },
    {
      name: 'You see what actually worked',
      text:
        'Each enquiry is marked won or lost and the sale recorded against it, so you see which ads brought real customers, what those customers bought and what each one cost. Budget then moves toward whatever is working.',
    },
  ];

  return {
    '@type': 'HowTo',
    '@id': `${SITE_URL}/#howto`,
    name: 'How Reach My Ads advertises your business',
    description:
      'The four steps from handing over a website link to seeing what each customer cost you.',
    totalTime: 'P1D',
    step: steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.name,
      text: step.text,
      url: `${SITE_URL}/#how-it-works`,
    })),
  };
}

/** Platforms we publish to, as an ordered list crawlers can read directly. */
export function platformListSchema(): JsonLd {
  // Networks we actually connect to, each followed by the surfaces it serves.
  // Listing the surfaces as platforms in their own right overstated the
  // integration count, so they are nested in the name instead.
  const platforms = [
    'Google Ads — Search, Maps, YouTube and Shopping',
    'Meta Ads — Instagram, Facebook and click-to-WhatsApp',
    'LinkedIn Ads',
  ];

  return {
    '@type': 'ItemList',
    '@id': `${SITE_URL}/#platforms`,
    name: 'Advertising networks supported by Reach My Ads',
    numberOfItems: platforms.length,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    itemListElement: platforms.map((name, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
    })),
  };
}

/**
 * Page node with speakable sections. Voice assistants read these selectors
 * aloud, so they point at the headline and subheading rather than the nav.
 */
export function webPageSchema(options: {
  path: string;
  name: string;
  description: string;
  primaryTopic?: string;
}): JsonLd {
  const url = `${SITE_URL}${options.path}`;
  return {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: options.name,
    description: options.description,
    isPartOf: { '@id': SITE_ID },
    about: { '@id': ORG_ID },
    inLanguage: 'en-IN',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['#hero-heading', '#how-heading', '#faq-heading'],
    },
    ...(options.primaryTopic ? { mainEntity: { '@id': options.primaryTopic } } : {}),
  };
}

export function breadcrumbSchema(
  crumbs: { name: string; path: string }[],
): JsonLd {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };
}

/**
 * Wraps nodes in a single @graph. One script tag per page beats several
 * disconnected ones — crawlers resolve the @id cross-references in one pass.
 */
export function buildGraph(nodes: JsonLd[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}

/** Identity nodes, rendered once in the root layout so every page carries them. */
export function siteGraph(): JsonLd {
  return buildGraph([organizationSchema(), websiteSchema()]);
}

/** Page-specific nodes for the landing page; identity comes from the layout. */
export function homePageGraph(): JsonLd {
  return buildGraph([
    webPageSchema({
      path: '/',
      name: 'Reach My Ads | Google & Instagram Ads for Small Businesses',
      description:
        'We run your ads on Google, Meta and LinkedIn from one form, collect every enquiry in one inbox, and report what each customer cost.',
      primaryTopic: `${SITE_URL}/#software`,
    }),
    softwareSchema(),
    serviceSchema(),
    howToSchema(),
    platformListSchema(),
    faqSchema(),
  ]);
}

/** Nodes for /about. Breadcrumbs matter more here than on the landing page. */
export function aboutPageGraph(): JsonLd {
  return buildGraph([
    {
      '@type': 'AboutPage',
      '@id': `${SITE_URL}/about#webpage`,
      url: `${SITE_URL}/about`,
      name: 'About Reach My Ads',
      description:
        'Why we built Reach My Ads, who is behind it, and how we think about advertising for small businesses.',
      isPartOf: { '@id': SITE_ID },
      about: { '@id': ORG_ID },
      inLanguage: 'en-IN',
    },
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
    ]),
  ]);
}

/** Nodes for the legal pages: a WebPage tied to the organisation, plus breadcrumbs. */
export function legalPageGraph(options: {
  path: string;
  name: string;
  description: string;
  dateModified: string;
}): JsonLd {
  const url = `${SITE_URL}${options.path}`;
  return buildGraph([
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: options.name,
      description: options.description,
      isPartOf: { '@id': SITE_ID },
      about: { '@id': ORG_ID },
      publisher: { '@id': ORG_ID },
      inLanguage: 'en-IN',
      dateModified: options.dateModified,
    },
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: options.name, path: options.path },
    ]),
  ]);
}
