'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeftIcon, PencilIcon, EyeIcon } from '@heroicons/react/24/outline'
import { Post } from '@/lib/posts'

type Props = {
  params: Promise<{
    slug: string
  }>
}

export default function EditPost({ params }: Props) {
  const [slug, setSlug] = useState<string>('')
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    tags: '',
    excerpt: '',
    content: '',
  })
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  // パラメータとデータの取得
  useEffect(() => {
    const loadData = async () => {
      try {
        const resolvedParams = await params
        setSlug(resolvedParams.slug)
        
        const response = await fetch(`/api/admin/posts/${resolvedParams.slug}`)
        
        if (response.ok) {
          const data = await response.json()
          const post: Post = data.post
          
          setFormData({
            title: post.title,
            date: post.date,
            tags: post.tags.join(', '),
            excerpt: post.excerpt,
            content: post.content,
          })
        } else {
          setError('記事が見つかりませんでした')
        }
      } catch (err) {
        console.error('Error fetching post:', err)
        setError('記事の取得に失敗しました')
      } finally {
        setFetchLoading(false)
      }
    }

    loadData()
  }, [params])

  // フォーム入力の処理
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // フォーム送信の処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // タグを配列に変換（カンマ区切り）
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)

      const postData = {
        title: formData.title,
        date: formData.date,
        tags: tagsArray,
        excerpt: formData.excerpt,
        content: formData.content,
      }

      const response = await fetch(`/api/admin/posts/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })

      if (response.ok) {
        // 更新成功時は記事管理ページにリダイレクト
        router.push('/admin/posts')
      } else {
        const data = await response.json()
        if (data.details && Array.isArray(data.details)) {
          setError(data.details.join(', '))
        } else {
          setError(data.error || '記事の更新に失敗しました')
        }
      }
    } catch (err) {
      console.error('Error updating post:', err)
      setError('記事の更新に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-neon-text">記事を読み込み中...</div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 px-4 sm:px-0">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Link
          href="/admin/posts"
          className="flex items-center gap-2 text-neon-muted hover:text-neon-text transition-colors duration-300"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          記事一覧に戻る
        </Link>
        <div className="flex items-center gap-3">
          <PencilIcon className="h-8 w-8 text-neon-cyan" />
          <h1 className="text-2xl sm:text-3xl font-bold text-neon-text">記事編集</h1>
        </div>
        {slug && (
          <Link
            href={`/posts/${slug}`}
            className="flex items-center gap-2 text-neon-muted hover:text-neon-cyan transition-colors duration-300 ml-auto"
          >
            <EyeIcon className="h-5 w-5" />
            プレビュー
          </Link>
        )}
      </div>

      {/* エラー表示 */}
      {error && (
        <div className="bg-red-400/10 border border-red-400/20 rounded-lg p-4">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* フォーム */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-neon-card border border-neon-border rounded-lg p-6 space-y-6">
          {/* タイトル */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-neon-text mb-2">
              タイトル <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-neon-slate border border-neon-border rounded-lg text-neon-text placeholder-neon-muted focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent"
              placeholder="記事のタイトルを入力してください"
              required
            />
          </div>

          {/* 日付とタグ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-neon-text mb-2">
                投稿日 <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-neon-slate border border-neon-border rounded-lg text-neon-text focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent"
                required
              />
            </div>
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-neon-text mb-2">
                タグ <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-neon-slate border border-neon-border rounded-lg text-neon-text placeholder-neon-muted focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent"
                placeholder="React, Next.js, TypeScript (カンマ区切り)"
                required
              />
              <p className="mt-1 text-xs text-neon-muted">カンマ（,）で区切って複数のタグを入力できます</p>
            </div>
          </div>

          {/* 概要 */}
          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-neon-text mb-2">
              概要 <span className="text-red-400">*</span>
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 bg-neon-slate border border-neon-border rounded-lg text-neon-text placeholder-neon-muted focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent resize-vertical"
              placeholder="記事の概要を入力してください（記事一覧で表示されます）"
              required
            />
            <p className="mt-1 text-xs text-neon-muted">
              文字数: {formData.excerpt.length} / 200文字推奨
            </p>
          </div>
        </div>

        {/* 本文 */}
        <div className="bg-neon-card border border-neon-border rounded-lg p-6">
          <label htmlFor="content" className="block text-sm font-medium text-neon-text mb-2">
            本文 <span className="text-red-400">*</span>
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            rows={20}
            className="w-full px-4 py-3 bg-neon-slate border border-neon-border rounded-lg text-neon-text placeholder-neon-muted focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent resize-vertical font-mono text-sm leading-relaxed"
            placeholder="マークダウン形式で記事の本文を入力してください..."
            required
          />
          <div className="mt-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <p className="text-xs text-neon-muted">
              マークダウン記法が使用できます（#見出し、**太字**、[リンク](URL)など）
            </p>
            <p className="text-xs text-neon-muted">
              文字数: {formData.content.length}
            </p>
          </div>
        </div>

        {/* 送信ボタン */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <Link
            href="/admin/posts"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-neon-slate hover:bg-neon-card text-neon-text font-semibold rounded-lg border border-neon-border transition-colors duration-300"
          >
            キャンセル
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-neon-cyan hover:bg-neon-blue text-neon-dark font-semibold rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-neon-dark border-t-transparent rounded-full"></div>
                更新中...
              </>
            ) : (
              <>
                <PencilIcon className="h-5 w-5" />
                記事を更新
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}