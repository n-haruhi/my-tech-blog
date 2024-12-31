import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'  // 一旦ダークテーマ

export default function Markdown({ content }: { content: string }) {
  return (
    <ReactMarkdown 
      className="prose prose-blue max-w-none"
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
    >
      {content}
    </ReactMarkdown>
  )
}