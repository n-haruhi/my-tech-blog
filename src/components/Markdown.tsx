import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function Markdown({ content }: { content: string }) {
  return (
    <ReactMarkdown 
      className="prose prose-blue max-w-none"
      remarkPlugins={[remarkGfm]}
    >
      {content}
    </ReactMarkdown>
  )
}