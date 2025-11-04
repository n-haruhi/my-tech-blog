import type React from "react"
import Header from "@/components/Header"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-neon-dark text-neon-text">
      <Header />
      {/* メインコンテンツエリア */}
      <div className="flex-grow">
        <main className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">{children}</main>
      </div>
      {/* フッター */}
      <footer className="bg-neon-slate border-t border-neon-border mt-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-neon-text">
          <p className="text-neon-muted text-sm sm:text-base">© {new Date().getFullYear()} pen2</p>
        </div>
      </footer>
    </div>
  )
}
