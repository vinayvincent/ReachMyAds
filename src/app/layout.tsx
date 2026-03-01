import type { Metadata } from "next";
import { MobileNav } from "@/components/MobileNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "ReachMyAds - AI-Driven Ad Management Platform",
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
    title: "ReachMyAds - AI-Driven Ad Management Platform",
    description:
      "Create, manage, and optimize ads across Google, Meta, LinkedIn, and TikTok with AI-powered insights.",
    url: "https://reachmyads.com",
    siteName: "ReachMyAds",
    type: "website",
  },
  metadataBase: new URL("https://reachmyads.com"),
  alternates: {
    canonical: "https://reachmyads.com",
  },
};

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];

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
            <a href="#" className="flex items-center gap-0.5 text-[20px] font-bold tracking-[-0.02em]">
              <span className="text-gradient-blue">Reach</span>
              <span className="text-white">My Ads</span>
            </a>

            <ul className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[13px] font-medium text-[#666] transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  className="btn-primary btn-beam rounded-lg px-4 py-2 text-[13px]"
                >
                  Get Started
                </a>
              </li>
            </ul>

            <MobileNav />
          </nav>
        </header>

        {children}

        {/* Footer */}
        <footer className="relative border-t border-white/[0.04] bg-black">
          <div className="mx-auto max-w-[1200px] px-6 py-16">
            <div className="flex flex-col items-start justify-between gap-10 sm:flex-row sm:items-center">
              <div>
                <span className="text-lg font-bold tracking-[-0.02em]">
                  <span className="text-gradient-blue">Reach</span>
                  <span className="text-white">My Ads</span>
                </span>
                <p className="mt-3 max-w-xs text-[13px] text-[#444] leading-relaxed">
                  AI-driven ad management across every platform. Smarter campaigns, better results.
                </p>
              </div>

              <ul className="flex flex-wrap gap-8">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-[13px] text-[#444] transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
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
