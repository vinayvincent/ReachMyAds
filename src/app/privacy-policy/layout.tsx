import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | ReachMyAds',
  description:
    'Read the ReachMyAds Privacy Policy to understand how we collect, use, and protect your information when using our AI-powered advertising platform.',
  alternates: {
    canonical: 'https://reachmyads.com/privacy-policy',
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
