import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'src/posts')

export interface Post {
  slug: string
  title: string
  date: string
  tags: string[]
  excerpt: string
  content: string
}

export function getSortedPostsData(): Post[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get slug
    const slug = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the slug
    return {
      slug,
      content: matterResult.content,
      ...(matterResult.data as { title: string; date: string; tags: string[]; excerpt: string })
    }
  })

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export async function getPostData(slug: string): Promise<Post> {
  const fullPath = path.join(process.cwd(), 'src/posts', `${slug}.md`)
  const fileContents = await fs.promises.readFile(fullPath, 'utf8')

  const matterResult = matter(fileContents)

  return {
    slug,
    content: matterResult.content,
    ...(matterResult.data as { title: string; date: string; tags: string[]; excerpt: string })
  }
}

// 前後の記事を取得する関数
export async function getAdjacentPosts(currentSlug: string): Promise<{
  previous: Post | null
  next: Post | null
}> {
  const posts = getSortedPostsData()
  const currentIndex = posts.findIndex(post => post.slug === currentSlug)

  return {
    previous: currentIndex > 0 ? posts[currentIndex - 1] : null,
    next: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null
  }
}