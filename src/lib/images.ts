import fs from 'fs'
import path from 'path'

const imagesDirectory = path.join(process.cwd(), 'public/images')

export interface ImageInfo {
  filename: string
  originalName: string
  path: string
  url: string
  size: number
  uploadDate: string
}

// 确保图片目录存在
export function ensureImagesDirectory(): void {
  if (!fs.existsSync(imagesDirectory)) {
    fs.mkdirSync(imagesDirectory, { recursive: true })
  }
}

// 获取所有图片列表
export function getAllImages(): ImageInfo[] {
  ensureImagesDirectory()
  
  try {
    const files = fs.readdirSync(imagesDirectory)
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase()
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext)
    })

    return imageFiles.map(filename => {
      const filePath = path.join(imagesDirectory, filename)
      const stats = fs.statSync(filePath)
      
      return {
        filename,
        originalName: filename,
        path: filePath,
        url: `/images/${filename}`,
        size: stats.size,
        uploadDate: stats.mtime.toISOString()
      }
    }).sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
  } catch (error) {
    console.error('获取图片列表失败:', error)
    return []
  }
}

// 保存图片到本地
export function saveImage(buffer: Buffer, filename: string): ImageInfo | null {
  try {
    ensureImagesDirectory()
    
    // 生成唯一文件名（添加时间戳避免重复）
    const ext = path.extname(filename)
    const name = path.basename(filename, ext)
    const timestamp = Date.now()
    const uniqueFilename = `${name}-${timestamp}${ext}`
    
    const filePath = path.join(imagesDirectory, uniqueFilename)
    fs.writeFileSync(filePath, buffer)
    
    const stats = fs.statSync(filePath)
    
    return {
      filename: uniqueFilename,
      originalName: filename,
      path: filePath,
      url: `/images/${uniqueFilename}`,
      size: stats.size,
      uploadDate: stats.mtime.toISOString()
    }
  } catch (error) {
    console.error('保存图片失败:', error)
    return null
  }
}

// 删除图片
export function deleteImage(filename: string): boolean {
  try {
    const filePath = path.join(imagesDirectory, filename)
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
      return true
    }
    return false
  } catch (error) {
    console.error('删除图片失败:', error)
    return false
  }
}

// 检查图片是否存在
export function imageExists(filename: string): boolean {
  const filePath = path.join(imagesDirectory, filename)
  return fs.existsSync(filePath)
}

// 获取图片信息
export function getImageInfo(filename: string): ImageInfo | null {
  try {
    const filePath = path.join(imagesDirectory, filename)
    if (!fs.existsSync(filePath)) {
      return null
    }
    
    const stats = fs.statSync(filePath)
    
    return {
      filename,
      originalName: filename,
      path: filePath,
      url: `/images/${filename}`,
      size: stats.size,
      uploadDate: stats.mtime.toISOString()
    }
  } catch (error) {
    console.error('获取图片信息失败:', error)
    return null
  }
}

