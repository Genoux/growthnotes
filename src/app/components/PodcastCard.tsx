import { Post } from '@/app/lib/posts/types'
import Link from 'next/link'
import Image from 'next/image'
import { format, fromUnixTime } from 'date-fns'
import { motion } from 'framer-motion'
import { Skeleton } from '@/app/components/ui/skeleton'

type PostCardProps = {
  post?: Post
  isLoading?: boolean
  newPost?: boolean
}

export default function PostCard({
  post,
  isLoading = false,
  newPost = true,
}: PostCardProps) {
  if (isLoading) {
    return <PostCardSkeleton />
  }

  if (!post) return null

  return (
    <Link href={`/posts/${post.slug}`} className="h-full">
      <motion.div
        whileHover={{ x: -2, y: -4, boxShadow: '8px 8px 0px #000' }}
        whileTap={{ x: -1, y: -1, boxShadow: '2px 2px 0px #000' }}
        transition={{ duration: 0.12 }}
        className="outline outline-[1px] outline-primary rounded-lg bg-white hover:outline-[3px] overflow-hidden"
      >
        <div className="flex flex-row items-center justify-center p-10 w-full h-[355px]">
          <div className="grid grid-cols-4 w-full gap-8 h-full ">
            {post.thumbnail_url && (
              <div className="relative col-span-2 w-auto h-full ">
                <Image
                  src={
                    post.thumbnail_url !== 'string'
                      ? post.thumbnail_url
                      : 'https://tinyurl.com/25ks83w3'
                  }
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                  className="  border border-primary border-opacity-10 rounded-xl "
                />
              </div>
            )}
            <div className="flex flex-col w-full items-center justify-between gap-5 h-full col-span-2">
              <div className="flex flex-col justify-start items-start h-fit gap-1 ">
                <div className="flex justify-center items-center gap-2">
                  <p className="font-mono text-base ">
                    {format(
                      fromUnixTime(Number(post.publish_date)),
                      'MMMM d, yyyy'
                    )}
                  </p>
                  {newPost && (
                    <p className="font-bold-condensed text-white bg-blue rounded-full px-3 py-0.5 text-sm uppercase tracking-wide">
                      New
                    </p>
                  )}
                </div>
                <h3 className="text-xl  font-bold-condensed uppercase -tracking-[0.050rem] ">
                  {post.title}
                </h3>

                <p className="line-clamp-2 text-[16px] leading-[24px]">
                  {' '}
                  {post.meta_default_description!.length > 160
                    ? post.meta_default_description!.substring(0, 160) + '...'
                    : post.meta_default_description}
                </p>
              </div>

              <div className="flex flex-row justify-end items-center gap-6 w-full h-fit">
                <Image
                  src={'/badges/listen-spotify.svg'}
                  alt="Listen Spotify"
                  width={81}
                  height={24}
                />
                <Image
                  src={'/badges/listen-apple.svg'}
                  alt="Listen Apple"
                  width={92}
                  height={26}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

function PostCardSkeleton() {
  return (
    <div className="border border-primary p-4 rounded-lg bg-white flex flex-col items-start gap-2 min-h-[450px]">
      <Skeleton className="w-[100px] h-[16px] rounded-full bg-neutral-200 mb-2" />
      <Skeleton className="w-full h-[20px] rounded-full bg-neutral-200" />
      <Skeleton className="w-3/4 h-[20px] rounded-full bg-neutral-200" />
      <Skeleton className="w-full h-[200px] rounded-xl bg-neutral-200 mt-2" />
      <div className="h-[72px] flex flex-col items-start gap-2 w-full">
        <Skeleton className="w-3/4 h-full rounded-full bg-neutral-200" />
        <Skeleton className="w-full h-full rounded-full bg-neutral-200" />
        <Skeleton className="w-2/4 h-full rounded-full bg-neutral-200" />
      </div>
    </div>
  )
}
