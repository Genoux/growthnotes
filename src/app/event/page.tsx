import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import EventPageClient from './EventPageClient'

export const metadata: Metadata = {
  title: 'Invite-Only Marketing Dinner | Growthnotes',
  description: 'Private networking event for B2B marketing leaders in Toronto',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'none',
      'max-snippet': -1,
    },
  },
}

export default function EventRSVPPage() {
  const isRSVPEnabled = process.env.RSVP === 'true'

  if (!isRSVPEnabled) {
    notFound()
  }

  return <EventPageClient />
}
