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
    <>
      <section className="container py-16 flex flex-col gap-8">
        <div className="flex justify-between items-end border-b pb-3 w-full mx-auto">
          <h1 className="text-3xl font-bold-condensed">Latest Issue</h1>
          {post && (
            <p className="font-bold-condensed text-xl uppercase">
              {format(fromUnixTime(Number(post.publish_date)), 'MMMM d, yyyy')}
            </p>
          )}
        </div>
        <ReadingProgressBar>
          <PostContent post={post} isLoading={isLoading} error={error} />
        </ReadingProgressBar>
      </section>
      <hr />
      <section className="container py-12">
        <SubscriptionBanner />
      </section>
    </>
  )
}
