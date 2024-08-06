// TODO: Optimize this component to either fetch all posts and filter them client-side or use a query to fetch only the needed posts
// Now it use 2 query to store similar data

'use client'

import PostCard from './PostCard'
import { usePosts } from '@/app/hooks/usePosts'

interface PostListProps {
  limit?: string
  className?: string
}

export default function PostList({ limit, className = '' }: PostListProps) {
  const { data: posts, isLoading, error } = usePosts({ limit: limit })

  if (error) {
    return <div>Error loading posts. Please try again later.</div>
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