import { Post } from '@/app/lib/posts/types';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import Image from 'next/image';
import { format, fromUnixTime } from 'date-fns';

interface PostCardProps {
  post: Post;
  isLoading: boolean;
}

export default function PostCard({ post, isLoading }: PostCardProps) {
  if (isLoading) {
    return (
      <div className="border p-4 rounded-lg shadow-md">
        <Skeleton className="w-32 h-4 mb-4" />
        <Skeleton className="w-full h-40 mb-4" />
        <Skeleton className="w-3/4 h-6 mb-2" />
        <Skeleton className="w-full h-4 mb-2" />
        <Skeleton className="w-1/4 h-4" />
      </div>
    );
  }

  return (
    <div className="border p-4 rounded-lg shadow-md">
      <p>Published on {format(fromUnixTime(Number(post.publish_date)), 'MMMM d, yyyy')}</p>
      {post.thumbnail_url && (
        <Image
          src={post.thumbnail_url !== 'string' ? post.thumbnail_url : 'https://tinyurl.com/25ks83w3'}
          alt={post.title}
          width={420}
          height={250}
          className="w-full object-cover border border-primary border-opacity-10"
        />
      )}
      <h2>{post.title}</h2>
      <p>{post.subtitle}</p>
      <Link href={`/posts/${post.slug}`} className="text-blue-500 hover:underline">
        Read more
      </Link>
    </div>
  );
}