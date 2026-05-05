---
title: Hexo相册功能完整使用指南
date: 2026-05-05 10:00:00
categories:
  - 技术文档
  - 网站文档
tags:
  - Hexo
  - 相册
  - JavaScript
  - CSS
  - 配置
top_img: /img/top-banner.jpg
---

# 📸 Hexo相册功能完整使用指南

> **文档版本**：v1.0  
> **最后更新**：2026-05-05  
> **适用主题**：Butterfly 5.5.4

本文档详细介绍Hexo博客相册功能的实现方案、部署流程、常见问题及后续维护方法。

---

## 📋 目录

1. [功能概述](#功能概述)
2. [技术方案](#技术方案)
3. [文件结构](#文件结构)
4. [部署步骤](#部署步骤)
5. [添加新照片](#添加新照片)
6. [常见问题](#常见问题)
7. [优化建议](#优化建议)

---

## 功能概述

### ✨ 核心功能

- ✅ **分类筛选**：支持按壁纸、生活、摄影等分类快速筛选
- ✅ **自动统计**：JavaScript自动计算照片总数和分类数量
- ✅ **响应式布局**：自适应桌面端和移动端显示
- ✅ **悬停动画**：鼠标悬停时照片放大效果
- ✅ **点击预览**：点击照片可在新标签页查看大图
- ✅ **数据驱动**：通过JSON数据管理，无需手写HTML

### 🎯 设计原则

1. **简单易用**：添加照片只需修改JSON数据
2. **易于维护**：CSS、JS与内容完全分离
3. **高性能**：纯静态页面，加载速度快
4. **可扩展**：支持无限扩展照片数量

---

## 技术方案

### 架构设计

```
┌─────────────────────────────────────┐
│     source/gallery/index.md         │  ← 页面结构（Markdown）
│     - HTML骨架                       │
│     - 引用外部CSS/JS                 │
└──────────────┬──────────────────────┘
               │
       ┌───────┴────────┐
       │                │
┌──────▼──────┐  ┌─────▼──────────┐
│gallery.css  │  │  gallery.js    │
│(样式文件)   │  │  (逻辑文件)     │
└─────────────┘  └─────┬──────────┘
                        │
                  ┌─────▼──────────┐
                  │  JSON数据      │
                  │  (内嵌在JS中)  │
                  └────────────────┘
```

### 核心技术栈

- **HTML5**：语义化标签构建页面结构
- **CSS3**：Flexbox + Grid布局，渐变背景，动画效果
- **JavaScript (ES6+)**：动态渲染DOM，事件处理，数据筛选
- **YAML**：数据存储格式（需手动同步到JS）

### 为什么不用模板引擎？

❌ **禁止方案**：在Markdown中使用Nunjucks/EJS模板语法
```markdown
{% for photo in site.data.gallery.photos %}
  <!-- 这种方式会导致404错误 -->
{% endfor %}
```

✅ **推荐方案**：纯JavaScript动态渲染
```javascript
const galleryData = {
  photos: [
    { title: "照片标题", image: "/path/to/photo.jpg", category: "wallpaper" }
  ]
};
// 通过JavaScript动态生成HTML
```

**原因**：Hexo的Markdown处理器不支持复杂模板语法，会导致页面生成失败。

---

## 文件结构

### 完整目录树

```
jdyblog/
├── source/
│   ├── _data/
│   │   └── gallery.yml              # YAML数据源（参考用）
│   ├── css/
│   │   └── gallery.css              # 相册样式文件
│   ├── js/
│   │   └── gallery.js               # 相册逻辑文件（含JSON数据）
│   └── gallery/
│       ├── index.md                 # 相册页面入口
│       └── photos/                  # 照片存放目录
│           ├── duye.jpg
│           ├── fense.jpeg
│           ├── shitaishici.jpg
│           └── shiweiyan.jpg
└── public/                          # 生成的静态文件（自动生成）
    ├── css/
    │   └── gallery.css
    ├── js/
    │   └── gallery.js
    └── gallery/
        ├── index.html
        └── photos/
```

### 关键文件说明

#### 1. `source/gallery/index.md` - 页面入口

```markdown
---
title: 我的相册
date: 2026-04-30 20:00:00
comments: false
top_img: /img/top-banner.jpg
---

# 📸 我的相册

<!-- HTML结构 -->
<div class="gallery-stats">...</div>
<div class="filter-tabs">...</div>
<div class="photo-grid" id="photoGrid"></div>

<!-- 引入外部资源 -->
<link rel="stylesheet" href="/css/gallery.css">
<script src="/js/gallery.js"></script>
```

**作用**：定义页面基本结构和元数据

#### 2. `source/css/gallery.css` - 样式文件

包含以下样式模块：
- `.gallery-stats`：统计卡片样式（渐变背景）
- `.filter-tabs`：筛选标签样式（悬停动画）
- `.photo-grid`：照片网格布局（CSS Grid）
- `.photo-item`：单张照片卡片（悬停放大）
- `.photo-tag`：分类标签样式（不同颜色）
- `@media`：响应式断点（768px, 480px）

#### 3. `source/js/gallery.js` - 逻辑文件

包含以下功能模块：
- `galleryData`：JSON格式的照片数据
- `renderPhotos()`：动态生成HTML
- `filterPhotos()`：分类筛选功能
- `updateStats()`：自动更新统计数据
- `getCategoryName()`：分类名称映射

#### 4. `source/_data/gallery.yml` - 数据源（参考）

```yaml
photos:
  - title: "毒液"
    image: "/gallery/photos/duye.jpg"
    category: "wallpaper"
    date: "2026-05-01"
```

**注意**：此文件仅作为数据参考，实际使用时需手动同步到`gallery.js`中的JSON格式。

---

## 部署步骤

### 标准部署流程

每次修改相册内容后，按以下步骤操作：

#### 步骤1：修改文件

根据需求修改对应文件（详见[添加新照片](#添加新照片)章节）

#### 步骤2：提交到Git

```bash
cd e:\jdyblog\jdyblog
git add .
git commit -m "feat: 添加新照片到相册"
git push
```

#### 步骤3：生成静态文件

```bash
hexo clean
hexo generate
```

或使用npm命令：

```bash
npm run clean
npm run build
```

#### 步骤4：本地预览（可选但推荐）

```bash
hexo server
```

浏览器访问 `http://localhost:4000/gallery/` 验证效果

按 `Ctrl+C` 停止服务

#### 步骤5：部署到服务器

```bash
hexo deploy
```

或使用npm命令：

```bash
npm run deploy
```

#### 步骤6：验证部署

1. 访问线上地址：`https://your-domain.com/gallery/`
2. **强制刷新缓存**：按 `Ctrl+F5` 或 `Ctrl+Shift+R`
3. 检查以下内容：
   - ✅ 照片正常显示
   - ✅ 分类筛选功能正常
   - ✅ 统计数字正确
   - ✅ 响应式布局正常

### 一键部署脚本（推荐）

创建批处理文件 `deploy-gallery.bat`：

```batch
@echo off
cd /d e:\jdyblog\jdyblog

echo === 开始部署相册 ===

echo [1/5] 提交到Git...
git add .
git commit -m "feat: 更新相册内容"
git push

echo [2/5] 清理缓存...
hexo clean

echo [3/5] 生成静态文件...
hexo generate

echo [4/5] 部署到服务器...
hexo deploy

echo [5/5] 部署完成！
echo 请访问 https://your-domain.com/gallery/ 并按 Ctrl+F5 刷新

pause
```

使用方法：双击运行即可自动完成所有步骤。

---

## 添加新照片

### 方法一：直接修改JS文件（推荐）⭐

这是最简单直接的方法，适合日常使用。

#### 操作步骤

1. **准备照片文件**
   
   将照片复制到 `source/gallery/photos/` 目录
   
   ```bash
   # 示例：复制新照片
   copy D:\Downloads\new-photo.jpg e:\jdyblog\jdyblog\source\gallery\photos\
   ```

2. **编辑 `source/js/gallery.js`**
   
   找到 `galleryData.photos` 数组，添加新条目：

   ```javascript
   const galleryData = {
     photos: [
       // ... 现有照片 ...
       
       {
         title: "新照片标题",
         image: "/gallery/photos/new-photo.jpg",
         category: "wallpaper"  // 或 "life" 或 "photography"
       }
     ]
   };
   ```

3. **执行部署流程**
   
   按照[部署步骤](#部署步骤)完成推送

#### 示例：添加一张壁纸照片

```javascript
{
  title: "赛博朋克2077",
  image: "/gallery/photos/cyberpunk2077.jpg",
  category: "wallpaper"
}
```

#### 示例：添加一张生活照片

```javascript
{
  title: "海边日落",
  image: "/gallery/photos/sunset.jpg",
  category: "life"
}
```

### 方法二：先更新YAML再同步到JS

适合需要保持数据源一致性的场景。

#### 操作步骤

1. **编辑 `source/_data/gallery.yml`**
   
   ```yaml
   photos:
     # ... 现有照片 ...
     
     - title: "新照片标题"
       image: "/gallery/photos/new-photo.jpg"
       category: "wallpaper"
       date: "2026-05-05"
   ```

2. **手动同步到 `source/js/gallery.js`**
   
   将YAML格式转换为JSON格式，添加到 `galleryData.photos` 数组

3. **执行部署流程**

### 分类说明

| 分类值 | 中文名称 | 标签颜色 | 用途 |
|--------|---------|---------|------|
| `wallpaper` | 壁纸 | 黄色 | 桌面/手机壁纸 |
| `life` | 生活 | 蓝色 | 日常生活记录 |
| `photography` | 摄影 | 紫色 | 摄影作品 |

### 照片命名规范

- **文件名**：使用英文或拼音，避免中文和特殊字符
- **格式**：JPG/JPEG/PNG均可
- **大小建议**：单张不超过2MB，宽度1920px左右
- **示例**：
  - ✅ `sunset-beach.jpg`
  - ✅ `cyberpunk-city.jpeg`
  - ❌ `日落海滩.jpg`
  - ❌ `photo (1).jpg`

---

## 常见问题

### Q1: 访问相册显示404错误

**原因**：页面未正确生成

**解决方案**：
1. 检查 `public/gallery/index.html` 是否存在
2. 重新生成：`hexo clean && hexo generate`
3. 确认 `source/gallery/index.md` 格式正确（必须有Front-matter）

### Q2: 照片不显示或显示破损图标

**原因**：文件路径错误或文件不存在

**解决方案**：
1. 确认照片文件存在于 `source/gallery/photos/` 目录
2. 检查 `gallery.js` 中的 `image` 路径是否正确
3. 路径必须以 `/` 开头，如 `/gallery/photos/photo.jpg`
4. 清除浏览器缓存后重试

### Q3: 分类筛选功能无效

**原因**：JavaScript未正确加载

**解决方案**：
1. 打开浏览器控制台（F12），检查是否有JavaScript错误
2. 确认 `gallery.js` 已正确加载（Network标签查看）
3. 检查 `index.md` 中是否正确引入了 `<script src="/js/gallery.js"></script>`

### Q4: 统计数字不正确

**原因**：统计数据未自动更新

**解决方案**：
1. 刷新页面（Ctrl+F5）
2. 检查浏览器控制台是否有错误
3. 确认 `galleryData.photos` 数组中包含所有照片

### Q5: 移动端显示异常

**原因**：响应式布局问题

**解决方案**：
1. 检查 `gallery.css` 中的 `@media` 查询是否正确
2. 在手机浏览器中测试不同屏幕尺寸
3. 必要时调整 `grid-template-columns` 的值

### Q6: 照片加载速度慢

**原因**：照片文件过大

**解决方案**：
1. 压缩照片：使用TinyPNG等工具压缩图片
2. 调整尺寸：宽度控制在1920px以内
3. 使用WebP格式（如果浏览器支持）
4. 考虑使用CDN加速

### Q7: 如何删除某张照片？

**操作步骤**：
1. 从 `source/gallery/photos/` 目录删除照片文件
2. 从 `gallery.js` 的 `galleryData.photos` 数组中删除对应条目
3. 执行部署流程

### Q8: 如何修改照片顺序？

**操作步骤**：
1. 在 `gallery.js` 中调整 `galleryData.photos` 数组的顺序
2. 数组前面的照片会先显示
3. 执行部署流程

---

## 优化建议

### 短期优化（照片<20张）

当前方案已足够，无需额外优化。

### 中期优化（照片20-50张）

#### 1. 添加懒加载

在 `gallery.js` 中修改图片加载方式：

```javascript
html += `
<div class="photo-item" data-category="${photo.category}">
  <a href="${photo.image}" target="_blank">
    <img src="/img/loading.gif" 
         data-src="${photo.image}" 
         alt="${photo.title}"
         loading="lazy">
  </a>
  ...
</div>`;
```

#### 2. 添加灯箱效果

集成Lightbox2库，实现点击放大查看：

```html
<!-- 在 index.md 中添加 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.3/css/lightbox.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.3/js/lightbox.min.js"></script>
```

修改图片链接：

```javascript
html += `
<a href="${photo.image}" data-lightbox="gallery" data-title="${photo.title}">
  <img src="${photo.image}" alt="${photo.title}">
</a>`;
```

### 长期优化（照片>50张）

#### 1. 自动化数据同步

创建Node.js脚本自动将YAML转换为JSON：

```javascript
// scripts/sync-gallery-data.js
const fs = require('fs');
const yaml = require('js-yaml');

const yamlData = yaml.load(fs.readFileSync('source/_data/gallery.yml', 'utf8'));
const jsonData = JSON.stringify(yamlData, null, 2);

// 读取现有JS文件
let jsContent = fs.readFileSync('source/js/gallery.js', 'utf8');

// 替换galleryData部分
jsContent = jsContent.replace(
  /const galleryData = \{[\s\S]*?\};/,
  `const galleryData = ${jsonData};`
);

fs.writeFileSync('source/js/gallery.js', jsContent);
console.log('✅ 数据同步完成！');
```

使用方法：
```bash
node scripts/sync-gallery-data.js
```

#### 2. 分页加载

当照片超过50张时，实现分页或无限滚动加载，提升性能。

#### 3. 使用CDN

将照片上传到图床或CDN，减轻服务器压力：

```javascript
{
  title: "照片标题",
  image: "https://cdn.example.com/photos/photo.jpg",  // CDN地址
  category: "wallpaper"
}
```

### 性能优化清单

- [ ] 照片压缩至2MB以内
- [ ] 使用WebP格式（兼容性允许的情况下）
- [ ] 启用浏览器缓存（配置HTTP头）
- [ ] 添加懒加载属性 `loading="lazy"`
- [ ] 使用CDN加速静态资源
- [ ] 定期清理不再使用的照片

---

## 附录

### A. 快速命令参考

```bash
# 清理缓存
hexo clean

# 生成静态文件
hexo generate
# 或简写
hexo g

# 本地预览
hexo server
# 或简写
hexo s

# 部署到服务器
hexo deploy
# 或简写
hexo d

# 一键清理+生成+部署
hexo clean && hexo g && hexo d

# Git操作
git add .
git commit -m "消息"
git push
```

### B. 文件路径速查

| 文件类型 | 路径 | 说明 |
|---------|------|------|
| 页面入口 | `source/gallery/index.md` | Markdown格式 |
| 样式文件 | `source/css/gallery.css` | CSS3样式 |
| 逻辑文件 | `source/js/gallery.js` | JavaScript代码+JSON数据 |
| 数据源 | `source/_data/gallery.yml` | YAML格式（参考用） |
| 照片目录 | `source/gallery/photos/` | 存放所有照片 |

### C. 分类标签颜色

| 分类 | CSS类名 | 背景色 | 文字色 |
|------|---------|--------|--------|
| 壁纸 | `.tag-wallpaper` | `#ffeaa7` | `#d63031` |
| 生活 | `.tag-life` | `#74b9ff` | `#0984e3` |
| 摄影 | `.tag-photography` | `#a29bfe` | `#6c5ce7` |

### D. 响应式断点

| 设备类型 | 屏幕宽度 | 列数 |
|---------|---------|------|
| 桌面端 | >768px | 自适应（最小280px） |
| 平板 | ≤768px | 自适应（最小250px） |
| 手机 | ≤480px | 单列布局 |

---

## 总结

### ✅ 当前方案优势

1. **简单可靠**：纯静态HTML+JavaScript，无依赖
2. **易于维护**：只需修改JSON数据，无需写HTML
3. **自动统计**：JavaScript自动计算照片数量
4. **完全响应式**：支持桌面端和移动端
5. **无编辑器警告**：文件格式规范

### ⚠️ 注意事项

1. **不要**在Markdown中使用模板语法（会导致404）
2. **必须**保持 `gallery.yml` 和 `gallery.js` 数据一致
3. **记得**每次修改后执行完整的部署流程
4. **务必**部署后按 `Ctrl+F5` 强制刷新缓存

### 📞 技术支持

如遇问题，请按以下顺序排查：
1. 查看浏览器控制台（F12）的错误信息
2. 检查文件路径是否正确
3. 确认是否已清除浏览器缓存
4. 参考本文档[常见问题](#常见问题)章节

---

**文档结束**

> 💡 **提示**：建议将此文档加入书签，方便日后查阅。随着照片数量增加，可根据[优化建议](#优化建议)章节逐步升级方案。
