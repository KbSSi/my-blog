import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

export default function PostsPage() {
  const posts = getAllPosts()

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">所有文章</h1>
        <p className="text-gray-600">
          分享技术心得、学习笔记和生活感悟
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">暂无文章</h2>
          <p className="text-gray-600 mb-6">
            还没有发布任何文章，请到管理页面添加新文章。
          </p>
          <Link 
            href="/admin"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            去写文章
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="border-b border-gray-200 pb-8 last:border-b-0">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  <Link 
                    href={`/posts/${encodeURIComponent(post.slug)}`}
                    className="hover:text-gray-700 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>
                    {format(new Date(post.date), 'yyyy年MM月dd日', { locale: zhCN })}
                  </span>
                  <span className="mx-2">•</span>
                  <span>{post.author}</span>
                  {post.tags && post.tags.length > 0 && (
                    <>
                      <span className="mx-2">•</span>
                      <div className="flex space-x-2">
                        {post.tags.map((tag) => (
                          <span 
                            key={tag}
                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                
                <p className="text-gray-600 leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                
                <Link 
                  href={`/posts/${encodeURIComponent(post.slug)}`}
                  className="text-gray-900 font-medium hover:text-gray-700 transition-colors"
                >
                  阅读全文 →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
