---
title: 'sample技術ブログ記事'
date: '2024-12-31'
tags: ['Next.js', 'ブログ']
excerpt: 'Next.jsを使って技術ブログを作成する過程について書いていきます'
---

# 技術ブログ記事サイト作成
このブログサイトは Next.js で作成しています。

選定理由としては以下の点が挙げられます。
- TypeScriptのサポート
- ファイルベースのルーティング
- 優れたパフォーマンス
- 充実したエコシステム

## 実装の過程
実装の詳細については順次書いていきます...

## 動作確認コードサンプル
TypeScriptでのコンポーネント実装例：

```typescript
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    
      Count: {count}
      <button onClick={() => setCount(count + 1)}>
        Increment
      
    
  )
}
```

CSSの例：

```css
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}
```