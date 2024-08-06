// TODO: Optimize this component to either fetch all posts and filter them client-side or use a query to fetch only the needed posts
// Now it use 2 query to store similar data

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
  const { data: posts, isLoading, isFetching, error, refetch } = usePosts({ limit: limit })

  if (error) {
    return (
      <div className='border border-primary border-opacity-20 p-20 items-center flex flex-col gap-6 justify-center opacity-90 text-primary h-full min-h-[450px]'>
        <h2>Error loading posts. Please try again.</h2>
        <RefreshCcw
          onClick={async () => await refetch()}
          className={clsx('h-5 w-5 transition-all hover:-rotate-45 cursor-pointer',
            { 'animate-spin direction-reverse pointer-events-none': isFetching })}
        />
      </div>
    )
  }

  const displayPosts = limit ? posts?.slice(0, Number(limit)) : posts

  return (
    <div className={`grid gap-6 ${className}`}>
      {isLoading || !displayPosts
        ? Array.from({ length: Number(limit || 10) }).map((_, index) => (
          <PostCard key={`skeleton-${index}`} isLoading={true} />
        ))
        : displayPosts.map((post) => <PostCard key={post.id} post={post} />)}
    </div>
  )
}