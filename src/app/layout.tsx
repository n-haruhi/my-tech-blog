import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tech Blog",
  description: "技術ブログ",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-gray-50`}>
        <div className="min-h-screen flex flex-col">
          {/* ヘッダー */}
          <header className="bg-white shadow-sm">
            <nav className="max-w-4xl mx-auto px-4 py-4">
              <div className="flex justify-between items-center">
                <a href="/" className="text-xl font-bold">Tech Blog</a>
                <div className="space-x-4">
                  <a href="/posts" className="hover:text-gray-600">記事一覧</a>
                  <a href="/about" className="hover:text-gray-600">About</a>
                </div>
              </div>
            </nav>
          </header>

          {/* メインコンテンツ */}
          <main className="flex-grow max-w-4xl w-full mx-auto px-4 py-8">
            {children}
          </main>

          {/* フッター */}
          <footer className="bg-white border-t mt-auto">
            <div className="max-w-4xl mx-auto px-4 py-6 text-center text-gray-600">
              <p>© {new Date().getFullYear()} Tech Blog. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}