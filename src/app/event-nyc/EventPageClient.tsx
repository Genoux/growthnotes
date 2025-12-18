'use client'
import EventForm from './form'
import {
  Calendar,
  MapPin,
  ChefHat,
  Wine,
  Users,
  TrendingUp,
  Star,
  MailOpen,
} from 'lucide-react'
import { useRef } from 'react'

export default function EventPageClient() {
  const formContainerRef = useRef<HTMLDivElement>(null)

  const handleSuccess = () => {
    if (formContainerRef.current) {
      const elementTop =
        formContainerRef.current.getBoundingClientRect().top +
        window.pageYOffset
      const offset = 150
      window.scrollTo({
        top: elementTop - offset,
      })
    }
  }

  return (
    <div>
      <main className="px-4 mx-auto max-w-[800px] my-32 flex flex-col gap-8 relative">
        <div className="absolute top-2 right-6 lg:-top-3 lg:right-1 bg-white rounded-full p-2 outline outline-2 border-primary">
          <MailOpen className="w-6 h-6 text-primary" />
        </div>
        <div className="bg-white py-8 md:py-10 px-6 md:px-8 rounded-lg outline outline-2 outline-primary flex flex-col gap-12">
          <section className="flex flex-col gap-10">
            <div className="flex flex-col gap-4 text-start">
              <p className="max-w-sm sm:max-w-none text-sm lg:text-lg font-medium pr-12">
                Join NYC&apos;s Most Exclusive Gathering of Marketing
                Leaders
              </p>
              <h1 className="text-5xl sm:text-6xl font-bold-condensed -tracking-[0.175rem]">
                <span className="text-orange font-bold-condensed">
                  INVITE ONLY
                </span>{' '}
                MARKETING NETWORKING DINNER
              </h1>
              <p className="text-sm sm:text-base leading-snug max-w-lg">
                You&apos;re invited to an intimate evening of exceptional
                connections—not just contacts—paired with a chef-curated tasting
                menu and premium wines.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="flex flex-col justify-center col-span-1 md:col-span-3 bg-light-green rounded-lg p-6 outline outline-[1px] outline-primary">
                <div className="flex items-center md:items-start gap-6 md:gap-3">
                  <Calendar className="w-6 h-6 text-primary" />
                  <div className="flex flex-col gap-1">
                    <p className="text-lg font-bold-condensed">
                      Tuesday, August 19, 2025
                    </p>
                    <p className="text-sm">6:00 PM - 9:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center col-span-1 md:col-span-3 bg-white rounded-lg p-6 outline outline-[1px] outline-primary">
                <div className="flex items-center md:items-start gap-6 md:gap-3">
                  <MapPin className="w-6 h-6 text-primary mt-1" />
                  <div className="flex flex-col gap-1">
                    <p className="text-lg font-bold-condensed">
                      ilili Restaurant
                    </p>
                    <div className="flex flex-col">
                      <p className="text-sm">236 5th Ave</p>
                      <p className="text-sm">New York, NY 10001, United States</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-1 md:col-span-6 bg-lighter-green rounded-lg p-8 outline outline-[1px] outline-primary">
                <div className="flex flex-col gap-6">
                  <h2 className="text-2xl font-bold-condensed text-center">
                    YOUR EVENING INCLUDES
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <ChefHat className="w-6 h-6 text-primary mt-1" />
                      <p className="text-sm">
                        Multi-course culinary experience
                      </p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Wine className="w-6 h-6 text-primary" />
                      <p className="text-sm">Hand-selected wine pairings</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Users className="w-6 h-6 text-primary" />
                      <p className="text-sm">
                        Executive-only guest list (no vendors)
                      </p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <TrendingUp className="w-6 h-6 text-primary" />
                      <p className="text-sm">
                        Real talk about B2B & B2C marketing wins
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 bg-white rounded-lg p-6 outline outline-[1px] outline-primary text-center flex flex-col items-center justify-center gap-2">
                <div className="text-4xl font-bold-condensed -tracking-[0.1rem]">
                  20
                </div>
                <div className="flex flex-col">
                  <p className="text-base font-bold">GUEST CAP</p>
                  <p className="text-sm">Small enough for real dialogue</p>
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 bg-light-green rounded-lg p-6 outline outline-[1px] outline-primary text-center flex flex-col items-center justify-center gap-3">
                <Star className="w-6 h-6 text-primary" />
                <div className="flex flex-col">
                  <p className="text-lg font-bold-condensed">
                    BY INVITATION ONLY
                  </p>
                  <p className="text-sm">Every attendee vetted</p>
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 bg-yellow rounded-lg p-6 outline outline-[1px] outline-primary text-center flex flex-col items-center justify-center gap-1">
                <div className="text-2xl font-bold-condensed">FREE</div>
                <p className="text-sm">No hidden agenda</p>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-12">
            <div className="max-w-3xl  text-start flex flex-col gap-4">
              <h2 className="text-2xl font-bold-condensed">
                WHO WILL BE IN THE ROOM?
              </h2>
              <p className="text-sm max-w-xl">
                A curated group of senior B2B and B2C marketing leaders—CMOs, VPs, and Directors—coming together for insightful conversations, new perspectives, and meaningful connections that could shape what&apos;s next for you.
              </p>
            </div>
            <div className="bg-lighter-green rounded-lg p-8 outline outline-[1px] outline-primary text-center max-w-3xl mx-auto flex flex-col gap-4">
              <h2 className="text-xl sm:text-2xl font-bold-condensed">
                A NIGHT OF CULINARY EXCELLENCE — COMPLIMENTARY
              </h2>
              <div className="flex flex-col gap-4">
                <p className="text-sm sm:text-base">
                  This is networking, elevated. Savor a thoughtfully curated multi-course dinner, perfectly paired with select wines, all courtesy of ilili Restaurant NYC.
                </p>
                <p className="font-medium text-sm sm:text-lg">
                  Come hungry. Leave enriched.
                </p>
              </div>
            </div>
          </section>
        </div>
        <div
          ref={formContainerRef}
          className="w-full bg-white rounded-lg py-8 md:py-10 px-6 md:px-8 outline outline-2 outline-primary"
        >
          <EventForm onSuccess={handleSuccess} />
        </div>
      </main>
    </div>
  )
}