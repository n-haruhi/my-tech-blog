"use client"
import { useState, useEffect } from "react"
import PostCard from "@/components/PostCard"
import type { Post } from "@/lib/posts"
import { MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"

type PostsListProps = {
  posts: Post[]
}

export default function PostsList({ posts }: PostsListProps) {
  // 全記事から一意のタグリストを作成
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags))).sort()

  // 各種state管理
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 5

  // タグと検索クエリの両方でフィルタリング
  const filteredPosts = posts
    .filter((post) => !selectedTag || post.tags.includes(selectedTag))
    .filter(
      (post) =>
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()),
    )

  // ページネーションの計算
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const paginatedPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)

  // 検索やタグが変更されたらページを1に戻す
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedTag])

  // ページ番号の配列を生成
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="px-4 sm:px-6 lg:px-0">
      {/* 検索バー */}
      <div className="mb-6 sm:mb-8 relative z-10">
        <div className="relative">
          <input
            type="text"
            placeholder="記事を検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 sm:py-3 pl-10 sm:pl-12 bg-neon-card border border-neon-border rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-cyan text-neon-text placeholder-neon-muted text-sm sm:text-base"
          />
          <MagnifyingGlassIcon className="absolute left-3 sm:left-4 top-2.5 sm:top-3.5 h-4 w-4 sm:h-5 sm:w-5 text-neon-muted" />
        </div>
      </div>

      {/* タグフィルター */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-neon-text">タグで絞り込む</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-3 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm transition-colors duration-300 ${
              selectedTag === null
                ? "bg-neon-cyan text-neon-dark"
                : "bg-neon-slate text-neon-text hover:bg-neon-card border border-neon-border"
            }`}
          >
            すべて
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm transition-colors duration-300 ${
                selectedTag === tag
                  ? "bg-neon-cyan text-neon-dark"
                  : "bg-neon-slate text-neon-text hover:bg-neon-card border border-neon-border"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* 記事一覧のヘッダー */}
      <h1 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-neon-text">
        {selectedTag ? `${selectedTag}の記事一覧` : "全ての記事"}
        {searchQuery && ` - "${searchQuery}"の検索結果`}
        {filteredPosts.length > 0 && ` (${filteredPosts.length}件)`}
      </h1>

      {/* 記事一覧 */}
      <div className="grid gap-4 sm:gap-6 mb-6 sm:mb-8">
        {paginatedPosts.length > 0 ? (
          paginatedPosts.map((post) => <PostCard key={post.slug} post={post} />)
        ) : (
          <p className="text-neon-muted text-center py-8 text-sm sm:text-base">該当する記事が見つかりませんでした。</p>
        )}
      </div>

      {/* ページネーション */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-1 sm:space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-1.5 sm:p-2 rounded-lg text-neon-text hover:bg-neon-card disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
          >
            <ChevronLeftIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`px-2.5 py-1 sm:px-4 sm:py-2 text-xs sm:text-base rounded-lg transition-colors duration-300 ${
                currentPage === number ? "bg-neon-cyan text-neon-dark" : "text-neon-text hover:bg-neon-card"
              }`}
            >
              {number}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-1.5 sm:p-2 rounded-lg text-neon-text hover:bg-neon-card disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
          >
            <ChevronRightIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      )}
    </div>
  )
}