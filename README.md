# Tech Blog

個人の技術ブログサイトです。Next.js + TypeScript で構築し、エンジニアリングに関する学びや知見を記録します。

## サイト URL
https://pen2-tech-blog.vercel.app/

## 主な機能
- マークダウンベースの記事投稿
- 管理画面による記事編集
- タグ・検索機能
- レスポンシブデザイン
- シンタックスハイライト

## 技術構成
- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Authentication**: JWT (Jose)
- **Deployment**: Vercel
- **Content**: File-based Markdown

## ローカル開発

```bash
# リポジトリクローン
git clone https://github.com/n-haruhi/my-tech-blog.git
cd my-tech-blog

# パッケージインストール
npm install

# 環境変数設定
cp .env.local.example .env.local

# 開発サーバー起動
npm run dev
```

管理画面: http://localhost:3000/admin

## プロジェクト構造
```
src/
├── app/                 # Next.js App Router
│   ├── (admin)/        # 管理画面
│   ├── (main)/         # 公開サイト
│   └── api/            # API Routes
├── components/         # 共通コンポーネント
├── lib/               # ユーティリティ
└── posts/             # 記事ファイル (Markdown)
```

## ライセンス
MIT
