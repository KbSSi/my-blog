#!/bin/bash

# 博客自动部署脚本
# 使用方法: ./scripts/deploy.sh

set -e

echo "🚀 开始部署博客..."

# 检查是否在正确的目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误: 请在项目根目录运行此脚本"
    exit 1
fi

# 拉取最新代码
echo "📥 拉取最新代码..."
git pull origin main

# 安装依赖
echo "📦 安装依赖..."
npm ci --production=false

# 构建项目
echo "🔨 构建项目..."
npm run build

# 检查是否使用 PM2
if command -v pm2 &> /dev/null; then
    echo "🔄 重启 PM2 应用..."
    pm2 restart my-blog || pm2 start ecosystem.config.js
    pm2 save
else
    echo "⚠️  PM2 未安装，请手动重启应用"
fi

# 检查 Nginx 配置
if command -v nginx &> /dev/null; then
    echo "🔧 检查 Nginx 配置..."
    sudo nginx -t && sudo systemctl reload nginx
fi

echo "✅ 部署完成！"
echo "🌐 访问您的博客: http://your-domain.com"


