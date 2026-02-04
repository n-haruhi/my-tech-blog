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
    date: '2026-02-04',
    title: 'ポートフォリオページの追加',
    description: '制作したプロジェクトを紹介するポートフォリオページを新設。プロジェクト一覧と個別詳細ページを実装し、Mental Health Trackerを最初のプロジェクトとして掲載しました。',
    category: 'feature'
  },
  {
    date: '2025-07-22',
    title: '管理画面機能の実装',
    description: 'ブラウザ上で記事が管理できるように管理画面を実装。JWT認証、記事のCRUD操作（作成・編集・削除）、レスポンシブ対応のマークダウンエディタを追加。これまでVSCodeを開いて記事の移行など行っていたのを今後はブラウザからサイトを開き直接記事を投稿・編集できるようになりました。',
    category: 'feature'
  },
  {
    date: '2025-07-17',
    title: 'ネオンカラーテーマの適用',
    description: 'サイト全体のデザインをダークテーマのネオンカラーに変更。記事ページ、ヘッダー、各カード、ナビゲーションなど全コンポーネントのカラーパレットを統一し、よりモダンで少しサイバー味あるデザインに改良しました。',
    category: 'improvement'
  },
  {
    date: '2025-01-03',
    title: 'Development Logページの追加',
    description: 'サイトの開発過程や更新内容を時系列で確認できる Development Log ページを追加。新機能や改善点、リリース情報などの開発履歴を記録していきます。',
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
    description: 'これまで別サイトに投稿していた記事を移行して公開。記事検索機能、タグフィルタリング、ページネーション、マークダウンによる記事管理などの基本機能を実装しました。',
    category: 'release'
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ページヘッダー */}
      <div className="flex items-center gap-3 mb-12">
        <BellAlertIcon className="h-7 w-7 text-neon-cyan animate-bell-ring" />
        <h1 className="text-2xl sm:text-3xl font-bold text-neon-text">Development Log</h1>
      </div>
      
      {/* タイムライン */}
      <div className="space-y-6">
        {changelog.map((item, index) => (
          <article 
            key={index} 
            className="bg-neon-card rounded-lg border border-neon-border p-6 hover:border-neon-cyan transition-colors duration-300"
          >
            {/* タイトルと日付 */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <h2 className="text-neon-text text-xl font-semibold">{item.title}</h2>
              <time className="text-sm text-neon-muted whitespace-nowrap px-3 py-1 bg-neon-slate rounded-md">
                {item.date}
              </time>
            </div>
            
            {/* カテゴリバッジ */}
            <div className="mb-4">
              <span className={`inline-block px-3 py-1 text-sm rounded-full font-medium ${
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
            
            {/* 説明 */}
            <p className="text-neon-muted leading-relaxed mb-4">{item.description}</p>
            
            {/* 関連記事リンク */}
            {item.relatedPost && (
              <div className="text-sm pt-4 border-t border-neon-border">
                <span className="text-neon-muted">関連記事: </span>
                <Link 
                  href={`/posts/${item.relatedPost.slug}`}
                  className="text-neon-cyan hover:text-neon-blue transition-colors duration-300 font-medium"
                >
                  {item.relatedPost.title} →
                </Link>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}