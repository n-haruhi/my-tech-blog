import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from '@/components/Header'
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
    url: 'https://my-tech-blog-fxsn.vercel.app/', // あとでVercelのURLに更新
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
          <Header />

          {/* メインコンテンツエリア */}
          <div className="flex-grow">
            <main className="max-w-4xl w-full mx-auto px-4 py-8">
              {children}
            </main>
          </div>

          {/* フッター */}
          <footer className="bg-[#ae8b69] border-t mt-auto">
            <div className="max-w-4xl mx-auto px-4 py-6 text-center text-white">
              <p>© {new Date().getFullYear()} pen2</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}