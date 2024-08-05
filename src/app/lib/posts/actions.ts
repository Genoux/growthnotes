'use server'

import { Post, FetchPostsParams } from './types';

export async function fetchPosts({
  limit = '',
  orderBy = 'publish_date',
  direction = 'desc',
  audience = 'free',
  expand = [],
}: FetchPostsParams = {}): Promise<Post[]> {
  try {
    const publicationId = process.env.PUBLICATION_ID;
    const apiToken = process.env.API_TOKEN;
    if (!publicationId || !apiToken) {
      throw new Error('API credentials are not set');
    }
    let url: URL;
    if (process.env.NODE_ENV === 'development') {
      url = new URL(`https://stoplight.io/mocks/beehiiv/v2/104190750/publications/${publicationId}/posts`);
    } else {
      url = new URL(`https://api.beehiiv.com/v2/publications/${publicationId}/posts`);
    }
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

export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  const posts = await fetchPosts({ expand: ['free_web_content'] });
  return posts.find(post => post.slug === slug) || null;
}

export async function fetchLatestPost(): Promise<Post | null> {
  const posts = await fetchPosts({ limit: '1', expand: ['free_web_content'] });
  return posts[0] || null;
}