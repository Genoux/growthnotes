import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { PodcastItem } from './types'
import { fetchPodcast } from './actions'

export function usePodcasts(
  enabled: boolean = true
): UseQueryResult<PodcastItem[], Error> {
  return useQuery<PodcastItem[], Error>({
    queryKey: ['podcasts'],
    queryFn: () => {
      return fetchPodcast()
    },
    enabled,
    retry: false,
  })
}
