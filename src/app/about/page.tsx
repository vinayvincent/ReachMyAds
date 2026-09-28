import type { Metadata } from 'next';
import { Reveal, Stagger, RevealItem } from '@/components/motion/Reveal';
import { TextReveal } from '@/components/motion/TextReveal';
import { SEOHead } from '@/components/SEOHead';
import { aboutPageGraph, SITE_URL } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Why we built Reach My Ads, how we think about advertising for small businesses in India, and who is behind it. Based in Thrissur, Kerala.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Reach My Ads',
    description:
      'Why we built Reach My Ads, how we think about advertising for small businesses, and who is behind it.',
    url: `${SITE_URL}/about`,
    siteName: 'Reach My Ads',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Reach My Ads',
    description:
      'Why we built Reach My Ads, how we think about advertising for small businesses, and who is behind it.',
  },
};

/**
 * Roles are stated rather than quoted. The page previously carried invented
 * personal quotes attributed to named people, which is not something we should
 * publish on their behalf.
 */
const team = [
  {
    name: 'Edwin John',
    role: 'Chief Executive Officer',
    short: 'CEO',
    focus: 'Where the product goes next, and who it is for.',
  },
  {
    name: 'Vinay Vincent',
    role: 'Chief Technology Officer',
    short: 'CTO',
    focus: 'The platform, the integrations and everything behind the inbox.',
  },
  {
    name: 'Divya T A',
    role: 'Chief Business Officer',
    short: 'CBO',
    focus: 'Growth, partnerships, and the businesses we work with.',
  },
];

const beliefs = [
  {
    n: '01',
    title: 'The click is not the point',
    body: 'Most advertising tools stop at the click. They can tell you a click cost ₹14, but not whether that person walked in, called, or bought anything. Everything past the click is where the actual answer lives, so that is where we built.',
  },
  {
    n: '02',
    title: 'Most enquiries never touch a form',
    body: 'In India, a customer rings you, or messages on WhatsApp. An advertising pixel cannot see either. If a tool only counts form fills, it is missing most of your business, and will confidently tell you the wrong ad is working.',
  },
  {
    n: '03',
    title: 'A slow reply loses more customers than a bad ad',
    body: 'We kept finding businesses whose ads were fine and whose follow-up was not. An enquiry nobody answered for two days is a customer who went somewhere else. So the product nags you, gently, about the ones going quiet.',
  },
  {
    n: '04',
    title: 'You should not need to learn any of this',
    body: 'Bid strategies, lookalike audiences, attribution windows: none of that is your job. Your job is running your shop. You should be able to ask a plain question and get a plain answer.',
  },
];

export default function AboutPage() {
  return (
    <>
      <SEOHead structuredData={aboutPageGraph()} />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-canvas pb-16 pt-16 sm:pb-20 sm:pt-24">

        <div className="relative mx-auto max-w-[1180px] px-6">
          <Reveal className="max-w-3xl">
            <p className="mono-label">Who we are</p>
            <TextReveal
              as="h1"
              text="We built the thing we could not find."
              accentWords={['could', 'not', 'find.']}
              className="h-display mt-4 text-[clamp(2.4rem,5.4vw,3.8rem)] text-ink"
            />
            <p className="mt-6 max-w-[40rem] text-[17.5px] leading-relaxed text-ink-2">
              Reach My Ads started in Thrissur, Kerala, from a fairly ordinary frustration: small
              businesses were being sold advertising they could not check. Money went out, a report
              came back, and nobody could say whether any of it turned into a customer.
            </p>
            <p className="mt-4 max-w-[40rem] text-[16px] leading-relaxed text-ink-2">
              So we built the other half. We run the ads, catch every call and message they bring
              in, and tell you what each customer actually cost. We are live today, and the people
              who built it are the people who answer your email.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── What we believe ── */}
      <section
        className="relative border-y border-line bg-canvas-soft section"
        aria-labelledby="beliefs-heading"
      >
        <div className="relative mx-auto max-w-[1180px] px-6">
          <Reveal className="mb-12 max-w-xl">
            <p className="mono-label">What we think is true</p>
            <TextReveal
              as="h2"
              id="beliefs-heading"
              text="Four things we kept running into"
              accentWords={['Four']}
              className="h-display mt-3 text-[clamp(2rem,4vw,2.85rem)] text-ink"
            />
          </Reveal>

          <Stagger className="grid gap-3.5 md:grid-cols-2" as="ul">
            {beliefs.map((belief) => (
              <RevealItem key={belief.n} as="li">
                <article className="card card-lift h-full p-7">
                  <span className="metric-value text-[11.5px] font-semibold text-brand-ink">
                    {belief.n}
                  </span>
                  <h3 className="h-display mt-3 text-[19px] text-ink">{belief.title}</h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-ink-2">{belief.body}</p>
                </article>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="relative bg-canvas section" aria-labelledby="team-heading">
        <div className="relative mx-auto max-w-[1180px] px-6">
          <Reveal className="mb-12 max-w-xl">
            <p className="mono-label">The team</p>
            <TextReveal
              as="h2"
              id="team-heading"
              text="A small team, in Kerala"
              accentWords={['small']}
              className="h-display mt-3 text-[clamp(2rem,4vw,2.85rem)] text-ink"
            />
            <p className="mt-4 text-[16.5px] leading-relaxed text-ink-2">
              Three of us. There is no account management layer between you and the people building
              this. That is the main reason we can move quickly while we are still small.
            </p>
          </Reveal>

          <Stagger className="grid gap-3.5 md:grid-cols-3" as="ul">
            {team.map((person) => (
              <RevealItem key={person.name} as="li">
                <article className="card card-lift spotlight trace-top h-full p-6">
                  <span className="metric-value flex h-11 w-11 items-center justify-center rounded-xl border border-brand-line bg-brand-soft text-[13px] font-semibold text-brand-ink">
                    {person.short}
                  </span>
                  <h3 className="h-display mt-4 text-[17px] text-ink">{person.name}</h3>
                  <p className="mono-label-muted mt-1.5">{person.role}</p>
                  <p className="mt-3 text-[14px] leading-relaxed text-ink-2">{person.focus}</p>
                </article>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Where we are ── */}
      <section className="band-dark relative overflow-hidden section" aria-labelledby="where-heading">

        <div className="relative mx-auto max-w-[1180px] px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className="mono-label">Where we are</p>
              <TextReveal
                as="h2"
                id="where-heading"
                text="Thrissur, Kerala"
                accentWords={['Kerala']}
                className="h-display mt-3 text-[clamp(2rem,4vw,2.85rem)] text-ink"
              />
              <p className="mt-4 max-w-[34rem] text-[16.5px] leading-relaxed text-ink-2">
                Being here is not incidental. The festival calendar that decides when a jeweller or a
                textile shop makes its year is the one we grew up with, and it is the reason the
                product knows what Akshaya Tritiya and Onam mean for your budget.
              </p>

              <dl className="mt-9 grid grid-cols-2 gap-6 border-t border-line pt-7">
                <div>
                  <dt className="mono-label-muted">Email</dt>
                  <dd className="mt-2">
                    <a
                      href="mailto:team@reachmyads.com"
                      className="text-[15px] font-semibold text-ink transition-colors hover:text-brand-ink"
                    >
                      team@reachmyads.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="mono-label-muted">Phone</dt>
                  <dd className="mt-2">
                    <a
                      href="tel:+916238299803"
                      className="text-[15px] font-semibold text-ink transition-colors hover:text-brand-ink"
                    >
                      +91 62382 99803
                    </a>
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal direction="left" delay={0.1}>
              <div className="card h-full p-7 sm:p-8">
                <p className="mono-label-muted">Registered address</p>
                <address className="mt-4 text-[16px] not-italic leading-relaxed text-ink">
                  House No 10, Karippai Lane,
                  <br />
                  Chelakkottukara,
                  <br />
                  Thrissur 680005,
                  <br />
                  Kerala, India
                </address>

                <a
                  href="/#lead-form"
                  className="btn-primary mt-8 inline-flex w-full items-center justify-center rounded-xl px-6 py-3 text-[15px]"
                >
                  Get started
                </a>
                <p className="mt-3 text-center font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-3">
                  Nothing to sign · No contract
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
