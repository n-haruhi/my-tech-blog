'use client'

import Markdown from '@/components/Markdown'
import PostNavigation from '@/components/PostNavigation'
import type { Post } from '@/lib/posts'

type Props = {
  post: Post
  previousPost: Post | null
  nextPost: Post | null
}

export default function PostContent({ post, previousPost, nextPost }: Props) {
  return (
    <article className="prose prose-lg max-w-none">
      <h1 className="text-3xl font-bold mb-4 text-center">{post.title}</h1>
      <div className="mb-8">
        <div className="text-gray-500 mb-4 text-center text-sm">
          {`${new Date(post.date).toLocaleDateString('ja-JP')} 公開`}
        </div>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
            >
              # {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="prose prose-blue">
        <Markdown content={post.content} />
      </div>

      {/* ナビゲーション */}
      <PostNavigation previous={previousPost} next={nextPost} />
    </article>
  )
}