'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import CollapsibleCodeBlock from './CollapsibleCodeBlock'

interface MarkdownRendererProps {
  content: string
  className?: string
}

export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <div className={`prose prose-gray max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-2">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 mt-8">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-medium mb-3 text-gray-900 mt-6">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="mb-4 text-gray-700 leading-relaxed">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="mb-4 pl-6 list-disc">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-4 pl-6 list-decimal">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="mb-2 text-gray-700">
              {children}
            </li>
          ),
          code: ({ children, className, ...props }: any) => {
            const inline = props.inline
            if (inline) {
              return (
                <code className="bg-white border border-gray-300 px-2 py-1 rounded text-sm font-mono text-gray-900">
                  {children}
                </code>
              )
            }
            
            // 从 className 中提取语言信息
            const language = className?.replace('language-', '') || ''
            
            return (
              <CollapsibleCodeBlock language={language}>
                {children}
              </CollapsibleCodeBlock>
            )
          },
          pre: ({ children }) => {
            // 对于代码块，我们在 code 组件中已经处理了，这里直接返回 children
            return <>{children}</>
          },
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-4 bg-gray-50 py-2">
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => (
            <a 
              href={href} 
              className="text-gray-900 underline hover:text-gray-700 transition-colors"
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {children}
            </a>
          ),
          img: ({ src, alt }) => (
            <img 
              src={src} 
              alt={alt} 
              className="max-w-full h-auto rounded-lg shadow-sm mb-4"
            />
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border border-gray-200">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-gray-200 px-4 py-2 bg-gray-50 text-left font-semibold text-gray-900">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-gray-200 px-4 py-2 text-gray-700">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
