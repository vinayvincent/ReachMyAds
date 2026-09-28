import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { faqs } from '@/lib/faq-data';

/** Built once at deploy time, like any other static file. */
export const dynamic = 'force-static';

/**
 * The long-form companion to /llms.txt: the same summary followed by every
 * FAQ answer word for word. The FAQ half is built from the same data the page
 * renders, so what an assistant quotes always matches the site.
 */
export async function GET() {
  const summary = await readFile(path.join(process.cwd(), 'public', 'llms.txt'), 'utf8');

  const faqSection = [
    '## Frequently asked questions',
    '',
    ...faqs.flatMap((faq) => [`### ${faq.question}`, '', faq.answer, '']),
  ].join('\n');

  return new Response(`${summary.trimEnd()}\n\n${faqSection}`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
