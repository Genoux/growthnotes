'use client'

import PostList from '@/app/components/PostList'
import SubscriptionBanner from '../components/SubscriptionBanner'
import { usePosts } from '@/app/hooks/usePosts'
import { motion } from 'framer-motion'
import { defaultTransition } from '@/app/utils/motionConfig'

export default function PostsPage() {
  const { data: posts } = usePosts()
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ defaultTransition }}
    >
      <section className="container py-16 flex flex-col gap-8">
        <div className="border-b pb-3 flex items-end justify-between">
          <h1 className="text-3xl font-bold-condensed ">Archive </h1>
          <span className="font-bold-condensed text-xl uppercase">
            {posts?.length} posts
          </span>
        </div>
        <PostList
          paginated={true}
          postsPerPage={9}
          className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        />
      </section>
      <hr />
      <section className="container py-12">
        <SubscriptionBanner />
      </section>
    </motion.div>
  )
}
