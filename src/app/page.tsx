import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-8">
      {/* ヒーローセクション */}
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Tech Blog</h1>
        <p className="text-xl text-gray-600 mb-8">
          フロントエンド開発とシステム設計についての技術ブログ
        </p>
      </section>

      {/* 最新の記事セクション */}
      <section>
        <h2 className="text-2xl font-bold mb-6">最新の記事</h2>
        <div className="grid gap-6">
          {/* ここに後で記事一覧を表示します */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-2">サンプル記事</h3>
            <p className="text-gray-600">この部分は後ほど実際の記事データで置き換えます。</p>
          </div>
        </div>
      </section>
    </div>
  )
}