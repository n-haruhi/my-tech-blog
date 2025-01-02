---
title: '【GitHub】全publicリポジトリを一括でprivateに変更する方法'
date: '2024-11-25'
tags: ['Git', 'GitHub', 'GitHubAPI', 'Python']
excerpt: 'GitHub APIを使用して全てのpublicリポジトリを一括でprivateに変更する方法について解説します'
---

以前プライベートで使用していたGitHubアカウントを久々に見返したら、過去に練習で作成したpublicリポジトリが何十個もあり、はじめは手動でちまちまprivateに設定したりdeleteしたりしていたのですが、面倒だったので一括でprivateに変更できるスクリプトを作成。
使えたので記事として残しておこうと思います。

この記事では、[GitHub API](https://docs.github.com/ja/rest?apiVersion=2022-11-28) を使用して全ての`public`リポジトリを一括で`private`に変更する方法を紹介します。そんなに難しくなく、応用もきくのでよかったら見ていってください。

## 必要な環境
- Python
- VSCode（他のエディタでも可）
- GitHubアカウント

## ディレクトリ構造
実行に必要なファイルは以下の通りです。
```bash
github-tools/
├── venv/              # Python仮想環境（後のコマンドで自動生成される）
│   ├── Lib/
│   ├── Scripts/
│   └── pyvenv.cfg
└── github_private.py  # 作成するPythonスクリプト
```

> **Note**
> `venv`フォルダはPython仮想環境を作成すると自動的に生成されます。今回作成する必要があるのは`github_private.py`だけです。

では手順を実践的に見ていきましょう。

## 手順
今回は[必要な環境](#必要な環境)セクションの通り、VSCode使用、Pythonはインストール済みの想定で進めます。

### 1. 作業用フォルダの作成
デスクトップに作業用フォルダを作成します。
とても初歩的な説明ですが...丁寧にいきましょう。
1. デスクトップで右クリック
2. `+ 新規作成` → `📁フォルダー` で新しいフォルダを作成（例：`github-tools`）
3. VSCodeで新しいウィンドウを開き、このフォルダを開く（File → Open Folder）

### 2. Python仮想環境のセットアップ
VSCodeでターミナルを開き（`表示 → ターミナル` or `Ctrl + J`）、以下のコマンドを実行します。
```bash
PS C:\Users\[ユーザー名]\Desktop\github-tools> python -m venv venv
PS C:\Users\[ユーザー名]\Desktop\github-tools> .\venv\Scripts\activate
```

実行結果は特に何も返ってこないので正解です。これで仮想環境が作成されました。

> **Note**
> この時、VSCodeから「新しい環境が作成されました。これをワークスペース フォルダーに選択しますか?」という確認が表示されることがあります。「はい」を選択しておきましょう。

この選択をすると以下のようないいことがあります。
- VSCodeが作成した仮想環境（venv）を認識
- 適切なPythonインタープリターを自動的に選択
- 必要な拡張機能の提案をしてくれる

「今後は表示しない」を選択することはおすすめしません。将来別のプロジェクトで仮想環境を作成する際にも、この確認が必要になるかもしれないので。

### 3. 必要なパッケージのインストール
仮想環境で以下のコマンドを実行します。
```bash
pip install requests
```

必要なパッケージがインストールされます。
```powershell
(venv) PS C:\Users\[ユーザー名]\Desktop\github-tools> pip install requests
Collecting requests
  Downloading requests-2.32.3-py3-none-any.whl.metadata (4.6 kB)
[... 省略 ...]
Successfully installed certifi-2024.8.30 charset-normalizer-3.4.0 idna-3.10 requests-2.32.3 urllib3-2.2.3
```
上の例のように、`Successfully installed ...`と表示されたらokです。

### 4. GitHubトークンの作成
1. GitHubにログイン
2. 右上のプロフィールアイコン → `Settings`
3. 左メニュー最下部の`<> Developer settings`
4. 左メニューの`🔑 Personal access tokens` → `Tokens (classic)`
5. `Generate new token` → `Generate new token (classic)`
6. 設定項目（画像参照）
   - Note: "リポジトリprivate化用" など、用途がわかるメモを入力
   - Expiration: 30 days（デフォルトのままでok）
   - Select scopes: `repo` にチェック（自動的に必要な権限が全てチェックされます）

7. 画面を下のほうまでスクロールし、`Generate token`をクリック
8. 表示されたトークンをコピー（⚠️この画面を閉じると二度と表示されないので注意）

### 5. スクリプトの作成
VSCodeで新規ファイル`github_private.py`を作成し、以下のコードを貼り付けます。
```python
import requests
import os

def check_public_repos(github_token, execute_change=False):
    """
    GitHub上の自分のpublicリポジトリを確認し、オプションでprivateに変更する
    
    Parameters:
    github_token (str): GitHubのPersonal Access Token
    execute_change (bool): Trueの場合、実際に変更を実行
    """
    api_url = "https://api.github.com"
    headers = {
        "Authorization": f"token {github_token}",
        "Accept": "application/vnd.github.v3+json"
    }
    
    # 自分のpublicリポジトリを取得
    repos_url = f"{api_url}/user/repos?visibility=public"
    response = requests.get(repos_url, headers=headers)
    
    if response.status_code != 200:
        print(f"リポジトリの取得に失敗しました。ステータスコード: {response.status_code}")
        return
    
    repos = response.json()
    
    # 影響を受けるリポジトリの一覧を表示
    print(f"\n=== 影響を受けるリポジトリ（合計: {len(repos)}個）===")
    for i, repo in enumerate(repos, 1):
        print(f"{i}. {repo['full_name']} (★{repo['stargazers_count']} 👁️{repo['watchers_count']})")
    
    if not execute_change:
        print("\n※これは確認モードです。実際の変更は行われません。")
        print("変更を実行する場合は、execute_change=True を設定してください。")
        return
    
    # 変更実行の確認
    confirm = input("\n上記のリポジトリをprivateに変更します。実行しますか？(y/N): ")
    if confirm.lower() != 'y':
        print("操作をキャンセルしました")
        return
    
    # 各リポジトリをprivateに変更
    print("\n=== 変更を実行中 ===")
    for repo in repos:
        repo_name = repo['full_name']
        repo_url = f"{api_url}/repos/{repo['full_name']}"
        
        update_data = {
            "private": True
        }
        
        update_response = requests.patch(repo_url, json=update_data, headers=headers)
        
        if update_response.status_code == 200:
            print(f"✓ {repo_name} をprivateに変更しました")
        else:
            print(f"× {repo_name} の変更に失敗しました。ステータスコード: {update_response.status_code}")

if __name__ == "__main__":
    # GitHubのPersonal Access Tokenを環境変数から取得
    github_token = os.getenv("GITHUB_TOKEN")
    
    if not github_token:
        print("環境変数 GITHUB_TOKEN が設定されていません")
        exit(1)
    
    # まずは確認モードで実行
    check_public_repos(github_token, execute_change=False)
```

### 6. 環境変数の設定
VSCodeのターミナルで、以下のコマンドを実行してGitHubトークンを環境変数として設定します。
```powershell
$env:GITHUB_TOKEN = "[あなたのGitHubトークン]"
```

### 7. 実行と確認
まずは確認モードで実行します。
```bash
python github_private.py
```

上のコマンドを実行すると、変更対象のリポジトリ一覧が表示されます。
```powershell
=== 影響を受けるリポジトリ（合計: 3個）===
1. example/repo1 (★0 👁️0)
2. example/repo2 (★0 👁️0)
3. example/repo3 (★0 👁️0)

※これは確認モードです。実際の変更は行われません。
変更を実行する場合は、execute_change=True を設定してください。
```

今回の例ではpublicリポジトリが3つ見つかっていますね。これらをprivateに変更するということで問題なければ次へ進みます。

### 8. 実際に変更を実行
1. `github_private.py`を開き、`check_public_repos(github_token, execute_change=False)`というコードを見つけます。
以下のように変更します。
```python
check_public_repos(github_token, execute_change=True)  # FalseをTrueに
```

2. コマンドを再度実行
実際に変更を適用してみましょう。
```bash
python github_private.py
```

3. 確認プロンプトが表示されるので問題なければ指示通り`y`を入力し、`Enter`
```powershell
=== 影響を受けるリポジトリ（合計: 3個）===
1. example/repo1 (★0 👁️0)
2. example/repo2 (★0 👁️0)
3. example/repo3 (★0 👁️0)

上記のリポジトリをprivateに変更します。実行しますか？(y/N): y

=== 変更を実行中 ===
✓ example/repo1 をprivateに変更しました
✓ example/repo2 をprivateに変更しました
✓ example/repo3 をprivateに変更しました
```
これで完了です。

### 9. 完了確認
変更が正常に完了したことを確認するため、もう一度スクリプトを実行してみましょう。
```bash
python github_private.py
```

以下のように表示されていれば、全てのリポジトリが正常にprivateに変更されています。
```powershell
=== 影響を受けるリポジトリ（合計: 0個）===
```
念のためGitHub上でも確認しておきましょう。

## 終わったらトークンはどうする？
作業完了後は、以下の手順でクリーンアップすると良いです。
1. 作成したGitHubトークンを削除（GitHub設定のPersonal Access Tokensから）
2. 環境変数のクリア：
```powershell
$env:GITHUB_TOKEN = ""
```

## さいごに
同じような場面に遭遇することはあまりないかもしれませんが、[GitHub API](https://docs.github.com/ja/rest?apiVersion=2022-11-28) では他にもIssues/Gist/Pull Requestなどの生成 更新 取得 削除や、今回のようなRepositoryの更新 取得など(生成 削除も可)、でることは様々なので、応用して色んなスクリプトを試してみてください。
お疲れ様でした。

## 公式ドキュメント
https://docs.github.com/ja/rest?apiVersion=2022-11-28