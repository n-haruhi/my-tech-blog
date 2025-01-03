---
title: '【Git】コミットメッセージのprefix'
date: '2024-07-26'
tags: ['Git']
excerpt: 'Gitのコミットメッセージにおける一般的なプレフィックスの使い方と実例を解説します'
---

コミットメッセージにプレフィックスを付けることで、変更の目的や内容を簡潔に伝えることができます。
今日は一般的によく使われるプレフィックスとその使用例を紹介します。

## 1. [Feature]
新機能の追加を示します。
例: `[Feature] ユーザー登録機能の実装`

## 2. [Fix]
バグ修正を示します。
例: `[Fix] ログイン時のセッション切れエラーを修正`

## 3. [Refactor]
コードの改善や整理を示します。機能は変更せず、コードの質を向上させる場合に使用します。
例: `[Refactor] ユーザー認証処理のリファクタリング`

## 4. [Docs]
ドキュメントの更新や追加を示します。
例: `[Docs] READMEにインストール手順を追加`

## 5. [Style]
コードスタイルの変更を示します。スペース、フォーマット、セミコロンの追加などが該当します。
例: `[Style] インデントをタブからスペースに変更`

## 6. [Test]
テストの追加や修正を示します。
例: `[Test] ユーザー登録のユニットテストを追加`

## 7. [Chore]
ビルドプロセスやツールの変更、ライブラリのアップデートなど、開発環境に関する変更を示します。
例: `[Chore] npmパッケージのアップデート`

## 8. [WIP]
"Work In Progress"の略で、作業中であることを示します。
例: `[WIP] ログイン機能の実装`

## 9. [Perf]
パフォーマンス改善を示します。
例: `[Perf] データベースクエリの最適化`

## 10. [Revert]
以前のコミットを元に戻すことを示します。
例: `[Revert] 「ログイン機能の変更」を元に戻す`

## 11. [Awaiting Review]
レビュー待ちの状態であることを示します。
例: `[Awaiting Review] ログイン機能の実装`

## 使用例
実際のコミットメッセージでは、以下のように使用します：

```bash
[Feature] ログイン機能の実装
- ユーザー名とパスワードによる認証を追加
- セッション管理の実装
- ログインフォームのUIを作成
```

```bash
[WIP][Refactor] データベース接続処理の最適化
- コネクションプールの導入（完了）
- クエリのパラメータ化（進行中）
- エラーハンドリングの改善（未着手）
```

```bash
[Awaiting Review][Fix] #123 パスワードリセット機能のバグ修正
- リセットトークンの有効期限チェックを追加
- エラーメッセージの改善
レビューをお願いします。セキュリティ面での確認もお願いします。
```

### Tips
- プレフィックスは必ず`[]`で囲みます。
- プレフィックスの後に、変更内容の簡潔な説明を加えます。
- 必要に応じて、コミットメッセージの本文に詳細な説明を追加できます。
- 複数のプレフィックスを組み合わせることもあります（例：`[WIP][Feature]`）
- Issue番号がある場合は、プレフィックスの後に記述すると良いです（例：`[Fix] #123 バグの修正`）
- チーム内で一貫性を保つために、使用するプレフィックスをあらかじめ決めておくのがbetterですね。

プレフィックスを適切に使用することでコードの変更履歴が整理され、変更の目的内容も伝わりやすくなりますね。
プロジェクトやチームの方針によって書き方は変わるので、他の方がどう書いているか、どういうやり方をしているのか見て聞いて吸収していきたいですね。