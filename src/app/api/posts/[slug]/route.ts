import { NextRequest, NextResponse } from 'next/server'
import { getPostBySlug, updatePost, deletePost } from '@/lib/posts'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const post = getPostBySlug(params.slug)
    
    if (!post) {
      return NextResponse.json(
        { error: '文章未找到' },
        { status: 404 }
      )
    }

    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json(
      { error: '获取文章失败' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json()
    const success = updatePost(params.slug, body)

    if (!success) {
      return NextResponse.json(
        { error: '更新文章失败' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: '文章更新成功' })
  } catch (error) {
    return NextResponse.json(
      { error: '更新文章失败' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const success = deletePost(params.slug)

    if (!success) {
      return NextResponse.json(
        { error: '删除文章失败' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: '文章删除成功' })
  } catch (error) {
    return NextResponse.json(
      { error: '删除文章失败' },
      { status: 500 }
    )
  }
}
