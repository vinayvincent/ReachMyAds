'use client';

import { usePathname } from 'next/navigation';

export default function NavLinks() {
  const pathname = usePathname();
  const isAbout = pathname === '/about';

  if (isAbout) return null;

  return (
    <>


      <a
        href="/#contact"
        className="hidden sm:inline-flex items-center justify-center rounded-xl bg-accent-600 px-5 py-2 text-[13px] font-bold text-white hover:bg-accent-700 transition-colors shadow-sm"
      >
        Get Started
      </a>
    </>
  );
}
