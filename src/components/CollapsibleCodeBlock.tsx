'use client'

import { useState } from 'react'

interface CollapsibleCodeBlockProps {
  children: React.ReactNode
  language?: string
  title?: string
}

export default function CollapsibleCodeBlock({ 
  children, 
  language = '', 
  title 
}: CollapsibleCodeBlockProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // 从代码内容中提取前几行作为预览
  const getPreview = (content: React.ReactNode): string => {
    if (typeof content === 'string') {
      const lines = content.split('\n')
      return lines.slice(0, 3).join('\n') + (lines.length > 3 ? '\n...' : '')
    }
    return ''
  }

  const codeContent = typeof children === 'string' ? children : ''
  const preview = getPreview(codeContent)
  const displayTitle = title || (language ? `${language.toUpperCase()} 代码` : '代码块')

  return (
    <div className="mb-4 border border-gray-300 rounded-lg overflow-hidden">
      {/* 标题栏 */}
      <div 
        className="bg-gray-50 px-4 py-2 border-b border-gray-300 cursor-pointer hover:bg-gray-100 transition-colors flex items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">{displayTitle}</span>
          {language && (
            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
              {language}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">
            {isExpanded ? '点击收起' : '点击展开'}
          </span>
          <svg 
            className={`w-4 h-4 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* 代码内容 */}
      <div className="bg-white">
        {isExpanded ? (
          <div className="p-4">
            <pre className="text-sm font-mono text-gray-900 overflow-x-auto">
              <code>{children}</code>
            </pre>
          </div>
        ) : (
          <div className="p-4">
            <pre className="text-sm font-mono text-gray-500 overflow-x-auto">
              <code>{preview}</code>
            </pre>
            <div className="mt-2 text-center">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsExpanded(true)
                }}
                className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
              >
                展开查看完整代码
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
