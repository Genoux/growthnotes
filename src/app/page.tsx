import { fetchPosts } from '@/app/lib/posts/actions';
import PostsList from '@/app/components/PostsList';

export default async function Home() {
  const recentPosts = await fetchPosts({ limit: '3', orderBy: 'publish_date', });
  return (
    <main>
      <h1>Welcome to our blog</h1>
      <PostsList className="grid grid-cols-3 gap-4" posts={recentPosts}/>
    </main>
  );
}