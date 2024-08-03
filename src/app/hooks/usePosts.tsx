import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '@/app/lib/posts/actions';
import { Post, FetchPostsParams } from '@/app/lib/posts/types';

export function usePosts(params: FetchPostsParams = {}, initialData: Post[] = []) {
  return useQuery({
    queryKey: ['posts', params],
    queryFn: () => fetchPosts(params),
    initialData: initialData,
    staleTime: 60 * 60 * 24 * 7,
  });
}