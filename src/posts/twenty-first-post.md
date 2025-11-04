---
title: '【Git】git stashで作業を一時退避 -基本的な使い方と実践例-'
date: '2025-08-07'
tags: ['Git', 'GitHub', 'バージョン管理']
excerpt: 'Git stashを使った作業の一時退避方法について、基本的な使い方から実践的な活用例まで詳しく解説します'
---

開発をしていると「この変更は今コミットしたくないけど作業中のものを失いたくない」という場面に遭遇することがあります。

そんなときに助けてくれるのが `git stash` という機能です。
今回はこの便利なコマンドについて見ていきます。

## git stashとは何か

`git stash`は、現在作業中の変更を一時的に「どこかに避けておく」ための機能です。
stashという単語には「こっそりしまう」「隠す」といった意味があります。

つまり、**今の作業内容を一旦預かって、後でまた取り出せるようにしてくれる仕組み**ということですね。

例えば、こんな場面で使えます👇

- 作業中に急に別のブランチに切り替える必要が出たとき
- まだ完成していないコードがあるけど、緊急のバグ修正をしなければならないとき
- `git pull`しようとしたら、ローカルの変更があって失敗したとき
- 間違ったブランチで作業してしまったとき

## 基本的な使い方

まずは一番シンプルな使い方から見てみましょう。

### 1. 変更を一時退避する

作業中のファイルがある状態で以下のコマンドを実行します。

```bash
git stash
```

このコマンドを実行すると、以下のようなメッセージが出ます。

```
Saved working directory and index state WIP on main: 3f8a4b2 Add navigation menu
HEAD is now at 3f8a4b2 Add navigation menu
```

これは「作業ディレクトリとインデックス（ステージング領域）の状態を保存しました」という内容です。

> **Note**
> git stashの対象となるもの
> 変更されたトラッキング対象ファイル、追跡済みのものは、ステージング済み・未ステージングのどちらの状態でも、`git stash`だけですべて退避できます。
> ただし、新しく作成した未追跡ファイル（Untracked files）は、`git add`でステージングしていない限り、`git stash`だけでは退避できません。未追跡ファイルも退避したい場合は「新しく作成したファイルも一緒に退避する」セクションをご覧ください。

> **Note**
> 新規作成ファイルはいつから追跡されるのか
> 新規作成したファイルは`git add`（ステージング）した時点で追跡状態になります。
> Git公式ドキュメントでは「git addコマンドは新しいファイルの追跡を開始するために使用する多目的コマンド」と説明されています。
> つまり、未追跡ファイルを`git add`した瞬間からステージング済みになるのと同時に**追跡済み**の状態になり、`git stash`の対象となります。

この`git stash`実行後に`git status`で確認すると、
```
On branch main
nothing to commit, working tree clean
```
このようにワーキングディレクトリがクリーンな状態になっているのがわかると思います。

### 2. 退避した作業の一覧を確認する

色々なタスクを進行していると、何を退避したか忘れてしまうときもありますよね。
そんなときはこの確認コマンドが便利です。

```bash
git stash list

# 出力例
stash@{0}: WIP on main: 3f8a4b2 Add navigation menu
stash@{1}: WIP on feature-login: 2c7e9d1 Implement login form
```

一番上に見える`stash@{0}`が一番新しく退避したもので、数字が大きくなるほど古いものになります。

### 3. 退避した作業を元に戻す

退避した作業を元に戻したい場合、方法は2つあります。

**popを使う方法**

```bash
git stash pop

# 出力例
On branch main
Changes not staged for commit:
(use "git add <file>..." to update what will be committed)
(use "git restore <file>..." to discard changes in working directory)
modified: index.html
modified: style.css
no changes added to commit (use "git add" and/or "git commit -a")
Dropped refs/stash@{0} (8a5c7f9e7b2a4c3d1f6b8a9c2e5d7f3a4b6c8d1e)
```

よく使うのはこちらですね。
このコマンドは退避した作業を元に戻しつつ、同時にstashのリストからも削除してくれます。「取り出して使い切る」イメージです。

**applyを使う方法**

```bash
git stash apply
```

こちらは退避した作業を元に戻しますが、stashのリストには残したままにしてくれます。
同じ変更を複数のブランチに適用したいときなどに便利です。

## 実際の使用例を見てみよう

### Case 1：急にブランチを切り替える必要が出たとき

注意書きを先に置いておきます。

> **Warning**
> **コンフリクトが起こった場合**
> - `git stash pop`でコンフリクトが発生した場合、stashは自動的に削除されません
> - コンフリクトを手動で解決した後、`git stash drop`でstashを削除する必要があります
> - 作業ディレクトリに未保存の変更がある場合は、先にコミットまたはstashしてからpopしてください

では使用例です

```bash
# 作業中...
git status
# Changes not staged for commit:
#   modified: index.html

# 急に別ブランチの確認が必要になったとき
git stash
# Saved working directory and index state WIP on main: 1234567 latest commit

# ブランチ切り替え
git checkout feature-branch
# 作業を確認...

# 元のブランチに戻る
git checkout main

# 作業を再開
git stash pop
# On branch main
# Changes not staged for commit:
#   modified: index.html
```

### Case 2：間違ったブランチで作業してしまったとき

```bash
# feature-branchで作業するつもりが、masterブランチでしてしまった
git stash
# Saved working directory and index state WIP on master: 1234567 latest commit

# 正しいブランチに移動
git checkout feature-branch

# 退避していたものを取り出して作業を適用
git stash pop
# これで本来のfeature-branchに作業内容が移動する
```

## 便利なオプション

### メッセージを付けて保存する

stashするときには、メッセージをつけることができます。
何を退避したか後から確認しやすくて助かります。

```bash
git stash push -m "ヘッダーデザインの調整中"

# 出力例
Saved working directory and index state On main: ヘッダーデザインの調整中
HEAD is now at 3f8a4b2 Add navigation menu
```

こうすると、`git stash list`で確認したときに

```
stash@{0}: On main: ヘッダーデザインの調整中
```

と表示されるので、何の作業だったか、どれが元に戻したい作業なのかがすぐにわかります。

> **Note**
> `git stash save "メッセージ"`という書き方もありますがこれは古いもので、現在は`git stash push -m "メッセージ"`が推奨されています。

### 新しく作成したファイルも一緒に退避する

デフォルトでは、gitが追跡していない新しいファイル（Untracked files）は退避されません。新しいファイルも一緒に退避したいときは以下のようにします。

```bash
git stash -u
```

`-u`は`--include-untracked`の短縮形で、「追跡されていないファイルも含める」という意味です。

もしくは`git add`でステージングしてからであれば、ファイルが追跡済みになるため`git stash`のみで新規作成ファイルも退避可能です。
詳しくは「変更を一時退避する」セクションのトグル内の説明をご覧ください。

### 特定のstashを指定して操作する

複数のstashがある場合、特定のものを指定できます。

```bash
# 特定のstashを適用
git stash apply stash@{1}

# 特定のstashを削除
git stash drop stash@{1}
```

## stashの中身を確認する方法

退避したものの、「何を変更したんだっけ？」となったときに使えるコマンドです。

```bash
# 簡単な変更サマリーを見る
git stash show

# 出力例
index.html | 5 ++---
style.css  | 3 ++-
2 files changed, 4 insertions(+), 4 deletions(-)
```

```bash
# 詳細な差分を見る
git stash show -p

#出力例
diff --git a/index.html b/index.html
index 2c5a8f3..9a7b4e1 100644
--- a/index.html
+++ b/index.html
@@ -3,7 +3,7 @@
 <head>
     <meta charset="UTF-8">
     <title>Our Website</title>
-    <link rel="stylesheet" href="style.css">
+    <link rel="stylesheet" href="styles/main.css">
 </head>
 <body>
     <header>
@@ -11,6 +11,7 @@
     </header>
+    <nav>Navigation menu</nav>
 </body>
 </html>
diff --git a/style.css b/style.css
index 1a2b3c4..5d6e7f8 100644
--- a/style.css
+++ b/style.css
@@ -1,3 +1,4 @@
 header {
-    background-color: #f0f0f0;
+    background-color: #333;
+    color: white;
 }
```

`-p`オプションを付けると、`git diff`のような詳細な差分が表示されます。

## ちょっと注意したいポイント

### stashはローカルだけのもの

> **Note**
> stashはあくまでローカルリポジトリに保存される一時的なものです。`git push`でリモートに送られることはありません。他の人と共有することはできないので注意しましょう。

### コンフリクトが起こることもある

stashを適用するときに、現在の作業内容と競合してコンフリクト（衝突）が起こることがあります。コンフリクトが発生した場合には、普通のマージと同じように手動で解決する必要があります。

## 不要なstashは削除しよう

いろんなstashがたまったままになってしまうと、いざ必要なものを手元に戻したいというときに見つけづらいですよね。
使い終わったstashや、もう不要になったものは削除しておきましょう。

> **Warning**
> **※git stash clearは慎重に**
> `git stash clear`を実行すると、すべてのstashが削除され、通常の方法では復旧できません。
> ただし、削除直後であれば`git fsck --unreachable`コマンドを使った復旧方法も存在しますが、確実ではないため実行前に本当に削除して良いか確認するのがおすすめです。

```bash
# 特定のstashを削除
git stash drop stash@{0}

# ※全てのstashを削除
git stash clear
```

## まとめ

`git stash`は作業中の変更を一時的に避けておくための、とても便利な機能だということがわかりました。特に開発現場では割り込み作業が頻繁にある場合もあります。
こういった便利なものを覚えておくと作業がスムーズになりますね。

最後に、よく使うコマンドをもう一度おさらい ☝🏻

- `git stash` - 変更を退避
- `git stash list` - 退避したものの一覧確認
- `git stash pop` - 退避したものを戻して削除
- `git stash apply` - 退避したものを戻すが削除しない
- `git stash -u` - 新しいファイルも含めて退避

最初のうちは`git stash`と`git stash pop`だけでも十分です。
慣れてきたら他のオプションも使ってみると、より柔軟に作業できるようになりますね。

僕もまだまだ学習中ですが、gitを使いこなせるように一緒に学んでいきましょう 💪🏻

## 参考サイト

- [Git公式ドキュメント - git stash](https://git-scm.com/docs/git-stash)
- [Pro Git book - Stashing and Cleaning](https://git-scm.com/book/en/v2/Git-Tools-Stashing-and-Cleaning)
- [Atlassian Git Tutorial - git stash](https://www.atlassian.com/git/tutorials/saving-changes/git-stash)