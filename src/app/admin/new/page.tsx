'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import MarkdownRenderer from '@/components/MarkdownRenderer'

export default function NewPostPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    tags: '',
    author: '作者'
  })
  const [isPreview, setIsPreview] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
          date: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        alert('文章创建成功！')
        router.push('/admin')
      } else {
        alert('创建失败，请重试')
      }
    } catch (error) {
      console.error('创建文章失败:', error)
      alert('创建失败，请重试')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">写新文章</h1>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setIsPreview(false)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              !isPreview 
                ? 'bg-gray-900 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            编辑
          </button>
          <button
            type="button"
            onClick={() => setIsPreview(true)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isPreview 
                ? 'bg-gray-900 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            预览
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* 编辑区域 */}
        <div className={isPreview ? 'hidden lg:block' : ''}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                标题
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                placeholder="输入文章标题"
              />
            </div>

            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                摘要
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                placeholder="输入文章摘要"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                  作者
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  placeholder="作者姓名"
                />
              </div>

              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                  标签 (用逗号分隔)
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  placeholder="技术, 前端, React"
                />
              </div>
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                内容 (支持 Markdown)
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={20}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent font-mono text-sm"
                placeholder="# 文章标题

在这里写您的文章内容，支持 Markdown 语法...

## 二级标题

- 列表项 1
- 列表项 2

```javascript
// 代码示例
console.log('Hello World');
```"
              />
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? '发布中...' : '发布文章'}
              </button>
            </div>
          </form>
        </div>

        {/* 预览区域 */}
        <div className={!isPreview ? 'hidden lg:block' : ''}>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">预览</h3>
            <div className="bg-white p-6 rounded-lg border">
              {formData.title && (
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {formData.title}
                </h1>
              )}
              {formData.excerpt && (
                <p className="text-gray-600 mb-6 italic">
                  {formData.excerpt}
                </p>
              )}
              {formData.content && (
                <MarkdownRenderer content={formData.content} />
              )}
              {!formData.title && !formData.content && (
                <p className="text-gray-500 text-center py-8">
                  开始写作以查看预览
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
