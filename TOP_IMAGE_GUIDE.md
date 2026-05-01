# 顶部图片使用指南

## 📸 如何设置页面顶部图片

### 1. 全局配置（_config.butterfly.yml）

在 `_config.butterfly.yml` 文件中可以设置不同类型的默认顶部图片：

```yaml
# 首页顶部图片
index_img: /img/top-banner.jpg

# 归档页顶部图片
archive_img: /img/archive-banner.jpg

# 标签页顶部图片
tag_img: /img/tag-banner.jpg

# 分类页顶部图片
category_img: /img/category-banner.jpg

# 默认顶部图片（其他页面使用）
default_top_img: /img/default-banner.jpg
```

**注意**：取消注释并修改为你想要的图片路径即可生效。

---

### 2. 单篇文章设置

在文章文件的 Front-matter 中添加 `top_img` 字段：

```markdown
---
title: 初识数据库，安装和部署
date: 2026-04-30 11:09:44
categories:
  - 技术文档
  - 笔记文档
tags:
  - MySQL
  - 数据库
top_img: /img/database-banner.jpg  # ← 添加这一行
---

文章内容...
```

---

### 3. 自定义页面设置

在 `source/xxx/index.md` 文件中添加：

```markdown
---
title: 关于我
type: "page"
top_img: /img/about-banner.jpg  # ← 添加这一行
---

页面内容...
```

---

## 🖼️ 图片准备

### 推荐的图片尺寸
- **宽度**: 1920px 或更大
- **高度**: 400-600px
- **格式**: JPG、PNG、WebP
- **大小**: 建议小于 500KB

### 图片存放位置
将所有顶部图片放在 `source/img/` 目录下：

```
source/img/
├── top-banner.jpg          # 首页顶部图片
├── archive-banner.jpg      # 归档页顶部图片
├── tag-banner.jpg          # 标签页顶部图片
├── category-banner.jpg     # 分类页顶部图片
├── default-banner.jpg      # 默认顶部图片
├── database-banner.jpg     # 数据库文章顶部图片
└── ...
```

---

## 💡 实用技巧

### 1. 为特定分类的文章设置统一顶部图片

可以在文章的 Front-matter 中统一设置：

```markdown
# 所有数据库相关的文章
top_img: /img/database-banner.jpg

# 所有 Hexo 相关的文章
top_img: /img/hexo-banner.jpg

# 所有 Git 相关的文章
top_img: /img/git-banner.jpg
```

### 2. 禁用某个页面的顶部图片

如果想让某个页面不显示顶部图片，可以设置：

```markdown
---
title: 简洁页面
top_img: false  # ← 设置为 false 禁用顶部图片
---
```

或者在全局配置中设置：

```yaml
disable_top_img: true  # 禁用所有顶部图片
```

### 3. 使用渐变色代替图片

如果不想使用图片，可以通过 CSS 自定义样式实现渐变背景。

---

## 🔧 当前配置状态

✅ **已配置**：
- 首页顶部图片：`/img/top-banner.jpg`

⏸️ **未启用**（需要时取消注释）：
- 归档页顶部图片
- 标签页顶部图片
- 分类页顶部图片
- 默认顶部图片

---

## 📝 快速开始

### 步骤 1：准备图片
将你的顶部图片放到 `source/img/` 目录

### 步骤 2：修改配置
编辑 `_config.butterfly.yml`，取消注释并修改图片路径

### 步骤 3：重新生成
```bash
hexo clean
hexo generate
hexo deploy
```

### 步骤 4：查看效果
访问你的博客查看新的顶部图片

---

## ❓ 常见问题

**Q: 为什么设置了顶部图片但不显示？**
A: 检查以下几点：
1. 图片路径是否正确（以 `/img/` 开头）
2. 图片文件是否存在于 `source/img/` 目录
3. 是否执行了 `hexo clean` 和 `hexo generate`
4. 浏览器是否缓存了旧页面（按 Ctrl+Shift+R 强制刷新）

**Q: 如何让每篇文章都有不同的顶部图片？**
A: 在每篇文章的 Front-matter 中单独设置 `top_img` 字段

**Q: 可以使用外部图片链接吗？**
A: 可以，直接使用完整的 URL：
```yaml
top_img: https://example.com/banner.jpg
```

---

如有其他问题，欢迎随时询问！