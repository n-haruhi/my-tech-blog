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
    // 記事内のh1, h2, h3タグを取得（article要素内のみを対象にする）
    const articleElement = document.querySelector('article')
    if (!articleElement) return

    const elements = articleElement.querySelectorAll('h1, h2, h3')
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
    <nav className="bg-white rounded-lg p-4 shadow-sm">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">目次</h2>
      <ul className="space-y-[2px] text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`
              ${heading.level === 1 ? 'font-semibold text-gray-800' : ''}
              ${heading.level === 2 ? 'pl-2 text-gray-700 flex items-center before:content-["•"] before:mr-2 before:text-gray-400' : ''}
              ${heading.level === 3 ? 'pl-6 text-gray-600 flex items-center before:content-["•"] before:mr-2 before:text-gray-400' : ''}
            `}
          >
            
            <a  href={`#${heading.id}`}
              className="block py-[2px] hover:text-blue-600 transition-colors duration-200 leading-normal"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: 'smooth'
                })
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}