"use client"
import Link from "next/link"
import { useState } from "react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-neon-slate shadow-lg border-b border-neon-border relative">
      <nav className="max-w-6xl mx-auto px-4 h-20">
        <div className="flex justify-between items-center h-full">
          <Link
            href="/"
            className="text-xl md:text-2xl font-bold text-neon-cyan hover:text-neon-blue transition-colors duration-300 neon-text"
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
            <Link href="/changelog" className="text-neon-text hover:text-neon-cyan transition-colors duration-300">
              DevLog
            </Link>
            <Link href="/about" className="text-neon-text hover:text-neon-cyan transition-colors duration-300">
              Profile
            </Link>
          </div>
          {/* モバイルメニューボタン */}
          <button className="md:hidden z-50" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <XMarkIcon className="h-6 w-6 text-neon-cyan" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-neon-text" />
            )}
          </button>
        </div>
        {/* オーバーレイ */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-70 transition-opacity duration-300 md:hidden z-30 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsOpen(false)}
        />
        {/* モバイルメニュー */}
        <div
          className={`fixed top-0 right-0 w-64 h-full bg-neon-slate border-l border-neon-border transform transition-transform duration-300 ease-in-out md:hidden z-40 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col space-y-2 pt-24 px-6">
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
      </nav>
    </header>
  )
}
