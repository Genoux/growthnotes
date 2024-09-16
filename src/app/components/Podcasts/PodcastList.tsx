import PodcastItem from './PodcastItem'
import { usePodcasts } from '@/app/lib/podcasts/hooks'
import Link from 'next/link'
import { PodcastItem as PodcastItemType } from '@/app/lib/podcasts/types'
import clsx from 'clsx'
import { RefreshCcw } from 'lucide-react'

interface PodcastListProps {
  className?: string
}

export default function PodcastList({ className }: PodcastListProps) {
  const {
    data: podcasts,
    isLoading,
    error,
    isFetching,
    refetch,
  } = usePodcasts()

  if (error || (!isFetching && podcasts?.length === 0)) {
    return (
      <div className="rounded-md border border-primary border-opacity-20 p-20 items-center flex flex-col gap-6 justify-center opacity-90 text-primary h-full min-h-[280px]">
        <h2>
          {error
            ? 'Error loading podcasts. Please try again.'
            : 'No podcasts found.'}
        </h2>
        <RefreshCcw
          onClick={() => refetch()}
          className={clsx(
            'h-5 w-5 transition-all hover:-rotate-45 cursor-pointer',
            { 'animate-spin direction-reverse pointer-events-none': isFetching }
          )}
        />
      </div>
    )
  }

  return (
    <div className={clsx(className, 'grid grid-cols-1 lg:grid-cols-2 gap-4')}>
      {isLoading
        ? Array.from({ length: 2 }).map((_, index) => (
            <div key={`skeleton-${index}`} className="w-full">
              <PodcastItem isLoading={true} />
            </div>
          ))
        : podcasts?.map((podcast: PodcastItemType, index: number) => (
            <div key={podcast.title || `podcast-${index}`} className="w-full">
              <Link
                href={'https://open.spotify.com/show/4mQ0C03VxsPQfom5bz1Iyu'}
                rel="noopener noreferrer"
                target="_blank"
              >
                <PodcastItem
                  podcast={podcast}
                  isLoading={false}
                  newPodcast={index === 0}
                />
              </Link>
            </div>
          ))}
    </div>
  )
}
