"use client"
import { useState, useEffect } from "react"
import PostCard from "@/components/PostCard"
import type { Post } from "@/lib/posts"
import { MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"

type PostsListProps = {
  posts: Post[]
}

export default function PostsList({ posts }: PostsListProps) {
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags))).sort()

  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 5

  const filteredPosts = posts
    .filter((post) => !selectedTag || post.tags.includes(selectedTag))
    .filter(
      (post) =>
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()),
    )

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const paginatedPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedTag])

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 検索バー */}
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="記事を検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 bg-neon-card border border-neon-border rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-cyan text-neon-text placeholder-neon-muted"
          />
          <MagnifyingGlassIcon className="absolute left-4 top-3.5 h-5 w-5 text-neon-muted" />
        </div>
      </div>

      {/* タグフィルター */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-1 h-6 bg-neon-cyan"></div>
          <h2 className="text-lg font-semibold text-neon-text">タグで絞り込む</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedTag === null
                ? "bg-neon-cyan text-slate-900"
                : "bg-neon-slate text-neon-text hover:bg-neon-card border border-neon-border"
            }`}
          >
            すべて
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedTag === tag
                  ? "bg-neon-cyan text-slate-900"
                  : "bg-neon-slate text-neon-text hover:bg-neon-card border border-neon-border"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* 記事一覧のヘッダー */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-1 h-8 bg-neon-cyan"></div>
        <h1 className="text-2xl font-bold text-neon-text">
          {selectedTag ? `${selectedTag}の記事` : "すべての記事"}
          {searchQuery && ` - "${searchQuery}"`}
          {filteredPosts.length > 0 && (
            <span className="text-neon-muted text-lg ml-2">({filteredPosts.length})</span>
          )}
        </h1>
      </div>

      {/* 記事一覧 */}
      <div className="space-y-1 mb-12">
        {paginatedPosts.length > 0 ? (
          paginatedPosts.map((post, index) => (
            <div key={post.slug}>
              <PostCard post={post} />
              {index < paginatedPosts.length - 1 && (
                <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent my-1"></div>
              )}
            </div>
          ))
        ) : (
          <p className="text-neon-muted text-center py-12">該当する記事が見つかりませんでした。</p>
        )}
      </div>

      {/* ページネーション */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-md border border-neon-border text-neon-text hover:bg-neon-cyan hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>

          <div className="flex gap-1">
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  currentPage === number
                    ? "bg-neon-cyan text-slate-900"
                    : "text-neon-text hover:bg-neon-card border border-neon-border"
                }`}
              >
                {number}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-md border border-neon-border text-neon-text hover:bg-neon-cyan hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  )
}