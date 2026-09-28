'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { Logo } from './Logo';

const navItems = [
  { label: 'How it works', href: '/#how-it-works', section: 'how-it-works' },
  { label: 'Platforms', href: '/#platforms', section: 'platforms' },
  { label: 'Lead tracking', href: '/#leads', section: 'leads' },
  { label: 'Ask questions', href: '/#ai', section: 'ai' },
  { label: 'Your trade', href: '/#verticals', section: 'verticals' },
  { label: 'About', href: '/about', section: null },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlights the nav item for whichever section is crossing the upper third.
  useEffect(() => {
    if (pathname !== '/') {
      setActiveSection(null);
      return;
    }

    const ids = navItems.map((item) => item.section).filter((id): id is string => Boolean(id));
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setActiveSection(hit.target.id);
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.2, 0.5] },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // A locked body keeps the page behind the open sheet from scrolling away.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-canvas transition-colors duration-200 ${
        scrolled ? 'border-line' : 'border-transparent'
      }`}
    >
      <nav
        className="mx-auto flex max-w-[1180px] items-center justify-between gap-6 px-6 py-3.5"
        aria-label="Main navigation"
      >
        <a href="/" aria-label="Reach My Ads home" className="shrink-0">
          <Logo animated className="h-7 w-auto sm:h-8" />
        </a>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) => {
            const isActive =
              item.section === null ? pathname === '/about' : activeSection === item.section;
            return (
              <li key={item.label} className="relative">
                <a
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative block px-3 py-2 text-[15px] font-medium transition-colors ${
                    isActive ? 'text-ink underline decoration-brand decoration-2 underline-offset-[10px]' : 'text-ink-2 hover:text-ink'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="/#lead-form"
            className="btn-primary hidden h-9 items-center rounded-lg px-4 text-[14.5px] sm:inline-flex"
          >
            Get started
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface text-ink-2 transition-colors hover:border-brand-line hover:text-brand-ink lg:hidden"
          >
            <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              {open ? (
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line bg-canvas lg:hidden"
          >
            <ul className="mx-auto max-w-[1180px] px-6 py-3">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.04 + i * 0.045 }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-lg px-2 py-2.5 text-[15px] font-medium text-ink-2 transition-colors hover:bg-brand-soft hover:text-brand-ink"
                  >
                    {item.label}
                    <svg className="h-3.5 w-3.5 text-ink-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </motion.li>
              ))}
              <li className="pb-1 pt-2">
                <a
                  href="/#lead-form"
                  onClick={() => setOpen(false)}
                  className="btn-primary flex h-11 items-center justify-center rounded-lg text-[14.5px]"
                >
                  Get started
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
