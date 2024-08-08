import PostList from '@/app/components/PostList'
import SubscriptionBanner from '../components/SubscriptionBanner'

export default function PostsPage() {
  return (
    <>
      <div className="container py-20 flex flex-col gap-8">
        <h1 className='text-4xl font-bold-condensed border-b pb-3'>Archive</h1>
        <PostList paginated={true} postsPerPage={9} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3" />
      </div>
      <section className='border-t py-20'>
        <SubscriptionBanner className='container' />
      </section>
    </>
  )
}