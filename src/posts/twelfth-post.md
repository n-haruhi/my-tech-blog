---
title: '【Git】誤ってmainブランチで作業してしまった場合の対処法'
date: '2024-08-28'
tags: ['Git', 'チーム開発', 'コマンドライン']
excerpt: 'mainブランチでの誤った作業を、コミット前・コミット後・プッシュ後のシナリオ別に対処方法を解説します'
---

機能実装や改修の際、ブランチを切らずに誤って直接 main ブランチで作業してしまっていることに気づいた場合の対処法について。
今回は3つのシーンに分けて説明します。

## 前提条件
- Git がインストールされていること
- コマンドラインの基本的な操作ができること

## Scene1: 変更はしたが、まだコミットしていない

### Step 1: 現在の状態を確認
```bash
git status
```

### Step 2: 新しいブランチを作成
```bash
git checkout -b feature/new-feature-name
```

### Step 3: 変更をステージングエリアに追加
```bash
git add .
```

### Step 4: 変更をコミット
```bash
git commit -m "新機能の説明"
```

### Step 5: 新しいブランチをプッシュ
```bash
git push -u origin feature/new-feature-name
```

### Step 6: mainブランチをクリーンな状態に戻す
```bash
git checkout main
git reset --hard origin/main
```

## Scene2: 変更をコミットしてしまったが、まだプッシュはしていない

### Step 1: 最新のコミットを確認
```bash
git log -n 1
```

### Step 2: 新しいブランチを作成し、そこに移動する
```bash
git branch feature/new-feature-name
git checkout feature/new-feature-name
```

### Step 3: mainブランチを1つ前のコミットに戻す
```bash
git checkout main
git reset --hard HEAD~1
```

### Step 4: 新しいブランチをプッシュ
```bash
git checkout feature/new-feature-name
git push -u origin feature/new-feature-name
```

## Scene3: 変更をコミットし、mainブランチにプッシュもしてしまった

> **Warning**
> 注意: この方法はチームの他のメンバーに影響を与える可能性があります。実行前にメンバーや管理者へ連絡を取ることをおすすめします。

### Step 1: 新しいブランチを作成
```bash
git checkout -b feature/new-feature-name
```

### Step 2: 新しいブランチをプッシュ
```bash
git push -u origin feature/new-feature-name
```

### Step 3: mainブランチを1つ前の状態に戻す
```bash
git checkout main
git reset --hard HEAD~1
```

### Step 4: 変更を強制プッシュ
```bash
git push --force origin main
```

## 注意点
- `git reset --hard` コマンドは、ローカルの変更をすべて破棄します。使用する前に、重要な変更がすべて新しいブランチにコミットされていることを確認してください。
- Scene3の強制プッシュ（`git push --force`）は、リモートリポジトリの履歴を書き換えるため、チームの他のメンバーに影響を与える可能性があります。必ず事前に連絡を取り、全員が最新の状態になっていることを確認してから実行してください。

## 予防策
1. 作業を始める前に `git branch` コマンドで現在のブランチを確認する。
2. 新しい機能開発やバグ修正を始める前に、必ず新しいブランチを作成する習慣をつける。
3. Git クライアントツールを使用して、視覚的に現在のブランチを確認する。

これらの予防策を実践することで、今回のような事例が発生するリスクを大幅に減らすことができます。

## まとめ
これらの手順を踏むことで、誤って main ブランチで進めてしまった作業を、適切な新しいブランチに移動させることができます。
VSCode使ってる場合は今回挙げた手順のいくつかはクリックでむので助かりますよね。
慣れていない方は、新しい作業を始める前に今自分のいるブランチはどこか確認する癖をつけると良いかと思います。