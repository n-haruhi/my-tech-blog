import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'

const SECRET_KEY = process.env.AUTH_SECRET || 'fallback-secret-key'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

// JWT用の秘密鍵をバイト配列に変換
const secret = new TextEncoder().encode(SECRET_KEY)

export interface AuthPayload {
  userId: string
  role: string
  exp?: number
  iat?: number
}

// JWTトークンを生成
export async function generateToken(payload: { userId: string; role: string }) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret)
  
  return token
}

// JWTトークンを検証
export async function verifyToken(token: string): Promise<AuthPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret)
    
    // unknown経由で型変換（TypeScriptの推奨方法）
    const authPayload = payload as unknown as AuthPayload
    
    // 必要なプロパティの存在確認
    if (!authPayload.userId || !authPayload.role) {
      console.error('Invalid token payload: missing required fields')
      return null
    }
    
    return authPayload
  } catch (error) {
    console.error('Token verification failed:', error)
    return null
  }
}

// パスワードをハッシュ化
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

// パスワードを検証
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

// 管理者パスワードを検証
export async function verifyAdminPassword(password: string): Promise<boolean> {
  // 本番環境では事前にハッシュ化されたパスワードを使用することを推奨
  return password === ADMIN_PASSWORD
}

// Cookieからトークンを取得
export async function getTokenFromCookies(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get('admin-token')?.value || null
}

// 現在のユーザーを取得
export async function getCurrentUser(): Promise<AuthPayload | null> {
  const token = await getTokenFromCookies()
  if (!token) return null
  
  return verifyToken(token)
}

// Middlewareでの認証チェック用（Next.js Middleware用）
export async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get('admin-token')?.value
  if (!token) return false
  
  const payload = await verifyToken(token)
  return payload !== null
}