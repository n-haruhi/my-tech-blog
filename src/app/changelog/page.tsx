import { BellAlertIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

type ChangelogItem = {
  date: string
  title: string
  description: string
  category: 'feature' | 'improvement' | 'fix' | 'release'
  relatedPost?: {
    slug: string
    title: string
  }
}

const changelog: ChangelogItem[] = [
  {
    date: '2025-01-03',
    title: 'Development Logページの追加',
    description: 'サイトの開発過程や更新内容を時系列で確認できるDevelopment Logページを追加。新機能の実装や改善点、リリース情報などの開発履歴を今後も記録していきます。',
    category: 'feature'
  },
  {
    date: '2024-01-02',
    title: 'レスポンシブデザインの改善',
    description: 'モバイル端末での表示を改善。ハンバーガーメニューの実装とスライドアニメーションを追加しました。',
    category: 'improvement'
  },
  {
    date: '2025-01-01',
    title: 'サイト公開 (v1.0.0)',
    description: 'Next.js, TypeScript, Tailwind CSSを使用した技術ブログを公開。記事の検索機能、タグフィルタリング、ページネーション、マークダウンによる記事管理などの基本機能を実装しました。',
    category: 'release',
    // relatedPost: {
    //   slug: 'twenty-first-post',
    //   title: 'Next.jsでブログを作る方法'
    // }
  },
  {
    date: '2024-12-31',
    title: 'プロジェクト開始',
    description: 'Next.jsとTypeScriptを使用した技術ブログの開発をスタート。フロントエンド開発とシステム設計に関する知見を共有するためのプラットフォームとして構築を開始しました。',
    category: 'release'
  }
]

export default function ChangelogPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-8">
        <BellAlertIcon className="h-6 w-6 md:h-7 md:w-7 text-neon-cyan" />
        <h1 className="text-2xl md:text-3xl font-bold text-neon-text">Development Log</h1>
      </div>
      
      <div className="space-y-8">
        {changelog.map((item, index) => (
          <div key={index} className="bg-neon-card rounded-lg shadow-lg border border-neon-border p-6">
            <div className="flex items-start justify-between mb-2">
              <h2 className="text-neon-text text-xl font-semibold">{item.title}</h2>
              <div className="text-sm text-neon-muted">{item.date}</div>
            </div>
            
            <div className="mb-3">
              <span className={`inline-block px-2 py-1 text-sm rounded-full ${
                item.category === 'feature' ? 'bg-neon-blue/20 text-neon-cyan border border-neon-blue/30' :
                item.category === 'improvement' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                item.category === 'fix' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                'bg-purple-500/20 text-purple-400 border border-purple-500/30'
              }`}>
                {item.category === 'feature' ? '新機能' :
                  item.category === 'improvement' ? '改善' :
                  item.category === 'fix' ? 'バグ修正' :
                  'リリース'}
              </span>
            </div>
            
            <p className="text-neon-muted mb-4 leading-relaxed">{item.description}</p>
            
            {item.relatedPost && (
              <div className="text-sm">
                <span className="text-neon-muted">関連記事: </span>
                <Link 
                  href={`/posts/${item.relatedPost.slug}`}
                  className="text-neon-cyan hover:text-neon-blue transition-colors duration-300"
                >
                  {item.relatedPost.title}
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}