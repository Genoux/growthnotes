'use client'
import React from 'react'
import { useSinglePost } from '@/app/lib/posts/hooks'
import SinglePost from '@/app/components/Posts/SinglePost'

export default function ClientPostPage({ slug }: { slug: string }) {
  const { data: post, isLoading, error } = useSinglePost(slug)

  return <SinglePost post={post || null} isLoading={isLoading} error={error} />
}
