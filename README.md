# 我的博客

一个基于 Next.js 和 TypeScript 构建的简洁个人博客系统。

## 特性

- 🎨 **简洁设计**：黑白色调，专注内容
- 📝 **Markdown 支持**：完整的 Markdown 语法支持
- 📱 **响应式设计**：适配各种设备
- ⚡ **快速加载**：基于 Next.js 的优化性能
- 🛠️ **内容管理**：简单易用的后台管理系统
- 🚀 **易于部署**：支持 Vercel 一键部署

## 技术栈

- **Next.js 14** - React 全栈框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **React Markdown** - Markdown 渲染
- **Gray Matter** - Front Matter 解析
- **Date-fns** - 日期处理

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看博客。

### 3. 创建文章

1. 访问 `/admin` 进入管理页面
2. 点击"写新文章"
3. 使用 Markdown 语法编写内容
4. 发布文章

## 项目结构

```
my-blog/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── admin/          # 管理页面
│   │   ├── api/            # API 路由
│   │   ├── posts/          # 文章页面
│   │   └── globals.css     # 全局样式
│   ├── components/         # React 组件
│   └── lib/               # 工具函数
├── posts/                 # Markdown 文章文件
├── public/               # 静态资源
└── package.json
```

## 部署到 Vercel

### 方法一：通过 Vercel CLI

```bash
npm install -g vercel
vercel
```

### 方法二：通过 GitHub

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 自动部署

## 自定义配置

### 修改个人信息

编辑 `src/app/page.tsx` 中的个人信息：

```tsx
<h1 className="text-4xl font-bold text-gray-900 mb-4">
  你好，我是 [您的姓名]
</h1>
```

### 修改网站标题

编辑 `src/app/layout.tsx` 中的 metadata：

```tsx
export const metadata: Metadata = {
  title: '您的博客标题',
  description: '您的博客描述',
}
```

## 文章格式

文章使用 Markdown 格式，支持 Front Matter：

```markdown
---
title: "文章标题"
date: "2024-01-01T00:00:00.000Z"
excerpt: "文章摘要"
tags: ["标签1", "标签2"]
author: "作者"
---

# 文章内容

这里是文章的正文内容...
```

## 许可证

MIT License
