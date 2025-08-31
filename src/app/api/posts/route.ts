import { NextRequest, NextResponse } from 'next/server'
import { getAllPosts, createPost } from '@/lib/posts'

export async function GET() {
  try {
    const posts = getAllPosts()
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json(
      { error: '获取文章失败' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, excerpt, tags, author, date } = body

    if (!title || !content) {
      return NextResponse.json(
        { error: '标题和内容不能为空' },
        { status: 400 }
      )
    }

    createPost({
      title,
      content,
      excerpt: excerpt || content.substring(0, 150) + '...',
      tags: tags || [],
      author: author || '作者',
      date: date || new Date().toISOString(),
    })

    return NextResponse.json({ message: '文章创建成功' })
  } catch (error) {
    return NextResponse.json(
      { error: '创建文章失败' },
      { status: 500 }
    )
  }
}
