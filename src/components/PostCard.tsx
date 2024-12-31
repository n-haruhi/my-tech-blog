import Link from 'next/link'
import type { Post } from '@/lib/posts'

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
      <Link href={`/posts/${post.slug}`}>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-600 hover:text-blue-600">
            {post.title}
          </h2>
          <div className="text-sm text-gray-500">
            {new Date(post.date).toLocaleDateString('ja-JP')}
          </div>
          <p className="text-gray-600">{post.excerpt}</p>
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
      </Link>
    </article>
  )
}