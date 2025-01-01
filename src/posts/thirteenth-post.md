---
title: '【Git】mainの最新変更を作業ブランチに取り込む'
date: '2024-09-13'
tags: ['Git']
excerpt: 'GitでメインブランチからFeatureブランチへの変更取り込み方について、実行例を交えながら丁寧に解説します'
---

Gitを使う上で、mainブランチ（または masterブランチ）の最新の変更を自分の作業ブランチに取り込む場面は多々あるかと思います。今回は慣れていない方や忘れてしまった向けにその手順について丁寧に書いていこうと思います。

## なぜ必要か
チーム開発では、他のメンバーがmainブランチに新しい機能や修正を追加することがあります。自分が実装や改修を行っている間にmainの内容と自分の手元の内容の差が広がってしまうことがあるかもしれません。自分の作業ブランチを最新の状態に保つことで、コンフリクトを減らし、スムーズに開発を進めることができます。

## 手順
### 1. 現在のブランチを確認
まず、自分がどのブランチにいるか確認しましょう。

```bash
git branch
```

自分が現在いるブランチに`*`マークがつきます。
実行例：

```bash
$ git branch
  feature/add-user-profile
  feature/update-readme
* feature/new-search-function
  main
```

この例では、`feature/new-search-function`ブランチが現在自分が作業しているブランチであることがわかりますね。

### 2. mainブランチに移動

```bash
git checkout main
```

もしくは`main`の部分を、最新情報をとってきたいブランチの名前に置き換えてください。
実行例1 (手元に変更が**ない**場合)：

```
$ git checkout main
Switched to branch 'main'
Your branch is up to date with 'origin/main'.
```

実行例2 (手元に変更が**ある**場合):

```
$ git checkout main
M       src/components/UserProfile.js
M       src/utils/helpers.js
M       tests/unit/searchFunction.test.js
Switched to branch 'main'
Your branch is up to date with 'origin/main'.
```

> **Note**
> 今回の例2で`M`がついているファイルは、ローカルで変更があるファイルです。この場合は、必要に応じてこれらの変更をコミットまたはスタッシュしてから作業を進めてください。

> **Info**
> **ローカル？リモート？**
> - ローカル：自分の手元のPC上にあるリポジトリを指します。直接編集やコミットを行う場所です。
> - リモート：GitHub などのサーバー上にあるリポジトリを指します。通常、チームで共有する場などとして使用されます。

> **Info**
> **スタッシュ？**
> スタッシュとは、作業中の変更を一時的に保存し、後で復元できる機能です。git stashコマンドで利用できます。

### 3. リモートの変更を取得

```bash
git pull origin main
```

実行例：

```
$ git pull origin main
remote: Enumerating objects: 11, done.
remote: Counting objects: 100% (11/11), done.
remote: Compressing objects: 100% (1/1), done.
remote: Total 6 (delta 5), reused 6 (delta 5), pack-reused 0
Unpacking objects: 100% (6/6), 480 bytes | 480.00 KiB/s, done.
From github.com:example-org/example-project
 * branch            main       -> FETCH_HEAD
   a1b2c3d..e4f5g6h  main       -> origin/main
Updating a1b2c3d..e4f5g6h
Fast-forward
 src/components/Navbar.js | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```

これで、リモートのmainブランチの最新の変更がローカルのmainブランチに反映されました。

> **Info**
> **Tips: git pull origin main と git pull origin/main は何が違う？**
> - git pull origin main: リモートの origin リポジトリの main ブランチから変更を取得し、現在のブランチにマージします。
> - git pull origin/main: ローカルに保存されている origin/main の参照から変更を取得します。リモートサーバーとの通信は行いません。
> `git pull origin main` を使用して、最新の変更を確実に取得するのが良いかと思います。組織やプロジェクトのやり方にあわせるのが安心ですね。

### 4. 作業ブランチに戻る

```bash
git checkout <作業ブランチ名>
```

`<作業ブランチ名>`は自分の作業しているブランチ名に置き換えてください。
実行例1 (手元に変更が**ない**場合)：

```
$ git checkout feature/new-search-function
Switched to branch 'feature/new-search-function'
Your branch is up to date with 'origin/feature/new-search-function'.
```

実行例2 (手元に変更が**ある**場合)：

```
$ git checkout feature/new-search-function
M       src/components/UserProfile.js
M       src/utils/helpers.js
M       tests/unit/searchFunction.test.js
Switched to branch 'feature/new-search-function'
Your branch is up to date with 'origin/feature/new-search-function'.
```

### 5. mainの変更を作業ブランチにマージ

```bash
git merge origin main
```

実行例：

```
$ git merge origin main
Updating a1b2c3d..e4f5g6h
Fast-forward
 src/components/Navbar.js | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```

これで、リモートのmainブランチの最新の変更が現在の作業ブランチにマージされました。

## 🔍コンフリクトが発生した場合
マージ中にコンフリクト（競合）が発生することがあります。以下のようなメッセージが表示された場合は、該当ファイルを開いてどの変更を取り入れるか確認し、コンフリクトを解決してからコミットしましょう。

```
Auto-merging src/components/UserProfile.js
CONFLICT (content): Merge conflict in src/components/UserProfile.js
Automatic merge failed; fix conflicts and then commit the result.
```

## まとめ
この手順を行えば簡単にmainブランチの最新変更を自分の作業ブランチに取り込むことができます。定期的に行うことで、大きなコンフリクトを防ぎ、スムーズな開発が可能になります。
わからなくなったらまたいつでも覗きに来てください。お疲れさまでした。