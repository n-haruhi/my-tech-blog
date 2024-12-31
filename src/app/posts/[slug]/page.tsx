import { getPostData } from '@/lib/posts'
import { notFound } from 'next/navigation'
import PostContent from './PostContent'

type Props = {
  params: Promise<{
    slug: string
  }>
}

export default async function Post({ params }: Props) {
  try {
    const resolvedParams = await params
    const post = await getPostData(resolvedParams.slug)
    return <PostContent post={post} />
  } catch (e) {
    notFound()
  }
}