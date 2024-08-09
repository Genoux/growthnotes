'use client'
import React from 'react'
import { useSinglePost } from '@/app/hooks/usePosts'
import SinglePost from '@/app/components/SinglePost'

export default function ClientLatestPostPage() {
  const { data: post, isLoading, error } = useSinglePost()

  return <SinglePost post={post || null} isLoading={isLoading} error={error} />
}
