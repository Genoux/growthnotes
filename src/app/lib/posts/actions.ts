'use server'

import { Post, FetchPostsParams } from './types';

export async function fetchPosts({
  limit = '',
  orderBy = 'publish_date',
  direction = 'desc',
  audience = 'free',
  expand = [],
}: FetchPostsParams): Promise<Post[]> {
  const publicationId = process.env.PUBLICATION_ID;
  const apiToken = process.env.API_TOKEN;

  if (!publicationId || !apiToken) {
    throw new Error('API credentials are not set');
  }

  try {
    const url = new URL(`https://api.beehiiv.com/v2/publications/${publicationId}/posts`);
    
    if (expand.length > 0) {
      expand.forEach(item => url.searchParams.append('expand[]', item));
    }
    url.searchParams.append('direction', direction);
    url.searchParams.append('audience', audience);
    url.searchParams.append('limit', limit);
    url.searchParams.append('order_by', orderBy);

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch posts from API');
    }

    const data = await response.json();

    return data.data.map((post: any): Post => ({
      id: post.id,
      title: post.title,
      subtitle: post.subtitle,
      thumbnail_url: post.thumbnail_url,
      slug: post.slug,
      web_url: post.web_url,
      publish_date: post.publish_date,
      content: post.content,
    }));
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}