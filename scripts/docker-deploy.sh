#!/bin/bash

# Docker 部署脚本
# 使用方法: ./scripts/docker-deploy.sh

set -e

echo "🐳 开始 Docker 部署..."

# 检查 Docker 和 Docker Compose
if ! command -v docker &> /dev/null; then
    echo "❌ Docker 未安装"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose 未安装"
    exit 1
fi

# 拉取最新代码
echo "📥 拉取最新代码..."
git pull origin main

# 停止现有容器
echo "🛑 停止现有容器..."
docker-compose down

# 构建新镜像
echo "🔨 构建 Docker 镜像..."
docker-compose build --no-cache

# 启动容器
echo "🚀 启动容器..."
docker-compose up -d

# 显示状态
echo "📊 容器状态:"
docker-compose ps

echo "✅ Docker 部署完成！"
echo "🌐 访问您的博客: http://your-domain.com"


