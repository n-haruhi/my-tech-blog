import Image from 'next/image'
import Link from 'next/link'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline'

export default function MentalHealthTrackerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* パンくずリスト */}
      <div className="mb-6 text-sm text-neon-muted">
        <Link href="/portfolio" className="hover:text-neon-cyan transition-colors duration-300">
          Portfolio
        </Link>
        <span className="mx-2">/</span>
        <span className="text-neon-text">Mental Health Tracker</span>
      </div>

      {/* プロジェクトタイトル */}
      <div className="mb-8">
        <h1 className="text-neon-text text-2xl sm:text-3xl font-bold mb-4">Mental Health Tracker</h1>
        <p className="text-neon-muted text-base sm:text-lg">
          日々のメンタルヘルスを記録し、セルフケアをサポートするWebアプリケーション
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {['Laravel', 'PHP', 'PostgreSQL', 'Tailwind CSS', 'Alpine.js', 'Chart.js'].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm bg-neon-blue/20 text-neon-cyan border border-neon-blue/30 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* リンク */}
      <div className="mb-8">
        <a
          href="https://mental-health-tracker.up.railway.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-6 py-3 bg-neon-cyan/20 hover:bg-neon-cyan/30 text-neon-cyan border border-neon-cyan rounded-lg transition-colors duration-300"
        >
          見に行く
          <ChevronRightIcon className="w-5 h-5" />
        </a>
      </div>

      {/* スクリーンショット */}
      <section className="bg-neon-card rounded-lg shadow-lg border border-neon-border p-4 sm:p-6 mb-8">
        <h2 className="text-neon-text text-xl font-semibold mb-4">実際の画面の様子</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-neon-cyan text-lg mb-2">ダッシュボード</h3>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-neon-border">
              <Image
                src="/images/portfolio/mental-health-tracker-dashboard.png"
                alt="ダッシュボード画面"
                fill
                className="object-contain bg-gray-900"
              />
            </div>
          </div>
          <div>
            <h3 className="text-neon-cyan text-lg mb-2">記録一覧</h3>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-neon-border">
              <Image
                src="/images/portfolio/mental-health-tracker-records.png"
                alt="記録一覧画面"
                fill
                className="object-contain bg-gray-900"
              />
            </div>
          </div>
        </div>
      </section>

      {/* プロジェクト概要 */}
      <section className="bg-neon-card rounded-lg shadow-lg border border-neon-border p-4 sm:p-6 mb-8">
        <h2 className="text-neon-text text-xl font-semibold mb-4">プロジェクト概要</h2>
        <p className="text-neon-muted leading-relaxed">
          日々の気分、睡眠時間、服薬状況などを記録し、必要に応じて認知行動療法の手法を用いて思考を整理することができます。
          自己管理とメンタルヘルスケアをサポートするツールです。<br />
          データをグラフで可視化することで、自分の心の状態を客観的に振り返ることができます。
        </p>
      </section>

      {/* 主な機能 */}
      <section className="bg-neon-card rounded-lg shadow-lg border border-neon-border p-4 sm:p-6 mb-8">
        <h2 className="text-neon-text text-xl font-semibold mb-4">主な機能</h2>
        
        <div className="space-y-6">
          {/* ダッシュボード */}
          <div>
            <h3 className="text-neon-cyan text-lg font-medium mb-2">ダッシュボード</h3>
            <ul className="space-y-1 text-neon-muted ml-4">
              <li className="flex items-start">
                <span className="text-neon-cyan mr-2">•</span>
                <span>統計情報の表示（総記録数、今週の平均気分・睡眠・服薬率）</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-cyan mr-2">•</span>
                <span>過去7日間の気分推移グラフ</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-cyan mr-2">•</span>
                <span>最近の記録3件の表示</span>
              </li>
            </ul>
          </div>

          {/* メンタルヘルス記録 */}
          <div>
            <h3 className="text-neon-cyan text-lg font-medium mb-2">メンタルヘルス記録</h3>
            <ul className="space-y-1 text-neon-muted ml-4">
              <li className="flex items-start">
                <span className="text-neon-cyan mr-2">•</span>
                <span>気分スコア（1〜10段階）、睡眠時間、服薬記録、日記・メモの記録</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-cyan mr-2">•</span>
                <span>過去30日間の推移グラフ（気分スコア・睡眠時間）</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-cyan mr-2">•</span>
                <span>記録の作成・編集・削除機能</span>
              </li>
            </ul>
          </div>

          {/* 薬の管理 */}
          <div>
            <h3 className="text-neon-cyan text-lg font-medium mb-2">薬の管理</h3>
            <ul className="space-y-1 text-neon-muted ml-4">
              <li className="flex items-start">
                <span className="text-neon-cyan mr-2">•</span>
                <span>服用中の薬の登録・編集・削除（名前・用量・服用タイミング・メモ）</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-cyan mr-2">•</span>
                <span>服用タイミング別（朝/昼/夕/夜/就寝前）の管理</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-cyan mr-2">•</span>
                <span>使用中/停止中のステータス管理</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-cyan mr-2">•</span>
                <span>記録作成時に登録済みの薬から選択可能</span>
              </li>
            </ul>
          </div>

          {/* 心の整理（認知行動療法） */}
          <div>
            <h3 className="text-neon-cyan text-lg font-medium mb-2">心の整理（認知行動療法）</h3>
            <ul className="space-y-1 text-neon-muted ml-4">
              <li className="flex items-start">
                <span className="text-neon-cyan mr-2">•</span>
                <span>7つのコラム法による思考記録（状況、気分・感情、自動思考、根拠、反証、適応的思考、その後の気分）</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-cyan mr-2">•</span>
                <span>部分的な記入でも保存可能</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-cyan mr-2">•</span>
                <span>ヘルプ機能で使い方を確認可能</span>
              </li>
            </ul>
          </div>

          {/* 認証・セキュリティ */}
          <div>
            <h3 className="text-neon-cyan text-lg font-medium mb-2">認証・セキュリティ</h3>
            <ul className="space-y-1 text-neon-muted ml-4">
              <li className="flex items-start">
                <span className="text-neon-cyan mr-2">•</span>
                <span>ユーザー登録・ログイン機能</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-cyan mr-2">•</span>
                <span>プロフィール管理</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-cyan mr-2">•</span>
                <span>自分の記録のみ閲覧・編集可能</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 使用技術 */}
      <section className="bg-neon-card rounded-lg shadow-lg border border-neon-border p-4 sm:p-6 mb-8">
        <h2 className="text-neon-text text-xl font-semibold mb-4">使用技術</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-neon-cyan text-lg font-medium mb-2">バックエンド</h3>
            <ul className="text-neon-muted space-y-1">
              <li>• PHP 8.3</li>
              <li>• Laravel 12</li>
              <li>• PostgreSQL</li>
              <li>• Laravel Breeze（認証機能）</li>
            </ul>
          </div>
          <div>
            <h3 className="text-neon-cyan text-lg font-medium mb-2">フロントエンド</h3>
            <ul className="text-neon-muted space-y-1">
              <li>• Blade（テンプレートエンジン）</li>
              <li>• Tailwind CSS（スタイリング）</li>
              <li>• Alpine.js（軽量JavaScriptフレームワーク）</li>
              <li>• Chart.js（グラフ描画）</li>
            </ul>
          </div>
          <div>
            <h3 className="text-neon-cyan text-lg font-medium mb-2">インフラ・開発環境</h3>
            <ul className="text-neon-muted space-y-1">
              <li>• Railway（デプロイ・ホスティング）</li>
              <li>• WSL2 (Ubuntu)</li>
              <li>• VSCode</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 工夫した点 */}
      <section className="bg-neon-card rounded-lg shadow-lg border border-neon-border p-4 sm:p-6 mb-8">
        <h2 className="text-neon-text text-xl font-semibold mb-4">工夫した点</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-neon-cyan text-lg font-medium mb-2">1. 継続しやすいUI設計</h3>
            <p className="text-neon-muted">
              記録作業が負担にならないよう、シンプルで分かりやすいUIを心がけました。
              必須項目を最低限にし、部分的な入力でも保存できる設計で手軽に記録できるようにしています。
            </p>
          </div>
          <div>
            <h3 className="text-neon-cyan text-lg font-medium mb-2">2. 多角的なアプローチ</h3>
            <p className="text-neon-muted">
              単なる記録だけでなく、認知行動療法の7つのコラム法を取り入れることで、
              思考パターンを客観的に見つめ直す機会を提供しています。
            </p>
          </div>
          <div>
            <h3 className="text-neon-cyan text-lg font-medium mb-2">3. データの可視化</h3>
            <p className="text-neon-muted">
              Chart.jsを使用して、気分の推移や睡眠時間の変化をグラフで表示しているため、
              視覚的に自分の状態を把握できるようにしています。
            </p>
          </div>
          <div>
            <h3 className="text-neon-cyan text-lg font-medium mb-2">4. 柔軟な服薬管理</h3>
            <p className="text-neon-muted">
              定期的な服薬だけでなく、頓服や一時的な薬も記録可能です。
              朝/昼/夕/夜などタイミング別の管理ができるため、服薬状況を柔軟に管理できます。
            </p>
          </div>
        </div>
      </section>

      {/* 開発の背景 */}
      <section className="bg-neon-card rounded-lg shadow-lg border border-neon-border p-4 sm:p-6 mb-8">
        <h2 className="text-neon-text text-xl font-semibold mb-4">開発の背景</h2>
        <p className="text-neon-muted leading-relaxed mb-3">
          これまで学んできた心理学や福祉の視点、自身の経験などを生かして、
          身近な人たちのセルフケアをサポートできるツールを作りたいと考え、開発しました。
        </p>
        <p className="text-neon-muted leading-relaxed">
          また、Laravel/PHPの学習とCRUD操作の実装経験を積む目的も兼ねており、
          実用的なアプリケーション開発を通じて技術を学んでいます。
        </p>
      </section>

      {/* 戻るリンク */}
      <div className="mt-8">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-1 text-neon-cyan hover:text-neon-blue transition-colors duration-300"
        >
          <ChevronLeftIcon className="w-5 h-5" />
          ポートフォリオ一覧に戻る
        </Link>
      </div>
    </div>
  )
}