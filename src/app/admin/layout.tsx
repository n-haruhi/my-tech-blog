import Link from 'next/link'
import AdminHeader from '@/components/AdminHeader'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-neon-dark">
      <AdminHeader />
      <div className="flex">
        {/* サイドバー */}
        <nav className="w-64 bg-neon-card border-r border-neon-border min-h-screen">
          <div className="p-4">
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
              <li className="pt-4 border-t border-neon-border">
                <Link
                  href="/"
                  className="block px-3 py-2 rounded-lg text-neon-muted hover:bg-neon-slate transition-colors duration-300"
                >
                  サイトを見る
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* メインコンテンツ */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}