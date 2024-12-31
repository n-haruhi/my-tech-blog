'use client'

import { useState } from 'react'
import PostCard from '@/components/PostCard'
import type { Post } from '@/lib/posts'

type PostsListProps = {
  posts: Post[]
}

export default function PostsList({ posts }: PostsListProps) {
  // 全記事から一意のタグリストを作成
  const allTags = Array.from(
    new Set(posts.flatMap(post => post.tags))
  ).sort()

  // 選択中のタグを管理するstate
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  // 選択されたタグでフィルタリングした記事一覧
  const filteredPosts = selectedTag
    ? posts.filter(post => post.tags.includes(selectedTag))
    : posts

  return (
    <div>
      {/* タグフィルター */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">タグで絞り込む</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedTag === null
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            すべて
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedTag === tag
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* 記事一覧 */}
      <h1 className="text-3xl font-bold mb-8">
        {selectedTag ? `${selectedTag}の記事一覧` : '全ての記事'}
      </h1>
      <div className="grid gap-6">
        {filteredPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}