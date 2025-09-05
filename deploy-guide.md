# 服务器部署指南

## 环境要求

- Node.js 18+ 
- PM2 (进程管理器)
- Nginx (反向代理)
- Git

## 1. 安装 Node.js

```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# CentOS/RHEL
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs
```

## 2. 安装 PM2

```bash
sudo npm install -g pm2
```

## 3. 安装 Nginx

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nginx

# CentOS/RHEL
sudo yum install nginx
```

## 4. 克隆项目

```bash
cd /var/www
sudo git clone https://github.com/你的用户名/my-blog.git
cd my-blog
sudo chown -R $USER:$USER /var/www/my-blog
```

## 5. 安装依赖和构建

```bash
npm install
npm run build
```

## 6. 创建 PM2 配置文件

创建 `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: 'my-blog',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/my-blog',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
```

## 7. 启动应用

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## 8. 配置 Nginx

创建 `/etc/nginx/sites-available/my-blog`:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # 静态文件直接由 Nginx 提供
    location /_next/static {
        alias /var/www/my-blog/.next/static;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location /images {
        alias /var/www/my-blog/public/images;
        expires 1y;
        add_header Cache-Control "public";
    }
}
```

启用站点：

```bash
sudo ln -s /etc/nginx/sites-available/my-blog /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 9. 配置 SSL (可选但推荐)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## 10. 自动部署脚本

创建 `deploy.sh`:

```bash
#!/bin/bash

cd /var/www/my-blog

# 拉取最新代码
git pull origin main

# 安装依赖
npm install

# 构建项目
npm run build

# 重启 PM2 应用
pm2 restart my-blog

echo "部署完成！"
```

使脚本可执行：

```bash
chmod +x deploy.sh
```

