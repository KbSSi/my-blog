import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

interface PostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: '文章未找到',
    }
  }

  return {
    title: `${post.title} - 我的博客`,
    description: post.excerpt,
  }
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* 返回链接 */}
      <div className="mb-8">
        <Link 
          href="/posts"
          className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
        >
          ← 返回文章列表
        </Link>
      </div>

      {/* 文章头部 */}
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          {post.title}
        </h1>
        
        <div className="flex items-center text-gray-600 mb-6">
          <span>
            {format(new Date(post.date), 'yyyy年MM月dd日', { locale: zhCN })}
          </span>
          <span className="mx-3">•</span>
          <span>{post.author}</span>
        </div>
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span 
                key={tag}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* 文章内容 */}
      <article className="mb-12">
        <MarkdownRenderer content={post.content} />
      </article>

      {/* 文章底部 */}
      <footer className="border-t border-gray-200 pt-8">
        <div className="flex justify-between items-center">
          <Link 
            href="/posts"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← 返回文章列表
          </Link>
          
          <div className="text-sm text-gray-500">
            最后更新：{format(new Date(post.date), 'yyyy年MM月dd日', { locale: zhCN })}
          </div>
        </div>
      </footer>
    </div>
  )
}
