import type { Metadata } from "next";
import "./globals.css";
import NavLinks from "@/components/NavLinks";

export const metadata: Metadata = {
  title: "Reach My Ads | AI-Powered Multi-Platform Ad Management",
  description:
    "Scale your advertising across Google, Meta, TikTok, and more with the worlds most advanced AI ad management platform.",
  keywords: [
    "ad management",
    "AI advertising",
    "Google Ads",
    "Meta Ads",
    "LinkedIn Ads",
    "TikTok Ads",
  ],
  openGraph: {
    title: "Reach My Ads | AI-Powered Multi-Platform Ad Management",
    description:
      "Scale your advertising across Google, Meta, TikTok, and more with the worlds most advanced AI ad management platform.",
    url: "https://reachmyads.com",
    siteName: "Reach My Ads",
    type: "website",
  },
  metadataBase: new URL("https://reachmyads.com"),
  alternates: {
    canonical: "https://reachmyads.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="noise-overlay bg-animated-mesh text-slate-900 dark:text-white min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50">
          <nav
            className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4"
            aria-label="Main navigation"
          >
            <a href="/" className="flex items-center gap-2 text-[20px] font-bold tracking-tight" aria-label="Reach My Ads Home">
              <span className="text-slate-900 dark:text-white">
                <span className="text-accent-600">R</span>each <span className="text-accent-600">M</span>y <span className="text-accent-600">A</span>ds
              </span>
            </a>

            <NavLinks />
          </nav>
        </header>

        {children}

        {/* Footer */}
        <footer className="relative border-t border-slate-200/50 dark:border-slate-800/50 bg-white/30 dark:bg-slate-950/30 backdrop-blur-sm pt-20 pb-10">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 items-start">
              {/* Company */}
              <div className="lg:col-span-3">
                <h4 className="text-slate-900 dark:text-white font-bold text-[15px] mb-6 tracking-wide uppercase text-xs">Company</h4>
                <ul className="space-y-4">
                  <li><a href="/about" className="text-[14px] text-slate-600 dark:text-slate-300 hover:text-accent-600 dark:hover:text-accent-400 transition-colors font-medium">About Us</a></li>
                  <li><a href="/#contact" className="text-[14px] text-slate-600 dark:text-slate-300 hover:text-accent-600 dark:hover:text-accent-400 transition-colors font-medium">Contact</a></li>
                  <li><a href="/privacy-policy" className="text-[14px] text-slate-600 dark:text-slate-300 hover:text-accent-600 dark:hover:text-accent-400 transition-colors font-medium">Privacy Policy</a></li>
                  <li><a href="/terms-of-service" className="text-[14px] text-slate-600 dark:text-slate-300 hover:text-accent-600 dark:hover:text-accent-400 transition-colors font-medium">Terms of Service</a></li>
                </ul>
              </div>

              {/* Brand (Middle) */}
              <div className="md:col-span-2 lg:col-span-6 flex flex-col items-center text-center bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/40 dark:to-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-8 backdrop-blur-md shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-accent-500 to-transparent opacity-80" />
                <a href="/" className="flex items-center gap-2 text-[24px] font-extrabold tracking-tight mb-4" aria-label="Reach My Ads Home">
                  <span className="text-slate-900 dark:text-white">
                    <span className="text-accent-600">R</span>each <span className="text-accent-600">M</span>y <span className="text-accent-600">A</span>ds
                  </span>
                </a>
                <p className="text-[14px] text-slate-600 dark:text-slate-300 leading-relaxed max-w-md">
                  Next-generation AI ad management for ambitious brands and agencies. Scale horizontally across every network with a single click.
                </p>
              </div>

              {/* Connect */}
              <div className="lg:col-span-3 lg:pl-12">
                <h4 className="text-slate-900 dark:text-white font-bold text-[15px] mb-6 tracking-wide uppercase text-xs">Connect</h4>
                <ul className="space-y-4">
                  <li>
                    <a href="mailto:info@reachmyads.com" className="group flex items-center gap-3 text-[14px] text-slate-600 dark:text-slate-300 hover:text-accent-600 dark:hover:text-accent-400 transition-colors font-medium">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-900 group-hover:bg-accent-50 dark:group-hover:bg-accent-950/50 transition-colors">
                        <svg className="w-4 h-4 text-slate-500 group-hover:text-accent-600 dark:group-hover:text-accent-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                      </span>
                      info@reachmyads.com
                    </a>
                  </li>
                  <li>
                    <a href="tel:+916238299803" className="group flex items-center gap-3 text-[14px] text-slate-600 dark:text-slate-300 hover:text-accent-600 dark:hover:text-accent-400 transition-colors font-medium">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-900 group-hover:bg-accent-50 dark:group-hover:bg-accent-950/50 transition-colors">
                        <svg className="w-4 h-4 text-slate-500 group-hover:text-accent-600 dark:group-hover:text-accent-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                      </span>
                      +91 62382 99803
                    </a>
                  </li>
                  <li>
                    <a href="tel:+917012112355" className="group flex items-center gap-3 text-[14px] text-slate-600 dark:text-slate-300 hover:text-accent-600 dark:hover:text-accent-400 transition-colors font-medium">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-900 group-hover:bg-accent-50 dark:group-hover:bg-accent-950/50 transition-colors">
                        <svg className="w-4 h-4 text-slate-500 group-hover:text-accent-600 dark:group-hover:text-accent-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                      </span>
                      +91 70121 12355
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-200/50 dark:border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-[13px] text-text-muted dark:text-slate-400" suppressHydrationWarning>
                &copy; 2026 Reach My Ads. All rights reserved.
              </p>
              <div className="flex gap-6">
                <span className="text-[12px] text-text-muted dark:text-slate-400">Proudly built for world-class advertisers.</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
