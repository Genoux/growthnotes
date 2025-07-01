'use client'
import EventRSVPForm from './form'
import { motion } from 'framer-motion'
import { defaultTransition } from '@/app/utils/motionConfig'
import {
  Calendar,
  MapPin,
  ChefHat,
  Wine,
  Users,
  TrendingUp,
  Star,
} from 'lucide-react'

export default function EventRSVPPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={defaultTransition}
    >
      <main className="mx-auto max-w-3xl  mt-40 mb-32 flex flex-col gap-8">
        <div className="bg-white p-8 rounded-lg outline outline-[1px] outline-primary">
          <section>
            <div>
              <div className="flex flex-col gap-4 text-start mb-12">
                <p className="text-xl lg:text-xl font-medium">
                  Join Toronto&apos;s Most Exclusive Gathering of B2B Marketing
                  Leaders
                </p>
                <h1 className="text-6xl lg:text-7xl font-bold-condensed -tracking-[0.175rem]">
                  INVITE ONLY MARKETING NETWORKING DINNER
                </h1>
                <p className="text-md lg:text-sm leading-snug max-w-xl">
                  You&apos;re invited to an intimate evening of exceptional
                  connections—not just contacts—paired with a chef-curated
                  tasting menu and premium wines.
                </p>
              </div>

              <div className="grid grid-cols-6 gap-4 mb-16">
                <div className="flex flex-col justify-center col-span-3 bg-light-green rounded-lg p-6 outline outline-[1px] outline-primary">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-6 h-6 text-primary" />
                    <div className="flex flex-col gap-1">
                      <p className="text-lg font-bold-condensed">
                        Thursday, September 4th, 2025
                      </p>
                      <p className="text-sm">6:00 PM - 9:00 PM</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center col-span-3 bg-white rounded-lg p-6 outline outline-[1px] outline-primary">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-6 h-6 text-primary" />
                    <div className="flex flex-col gap-1">
                      <p className="text-lg font-bold-condensed">
                        Canoe Restaurant
                      </p>
                      <div className="flex flex-col">
                        <p className="text-sm">
                          66 Wellington St W, 54th Floor
                        </p>
                        <p className="text-sm">Toronto, ON M5K 1H6</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-6 bg-lighter-green rounded-lg p-8 outline outline-[1px] outline-primary">
                  <div className="flex flex-col gap-6">
                    <h2 className="text-2xl font-bold-condensed text-center">
                      YOUR EVENING INCLUDES
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <ChefHat className="w-8 h-8 text-primary" />
                        <p className="text-sm font-medium">
                          Multi-course culinary experience
                        </p>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <Wine className="w-8 h-8 text-primary" />
                        <p className="text-sm font-medium">
                          Hand-selected wine pairings
                        </p>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <Users className="w-8 h-8 text-primary" />
                        <p className="text-sm font-medium">
                          Executive-only guest list (no vendors)
                        </p>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <TrendingUp className="w-8 h-8 text-primary" />
                        <p className="text-sm font-medium">
                          Real talk about B2B marketing wins
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-2 bg-white rounded-lg p-6 outline outline-[1px] outline-primary text-center flex flex-col items-center justify-center gap-3">
                  <div className="text-4xl font-bold-condensed -tracking-[0.1rem]">
                    20
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-base font-bold">GUEST CAP</p>
                    <p className="text-sm">Small enough for real dialogue</p>
                  </div>
                </div>

                <div className="col-span-2 bg-light-green rounded-lg p-6 outline outline-[1px] outline-primary text-center flex flex-col items-center justify-center gap-3">
                  <Star className="w-6 h-6 text-primary" />
                  <div className="flex flex-col gap-1">
                    <p className="text-lg font-bold-condensed">
                      BY INVITATION ONLY
                    </p>
                    <p className="text-sm">Every attendee vetted</p>
                  </div>
                </div>

                <div className="col-span-2 bg-yellow rounded-lg p-6 outline outline-[1px] outline-primary text-center flex flex-col items-center justify-center gap-2">
                  <div className="text-2xl font-bold-condensed">FREE</div>
                  <p className="text-sm">No hidden agenda</p>
                </div>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-16">
            <div className="max-w-3xl  text-start flex flex-col gap-4">
              <h2 className="text-2xl font-bold-condensed">
                WHO WILL BE IN THE ROOM?
              </h2>
              <p className="text-sm max-w-xl">
                We&apos;re bringing together a select group of B2B marketing
                leaders—CMOs, VPs, and Directors—for deep discussions, fresh
                perspectives, and connections that could redefine your path
                forward.
              </p>
            </div>
            <div className="bg-lighter-green rounded-lg p-8 outline outline-[1px] outline-primary text-center max-w-3xl mx-auto flex flex-col gap-4">
              <h2 className="text-2xl font-bold-condensed">
                A NIGHT OF CULINARY EXCELLENCE—COMPLIMENTARY
              </h2>
              <div className="flex flex-col gap-4">
                <p className="text-base">
                  This is networking, redefined. Enjoy a meticulously crafted
                  multi-course dinner paired with curated selections from Carboy
                  Winery, Denver&apos;s premier winemaker.
                </p>
                <p className="font-medium text-lg">
                  Come hungry. Leave enriched.
                </p>
              </div>
            </div>
          </section>
        </div>
        <div className="w-full bg-white rounded-lg p-8 outline outline-[1px] outline-primary flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold-condensed text-start">
              SECURE YOUR SEAT
            </h2>
            <p className="text-sm text-start">
              This invite-only dinner has a seat reserved just for you—but we
              need your confirmation!
            </p>
          </div>
          <EventRSVPForm />
        </div>
      </main>
    </motion.div>
  )
}
