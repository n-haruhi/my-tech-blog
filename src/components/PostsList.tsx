'use client'

import { useState } from 'react'
import PostCard from '@/components/PostCard'
import type { Post } from '@/lib/posts'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

type PostsListProps = {
  posts: Post[]
}

export default function PostsList({ posts }: PostsListProps) {
  // 全記事から一意のタグリストを作成
  const allTags = Array.from(
    new Set(posts.flatMap(post => post.tags))
  ).sort()

  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  // タグと検索クエリの両方でフィルタリング
  const filteredPosts = posts
    .filter(post => !selectedTag || post.tags.includes(selectedTag))
    .filter(post => 
      searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    )

  return (
    <div>
      {/* 検索バー */}
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="記事を検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

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

      {/* 記事一覧のヘッダー */}
      <h1 className="text-3xl font-bold mb-8">
        {selectedTag ? `${selectedTag}の記事一覧` : '全ての記事'}
        {searchQuery && ` - "${searchQuery}"の検索結果`}
        {filteredPosts.length > 0 && ` (${filteredPosts.length}件)`}
      </h1>

      {/* 記事一覧 */}
      <div className="grid gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))
        ) : (
          <p className="text-gray-600 text-center py-8">
            該当する記事が見つかりませんでした。
          </p>
        )}
      </div>
    </div>
  )
}