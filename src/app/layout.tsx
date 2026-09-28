import type { Metadata, Viewport } from "next";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { Logo } from "@/components/Logo";
import { PageLoader } from "@/components/PageLoader";
import { CopyrightYear } from "@/components/CopyrightYear";
import { siteGraph, SITE_NAME, SITE_URL } from "@/lib/structured-data";

/** Body and interface text. */
const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-rma-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

/** Headings. A text serif gives the page an editorial, print-like voice. */
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-rma-serif",
  display: "swap",
  weight: ["500", "600", "700"],
});

const TITLE = "Reach My Ads | Google & Instagram Ads for Small Businesses";
const DESCRIPTION =
  "We run your ads on Google, Meta and LinkedIn, collect every call and WhatsApp enquiry in one inbox, and show which ad made each sale. No agency needed.";

export const metadata: Metadata = {
  title: {
    default: TITLE,
    template: "%s | Reach My Ads",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Business Software",
  keywords: [
    "advertising for small business India",
    "run my Google ads",
    "Instagram ads for shops",
    "WhatsApp lead tracking",
    "lead management software India",
    "digital marketing without an agency",
    "cost per customer tracking",
  ],
  metadataBase: new URL(SITE_URL),
  // No site-wide canonical: every page states its own. A canonical here is
  // inherited by any page that forgets one, which tells Google that page is a
  // copy of the home page and drops it from the index.
  openGraph: {
    title: TITLE,
    description:
      "We run your ads, collect every enquiry in one inbox, and follow each one through to the sale, so you never need to hire an agency.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description:
      "We run your ads, collect every enquiry in one inbox, and trace every sale back to the ad that made it.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Search Console and Bing Webmaster ownership checks. Set the tokens in the
  // hosting environment; nothing is rendered while they are unset.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  other: {
    // Picked up by some AI crawlers ahead of the JSON-LD graph.
    "ai-content-declaration": "human-authored",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#070b12" },
  ],
  colorScheme: "light dark",
};

/**
 * Resolves the theme before first paint so the page never flashes the wrong
 * mode. Falls back to the OS preference when nothing has been chosen yet.
 */
const themeScript = `try{var t=localStorage.getItem('rma-theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}`;

const footerLinks = [
  {
    heading: "Product",
    links: [
      { label: "How it works", href: "/#how-it-works" },
      { label: "Platforms", href: "/#platforms" },
      { label: "Lead tracking", href: "/#leads" },
      { label: "Ask questions", href: "/#ai" },
      { label: "Your trade", href: "/#verticals" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Contact", href: "/#contact" },
      { label: "Get started", href: "/#lead-form" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
    ],
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${sourceSans.variable} ${sourceSerif.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-canvas text-ink antialiased">
        {/* Runs before the body paints, so the saved theme never flashes. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* First-visit brand loader. Placed after the theme script so it paints in the right theme. */}
        <PageLoader />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteGraph()) }}
        />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>

        <SiteHeader />

        <main id="main">{children}</main>

        <footer className="relative border-t border-line bg-canvas-soft">
          <div className="relative mx-auto max-w-[1180px] px-6 py-14">
            <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-6">
              <div className="col-span-2 lg:col-span-2">
                <a href="/" aria-label="Reach My Ads home">
                  <Logo className="h-9 w-auto" />
                </a>
                <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-ink-2">
                  We run your ads, catch every call and message in one inbox, and tell you what each
                  customer cost. No agency needed.
                </p>
              </div>

              {footerLinks.map((group) => (
                <div key={group.heading}>
                  <h2 className="mono-label-muted mb-4">{group.heading}</h2>
                  <ul className="space-y-2.5">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-[14px] text-ink-2 transition-colors hover:text-brand-ink"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="col-span-2 md:col-span-1">
                <h2 className="mono-label-muted mb-4">Contact</h2>
                <ul className="space-y-2.5 text-[14px] text-ink-2">
                  <li>
                    <a
                      href="mailto:team@reachmyads.com"
                      className="transition-colors hover:text-brand-ink"
                    >
                      team@reachmyads.com
                    </a>
                  </li>
                  <li>
                    <a href="tel:+916238299803" className="transition-colors hover:text-brand-ink">
                      +91 62382 99803
                    </a>
                  </li>
                  <li>
                    <a href="tel:+917012112355" className="transition-colors hover:text-brand-ink">
                      +91 70121 12355
                    </a>
                  </li>
                  <li className="pt-1 leading-relaxed text-ink-3">
                    House No 10, Karippai Lane,
                    <br />
                    Chelakkottukara,
                    <br />
                    Thrissur 680005, Kerala, India
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-7 sm:flex-row sm:items-center">
              <p className="text-[13px] text-ink-3">
                &copy; <CopyrightYear /> Reach My Ads. All rights reserved.
              </p>
              <p className="text-[13px] text-ink-3">
                Built in Kerala, India.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
