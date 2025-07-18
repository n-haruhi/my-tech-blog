import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "@/components/Header"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "pen2 Tech Blog",
    template: "%s | Tech Blog",
  },
  description:
    "フロントエンド開発、React、TypeScript、Next.jsを中心とした技術情報とシステム設計のベストプラクティスを発信。エンジニアとしての学びや知見、開発プロセスでの気づきを共有する技術ブログ。",
  openGraph: {
    title: "Tech Blog",
    description:
      "フロントエンド開発、React、TypeScript、Next.jsを中心とした技術情報とシステム設計のベストプラクティスを発信。エンジニアとしての学びや知見、開発プロセスでの気づきを共有する技術ブログ。",
    url: "https://my-tech-blog-fxsn.vercel.app/",
    siteName: "Tech Blog",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Blog",
    description:
      "フロントエンド開発、React、TypeScript、Next.jsを中心とした技術情報とシステム設計のベストプラクティスを発信。エンジニアとしての学びや知見、開発プロセスでの気づきを共有する技術ブログ。",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-neon-dark`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          {/* メインコンテンツエリア */}
          <div className="flex-grow">
            <main className="max-w-4xl w-full mx-auto px-4 py-8">{children}</main>
          </div>
          {/* フッター */}
          <footer className="bg-neon-slate border-t border-neon-border mt-auto">
            <div className="max-w-4xl mx-auto px-4 py-6 text-center text-neon-text">
              <p className="text-neon-muted">© {new Date().getFullYear()} pen2</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
