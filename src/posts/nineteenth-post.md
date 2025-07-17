---
title: '【Linux/Unix】Shebang（#!）とは？スクリプトを直接実行する仕組みの基本と使い方'
date: '2025-06-20'
tags: ['Linux', 'Unix', 'Shebang', 'スクリプト']
excerpt: 'スクリプトファイルの先頭に書く#!/usr/bin/env nodeなどのShebang（シバン）について、その役割と使い方を詳しく解説します'
---

スクリプトファイルを作成するとき、頭に `#!/usr/bin/env node` や `#!/bin/bash` のような記述をすることがあるかと思います。
Node.jsのプロジェクトなどでよく見かける `#!/usr/bin/env node` 、いつもなんとなくそういうものだと思って書いているけどこれって一体何者だろう、どういう役割を担っているんだろうと思い、調べてみました。
今回はこの **Shebang（シバン）** についてまとめようと思います。

## Shebangとは何か

Shebang（シバン）は、スクリプトファイルの先頭に書く `#!` で始まる特別な行のことです。この文字列（#!）はシバンと呼ばれ、そのファイルの残りの部分を解析するために使用するインタープリターをオペレーティングシステムに伝えるために使用されます。

> **Note**
> インタープリターとは、プログラムのソースコードを1行ずつ読み込んで その場で実行するプログラムのことです。今回の話でいうと、スクリプトファイル（JavaScriptやPython、Bashなど）を実行するためのプログラムのことを指します。
> 
> 例えば:
> Node.js → JavaScriptファイルを実行するインタープリター
> Python → Pythonファイルを実行するインタープリター
> Bash → シェルスクリプトを実行するインタープリター
> 
> コンパイル言語（C言語など）とは異なり、事前にマシン語に変換する必要がなく、ソースコードを直接実行できるのが特徴です。

> **Note**
> オペレーティングシステム（OS）とは、コンピューター全体を管理する基本的なソフトウェアのことです。Windows、macOS、Linuxなどが代表的な例です。
> ここでいうオペレーティングシステムとは、OSがスクリプトファイルを実行しようとした際に「このファイルはどのプログラムで実行すればいいのか？」を判断する役割を担っています。Shebangがあることで、OSは適切なインタープリターを選んでスクリプトを実行できるのです。

### なぜShebangが必要なのか

コンピューターはテキストファイルを見ただけでは、それがどの言語で書かれているのかわかりません。そこでShebangは「このファイルはこのプログラムで実行してください」という指示を与える役割を果たします。

## Shebangの書き方と例

### 基本的な構文

```
#!/path/to/interpreter
```

### よく使われるShebangの例

#### JavaScript（Node.js）
```javascript
#!/usr/bin/env node
console.log("Hello World");
```

#### Bash
```bash
#!/bin/bash
echo "Hello World"
```

#### Python
```python
#!/usr/bin/env python3
print("Hello World")
```

#### PHP
```php
#!/usr/bin/env php
<?php
echo "Hello World";
```

## 直接パスと/usr/bin/env の違い

Shebangには主に2つの書き方があります。

### 1. 直接パスを指定する方法
```bash
#!/bin/bash
#!/usr/bin/python3
```

### 2. `/usr/bin/env` を使う方法
```bash
#!/usr/bin/env bash
#!/usr/bin/env python3
#!/usr/bin/env node
```

### ではどちらを選ぶか

一般的には **`/usr/bin/env` を使う方法がより良い** かと思います。

理由は以下の通りです：
- 異なるシステムで異なる場所にインタープリターがインストールされていても動作する
- システムの PATH環境変数 を使ってインタープリターを検索できる柔軟性
- PythonやNode.jsの仮想環境でも適切に動作する

ただし、セキュリティが重要なシステムでは直接パスを指定することもあるそうです。

> **Note**
> PATH環境変数とは、コマンドを実行する際にシステムがプログラムを探す場所を指定する設定のことです。
> 
> 例えば、ターミナルで `node` と入力すると、システムはPATH環境変数に登録された複数のディレクトリを順番に探して、`node` というプログラムを見つけて実行します。
> 
> `/usr/bin/env` を使うことで、このPATH環境変数を利用してインタープリターを探すため、インタープリターがどこにインストールされていても自動的に見つけて実行できるのです。

## Shebangがあるとできること

### 1. スクリプトファイルの直接実行

Shebangがあると、スクリプトファイルを直接実行できます。

```bash
# Shebangがある場合
./myscript.js     # 直接実行可能

# Shebangがない場合
node myscript.js  # インタープリターを明示的に指定する必要がある
```

### 2. 実行権限の設定

直接実行するには、ファイルに実行権限を与える必要があります。

```bash
chmod +x myscript.js
```

## 使用例を見てみましょう

### 例1. デプロイスクリプト
```bash
#!/bin/bash
# アプリケーションのデプロイを自動化

echo "ビルドを開始します..."
npm run build

echo "ファイルをサーバーにアップロードします..."
rsync -av dist/ server:/var/www/html/

echo "デプロイが完了しました"
```

### 例2. Node.jsのCLIツール
```javascript
#!/usr/bin/env node

const args = process.argv.slice(2);

if (args.length === 0) {
    console.log("使用法: ./tool.js <コマンド>");
    process.exit(1);
}

console.log(`実行するコマンド: ${args[0]}`);
// CLIツールのロジックをここに実装
```

### 例3. データ処理の自動化スクリプト
```python
#!/usr/bin/env python3

import pandas as pd
import sys

def process_csv(filename):
    """CSVファイルを処理する関数"""
    df = pd.read_csv(filename)
    # データ処理のロジック
    return df

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("使用法: ./process_data.py <csvファイル>")
        sys.exit(1)
    
    result = process_csv(sys.argv[1])
    print("処理が完了しました")
```

## ポイントと想定される疑問

### 1. ファイルの先頭に配置する

ディレクティブはスクリプトの最初の行でないといけません。

```bash
〇 正解例
#!/bin/bash
echo "Hello World"

✕ 間違った例 - 先頭にコメントがある
# これはコメントです
#!/bin/bash
echo "Hello World"
```

> **Note**
> ディレクティブとは、プログラムやシステムに対して「こうしてください」という指示を出すための特別な記述のことです。ここでは、Shebang（#!）がディレクティブにあたります。
> OSに対して「このファイルは指定されたインタープリターで実行してください」という指示を出しているため、ディレクティブと呼ばれます。他にも プログラムの動作を制御するための様々なディレクティブが存在します。

### 2. 実行権限を設定

実行権限の設定は Shebang を使って直接実行する場合は必須です。
権限がない場合、エラーが発生します。以下のコマンドで設定してから実行してみましょう。

```bash
# 実行権限がないというエラー
./myscript.js
# Permission denied

# 実行権限を設定
chmod +x myscript.js
./myscript.js  # これで正常に実行できる
```

### 3. パスの存在確認

何か問題があった場合や実行前には Shebang で指定したインタープリターが実際に存在することを確認しましょう。
確認したい場合は以下のどちらかのコマンドを実行します。

```bash
which node
# もしくは
whereis python3
```

### 4. WindowsでもShebangは動作するか

ShebangはUnix系OS（Linux、macOS）の機能です。WindowsのコマンドプロンプトやPowerShellでは無視されます。ただし、WSL（Windows Subsystem for Linux）やGit Bashなどの環境では動作します。

### 5. 複数のインタープリターを指定できるか

Shebangで指定できるインタープリターは1つだけです。ただし、インタープリターにオプションを渡すことは可能です。

```bash
#!/bin/bash -x  # デバッグモードで実行
#!/usr/bin/env python3 -u  # バッファリングを無効化
```

## まとめ

Shebangは、スクリプトファイルを直接実行可能にする重要な仕組みです。特に以下の点を覚えておきたいですね

- `#!` で始まり、ファイルの最初の行に記述する
- 一般的に推奨されるのは`/usr/bin/env` を使った書き方
- Unix系OSでのみ有効（Windows単体では無効）
- 実行権限の設定（`chmod +x`）が必要

現場では、CI/CDパイプライン、サーバー管理、データ処理の自動化など、様々な場面で活用されます。

この記事が、僕のようになんとなくそういうものだという感じで書いている方への理解の助けや、より効率的な開発を行う力となれば幸いです。

## 参考サイト

- [Shebang (Unix) - Wikipedia](https://en.wikipedia.org/wiki/Shebang_(Unix))
- [Using Shebang #! in Linux Scripts | Baeldung on Linux](https://www.baeldung.com/linux/shebang)
- [Bash Shebang | Linuxize](https://linuxize.com/post/bash-shebang/)
- [Linux Bash Shell Scripting Tutorial - Shebang](https://bash.cyberciti.biz/guide/Shebang)