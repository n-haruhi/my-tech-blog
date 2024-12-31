import { getSortedPostsData } from '@/lib/posts'
import PostsList from '../../components/PostsList'

export default function Posts() {
  const posts = getSortedPostsData()
  return <PostsList posts={posts} />
}