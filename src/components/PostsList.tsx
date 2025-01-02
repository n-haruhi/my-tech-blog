'use client'

import { useState, useEffect } from 'react'
import PostCard from '@/components/PostCard'
import type { Post } from '@/lib/posts'
import { MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

type PostsListProps = {
  posts: Post[]
}

export default function PostsList({ posts }: PostsListProps) {
  // 全記事から一意のタグリストを作成
  const allTags = Array.from(
    new Set(posts.flatMap(post => post.tags))
  ).sort()

  // 各種state管理
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 5  // 1ページあたりの表示件数

  // タグと検索クエリの両方でフィルタリング
  const filteredPosts = posts
    .filter(post => !selectedTag || post.tags.includes(selectedTag))
    .filter(post => 
      searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    )

  // ページネーションの計算
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  )

  // 検索やタグが変更されたらページを1に戻す
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedTag])

  // ページ番号の配列を生成
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div>
      {/* 検索バー */}
      <div className="mb-8 relative z-10">
        <div className="relative">
          <input
            type="text"
            placeholder="記事を検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* タグフィルター */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">タグで絞り込む</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedTag === null
                ? 'bg-[#af8b67] text-white'
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
                  ? 'bg-[#af8b67] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* 記事一覧のヘッダー */}
      <h1 className="text-2xl font-bold mb-8 text-gray-800">
        {selectedTag ? `${selectedTag}の記事一覧` : '全ての記事'}
        {searchQuery && ` - "${searchQuery}"の検索結果`}
        {filteredPosts.length > 0 && ` (${filteredPosts.length}件)`}
      </h1>

      {/* 記事一覧 */}
      <div className="grid gap-6 mb-8 text-gray-800">
        {paginatedPosts.length > 0 ? (
          paginatedPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))
        ) : (
          <p className="text-gray-600 text-center py-8">
            該当する記事が見つかりませんでした。
          </p>
        )}
      </div>

      {/* ページネーション */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-1 md:space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-1 md:p-2 rounded-lg text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeftIcon className="h-4 w-4 md:h-5 md:w-5" />
          </button>
          
          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`px-3 py-1 md:px-4 md:py-2 text-sm md:text-base rounded-lg ${
                currentPage === number
                  ? 'bg-[#393a3e] text-white'
                  : 'text-gray-800 hover:bg-gray-200'
              }`}
            >
              {number}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-1 md:p-2 rounded-lg text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRightIcon className="h-4 w-4 md:h-5 md:w-5" />
          </button>
        </div>
      )}
    </div>
  )
}