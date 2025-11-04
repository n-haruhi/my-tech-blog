'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Post } from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import { PencilIcon, TrashIcon, PlusIcon, EyeIcon } from '@heroicons/react/24/outline'

export default function AdminPostsList() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null)
  const [error, setError] = useState('')

  // 記事一覧を取得
  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/posts')
      
      if (response.ok) {
        const data = await response.json()
        setPosts(data.posts)
      } else {
        setError('記事一覧の取得に失敗しました')
      }
    } catch (err) {
      console.error('Error fetching posts:', err)
      setError('記事一覧の取得に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  // 記事を削除
  const handleDelete = async (slug: string, title: string) => {
    if (!confirm(`「${title}」を削除しますか？この操作は取り消せません。`)) {
      return
    }

    try {
      setDeleteLoading(slug)
      const response = await fetch(`/api/admin/posts/${slug}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        // 削除成功時、一覧を再取得
        await fetchPosts()
      } else {
        const data = await response.json()
        setError(data.error || '記事の削除に失敗しました')
      }
    } catch (err) {
      console.error('Error deleting post:', err)
      setError('記事の削除に失敗しました')
    } finally {
      setDeleteLoading(null)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-neon-text">読み込み中...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-neon-text">記事管理</h1>
        <Link
          href="/admin/posts/new"
          className="flex items-center gap-2 bg-neon-cyan hover:bg-neon-blue text-neon-dark font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          <PlusIcon className="h-5 w-5" />
          新規記事作成
        </Link>
      </div>

      {/* エラー表示 */}
      {error && (
        <div className="bg-red-400/10 border border-red-400/20 rounded-lg p-4">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* 統計情報 */}
      <div className="bg-neon-card border border-neon-border rounded-lg p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-neon-cyan">{posts.length}</p>
            <p className="text-sm text-neon-muted">総記事数</p>
          </div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-neon-cyan">
              {new Set(posts.flatMap(post => post.tags)).size}
            </p>
            <p className="text-sm text-neon-muted">総タグ数</p>
          </div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-neon-cyan">
              {posts.length > 0 ? formatDate(posts[0].date) : '-'}
            </p>
            <p className="text-sm text-neon-muted">最新投稿日</p>
          </div>
        </div>
      </div>

      {/* 記事一覧 */}
      <div className="bg-neon-card border border-neon-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neon-slate">
              <tr>
                <th className="text-left py-3 px-4 sm:px-6 text-neon-text font-semibold">タイトル</th>
                <th className="text-left py-3 px-4 text-neon-text font-semibold hidden sm:table-cell">日付</th>
                <th className="text-left py-3 px-4 text-neon-text font-semibold hidden lg:table-cell">タグ</th>
                <th className="text-center py-3 px-4 text-neon-text font-semibold">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neon-border">
              {posts.map((post) => (
                <tr key={post.slug} className="hover:bg-neon-slate/50 transition-colors duration-200">
                  <td className="py-4 px-4 sm:px-6">
                    <div className="space-y-1">
                      <h3 className="font-medium text-neon-text line-clamp-2">{post.title}</h3>
                      <p className="text-sm text-neon-muted line-clamp-1">{post.excerpt}</p>
                      {/* モバイル表示用の日付 */}
                      <p className="text-xs text-neon-muted sm:hidden">{formatDate(post.date)}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-neon-muted hidden sm:table-cell">
                    {formatDate(post.date)}
                  </td>
                  <td className="py-4 px-4 hidden lg:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="bg-neon-slate text-neon-cyan text-xs px-2 py-1 rounded-full border border-neon-border"
                        >
                          #{tag}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="text-xs text-neon-muted">+{post.tags.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-1 sm:gap-2">
                      <Link
                        href={`/posts/${post.slug}`}
                        className="p-2 text-neon-muted hover:text-neon-text hover:bg-neon-slate rounded-lg transition-colors duration-300"
                        title="プレビュー"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/admin/posts/${post.slug}/edit`}
                        className="p-2 text-neon-cyan hover:text-neon-blue hover:bg-neon-slate rounded-lg transition-colors duration-300"
                        title="編集"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.slug, post.title)}
                        disabled={deleteLoading === post.slug}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-neon-slate rounded-lg transition-colors duration-300 disabled:opacity-50"
                        title="削除"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12 text-neon-muted">
            記事がありません。最初の記事を作成してみましょう。
          </div>
        )}
      </div>
    </div>
  )
}