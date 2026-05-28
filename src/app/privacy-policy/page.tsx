'use client';

import { useEffect, useRef, useState } from 'react';

/* ─── Section data ──────────────────────────────────────────── */
const sections = [
  {
    id: 'who-we-are',
    number: '01',
    icon: '🏢',
    title: 'Who We Are',
    color: 'from-blue-500/10 to-cyan-500/10',
    border: 'border-blue-500/20',
    iconBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    content: (
      <p>
        ReachMyAds is an AI-powered advertising platform that helps users <strong>create,
        manage, optimize, and track</strong> digital advertising campaigns across multiple
        platforms.
      </p>
    ),
  },
  {
    id: 'information-collected',
    number: '02',
    icon: '📋',
    title: 'Information We Collect',
    color: 'from-violet-500/10 to-purple-500/10',
    border: 'border-violet-500/20',
    iconBg: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-[14px] font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">
            Information You Give Us
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {['Name', 'Email address', 'Phone number', 'Company name', 'Login details', 'Campaign details & ad creatives', 'Payment & billing information', 'Messages sent to support'].map((item) => (
              <div key={item} className="flex items-center gap-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 px-3.5 py-2.5 text-[13px] text-slate-700 dark:text-slate-300">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-500 shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-[14px] font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">
            Collected Automatically
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {['IP address', 'Browser & device info', 'Login activity', 'Pages visited', 'Usage data', 'Cookies & session info'].map((item) => (
              <div key={item} className="flex items-center gap-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 px-3.5 py-2.5 text-[13px] text-slate-700 dark:text-slate-300">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'how-we-use',
    number: '03',
    icon: '⚙️',
    title: 'How We Use Your Information',
    color: 'from-emerald-500/10 to-teal-500/10',
    border: 'border-emerald-500/20',
    iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    content: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {['Create & manage your account', 'Run & optimize ad campaigns', 'AI-based suggestions & analytics', 'Process payments', 'Improve platform performance', 'Provide customer support', 'Maintain security & prevent fraud', 'Comply with legal requirements'].map((item) => (
          <div key={item} className="flex items-center gap-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 px-3.5 py-2.5 text-[13px] text-slate-700 dark:text-slate-300">
            <svg className="h-3.5 w-3.5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {item}
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'platform-connections',
    number: '04',
    icon: '🔗',
    title: 'Advertising Platform Connections',
    color: 'from-orange-500/10 to-amber-500/10',
    border: 'border-orange-500/20',
    iconBg: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
    content: (
      <div className="space-y-4">
        <p className="text-[15px] text-slate-600 dark:text-slate-400 leading-relaxed">
          ReachMyAds allows users to connect advertising platforms such as:
        </p>
        <div className="flex flex-wrap gap-2">
          {['Meta Ads', 'Google Ads', 'LinkedIn Ads', 'OTT & Programmatic Platforms'].map((p) => (
            <span key={p} className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/20 bg-orange-500/8 px-3.5 py-1.5 text-[13px] font-medium text-orange-700 dark:text-orange-300">
              {p}
            </span>
          ))}
        </div>
        <p className="text-[14px] text-slate-500 dark:text-slate-400 leading-relaxed">
          We only access the information needed to manage campaigns based on the permissions you provide.
        </p>
      </div>
    ),
  },
  {
    id: 'ai-features',
    number: '05',
    icon: '🤖',
    title: 'AI Features',
    color: 'from-pink-500/10 to-rose-500/10',
    border: 'border-pink-500/20',
    iconBg: 'bg-pink-500/10 text-pink-600 dark:text-pink-400',
    content: (
      <div className="space-y-4">
        <p className="text-[15px] text-slate-600 dark:text-slate-400 leading-relaxed">Our platform may use AI to:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {['Generate ad copy', 'Suggest creatives & layouts', 'Improve targeting', 'Optimize campaign performance', 'Provide analytics & recommendations'].map((item) => (
            <div key={item} className="flex items-center gap-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 px-3.5 py-2.5 text-[13px] text-slate-700 dark:text-slate-300">
              <span className="text-pink-500">✦</span>
              {item}
            </div>
          ))}
        </div>
        <div className="mt-2 rounded-xl border border-amber-500/20 bg-amber-500/8 px-4 py-3 text-[13px] text-amber-700 dark:text-amber-300">
          ⚠️ Users are responsible for reviewing AI-generated content before publishing campaigns.
        </div>
      </div>
    ),
  },
  {
    id: 'sharing',
    number: '06',
    icon: '🔒',
    title: 'Sharing of Information',
    color: 'from-slate-500/10 to-zinc-500/10',
    border: 'border-slate-500/20',
    iconBg: 'bg-slate-500/10 text-slate-600 dark:text-slate-400',
    content: (
      <div className="space-y-4">
        <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/8 px-4 py-3">
          <svg className="h-5 w-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <p className="text-[14px] font-semibold text-emerald-700 dark:text-emerald-300">We do not sell your personal information.</p>
        </div>
        <p className="text-[15px] text-slate-600 dark:text-slate-400">We may share information only with:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {['Trusted service providers', 'Payment processors', 'Connected advertising platforms', 'Legal authorities when required by law'].map((item) => (
            <div key={item} className="flex items-center gap-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 px-3.5 py-2.5 text-[13px] text-slate-700 dark:text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'data-security',
    number: '07',
    icon: '🛡️',
    title: 'Data Security',
    color: 'from-blue-500/10 to-indigo-500/10',
    border: 'border-blue-500/20',
    iconBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    content: (
      <div className="space-y-4">
        <p className="text-[15px] text-slate-600 dark:text-slate-400">We use reasonable security measures to protect your information, including:</p>
        <div className="grid grid-cols-2 gap-3">
          {[['🔐', 'Encryption'], ['🖥️', 'Secure Servers'], ['🔑', 'Access Controls'], ['📡', 'Monitoring Systems']].map(([icon, label]) => (
            <div key={label} className="flex items-center gap-3 rounded-xl border border-blue-500/15 bg-blue-500/5 px-4 py-3">
              <span className="text-xl">{icon}</span>
              <span className="text-[13px] font-medium text-slate-700 dark:text-slate-300">{label}</span>
            </div>
          ))}
        </div>
        <p className="text-[13px] text-slate-500 dark:text-slate-500 italic">While we work to protect your data, no online platform can guarantee 100% security.</p>
      </div>
    ),
  },
  {
    id: 'data-retention',
    number: '08',
    icon: '📅',
    title: 'Data Retention',
    color: 'from-teal-500/10 to-cyan-500/10',
    border: 'border-teal-500/20',
    iconBg: 'bg-teal-500/10 text-teal-600 dark:text-teal-400',
    content: (
      <div className="space-y-4">
        <p className="text-[15px] text-slate-600 dark:text-slate-400">We keep your information:</p>
        <div className="space-y-2">
          {['While your account is active', 'As needed to provide services', 'To meet legal and business requirements'].map((item) => (
            <div key={item} className="flex items-center gap-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 px-3.5 py-2.5 text-[13px] text-slate-700 dark:text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500 shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <p className="text-[14px] text-slate-500 dark:text-slate-400">You may request account deletion, subject to applicable laws.</p>
      </div>
    ),
  },
  {
    id: 'cookies',
    number: '09',
    icon: '🍪',
    title: 'Cookies',
    color: 'from-amber-500/10 to-yellow-500/10',
    border: 'border-amber-500/20',
    iconBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    content: (
      <div className="space-y-4">
        <p className="text-[15px] text-slate-600 dark:text-slate-400">We use cookies to:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {['Keep you logged in', 'Improve user experience', 'Analyze platform usage', 'Improve platform performance'].map((item) => (
            <div key={item} className="flex items-center gap-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 px-3.5 py-2.5 text-[13px] text-slate-700 dark:text-slate-300">
              <span className="text-amber-500 text-xs">●</span>
              {item}
            </div>
          ))}
        </div>
        <p className="text-[14px] text-slate-500 dark:text-slate-400">You can control cookies through your browser settings.</p>
      </div>
    ),
  },
  {
    id: 'your-rights',
    number: '10',
    icon: '⚖️',
    title: 'Your Rights',
    color: 'from-indigo-500/10 to-violet-500/10',
    border: 'border-indigo-500/20',
    iconBg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
    content: (
      <div className="space-y-4">
        <p className="text-[15px] text-slate-600 dark:text-slate-400">Depending on your location and applicable laws, you may have the right to:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {['Access your information', 'Correct your information', 'Request deletion', 'Withdraw consent', 'Request a copy of your data'].map((item) => (
            <div key={item} className="flex items-center gap-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 px-3.5 py-2.5 text-[13px] text-slate-700 dark:text-slate-300">
              <svg className="h-3.5 w-3.5 text-indigo-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'third-party',
    number: '11',
    icon: '🌐',
    title: 'Third-Party Services',
    color: 'from-rose-500/10 to-pink-500/10',
    border: 'border-rose-500/20',
    iconBg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
    content: (
      <div className="space-y-5">
        <p className="text-[15px] text-slate-600 dark:text-slate-400 leading-relaxed">
          Our platform may contain links or integrations with third-party services. We are not responsible for the privacy practices of those third parties.
        </p>
        <div className="overflow-x-auto rounded-xl border border-slate-200/60 dark:border-slate-700/60">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-slate-100/80 dark:bg-slate-800/80 border-b border-slate-200/60 dark:border-slate-700/60">
                <th className="text-left px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Service</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Purpose</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Policy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60 dark:divide-slate-700/60">
              {[
                { service: 'Google Ads', purpose: 'Ad campaign management & analytics', link: 'https://policies.google.com/privacy' },
                { service: 'Meta (Facebook) Ads', purpose: 'Ad campaign management & targeting', link: 'https://www.facebook.com/privacy/policy/' },
                { service: 'LinkedIn Ads', purpose: 'B2B ad campaign management', link: 'https://www.linkedin.com/legal/privacy-policy' },
                { service: 'Resend', purpose: 'Transactional email delivery', link: 'https://resend.com/legal/privacy-policy' },
                { service: 'Vercel', purpose: 'Platform hosting & deployment', link: 'https://vercel.com/legal/privacy-policy' },
              ].map((row) => (
                <tr key={row.service} className="bg-white/50 dark:bg-slate-900/30 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">{row.service}</td>
                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{row.purpose}</td>
                  <td className="px-4 py-3">
                    <a href={row.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-accent-600 hover:text-accent-700 dark:text-accent-400 transition-colors font-medium">
                      View ↗
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    id: 'changes',
    number: '12',
    icon: '📝',
    title: 'Changes to This Policy',
    color: 'from-slate-500/10 to-gray-500/10',
    border: 'border-slate-400/20',
    iconBg: 'bg-slate-500/10 text-slate-600 dark:text-slate-400',
    content: (
      <p className="text-[15px] text-slate-600 dark:text-slate-400 leading-relaxed">
        We may update this Privacy Policy from time to time. Updated versions will be posted on our website.
      </p>
    ),
  },
  {
    id: 'contact',
    number: '13',
    icon: '✉️',
    title: 'Contact Us',
    color: 'from-accent-500/10 to-blue-500/10',
    border: 'border-accent-500/20',
    iconBg: 'bg-accent-500/10 text-accent-600 dark:text-accent-400',
    content: (
      <div className="space-y-3">
        <p className="text-[15px] text-slate-600 dark:text-slate-400">If you have any questions about this Privacy Policy, contact us:</p>
        <div className="rounded-xl border border-accent-500/20 bg-accent-500/5 px-5 py-4 space-y-1">
          <p className="text-[14px] font-bold text-slate-800 dark:text-slate-200">ReachMyAds</p>
          <a href="mailto:privacy@reachmyads.com" className="inline-flex items-center gap-2 text-[14px] text-accent-600 hover:text-accent-700 dark:text-accent-400 font-medium transition-colors">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            privacy@reachmyads.com
          </a>
        </div>
      </div>
    ),
  },
  {
    id: 'disclaimer',
    number: '14',
    icon: '⚠️',
    title: 'Disclaimer',
    color: 'from-amber-500/10 to-orange-500/10',
    border: 'border-amber-500/20',
    iconBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    content: (
      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-5 py-4 text-[14px] text-slate-600 dark:text-slate-400 leading-relaxed">
        ReachMyAds provides advertising and AI-based campaign management tools. We <strong className="text-slate-800 dark:text-slate-200">do not guarantee</strong> specific advertising results, sales, or return on investment. Campaign performance may vary depending on platform algorithms, budgets, audience behavior, and market conditions.
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
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
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
export default function PrivacyPolicyPage() {
  const ids = sections.map((s) => s.id);
  const activeId = useActiveSection(ids);
  const mainRef = useRef<HTMLDivElement>(null);

  return (
    <main className="min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/20 border-b border-slate-200/50 dark:border-slate-800/50">
        {/* Background glows */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 right-[10%] h-[500px] w-[500px] rounded-full bg-blue-500/8 blur-[120px]" />
          <div className="absolute bottom-0 left-[5%] h-[400px] w-[400px] rounded-full bg-violet-500/6 blur-[100px]" />
          <div className="absolute inset-0 bg-grid opacity-40" />
        </div>

        <div className="relative mx-auto max-w-[900px] px-6 text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-500/20 bg-accent-500/8 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-accent-600 dark:text-accent-400">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-500 animate-pulse" />
            Legal Document
          </div>

          <h1 className="mb-4 text-[clamp(2.8rem,7vw,5rem)] font-black leading-[1.05] tracking-tighter text-slate-900 dark:text-white">
            Privacy{' '}
            <span className="text-gradient-blue">Policy</span>
          </h1>

          <div className="mb-6 flex items-center justify-center gap-3 text-[14px] text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-700 dark:text-slate-300">ReachMyAds</span>
            <span className="h-1 w-1 rounded-full bg-slate-400" />
            <span>Effective Date: May 27, 2026</span>
          </div>

          <p className="mx-auto max-w-2xl text-[16px] leading-relaxed text-slate-600 dark:text-slate-400">
            Welcome to ReachMyAds. Your privacy is important to us. This Privacy Policy explains
            what information we collect, how we use it, and how we protect it when you use our
            website and services.
          </p>

          <p className="mt-4 text-[13px] text-slate-400 dark:text-slate-500">
            By using ReachMyAds, you agree to this Privacy Policy.
          </p>

          {/* Stats bar */}
          <div className="mt-10 inline-flex items-center divide-x divide-slate-200 dark:divide-slate-700 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm overflow-hidden shadow-sm">
            {[['14', 'Sections'], ['GDPR', 'Aligned'], ['100%', 'Transparent']].map(([val, label]) => (
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
                      ? 'bg-accent-500/10 text-accent-600 dark:text-accent-400 font-semibold'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <span className={`text-[10px] font-mono shrink-0 ${activeId === s.id ? 'text-accent-500' : 'text-slate-400'}`}>
                    {s.number}
                  </span>
                  <span className="truncate">{s.title}</span>
                  {activeId === s.id && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent-500 shrink-0" />
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
                {/* Section header */}
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
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-2.5 text-[13px] font-medium text-slate-600 dark:text-slate-400 shadow-sm transition-all hover:border-accent-500/40 hover:text-accent-600 dark:hover:text-accent-400 hover:shadow-md"
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
