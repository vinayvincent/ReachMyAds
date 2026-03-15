import type { Metadata } from 'next';
import { SEOHead, buildNextMetadata } from '@/components/SEOHead';
import type { SEOMetadata } from '@/types';

const landingPageSEO: SEOMetadata = {
  title: 'Social Media Advertising Platform to Publish Ads Across Multiple Platforms',
  description: 'Manage and distribute your advertisements across multiple social media platforms from one powerful dashboard. Our social media advertising platform helps businesses publish ads easily on platforms like Facebook, Instagram, LinkedIn, and more without managing each platform separately.',
  keywords: ['social media advertising', 'multi-platform ads', 'ad distribution', 'social media marketing', 'ad management'],
  ogImage: 'https://reachmyads.com/og-image.png',
  canonicalUrl: 'https://reachmyads.com',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Social Media Advertising Platform',
    applicationCategory: 'BusinessApplication',
    description: 'Manage and distribute your advertisements across multiple social media platforms from one powerful dashboard.',
    url: 'https://reachmyads.com',
    operatingSystem: 'Web',
    offers: { '@type': 'AggregateOffer', lowPrice: '49', highPrice: '399', priceCurrency: 'USD' },
  },
};

export const metadata: Metadata = buildNextMetadata(landingPageSEO);

export default function Home() {
  return (
    <>
      <SEOHead structuredData={landingPageSEO.structuredData} />
      <main className="container mx-auto px-4 py-8">
        <article className="prose prose-invert max-w-none">
          <h1>Social Media Advertising Platform to Publish Ads Across Multiple Platforms</h1>
          <p>Manage and distribute your advertisements across multiple social media platforms from one powerful dashboard. Our social media advertising platform helps businesses publish ads easily on platforms like Facebook, Instagram, LinkedIn, and more without managing each platform separately.</p>
          <p>With our multi-platform ad distribution system, businesses can save time, increase reach, and improve marketing performance.</p>
          <p>Start managing all your social media advertisements from one place.</p>
          <h2>What Our Platform Does</h2>
          <p>Our platform acts as a central hub for social media advertising, allowing businesses to publish ads across different social media platforms from a single system.</p>
          <p>Instead of manually posting ads on each social network, businesses can create one advertisement and distribute it instantly across multiple platforms.</p>
          <p>This simplifies social media marketing and helps businesses focus on growth while our platform handles the ad distribution process.</p>
          <h2>Key Features of Our Social Media Ad Distribution Platform</h2>
          <h3>Multi Platform Ad Publishing</h3>
          <p>Publish advertisements on multiple social media platforms simultaneously using one centralized system.</p>
          <h3>Centralized Social Media Ad Management</h3>
          <p>Create, edit, schedule, and manage all your social media advertisements from one dashboard.</p>
          <h3>Automated Ad Distribution</h3>
          <p>Our system automatically distributes your advertisements to selected social media channels, reducing manual effort.</p>
          <h3>Increase Social Media Reach</h3>
          <p>Reach a wider audience by promoting your ads across multiple platforms at the same time.</p>
          <h3>Campaign Performance Tracking</h3>
          <p>Track the performance of your advertisements and analyze engagement across different social media platforms.</p>
          <h2>How Our Platform Works</h2>
          <p>Step 1: Create Your Advertisement</p>
          <p>Upload your ad content including text, images, or videos.</p>
          <p>Step 2: Select Social Media Platforms</p>
          <p>Choose the social media platforms where you want to publish your advertisement.</p>
          <p>Step 3: Publish Your Ads</p>
          <p>Our system distributes your advertisement across selected platforms instantly.</p>
          <p>Step 4: Monitor Performance</p>
          <p>Track engagement, reach, and campaign results from your dashboard.</p>
          <h2>Benefits of Using Our Social Media Advertising Platform</h2>
          <ul>
            <li>Manage all social media ads from one platform</li>
            <li>Save time by posting ads to multiple platforms at once</li>
            <li>Improve social media marketing efficiency</li>
            <li>Reach larger audiences across multiple networks</li>
            <li>Track and optimize ad campaign performance</li>
          </ul>
          <h2>Industries That Can Benefit</h2>
          <p>Our social media advertising platform is ideal for:</p>
          <ul>
            <li>Small Businesses</li>
            <li>Startups</li>
            <li>E-commerce Stores</li>
            <li>Restaurants and Cafes</li>
            <li>Service Businesses</li>
            <li>Local Shops</li>
            <li>Digital Marketing Agencies</li>
          </ul>
        </article>
      </main>
    </>
  );
}
