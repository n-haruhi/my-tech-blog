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
    <article className="bg-neon-card rounded-lg border border-neon-border p-6 lg:p-8 hover:border-neon-cyan transition-colors duration-300">
      {/* タイトル */}
      <header className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-1 h-8 bg-neon-cyan"></div>
          <h1 className="text-2xl lg:text-3xl font-bold text-neon-text leading-tight">
            {post.title}
          </h1>
        </div>
        
        {/* 公開日 */}
        <div className="text-neon-muted mb-4 text-sm">
          {`${new Date(post.date).toLocaleDateString("ja-JP")} 公開`}
        </div>
        
        {/* タグ */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm bg-neon-slate text-neon-text border border-neon-border rounded-full"
            >
              # {tag}
            </span>
          ))}
        </div>
      </header>

      {/* メインコンテンツ */}
      <div className="prose prose-base lg:prose-lg max-w-none prose-invert mb-12">
        <div className="text-neon-text leading-relaxed">
          <Markdown content={post.content} />
        </div>
      </div>

      {/* ナビゲーション */}
      <PostNavigation previous={previousPost} next={nextPost} />
    </article>
  )
}