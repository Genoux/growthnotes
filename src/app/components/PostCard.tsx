import { Post } from '@/app/lib/posts/types';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import Image from 'next/image';
import { format, fromUnixTime } from 'date-fns';

interface PostCardProps {
  post?: Post;
  isLoading: boolean;
}

export default function PostCard({ post, isLoading }: PostCardProps) {
  if (isLoading || !post) {
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
          src={post.thumbnail_url}
          alt={post.title}
          width={300}
          height={200}
          className="w-full h-40 object-cover mb-4"
        />
      )}
      <h2 className="text-xl font-bold mb-2">{post.title}</h2>
      <p className="text-gray-600 mb-2">{post.subtitle}</p>
      <Link href={`/posts/${post.slug}`} className="text-blue-500 hover:underline">
        Read more
      </Link>
    </div>
  );
}