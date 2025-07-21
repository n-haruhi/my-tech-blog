"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    setLoading(true)
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
      })
      router.push("/auth/login")
      router.refresh()
    } catch (error) {
      console.error("ログアウトエラー:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <header className="bg-neon-slate border-b border-neon-border shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 sm:px-6 md:px-8 py-3 sm:py-4">
        {/* モバイル用ハンバーガーメニューボタン */}
        <div className="md:hidden">
          <button
            onClick={onMenuClick}
            className="p-2 text-neon-text hover:bg-neon-card rounded-md transition-colors duration-300"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="sr-only">メニューを開く</span>
          </button>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <Link href="/admin" className="text-lg sm:text-xl font-bold text-neon-text hover:text-neon-cyan transition-colors">
            管理画面
          </Link>
          <span className="text-neon-muted hidden sm:inline">|</span>
          <Link href="/" className="text-neon-muted hover:text-neon-text transition-colors text-sm hidden sm:inline">
            サイトを見る
          </Link>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <span className="text-neon-muted text-xs sm:text-sm hidden sm:inline">管理者</span>
          <button
            onClick={handleLogout}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-colors duration-300 disabled:opacity-50 shadow-sm text-sm"
          >
            {loading ? "ログアウト中..." : "ログアウト"}
          </button>
        </div>
      </div>
    </header>
  )
}