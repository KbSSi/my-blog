import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  tags?: string[]
  author?: string
}

export function getAllPosts(): Post[] {
  // 确保 posts 目录存在
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || slug,
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || content.substring(0, 150) + '...',
        content,
        tags: data.tags || [],
        author: data.author || '作者',
      }
    })

  // 按日期排序
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): Post | null {
  try {
    // 解码URL编码的中文字符
    const decodedSlug = decodeURIComponent(slug)
    const fullPath = path.join(postsDirectory, `${decodedSlug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug: decodedSlug,
      title: data.title || decodedSlug,
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || content.substring(0, 150) + '...',
      content,
      tags: data.tags || [],
      author: data.author || '作者',
    }
  } catch (error) {
    return null
  }
}

export function createPost(post: Omit<Post, 'slug'>): void {
  // 确保 posts 目录存在
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true })
  }

  const slug = post.title
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '')

  const frontMatter = `---
title: "${post.title}"
date: "${post.date}"
excerpt: "${post.excerpt}"
tags: [${post.tags?.map(tag => `"${tag}"`).join(', ') || ''}]
author: "${post.author || '作者'}"
---

${post.content}`

  const filePath = path.join(postsDirectory, `${slug}.md`)
  fs.writeFileSync(filePath, frontMatter)
}

export function updatePost(slug: string, post: Partial<Post>): boolean {
  try {
    const decodedSlug = decodeURIComponent(slug)
    const existingPost = getPostBySlug(slug)
    if (!existingPost) return false

    const updatedPost = { ...existingPost, ...post }
    
    const frontMatter = `---
title: "${updatedPost.title}"
date: "${updatedPost.date}"
excerpt: "${updatedPost.excerpt}"
tags: [${updatedPost.tags?.map(tag => `"${tag}"`).join(', ') || ''}]
author: "${updatedPost.author || '作者'}"
---

${updatedPost.content}`

    const filePath = path.join(postsDirectory, `${decodedSlug}.md`)
    fs.writeFileSync(filePath, frontMatter)
    return true
  } catch (error) {
    return false
  }
}

export function deletePost(slug: string): boolean {
  try {
    const decodedSlug = decodeURIComponent(slug)
    const filePath = path.join(postsDirectory, `${decodedSlug}.md`)
    fs.unlinkSync(filePath)
    return true
  } catch (error) {
    return false
  }
}
