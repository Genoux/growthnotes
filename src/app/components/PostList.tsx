'use client'
import PostCard from './PostCard'
import { usePosts } from '@/app/hooks/usePosts'
import { RefreshCcw } from 'lucide-react'
import clsx from 'clsx'

interface PostListProps {
  limit?: string
  className?: string
}

export default function PostList({ limit, className = '' }: PostListProps) {
  const { data: posts, isLoading, isFetching, error, refetch } = usePosts()

  if (error) {
    return (
      <div className='border border-primary border-opacity-20 p-20 items-center flex flex-col gap-6 justify-center opacity-90 text-primary h-full min-h-[450px]'>
        <h2>Error loading posts. Please try again.</h2>
        <RefreshCcw
          onClick={() => refetch()}
          className={clsx('h-5 w-5 transition-all hover:-rotate-45 cursor-pointer',
            { 'animate-spin direction-reverse pointer-events-none': isFetching })}
        />
      </div>
    )
  }

  const displayPosts = posts || []
  const skeletonCount = Number(limit) || 10

  return (
    <div className={`grid gap-6 ${className}`}>
      {isLoading
        ? Array.from({ length: skeletonCount }, (_, index) => (
          <PostCard key={`skeleton-${index}`} isLoading={true} />
        ))
        : displayPosts.map((post, index) => (
          <PostCard
            key={post.id}
            post={post}
            newPost={index === 0}
          />
        ))
      }
    </div>
  )
}