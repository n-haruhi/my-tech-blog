---
title: 'Permission denied'
date: '2026-01-30'
tags: ['Linux', 'CLI', 'chmod']
excerpt: 'Linuxで頻出する「Permission denied」エラーの原因と対処法を、基本から応用まで詳しく解説します'
---

コマンドを実行したときに「Permission denied」と出ることってありますよね。
これまではぼやっと権限の問題か～と考え、深く調べてこなかったのですが、今回はこのPermission deniedエラーについて、基本から対処法までじっくり見ていこうと思います。

## Permission deniedって何？

一言で言うと「あなたにはその操作をする権限がありません」というメッセージです。

例えば、会社のビルに入るとき、社員証がないと入れないですよね。
Linuxのファイルシステムも同じで、適切な「権限」がないとファイルにアクセスできません。
これは複数のユーザーが同じシステムを使う環境で、誰かが勝手に他人のファイルを削除したり改変したりできないようにするための仕組みです。

実際にはこういったエラーが出ます。

```bash
$ ./script.sh
bash: ./script.sh: Permission denied

$ cat /etc/shadow
cat: /etc/shadow: Permission denied
```

## なぜPermission deniedが出るのか

このエラーが出る理由は大きく3つあります。

### 1. ファイルの実行権限がない

シェルスクリプトや実行ファイルを動かそうとしたときによく遭遇します。
ファイルを作成しただけでは、そのファイルを実行する権限は付与されていません。

```bash
$ ls -l my_script.sh
-rw-r--r-- 1 user user 128 Jan 30 10:00 my_script.sh

$ ./my_script.sh
bash: ./my_script.sh: Permission denied
```

`ls -l`で確認すると、`-rw-r--r--`となっていて、どこにも`x`（実行権限）がありません。

### 2. ファイルの読み取り・書き込み権限がない

他のユーザーが所有するファイルや、システムファイルにアクセスしようとした場合に起こります。

```bash
$ echo "test" > /etc/important_config
bash: /etc/important_config: Permission denied
```

### 3. ディレクトリに対する権限がない

ディレクトリの場合、ファイルとは少し違った意味を持ちます。
ディレクトリに`x`（実行権限）がないと、そのディレクトリに入ることさえできません。

## パーミッションの見方

`ls -l`コマンドを使うと、ファイルやディレクトリの詳細情報が見られます。

```bash
$ ls -l example.sh
-rwxr-xr-x 1 yamada staff 256 Jan 30 12:00 example.sh
```

左から順に見ていきましょう。

```
-rwxr-xr-x
│└┬┘└┬┘└┬┘
│ │  │  └─ その他のユーザーの権限（r-x）
│ │  └──── グループの権限（r-x）
│ └─────── 所有者の権限（rwx）
└───────── ファイルタイプ（- は通常ファイル、d はディレクトリ）
```

それぞれの文字には以下の意味があります。
- **r** (read): 読み取り可能
- **w** (write): 書き込み可能
- **x** (execute): 実行可能
- **-**: その権限なし

上の例だと、所有者は読み書き実行すべてができ、グループとその他のユーザーは読み取りと実行だけができる状態です。

ディレクトリの場合は、権限の意味が少し変わります。
- **r**: ディレクトリ内のファイル一覧を見れる
- **w**: ディレクトリ内でファイルの作成・削除ができる
- **x**: ディレクトリに入れる（これがないと入ることすらできない）

それでは次で実際の対処法を見てみましょう。

## 実際の対処法

### 1. 実行権限を付与する

自分が作ったスクリプトを実行したい場合。

```bash
$ chmod +x my_script.sh
$ ls -l my_script.sh
-rwxr-xr-x 1 user user 128 Jan 30 10:00 my_script.sh

$ ./my_script.sh
# 実行できる
```

`chmod +x`は「実行権限を追加する」という意味です。
これだけで解決することが多いです。

### 2. 数値で指定する方法

もっと細かく制御したい場合は、数値で指定できます。

```bash
$ chmod 755 script.sh
```

👇数値の意味
- **7** = 読み(4) + 書き(2) + 実行(1) = 所有者の権限
- **5** = 読み(4) + 実行(1) = グループの権限
- **5** = 読み(4) + 実行(1) = その他の権限

755はよく見かけますね。
他によく使う組み合わせはこんな感じでしょうか
- **755**: 所有者はフルアクセス、他は読み取りと実行のみ（スクリプトやディレクトリ）
- **644**: 所有者は読み書き可、他は読み取りのみ（一般的なファイル）
- **600**: 所有者のみ読み書き可（機密ファイル）

### 3. sudoを使う

システムファイルや他人のファイルにアクセスする必要がある場合。

```bash
$ sudo cat /etc/shadow
[sudo] password for user:
# パスワードを入力すると見れる
```

`sudo`は一時的に管理者権限で実行するコマンドです。
ただし、何でもかんでも`sudo`をつければいいというものではなく、本当に必要な場合だけ使うのがよいですね。

### 4. ファイルの所有者を変更する

ファイルの所有者を変更したい場合。
これも管理者権限が必要です。

```bash
$ sudo chown newuser:newgroup file.txt
$ ls -l file.txt
-rw-r--r-- 1 newuser newgroup 256 Jan 30 12:00 file.txt
```

`chown`はユーザー名とグループ名をコロンで区切って指定します。
**ユーザー**だけ変更したい場合は`chown newuser file.txt`、
**グループ**だけなら`chgrp newgroup file.txt`も使えます。

## 🕳️ 落とし穴

### ディレクトリの権限を忘れる

ファイル自体に権限があっても、そのファイルが入っているディレクトリに実行権限がないとアクセスできません。

```bash
$ ls -ld parent_dir/
drw-r--r-- 2 user user 64 Jan 30 12:00 parent_dir/

$ cat parent_dir/file.txt
cat: parent_dir/file.txt: Permission denied

# ディレクトリに実行権限を付与
$ chmod +x parent_dir/
$ cat parent_dir/file.txt
# 読めるようになる
```

### グループ権限が適用されないケース

自分がファイルの所有者だと、グループの権限は**適用されません**。
Linuxは所有者の権限を最初にチェックして、それが当てはまればそこで判定終了です。

```bash
# 所有者の権限に実行権限がない例
-rw-r-xr-x 1 yamada staff 256 Jan 30 12:00 test.sh

# yamadaさんが実行しようとすると
$ ./test.sh
bash: ./test.sh: Permission denied

# グループに実行権限があるのに
```

この場合、所有者に実行権限を付与する必要があります。

```bash
$ chmod u+x test.sh
```

`u+x`は『ユーザー（所有者）に実行権限を追加』という意味です。
`u`=user（所有者）、`+`=追加、`x`=実行権限です。

### 777は危険

「とりあえず`chmod 777`しておけばいいでしょ」と考えてしまいそうなところですが、これはセキュリティ的にとても危険です。誰でも読み書き実行できる状態になってしまうためです。

本番環境では絶対に避けましょう。必要最小限の権限だけ与えるのが基本です。

## 意外な原因

Permission deniedエラーは、パーミッション以外が原因のこともあります。

### SELinuxが有効になっている

Red Hat系のLinux（CentOSやFedoraなど）では、SELinuxという追加のセキュリティ機能が原因のことがあります。

```bash
$ getenforce
Enforcing

# 一時的に無効化（再起動すると元に戻る）
$ sudo setenforce 0
```

### ファイルシステムがnoexecでマウントされている

たとえパーミッションがあっても、ファイルシステムが`noexec`オプションでマウントされていると実行できません。

> **Note**
> noexecとは
> 
> noexecは『実行を禁止する』マウントオプションです。

これはセキュリティ対策として、特定のパーティション（USBメモリや一時ディレクトリなど）での実行を禁止するために使われます。

```bash
$ mount | grep noexec
/dev/sdb1 on /mnt/usb type vfat (rw,noexec,relatime)
```

## まとめ

Permission deniedエラーに遭遇したら、まずは以下を確認しましょう。

- `ls -l`でパーミッションを確認
- 自分がファイルの所有者か、グループに所属しているか確認
- ディレクトリの権限も確認
- 必要に応じて`chmod`で権限を変更
- システムファイルなら`sudo`の使用を検討

はじめのうちは厄介に感じることもあるかもしれませんが、何度も遭遇し対処していると徐々に慣れてくることと思います。

なぜそのエラーが出ているのだろうと向き合い、適当にその場限りの楽な解決をするのではなく、適切な権限設定を心がけることで、より安全で管理しやすいシステムを構築していきたいですね。

## 参考

- [chmod(1) - Linux manual page](https://man7.org/linux/man-pages/man1/chmod.1.html)
- [chmod(2) - Linux manual page](https://man7.org/linux/man-pages/man2/chmod.2.html)
- [Linux file permissions explained - Red Hat](https://www.redhat.com/en/blog/linux-file-permissions-explained)
- [Check Linux file permissions with ls - Rackspace](https://docs.rackspace.com/docs/checking-linux-file-permissions-with-ls)