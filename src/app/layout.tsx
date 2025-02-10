import type { Metadata } from 'next'
import Providers from './providers'
import './globals.css'
import { fontVariables } from '@/fonts'
import { Toaster } from '@/app/components/ui/toaster'
import NavigationBar from '@/app/components/NavigationBar'
import Footer from '@/app/components/Footer'
import { SubscriptionProvider } from '@/app/contexts/SubscriptionContext'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  title: 'Growthnotes | Insights for the modern marketer',
  description: 'Insights for the modern marketer',
  openGraph: {
    title: 'Growthnotes',
    description: 'Insights for the modern marketer',
    url: 'https://www.growthnotes.com',
    siteName: 'Growthnotes',
    images: [
      {
        url: '/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Growthnotes - Insights for the modern marketer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <Providers>
          <SubscriptionProvider>
            <NavigationBar />
            {children}
            <SpeedInsights />
            <Footer />
          </SubscriptionProvider>
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}
