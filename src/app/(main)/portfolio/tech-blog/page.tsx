import Image from 'next/image'
import Link from 'next/link'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline'

export default function TechBlogPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* パンくずリスト */}
      <div className="mb-8 text-sm text-neon-muted">
        <Link href="/portfolio" className="hover:text-neon-cyan transition-colors duration-300">
          Portfolio
        </Link>
        <span className="mx-2">/</span>
        <span className="text-neon-text">Tech Blog</span>
      </div>

      {/* プロジェクトタイトル */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-1 h-8 bg-neon-cyan"></div>
          <h1 className="text-neon-text text-2xl sm:text-3xl font-bold">Tech Blog</h1>
        </div>
        <p className="text-neon-muted text-lg">
          Next.js + TypeScriptで構築した個人技術ブログ
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {['Next.js 16', 'TypeScript', 'Tailwind CSS', 'JWT', 'Markdown', 'Vercel'].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm bg-neon-slate text-neon-text border border-neon-border rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* リンク */}
      <div className="flex gap-4 mb-12">
        <a
          href="https://pen2-tech-blog.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-slate-900 rounded-md font-medium transition-all duration-300"
        >
          <span>トップページへ</span>
          <ChevronRightIcon className="w-5 h-5" />
        </a>
        {/* <a
          href="https://github.com/n-haruhi/my-tech-blog"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-neon-border text-neon-text hover:border-neon-cyan hover:text-neon-cyan rounded-md font-medium transition-all duration-300"
        >
          <span>GitHub</span>
          <ChevronRightIcon className="w-5 h-5" />
        </a> */}
      </div>

      {/* スクリーンショット */}
      <section className="bg-neon-card rounded-lg border border-neon-border p-6 mb-8 hover:border-neon-cyan transition-colors duration-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-6 bg-neon-cyan"></div>
          <h2 className="text-neon-text text-xl font-semibold">実際の画面の様子</h2>
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="text-neon-cyan text-lg mb-2">記事一覧</h3>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-neon-border">
              <Image
                src="/images/portfolio/tech-blog-thumbnail.png"
                alt="記事一覧画面"
                fill
                className="object-contain bg-gray-900"
              />
            </div>
          </div>
          <div>
            <h3 className="text-neon-cyan text-lg mb-2">記事詳細</h3>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-neon-border">
              <Image
                src="/images/portfolio/tech-blog-article.png"
                alt="記事詳細画面"
                fill
                className="object-contain bg-gray-900"
              />
            </div>
          </div>
          <div>
            <h3 className="text-neon-cyan text-lg mb-2">開発ログ</h3>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-neon-border">
              <Image
                src="/images/portfolio/tech-blog-devlog.png"
                alt="DevLog画面"
                fill
                className="object-contain bg-gray-900"
              />
            </div>
          </div>
        </div>
      </section>

      {/* プロジェクト概要 */}
      <section className="bg-neon-card rounded-lg border border-neon-border p-6 mb-8 hover:border-neon-cyan transition-colors duration-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-6 bg-neon-cyan"></div>
          <h2 className="text-neon-text text-xl font-semibold">プロジェクト概要</h2>
        </div>
        <p className="text-neon-muted leading-relaxed">
          エンジニアとしての学習内容や技術的な知見をアウトプットするために構築した個人技術ブログです。<br />
          マークダウンファイルベースの記事管理システムと、JWT認証による管理画面を実装しています。<br />
          ZennやQiitaで発信していた内容を移行し、独自のプラットフォームとして運用しています。
        </p>
      </section>

      {/* 主な機能 */}
      <section className="bg-neon-card rounded-lg border border-neon-border p-6 mb-8 hover:border-neon-cyan transition-colors duration-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-6 bg-neon-cyan"></div>
          <h2 className="text-neon-text text-xl font-semibold">主な機能</h2>
        </div>
        
        <div className="space-y-6">
          {/* 記事表示機能 */}
          <div>
            <h3 className="text-neon-cyan text-lg font-medium mb-2">記事表示機能</h3>
            <ul className="space-y-1 text-neon-muted ml-4">
              <li className="flex items-start">
                <span className="text-neon-cyan mr-2">•</span>
                <span>マークダウン形式での記事執筆</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-cyan mr-2">•</span>
                <span>シンタックスハイライト対応</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-cyan mr-2">•</span>
                <span>目次の自動生成</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-cyan mr-2">•</span>
                <span>タグによる記事分類</span>
              </li>
            </ul>
          </div>

          {/* 検索・フィルタリング */}
          <div>
            <h3 className="text-neon-cyan text-lg font-medium mb-2">検索・フィルタリング</h3>
            <ul className="space-y-1 text-neon-muted ml-4">
              <li className="flex items-start">
                <span className="text-neon-cyan mr-2">•</span>
                <span>キーワード検索機能</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-cyan mr-2">•</span>
                <span>タグフィルタリング</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-cyan mr-2">•</span>
                <span>ページネーション</span>
              </li>
            </ul>
          </div>

          {/* 管理画面 */}
          <div>
            <h3 className="text-neon-cyan text-lg font-medium mb-2">管理画面（認証機能）</h3>
            <ul className="space-y-1 text-neon-muted ml-4">
              <li className="flex items-start">
                <span className="text-neon-cyan mr-2">•</span>
                <span>JWT認証によるログイン機能</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-cyan mr-2">•</span>
                <span>ブラウザ上での記事作成・編集・削除（CRUD操作）</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-cyan mr-2">•</span>
                <span>マークダウンエディタ搭載</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-cyan mr-2">•</span>
                <span>記事一覧からの管理</span>
              </li>
            </ul>
          </div>

          {/* その他 */}
          <div>
            <h3 className="text-neon-cyan text-lg font-medium mb-2">その他</h3>
            <ul className="space-y-1 text-neon-muted ml-4">
              <li className="flex items-start">
                <span className="text-neon-cyan mr-2">•</span>
                <span>レスポンシブデザイン（モバイル対応）</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-cyan mr-2">•</span>
                <span>開発ログページ（サイトの更新履歴）</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-cyan mr-2">•</span>
                <span>ポートフォリオページ</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 使用技術 */}
      <section className="bg-neon-card rounded-lg border border-neon-border p-6 mb-8 hover:border-neon-cyan transition-colors duration-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-6 bg-neon-cyan"></div>
          <h2 className="text-neon-text text-xl font-semibold">使用技術</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-neon-cyan text-lg font-medium mb-2">フロントエンド</h3>
            <ul className="text-neon-muted space-y-1">
              <li>• Next.js 16（App Router）</li>
              <li>• TypeScript</li>
              <li>• Tailwind CSS</li>
              <li>• React 19</li>
            </ul>
          </div>
          <div>
            <h3 className="text-neon-cyan text-lg font-medium mb-2">認証・セキュリティ</h3>
            <ul className="text-neon-muted space-y-1">
              <li>• JWT（Jose）</li>
              <li>• HTTP-only Cookie</li>
            </ul>
          </div>
          <div>
            <h3 className="text-neon-cyan text-lg font-medium mb-2">コンテンツ管理</h3>
            <ul className="text-neon-muted space-y-1">
              <li>• ファイルベースMarkdown</li>
              <li>• gray-matter（Front Matter解析）</li>
              <li>• remark/rehype（Markdown処理）</li>
            </ul>
          </div>
          <div>
            <h3 className="text-neon-cyan text-lg font-medium mb-2">インフラ・開発環境</h3>
            <ul className="text-neon-muted space-y-1">
              <li>• Vercel（デプロイ・ホスティング）</li>
              <li>• Git/GitHub</li>
              <li>• WSL2 (Ubuntu)</li>
              <li>• VSCode</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 工夫した点 */}
      <section className="bg-neon-card rounded-lg border border-neon-border p-6 mb-8 hover:border-neon-cyan transition-colors duration-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-6 bg-neon-cyan"></div>
          <h2 className="text-neon-text text-xl font-semibold">工夫した点</h2>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-neon-cyan text-lg font-medium mb-2">1. 公開サイトと管理画面の明確な分離</h3>
            <p className="text-neon-muted">
              Next.jsのRoute Groups機能を使い、一般ユーザー向けのページと管理者専用ページを別々のフォルダに分けました。
              これにより、それぞれ独立したレイアウトや認証ロジックを適用でき、コードの見通しが良くなっています。
            </p>
          </div>
          <div>
            <h3 className="text-neon-cyan text-lg font-medium mb-2">2. データベース不要の軽量な記事管理</h3>
            <p className="text-neon-muted">
              記事をマークダウンファイルで管理することで、データベースのセットアップが不要になり、シンプルな構成になっています。
              Gitで記事の変更履歴も管理でき、デプロイも高速です。
            </p>
          </div>
          <div>
            <h3 className="text-neon-cyan text-lg font-medium mb-2">3. セキュアな認証機能</h3>
            <p className="text-neon-muted">
              管理画面へのアクセスにはJWTトークンによる認証を実装しました。
              トークンはHTTP-only Cookieに保存することで、JavaScriptからアクセスできないようにし、セキュリティを高めています。
            </p>
          </div>
          <div>
            <h3 className="text-neon-cyan text-lg font-medium mb-2">4. 執筆体験の改善</h3>
            <p className="text-neon-muted">
              最初はエディタでマークダウンを直接編集していましたが、ブラウザ上で記事を作成・編集できる管理画面を追加しました。
              これにより、どこからでも手軽に記事を執筆、投稿できるようになりました。
            </p>
          </div>
          <div>
            <h3 className="text-neon-cyan text-lg font-medium mb-2">5. 小さく始めて段階的に改善</h3>
            <p className="text-neon-muted">
              最初は記事表示だけのシンプルな構成でスタートし、その後に検索機能、管理画面、レスポンシブデザインなどを順次追加しました。
              DevLogページでその過程を記録しています。
            </p>
          </div>
        </div>
      </section>

      {/* 開発の背景 */}
      <section className="bg-neon-card rounded-lg border border-neon-border p-6 mb-8 hover:border-neon-cyan transition-colors duration-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-6 bg-neon-cyan"></div>
          <h2 className="text-neon-text text-xl font-semibold">開発の背景</h2>
        </div>
        <p className="text-neon-muted leading-relaxed mb-3">
          エンジニアとして学んだ内容や技術的な知見をアウトプットする場として、独自の技術ブログプラットフォームを構築しました。
          ZennやQiitaなどの既存プラットフォームも便利ですが、自分で設計・実装することで、Next.jsやTypeScript、認証機能の実装など、
          実践的なスキルを深く学ぶことができています。
        </p>
        <p className="text-neon-muted leading-relaxed">
          また、このサイト自体が一つのポートフォリオとして機能するようにしており、
          継続的に機能を追加・改善しながら、技術的な成長を記録する場としています。
        </p>
      </section>

      {/* 戻るリンク */}
      <div className="mt-12">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-neon-cyan hover:text-neon-blue transition-colors duration-300 font-medium"
        >
          <ChevronLeftIcon className="w-5 h-5" />
          <span>ポートフォリオ一覧に戻る</span>
        </Link>
      </div>
    </div>
  )
}