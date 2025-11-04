"use client"
import type React from "react"
import Link from "next/link"
import AdminHeader from "@/components/AdminHeader"
import { useState } from "react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-neon-dark flex flex-col">
      <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />
      <div className="flex flex-1">
        {/* デスクトップ用サイドバー */}
        <nav className="hidden md:block w-64 bg-neon-card border-r border-neon-border min-h-full py-6 px-4">
          <div className="p-2">
            <h2 className="text-lg font-semibold text-neon-text mb-4">管理メニュー</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/admin"
                  className="block px-3 py-2 rounded-lg text-neon-text hover:bg-neon-slate transition-colors duration-300"
                >
                  ダッシュボード
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/posts"
                  className="block px-3 py-2 rounded-lg text-neon-text hover:bg-neon-slate transition-colors duration-300"
                >
                  記事管理
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/posts/new"
                  className="block px-3 py-2 rounded-lg text-neon-text hover:bg-neon-slate transition-colors duration-300"
                >
                  新規記事作成
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/profile"
                  className="block px-3 py-2 rounded-lg text-neon-text hover:bg-neon-slate transition-colors duration-300"
                >
                  プロフィール編集
                </Link>
              </li>
              <li className="pt-4 mt-4 border-t border-neon-border">
                <Link
                  href="/"
                  className="block px-3 py-2 rounded-lg text-neon-text hover:bg-neon-slate transition-colors duration-300"
                >
                  サイトを見る
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* モバイル用サイドバー */}
        {isSidebarOpen && (
          <>
            {/* オーバーレイ */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
            {/* サイドバー */}
            <div className="fixed left-0 top-0 h-full w-64 bg-neon-card border-r border-neon-border p-4 pt-20 z-50 md:hidden transform transition-transform duration-300">
              <h2 className="text-lg font-semibold text-neon-text mb-4">管理メニュー</h2>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/admin"
                    className="block px-3 py-2 rounded-lg text-neon-text hover:bg-neon-slate transition-colors duration-300"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    ダッシュボード
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/posts"
                    className="block px-3 py-2 rounded-lg text-neon-text hover:bg-neon-slate transition-colors duration-300"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    記事管理
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/posts/new"
                    className="block px-3 py-2 rounded-lg text-neon-text hover:bg-neon-slate transition-colors duration-300"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    新規記事作成
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/profile"
                    className="block px-3 py-2 rounded-lg text-neon-text hover:bg-neon-slate transition-colors duration-300"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    プロフィール編集
                  </Link>
                </li>
                <li className="pt-4 mt-4 border-t border-neon-border">
                  <Link
                    href="/"
                    className="block px-3 py-2 rounded-lg text-neon-text hover:bg-neon-slate transition-colors duration-300"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    サイトを見る
                  </Link>
                </li>
              </ul>
            </div>
          </>
        )}

        {/* メインコンテンツ */}
        <main className="flex-1 overflow-x-auto p-4 sm:p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}