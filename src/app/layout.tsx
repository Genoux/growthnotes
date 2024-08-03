import type { Metadata } from "next";
import Providers from './providers'
import "./globals.css";
import { fontVariables } from '@/fonts';

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}