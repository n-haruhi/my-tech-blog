'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AdminHeader() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    setLoading(true)
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
      })
      router.push('/auth/login')
      router.refresh()
    } catch (error) {
      console.error('ログアウトエラー:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <header className="bg-neon-card border-b border-neon-border">
      <div className="flex justify-between items-center px-8 py-4">
        <div className="flex items-center space-x-4">
          <Link href="/admin" className="text-xl font-bold text-neon-text">
            管理画面
          </Link>
          <span className="text-neon-muted">|</span>
          <Link href="/" className="text-neon-muted hover:text-neon-text transition-colors">
            サイトを見る
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-neon-muted">管理者</span>
          <button
            onClick={handleLogout}
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 disabled:opacity-50"
          >
            {loading ? 'ログアウト中...' : 'ログアウト'}
          </button>
        </div>
      </div>
    </header>
  )
}