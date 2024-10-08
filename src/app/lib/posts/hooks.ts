import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { PostItem, FetchPostsParams } from '@/app/lib/posts/types'
import { fetchPosts } from '@/app/lib/posts/actions'

function useQueryPosts(
  params: FetchPostsParams = {},
  enabled: boolean = true
): UseQueryResult<PostItem[], Error> {
  return useQuery<PostItem[], Error>({
    queryKey: ['posts', params],
    queryFn: () => fetchPosts(params),
    staleTime: 1000 * 60 * 60 * 24 * 7,
    enabled: enabled,
  })
}

export function useSinglePost(slug?: string) {
  const { data: posts, ...rest } = useQueryPosts({}, true)
  const post =
    posts && slug ? posts.find(p => p.slug === slug) : posts?.[0] || null
  return { data: post, ...rest }
}

export function usePosts(limit?: number) {
  const { data: posts, ...rest } = useQueryPosts({}, true)
  const filteredPosts =
    posts && limit && limit > 0 ? posts.slice(0, limit) : posts
  return { data: filteredPosts, ...rest, totalPages: 1 }
}
