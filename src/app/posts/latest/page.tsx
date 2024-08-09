import { Metadata } from 'next'
import { fetchPosts } from '@/app/lib/posts/actions'
import ClientLatestPostPage from './ClientLatestPostPage'

export async function generateMetadata(): Promise<Metadata> {
  const posts = await fetchPosts()
  const latestPost = posts[0]

  if (!latestPost) {
    return { title: 'Latest Post Not Found' }
  }

  const metadataTitle = `${latestPost.title} | Growthnotes`
  return {
    title: metadataTitle,
    description: latestPost.meta_default_description,
    openGraph: {
      title: metadataTitle,
      description: latestPost.meta_default_description,
      type: 'article',
      publishedTime: new Date(
        Number(latestPost.publish_date) * 1000
      ).toISOString(),
      images: latestPost.thumbnail_url,
    },
    twitter: {
      card: 'summary_large_image',
      title: metadataTitle,
      description: latestPost.meta_default_description,
      images: latestPost.thumbnail_url,
    },
  }
}

export default function LatestPostPage() {
  return <ClientLatestPostPage />
}
