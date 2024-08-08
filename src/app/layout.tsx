import type { Metadata } from "next";
import Providers from './providers'
import "./globals.css";
import { fontVariables } from '@/fonts';
import { Toaster } from "@/app/components/ui/toaster"
import NavigationBar from '@/app/components/NavigationBar';
import Footer from '@/app/components/Footer';
import { SubscriptionProvider } from '@/app/contexts/SubscriptionContext';

export const metadata: Metadata = {
  title: "Growthnotes",
  description: "Insights for the modern marketer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <Providers>
          <SubscriptionProvider>
            <NavigationBar />
            {children}
            <Footer />
          </SubscriptionProvider>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}