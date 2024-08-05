// TODO: useQuery once for all posts and reuse the data

import PostList from '@/app/components/PostList'
import { SubscriptionForm } from '@/app/components/SubscriptionForm'

export default function Home() {
  return (
    <main className='max-w-[1440px] mx-auto'>
      <p>This is regular text</p>
      <p className="font-bold">This is bold text</p>
      <p className="font-medium">This is medium text</p>
      <p className="font-bold-condensed">This is bold condensed text</p>
      <p className="font-mono">This is mono text</p>
      <SubscriptionForm />
      <PostList limit={'3'} className="grid-cols-3" />
    </main>
  );
}