import PostList from '@/app/components/PostList'

export default function PostsPage() {
  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-6">All Posts</h1>
      <PostList className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3" />
    </div>
  )
}