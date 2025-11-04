---
title: '【Rails】テーブルの削除方法'
date: '2024-03-31'
tags: ['Ruby', 'Rails', 'Cloud9']
excerpt: 'Railsでのテーブル削除の手順について、具体的な手順とコマンドを解説します'
---

不要になったテーブルや間違って作成してしまったテーブルの削除手順について。
いざというときになんだったかなと忘れてしまっているので備忘録として残しておきます。

## 環境
- OS: Windows
- IDE: Cloud9
- Ruby-3.1.2
- Rails 6.1.7.6

## 手順
### 1. 以下のコマンドでモデルを削除
```bash
$ rails destroy model 削除するモデル名
```

### 2. マイグレーションファイルを作成
```bash
$ rails g migration ファイル名
```

### 3. 作成したマイグレーションファイルを編集
  `def change`と`end`の間に`drop_table :削除するテーブル名`を追記、保存します。
  例) genresテーブルを削除したい場合

```ruby
class Genres < ActiveRecord::Migration[7.0]
  def change
    drop_table :genres
  end
end
```

### 4. 最後に忘れずマイグレーションを実行
```bash
$ rails db:migrate
```

これでテーブルが削除されました。
モデルを削除してもテーブルは削除されず残っています。
不要なテーブルは上記手順で削除し、忘れず`rails db:migrate`を行いましょう。