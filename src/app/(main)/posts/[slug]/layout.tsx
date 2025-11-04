"use client"
import { useState } from 'react'
import TableOfContents from '@/components/TableOfContents'
import ProfileSidebar from '@/components/ProfileSidebar'

export default function PostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [showToc, setShowToc] = useState(false)

  return (
    <div className="fixed inset-0 top-16 sm:top-20 bg-neon-dark overflow-y-auto">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 min-h-full">
        {/* タブレット・モバイル用目次 */}
        <div className="lg:hidden mb-4 pt-4">
          <TableOfContents 
            onItemClick={() => setShowToc(false)} 
            collapsible={true}
            isOpen={showToc}
            onToggle={() => setShowToc(!showToc)}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 py-4 lg:py-6">
          {/* 左サイドバー (目次) - デスクトップのみ */}
          <aside className="hidden lg:block lg:w-64">
            <div className="sticky top-4">
              <TableOfContents />
            </div>
          </aside>

          {/* メインコンテンツ */}
          <main className="flex-1 min-w-0">
            {children}
            
            {/* タブレット・モバイル用プロフィール (記事下) */}
            <div className="lg:hidden mt-8">
              <ProfileSidebar alignLeft={true} />
            </div>
          </main>

          {/* 右サイドバー (プロフィール) - デスクトップのみ */}
          <aside className="hidden lg:block w-48">
            <div className="sticky top-4">
              <ProfileSidebar />
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}