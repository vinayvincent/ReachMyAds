import type {
  SEOMetadata,
  HeroContent,
  Feature,
  Testimonial,
  PricingPlan,
  AnimationConfig,
  ContactFormData,
  QuickInquiryData,
  ContactSubmission,
} from '@/types';

// =============================================================================
// Animation Fixtures
// =============================================================================

export const sampleAnimationConfig: AnimationConfig = {
  type: 'fadeIn',
  duration: 300,
  delay: 0,
  easing: 'ease-in-out',
  triggerOnScroll: true,
  threshold: 0.5,
};

// =============================================================================
// SEO & Landing Page Fixtures
// =============================================================================

export const sampleSEOMetadata: SEOMetadata = {
  title: 'ReachMyAds - AI-Driven Ad Management Platform',
  description: 'Create, manage, and optimize ads across Google, Meta, LinkedIn, and TikTok.',
  keywords: ['ad management', 'AI advertising'],
  ogImage: 'https://reachmyads.com/og-image.png',
  canonicalUrl: 'https://reachmyads.com',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'ReachMyAds',
  },
};

export const sampleHeroContent: HeroContent = {
  headline: 'AI-Powered Ad Management',
  subheadline: 'Manage campaigns across all major platforms from one dashboard.',
  ctaText: 'Get Started',
  ctaLink: '#contact',
  backgroundAnimation: sampleAnimationConfig,
};

export const sampleFeature: Feature = {
  id: 'feat-1',
  icon: 'chart-bar',
  title: 'Smart Budget Allocation',
  description: 'AI optimizes your budget across platforms for maximum ROI.',
  animationDelay: 100,
};

export const sampleTestimonial: Testimonial = {
  id: 'test-1',
  name: 'Jane Smith',
  company: 'Acme Corp',
  content: 'ReachMyAds doubled our ROAS within the first month.',
};

export const samplePricingPlan: PricingPlan = {
  id: 'plan-starter',
  name: 'Starter',
  price: 49,
  currency: 'USD',
  billingPeriod: 'monthly',
  features: ['Up to 5 campaigns', 'Basic AI insights', 'Email support'],
  isPopular: false,
  ctaText: 'Start Free Trial',
  ctaLink: '#contact',
};

// =============================================================================
// Contact & Inquiry Fixtures
// =============================================================================

export const sampleContactFormData: ContactFormData = {
  name: 'John Doe',
  email: 'john@example.com',
  company: 'Test Inc',
  phone: '+1234567890',
  message: 'I am interested in your ad management platform for our agency.',
};

export const sampleQuickInquiryData: QuickInquiryData = {
  email: 'quick@example.com',
  inquiry: 'What pricing plans do you offer?',
};

export const sampleContactSubmission: ContactSubmission = {
  id: 'sub-1',
  name: 'John Doe',
  email: 'john@example.com',
  company: 'Test Inc',
  message: 'I am interested in your ad management platform for our agency.',
  source: 'contact_form',
  ipAddress: '192.168.1.1',
  submittedAt: new Date('2025-01-01T00:00:00Z'),
  status: 'pending',
};
