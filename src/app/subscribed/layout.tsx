import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Newsletter Subscription Confirmed',
  description: 'Thank you for confirming your newsletter subscription',
  robots: 'noindex, nofollow',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}