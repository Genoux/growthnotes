'use server'
import { Post, FetchPostsParams } from './types'
import { XMLParser } from 'fast-xml-parser'

export async function fetchPosts({
  limit = 100,
  orderBy = 'displayed_date',
  direction = 'desc',
  audience = 'all',
  status = 'confirmed',
  expand = ['free_web_content'],
}: FetchPostsParams = {}): Promise<Post[]> {
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
        (post: any): Post => ({
          id: post.id,
          title: post.title,
          meta_default_description:
            post.meta_default_description || post.preview_text || post.subtitle,
          thumbnail_url: post.thumbnail_url,
          slug: post.slug,
          web_url: post.web_url,
          publish_date: post.publish_date,
          content: post.content,
        })
      )
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw error
  }
}

export async function fetchPodcast(): Promise<any> {
  try {
    const url = 'https://feeds.cohostpodcasting.com/YkSrQCCT'

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/xml',
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(
        'Failed to fetch podcast posts from API:',
        response.status,
        response.statusText,
        errorText
      )
      throw new Error(
        `Failed to fetch podcast posts from API: ${response.status} ${response.statusText}`
      )
    }
    const xmlText = await response.text()

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    })
    const jsonObj = parser.parse(xmlText)
    console.log('Parsed JSON Object:', jsonObj)

    const items = jsonObj.rss.channel.item.map((item: any) => {
      const pubDate = new Date(item.pubDate)
      const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }
      const formattedDate = pubDate.toLocaleDateString('en-US', options)

      const mappedItem = {
        title: item.title,
        link: item.link,
        meta_default_description: item['itunes:subtitle'],
        publish_date: formattedDate,
        publish_date_raw: pubDate,
        author: item.author,
        enclosure: item.enclosure?.['@_url'],
        duration: item['itunes:duration'],
        thumbnail_url: item['itunes:image']?.['@_href'],
      }

      return mappedItem
    })

    // Sort items by publish_date_raw in descending order
    items.sort((a: any, b: any) => b.publish_date_raw - a.publish_date_raw)

    return items
  } catch (error) {
    console.error('Error fetching podcast posts:', error)
    throw error
  }
}
