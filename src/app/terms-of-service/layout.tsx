import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | ReachMyAds',
  description:
    'Read the ReachMyAds Terms & Conditions governing your use of our AI-powered advertising platform.',
  alternates: {
    canonical: 'https://reachmyads.com/terms-of-service',
  },
};

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
