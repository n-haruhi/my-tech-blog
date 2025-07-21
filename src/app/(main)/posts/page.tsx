import { getSortedPostsData } from '@/lib/posts'
import PostsList from '@/components/PostsList'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '記事一覧',
  description: 'Tech Blogの記事一覧ページです。',
  openGraph: {
    title: '記事一覧 | Tech Blog',
    description: 'Tech Blogの記事一覧ページです。',
    type: 'website',
  },
}

export default async function Posts() {
  const posts = getSortedPostsData()
  return <PostsList posts={posts} />
}