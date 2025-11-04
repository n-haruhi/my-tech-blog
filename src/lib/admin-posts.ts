import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'src/posts')

export interface CreatePostData {
  title: string
  date: string
  tags: string[]
  excerpt: string
  content: string
}

export interface UpdatePostData extends CreatePostData {
  slug: string
}

// スラッグを生成する関数
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // 英数字とスペース、ハイフンのみ許可
    .replace(/\s+/g, '-') // スペースをハイフンに
    .replace(/-+/g, '-') // 連続するハイフンを1つに
    .trim()
}

// ファイル名の安全性をチェック
function validateFileName(fileName: string): boolean {
  const safePattern = /^[a-z0-9-]+$/
  return safePattern.test(fileName)
}

// マークダウンファイルを作成
export async function createPost(data: CreatePostData): Promise<{ success: boolean; slug?: string; error?: string }> {
  try {
    // スラッグを生成
    const baseSlug = generateSlug(data.title)
    let slug = baseSlug
    let counter = 1

    // 重複チェックして一意のスラッグを生成
    while (fs.existsSync(path.join(postsDirectory, `${slug}.md`))) {
      slug = `${baseSlug}-${counter}`
      counter++
    }

    // ファイル名の安全性チェック
    if (!validateFileName(slug)) {
      return { success: false, error: 'Invalid characters in title' }
    }

    // フロントマターを作成
    const frontMatter = {
      title: data.title,
      date: data.date,
      tags: data.tags,
      excerpt: data.excerpt,
    }

    // マークダウン形式で結合
    const fileContent = matter.stringify(data.content, frontMatter)

    // ファイルに書き込み
    const filePath = path.join(postsDirectory, `${slug}.md`)
    await fs.promises.writeFile(filePath, fileContent, 'utf8')

    return { success: true, slug }
  } catch (error) {
    console.error('Error creating post:', error)
    return { success: false, error: 'Failed to create post' }
  }
}

// マークダウンファイルを更新
export async function updatePost(data: UpdatePostData): Promise<{ success: boolean; error?: string }> {
  try {
    // 既存ファイルのパスをチェック
    const filePath = path.join(postsDirectory, `${data.slug}.md`)
    
    if (!fs.existsSync(filePath)) {
      return { success: false, error: 'Post not found' }
    }

    // フロントマターを作成
    const frontMatter = {
      title: data.title,
      date: data.date,
      tags: data.tags,
      excerpt: data.excerpt,
    }

    // マークダウン形式で結合
    const fileContent = matter.stringify(data.content, frontMatter)

    // ファイルを更新
    await fs.promises.writeFile(filePath, fileContent, 'utf8')

    return { success: true }
  } catch (error) {
    console.error('Error updating post:', error)
    return { success: false, error: 'Failed to update post' }
  }
}

// マークダウンファイルを削除
export async function deletePost(slug: string): Promise<{ success: boolean; error?: string }> {
  try {
    // ファイル名の安全性チェック
    if (!validateFileName(slug)) {
      return { success: false, error: 'Invalid slug format' }
    }

    const filePath = path.join(postsDirectory, `${slug}.md`)
    
    if (!fs.existsSync(filePath)) {
      return { success: false, error: 'Post not found' }
    }

    // ファイルを削除
    await fs.promises.unlink(filePath)

    return { success: true }
  } catch (error) {
    console.error('Error deleting post:', error)
    return { success: false, error: 'Failed to delete post' }
  }
}

// 記事データの検証
export function validatePostData(data: Partial<CreatePostData>): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!data.title || data.title.trim().length === 0) {
    errors.push('タイトルは必須です')
  }

  if (!data.date || !data.date.match(/^\d{4}-\d{2}-\d{2}$/)) {
    errors.push('日付は YYYY-MM-DD 形式で入力してください')
  }

  if (!data.tags || !Array.isArray(data.tags) || data.tags.length === 0) {
    errors.push('タグは少なくとも1つ必要です')
  }

  if (!data.excerpt || data.excerpt.trim().length === 0) {
    errors.push('概要は必須です')
  }

  if (!data.content || data.content.trim().length === 0) {
    errors.push('本文は必須です')
  }

  return { valid: errors.length === 0, errors }
}