import { fetchPosts } from '@/app/lib/posts/actions';
import PostsList from '@/app/components/PostsList';
import { SubscriptionForm } from '@/app/components/SubscriptionForm'


export default async function Home() {
  const recentPosts = await fetchPosts({ limit: '3', orderBy: 'publish_date', });
  return (
    <main className='max-w-[1440px] mx-auto'>
      <p>This is regular text</p>
      <p className="font-bold">This is bold text</p>
      <p className="font-medium">This is medium text</p>
      <p className="font-bold-condensed">This is bold condensed text</p>
      <p className="font-mono">This is mono text</p>
      <SubscriptionForm />
      <PostsList className="grid grid-cols-3 gap-4" posts={recentPosts} />
    </main>
  );
}