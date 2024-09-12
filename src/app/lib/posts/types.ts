export type Post = {
  id: string
  title: string
  meta_default_description?: string
  thumbnail_url?: string
  slug: string
  web_url: string
  publish_date: string
  content?: {
    free?: {
      web?: string
    }
  }
}

export type PostPodcast = {
  title: string
  duration: string
  meta_default_description?: string
  thumbnail_url?: string
  publish_date: string
}

type expand = 'free_web_content'

export type FetchPostsParams = {
  limit?: number
  orderBy?: string
  direction?: 'asc' | 'desc'
  audience?: string
  expand?: expand[]
  status?: string
}
