import { Suspense } from 'react';
import { fetchBeehiivPosts } from './actions';
import Posts from './Posts';

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const posts = await fetchBeehiivPosts();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Beehiiv Posts</h1>
      <Suspense fallback={<div>Loading posts...</div>}>
        <Posts initialPosts={posts} />
      </Suspense>
    </main>
  );
}