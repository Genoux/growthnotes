import { Metadata } from 'next'
import { fetchPosts } from '@/app/lib/posts/actions'
import ClientPostPage from './ClientPostPage'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const posts = await fetchPosts()
  const post = posts.find(p => p.slug === params.slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  const metadataTitle = `${post.title} | Growthnotes`
  return {
    title: metadataTitle,
    description: post.meta_default_description,
    openGraph: {
      title: metadataTitle,
      description: post.meta_default_description,
      type: 'article',
      publishedTime: new Date(Number(post.publish_date) * 1000).toISOString(),
      images: post.thumbnail_url,
    },
    twitter: {
      card: 'summary_large_image',
      title: metadataTitle,
      description: post.meta_default_description,
      images: post.thumbnail_url,
    },
  }
}

export default function PostPage({ params }: { params: { slug: string } }) {
  return <ClientPostPage slug={params.slug} />
}
