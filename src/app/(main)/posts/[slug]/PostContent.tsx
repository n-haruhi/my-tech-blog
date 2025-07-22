"use client"
import Markdown from "@/components/Markdown"
import PostNavigation from "@/components/PostNavigation"
import type { Post } from "@/lib/posts"

type Props = {
  post: Post
  previousPost: Post | null
  nextPost: Post | null
}

export default function PostContent({ post, previousPost, nextPost }: Props) {
  return (
    <article className="bg-neon-card rounded-lg shadow-lg border border-neon-border p-4 sm:p-6 lg:p-8">
      {/* タイトル */}
      <header className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-center text-neon-text leading-tight">
          {post.title}
        </h1>
        
        {/* 公開日 */}
        <div className="text-neon-muted mb-4 text-center text-xs sm:text-sm">
          {`${new Date(post.date).toLocaleDateString("ja-JP")} 公開`}
        </div>
        
        {/* タグ */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-neon-slate text-neon-cyan text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full border border-neon-border/50"
            >
              # {tag}
            </span>
          ))}
        </div>
      </header>

      {/* メインコンテンツ */}
      <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none prose-invert">
        <div className="text-neon-text leading-relaxed">
          <Markdown content={post.content} />
        </div>
      </div>

      {/* ナビゲーション */}
      <div className="mt-8 sm:mt-12">
        <PostNavigation previous={previousPost} next={nextPost} />
      </div>
    </article>
  )
}