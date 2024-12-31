'use client'

import Markdown from '@/components/Markdown'
import TableOfContents from '@/components/TableOfContents'
import type { Post } from '@/lib/posts'

type Props = {
  post: Post
}

export default function PostContent({ post }: Props) {
  return (
    <article className="prose prose-lg max-w-none">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="mb-8">
        <div className="text-gray-500 mb-4">
          {new Date(post.date).toLocaleDateString('ja-JP')}
        </div>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <TableOfContents />

      <div className="prose prose-blue">
        <Markdown content={post.content} />
      </div>
    </article>
  )
}