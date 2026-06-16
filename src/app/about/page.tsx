import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Reach My Ads',
  description:
    'Learn about our mission, vision, and the leadership team driving the future of AI-powered advertising.',
};

const leaders = [
  {
    role: 'Chief Executive Officer',
    short: 'CEO',
    personName: 'Edwin John',
    name: 'Vision & Strategy',
    color: 'accent',
    accentClass: 'text-accent-600 dark:text-accent-400',
    ringClass: 'ring-accent-600/20',
    bgClass: 'bg-accent-600/10',
    borderClass: 'from-accent-500 via-blue-400',
    glowColor: 'rgba(59,130,246,0.15)',
    avatar: '👔',
    quote:
      '"Reach My Ads was born from a simple belief — that every brand, regardless of size, deserves access to world-class advertising intelligence. Our mission is to level the playing field, giving ambitious teams the same AI firepower that global enterprises have always had."',
    tag: 'On Mission & Market Vision',
  },
  {
    role: 'Chief Technology Officer',
    short: 'CTO',
    personName: 'Vinay Vincent',
    name: 'Technology & Architecture',
    color: 'violet',
    accentClass: 'text-violet-500 dark:text-violet-400',
    ringClass: 'ring-violet-500/20',
    bgClass: 'bg-violet-500/10',
    borderClass: 'from-violet-500 via-purple-400',
    glowColor: 'rgba(139,92,246,0.15)',
    avatar: '💻',
    quote:
      '"We built our infrastructure to be truly future-proof. Every component — from our real-time bidding engine to our AI creative optimizer — is designed to scale to billions of impressions without losing a single millisecond of performance. The tech is the product."',
    tag: 'On Platform Architecture',
  },
  {
    role: 'Business Analyst',
    short: 'BA',
    personName: 'Divya T A',
    name: 'Data & Insights',
    color: 'cyan',
    accentClass: 'text-cyan-500 dark:text-cyan-400',
    ringClass: 'ring-cyan-500/20',
    bgClass: 'bg-cyan-500/10',
    borderClass: 'from-cyan-500 via-teal-400',
    glowColor: 'rgba(34,211,238,0.15)',
    avatar: '📊',
    quote:
      '"Every feature we ship starts with a user story and ends with a measurable outcome. We don\'t build for the sake of building — we map every pain point to a clear business need. When our clients say the dashboard finally makes sense, that\'s our KPI met."',
    tag: 'On Data-Driven Product Decisions',
  },
  {
    role: 'General Manager',
    short: 'GM',
    personName: 'Jith Joseph',
    name: 'Operations & Growth',
    color: 'emerald',
    accentClass: 'text-emerald-500 dark:text-emerald-400',
    ringClass: 'ring-emerald-500/20',
    bgClass: 'bg-emerald-500/10',
    borderClass: 'from-emerald-500 via-green-400',
    glowColor: 'rgba(52,211,153,0.15)',
    avatar: '⚙️',
    quote:
      '"Vision means nothing without execution. My focus is making sure every commitment we make to our clients is delivered on time and on budget. We have clear milestones, tight SOPs, and a team that takes operational excellence as seriously as any product feature."',
    tag: 'On Operational Excellence',
  },
];

export default function AboutPage() {
  return (
    <main className="bg-transparent min-h-screen">

      {/* ── Hero ── */}
      <section className="relative py-28 sm:py-36 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
        <div className="bg-spotlight absolute inset-0" aria-hidden="true" />
        <div className="absolute inset-0 bg-grid opacity-30" aria-hidden="true" />
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(ellipse, #3b82f6 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-[1200px] px-6 text-center">
          <p className="mb-4 text-[14px] font-semibold uppercase tracking-[0.2em] text-accent-600 dark:text-accent-400">
            Who We Are
          </p>
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white mb-6">
            Built to <span className="text-gradient-blue">Redefine</span> Advertising
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
            Reach My Ads is an AI-first advertising platform engineering the future of
            cross-channel campaign management — from a single, intelligent dashboard.
          </p>
          <p className="mx-auto max-w-2xl text-[16px] text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            We believe that great advertising should not be reserved for the few. Whether you are a
            bootstrapped startup finding your first customers, or a seasoned agency managing hundreds
            of client accounts, Reach My Ads gives you the same cutting-edge AI tools that power
            the world&apos;s most successful digital campaigns.
          </p>
          <p className="mx-auto max-w-2xl text-[16px] text-slate-600 dark:text-slate-400 leading-relaxed">
            Founded by a team of advertising veterans and AI engineers, we are obsessed with one
            outcome — helping our clients achieve measurable, scalable, and sustainable growth
            across Google, Meta, TikTok, LinkedIn, and every platform that matters.
            Every feature we ship, every algorithm we train, and every decision we make is driven
            by a single question: <span className="font-semibold text-slate-700 dark:text-slate-200 italic">"Does this make our clients more successful?"</span>
          </p>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="relative py-20 sm:py-28">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300/30 dark:via-white/[0.04] to-transparent" />
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center mb-16">
            <p className="mb-4 text-[14px] font-semibold uppercase tracking-[0.2em] text-accent-600 dark:text-accent-400">
              What Guides Us
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Mission &amp; <span className="text-gradient-blue">Vision</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Mission */}
            <div className="glass-panel p-10 relative overflow-hidden group transition-all duration-500 hover:-translate-y-2">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent-500 via-blue-400 to-transparent rounded-t-3xl" />
              <div
                className="absolute -top-16 -left-16 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)' }}
                aria-hidden="true"
              />
              <div className="flex items-center gap-4 mb-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-600/10 ring-1 ring-accent-600/20 shrink-0">
                  <svg className="h-7 w-7 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-accent-600 dark:text-accent-400 mb-1">Our Purpose</p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Mission</h3>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-[16px] leading-[1.8] mb-6">
                To <strong className="text-slate-900 dark:text-white">democratize high-performance advertising</strong> by
                giving every brand — from ambitious startups to global agencies — access to the
                same AI-driven intelligence that Fortune 500 companies use to dominate their markets.
              </p>
              <ul className="space-y-3">
                {['One unified dashboard for every ad network', 'AI that learns and adapts to your brand in real time', 'Transparent, data-driven performance at every step'].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[14px] text-slate-600 dark:text-slate-300">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-600/10 ring-1 ring-accent-600/20">
                      <svg className="h-3 w-3 text-accent-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Vision */}
            <div className="glass-panel p-10 relative overflow-hidden group transition-all duration-500 hover:-translate-y-2">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-violet-500 via-purple-400 to-transparent rounded-t-3xl" />
              <div
                className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)' }}
                aria-hidden="true"
              />
              <div className="flex items-center gap-4 mb-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10 ring-1 ring-violet-500/20 shrink-0">
                  <svg className="h-7 w-7 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-violet-500 dark:text-violet-400 mb-1">Our Future</p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Vision</h3>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-[16px] leading-[1.8] mb-6">
                To become the <strong className="text-slate-900 dark:text-white">world&apos;s most trusted AI advertising ecosystem</strong> — a future
                where intelligent automation removes the complexity of cross-channel marketing,
                letting brands focus entirely on creativity and growth.
              </p>
              <ul className="space-y-3">
                {['A world where advertising is effortless and precise', 'AI co-pilots for every marketer, at any scale', 'The global standard for multi-platform ad intelligence'].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[14px] text-slate-600 dark:text-slate-300">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-500/10 ring-1 ring-violet-500/20">
                      <svg className="h-3 w-3 text-violet-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Leadership Voices ── */}
      <section className="relative py-20 sm:py-28">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300/30 dark:via-white/[0.04] to-transparent" />
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center mb-16">
            <p className="mb-4 text-[14px] font-semibold uppercase tracking-[0.2em] text-accent-600 dark:text-accent-400">
              Straight From The Top
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Voices Behind Our <span className="text-gradient-blue">Vision</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] text-slate-600 dark:text-slate-400 leading-relaxed">
              Hear directly from the leadership team on what drives Reach My Ads forward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {leaders.map((leader) => (
              <div
                key={leader.short}
                className="glass-panel p-8 relative overflow-hidden group transition-all duration-500 hover:-translate-y-2"
              >
                {/* Top color bar */}
                <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${leader.borderClass} to-transparent rounded-t-3xl`} />

                {/* Background glow on hover */}
                <div
                  className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: `radial-gradient(circle, ${leader.glowColor} 0%, transparent 70%)` }}
                  aria-hidden="true"
                />

                {/* Big quote mark */}
                <div className={`absolute top-6 right-8 text-7xl font-serif leading-none ${leader.accentClass} opacity-10 select-none`} aria-hidden="true">
                  &#8220;
                </div>

                {/* Avatar + Role badge */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${leader.bgClass} ring-1 ${leader.ringClass} text-2xl shrink-0`}>
                    {leader.avatar}
                  </div>
                  <div>
                    <p className={`text-[13px] font-bold ${leader.accentClass} mb-0.5`}>{leader.short}</p>
                    <p className="text-[16px] font-bold text-slate-900 dark:text-white leading-tight">{leader.personName}</p>
                    <p className="text-[13px] text-slate-500 dark:text-slate-400 mb-1">{leader.role}</p>
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${leader.bgClass} ${leader.accentClass} ring-1 ${leader.ringClass}`}>
                      {leader.tag}
                    </span>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="relative text-[15px] text-slate-600 dark:text-slate-300 leading-[1.85] italic">
                  {leader.quote}
                </blockquote>

                {/* Bottom divider line */}
                <div className={`mt-6 h-px bg-gradient-to-r ${leader.borderClass} to-transparent opacity-30`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="relative py-20 sm:py-24">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300/30 dark:via-white/[0.04] to-transparent" />
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center mb-16">
            <p className="mb-4 text-[14px] font-semibold uppercase tracking-[0.2em] text-accent-600 dark:text-accent-400">What Drives Us</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Core <span className="text-gradient-blue">Values</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { emoji: '💡', title: 'Innovation First', desc: 'We push the boundaries of what AI can do for advertisers every single day.' },
              { emoji: '✅', title: 'Radical Transparency', desc: 'No hidden fees, no black-box decisions — every insight fully explained.' },
              { emoji: '🤝', title: 'Customer Obsession', desc: 'Your growth is our success metric. We win only when you win.' },
              { emoji: '⚡', title: 'Speed & Precision', desc: "Fast decisions backed by real data — because markets don't wait." },
            ].map((v) => (
              <div key={v.title} className="card-feature rounded-2xl p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-600/10 ring-1 ring-accent-600/20 text-2xl">
                  {v.emoji}
                </div>
                <h3 className="text-[16px] font-bold text-slate-900 dark:text-white mb-2">{v.title}</h3>
                <p className="text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Address ── */}
      <section className="relative py-20 sm:py-24">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300/30 dark:via-white/[0.04] to-transparent" />
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center mb-12">
            <p className="mb-4 text-[14px] font-semibold uppercase tracking-[0.2em] text-accent-600 dark:text-accent-400">
              Find Us
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Our <span className="text-gradient-blue">Location</span>
            </h2>
          </div>

          <div className="flex justify-center">
            <div className="glass-panel p-10 flex flex-col items-center text-center gap-5 relative overflow-hidden group transition-all duration-500 hover:-translate-y-1 w-full max-w-sm">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent-500 via-blue-400 to-transparent rounded-t-3xl" />
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-600/10 ring-1 ring-accent-600/20">
                <svg className="h-7 w-7 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-accent-600 dark:text-accent-400 mb-2">Address</p>
                <p className="text-[16px] font-bold text-slate-900 dark:text-white leading-snug mb-1">
                  House No 10, Karippai Lane
                </p>
                <p className="text-[14px] text-slate-600 dark:text-slate-400">
                  Chelakkottukara, Thrissur 680005<br />India
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


    </main>
  );
}
