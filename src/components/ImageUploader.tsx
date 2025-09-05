'use client'

import { useState, useRef } from 'react'
import { ImageInfo } from '@/lib/images'

interface ImageUploaderProps {
  onImageUploaded?: (image: ImageInfo) => void
  onImageSelected?: (imageUrl: string) => void
  showGallery?: boolean
}

export default function ImageUploader({ 
  onImageUploaded, 
  onImageSelected,
  showGallery = true 
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [images, setImages] = useState<ImageInfo[]>([])
  const [showImageGallery, setShowImageGallery] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const loadImages = async () => {
    try {
      const response = await fetch('/api/images')
      if (response.ok) {
        const imageList = await response.json()
        setImages(imageList)
      }
    } catch (error) {
      console.error('加载图片失败:', error)
    }
  }

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/images', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const result = await response.json()
        onImageUploaded?.(result.image)
        loadImages() // 重新加载图片列表
        alert('图片上传成功！')
      } else {
        const error = await response.json()
        alert(`上传失败: ${error.error}`)
      }
    } catch (error) {
      console.error('上传失败:', error)
      alert('上传失败，请重试')
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleImageSelect = (imageUrl: string) => {
    onImageSelected?.(imageUrl)
    setShowImageGallery(false)
  }

  const handleDeleteImage = async (filename: string) => {
    if (!confirm('确定要删除这张图片吗？')) return

    try {
      const response = await fetch(`/api/images/${filename}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        loadImages() // 重新加载图片列表
        alert('图片删除成功！')
      } else {
        alert('删除失败，请重试')
      }
    } catch (error) {
      console.error('删除失败:', error)
      alert('删除失败，请重试')
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-4">
      {/* 上传按钮 */}
      <div className="flex space-x-4">
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {uploading ? '上传中...' : '上传图片'}
        </button>

        {showGallery && (
          <button
            onClick={() => {
              setShowImageGallery(!showImageGallery)
              if (!showImageGallery) loadImages()
            }}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            {showImageGallery ? '隐藏图库' : '显示图库'}
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* 图片库 */}
      {showImageGallery && (
        <div className="border border-gray-300 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">图片库</h3>
          
          {images.length === 0 ? (
            <p className="text-gray-500 text-center py-8">暂无图片</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image) => (
                <div key={image.filename} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="aspect-square bg-gray-100 flex items-center justify-center">
                    <img
                      src={image.url}
                      alt={image.originalName}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div className="p-2">
                    <p className="text-xs text-gray-600 truncate" title={image.originalName}>
                      {image.originalName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(image.size)}
                    </p>
                    <div className="flex space-x-2 mt-2">
                      {onImageSelected && (
                        <button
                          onClick={() => handleImageSelect(image.url)}
                          className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 transition-colors"
                        >
                          选择
                        </button>
                      )}
                      <button
                        onClick={() => navigator.clipboard.writeText(image.url)}
                        className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors"
                      >
                        复制链接
                      </button>
                      <button
                        onClick={() => handleDeleteImage(image.filename)}
                        className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition-colors"
                      >
                        删除
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

