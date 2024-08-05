'use client'

import PostCard from './PostCard'
import { usePosts } from '@/app/hooks/usePosts'

interface PostListProps {
  limit?: string
  className?: string
}

export default function PostList({ limit = '', className = '' }: PostListProps) {
  const { data: posts, isLoading, error } = usePosts({ limit: limit })

  if (error) {
    return <div>Error loading posts. Please try again later.</div>
  }

  return (
    <div className={`grid gap-6 ${className}`}>
      {isLoading || !posts
        ? Array.from({ length: Number(limit || 10) }).map((_, index) => (
            <PostCard key={`skeleton-${index}`} isLoading={true} />
          ))
        : posts.map((post) => <PostCard key={post.id} post={post} />)}
    </div>
  )
}