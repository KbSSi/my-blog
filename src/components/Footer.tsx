export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} 我的博客. 保留所有权利.</p>
          <p className="mt-2">
            使用 Next.js 和 TypeScript 构建
          </p>
        </div>
      </div>
    </footer>
  )
}
