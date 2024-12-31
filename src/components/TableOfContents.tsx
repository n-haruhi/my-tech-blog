'use client'

import { useState, useEffect } from 'react'

type Heading = {
  id: string
  text: string
  level: number
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])

  useEffect(() => {
    // 記事内のh1, h2, h3タグを取得
    const elements = document.querySelectorAll('h1, h2, h3')
    const headingElements = Array.from(elements)

    // 見出し要素を配列に変換
    const headings = headingElements.map((heading) => {
      // 各見出しにIDを設定（スクロール用）
      const id = heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, '-') || ''
      if (!heading.id) {
        heading.id = id
      }

      return {
        id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName[1])
      }
    })

    setHeadings(headings)
  }, [])

  if (headings.length === 0) {
    return null
  }

  return (
    <nav className="bg-white rounded-lg p-4 shadow-sm mb-10">
      <h2 className="text-lg font-semibold mb-3">目次</h2>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 1) * 0.875}rem` }}
          >
            
            <a href={`#${heading.id}`}
              className="text-gray-600 hover:text-blue-600 hover:underline"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}