import { NextRequest, NextResponse } from 'next/server'
import { getAllImages, saveImage } from '@/lib/images'

export async function GET() {
  try {
    const images = getAllImages()
    return NextResponse.json(images)
  } catch (error) {
    return NextResponse.json(
      { error: '获取图片列表失败' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: '未找到文件' },
        { status: 400 }
      )
    }

    // 检查文件类型
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: '不支持的文件类型' },
        { status: 400 }
      )
    }

    // 检查文件大小（限制为 5MB）
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: '文件大小超过限制（最大5MB）' },
        { status: 400 }
      )
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const imageInfo = saveImage(buffer, file.name)

    if (!imageInfo) {
      return NextResponse.json(
        { error: '保存图片失败' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: '图片上传成功',
      image: imageInfo
    })
  } catch (error) {
    console.error('上传图片失败:', error)
    return NextResponse.json(
      { error: '上传图片失败' },
      { status: 500 }
    )
  }
}

