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
  newPost = false,
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
        className="outline outline-[1px] outline-primary p-4 rounded-lg bg-white hover:outline-[3px] overflow-hidden md:min-h-[450px]"
      >
        <div className="flex flex-col items-start gap-3">
          <div className="flex items-center gap-2 justify-between w-full">
            <p className="font-mono">
              {format(fromUnixTime(Number(post.publish_date)), 'MMMM d, yyyy')}
            </p>
            {newPost && (
              <p className="font-bold-condensed text-white bg-orange rounded-full px-3 py-0.5 text-sm uppercase tracking-wide">
                New
              </p>
            )}
          </div>
          <h3 className="text-2xl font-bold-condensed uppercase -tracking-[0.050rem]">
            {post.title}
          </h3>
          {post.thumbnail_url && (
            <Image
              src={
                post.thumbnail_url !== 'string'
                  ? post.thumbnail_url
                  : 'https://tinyurl.com/25ks83w3'
              }
              alt={post.title}
              width={420}
              height={250}
              className="w-full object-cover border border-primary border-opacity-10 h-[200px]"
            />
          )}
          <p>
            {' '}
            {post.meta_default_description!.length > 120
              ? post.meta_default_description!.substring(0, 120) + '...'
              : post.meta_default_description}
          </p>
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
