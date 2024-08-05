export type Post = {
  id: string;
  title: string;
  subtitle?: string;
  thumbnail_url?: string;
  slug: string;
  web_url: string;
  publish_date: string;
  content?: {
    free?: {
      web?: string;
    };
    premium?: {
      web?: string;
    };
  };
}

type expand = 'free_web_content' | 'premium_web_content';

export type FetchPostsParams = {
  limit?: string;
  orderBy?: string;
  direction?: 'asc' | 'desc';
  audience?: string;
  expand?: expand[];
  slug?: string;
}