'use client'
import React from 'react'
import { useSinglePost } from '@/app/hooks/usePosts'
import SinglePost from '@/app/components/SinglePost'

export default function ClientPostPage({ slug }: { slug: string }) {
  const { data: post, isLoading, error } = useSinglePost(slug)

  return <SinglePost post={post || null} isLoading={isLoading} error={error} />
}
