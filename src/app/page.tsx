import Link from "next/link"
import { getSortedPostsData } from "@/lib/posts"
import PostCard from "@/components/PostCard"

export default function Home() {
  // 最新の記事を5件取得
  const posts = getSortedPostsData().slice(0, 5)

  return (
    <div className="space-y-8">
      {/* ヒーローセクション */}
      <section className="text-center py-10">
        <h1 className="text-4xl font-bold mb-4 neon-purple-deep">Tech Blog</h1>
        <p className="text-lg text-neon-muted mb-8">フロントエンド開発とシステム設計についての技術ブログ</p>
      </section>

      {/* 最新の記事セクション */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-neon-text">最新の記事</h2>
          <Link href="/posts" className="text-neon-cyan hover:text-neon-blue font-bold transition-colors duration-300">
            すべての記事を見る →
          </Link>
        </div>
        <div className="grid gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  )
}