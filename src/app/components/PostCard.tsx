import { Post } from '@/app/lib/posts/types'
import Link from 'next/link'
import Image from 'next/image'
import { format, fromUnixTime } from 'date-fns'

type PostCardProps = {
  post?: Post
  isLoading?: boolean
}

export default function PostCard({ post, isLoading = false }: PostCardProps) {
  if (isLoading) {
    return <PostCardSkeleton />
  }

  if (!post) return null

  return (
    <div className="border p-4 rounded-lg shadow-md">
      <p>Published on {format(fromUnixTime(Number(post.publish_date)), 'MMMM d, yyyy')}</p>
      {post.thumbnail_url && (
        <Image
          src={post.thumbnail_url !== 'string' ? post.thumbnail_url : 'https://tinyurl.com/25ks83w3'}
          alt={post.title}
          width={420}
          height={250}
          className="w-full object-cover border border-primary border-opacity-10"
        />
      )}
      <h2 className="text-xl font-bold mt-2">{post.title}</h2>
      <p className="mt-2">{post.subtitle}</p>
      <Link href={`/posts/${post.slug}`} className="text-blue-500 hover:underline mt-2 inline-block">
        Read more
      </Link>
    </div>
  )
}

function PostCardSkeleton() {
  return (
    <div className="border p-4 rounded-lg shadow-md animate-pulse">
      <div className="w-32 h-4 bg-gray-200 mb-4"></div>
      <div className="w-full h-40 bg-gray-200 mb-4"></div>
      <div className="w-3/4 h-6 bg-gray-200 mb-2"></div>
      <div className="w-full h-4 bg-gray-200 mb-2"></div>
      <div className="w-1/4 h-4 bg-gray-200"></div>
    </div>
  );
}