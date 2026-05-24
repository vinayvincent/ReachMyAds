'use client';

import { usePathname } from 'next/navigation';

export default function NavLinks() {
  const pathname = usePathname();
  const isAbout = pathname === '/about';

  if (isAbout) return null;

  return (
    <>
      <div className="hidden md:flex items-center gap-8">
        <a href="/#features" className="text-[14px] font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:text-white transition-colors">Features</a>
        <a href="/#pricing" className="text-[14px] font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:text-white transition-colors">Pricing</a>
      </div>

      <a
        href="/#contact"
        className="hidden sm:inline-flex items-center justify-center rounded-xl bg-accent-600 px-5 py-2 text-[13px] font-bold text-white hover:bg-accent-700 transition-colors shadow-sm"
      >
        Get Started
      </a>
    </>
  );
}
