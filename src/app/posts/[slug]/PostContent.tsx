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
    <article className="bg-neon-card rounded-lg shadow-lg border border-neon-border p-6 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center text-neon-text">{post.title}</h1>
      <div className="mb-8">
        <div className="text-neon-muted mb-4 text-center text-sm">
          {`${new Date(post.date).toLocaleDateString("ja-JP")} 公開`}
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-neon-slate text-neon-cyan text-sm px-3 py-1 rounded-full border border-neon-border/50"
            >
              # {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="prose prose-lg max-w-none">
        <Markdown content={post.content} />
      </div>

      {/* ナビゲーション */}
      <PostNavigation previous={previousPost} next={nextPost} />
    </article>
  )
}