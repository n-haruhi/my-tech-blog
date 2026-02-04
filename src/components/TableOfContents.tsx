"use client"
import { useState, useEffect } from "react"

type Heading = {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  onItemClick?: () => void
  collapsible?: boolean
  isOpen?: boolean
  onToggle?: () => void
}

export default function TableOfContents({ onItemClick, collapsible, isOpen, onToggle }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([])

  useEffect(() => {
    // 記事内のh1, h2, h3タグを取得（article要素内のみを対象にする）
    const articleElement = document.querySelector("article")
    if (!articleElement) return

    const elements = articleElement.querySelectorAll("h1, h2, h3")
    const headingElements = Array.from(elements)

    // 見出し要素を配列に変換
    const headings = headingElements.map((heading) => {
      // 各見出しにIDを設定（スクロール用）
      const id = heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, "-") || ""
      if (!heading.id) {
        heading.id = id
      }

      return {
        id,
        text: heading.textContent || "",
        level: Number.parseInt(heading.tagName[1]),
      }
    })

    setHeadings(headings)
  }, [])

  if (headings.length === 0) {
    return null
  }

  const handleClick = (headingId: string) => {
    document.getElementById(headingId)?.scrollIntoView({
      behavior: "smooth",
    })
    onItemClick?.()
  }

  return (
    <nav className="bg-neon-card rounded-lg border border-neon-border w-full hover:border-neon-cyan transition-colors duration-300">
      {collapsible ? (
        <button
          onClick={onToggle}
          className="w-full p-4 text-left flex items-center justify-between hover:bg-neon-slate/50 transition-colors rounded-t-lg"
        >
          <div className="flex items-center gap-3">
            <div className="w-1 h-5 bg-neon-cyan"></div>
            <h2 className="text-lg font-semibold text-neon-text">目次</h2>
          </div>
          <svg className={`w-5 h-5 text-neon-cyan transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      ) : (
        <div className="p-4 pb-0">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-5 bg-neon-cyan"></div>
            <h2 className="text-lg font-semibold text-neon-text">目次</h2>
          </div>
        </div>
      )}
      
      {(!collapsible || isOpen) && (
        <div className="p-4 pt-0">
          <ul className="space-y-1 text-sm">
            {headings.map((heading) => (
              <li
                key={heading.id}
                className={`
                  ${heading.level === 1 ? "font-semibold text-neon-text" : ""}
                  ${
                    heading.level === 2
                      ? "pl-3 text-neon-muted flex items-start before:content-['•'] before:mr-2 before:text-neon-cyan before:flex-shrink-0 before:mt-0.5"
                      : ""
                  }
                  ${
                    heading.level === 3
                      ? "pl-6 text-neon-muted flex items-start before:content-['•'] before:mr-2 before:text-neon-cyan before:flex-shrink-0 before:mt-0.5"
                      : ""
                  }
                `}
              >
                <button
                  className="text-left py-1 hover:text-neon-cyan transition-colors duration-200 leading-relaxed w-full"
                  onClick={(e) => {
                    e.preventDefault()
                    handleClick(heading.id)
                  }}
                >
                  {heading.text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}