import Link from "next/link"
import { getSortedPostsData } from "@/lib/posts"
import PostCard from "@/components/PostCard"

export default function Home() {
  // 最新の記事を5件取得
  const posts = getSortedPostsData().slice(0, 5)
  
  return (
    <div className="min-h-screen">
      {/* 最新の記事セクション */}
      <section className="max-w-5xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="w-1 h-8 bg-neon-cyan"></div>
            <h2 className="text-2xl sm:text-2xl font-bold text-neon-text">最近の記事</h2>
          </div>
          <Link
            href="/posts"
            className="group flex items-center gap-2 text-neon-cyan hover:text-white transition-all duration-300"
          >
            <span className="text-sm font-medium">すべて見る</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        <div className="space-y-1">
          {posts.map((post, index) => (
            <div key={post.slug} className="group">
              <PostCard post={post} />
              {index < posts.length - 1 && (
                <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent my-1"></div>
              )}
            </div>
          ))}
        </div>

        {/* 下部の装飾 */}
        <div className="mt-16 text-center">
          <Link
            href="/posts"
            className="relative inline-flex items-center gap-2 px-8 py-3 border border-neon-cyan text-neon-cyan font-medium overflow-hidden group rounded-md"
          >
            <span className="absolute inset-0 bg-neon-cyan transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
            <span className="relative z-10 group-hover:text-slate-900 transition-colors duration-300">さらに見る</span>
            <svg className="relative z-10 w-5 h-5 group-hover:text-slate-900 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}