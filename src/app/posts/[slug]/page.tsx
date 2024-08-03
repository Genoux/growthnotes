import { fetchPosts } from '@/app/lib/posts/actions';
import { notFound } from 'next/navigation';

export default async function PostPage({ params }: { params: { slug: string } }) {
  const posts = await fetchPosts({ expand: ['free_web_content'] });
  const post = posts.find(post => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <div dangerouslySetInnerHTML={{ __html: post.content!.free!.web! }} />
    </article>
  );
}

export async function generateStaticParams() {
  const posts = await fetchPosts({});
  return posts.map((post) => ({
    slug: post.slug,
  }));
}