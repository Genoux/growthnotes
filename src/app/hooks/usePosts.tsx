import { useQuery } from '@tanstack/react-query'
import { fetchPosts } from '@/app/lib/posts/actions'
import { Post, FetchPostsParams } from '@/app/lib/posts/types'

export function usePosts(params: FetchPostsParams = {}) {
  return useQuery({
    queryKey: ['posts', params],
    queryFn: () => fetchPosts(params),
    staleTime: 1000 * 60 * 60,
  })
}

export function usePostBySlug(slug: string) {
  return useQuery<Post | null>({
    queryKey: ['post', slug],
    queryFn: async () => {
      const posts = await fetchPosts({ limit: '1' })
      return posts.find(post => post.slug === slug) || null
    }
  })
}

export function useLatestPost() {
  return useQuery<Post | null>({
    queryKey: ['latest_post'],
    queryFn: async () => {
      const posts = await fetchPosts({ limit: '1', expand: ['stats'] })
      return posts[0] || null
    }
  })
}