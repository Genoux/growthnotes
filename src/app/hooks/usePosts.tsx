import { useQuery } from '@tanstack/react-query'
import { fetchPosts } from '@/app/lib/posts/actions'
import { Post, FetchPostsParams } from '@/app/lib/posts/types'

export function usePosts(params: FetchPostsParams = {}) {
  return useQuery<Post[]>({
    queryKey: ['posts', params],
    queryFn: () => fetchPosts(params),
    staleTime: 1000 * 60 * 60,
  })
}

export function usePost(slug?: string) {
  const { data: posts, isLoading, error } = usePosts()

  const post = slug
    ? posts?.find(p => p.slug === slug) 
    : posts?.[0] || null
  
  return {
    data: post,
    isLoading,
    error,
  }
}