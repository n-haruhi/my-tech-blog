import Link from 'next/link'
import { getSortedPostsData } from '@/lib/posts'
import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function AdminDashboard() {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/auth/login')
  }

  const posts = getSortedPostsData()
  const totalPosts = posts.length

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-neon-text">管理画面ダッシュボード</h1>
        <div className="text-neon-muted">
          ようこそ、{user.userId}さん
        </div>
      </div>

      {/* 統計情報 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-neon-card border border-neon-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-neon-text mb-2">総記事数</h3>
          <p className="text-3xl font-bold text-neon-cyan">{totalPosts}</p>
        </div>
        <div className="bg-neon-card border border-neon-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-neon-text mb-2">最新記事</h3>
          <p className="text-neon-muted">
            {posts[0]?.title.slice(0, 30)}...
          </p>
        </div>
        <div className="bg-neon-card border border-neon-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-neon-text mb-2">ステータス</h3>
          <p className="text-green-400">オンライン</p>
        </div>
      </div>

      {/* クイックアクション */}
      <div className="bg-neon-card border border-neon-border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-neon-text mb-4">クイックアクション</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/posts/new"
            className="bg-neon-cyan hover:bg-neon-blue text-neon-dark font-semibold py-3 px-4 rounded-lg transition-colors duration-300 text-center"
          >
            新規記事作成
          </Link>
          <Link
            href="/admin/posts"
            className="bg-neon-slate hover:bg-neon-card text-neon-text font-semibold py-3 px-4 rounded-lg border border-neon-border transition-colors duration-300 text-center"
          >
            記事管理
          </Link>
          <Link
            href="/admin/profile"
            className="bg-neon-slate hover:bg-neon-card text-neon-text font-semibold py-3 px-4 rounded-lg border border-neon-border transition-colors duration-300 text-center"
          >
            プロフィール編集
          </Link>
          <Link
            href="/"
            className="bg-neon-slate hover:bg-neon-card text-neon-text font-semibold py-3 px-4 rounded-lg border border-neon-border transition-colors duration-300 text-center"
          >
            サイトを見る
          </Link>
        </div>
      </div>

      {/* 最近の記事 */}
      <div className="bg-neon-card border border-neon-border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-neon-text mb-4">最近の記事</h2>
        <div className="space-y-3">
          {posts.slice(0, 5).map((post) => (
            <div key={post.slug} className="flex justify-between items-center py-2 border-b border-neon-border last:border-b-0">
              <div>
                <h3 className="text-neon-text font-medium">{post.title}</h3>
                <p className="text-sm text-neon-muted">{post.date}</p>
              </div>
              <Link
                href={`/admin/posts/${post.slug}/edit`}
                className="text-neon-cyan hover:text-neon-blue transition-colors duration-300"
              >
                編集
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}