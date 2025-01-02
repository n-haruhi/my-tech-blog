---
title: '【Rails】バリデーション ~どちらか一方必須。両方値が入っているのもok~'
date: '2024-01-29'
tags: ['Ruby', 'Rails', 'Cloud9']
excerpt: 'Railsで複数フィールドの一方のみ必須となるカスタムバリデーションの実装方法を解説します'
---

ユーザーが投稿を行う際の設定として、titleは必須、ただしbodyとemotionはどちらか一方に値が入っていれば良い、両方に値が入っているのもokという風にしたかったので、今回カスタムのバリデーションルールを設定しました。備忘録として残しておきます。

## 環境
- OS: Windows
- IDE: Cloud9
- Ruby-3.1.2
- Rails 6.1.7.6

## モデルのコード
今回のモデルの記述がこちらです。
```ruby
class Post < ApplicationRecord
  validates :title, presence: true
  validate :require_either_emotion_or_body

  def require_either_emotion_or_body
    if emotion.blank? && body.blank?
      errors.add(:base, "気持ちか内容のどちらか一方は必須です。")
    end
  end

end
```
では、ひとつずつ分けて見ていきましょう。

### 解説
```ruby
validate :require_either_emotion_or_body
```
- `validate`メソッドによってカスタムのバリデーションルールが呼び出され、指定された条件に満たされない場合、エラーメッセージが追加されます。

> **Note**
> なぜvalidatesではなく単数のvalidate？
> **validates**メソッドは、標準的なバリデーションを書くときに使用します。主要なものを挙げると、`presence`、`uniqueness`、`length`…等々ですね。こういったバリデーションを定義する場合は複数形のこちらを使います。
> 一方、単数の**validate**メソッドは、自分で個別にカスタムのバリデーションルールを定義するときに使用されます。今回は標準的なものではなく、カスタムのルールを定義するので単数の`validate`で記述するということです。

```ruby
def require_either_emotion_or_body
  if emotion.blank? && body.blank?
    errors.add(:base, "気持ちか本文のどちらか一方は必須です。")
  end
end
```

- `require_either_emotion_or_body`メソッド
オブジェクトが保存される前に呼び出されます。`emotion`と`body`のどちらか一方、または両方が存在しない場合にエラーメッセージを追加します。

- `if emotion.blank? && body.blank?`
それぞれ`emotion`と`body`が空かどうかを確認するためのメソッドです。
`&&`というのは論理演算子。例えば「a && b」なら「a 且つ b が true であれば」という意味になります。なので今回のを直訳するなら、(emotionが空) 且つ (bodyが空) が　trueであれば。になります。

- `errors.add(:base, "気持ちか本文のどちらか一方は必須です。")`
`errors`オブジェクトにエラーメッセージを追加するためのメソッドです。
`:base`は、エラーがモデル全体に関連していることを示します。

モデルのコードは以上のようなつくりになっています。これにより、`body`と`emotion`のいずれかが存在することを確認、両方とも空の場合にエラーメッセージを表示することができます。つまり「`body`と`emotion`はどちらか一方に値が入っていれば良い、両方に値が入っていてもok」という設定ができたわけですね。

モデルができたら、あとはコントローラの必要箇所を分岐させてrender :アクション名とし、そのエラーを表示したいビューにエラーメッセージについてのコードを記述をすれば完成です。

## エラーメッセージを表示
```erb
<% if @post.errors.any? %>
  <%= @post.errors.count %>error prohibited this obj from being saved:
  <ul>
    <% @post.errors.full_messages.each do |message| %>
      <li><%= message %></li>
    <% end %>
  </ul>
<% end %>
```
- `errors`は、モデルにバリデーションをかけたときに発生したエラーの内容を確認できるメソッドです。
- `any?`メソッドで`errors`の中身を確認。中身が存在する(エラーがある)場合はtrueとなります。
- `full_messages`と組み合わせることで、エラー内容を出力できます。 
これらを組み合わせることで、エラーが発生しているか判定することができ、`each do |message|`による繰り返し処理でエラーメッセージを出力するという仕組みです。