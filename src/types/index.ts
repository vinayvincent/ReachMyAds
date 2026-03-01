// =============================================================================
// SEO & Landing Page Types
// =============================================================================

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  canonicalUrl: string;
  structuredData: JsonLd;
}

export interface PageConfig {
  seoMeta: SEOMetadata;
}

export type JsonLd = Record<string, unknown>;

export interface HeroContent {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
  backgroundAnimation: AnimationConfig;
}

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  animationDelay: number;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  content: string;
  avatar?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  billingPeriod: 'monthly' | 'yearly';
  features: string[];
  isPopular?: boolean;
  ctaText: string;
  ctaLink: string;
}

// =============================================================================
// Animation Types
// =============================================================================

export interface AnimationConfig {
  type: 'fadeIn' | 'slideUp' | 'slideLeft' | 'scaleIn' | 'parallax' | 'typewriter' | 'morphing';
  duration: number;
  delay: number;
  easing: string;
  triggerOnScroll: boolean;
  threshold: number;
}

export interface AnimationEngineAPI {
  registerElement(el: HTMLElement, config: AnimationConfig): void;
  unregisterElement(el: HTMLElement): void;
  triggerAnimation(el: HTMLElement): void;
  pauseAll(): void;
  resumeAll(): void;
}

// =============================================================================
// Contact & Inquiry Types
// =============================================================================

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  honeypot?: string;
}

export interface QuickInquiryData {
  email: string;
  inquiry: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  source: 'contact_form' | 'quick_inquiry';
  ipAddress: string;
  submittedAt: Date;
  emailSentAt?: Date;
  status: 'pending' | 'sent' | 'failed';
}

// =============================================================================
// Result & Error Types
// =============================================================================

export interface SubmissionResult {
  success: boolean;
  message?: string;
  error?: string | Record<string, string>;
}
