'use client'
import PodcastList from '@/app/components/PodcastList'
import SubscriptionForm from '@/app/components/SubscriptionForm'
import SubscriptionBanner from '@/app/components/SubscriptionBanner'
import Image from 'next/image'
import BrandScroll from '@/app/components/BrandScroll'
import { Button } from '@/app/components/ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { defaultTransition } from '@/app/utils/motionConfig'
import { useRef } from 'react'
import PodcastCard from '@/app/components/PodcastCard'

export default function Home() {
  const heroRef = useRef(null)

  const mockPost = {
    slug: 'example-post',
    publish_date: '1633046400', // Unix timestamp
    title:
      'Harnessing the Power of Community To Drive Business Results with Jane Stecyk',
    thumbnail_url: '/podcast-example-picture.svg',
    meta_default_description:
      'In this episode, Jane Stecyk, VP of Lifecycle Marketing at Mighty Networks, reveals why...',
  }

  const mockPost2 = {
    slug: 'example-post',
    publish_date: '1633046400', // Unix timestamp
    title:
      'Transform Your Marketing Strategies To Fit New Cultures. Instantly. with Brian Crandall of Hurom America',
    thumbnail_url: '/podcast-example-picture-2.svg',
    meta_default_description:
      'On today’s episode, we welcome Brian Crandall, Director of Marketing of Hurom America...',
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={defaultTransition}
    >
      <main className="mx-auto w-full">
        <section ref={heroRef} className="py-20 border-b">
          <div className="flex flex-col gap-24 container">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <div className="flex flex-col w-full gap-6 py-12 md:py-6 px-4 md:px-0 h-full">
                <h1 className="text-6xl lg:text-7xl text-center md:text-left font-bold-condensed -tracking-[0.175rem] w-full">
                  MARKETING LEADERS' AUDIO INSIGHTS
                </h1>
                <p className="text-md lg:text-xl leading-snug text-center md:text-left sm:w-3/4 md:w-full mx-auto">
                  Decoding D2C success through expert discussions on growth,
                  influencers, and e-commerce{' '}
                </p>
                <div
                  className="flex flex-row items-center justify-start gap-4"
                  style={{ marginTop: '16px' }}
                >
                  <Link
                    href={'https://podcasts.apple.com/ca/podcast/growthnotes'}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Image
                      src={'/badges/apple-music.svg'}
                      width={200}
                      height={60}
                    />
                  </Link>
                  <Link
                    href={
                      'https://open.spotify.com/show/4mQ0C03VxsPQfom5bz1Iyu'
                    }
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Image
                      src={'/badges/spotify.svg'}
                      width={159}
                      height={60}
                    />
                  </Link>
                </div>
              </div>
              <div>
                <Image
                  src="/grid-blob-podcast.svg"
                  alt="GN Blob"
                  width={400}
                  height={420}
                  className="hidden md:flex ml-auto w-3/4 h-auto object-contain"
                />
              </div>
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
          {/*<PodcastList
            limit={3}
            className="flex flex-col justify-start items-center"
          /> */}
          <div className="flex flex-row justify-center items-start gap-6 w-full">
            <PodcastCard post={mockPost} />
            <PodcastCard post={mockPost2} />
          </div>
        </section>

        <section className="border-y">
          <div className="container flex items-center h-full border-x md:border-l-0 py-20 md:py-0">
            <div className="border-x md:px-12 lg:px-20 md:py-20 h-full w-full hidden md:block">
              <Image
                src="/blob-disorder.svg"
                alt="GN Blob"
                width={500}
                height={600}
                className="mx-auto w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col justify-center h-full">
              <div className="flex flex-col gap-6 items-center px-6  md:px-16">
                <h2 className="text-4xl lg:text-6xl font-bold-condensed uppercase">
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
                <p className="text-sm lg:text-md max-w-xl mr-auto text-[#030712] font-medium">
                  {
                    'Tune in to explore innovative solutions in paid social advertising and consumer engagement.'
                  }
                </p>
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
