import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import type { Post } from '@/lib/posts'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-neon-card rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-neon-border hover:border-neon-cyan">
      <Link href={`/posts/${post.slug}`}>
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-semibold text-neon-text hover:text-neon-cyan transition-colors duration-300">
              {post.title}
            </h2>
          </div>
          
          <div className="text-sm text-neon-muted">
            {formatDate(post.date)}
          </div>
          
          <p className="text-neon-muted leading-relaxed">{post.excerpt}</p>
          
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-neon-slate text-neon-cyan text-sm px-3 py-1 rounded-full border border-neon-border"
              >
                # {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  )
}