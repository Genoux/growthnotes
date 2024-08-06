export type Post = {
  id: string;
  title: string;
  meta_default_description?: string;
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

type expand = 'free_web_content' | 'premium_web_content' | 'stats';

export type FetchPostsParams = {
  limit?: string;
  orderBy?: string;
  direction?: 'asc' | 'desc';
  audience?: string;
  expand?: expand[];
  status?: string;
  slug?: string;
}