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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <div className="col-span-1 md:col-span-1">
                <a href="/" className="flex items-center gap-2 text-[22px] font-bold tracking-tight mb-6" aria-label="Reach My Ads Home">
                  <span className="text-slate-900 dark:text-white">
                    <span className="text-accent-600">R</span>each <span className="text-accent-600">M</span>y <span className="text-accent-600">A</span>ds
                  </span>
                </a>
                <p className="text-[14px] text-text-secondary dark:text-slate-300 leading-relaxed">
                  Next-generation AI ad management for ambitious brands and agencies. Scale horizontally across every network with a single click.
                </p>
              </div>

              <div>
                <h4 className="text-slate-900 dark:text-white font-bold text-[15px] mb-6">Product</h4>
                <ul className="space-y-4">
                  <li><a href="/#features" className="text-[14px] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:text-white transition-colors">AI Creative Hub</a></li>
                  <li><a href="/#features" className="text-[14px] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:text-white transition-colors">Multi-Platform Sync</a></li>
                  <li><a href="/#pricing" className="text-[14px] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:text-white transition-colors">Pricing Plans</a></li>
                  <li><a href="/#features" className="text-[14px] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:text-white transition-colors">Real-time Analytics</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-slate-900 dark:text-white font-bold text-[15px] mb-6">Company</h4>
                <ul className="space-y-4">
                  <li><a href="/about" className="text-[14px] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:text-white transition-colors">About Us</a></li>
                  <li><a href="/#contact" className="text-[14px] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:text-white transition-colors">Contact</a></li>
                  <li><a href="#" className="text-[14px] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-[14px] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:text-white transition-colors">Terms of Service</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-slate-900 dark:text-white font-bold text-[15px] mb-6">Connect</h4>
                <ul className="space-y-4">
                  <li><a href="mailto:admin@reachmyads.com" className="text-[14px] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:text-white transition-colors">admin@reachmyads.com</a></li>
                  <li><a href="tel:+916238299803" className="text-[14px] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:text-white transition-colors">+91 62382 99803</a></li>
                  <li><a href="tel:+917012112355" className="text-[14px] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:text-white transition-colors">+91 70121 12355</a></li>
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
