---
title: Hexo 中文化配置指南
date: 2026-04-29 12:00:00
categories:
  - 技术文档
  - 网站文档
tags:
  - Hexo
  - 主题配置
  - 国际化
top_img: /img/top-banner.jpg
---

# Hexo 博客中文化配置指南

## ✅ 已完成的配置

### 1. 主配置文件 (_config.yml)
已将语言设置为简体中文：
```yaml
language: zh-CN
```

### 2. Butterfly 主题配置 (_config.butterfly.yml)
已添加语言设置和中文菜单：
```yaml
language: zh-CN

menu:
  首页: / || fas fa-home
  归档: /archives/ || fas fa-archive
  标签: /tags/ || fas fa-tags
  分类: /categories/ || fas fa-folder-open
```

---

## 🎨 其他可以中文化的配置项

### 1. 网站基本信息

在 `_config.yml` 中修改：

```yaml
# Site
title: 我的博客
subtitle: '记录生活，分享知识'
description: '这是一个个人技术博客'
keywords: 技术,博客,编程
author: 你的名字
```

### 2. 社交链接

在 `_config.butterfly.yml` 中修改：

```yaml
social:
  fab fa-github: https://github.com/你的用户名 || GitHub
  fab fa-weibo: https://weibo.com/你的用户名 || 微博
  fas fa-envelope: mailto:your@email.com || 邮箱
```

### 3. 公告栏

在 `_config.butterfly.yml` 中添加：

```yaml
announcement:
  enable: true
  content: 欢迎来到我的博客！
```

### 4. 页脚信息

在 `_config.butterfly.yml` 中配置：

```yaml
footer:
  owner:
    enable: true
    since: 2025
  custom_text: 用 ❤️ 构建
```

---

## 📝 常见英文转中文对照表

| 英文 | 中文 |
|------|------|
| Home | 首页 |
| Archives | 归档 |
| Tags | 标签 |
| Categories | 分类 |
| About | 关于 |
| Search | 搜索 |
| Recent Posts | 最新文章 |
| Article Count | 文章总数 |
| Unique Visitors | 访客数 |
| Page Views | 访问量 |
| Last Update | 最后更新 |
| Created | 创建于 |
| Updated | 更新于 |
| Load More | 加载更多 |
| Copy Successful | 复制成功 |
| Copy Failed | 复制失败 |

---

## 🔧 应用更改的步骤

每次修改配置后，需要执行：

```bash
# 1. 清理缓存
hexo clean

# 2. 重新生成
hexo generate

# 3. 重启服务器（如果正在运行）
# Ctrl+C 停止服务器，然后重新执行
hexo server -p 80

# 4. 部署到服务器
hexo deploy
```

或使用一键部署脚本：
```bash
.\deploy.bat
```

---

## 💡 提示

1. **菜单图标**：可以使用 FontAwesome 图标，格式为 `fas fa-xxx` 或 `fab fa-xxx`
2. **自定义页面**：可以创建"关于我"、"友情链接"等页面
3. **主题颜色**：可以在 `_config.butterfly.yml` 中自定义主题色

---

**最后更新：** 2026-04-29
