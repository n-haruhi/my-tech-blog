import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminPassword, generateToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json(
        { error: 'パスワードが入力されていません' },
        { status: 400 }
      )
    }

    // 管理者パスワードを検証
    const isValid = await verifyAdminPassword(password)
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'パスワードが正しくありません' },
        { status: 401 }
      )
    }

    // JWTトークンを生成
    const token = await generateToken({
      userId: 'admin',
      role: 'admin'
    })

    // レスポンスにCookieを設定
    const response = NextResponse.json({ success: true })
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 // 24時間
    })

    return response
  } catch (error) {
    console.error('Admin login failed:', error)
    return NextResponse.json(
      { error: 'ログインに失敗しました' },
      { status: 500 }
    )
  }
}