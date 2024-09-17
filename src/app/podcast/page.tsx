'use client'
import PodcastList from '@/app/components/Podcasts/PodcastList'
import SubscriptionBanner from '@/app/components/SubscriptionBanner'
import { motion } from 'framer-motion'
import { defaultTransition } from '@/app/utils/motionConfig'
import Image from 'next/image'
import Link from 'next/link'
import BrandScroll from '@/app/components/BrandScroll'

const podcastLinks = [
  {
    href: 'https://podcasts.apple.com/ca/podcast/growthnotes/id1763208900',
    src: '/badges/apple-music.svg',
    alt: 'Apple Music',
  },
  {
    href: 'https://open.spotify.com/show/4mQ0C03VxsPQfom5bz1Iyu',
    src: '/badges/spotify.svg',
    alt: 'Spotify',
  },
]

export default function PodcastsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={defaultTransition}
    >
      <main className="mx-auto w-full">
        <section className="pt-40 pb-32 border-b">
          <div className="flex flex-col gap-24 container">
            <div className="flex lg:grid lg:grid-cols-2 gap-20 justify-between lg:gap-0 items-center">
              <div className="flex flex-col w-full gap-4">
                <h1 className="text-6xl lg:text-7xl text-center md:text-left font-bold-condensed -tracking-[0.175rem] w-full">
                  {"MARKETING LEADERS' AUDIO INSIGHTS"}
                </h1>
                <p className="text-md lg:text-xl leading-snug text-center md:text-left sm:w-3/4 md:w-full mx-auto">
                  Decoding D2C success through expert discussions on growth,
                  influencers, and e-commerce
                </p>
                <div className="flex flex-row items-center justify-center md:justify-start gap-4 mt-4 w-full">
                  {podcastLinks.map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Image
                        src={link.src}
                        width={150}
                        height={150}
                        alt={link.alt}
                        className="w-full h-14 object-contain"
                      />
                    </Link>
                  ))}
                </div>
              </div>
              <Image
                src="/grid-blob-podcast.svg"
                alt="GN Blob"
                width={400}
                height={420}
                className="hidden md:flex ml-auto w-3/5 h-auto object-contain"
              />
            </div>
            <BrandScroll />
          </div>
        </section>

        <section className="container flex flex-col gap-8 pt-24 pb-32">
          <div className="w-full flex items-center justify-between">
            <h2 className="text-3xl font-bold-condensed uppercase tracking-tighter">
              EPISODES
            </h2>
          </div>
          <PodcastList />
        </section>

        <section className="border-y">
          <div className="container flex items-center h-full">
            <div className="grid md:grid-cols-5 lg:flex justify-center items-center w-full h-full border-x">
              <div className="w-full h-full hidden md:block col-span-2">
                <Image
                  src="/blob-disorder.svg"
                  alt="GN Blob"
                  width={400}
                  height={400}
                  className="mx-auto px-6 w-full lg:w-3/4 h-full object-contain"
                />
              </div>
              <div className="flex flex-col justify-center h-full border-l-0 md:border-l py-12 lg:py-24 col-span-3">
                <div className="flex flex-col gap-6 items-center px-6 lg:px-16">
                  <h2 className="text-4xl xl:text-5xl font-bold-condensed uppercase">
                    {
                      'The premier podcast for marketing leaders driven to excel in the digital economy.'
                    }
                  </h2>
                  <p className="text-sm lg:text-md max-w-xl mr-auto">
                    {
                      'Hosted by inBeat Agency, this series dives deep into D2C marketing, paid growth strategies and influencer marketing, uncovering the secrets behind successful digital advertising and e-commerce branding.'
                    }
                  </p>
                  <p className="text-sm lg:text-md max-w-xl mr-auto">
                    {
                      "Each episode features industry experts discussing actionable insights on enhancing brand visibility and accelerating revenue growth. Whether you're a CMO, VP of Marketing or e-commerce expert, we offer powerful strategies to transform your online presence."
                    }
                  </p>
                  <p className="text-sm lg:text-md max-w-xl mr-auto text-black font-medium">
                    {
                      'Tune in to explore innovative solutions in paid social advertising and consumer engagement.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container my-20">
          <SubscriptionBanner />
        </section>
      </main>
    </motion.div>
  )
}
