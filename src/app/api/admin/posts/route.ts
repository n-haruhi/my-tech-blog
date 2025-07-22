import { NextRequest, NextResponse } from 'next/server'
import { getSortedPostsData } from '@/lib/posts'
import { createPost, validatePostData, CreatePostData } from '@/lib/admin-posts'
import { getCurrentUser } from '@/lib/auth'

// GET /api/admin/posts - 記事一覧取得
export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: '認証が必要です' },
        { status: 401 }
      )
    }

    const posts = getSortedPostsData()
    return NextResponse.json({ posts })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: '記事一覧の取得に失敗しました' },
      { status: 500 }
    )
  }
}

// POST /api/admin/posts - 新規記事作成
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: '認証が必要です' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const postData: CreatePostData = {
      title: body.title,
      date: body.date,
      tags: body.tags,
      excerpt: body.excerpt,
      content: body.content,
    }

    // データの検証
    const validation = validatePostData(postData)
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'バリデーションエラー', details: validation.errors },
        { status: 400 }
      )
    }

    // 記事を作成
    const result = await createPost(postData)
    
    if (result.success) {
      return NextResponse.json(
        { message: '記事を作成しました', slug: result.slug },
        { status: 201 }
      )
    } else {
      return NextResponse.json(
        { error: result.error || '記事の作成に失敗しました' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: '記事の作成に失敗しました' },
      { status: 500 }
    )
  }
}