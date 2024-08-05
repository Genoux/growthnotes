import type { Metadata } from "next";
import Providers from './providers'
import "./globals.css";
import { fontVariables } from '@/fonts';
import { Toaster } from "@/components/ui/toaster"
import NavigationBar from '@/app/components/NavigationBar';

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
        <NavigationBar />
        <Providers>
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}