import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 管理画面のパスをチェック
  if (pathname.startsWith('/admin')) {
    // 認証チェック
    const authenticated = await isAuthenticated(request)
    
    if (!authenticated) {
      // 未認証の場合はログインページにリダイレクト
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
  ]
}