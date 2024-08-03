import { fetchPosts } from '@/app/lib/posts/actions';
import PostsList from '@/app/components/PostsList';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


export default async function Home() {
  const recentPosts = await fetchPosts({ limit: '3', orderBy: 'publish_date', });
  return (
    <main>
    
      <p>This is regular text</p>
<p className="font-bold">This is bold text</p>
<p className="font-medium">This is medium text</p>
<p className="font-bold-condensed">This is bold condensed text</p>
      <p className="font-mono">This is mono text</p>
      <Input placeholder='Search' />
      <Button variant="default">Button</Button>

      <PostsList className="grid grid-cols-3 gap-4" posts={recentPosts}/>
    </main>
  );
}