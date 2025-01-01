import TableOfContents from '@/components/TableOfContents'
import ProfileSidebar from '@/components/ProfileSidebar'

export default function PostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex-grow flex justify-center">
      <div className="max-w-[1440px] w-full px-4">
        <div className="flex justify-center gap-6">
          {/* 左サイドバー (目次) - モバイルでは非表示 */}
          <aside className="hidden md:block w-[280px] py-8 sticky top-0 h-fit shrink-0">
            <TableOfContents />
          </aside>

          {/* メインコンテンツ */}
          <main className="w-[760px] py-8 shrink-0">
            {children}
          </main>

          {/* 右サイドバー (プロフィール) - モバイルでは非表示 */}
          <div className="hidden lg:block w-[200px] py-8 sticky top-0 h-fit shrink-0">
            <ProfileSidebar />
          </div>
        </div>
      </div>
    </div>
  )
}