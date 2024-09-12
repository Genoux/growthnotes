'use client'
import SubscriptionBanner from '@/app/components/SubscriptionBanner'
import Image from 'next/image'
import BrandScroll from '@/app/components/BrandScroll'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { defaultTransition } from '@/app/utils/motionConfig'
import PodcastCard from '@/app/components/PodcastCard'
import { fetchPodcast } from '@/app/lib/posts/actions'
import { useEffect, useState } from 'react'
import { Podcast } from '@/app/lib/posts/types'

export default function Home() {
  const [podcastPosts, setPodcastPosts] = useState<Podcast[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchPodcast()
        setPodcastPosts(data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching podcast posts:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={defaultTransition}
    >
      <main className="mx-auto w-full">
        <section className="py-20 border-b">
          <div className="flex flex-col gap-24 container">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <div className="flex flex-col w-full gap-6 py-12 md:py-6 px-4 md:px-0 h-full justify-center items-start">
                <h1 className="text-6xl lg:text-7xl text-center md:text-left font-bold-condensed -tracking-[0.175rem] w-full">
                  {"MARKETING LEADERS' AUDIO INSIGHTS"}
                </h1>
                <p className="text-md lg:text-xl leading-snug text-center md:text-left sm:w-3/4 md:w-full mx-auto">
                  Decoding D2C success through expert discussions on growth,
                  influencers, and e-commerce
                </p>
                <div className="flex flex-row items-center justify-center md:justify-start gap-4 mt-4 w-full">
                  <Link
                    href={'https://podcasts.apple.com/ca/podcast/growthnotes'}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="hover:scale-105 transition-transform duration-300"
                  >
                    <Image
                      src={'/badges/apple-music.svg'}
                      width={200}
                      height={60}
                      alt="Apple Music"
                    />
                  </Link>
                  <Link
                    href={
                      'https://open.spotify.com/show/4mQ0C03VxsPQfom5bz1Iyu'
                    }
                    rel="noopener noreferrer"
                    target="_blank"
                    className="hover:scale-105 transition-transform duration-300"
                  >
                    <Image
                      src={'/badges/spotify.svg'}
                      width={159}
                      height={60}
                      alt="Spotify"
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

          <div className="flex flex-col lg:flex-row justify-center items-start gap-6 w-full">
            {podcastPosts.map((podcast, index) => (
              <div key={index} className="w-full">
                <Link
                  href={'https://open.spotify.com/show/4mQ0C03VxsPQfom5bz1Iyu'}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <PodcastCard
                    podcast={podcast}
                    isLoading={isLoading}
                    newPodcast={index === 0}
                  />
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y">
          <div className="container flex items-center h-full">
            <div className="flex flex-row justify-center items-center w-full h-full border-x ">
              <div className=" md:px-12 lg:px-20 py-40 h-full w-full hidden md:block border-r-0 xl:border-r">
                <Image
                  src="/blob-disorder.svg"
                  alt="GN Blob"
                  width={500}
                  height={600}
                  className="mx-auto w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col justify-center h-full border-l-0 md:border-l xl:border-l-0 ">
                <div className="flex flex-col gap-6 items-center px-6 md:px-16 md:py-20 py-10">
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
