"use client"

import Link from "next/link"
import { useState } from "react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-neon-slate shadow-lg border-b border-neon-border relative z-50">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl sm:text-2xl font-bold text-neon-cyan hover:text-neon-blue transition-colors duration-300 neon-text"
        >
          pen2 Tech Blog
        </Link>
        {/* デスクトップメニュー */}
        <div className="hidden md:flex space-x-5">
          <Link href="/" className="text-neon-text hover:text-neon-cyan transition-colors duration-300">
            Top
          </Link>
          <Link href="/posts" className="text-neon-text hover:text-neon-cyan transition-colors duration-300">
            Articles
          </Link>
          <Link href="/portfolio" className="text-neon-text hover:text-neon-cyan transition-colors duration-300">
            Portfolio
          </Link>
          <Link href="/changelog" className="text-neon-text hover:text-neon-cyan transition-colors duration-300">
            DevLog
          </Link>
          <Link href="/about" className="text-neon-text hover:text-neon-cyan transition-colors duration-300">
            Profile
          </Link>
        </div>
        {/* モバイルメニューボタン */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
        >
          {isOpen ? (
            <svg className="h-6 w-6 text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6 text-neon-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>
      {/* オーバーレイ */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-70 transition-opacity duration-300 md:hidden z-30 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      />
      {/* モバイルメニュー */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-neon-slate border-l border-neon-border transform transition-transform duration-300 ease-in-out md:hidden z-40 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="モバイルメニュー"
      >
        <div className="flex flex-col space-y-2 pt-20 px-6">
          <Link
            href="/"
            className="text-neon-text hover:text-neon-cyan py-2 text-lg transition-colors duration-300"
            onClick={() => setIsOpen(false)}
          >
            Top
          </Link>
          <Link
            href="/posts"
            className="text-neon-text hover:text-neon-cyan py-2 text-lg transition-colors duration-300"
            onClick={() => setIsOpen(false)}
          >
            Articles
          </Link>
          <Link
            href="/portfolio"
            className="text-neon-text hover:text-neon-cyan py-2 text-lg transition-colors duration-300"
            onClick={() => setIsOpen(false)}
          >
            Portfolio
          </Link>
          <Link
            href="/changelog"
            className="text-neon-text hover:text-neon-cyan py-2 text-lg transition-colors duration-300"
            onClick={() => setIsOpen(false)}
          >
            DevLog
          </Link>
          <Link
            href="/about"
            className="text-neon-text hover:text-neon-cyan py-2 text-lg transition-colors duration-300"
            onClick={() => setIsOpen(false)}
          >
            Profile
          </Link>
        </div>
      </div>
    </header>
  )
}
