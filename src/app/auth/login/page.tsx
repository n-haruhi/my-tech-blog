"use client"
import { useState } from "react"
import type React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function AdminLogin() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      })
      if (response.ok) {
        // ログイン成功
        router.push("/admin")
        router.refresh()
      } else {
        const data = await response.json()
        setError(data.error || "ログインに失敗しました")
      }
    } catch (error) {
      console.error("Login request failed:", error)
      setError("ログインに失敗しました")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-neon-dark flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="w-full max-w-md">
        {/* ログインフォーム */}
        <div className="bg-neon-card border border-neon-border rounded-lg shadow-lg p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-neon-text mb-6 sm:mb-8 text-center">管理者ログイン</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neon-text mb-2">
                パスワード
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-neon-slate border border-neon-border rounded-md text-neon-text placeholder-neon-muted focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent text-base"
                placeholder="管理者パスワードを入力"
                required
              />
            </div>
            {error && (
              <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-md p-3">{error}</div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-neon-cyan hover:bg-neon-blue text-neon-dark font-semibold py-2.5 px-4 rounded-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md text-base"
            >
              {loading ? "ログイン中..." : "ログイン"}
            </button>
          </form>
          <div className="mt-6 sm:mt-8 text-center">
            <Link href="/" className="text-neon-muted hover:text-neon-text transition-colors text-sm">
              ← サイトに戻る
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}