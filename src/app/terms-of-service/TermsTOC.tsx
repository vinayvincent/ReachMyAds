'use client';

import { useEffect, useState } from 'react';

interface Section {
  id: string;
  number: string;
  title: string;
}

export function TermsTOC({ sections }: { sections: Section[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '');

  useEffect(() => {
    const observers = sections.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry && entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: '-30% 0px -60% 0px' }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [sections]);

  return (
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
            <span
              className={`text-[10px] font-mono shrink-0 ${
                activeId === s.id ? 'text-violet-500' : 'text-slate-400'
              }`}
            >
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
  );
}
