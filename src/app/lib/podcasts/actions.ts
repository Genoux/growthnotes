'use server'

import { PodcastItem } from './types'
import { XMLParser } from 'fast-xml-parser'

const PODCAST_URL = 'https://feeds.cohostpodcasting.com/YkSrQCCT'

export async function fetchPodcast(): Promise<PodcastItem[]> {
  try {
    const response = await fetch(PODCAST_URL)
    if (!response.ok) {
      throw new Error(
        `Failed to fetch podcast: ${response.status} ${response.statusText}`
      )
    }

    const xmlText = await response.text()
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    })
    const {
      rss: {
        channel: { item: items },
      },
    } = parser.parse(xmlText)

    return items
      .map(
        (item: any): PodcastItem => ({
          title: item.title,
          duration: item['itunes:duration'],
          subtitle: item['itunes:subtitle'],
          thumbnail_url: item['itunes:image']?.['@_href'],
          publish_date: new Date(item.pubDate).toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }),
          publish_date_raw: new Date(item.pubDate),
        })
      )
      .sort(
        (a: PodcastItem, b: PodcastItem) =>
          b.publish_date_raw.getTime() - a.publish_date_raw.getTime()
      )
  } catch (error) {
    throw error
  }
}
