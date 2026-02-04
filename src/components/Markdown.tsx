import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"

export default function Markdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      className="prose max-w-none prose-p:text-neon-text prose-li:text-neon-text prose-a:text-neon-cyan prose-strong:text-neon-text prose-headings:text-neon-text prose-blockquote:text-neon-muted prose-code:text-neon-cyan prose-pre:bg-neon-slate prose-pre:border-neon-border prose-td:text-neon-text prose-th:text-neon-text prose-table:border-neon-border"
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
    >
      {content}
    </ReactMarkdown>
  )
}