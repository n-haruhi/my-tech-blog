import type React from "react"
import Header from "@/components/Header"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
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
  )
}