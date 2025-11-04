import { NextRequest, NextResponse } from 'next/server'
import { getPostData } from '@/lib/posts'
import { updatePost, deletePost, validatePostData, UpdatePostData } from '@/lib/admin-posts'
import { getCurrentUser } from '@/lib/auth'

type Props = {
  params: Promise<{
    slug: string
  }>
}

// GET /api/admin/posts/[slug] - 記事詳細取得
export async function GET(request: NextRequest, { params }: Props) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: '認証が必要です' },
        { status: 401 }
      )
    }

    const resolvedParams = await params
    const post = await getPostData(resolvedParams.slug)
    
    return NextResponse.json({ post })
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json(
      { error: '記事が見つかりませんでした' },
      { status: 404 }
    )
  }
}

// PUT /api/admin/posts/[slug] - 記事更新
export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: '認証が必要です' },
        { status: 401 }
      )
    }

    const resolvedParams = await params
    const body = await request.json()
    
    const postData: UpdatePostData = {
      slug: resolvedParams.slug,
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

    // 記事を更新
    const result = await updatePost(postData)
    
    if (result.success) {
      return NextResponse.json({ message: '記事を更新しました' })
    } else {
      return NextResponse.json(
        { error: result.error || '記事の更新に失敗しました' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error updating post:', error)
    return NextResponse.json(
      { error: '記事の更新に失敗しました' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/posts/[slug] - 記事削除
export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: '認証が必要です' },
        { status: 401 }
      )
    }

    const resolvedParams = await params
    const result = await deletePost(resolvedParams.slug)
    
    if (result.success) {
      return NextResponse.json({ message: '記事を削除しました' })
    } else {
      return NextResponse.json(
        { error: result.error || '記事の削除に失敗しました' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json(
      { error: '記事の削除に失敗しました' },
      { status: 500 }
    )
  }
}