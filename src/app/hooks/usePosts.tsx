import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Post, FetchPostsParams } from '@/app/lib/posts/types'
import { fetchPosts } from '@/app/lib/posts/actions'

function useQueryPosts(
  params: FetchPostsParams = {},
  enabled: boolean = true
): UseQueryResult<Post[], Error> {
  const query = useQuery<Post[], Error>({
    queryKey: ['posts', params],
    queryFn: () => fetchPosts(params),
    staleTime: 1000 * 60 * 60 * 24 * 7,
    enabled: enabled,
  })

  useEffect(() => {
    if (enabled) {
      query.refetch()
    }
  }, [enabled])

  return query
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

export function usePostsPaginated(page: number, postsPerPage: number) {
  const { data: posts, ...rest } = useQueryPosts({}, true)
  const paginatedPosts = posts
    ? posts.slice((page - 1) * postsPerPage, page * postsPerPage)
    : []
  const totalPages = posts ? Math.ceil(posts.length / postsPerPage) : 0
  return { data: paginatedPosts, ...rest, totalPages }
}
