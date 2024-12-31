# Tech Blog
Next.jsで構築した技術ブログプラットフォームです。エンジニアリングに関する知見や技術的な学びを記録するために作成しました。

## 機能
- マークダウンによる記事管理
- タグベースの記事分類
- レスポンシブデザイン
- シンタックスハイライト
- SEO対策

## 技術スタック
- [Next.js](https://nextjs.org/) - Reactフレームワーク
- [TypeScript](https://www.typescriptlang.org/) - 型安全な開発
- [Tailwind CSS](https://tailwindcss.com/) - スタイリング
- MDX - マークダウン拡張
- [date-fns](https://date-fns.org/) - 日付操作

## 開発環境のセットアップ
```bash
# リポジトリのクローン
git clone https://github.com/n-haruhi/my-tech-blog.git
cd my-tech-blog

# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev
```

サーバー起動後、[http://localhost:3000](http://localhost:3000)にアクセスすることで確認できます。

## 記事の追加方法
1. `src/posts` ディレクトリに新しいMDXファイルを作成
2. フロントマターに必要な情報を記載
```markdown
---
title: '記事タイトル'
date: '2024-12-31'
tags: ['Next.js', 'React']
excerpt: '記事の概要'
---
```
3. マークダウン形式で本文を記述

## デプロイ
Vercelプラットフォームでのデプロイをおすすめします。
1. [Vercel](https://vercel.com)でアカウント作成
2. このリポジトリを連携
3. デプロイ設定を確認して実行

## ライセンス
MIT

## 作者
[n-haruhi](https://github.com/n-haruhi)