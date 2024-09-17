export type PostItem = {
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

export type FetchPostsParams = {
  limit?: number
  orderBy?: string
  direction?: 'asc' | 'desc'
  audience?: string
  expand?: ['free_web_content']
  status?: string
}
