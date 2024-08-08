'use server'
import { Post, FetchPostsParams } from './types';

export async function fetchPosts({
  limit = '',
  orderBy = 'publish_date',
  direction = 'desc',
  audience = 'free',
  status = 'confirmed',
  expand = ['free_web_content'],
}: FetchPostsParams = {}): Promise<Post[]> {
  try {
    const publicationId = process.env.PUBLICATION_ID;
    const apiToken = process.env.API_TOKEN;
    if (!publicationId || !apiToken) {
      throw new Error('API credentials are not set');
    }

    const numericLimit = limit ? parseInt(limit) : 0;
    const fetchLimit = numericLimit > 0 ? numericLimit + 1 : limit;

    let url: URL;
    if (process.env.NODE_ENV === 'development') {
      url = new URL(`https://stoplight.io/mocks/beehiiv/v2/104190750/publications/${publicationId}/posts`);
    } else {
      url = new URL(`https://api.beehiiv.com/v2/publications/${publicationId}/posts`);
    }
    url.searchParams.append('direction', direction);
    url.searchParams.append('audience', audience);
    url.searchParams.append('limit', fetchLimit.toString());
    url.searchParams.append('order_by', orderBy);
    url.searchParams.append('status', status);
    expand.forEach(item => url.searchParams.append('expand[]', item));

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 }
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to fetch posts from API:', response.status, response.statusText, errorText);
      throw new Error(`Failed to fetch posts from API: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    console.log(`Successfully fetched ${data.data.length} posts`);

    const currentTimestamp = Math.floor(Date.now() / 1000);
    const filteredPosts = data.data
      .filter((post: any) => post.publish_date <= currentTimestamp)
      .map((post: any): Post => ({
        id: post.id,
        title: post.title,
        meta_default_description: post.meta_default_description || post.preview_text,
        thumbnail_url: post.thumbnail_url,
        slug: post.slug,
        web_url: post.web_url,
        publish_date: post.publish_date,
        content: post.content,
      }));

    return numericLimit > 0 ? filteredPosts.slice(0, numericLimit) : filteredPosts;

  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}