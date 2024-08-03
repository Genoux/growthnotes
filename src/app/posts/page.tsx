// app/posts/page.tsx
import { fetchPosts } from '@/app/lib/posts/actions';
import PostsDisplay from '@/app/components/PostsList';

export default async function AllPostsPage() {
  const allPosts = await fetchPosts({});
  return (
    <div>
      <PostsDisplay className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' posts={allPosts} />
    </div>
  );
}