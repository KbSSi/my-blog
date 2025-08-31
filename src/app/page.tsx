import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export default function Home() {
  const posts = getAllPosts().slice(0, 3) // 获取最新的3篇文章
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* 个人介绍区域 */}
      <section className="text-center mb-12">
        <div className="mb-8">
          {/* <div className="w-32 h-32 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-4xl text-gray-600">👤</span>
          </div> */}
          {/* <h1 className="text-4xl font-bold text-gray-900 mb-4">
           
          </h1> */}
          <div className="flex justify-center mb-6">
            <img 
              src="/showPic.jpg" 
              alt="头像" 
              className="w-60 h-60 rounded-full object-cover border-4 border-white shadow-lg"
            />
          </div>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            全栈开发工程师；一起拥抱AI
          </p>
        </div>
        
        <div className="flex justify-center space-x-6">
          <a 
            href="903312915@qq.com" 
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            📧 邮箱
          </a>
          <a 
            href="https://github.com/KbSSi" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            🔗 GitHub
          </a>
          <a 
            href="https://x.com/kangx_ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            ❌ X
          </a>
          <a 
            href="https://www.xiaohongshu.com/user/profile/5ed4e382000000000101d9a5" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            📕 小红书
          </a>
        </div>
      </section>

      {/* 最新文章预览 */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">最新文章</h2>
          <Link 
            href="/posts" 
            className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
          >
            查看全部 →
          </Link>
        </div>
        
        <div className="space-y-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <article key={post.slug} className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  <Link href={`/posts/${encodeURIComponent(post.slug)}`} className="hover:text-gray-700 transition-colors">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>{new Date(post.date).toLocaleDateString('zh-CN')}</span>
                  <span className="mx-2">•</span>
                  <span>{post.author}</span>
                  {post.tags && post.tags.length > 0 && (
                    <>
                      <span className="mx-2">•</span>
                      <span>{post.tags[0]}</span>
                    </>
                  )}
                </div>
              </article>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              暂无文章，请到管理页面添加新文章。
            </div>
          )}
        </div>
      </section>

      {/* 联系方式 */}
      <section className="text-center bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">联系我</h2>
        <p className="text-gray-600 mb-6">
          如果您对我的文章感兴趣，或者想要交流技术话题，欢迎联系我！
        </p>
        <a 
          href="mailto:zhangsan@example.com"
          className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
        >
          发送邮件
        </a>
      </section>
    </div>
  )
}
