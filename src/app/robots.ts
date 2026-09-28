import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/structured-data';

/**
 * AI assistants are a real discovery channel for us, so their crawlers are
 * allowed explicitly rather than left to the wildcard rule — some of them
 * only read a rule addressed to their own user-agent.
 */
const aiCrawlers = [
  'GPTBot', // OpenAI — training and ChatGPT browsing
  'OAI-SearchBot', // OpenAI — ChatGPT search index
  'ChatGPT-User', // OpenAI — live fetches from a user prompt
  'ClaudeBot', // Anthropic
  'Claude-SearchBot',
  'Claude-User',
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended', // Gemini / AI Overviews
  'Applebot-Extended',
  'Bingbot',
  'DuckDuckBot',
  'CCBot', // Common Crawl, which seeds many models
  'meta-externalagent', // Meta AI
  'Amazonbot', // Alexa and Amazon answers
  'DuckAssistBot',
  'MistralAI-User',
  'YouBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      ...aiCrawlers.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: ['/api/'],
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
