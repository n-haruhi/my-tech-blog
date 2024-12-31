import { getSortedPostsData } from '@/lib/posts'
import PostCard from '@/components/PostCard'

export default function Posts() {
  const posts = getSortedPostsData()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">記事一覧</h1>
      <div className="grid gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}