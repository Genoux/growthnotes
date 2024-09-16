import { PodcastItem as PodcastItemType } from '@/app/lib/podcasts/types'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Skeleton } from '@/app/components/ui/skeleton'
import { Badge } from '@/app/components/ui/badge'
import Link from 'next/link'

type PodcastItemProps = {
  podcast?: PodcastItemType
  isLoading?: boolean
  newPodcast?: boolean
}

const podcastLinks = [
  {
    href: 'https://podcasts.apple.com/ca/podcast/growthnotes',
    src: '/badges/listen-apple.svg',
    alt: 'Listen on Apple Podcasts',
  },
  {
    href: 'https://open.spotify.com/show/4mQ0C03VxsPQfom5bz1Iyu',
    src: '/badges/listen-spotify.svg',
    alt: 'Listen on Spotify',
  },
]

export default function PodcastItem({
  podcast,
  isLoading = false,
  newPodcast = false,
}: PodcastItemProps) {
  if (isLoading) return <PodcastItemSkeleton />
  if (!podcast) return null

  return (
    <motion.div
      whileHover={{ x: -2, y: -4, boxShadow: '8px 8px 0px #000' }}
      whileTap={{ x: -1, y: -1, boxShadow: '2px 2px 0px #000' }}
      transition={{ duration: 0.12 }}
      className="outline outline-[1px] outline-primary rounded-lg bg-white hover:outline-[3px] overflow-hidden"
    >
      <div className="flex flex-row px-4 py-6 w-full gap-5 sm:min-h-full lg:min-h-[270px]">
        {podcast.thumbnail_url && (
          <Image
            src={podcast.thumbnail_url}
            alt={podcast.title}
            width={500}
            height={500}
            className="border border-primary border-opacity-10 rounded-md object-cover self-start lg:self-auto w-40 sm:w-52 h-auto hidden xs:flex"
          />
        )}
        <div className="flex flex-col gap-6 sm:gap-0 justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-start gap-2 lg:flex-col-reverse xs:flex-col-reverse sm:flex-row xl:flex-row">
              <div className="flex items-center gap-2 text-sm font-mono">
                <span className="font-mono">{podcast.duration} min</span>
                <div className="h-1 w-1 rounded-full bg-primary"></div>
                <span className="font-mono">{podcast.publish_date}</span>
              </div>
              {newPodcast && <Badge className="bg-blue">NEW</Badge>}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <h3 className="text-xl font-bold-condensed uppercase -tracking-[0.050rem] line-clamp-2">
                {podcast.title}
              </h3>
              <p className="line-clamp-2 text-sm">{podcast.subtitle}</p>
            </div>
          </div>
          <div className="flex sm:justify-end justify-start items-center gap-6">
            {podcastLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={link.src}
                  alt={link.alt}
                  width={200}
                  height={200}
                  className="w-24 h-auto"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function PodcastItemSkeleton() {
  return (
    <div className="outline outline-[1px] outline-primary rounded-lg bg-white overflow-hidden p-6">
      <div className="flex flex-row justify-center items-start gap-6">
        <Skeleton className="border border-primary border-opacity-10 rounded-lg h-40 w-full max-w-40 bg-neutral-200" />
        <div className="flex flex-col w-full justify-start gap-2">
          <Skeleton className="w-[100px] h-[16px] rounded-full bg-neutral-200 mb-2" />
          <Skeleton className="w-full h-[20px] rounded-full bg-neutral-200" />
          <Skeleton className="w-3/4 h-[20px] rounded-full bg-neutral-200" />
          <Skeleton className="w-full h-[18px] rounded-full bg-neutral-200 mt-2" />
          <Skeleton className="w-3/4 h-[18px] rounded-full bg-neutral-200 mt-2" />
          <Skeleton className="w-1/2 h-[18px] rounded-full bg-neutral-200 mt-2" />
        </div>
      </div>
    </div>
  )
}
