---
title: Hexo 快速部署指南
date: 2026-04-29 11:00:00
categories:
  - 技术文档
  - 网站文档
tags:
  - Hexo
  - 快速入门
  - 部署
top_img: /img/top-banner.jpg
---

# Hexo 博客快速部署指南

## 🚀 最简单的部署方式

### 方法一：双击运行（推荐）

直接双击文件：**`deploy.bat`**

这个脚本会自动完成：
1. ✅ 清理缓存
2. ✅ 生成静态文件  
3. ✅ 部署到服务器

---

### 方法二：命令行方式

打开 PowerShell 或 CMD，进入项目目录后执行：

```bash
hexo clean && hexo generate && hexo deploy
```

或使用简写：

```bash
hexo d -g
```

---

## 📝 日常更新流程

### 步骤 1：创建新文章

```bash
hexo new "文章标题"
```

### 步骤 2：编辑文章

在 `source/_posts/` 目录下找到对应的 `.md` 文件进行编辑。

### 步骤 3：预览效果（可选）

```bash
hexo server -p 80
```

然后在浏览器访问：http://localhost/

### 步骤 4：部署到服务器

**双击运行：** [`deploy.bat`](file://c:\Users\18115\Desktop\jdyblog\jdyblog\deploy.bat)

或在命令行执行：

```bash
hexo d -g
```

---

## ⚠️ 注意事项

1. **首次部署**可能需要输入服务器密码
2. 确保已配置 SSH 免密登录（避免每次输入密码）
3. 部署完成后，清除浏览器缓存查看最新效果（Ctrl+F5）

---

## 🔧 常用命令

| 命令 | 说明 |
|------|------|
| `hexo new "标题"` | 新建文章 |
| `hexo clean` | 清理缓存 |
| `hexo generate` | 生成静态文件 |
| `hexo server -p 80` | 启动本地服务器（80端口） |
| `hexo deploy` | 部署到服务器 |
| `hexo d -g` | 生成并部署（一步完成） |

---

## ❓ 常见问题

### Q: 双击 deploy.bat 没反应？
**A:** 
- 确保已在项目目录中
- 检查是否安装了 Hexo
- 尝试在命令行中手动执行 `hexo version` 确认安装正常

### Q: 部署时提示输入密码？
**A:** 
这是正常的，首次部署需要输入服务器密码。建议配置 SSH 免密登录。

### Q: 部署后网站没有更新？
**A:**
- 清除浏览器缓存（Ctrl+F5 强制刷新）
- 检查部署命令输出是否有错误
- 确认网络连接正常

---

**最后更新：** 2026-04-29
