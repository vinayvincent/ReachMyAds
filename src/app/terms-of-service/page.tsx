'use client';

import { useEffect, useRef, useState } from 'react';

/* ─── Section data ──────────────────────────────────────────── */
const sections = [
  {
    id: 'about',
    number: '01',
    icon: '🏢',
    title: 'About ReachMyAds',
    color: 'from-blue-500/10 to-cyan-500/10',
    border: 'border-blue-500/20',
    iconBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    content: (
      <p>
        ReachMyAds is an AI-powered advertising platform that helps users <strong>create,
        manage, optimize, deploy, and analyze</strong> advertising campaigns across multiple
        digital platforms.
      </p>
    ),
  },
  {
    id: 'eligibility',
    number: '02',
    icon: '✅',
    title: 'Eligibility',
    color: 'from-emerald-500/10 to-teal-500/10',
    border: 'border-emerald-500/20',
    iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    content: (
      <div className="space-y-4">
        <p className="text-[15px] text-slate-600 dark:text-slate-400">To use ReachMyAds, you must:</p>
        <div className="space-y-2">
          {[
            'Be legally allowed to enter into agreements',
            'Provide accurate registration information',
            'Use the platform only for lawful business purposes',
          ].map((item) => (
            <div key={item} className="flex items-center gap-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 px-3.5 py-2.5 text-[13px] text-slate-700 dark:text-slate-300">
              <svg className="h-3.5 w-3.5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/8 px-4 py-3 text-[13px] text-amber-700 dark:text-amber-300">
          ⚠️ You are responsible for all activity under your account.
        </div>
      </div>
    ),
  },
  {
    id: 'user-accounts',
    number: '03',
    icon: '👤',
    title: 'User Accounts',
    color: 'from-violet-500/10 to-purple-500/10',
    border: 'border-violet-500/20',
    iconBg: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
    content: (
      <div className="space-y-4">
        <p className="text-[15px] text-slate-600 dark:text-slate-400">Users are responsible for:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            'Maintaining account security',
            'Protecting login credentials',
            'Keeping account information updated',
            'Managing authorized team members',
          ].map((item) => (
            <div key={item} className="flex items-center gap-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 px-3.5 py-2.5 text-[13px] text-slate-700 dark:text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-500 shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <p className="text-[13px] text-slate-500 dark:text-slate-500 italic">
          ReachMyAds is not responsible for unauthorized access caused by weak passwords or user negligence.
        </p>
      </div>
    ),
  },
  {
    id: 'services',
    number: '04',
    icon: '⚡',
    title: 'Services Provided',
    color: 'from-amber-500/10 to-yellow-500/10',
    border: 'border-amber-500/20',
    iconBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    content: (
      <div className="space-y-4">
        <p className="text-[15px] text-slate-600 dark:text-slate-400">ReachMyAds may provide:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            'Campaign management tools',
            'AI-generated ad suggestions',
            'Analytics and reporting',
            'Multi-platform ad deployment',
            'Bid optimization tools',
            'Wallet & payment management',
            'Team collaboration features',
          ].map((item) => (
            <div key={item} className="flex items-center gap-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 px-3.5 py-2.5 text-[13px] text-slate-700 dark:text-slate-300">
              <span className="text-amber-500 text-xs">✦</span>
              {item}
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-blue-500/20 bg-blue-500/8 px-4 py-3 text-[13px] text-blue-700 dark:text-blue-300">
          ℹ️ Some features may only be available under paid subscription plans.
        </div>
      </div>
    ),
  },
  {
    id: 'acceptable-use',
    number: '05',
    icon: '🚫',
    title: 'Acceptable Use',
    color: 'from-red-500/10 to-rose-500/10',
    border: 'border-red-500/20',
    iconBg: 'bg-red-500/10 text-red-600 dark:text-red-400',
    content: (
      <div className="space-y-4">
        <p className="text-[15px] text-slate-600 dark:text-slate-400">Users must <strong className="text-red-600 dark:text-red-400">not</strong>:</p>
        <div className="space-y-2">
          {[
            'Use the platform for illegal activities',
            'Upload harmful, offensive, misleading, or copyrighted content without permission',
            'Attempt to hack, disrupt, or misuse the platform',
            'Use fake identities or misleading business information',
            'Violate advertising platform policies',
            'Send spam or unauthorized promotions',
          ].map((item) => (
            <div key={item} className="flex items-center gap-2.5 rounded-lg bg-red-50/60 dark:bg-red-950/20 border border-red-500/10 px-3.5 py-2.5 text-[13px] text-slate-700 dark:text-slate-300">
              <svg className="h-3.5 w-3.5 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              {item}
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-red-500/20 bg-red-500/8 px-4 py-3 text-[13px] text-red-700 dark:text-red-300 font-medium">
          🚫 ReachMyAds may suspend or terminate accounts that violate these Terms.
        </div>
      </div>
    ),
  },
  {
    id: 'platform-policies',
    number: '06',
    icon: '🔗',
    title: 'Advertising Platform Policies',
    color: 'from-orange-500/10 to-amber-500/10',
    border: 'border-orange-500/20',
    iconBg: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
    content: (
      <div className="space-y-5">
        <div className="space-y-2">
          <p className="text-[14px] font-semibold text-slate-700 dark:text-slate-300 mb-2">Users are responsible for following policies of:</p>
          <div className="flex flex-wrap gap-2">
            {['Meta Ads', 'Google Ads', 'LinkedIn Ads', 'OTT & Programmatic Partners'].map((p) => (
              <span key={p} className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/20 bg-orange-500/8 px-3.5 py-1.5 text-[13px] font-medium text-orange-700 dark:text-orange-300">
                {p}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-[14px] font-semibold text-slate-700 dark:text-slate-300">ReachMyAds is not responsible for:</p>
          {['Ad rejection', 'Account suspension', 'Platform policy violations', 'Changes in third-party platform rules'].map((item) => (
            <div key={item} className="flex items-center gap-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 px-3.5 py-2.5 text-[13px] text-slate-700 dark:text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500 shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'ai-content',
    number: '07',
    icon: '🤖',
    title: 'AI-Generated Content',
    color: 'from-pink-500/10 to-rose-500/10',
    border: 'border-pink-500/20',
    iconBg: 'bg-pink-500/10 text-pink-600 dark:text-pink-400',
    content: (
      <div className="space-y-4">
        <p className="text-[15px] text-slate-600 dark:text-slate-400">ReachMyAds may provide AI-generated:</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {['Ad copy', 'Headlines', 'CTAs', 'Creative suggestions', 'Audience recommendations'].map((item) => (
            <div key={item} className="flex items-center gap-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 px-3 py-2.5 text-[12px] text-slate-700 dark:text-slate-300">
              <span className="text-pink-500">✦</span>
              {item}
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/8 px-4 py-3 text-[13px] text-amber-700 dark:text-amber-300">
            ⚠️ AI-generated content is provided as a <strong>suggestion only</strong>.
          </div>
          <div className="rounded-xl border border-blue-500/20 bg-blue-500/8 px-4 py-3 text-[13px] text-blue-700 dark:text-blue-300">
            👤 Users are <strong>fully responsible</strong> for reviewing and approving all campaign content before publishing.
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'payments',
    number: '08',
    icon: '💳',
    title: 'Payments & Subscription',
    color: 'from-emerald-500/10 to-green-500/10',
    border: 'border-emerald-500/20',
    iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    content: (
      <div className="space-y-5">
        <div>
          <p className="text-[14px] font-semibold text-slate-700 dark:text-slate-300 mb-2">Paid plans may include:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {['Monthly or annual subscriptions', 'Wallet funding', 'Campaign spending', 'Auto-payment options'].map((item) => (
              <div key={item} className="flex items-center gap-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 px-3.5 py-2.5 text-[13px] text-slate-700 dark:text-slate-300">
                <span className="text-emerald-500">✦</span>
                {item}
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[14px] font-semibold text-slate-700 dark:text-slate-300 mb-2">Users agree to:</p>
          <div className="space-y-2">
            {['Pay applicable fees on time', 'Maintain valid payment methods', 'Review billing information regularly'].map((item) => (
              <div key={item} className="flex items-center gap-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 px-3.5 py-2.5 text-[13px] text-slate-700 dark:text-slate-300">
                <svg className="h-3.5 w-3.5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-slate-300/40 dark:border-slate-700/60 bg-slate-100/60 dark:bg-slate-800/40 px-4 py-3 text-[13px] text-slate-600 dark:text-slate-400 italic">
          Fees are generally non-refundable unless required by law or specifically approved by ReachMyAds.
        </div>
      </div>
    ),
  },
  {
    id: 'intellectual-property',
    number: '09',
    icon: '©️',
    title: 'Intellectual Property',
    color: 'from-indigo-500/10 to-blue-500/10',
    border: 'border-indigo-500/20',
    iconBg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
    content: (
      <div className="space-y-3">
        {[
          { icon: '🏛️', text: 'All platform software, branding, logos, technology, design, and content related to ReachMyAds are owned by ReachMyAds or its licensors.' },
          { icon: '🎨', text: 'Users retain ownership of their uploaded campaign content and creatives.' },
          { icon: '🤝', text: 'Users grant ReachMyAds permission to process and use uploaded content for providing platform services.' },
        ].map(({ icon, text }) => (
          <div key={text} className="flex items-start gap-3 rounded-xl border border-indigo-500/15 bg-indigo-500/5 px-4 py-3">
            <span className="text-xl mt-0.5 shrink-0">{icon}</span>
            <p className="text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'data-privacy',
    number: '10',
    icon: '🔒',
    title: 'Data & Privacy',
    color: 'from-slate-500/10 to-zinc-500/10',
    border: 'border-slate-400/20',
    iconBg: 'bg-slate-500/10 text-slate-600 dark:text-slate-400',
    content: (
      <div className="space-y-4">
        <p className="text-[15px] text-slate-600 dark:text-slate-400 leading-relaxed">
          Use of ReachMyAds is also governed by our{' '}
          <a href="/privacy-policy" className="text-accent-600 dark:text-accent-400 font-medium hover:underline underline-offset-2">
            Privacy Policy
          </a>.
        </p>
        <div className="rounded-xl border border-blue-500/20 bg-blue-500/8 px-4 py-3 text-[13px] text-blue-700 dark:text-blue-300">
          👤 Users are responsible for ensuring they have proper rights and permissions for any data, creatives, or customer information uploaded to the platform.
        </div>
      </div>
    ),
  },
  {
    id: 'service-availability',
    number: '11',
    icon: '🖥️',
    title: 'Service Availability',
    color: 'from-teal-500/10 to-cyan-500/10',
    border: 'border-teal-500/20',
    iconBg: 'bg-teal-500/10 text-teal-600 dark:text-teal-400',
    content: (
      <div className="space-y-4">
        <p className="text-[15px] text-slate-600 dark:text-slate-400 leading-relaxed">
          We aim to keep the platform available and reliable, but we do not guarantee uninterrupted service.
        </p>
        <p className="text-[14px] text-slate-600 dark:text-slate-400">ReachMyAds may:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {['Perform maintenance', 'Update features', 'Modify integrations', 'Temporarily suspend services for technical or security reasons'].map((item) => (
            <div key={item} className="flex items-center gap-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 px-3.5 py-2.5 text-[13px] text-slate-700 dark:text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500 shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'liability',
    number: '12',
    icon: '⚖️',
    title: 'Limitation of Liability',
    color: 'from-red-500/10 to-orange-500/10',
    border: 'border-red-500/20',
    iconBg: 'bg-red-500/10 text-red-600 dark:text-red-400',
    content: (
      <div className="space-y-4">
        <p className="text-[14px] font-semibold text-slate-700 dark:text-slate-300">ReachMyAds is not responsible for:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            'Advertising performance losses',
            'Revenue loss',
            'Business interruption',
            'Campaign rejection by third-party platforms',
            'Data loss caused by external systems',
            'Indirect or consequential damages',
          ].map((item) => (
            <div key={item} className="flex items-center gap-2.5 rounded-lg bg-red-50/60 dark:bg-red-950/20 border border-red-500/10 px-3.5 py-2.5 text-[13px] text-slate-700 dark:text-slate-300">
              <svg className="h-3.5 w-3.5 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              {item}
            </div>
          ))}
        </div>
        <p className="text-[13px] text-slate-500 dark:text-slate-500 italic leading-relaxed">
          Advertising performance depends on multiple factors outside our control, including platform algorithms, audience behavior, competition, budgets, and market conditions.
        </p>
      </div>
    ),
  },
  {
    id: 'termination',
    number: '13',
    icon: '🚪',
    title: 'Account Suspension & Termination',
    color: 'from-slate-500/10 to-gray-500/10',
    border: 'border-slate-400/20',
    iconBg: 'bg-slate-500/10 text-slate-600 dark:text-slate-400',
    content: (
      <div className="space-y-4">
        <p className="text-[14px] text-slate-600 dark:text-slate-400">ReachMyAds may suspend or terminate accounts if users:</p>
        <div className="space-y-2">
          {['Violate these Terms', 'Abuse platform features', 'Engage in fraudulent activity', 'Fail to pay fees', 'Create security risks'].map((item) => (
            <div key={item} className="flex items-center gap-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 px-3.5 py-2.5 text-[13px] text-slate-700 dark:text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/8 px-4 py-3 text-[13px] text-emerald-700 dark:text-emerald-300">
          ✅ Users may stop using the platform at any time.
        </div>
      </div>
    ),
  },
  {
    id: 'third-party',
    number: '14',
    icon: '🌐',
    title: 'Third-Party Services',
    color: 'from-violet-500/10 to-purple-500/10',
    border: 'border-violet-500/20',
    iconBg: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
    content: (
      <div className="space-y-4">
        <p className="text-[15px] text-slate-600 dark:text-slate-400">ReachMyAds integrates with third-party services and advertising platforms.</p>
        <p className="text-[14px] text-slate-600 dark:text-slate-400">We are not responsible for:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {['Third-party outages', 'API failures', 'External policy changes', 'Third-party platform actions'].map((item) => (
            <div key={item} className="flex items-center gap-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 px-3.5 py-2.5 text-[13px] text-slate-700 dark:text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-500 shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <p className="text-[13px] text-slate-500 dark:text-slate-500 italic">
          Use of third-party services may also be subject to their own terms and policies.
        </p>
      </div>
    ),
  },
  {
    id: 'changes',
    number: '15',
    icon: '📝',
    title: 'Changes to Terms',
    color: 'from-cyan-500/10 to-blue-500/10',
    border: 'border-cyan-500/20',
    iconBg: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
    content: (
      <p className="text-[15px] text-slate-600 dark:text-slate-400 leading-relaxed">
        We may update these Terms from time to time. Updated Terms will be posted on our website.{' '}
        <strong className="text-slate-700 dark:text-slate-300">
          Continued use of ReachMyAds after updates means you accept the revised Terms.
        </strong>
      </p>
    ),
  },
  {
    id: 'governing-law',
    number: '16',
    icon: '🏛️',
    title: 'Governing Law',
    color: 'from-indigo-500/10 to-slate-500/10',
    border: 'border-indigo-500/20',
    iconBg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
    content: (
      <p className="text-[15px] text-slate-600 dark:text-slate-400 leading-relaxed">
        These Terms shall be governed by applicable laws and regulations of the relevant jurisdiction where ReachMyAds operates.
      </p>
    ),
  },
  {
    id: 'contact',
    number: '17',
    icon: '✉️',
    title: 'Contact Information',
    color: 'from-accent-500/10 to-blue-500/10',
    border: 'border-accent-500/20',
    iconBg: 'bg-accent-500/10 text-accent-600 dark:text-accent-400',
    content: (
      <div className="space-y-3">
        <p className="text-[15px] text-slate-600 dark:text-slate-400">For questions regarding these Terms, contact:</p>
        <div className="rounded-xl border border-accent-500/20 bg-accent-500/5 px-5 py-4 space-y-1.5">
          <p className="text-[14px] font-bold text-slate-800 dark:text-slate-200">ReachMyAds</p>
          <a
            href="mailto:legal@reachmyads.com"
            className="inline-flex items-center gap-2 text-[14px] text-accent-600 hover:text-accent-700 dark:text-accent-400 font-medium transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            legal@reachmyads.com
          </a>
        </div>
      </div>
    ),
  },
];

/* ─── Active section hook ───────────────────────────────────── */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry && entry.isIntersecting) setActive(id);
        },
        { rootMargin: '-30% 0px -60% 0px' }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [ids]);
  return active;
}

/* ─── Page ──────────────────────────────────────────────────── */
export default function TermsOfServicePage() {
  const ids = sections.map((s) => s.id);
  const activeId = useActiveSection(ids);
  const mainRef = useRef<HTMLDivElement>(null);

  return (
    <main className="min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-br from-slate-50 via-white to-violet-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-violet-950/20 border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 right-[10%] h-[500px] w-[500px] rounded-full bg-violet-500/8 blur-[120px]" />
          <div className="absolute bottom-0 left-[5%] h-[400px] w-[400px] rounded-full bg-blue-500/6 blur-[100px]" />
          <div className="absolute inset-0 bg-grid opacity-40" />
        </div>

        <div className="relative mx-auto max-w-[900px] px-6 text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/8 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-500 animate-pulse" />
            Legal Document
          </div>

          <h1 className="mb-4 text-[clamp(2.8rem,7vw,5rem)] font-black leading-[1.05] tracking-tighter text-slate-900 dark:text-white">
            Terms &{' '}
            <span className="text-gradient-blue">Conditions</span>
          </h1>

          <div className="mb-6 flex items-center justify-center gap-3 text-[14px] text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-700 dark:text-slate-300">ReachMyAds</span>
            <span className="h-1 w-1 rounded-full bg-slate-400" />
            <span>Effective Date: May 27, 2026</span>
          </div>

          <p className="mx-auto max-w-2xl text-[16px] leading-relaxed text-slate-600 dark:text-slate-400">
            These Terms & Conditions govern your use of the ReachMyAds website, platform,
            software, and services.
          </p>

          <p className="mt-4 text-[13px] text-slate-400 dark:text-slate-500">
            By using ReachMyAds, you agree to these Terms.
          </p>

          {/* Stats bar */}
          <div className="mt-10 inline-flex items-center divide-x divide-slate-200 dark:divide-slate-700 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm overflow-hidden shadow-sm">
            {[['17', 'Sections'], ['Fair Use', 'Policy'], ['100%', 'Transparent']].map(([val, label]) => (
              <div key={label} className="px-5 py-3 text-center">
                <div className="text-[18px] font-black text-slate-900 dark:text-white">{val}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────────── */}
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="flex gap-10 items-start">

          {/* ── Sticky sidebar TOC ──────────────────────────── */}
          <aside className="hidden lg:block w-[240px] shrink-0 sticky top-24 self-start">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Contents
            </p>
            <nav aria-label="Table of contents" className="space-y-0.5">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`group flex items-center gap-2.5 rounded-lg px-3 py-2 text-[12.5px] transition-all duration-200 ${
                    activeId === s.id
                      ? 'bg-violet-500/10 text-violet-600 dark:text-violet-400 font-semibold'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <span className={`text-[10px] font-mono shrink-0 ${activeId === s.id ? 'text-violet-500' : 'text-slate-400'}`}>
                    {s.number}
                  </span>
                  <span className="truncate">{s.title}</span>
                  {activeId === s.id && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-violet-500 shrink-0" />
                  )}
                </a>
              ))}
            </nav>
          </aside>

          {/* ── Sections ────────────────────────────────────── */}
          <div ref={mainRef} className="flex-1 min-w-0 space-y-6">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={`heading-${section.id}`}
                className={`scroll-mt-24 rounded-2xl border bg-gradient-to-br ${section.color} ${section.border} p-6 md:p-8 transition-all duration-300`}
              >
                <div className="mb-5 flex items-start gap-4">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl ${section.iconBg}`}>
                    {section.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                      Section {section.number}
                    </span>
                    <h2
                      id={`heading-${section.id}`}
                      className="text-[18px] font-bold text-slate-900 dark:text-white leading-snug"
                    >
                      {section.title}
                    </h2>
                  </div>
                </div>

                <div className="text-[14px] leading-relaxed text-slate-600 dark:text-slate-400">
                  {section.content}
                </div>
              </section>
            ))}

            {/* Back to top */}
            <div className="pt-4 text-center">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-2.5 text-[13px] font-medium text-slate-600 dark:text-slate-400 shadow-sm transition-all hover:border-violet-500/40 hover:text-violet-600 dark:hover:text-violet-400 hover:shadow-md"
              >
                <svg className="h-4 w-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
                Back to top
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
