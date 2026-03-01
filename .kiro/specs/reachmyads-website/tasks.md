# Implementation Plan: ReachMyAds Website

## Overview

Build the ReachMyAds AI-driven ad management platform website using React + TypeScript with Next.js for SSR, Tailwind CSS for styling, Framer Motion for animations, and fast-check for property-based testing. Implementation proceeds from foundational project setup through landing page, forms, security, dashboard, AI engine, and platform integrations.

## Tasks

- [x] 1. Project setup and core types
  - [x] 1.1 Initialize Next.js project with TypeScript, Tailwind CSS, and ESLint
    - Create Next.js app with App Router, configure TypeScript strict mode
    - Install dependencies: framer-motion, react-hook-form, zod, fast-check
    - Configure Tailwind CSS with custom theme (colors, fonts, spacing for ReachMyAds brand)
    - _Requirements: 1.1, 1.5, 13.1_

  - [x] 1.2 Define core TypeScript interfaces and data models
    - Create `types/` directory with interfaces: SEOMetadata, HeroContent, Feature, Testimonial, PricingPlan, ContactFormData, QuickInquiryData, ContactSubmission, User, PlatformConnection, Campaign, CampaignRecord, Budget, TargetingConfig, AdCreative, CampaignMetrics, AIRecommendation, PerformancePrediction, AnimationConfig
    - Define AdPlatform union type and CampaignStatus enum
    - Define SubmissionResult, PlatformPushResult, and error types
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 9.1, 11.1_

  - [x] 1.3 Set up testing framework
    - Configure Vitest with fast-check for property-based testing
    - Create test utilities and shared test fixtures
    - _Requirements: All (testing infrastructure)_

- [x] 2. SEO service and SSR rendering
  - [x] 2.1 Implement SEO metadata builder and JSON-LD generator
    - Create `lib/seo.ts` with `buildSEOHead()` function that generates title, meta description, canonical URL, Open Graph tags, Twitter Card tags, keywords, and JSON-LD structured data script block
    - Implement `escapeHtml()` utility for safe meta tag content
    - Create reusable `<SEOHead>` React component using Next.js `<Head>` or metadata API
    - _Requirements: 1.2, 1.4_

  - [ ]* 2.2 Write property test for SEO completeness (Property 6)
    - **Property 6: SEO Completeness**
    - For any valid PageConfig with non-empty title, description, canonical URL, and structured data, the rendered output SHALL contain `<title>`, `<meta name="description">`, `<link rel="canonical">`, Open Graph tags, and JSON-LD script block
    - **Validates: Requirements 1.2, 1.4**

  - [x] 2.3 Configure SSR with security headers
    - Add Content Security Policy headers and HSTS headers to all Next.js responses via middleware
    - Configure HTTPS enforcement and non-TLS rejection
    - Set up CDN cache headers (1 year for hashed static assets)
    - _Requirements: 12.2, 12.4, 13.3_

- [x] 3. Animation engine
  - [x] 3.1 Implement Animation Engine with Framer Motion
    - Create `lib/animation-engine.ts` implementing AnimationEngineAPI: registerElement, unregisterElement, triggerAnimation, pauseAll, resumeAll
    - Use Intersection Observer for scroll-triggered animations with configurable threshold
    - Support animation types: fadeIn, slideUp, slideLeft, scaleIn, parallax, typewriter, morphing
    - Use only CSS transform and opacity for GPU acceleration
    - _Requirements: 6.1, 6.2, 6.4, 6.5_

  - [x] 3.2 Implement prefers-reduced-motion support
    - Detect `prefers-reduced-motion` media query
    - When enabled, set animation duration to 0 and skip all CSS animations/transitions
    - _Requirements: 6.3_

  - [ ]* 3.3 Write property test for animation accessibility (Property 9)
    - **Property 9: Animation Accessibility**
    - For any element with any AnimationConfig, when prefers-reduced-motion is enabled, the Animation_Engine SHALL set duration to 0 and execute no animations
    - **Validates: Requirement 6.3**

- [x] 4. Landing page components
  - [x] 4.1 Build hero section component
    - Create `components/Hero.tsx` with headline, subheadline, CTA button, and animated background using Framer Motion
    - Implement responsive layout with Tailwind CSS
    - _Requirements: 2.1, 2.5_

  - [x] 4.2 Build features section component
    - Create `components/Features.tsx` displaying platform capabilities with icons, titles, descriptions
    - Add scroll-triggered animations with staggered delays using Animation Engine
    - _Requirements: 2.2_

  - [x] 4.3 Build testimonials carousel component
    - Create `components/Testimonials.tsx` with auto-rotating carousel of client feedback
    - _Requirements: 2.3_

  - [x] 4.4 Build pricing section component
    - Create `components/Pricing.tsx` with plan comparison layout
    - Include CTA buttons routing to signup or Contact_Form
    - _Requirements: 2.4, 2.5_

  - [x] 4.5 Assemble landing page with SSR and SEO
    - Create `app/page.tsx` composing Hero, Features, Testimonials, Pricing sections
    - Wire SEOHead component with JSON-LD structured data for SoftwareApplication schema
    - Implement code splitting to lazy-load Dashboard components, keeping landing page bundle under 200KB gzipped
    - Serve images in WebP/AVIF with responsive srcset and lazy loading for below-fold images
    - _Requirements: 1.1, 1.2, 1.3, 1.5, 13.1, 13.2_

  - [ ]* 4.6 Write property test for landing page data rendering (Property 15)
    - **Property 15: Landing Page Data Rendering**
    - For any set of features, testimonials, and pricing plans, the rendered output SHALL contain every feature title/description, every testimonial, and every pricing plan
    - **Validates: Requirements 2.2, 2.3, 2.4**

  - [ ]* 4.7 Write property test for image optimization (Property 19)
    - **Property 19: Image Optimization**
    - For any image element on the Landing_Page, the element SHALL include responsive srcset attributes and lazy loading for below-fold images
    - **Validates: Requirement 13.2**

- [x] 5. Checkpoint - Landing page and SEO
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Input validation and sanitization
  - [x] 6.1 Implement input sanitization library
    - Create `lib/sanitize.ts` with functions to strip HTML tags, prevent `<script>` injection, and block email header injection characters (newlines in header fields)
    - Implement Zod validation schemas for ContactFormData and QuickInquiryData
    - Validate: name (1-100 chars, required), email (valid format, required), message (10-5000 chars, required), phone (optional, valid format)
    - _Requirements: 3.2, 3.3, 12.1_

  - [ ]* 6.2 Write property test for input sanitization (Property 1)
    - **Property 1: Input Sanitization**
    - For any string input, the sanitized output SHALL contain no HTML tags, no `<script>` elements, and no email header injection characters
    - **Validates: Requirements 3.3, 12.1**

  - [ ]* 6.3 Write property test for contact form validation (Property 11)
    - **Property 11: Contact Form Validation**
    - For any input where name is empty, email is invalid, or message is fewer than 10 characters, validation SHALL reject and return field-specific errors
    - **Validates: Requirement 3.2**

- [x] 7. Contact form and email service
  - [x] 7.1 Implement contact form API endpoint
    - Create `app/api/contact/route.ts` implementing `handleContactSubmission()` algorithm
    - Implement CSRF token validation (reject missing/invalid tokens)
    - Implement honeypot field detection (silently reject bot submissions)
    - Sanitize all inputs before storage or email inclusion
    - Persist ContactSubmission record with status 'pending'
    - On email queue failure, return success to user but mark submission as 'failed' internally
    - _Requirements: 3.1, 3.3, 3.4, 3.5, 3.6, 12.3_

  - [x] 7.2 Implement rate limiting middleware
    - Create `lib/rate-limiter.ts` with per-IP rate limiting (max 3 submissions per hour per IP)
    - Implement global rate limit (100 submissions per hour across all IPs)
    - Return "Too many requests. Please try again later." when rate limited
    - _Requirements: 4.1, 4.2, 4.3_

  - [x] 7.3 Implement email service with message queue
    - Create `lib/email-service.ts` that queues emails to Admin@reachmyads.com asynchronously
    - Include submitted data in email body with reply-to set to submitter's email
    - Implement retry logic: retry every 5 minutes for up to 1 hour on failure
    - Mark submission as 'failed' and surface in admin dashboard when all retries exhausted
    - Ensure every submission with status 'sent' has a corresponding queue entry
    - _Requirements: 3.1, 13.4, 14.1, 14.2, 14.3_

  - [x] 7.4 Build Contact Form UI component
    - Create `components/ContactForm.tsx` using react-hook-form + Zod validation
    - Include fields: name, email, company (optional), phone (optional), message
    - Include hidden honeypot field
    - Include CSRF token in submission
    - Display field-specific validation errors inline
    - Show success confirmation message on successful submission
    - _Requirements: 3.1, 3.2, 3.4, 3.6, 12.3_

  - [ ]* 7.5 Write property test for rate limiting (Property 2)
    - **Property 2: Rate Limiting Enforcement**
    - For any IP address and any 1-hour sliding window, accepted submissions SHALL never exceed 3
    - **Validates: Requirements 4.1, 4.2**

  - [ ]* 7.6 Write property test for honeypot bot detection (Property 12)
    - **Property 12: Honeypot Bot Detection**
    - For any submission where the honeypot field is non-empty, the system SHALL silently reject (return success but not queue email)
    - **Validates: Requirement 3.6**

  - [ ]* 7.7 Write property test for CSRF protection (Property 20)
    - **Property 20: CSRF Protection**
    - For any form submission with missing or invalid CSRF token, the backend SHALL reject the submission
    - **Validates: Requirement 12.3**

  - [ ]* 7.8 Write property test for email queuing (Property 17)
    - **Property 17: Form Submission Email Queuing**
    - For any valid submission passing validation and rate limiting, the Email_Service SHALL queue exactly one email to Admin@reachmyads.com
    - **Validates: Requirements 3.1, 5.2**

  - [ ]* 7.9 Write property test for email delivery guarantee (Property 10)
    - **Property 10: Email Delivery Guarantee**
    - For any contact submission with status 'sent', there SHALL exist a corresponding email entry in the message queue with matching reply-to address
    - **Validates: Requirement 14.3**

- [x] 8. Quick inquiry form
  - [x] 8.1 Build Quick Inquiry Form UI component
    - Create `components/QuickInquiryForm.tsx` with email and inquiry message fields
    - Support placement variants: header, sidebar, footer, floating
    - Inline validation using Zod schema
    - Submit to same `/api/contact` endpoint with source='quick_inquiry'
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [x] 9. Checkpoint - Forms and security
  - Ensure all tests pass, ask the user if questions arise.

- [x] 10. Authentication and platform connections
  - [x] 10.1 Implement JWT authentication service
    - Create `lib/auth.ts` with JWT-based authentication using short-lived access tokens and refresh token rotation
    - Create auth middleware for protecting Dashboard API endpoints
    - _Requirements: 7.1_

  - [x] 10.2 Implement OAuth platform connection flow
    - Create `lib/platform-connection.ts` handling OAuth flows for Google Ads, Meta Ads, LinkedIn Marketing, and TikTok Ads
    - Store access tokens and refresh tokens encrypted at rest using AES-256
    - Implement automatic token refresh on expiry during API calls
    - Mark Platform_Connection as inactive and prompt re-auth when refresh fails
    - Prevent token exposure to the frontend
    - _Requirements: 7.2, 7.3, 7.4, 12.5_

  - [ ]* 10.3 Write property test for token encryption (Property 16)
    - **Property 16: Token Encryption at Rest**
    - For any OAuth token stored, the stored value SHALL be encrypted using AES-256 and SHALL not equal the plaintext token
    - **Validates: Requirements 7.2, 12.5**

- [x] 11. Campaign service
  - [x] 11.1 Implement campaign CRUD operations
    - Create `lib/campaign-service.ts` with create, read, update, delete operations
    - Validate campaign name (1-200 chars, unique per user), budget (positive, daily limit ≤ total), at least one platform selected, age range min ≥ 13, at least one creative
    - Enforce budget allocation percentages sum to exactly 100
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

  - [x] 11.2 Implement campaign state machine
    - Enforce valid status transitions only: draft→active, active→paused, paused→active, active→completed
    - Reject invalid transitions with descriptive error messages
    - _Requirements: 11.1, 11.2_

  - [ ]* 11.3 Write property test for budget allocation integrity (Property 3)
    - **Property 3: Budget Allocation Integrity**
    - For any budget allocation, platform percentages SHALL sum to exactly 100
    - **Validates: Requirements 8.4, 9.2**

  - [ ]* 11.4 Write property test for campaign validation (Property 13)
    - **Property 13: Campaign Validation**
    - For any campaign creation request, the service SHALL reject if name is empty/over 200 chars, budget not positive, daily limit exceeds total, no platform selected, or age range min below 13
    - **Validates: Requirements 8.1, 8.2, 8.3, 8.5**

  - [ ]* 11.5 Write property test for campaign state machine (Property 7)
    - **Property 7: Campaign State Machine**
    - For any status and attempted transition, only draft→active, active→paused, paused→active, active→completed SHALL be accepted
    - **Validates: Requirements 11.1, 11.2**

- [x] 12. AI optimization engine
  - [x] 12.1 Implement AI optimization engine interface
    - Create `lib/ai-engine.ts` implementing AIOptimizationAPI: analyzeCampaign, optimizeBudget, suggestAudience, generateCreatives, predictPerformance
    - Implement `runAIOptimization()` algorithm: gather cached platform data, calculate audience fit scores, optimize budget allocation, rank platforms, generate creative suggestions, calculate confidence
    - Ensure budget allocation sums to 100, scores in [0,100], confidence in [0,1]
    - Use only cached platform analytics (no external API calls during analysis)
    - Return partial recommendation with confidence=0 on 30-second timeout
    - Persist recommendations in campaign's aiOptimizationHistory
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

  - [ ]* 12.2 Write property test for AI score bounds (Property 5)
    - **Property 5: AI Score Bounds**
    - For any valid Campaign, the AI_Recommendation SHALL have overall score in [0, 100] and confidence in [0, 1]
    - **Validates: Requirement 9.1**

  - [ ]* 12.3 Write property test for platform scope consistency (Property 4)
    - **Property 4: Platform Scope Consistency**
    - For any Campaign and AI_Recommendation, every platform in the priority list SHALL be a member of the Campaign's platforms list
    - **Validates: Requirement 9.3**

- [x] 13. Checkpoint - Campaign and AI engine
  - Ensure all tests pass, ask the user if questions arise.

- [x] 14. Platform push service
  - [x] 14.1 Implement campaign platform push
    - Create `lib/platform-push.ts` implementing `pushCampaignToPlatforms()` function
    - Validate preconditions: campaign status is draft/paused, active platform connections, at least one creative, positive budget
    - Push to each platform independently; failure on one does not block others
    - Store external platform campaign ID on success, transition campaign to 'active'
    - Ensure idempotent pushes (same campaign + platform = same external ID)
    - Implement exponential backoff retry (max 3 retries) on platform API failure
    - Return per-platform success/failure details
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

  - [ ]* 14.2 Write property test for platform push precondition validation (Property 18)
    - **Property 18: Platform Push Precondition Validation**
    - For any push request, the service SHALL reject if status is not draft/paused, platform lacks active connection, no creatives, or budget not positive
    - **Validates: Requirement 10.1**

  - [ ]* 14.3 Write property test for idempotent platform push (Property 8)
    - **Property 8: Idempotent Platform Push**
    - For any Campaign and Ad_Platform, pushing the same campaign multiple times SHALL produce the same external campaign ID
    - **Validates: Requirement 10.4**

  - [ ]* 14.4 Write property test for platform push independence (Property 14)
    - **Property 14: Platform Push Independence**
    - For any set of platforms, a failure on one SHALL not prevent pushes to remaining platforms, with per-platform success/failure details
    - **Validates: Requirement 10.3**

- [x] 15. Dashboard UI
  - [x] 15.1 Build Dashboard layout and campaign list view
    - Create `app/dashboard/page.tsx` with authenticated layout
    - Display campaign list with status, platforms, budget, AI score, and performance metrics
    - Implement campaign creation form with validation
    - _Requirements: 8.1, 8.2, 8.3_

  - [x] 15.2 Build campaign detail view with AI recommendations
    - Create `app/dashboard/campaigns/[id]/page.tsx` showing campaign details, targeting, creatives, and metrics
    - Display AI recommendations with optimization score, budget suggestions, audience suggestions, and platform priority
    - Include "Push to Platforms" action with platform selection
    - _Requirements: 9.1, 10.1, 10.2_

  - [x] 15.3 Build platform connections management UI
    - Create `app/dashboard/settings/page.tsx` for managing OAuth connections to Google, Meta, LinkedIn, TikTok
    - Show connection status (active/inactive) and last sync time
    - Provide connect/disconnect/re-authenticate actions
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [x] 16. Integration wiring and final assembly
  - [x] 16.1 Wire all API routes and middleware
    - Create API routes for campaigns, AI optimization, platform push, and auth
    - Apply auth middleware to all Dashboard API endpoints
    - Apply rate limiting middleware to contact form endpoints
    - Apply CSRF validation to all form submission endpoints
    - Ensure HTTPS enforcement across all routes
    - _Requirements: 7.1, 4.1, 12.3, 12.4_

  - [x] 16.2 Wire landing page forms and navigation
    - Integrate ContactForm and QuickInquiryForm into landing page layout
    - Wire CTA buttons to appropriate routes (signup, contact, dashboard)
    - Ensure Quick Inquiry Form renders in configured placement positions
    - _Requirements: 2.5, 3.1, 5.1, 5.4_

- [x] 17. Final checkpoint - Full integration
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document using fast-check
- Unit tests validate specific examples and edge cases
- All code is TypeScript with Next.js App Router, Tailwind CSS, and Framer Motion
