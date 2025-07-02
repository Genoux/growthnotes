import { notFound } from 'next/navigation'
import EventPageClient from './EventPageClient'

export default function EventRSVPPage() {
  const isRSVPEnabled = process.env.RSVP === 'true'

  if (!isRSVPEnabled) {
    notFound()
  }

  return <EventPageClient />
}
