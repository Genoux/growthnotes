'use client'
import React from 'react'
import PostContent from '@/app/components/PostContent'
import { format, fromUnixTime } from 'date-fns'
import SubscriptionBanner from '@/app/components/SubscriptionBanner'
import ReadingProgressBar from '@/app/components/ReadingProgressBar'
import { motion } from 'framer-motion'
import { defaultTransition } from '@/app/utils/motionConfig'
import { Post } from '@/app/lib/posts/types'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface SinglePostProps {
  post: Post | null
  isLoading: boolean
  error: Error | null
}

export default function SinglePost({
  post,
  isLoading,
  error,
}: SinglePostProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={defaultTransition}
    >
      <section className="container py-20 flex flex-col gap-8">
        <div className="flex justify-between items-end border-b pb-3 w-full mx-auto">
          <Link
            href="/posts"
            className="flex items-center gap-2 hover:-translate-x-2 transition-all"
          >
            <ArrowLeft size={24} />
            <h1 className="text-3xl font-bold-condensed">Archive</h1>
          </Link>
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
    </motion.div>
  )
}
