'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
            Kang's Blog
          </Link>
          
          <div className="flex space-x-8">
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors ${
                pathname === '/' 
                  ? 'text-gray-900 border-b-2 border-gray-900 pb-1' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              首页
            </Link>
            <Link 
              href="/posts" 
              className={`text-sm font-medium transition-colors ${
                pathname.startsWith('/posts') 
                  ? 'text-gray-900 border-b-2 border-gray-900 pb-1' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              文章
            </Link>
            <Link 
              href="/admin" 
              className={`text-sm font-medium transition-colors ${
                pathname.startsWith('/admin') 
                  ? 'text-gray-900 border-b-2 border-gray-900 pb-1' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              管理
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
