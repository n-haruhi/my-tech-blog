---
title: '図書館システムで学ぶ "責任の分離"'
date: '2024-10-11'
tags: ['Python', 'ソフトウェア設計', 'オブジェクト指向', 'クリーンコード']
excerpt: '図書館システムの具体例を用いて、ソフトウェア設計における「責任の分離」の概念と実装方法を解説します'
---

今回は、ソフトウェア設計の重要な原則の一つ「責任の分離」について、図書館システムの例を用いてまとめてみようと思います。

## 「責任の分離」って何？
「責任の分離」とは、プログラムの各部分（クラスやモジュール）が特定の役割（責任）だけを持つようにする設計原則です。
「一つのことは一つの場所で行う」ということですね。

## 具体例：図書館システム
図書館システムを例に考えてみましょう。
このシステムは本の貸し出し、返却、検索などの機能を持っています。

### 改善前のコード
はじめは、こんな感じでコードを書いていたとしましょう：

```python
class LibraryRouter:
    def borrow_book(self, book_id, user_id):
        # 本の存在確認
        if not self.check_book_exists(book_id):
            return "本が見つかりません"
        
        # 本の貸出状況確認
        if self.is_book_borrowed(book_id):
            return "この本は既に貸し出し中です"
        
        # ユーザーの貸出数確認
        if self.get_user_borrowed_count(user_id) >= 5:
            return "貸出上限に達しています"
        
        # 貸出処理
        self.update_book_status(book_id, "borrowed")
        self.add_to_user_borrowed_list(user_id, book_id)
        
        return "貸出完了しました"

    def check_book_exists(self, book_id):
        # 本の存在確認ロジック
        pass

    def is_book_borrowed(self, book_id):
        # 貸出状況確認ロジック
        pass

    def get_user_borrowed_count(self, user_id):
        # ユーザーの貸出数取得ロジック
        pass

    def update_book_status(self, book_id, status):
        # 本の状態更新ロジック
        pass

    def add_to_user_borrowed_list(self, user_id, book_id):
        # ユーザーの貸出リスト更新ロジック
        pass
```

このコードでは、`LibraryRouter`クラスが、ルーティング（リクエストの受け取りと応答）だけでなく、ビジネスロジック（貸出処理）も行っていますね。この設計では、クラスの責任範囲が広すぎる可能性があります。

### 改善後のコード
「責任の分離」を適用するとこうなります：

```python
class LibraryRouter:
    def __init__(self, library_service):
        self.library_service = library_service

    def borrow_book(self, book_id, user_id):
        try:
            self.library_service.borrow_book(book_id, user_id)
            return "貸出完了しました", 200
        except BookNotFoundException:
            return "本が見つかりません", 404
        except BookAlreadyBorrowedException:
            return "この本は既に貸し出し中です", 400
        except UserBorrowLimitExceededException:
            return "貸出上限に達しています", 400
```

```python
class LibraryService:
    def borrow_book(self, book_id, user_id):
        if not self.check_book_exists(book_id):
            raise BookNotFoundException()
        
        if self.is_book_borrowed(book_id):
            raise BookAlreadyBorrowedException()
        
        if self.get_user_borrowed_count(user_id) >= 5:
            raise UserBorrowLimitExceededException()
        
        self.update_book_status(book_id, "borrowed")
        self.add_to_user_borrowed_list(user_id, book_id)
```

## 改善点
1. **ルーターの責任を明確に**：`LibraryRouter`は、リクエストの受け取りとレスポンスの返却だけを担当するようになりました。
2. **ビジネスロジックの分離**：貸出処理の詳細を`LibraryService`クラスに移動しました。
3. **エラー処理の改善**：改善後のコードでは、具体的なエラーは例外として`LibraryService`から投げられ、`LibraryRouter`でキャッチして適切なHTTPレスポンスに変換します。

## 「責任の分離」のメリット
1. **コードの理解しやすさ**：各クラスの役割が明確になり、コードが読みやすくなります。
2. **保守性の向上**：ビジネスロジックの変更が必要な場合、`LibraryService`だけを修正すれば良くなります。
3. **テストの容易さ**：`LibraryRouter`と`LibraryService`を個別にテストできます。
4. **再利用性**：`LibraryService`が他の場所でも使いやすくなります。

## 実践での注意点
「責任の分離」の原則は有用ですが、実際のプロジェクトで適用する際には以下の点に注意が必要です:

1. **オーバーエンジニアリング**：小規模なプロジェクトでは、過度な分離により複雑さが増す可能性があります。プロジェクトの規模に応じて適切なバランスを取ることが重要です。

2. **チームでの共通理解**：チーム全体が一貫して適用することが重要です。個々の開発者の判断にばらつきがあると、コードの一貫性が損なわれる可能性があります。

3. **既存のシステムへの適用**：既存のシステムに対してこの原則を適用する場合は、段階的なリファクタリングが必要になります。一度に大規模な変更を行うとリスクが高くなります。

これらを念頭に置きつつ、プロジェクトの状況に応じて柔軟に適用していくと良いですね。

## まとめ
「責任の分離」を意識すると、コードがより整理されます。整理されたコードは理解がしやすく、保守もしやすくなります。これの良さや大切さは、プロジェクトが大きくなるにつれて実感しますね。

コードを書く際は「このクラス（関数）の責任は何か」を考えてみることで、きっと、よりクリーンで管理しやすいコードになるでしょう。