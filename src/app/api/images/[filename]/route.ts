import { NextRequest, NextResponse } from 'next/server'
import { deleteImage, getImageInfo } from '@/lib/images'

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const imageInfo = getImageInfo(params.filename)
    
    if (!imageInfo) {
      return NextResponse.json(
        { error: '图片未找到' },
        { status: 404 }
      )
    }

    return NextResponse.json(imageInfo)
  } catch (error) {
    return NextResponse.json(
      { error: '获取图片信息失败' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const success = deleteImage(params.filename)

    if (!success) {
      return NextResponse.json(
        { error: '删除图片失败' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: '图片删除成功' })
  } catch (error) {
    return NextResponse.json(
      { error: '删除图片失败' },
      { status: 500 }
    )
  }
}

