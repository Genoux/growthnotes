'use client'

import { usePostBySlug } from '@/app/hooks/usePosts'
import { notFound } from 'next/navigation'

export default function PostPage({ params }: { params: { slug: string } }) {
  const { data: post, isLoading, error } = usePostBySlug(params.slug)

  if (isLoading) {
    return <PostSkeleton />
  }

  if (error) {
    console.error('Error fetching post:', error)
    return <div>Error loading post. Please try again later.</div>
  }

  if (!post) {
    notFound()
  }

  return (
    <article className="max-w-3xl mx-auto mt-8 px-4">
      <div dangerouslySetInnerHTML={{ __html: post.content!.free!.web || '' }} />
    </article>
  )
}

function PostSkeleton() {
  return (
    <div className="max-w-3xl mx-auto mt-8 px-4 animate-pulse">
      <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
      <div className="h-64 bg-gray-200 rounded w-full mb-6"></div>
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
        ))}
      </div>
    </div>
  )
}