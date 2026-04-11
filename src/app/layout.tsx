import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reach My Ads",
  description:
    "Create, manage, and optimize ads across Google, Meta, LinkedIn, and TikTok with AI-powered insights.",
  keywords: [
    "ad management",
    "AI advertising",
    "Google Ads",
    "Meta Ads",
    "LinkedIn Ads",
    "TikTok Ads",
  ],
  openGraph: {
    title: "Reach My Ads",
    description:
      "Create, manage, and optimize ads across Google, Meta, LinkedIn, and TikTok with AI-powered insights.",
    url: "https://reachmyads.com",
    siteName: "Reach My Ads",
    type: "website",
  },
  metadataBase: new URL("https://reachmyads.com"),
  alternates: {
    canonical: "https://reachmyads.com",
  },
};

const navLinks: { href: string; label: string }[] = [];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="noise-overlay">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-black/70 backdrop-blur-2xl backdrop-saturate-150">
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          <nav
            className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4"
            aria-label="Main navigation"
          >
            <a href="#" className="flex items-center gap-3 text-[20px] font-bold tracking-[-0.02em]" aria-label="Reach My Ads Home">
              <span className="flex items-center">
                <span className="text-gradient-blue">R</span><span className="text-white">each</span>
              </span>
              <span className="flex items-center">
                <span className="text-gradient-blue">M</span><span className="text-white">y</span>
              </span>
              <span className="flex items-center">
                <span className="text-gradient-blue">A</span><span className="text-white">ds</span>
              </span>
            </a>

            <ul className="hidden items-center gap-8 md:flex">
              {/* Navigation links removed as requested */}
            </ul>

            {/* Mobile navigation removed as there are no links left */}
          </nav>
        </header>

        {children}

        {/* Footer */}
        <footer className="relative border-t border-white/[0.04] bg-black">
          <div className="mx-auto max-w-[1200px] px-6 py-16">
            <div className="flex flex-col items-start justify-between gap-10 sm:flex-row sm:items-center">
              <div>
                <span className="flex items-center gap-3 text-lg font-bold tracking-[-0.02em]" aria-label="Reach My Ads Home">
                  <span className="flex items-center">
                    <span className="text-gradient-blue">R</span><span className="text-white">each</span>
                  </span>
                  <span className="flex items-center">
                    <span className="text-gradient-blue">M</span><span className="text-white">y</span>
                  </span>
                  <span className="flex items-center">
                    <span className="text-gradient-blue">A</span><span className="text-white">ds</span>
                  </span>
                </span>
                <p className="mt-3 max-w-xs text-[13px] text-[#444] leading-relaxed">
                  AI-driven ad management across every platform. Smarter campaigns, better results.
                </p>
              </div>

              <ul className="flex flex-wrap gap-8">
                {/* Footer links removed */}
              </ul>
            </div>

            <div className="mt-12 border-t border-white/[0.04] pt-8 text-[12px] text-[#333]">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <p>
                  <a
                    href="mailto:Admin@reachmyads.com"
                    className="text-[#555] transition-colors hover:text-white"
                  >
                    Admin@reachmyads.com
                  </a>
                </p>
                <p>&copy; {new Date().getFullYear()} ReachMyAds. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
