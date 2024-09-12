import { Podcast } from '@/app/lib/posts/types'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Skeleton } from '@/app/components/ui/skeleton'
import Link from 'next/link'

type PodcastCardProps = {
  podcast?: Podcast
  isLoading?: boolean
  newPodcast?: boolean
}

export default function PodcastCardProps({
  podcast,
  isLoading = false,
  newPodcast = false,
}: PodcastCardProps) {
  if (isLoading) {
    return <PocastCardSkeleton />
  }

  if (!podcast) return null

  return (
    <motion.div
      whileHover={{ x: -2, y: -4, boxShadow: '8px 8px 0px #000' }}
      whileTap={{ x: -1, y: -1, boxShadow: '2px 2px 0px #000' }}
      transition={{ duration: 0.12 }}
      className="outline outline-[1px] outline-primary rounded-lg bg-white hover:outline-[3px] overflow-hidden"
    >
      <div className="flex flex-row items-center justify-center p-10 w-full h-auto">
        <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row justify-center items-center w-full gap-8 h-full">
          {podcast.thumbnail_url && (
            <div className="h-auto w-full xl:h-[225px] min-w-[225px] lg:w-full">
              <Image
                src={
                  podcast.thumbnail_url !== 'string'
                    ? podcast.thumbnail_url
                    : 'https://tinyurl.com/25ks83w3'
                }
                alt={podcast.title}
                width={225}
                height={225}
                sizes="100vw"
                className="border border-primary border-opacity-10 rounded-xl h-full w-full xl:w-auto"
              />
            </div>
          )}
          <div className="flex flex-col w-full justify-between gap-5 h-[225px]">
            <div className="flex flex-col justify-start items-start h-fit gap-1">
              <div className="flex justify-center items-center gap-2">
                <p className="font-mono text-base line-clamp-1  ">
                  {podcast.duration}
                  {' • '}
                  {podcast.publish_date}
                </p>
                {newPodcast && (
                  <span className="font-bold-condensed text-white bg-blue rounded-full px-3 py-0.5 text-sm uppercase tracking-wide">
                    New
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold-condensed uppercase -tracking-[0.050rem] line-clamp-2 md:line-clamp-3">
                {podcast.title}
              </h3>
              <p className="line-clamp-2 text-lg leading-[24px]">
                {podcast.subtitle}
              </p>
            </div>
            <div className="flex flex-row justify-end items-center gap-6 w-full h-fit">
              <Image
                src={'/badges/listen-spotify.svg'}
                alt="Listen Spotify"
                width={81}
                height={24}
              />
              <Link
                href={'https://podcasts.apple.com/ca/podcast/growthnotes'}
                target="_blank"
              >
                <Image
                  src={'/badges/listen-apple.svg'}
                  alt="Listen Apple"
                  width={92}
                  height={26}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function PocastCardSkeleton() {
  return (
    <div className="outline outline-[1px] outline-primary rounded-lg bg-white overflow-hidden p-10 w-full h-auto">
      <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row justify-center items-center w-full gap-8 h-full">
        <div className="h-auto w-full xl:h-[225px] min-w-[225px] lg:w-full">
          <Skeleton className="border border-primary border-opacity-10 rounded-xl h-full w-full xl:w-auto bg-neutral-200 " />
        </div>
        <div className="flex flex-col w-full justify-between gap-5 h-[225px]">
          <div className="flex flex-col justify-start items-start h-fit gap-1">
            <Skeleton className="w-[100px] h-[16px] rounded-full bg-neutral-200 mb-2" />
            <Skeleton className="w-full h-[20px] rounded-full bg-neutral-200" />
            <Skeleton className="w-3/4 h-[20px] rounded-full bg-neutral-200" />
            <Skeleton className="w-full h-[20px] rounded-full bg-neutral-200 mt-2" />
          </div>
          <div className="flex flex-row justify-end items-center gap-6 w-full h-fit">
            <Skeleton className="w-[81px] h-[24px] rounded-full bg-neutral-200" />
            <Skeleton className="w-[92px] h-[26px] rounded-full bg-neutral-200" />
          </div>
        </div>
      </div>
    </div>
  )
}
