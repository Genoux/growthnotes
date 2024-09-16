'use server'

import { PostItem, FetchPostsParams } from './types'

// Posts before Aug 17 were entered manually on the same day, so their publish_dates are identical.
// For these posts, we use displayed_date to show the intended publication date.
// For posts on or after Aug 17, we use the actual publish_date.
const CUTOFF_TIMESTAMP = 1723939199

export async function fetchPosts({
  limit = 100,
  orderBy = 'displayed_date',
  direction = 'desc',
  audience = 'all',
  status = 'confirmed',
  expand = ['free_web_content'],
}: FetchPostsParams = {}): Promise<PostItem[]> {
  try {
    const publicationId = process.env.PUBLICATION_ID
    const apiToken = process.env.API_TOKEN
    if (!publicationId || !apiToken) {
      throw new Error('API credentials are not set')
    }

    const url = new URL(
      `https://api.beehiiv.com/v2/publications/${publicationId}/posts`
    )

    const params = new URLSearchParams({
      direction,
      audience,
      order_by: orderBy,
      status,
      limit: limit.toString(),
      expand: expand.join(','),
      hidden_from_feed: 'false',
      platform: 'all',
    })

    url.search = params.toString()

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 },
    })
    if (!response.ok) {
      const errorText = await response.text()
      console.error(
        'Failed to fetch posts from API:',
        response.status,
        response.statusText,
        errorText
      )
      throw new Error(
        `Failed to fetch posts from API: ${response.status} ${response.statusText}`
      )
    }
    const data = await response.json()
    console.log(`Successfully fetched ${data.data.length} posts`)

    const currentTimestamp = Math.floor(Date.now() / 1000)
    return data.data
      .filter(
        (post: any) =>
          post.publish_date <= currentTimestamp && post.publish_date !== null
      )
      .map(
        (post: any): PostItem => ({
          id: post.id,
          title: post.title,
          meta_default_description:
            post.meta_default_description || post.preview_text || post.subtitle,
          thumbnail_url: post.thumbnail_url,
          slug: post.slug,
          web_url: post.web_url,
          publish_date:
            post.publish_date > CUTOFF_TIMESTAMP
              ? post.publish_date
              : post.displayed_date || post.publish_date,
          content: post.content,
        })
      )
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw error
  }
}
