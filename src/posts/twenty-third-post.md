---
title: '【AWS SAM】Error: No changes to deploy. 原因と対処法'
date: '2025-08-12'
tags: ['AWS', 'Deploy', 'CICD', 'SAM', 'CloudFormation']
excerpt: 'AWS SAMでデプロイ時に発生する「No changes to deploy」エラーについて、原因と具体的な対処法を解説します'
---

## 概要

AWS SAM（Serverless Application Model）を使用してアプリケーションをデプロイする際、コードを変更したにもかかわらず「Error: No changes to deploy. Stack xxxxx is up to date」というエラーが発生することがあります。
この記事では、このエラーの原因と対処法について、公式ドキュメントなどの情報を基に解説していきます。

✒️この記事は、基本的なAWS SAMの使用経験があることを前提としています。

## エラーの背景

### CloudFormationの変更検出メカニズム

AWS SAMは内部的にAWS CloudFormationを使用してリソースを管理しています。CloudFormationは、スタックを更新する際に **Change Set（変更セット）** という仕組みを使って変更を検出します。

Change Setは、現在のスタックと新しいテンプレートや入力パラメータを比較し、CloudFormationが実行する変更内容を特定します。
Change Setを使用することで、CloudFormationが実際にスタックに加える変更を事前にプレビューできます。

### 変更検出の仕組み

CloudFormationは、スタックテンプレートで定義された期待される値と、実際のリソースの現在の状態を比較して変更を判定します。

具体的には...

- テンプレートファイルの内容
- パラメータの値
- リソースのプロパティ
- 設定値

これらの要素に変化がない場合、CloudFormationは「変更なし」と判断します。

## Error: No changes to deploy.が発生する主な原因

### 1. 実際に変更がない場合

まず非常に基本的な原因ですが、単純に前回のデプロイから実際に何も変更されていない場合にも発生します。

### 2. sam buildの実行忘れ

`sam deploy`コマンドは、`.aws-sam/build/template.yaml`ファイルをデプロイするため、`./template.yaml`ファイルへの変更は`sam build`コマンドを再実行しない限りデプロイされません。

💡 コードやテンプレートを変更した後は、
`sam build`を実行してから
`sam deploy`を行いましょう。

### 3. ファイルハッシュの問題

CloudFormationがS3に同じデータを持つファイルが既に存在すると判断し、アップロードをスキップする場合があります。
この場合、ログに以下のようなメッセージが表示されることがあります。

```
File with same data already exists at <hash>, skipping upload
```

### 4. パラメータのデフォルト値変更

CloudFormationテンプレートでパラメータのデフォルト値を変更しても、既存のスタックのパラメータ値は変更されません。
デフォルト値は、パラメータが初めて導入される際（スタック作成時または新しいパラメータの追加時）にのみ適用されます。

## 対処法

### 1. --no-fail-on-empty-changesetオプションの使用

CI/CDパイプラインや自動化スクリプトでは、このオプションの使用が実質的に必須となります。
これは今回のような問題への解決策として多くの記事やブログなどでも紹介されています。

`--no-fail-on-empty-changeset`オプションを使用することで、変更がない場合でもSAM CLIがエラーで終了せず、正常に完了します。

```bash
sam deploy --no-fail-on-empty-changeset
```

> **Note**
> CI/CDパイプラインでの使用例
> ```bash
> sam build
> sam deploy \
>   --resolve-s3 \
>   --no-confirm-changeset \
>   --no-fail-on-empty-changeset \
>   --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM
> ```

### 2. samconfig.tomlでの設定

設定ファイルに永続的にオプションを保存できます。

```toml
version = 0.1
[default]
[default.deploy]
[default.deploy.parameters]
stack_name = "your-stack-name"
s3_bucket = "your-bucket"
region = "your-region"
confirm_changeset = false
fail_on_empty_changeset = false
```

### 3. 基本的なワークフローの確認

変更を確実に反映させるための基本的な手順。

```bash
# 1. コードまたはテンプレートを変更
# 2. ビルドを実行
sam build

# 3. デプロイを実行
sam deploy --no-fail-on-empty-changeset
```

### 4. 強制的なアップロードが必要な場合

こちらは先に注意事項を確認しましょう。

> **Warning**
> `--force-upload`は必要以上に使用せず、他の方法で解決できない場合のみ使用してください。

S3アップロードを強制する場合は以下のように行います。

```bash
sam deploy --force-upload --no-fail-on-empty-changeset
```

## 一時的な回避策

> **Note**
> 以下の方法は一時的な回避策です。根本的な解決策ではないため、可能な限り`--no-fail-on-empty-changeset`オプションを使するなど、上で紹介した方試してみてください。

軽微な変更を追加し、変更検出を促す方法
- コメントの追加や変更
- Descriptionプロパティの更新  
- タグの追加や変更

例：
```yaml
Resources:
  MyFunction:
    Type: AWS::Serverless::Function
    Properties:
      # Modified for deployment - 2024-01-01
      CodeUri: src/
      Handler: app.handler
      Runtime: python3.9
```

## エラーコードの扱いについて

「変更なし」は技術的にはエラー状態ではないようです。何も問題は発生しておらず、すべて正常に機能しているためです。
しかし、SAM CLIは変更がない場合に終了コード1（エラーを示す値）を返します。
プログラムが正常に終了した場合は0、エラーが発生した場合は1以上の値を返すのが一般的で、自動化スクリプトやCI/CDパイプラインはこの値を見て成功・失敗を判断するため、問題となることがあるのです。

## CI/CDでの使用例

CI/CDパイプラインでは、自動化の要件に応じて以下のようなオプションがよく組み合わせて使用されています。

例：
```bash
sam build
sam deploy \
  --resolve-s3 \
  --no-confirm-changeset \
  --no-fail-on-empty-changeset \
  --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM
```

### 各オプションの役割

- --resolve-s3: S3バケットを自動作成
- --no-confirm-changeset: 手動確認をスキップ
- --no-fail-on-empty-changeset: 変更がない場合でもエラーで終了しない
- --capabilities: IAMリソースの作成を許可

## まとめ

AWS SAMの「変更なし」エラーは、CloudFormationの変更検出メカニズムによるものだということがわかりましたね。

このエラーは多くの開発者が経験しているようです。対処法を知っていれば解決することは難しくないので、もし同じような状況に遭遇した方はぜひ今回紹介した対処法を試してみてください。

- `--no-fail-on-empty-changeset`オプションを使用する
- `sam build`の実行を確認する
- 基本的なワークフローを見直す

特にCI/CDパイプラインでは、`--no-fail-on-empty-changeset`オプションの使用が必須です。
これにより、変更がない場合でもパイプラインが正常に完了し、開発フローが中断されてしまう事態を防ぐことができます。

## 参考資料

- [sam deploy - AWS Serverless Application Model](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-deploy.html) - sam deployコマンドの公式情報
- [Update CloudFormation stacks using change sets - AWS CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-changesets.html) - CloudFormation Change Setの公式ガイド
- [Bug: "No changes to deploy" is inappropriately treated as an error condition · Issue #8017 · aws/aws-sam-cli](https://github.com/aws/aws-sam-cli/issues/8017) - AWS SAM CLI GitHub Issues
- [SAM CLI CheatSheet - Medium](https://daaru.medium.com/sam-cli-cheatsheet-e20d3f2a5f0d) - 実践的なSAM CLIの使用方法