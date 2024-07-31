'use client'

import { useQuery } from "@tanstack/react-query";
import { fetchBeehiivPosts } from './actions';

export default function Posts({ initialPosts }: { initialPosts: any }) {
  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ["beehiivPosts"],
    queryFn: fetchBeehiivPosts,
    initialData: initialPosts,
    staleTime: 60 * 1000, // Consider data fresh for 1 minute
    gcTime: 5 * 60 * 1000, // Keep unused data for 5 minutes
  });

  if (isLoading) return <div>Refreshing...</div>;
  if (isError) return <div>Error loading posts</div>;

  return (
    <ul className="space-y-4 w-full max-w-2xl">
      {posts.data.map((post: any) => (
        <li key={post.id} className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-gray-600 mt-2">{post.subtitle}</p>
        </li>
      ))}
    </ul>
  );
}