import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
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
        {children}
      </body>
    </html>
  )
}
