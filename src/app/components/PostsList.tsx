'use client'
import { usePosts } from '@/app/hooks/usePosts';
import PostCard from '@/app/components/PostCard';
import { Post } from '@/app/lib/posts/types';

interface PostsListProps {
  posts: Post[];
  className?: string;
}

export default function PostsList({ posts, className = '' }: PostsListProps) {
  const { data: updatedPosts, isLoading } = usePosts({}, posts);

  const postsList = updatedPosts || posts;

  return (
    <div>
      {isLoading && <div>Updating...</div>}
      <div className={className}>
        {postsList.map(post => (
          <PostCard key={post.id} post={post} isLoading={isLoading} />
        ))}
      </div>
    </div>
  );
}