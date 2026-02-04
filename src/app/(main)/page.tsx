import Link from "next/link"
import { getSortedPostsData } from "@/lib/posts"
import PostCard from "@/components/PostCard"
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'

export default function Home() {
  // 最新の記事を5件取得
  const posts = getSortedPostsData().slice(0, 5)
  
  return (
    <div className="space-y-8 sm:space-y-10 lg:space-y-12">
      {/* ヒーローセクション */}
      <section className="text-center py-10 sm:py-12 lg:py-16">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 neon-purple-deep">Tech Blog</h1>
        <p className="text-base sm:text-lg text-neon-muted mb-8">
          フロントエンド開発とシステム設計についての技術ブログ
        </p>
      </section>
      
      {/* 最新の記事セクション */}
      <section>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4">
          <h2 className="text-xl sm:text-2xl font-bold text-neon-text">最新の記事</h2>
          <Link
            href="/posts"
            className="flex items-center gap-2 text-neon-cyan hover:text-neon-blue font-bold transition-colors duration-300 text-sm sm:text-base"
          >
            <EllipsisHorizontalIcon className="w-5 h-5" />
            すべての記事を見る
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