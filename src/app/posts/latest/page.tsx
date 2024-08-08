'use client'
import React from 'react'
import { useSinglePost } from '@/app/hooks/usePosts'
import PostContent from '@/app/components/PostContent'
import { format, fromUnixTime } from 'date-fns'
import SubscriptionBanner from '@/app/components/SubscriptionBanner'
import ReadingProgressBar from '@/app/components/ReadingProgressBar'

export default function LatestPostPage() {
  const { data: post, isLoading, error } = useSinglePost()

  return (
    <section className='container py-20 flex flex-col gap-8'>
      <div className='flex justify-between items-end border-b pb-3 w-3/4 mx-auto'>
        <h1 className='text-3xl font-bold-condensed'>Latest Issue</h1>
        {post && <p className='font-bold-condensed text-xl uppercase'>{format(fromUnixTime(Number(post.publish_date)), 'MMMM d, yyyy')}</p>}
      </div>
      <ReadingProgressBar>
        <PostContent post={post} isLoading={isLoading} error={error} />
      </ReadingProgressBar>
      <SubscriptionBanner className='mt-12' />
    </section>
  )
}
