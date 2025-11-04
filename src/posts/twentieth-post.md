---
title: '【Docker】port is already allocated エラーの解決手順'
date: '2025-07-30'
tags: ['Docker', 'Linux', '開発環境', '初学者向け', 'Port']
excerpt: 'Dockerで「port is already allocated」エラーが発生した際の原因と解決手順を詳しく解説します'
---

Dockerを使って開発をしていると、「Bind for 0.0.0.0:3000 failed: port is already allocated」エラーに遭遇することがあります。これは指定したポートが既に他のプロセスやコンテナによって使用されているときに発生します。
解決策はシンプルで、何がポートを使用しているか確認し、該当するコンテナやプロセスを適切に停止することです。
では実際にその手順について説明していきます。

## 急ぎの方への最短解決パス

> **Note**
> **細けぇことはいいからぱぱっと解決すっぞという方へ**
> 
> 以下のコマンドを順番に実行すれば、たいてい解決するかと思います。
> 
> 1. `sudo lsof -i :3000` でポートの使用状況を確認
> 2. `docker compose down` でコンテナをクリーンアップ
> 3. `docker compose up -d` で再起動
> 
> 詳しい説明や手順も見ておこうという方は本文へ👉

## 何が起きているのか

まず、実際のエラーメッセージを見てみましょう。
（セキュリティ的な観点から中身は一部置き換えています）

```bash
$ docker compose up -d
[+] Running 1/1
 ✔ Container my-app-container  Recreated                                       0.1s 
Error response from daemon: driver failed programming external connectivity on endpoint my-app-container (abc123...): Bind for 0.0.0.0:3000 failed: port is already allocated
```

> **Note**
> 今回の事例について
> 今回の記事のもととなった事例では、Makefile（makeコマンド）を使ってDockerコマンドを実行している開発環境だったため、`make setup`や`make test`といったコマンドで内部的に`docker compose`コマンドなどを実行するように設定されていました。
> ただ、一般的には`docker compose`コマンドを直接使用する環境の方が多いと思うので、そちらに置き換えて説明していきます。具体的なログの詳細な部分は実際のものと多少違うことがあるかもしれませんが、予めご了承ください。

このエラーは以下のような状況で発生します。

- 別のDockerコンテナが同じポートを使用している
- ホストマシンの他のプロセス（Webサーバーやアプリケーション）がポートを使用中
- 過去のコンテナが正常に停止されずに残っている

> **Note**
> 用語の解説
> **external connectivityって？**
> external connectivity（外部接続）とは、コンテナの外部（ホストマシンや他のコンテナ）からコンテナ内のサービスにアクセスできるようにする仕組みのことです。ポートバインディングによって、この外部接続が確立されます。
> 
> **Bindってなに？**
> Bind（バインド）とは、コンテナの内部ポートをホストマシンの特定のポートに「紐づける」ことです。例えば、コンテナ内で動くWebアプリ（ポート3000）を、ホストマシンのポート3000からアクセスできるようにする処理のことです。バインドに失敗すると、外部からコンテナにアクセスできなくなります。
> 
> **allocatedとは？**
> allocated は「割り当て済み」という意味です。ポートが already allocated の場合、そのポート番号が既に他のプロセスやコンテナによって使用されている状態を指します。1つのポートは同時に複数のプロセスで使用できないため、このエラーが発生します。

## 解決手順

### 始める前に
これから紹介するコマンドを実行する際は、重要な作業中のコンテナがないか事前に確認するようにしてください。不安な場合は、実行前にチームメンバー等に相談しましょう。

### 1. ポートの使用状況を確認する

まず、どのプロセスがポート3000を使用しているか確認します。
💡 `lsof`コマンド（List Open Files）というものを使用して、ネットワークポートを使用しているプロセスを調べられます。

```bash
$ sudo lsof -i :3000
```

> **Note**
> sudo？
> sudoは「superuser do」の略で、管理者権限でコマンドを実行するためのものです。
> ネットワークポートの情報を見るには管理者権限が必要な場合があるため、ここではsudoを付けています。
> パスワードを求められた場合は、ログインパスワードを入力してください。

例えばこんな結果だったとしましょう。
```bash
COMMAND   PID    USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
node     12345   user    4u  IPv4  67890      0t0  TCP *:3000 (LISTEN)
```

この場合、PID が 12345 の node プロセス が ポート 3000 を使用している
という風に読めます。

### プロセスを停止する場合

もしDockerコンテナではなく、通常のプロセス（Node.jsアプリなど）がポートを使用している場合は、以下のコマンドで停止できます。

```bash
# プロセスを停止
$ kill 12345
```

> **Note**
> killコマンド？
> killコマンドは指定した PID のプロセスに終了信号を送ります。
> - kill PID: 通常の終了信号（SIGTERM）を送信
> 
> たいていの場合はこの通常のkillコマンドでプロセスが停止します。
> もしプロセスが停止しない場合は そのプロセスが重要な処理を行っている可能性があるため、まずはそのプロセスが何をしているか確認してください。
> 
> 🐧 重要な作業をしているプロセスを停止しないよう、PIDとプロセス名をよく確認してから実行しましょう。

もし**何も表示されなかった場合**は、ポートは空いているということです。
それでも今回のようなエラーが発生しているという状況なら、Dockerの内部的な問題かもしれません。

### 2. 実行中のDockerコンテナを確認

次に、実行中のDockerコンテナを確認します。

```bash
$ docker ps
```

結果の例
```bash
CONTAINER ID   IMAGE     COMMAND                  CREATED         STATUS         PORTS                    NAMES
abc123def456   my-app    "npm start"              5 minutes ago   Up 5 minutes   0.0.0.0:3000->3000/tcp   my-app-container
def789ghi012   postgres  "docker-entrypoint.s…"   10 minutes ago  Up 10 minutes  5432/tcp                 postgres-db
```

この出力から、`my-app-container`がポート3000を使用していることがわかります。

> **Note**
> この出力はどう見ればいいの？
> この出力では、各行が1つのコンテナを表しています。今回の場合、重要なのは PORTS 列です。
> 何が PORT 3000 を使用しているのかが知りたいからですね。
> すると、あの出力の中で`0.0.0.0:3000->3000/tcp` と書いてあるのはどれでしょうか。
> 横にすーっと見ていくと、NAMESがmy-app-containerと書いてありますね。
> よって、 my-app-container がホストの3000番ポートを使用しているということがわかりますね。
> それがわかってどうするのか、ということで次に進みましょう。

### 3. 安全にクリーンアップする

先ほどの手順2で問題の原因がわかったので、以下の手順でクリーンアップしてみます。

#### 基本的な解決手順

一般的なDocker環境の場合、以下のコマンドを実行します。

```bash
# コンテナを停止・削除
$ docker compose down
```

実行結果の例
```bash
$ docker compose down
WARN[0000] /home/user/project/docker-compose.yml: `version` is obsolete 
[+] Running 2/2
 ✔ Container my-app-container      Removed                                      0.0s 
 ✔ Network my-project_network      Removed                                      0.1s
```

これでクリーンアップが完了しました！
✔ 印が付いているので、クリーンアップが成功したということがわかりやすいですね。

> **Warning**
> **docker compose down について**
> - このコマンドを実行すると コンテナが停止して削除されます
> - **データベース（MySQL、PostgreSQLなど）でボリュームを永続化していないデータは失われる可能性があるため、慎重に扱いましょう。**
> - ただしコンテナの**削除**とはいっても**一時的**なもので、次回`docker compose up`を実行すれば同じ設定で再作成されます
> - 他のメンバーの環境や共有リソースに影響を与えることはありません
> - 不安な場合はREADMEやチームのルールを確認するか、より安全な `docker compose stop` から試してみましょう

#### より慎重に行いたい方へ

データの損失が心配な場合は、以下の方法を試してみてください。

```bash
# コンテナを停止（削除はしない・データ保持）
$ docker compose stop
```

その後、以下のコマンドでもう一度起動して確認してみましょう。

```bash
$ docker compose up -d
```

だいたいはこれで問題が解決するかと思います。

## lsof コマンドについて

`lsof`（List Open Files）は、システム上で開かれているファイルとそれを使用しているプロセスの一覧を表示するツールです。

### 基本的な使い方

```bash
# すべてのネットワーク接続を表示
$ sudo lsof -i -P -n

# TCP接続のみを表示
$ sudo lsof -i tcp

# 複数のポートを一度に確認する場合
$ sudo lsof -i :3000-3010
```

### 出力の見方

```bash
COMMAND   PID    USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
node     12345   user    4u  IPv4  67890      0t0  TCP *:3000 (LISTEN)
```

- COMMAND: プロセス名
- PID: プロセスID
- USER: 実行ユーザー
- NAME: ポート番号と状態

## 最終確認

クリーンアップが完了したら、再度ポートの状況を確認します。

```bash
$ sudo lsof -i :3000
```

ここで何も表示されなければ、ポート3000は解放されたということになります。

ではこの状態で、最初にエラーになった作業に戻り、再度実行してみましょう。
（ご自身の環境に合わせて置き換えてください）

```bash
$ docker compose up -d
```

成功した場合の出力例
```bash
[+] Running 1/1
 ✔ Container my-app-container  Started                                         0.5s
```

もう最初のようなエラーは出ていませんね。正常に起動しました。
以上で解決です🎉

### 補足・ヒント

**stop と down の違い**
- `docker compose stop`: コンテナを停止（データ保持）
- `docker compose down`: コンテナを停止して削除
    （設定によってはデータが失われる可能性あるため慎重に）

**Windows環境**
- Docker Desktopの再起動が効果的な場合があります
- Windows 10では「高速スタートアップ」を無効化すると問題が解決することがあるそうです。

**ここまでやっても解決しない場合**
- Dockerデーモンの再起動: `sudo systemctl restart docker`
- Docker Desktopの再起動（Windows/Mac）
なども試してみると良いかもしません。

## チーム開発での注意点

### ポートマッピングの確認

チーム開発時には、チーム内で異なるポート設定になっていないか確認しましょう。
実際のアクセスURLがドキュメントと異なるときも稀にありますよね。

```bash
$ docker ps  # 実際のポートマッピングを確認
```

## 予防策

このようなエラーが発生した際にすぐに解決できない問題ではないことがわかりましたが、できれば未然に防ぎたいところですよね。どうすれば発生しないか考えてみましょう。

### 1. 作業終了時には必ずコンテナを停止する

毎日の作業終了時には、以下のコマンドでコンテナを適切に停止させるようにしましょう。
（READMEを確認するかメンバーに聞くなどして、プロジェクトに合わせたコマンドで置き換えて考えてください。）

```bash
# プロジェクトのコンテナを停止
$ docker compose down
# または
$ make down  # Makefileがある場合
```

これにより、翌日の作業開始時にポートの競合が発生する可能性を大幅に減らせます。

### 2. ポート番号の管理とチーム内ルール

#### ポート番号の使い分け
開発時は異なるプロジェクトで同じポート番号を使わないようにしましょう。
`docker-compose.yml`でポート番号を変更できます。
（チームでのルールがある場合はそちらを優先しましょう。）

```yaml
services:
  frontend:
    ports:
      - "3001:3000"  # React開発サーバー
  backend:
    ports:
      - "8001:8000"  # API サーバー
```

#### チーム開発での配慮
- プロジェクトごとにポート番号の使い分けルールを決める
- 共用環境では個人判断でクリーンアップコマンドを実行しない
- 重要なプロジェクト期間中（リリース前など）は特に注意深く慎重に操作する
- 不安な場合は実行前にチームメンバーや管理者に相談する

### 3. 適切なコンテナライフサイクル管理

開発中は以下のような習慣を身につけるのも良いですね。

```bash
# 作業開始時：必要なコンテナのみ起動
$ docker compose up -d

# 作業終了時：もう不要なら停止
$ docker compose down
```

これらの予防策により、「port is already allocated」エラーの発生頻度を大幅に減らすことができ、より快適な開発環境を維持できます。

他にも現場で取り入れている予防策などありましたら是非コメントなどで教えてください。
お待ちしております🙂‍↕️

## まとめ

「port is already allocated」エラーは、開発中に遭遇したことある方も少なくない問題かと思いますが、焦らず一つ一つ確認していき、適切に対処すれば安全に解決できますね。

**解決手順の要点**

1. `sudo lsof -i :ポート番号`でポート使用状況を確認
2. `docker ps`で実行中のコンテナを確認
3. `docker compose stop`や`docker compose down`でプロジェクトをクリーンアップ
4. 再度テスト実行

僕自身もこのように記事にまとめることで、Dockerの仕組みやLinuxのポート管理について勉強になりました。

開発環境をクリーンな状態に保つことで、予期せぬエラーを減らし、より効率的な開発ができるようになりますね。この記事が誰かの役に立てば幸いです。
皆さんの開発がスムーズに進むことを願っています👏

## 参考サイト

- [Docker公式ドキュメント - Docker Compose](https://docs.docker.com/reference/cli/docker/compose/)
- [Docker公式ドキュメント - Docker Engine](https://docs.docker.com/engine/)
- [lsofコマンドの使い方 - nixCraft](https://www.cyberciti.biz/faq/unix-linux-check-if-port-is-in-use-command/)
- [Linuxでのポート確認方法 - Linuxize](https://linuxize.com/post/check-listening-ports-linux/)