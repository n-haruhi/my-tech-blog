import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: 'Tech Blog',
    template: '%s | Tech Blog'
  },
  description: 'フロントエンド開発とシステム設計についての技術ブログ',
  openGraph: {
    title: 'Tech Blog',
    description: 'フロントエンド開発とシステム設計についての技術ブログ',
    url: 'https://your-domain.com', // あとでVercelのURLに更新
    siteName: 'Tech Blog',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tech Blog',
    description: 'フロントエンド開発とシステム設計についての技術ブログ',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-[#efece7]`}>
        <div className="min-h-screen flex flex-col">
          {/* ヘッダー */}
          <header className="bg-[#fcfaf7] shadow-sm">
            <nav className="max-w-4xl mx-auto px-4 py-4">
              <div className="flex justify-between items-center">
                <a href="/" className="text-xl font-bold text-[#000000] hover:text-[#555555]">pen2 Tech Blog</a>
                <div className="space-x-4">
                  <a href="/posts" className="text-[#000000] hover:text-[#555555]">Article</a>
                  <a href="/about" className="text-[#000000] hover:text-[#555555]">Profile</a>
                </div>
              </div>
            </nav>
          </header>

          {/* メインコンテンツ */}
          <main className="flex-grow max-w-4xl w-full mx-auto px-4 py-8">
            {children}
          </main>

          {/* フッター */}
          <footer className="bg-[#ae8b69] border-t mt-auto">
            <div className="max-w-4xl mx-auto px-4 py-6 text-center text-[#000000]">
              <p>© {new Date().getFullYear()} Tech Blog. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}