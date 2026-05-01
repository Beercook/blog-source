---
title: 图库和音乐页面配置指南
date: 2026-04-30 17:00:00
categories:
  - 技术文档
  - 网站文档
tags:
  - Hexo
  - 主题配置
  - 使用指南
  - 相册
  - 音乐
top_img: /img/top-banner.jpg
---

# 📸🎵 图库和音乐页面配置指南

## 概述

本指南详细介绍如何在 Hexo Butterfly 主题博客中创建和管理"图库"（相册）和"音乐"（私人曲库）页面。

---

## 📋 目录

- [一、页面创建](#一页面的创建)
- [二、导航栏配置](#二导航栏配置)
- [三、图库页面配置](#三图库页面配置)
- [四、音乐页面配置](#四音乐页面配置)
- [五、进阶功能](#五进阶功能)
- [六、常见问题](#六常见问题)

---

## 一、页面的创建

### 1.1 已完成的配置

✅ **导航栏已添加**：
- 图库：`/gallery/` (图标：fas fa-images)
- 音乐：`/music/` (图标：fas fa-music)

✅ **页面文件已创建**：
- `source/gallery/index.md` - 图库页面
- `source/music/index.md` - 音乐页面

### 1.2 访问地址

部署后可以通过以下地址访问：
- 图库：http://8.141.86.241/gallery/
- 音乐：http://8.141.86.241/music/

---

## 二、导航栏配置

### 2.1 配置文件位置

编辑 `_config.butterfly.yml` 文件中的 `menu` 部分：

```yaml
menu:
  首页: / || fas fa-home
  我的文档: /categories/ || fas fa-book
  图库: /gallery/ || fas fa-images      # ← 新增
  音乐: /music/ || fas fa-music         # ← 新增
  标签: /tags/ || fas fa-tags
  分类: /categories/ || fas fa-folder-open
```

### 2.2 图标说明

Butterfly 主题使用 Font Awesome 图标库，常用图标：

| 图标类名 | 效果 | 用途 |
|---------|------|------|
| `fas fa-images` | 🖼️ | 图库/相册 |
| `fas fa-music` | 🎵 | 音乐 |
| `fas fa-video` | 📹 | 视频 |
| `fas fa-camera` | 📷 | 摄影 |
| `fas fa-headphones` | 🎧 | 耳机/音频 |

更多图标请访问：[Font Awesome Icons](https://fontawesome.com/icons)

---

## 三、图库页面配置

### 3.1 基础结构

当前图库页面位于：`source/gallery/index.md`

基本 Front-matter：

```yaml
---
title: 我的相册
date: 2026-04-30 17:00:00
type: "gallery"
comments: false
top_img: /img/top-banner.jpg
---
```

### 3.2 图片组织方式

#### 方式一：文件夹分类（推荐）

```
source/gallery/
├── index.md
├── travel/              # 旅行相册
│   ├── 2024-beijing/
│   │   ├── photo1.jpg
│   │   ├── photo2.jpg
│   │   └── README.md
│   └── 2025-shanghai/
│       ├── photo1.jpg
│       └── photo2.jpg
├── daily/               # 日常生活
│   ├── food/
│   ├── pets/
│   └── friends/
└── events/              # 活动记录
    ├── graduation/
    └── wedding/
```

#### 方式二：按时间分类

```
source/gallery/
├── 2024/
│   ├── 01-january/
│   ├── 02-february/
│   └── ...
└── 2025/
    ├── 01-january/
    └── ...
```

### 3.3 推荐的插件方案

#### 方案 A：hexo-album（专业相册插件）

**安装：**

```bash
npm install hexo-album --save
```

**配置 `_config.yml`：**

```yaml
album:
  enable: true
  path: gallery
  per_page: 12          # 每页显示数量
  order_by: -date       # 排序方式
  thumbnail_size: 300   # 缩略图尺寸
  lightbox: true        # 启用灯箱效果
```

**使用：**

在文章中插入相册：

```markdown
{% album travel/2024-beijing %}
```

#### 方案 B：hexo-gallery（轻量级）

**安装：**

```bash
npm install hexo-gallery --save
```

**配置：**

```yaml
gallery:
  enable: true
  lazyload: true
  columns: 3            # 列数
  gap: 10               # 间距
```

#### 方案 C：纯 CSS 网格布局（无需插件）

在 `source/css/custom.css` 中添加：

```css
.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
  padding: 20px;
}

.photo-grid img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.photo-grid img:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}
```

在 Markdown 中使用：

```html
<div class="photo-grid">
  <img src="/gallery/travel/photo1.jpg" alt="照片描述" loading="lazy">
  <img src="/gallery/travel/photo2.jpg" alt="照片描述" loading="lazy">
  <img src="/gallery/daily/photo1.jpg" alt="照片描述" loading="lazy">
</div>
```

### 3.4 图片优化建议

| 项目 | 建议值 |
|------|--------|
| 宽度 | 800-1200px |
| 高度 | 600-900px |
| 格式 | JPG（照片）、PNG（截图）、WebP（现代浏览器） |
| 单张大小 | < 2MB |
| 压缩工具 | TinyPNG、ImageOptim、Squoosh |
| 懒加载 | 添加 `loading="lazy"` 属性 |

### 3.5 高级功能

#### 灯箱效果（Lightbox）

安装 hexo-lightgallery：

```bash
npm install hexo-lightgallery --save
```

自动为所有图片添加点击放大效果。

#### EXIF 信息显示

使用 exif-js 库显示拍摄参数：

```javascript
// 在 custom.js 中添加
EXIF.getData(img, function() {
  const make = EXIF.getTag(this, "Make");
  const model = EXIF.getTag(this, "Model");
  console.log(`相机: ${make} ${model}`);
});
```

---

## 四、音乐页面配置

### 4.1 基础结构

当前音乐页面位于：`source/music/index.md`

基本 Front-matter：

```yaml
---
title: 我的音乐
date: 2026-04-30 17:00:00
type: "music"
comments: false
top_img: /img/top-banner.jpg
---
```

### 4.2 音频文件组织

```
source/music/
├── index.md
├── audio/                    # 音频文件
│   ├── jay-chou/
│   │   ├── qingtian.mp3
│   │   └── qinghuaci.mp3
│   ├── pop/
│   │   ├── song1.mp3
│   │   └── song2.mp3
│   └── classical/
│       └── beethoven.mp3
├── covers/                   # 封面图片
│   ├── album1.jpg
│   └── album2.jpg
└── playlists/                # 播放列表
    ├── favorites.json
    └── chill.json
```

### 4.3 推荐的播放器方案

#### 方案 A：APlayer + MetingJS（⭐强烈推荐）

这是最流行、功能最强大的方案，支持多平台。

**步骤 1：安装插件**

```bash
npm install hexo-tag-aplayer --save
```

**步骤 2：在文章中使用单个歌曲**

```markdown
{% aplayer "晴天" "周杰伦" "/music/audio/jay-chou/qingtian.mp3" "/music/covers/jay-chou.jpg" %}
```

**步骤 3：创建播放列表**

```markdown
{% aplaylist listid="123456789" server="netease" type="playlist" %}
```

参数说明：
- `server`: netease（网易云）、tencent（QQ）、kugou（酷狗）、xiami（虾米）、baidu（百度）
- `type`: song（单曲）、playlist（歌单）、album（专辑）、search（搜索）
- `listid`: 对应的 ID

**步骤 4：使用 Meting 嵌入在线音乐**

```markdown
{% meting "song" "netease" "186016" "theme:#ad7a86" "mutex:true" %}
```

获取歌曲 ID 的方法：
1. 打开网易云音乐网页版
2. 进入歌曲页面
3. URL 中的数字即为 ID（如：https://music.163.com/#/song?id=**186016**）

**完整配置示例：**

在 `_config.yml` 中添加：

```yaml
aplayer:
  meting: true
  asset_inject: true
```

#### 方案 B：hexo-music 插件

**安装：**

```bash
npm install hexo-music --save
```

**配置 `_config.yml`：**

```yaml
music:
  enable: true
  server: netease          # 音乐平台
  type: playlist           # 类型
  id: 123456789           # 歌单ID
  fixed: true             # 固定底部播放器
  mini: false             # 迷你模式
  autoplay: false         # 自动播放
  theme: '#ad7a86'        # 主题色
```

**在页面中插入：**

```markdown
{% music %}
```

#### 方案 C：HTML5 原生播放器

最简单的方式，无需插件：

```html
<audio controls preload="metadata">
  <source src="/music/audio/song1.mp3" type="audio/mpeg">
  您的浏览器不支持音频播放。
</audio>
```

批量展示：

```html
<div class="music-list">
  <div class="music-item">
    <h3>晴天 - 周杰伦</h3>
    <audio controls>
      <source src="/music/audio/jay-chou/qingtian.mp3" type="audio/mpeg">
    </audio>
  </div>
  
  <div class="music-item">
    <h3>平凡之路 - 朴树</h3>
    <audio controls>
      <source src="/music/audio/pop/pingfan.mp3" type="audio/mpeg">
    </audio>
  </div>
</div>
```

自定义样式（添加到 `custom.css`）：

```css
.music-list {
  max-width: 800px;
  margin: 0 auto;
}

.music-item {
  background: #f5f5f5;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 8px;
}

.music-item h3 {
  margin-top: 0;
  color: #333;
}

.music-item audio {
  width: 100%;
  margin-top: 10px;
}
```

### 4.4 音频优化建议

| 项目 | 建议值 |
|------|--------|
| 格式 | MP3（兼容性最好）、AAC、OGG |
| 比特率 | 128kbps（标准）、192kbps（高质量）、320kbps（无损） |
| 采样率 | 44.1kHz |
| 单首大小 | < 10MB |
| 压缩工具 | Audacity、FFmpeg、Online Audio Converter |
| 元数据 | 使用 Mp3tag 添加 ID3 标签（标题、艺术家、专辑） |

### 4.5 高级功能

#### 歌词显示

APlayer 支持 LRC 歌词：

```markdown
{% aplayer "晴天" "周杰伦" "/music/audio/qingtian.mp3" "/music/covers/jay.jpg" "lrc:/music/lrc/qingtian.lrc" %}
```

LRC 文件格式：

```lrc
[00:00.00]晴天 - 周杰伦
[00:05.00]故事的小黄花
[00:08.50]从出生那年就飘着
[00:12.00]童年的荡秋千
```

#### 背景音乐（BGM）

在页面底部添加固定播放器：

```yaml
# _config.butterfly.yml
aplayer:
  fixed: true
  mini: true
  autoplay: false
  volume: 0.7
```

---

## 五、进阶功能

### 5.1 响应式设计

确保在手机和平板上良好显示：

```css
/* 手机端优化 */
@media (max-width: 768px) {
  .photo-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
  
  .music-item {
    padding: 15px;
  }
}
```

### 5.2 性能优化

#### 图片懒加载

```html
<img src="/gallery/photo.jpg" alt="描述" loading="lazy">
```

#### 音频预加载策略

```html
<!-- 仅加载元数据 -->
<audio preload="metadata">

<!-- 不预加载 -->
<audio preload="none">
```

#### CDN 加速

将大文件上传到 CDN：

```markdown
![照片](https://cdn.example.com/gallery/photo.jpg)

{% aplayer "歌曲" "歌手" "https://cdn.example.com/music/song.mp3" %}
```

### 5.3 SEO 优化

为图片和音频添加描述性信息：

```html
<!-- 图片 ALT 文本 -->
<img src="/gallery/travel/beijing.jpg" 
     alt="2024年北京旅行 - 故宫博物院"
     title="故宫角楼日落">

<!-- 音频元数据 -->
<audio controls>
  <source src="/music/song.mp3" type="audio/mpeg">
  <track kind="captions" src="/music/song.vtt" srclang="zh" label="中文">
</audio>
```

### 5.4 社交分享

添加分享按钮：

```html
<div class="share-buttons">
  <a href="#" class="share-btn wechat">微信</a>
  <a href="#" class="share-btn weibo">微博</a>
  <a href="#" class="share-btn qq">QQ</a>
</div>
```

---

## 六、常见问题

### Q1: 图片不显示怎么办？

**检查清单：**
1. ✅ 文件路径是否正确（区分大小写）
2. ✅ 文件是否存在于 `source/gallery/` 目录
3. ✅ 是否执行了 `hexo clean && hexo generate`
4. ✅ 浏览器控制台是否有 404 错误
5. ✅ 图片格式是否支持（JPG、PNG、WebP）

**解决方法：**

```bash
# 清理并重新生成
hexo clean
hexo generate
hexo deploy

# 检查文件是否存在
ls source/gallery/travel/
```

### Q2: 音乐无法播放？

**可能原因：**
1. 音频文件路径错误
2. 浏览器不支持该音频格式
3. CORS 跨域问题（使用外部链接时）
4. 文件大小超过服务器限制

**解决方法：**

```bash
# 测试音频文件
ffprobe /path/to/song.mp3

# 转换为兼容格式
ffmpeg -i input.wav -codec:a libmp3lame -qscale:a 2 output.mp3
```

### Q3: 如何批量导入网易云音乐歌单？

**步骤：**

1. 获取歌单 ID（从 URL 中）
2. 在页面中使用：

```markdown
{% meting "playlist" "netease" "歌单ID" "theme:#ad7a86" %}
```

例如：
```markdown
{% meting "playlist" "netease" "705123491" "theme:#ad7a86" %}
```

### Q4: 如何保护隐私（不让所有人看到）？

**方法一：密码保护**

使用 hexo-blog-encrypt 插件：

```bash
npm install hexo-blog-encrypt --save
```

在 Front-matter 中添加：

```yaml
---
password: your_password
abstract: 这里有加密内容，请输入密码查看
---
```

**方法二：隐藏页面**

不在导航栏显示链接，通过直接 URL 访问。

**方法三：IP 白名单**

在 Nginx 配置中限制访问：

```nginx
location /gallery/ {
  allow 192.168.1.100;  # 只允许特定IP
  deny all;
}
```

### Q5: 加载速度慢怎么办？

**优化方案：**

1. **图片压缩**
   ```bash
   # 使用 ImageOptim 或 TinyPNG
   tinypng photo.jpg
   ```

2. **启用 Gzip**
   ```nginx
   # Nginx 配置
   gzip on;
   gzip_types image/jpeg image/png audio/mpeg;
   ```

3. **使用 CDN**
   - 七牛云
   - 阿里云 OSS
   - Cloudflare

4. **懒加载**
   ```html
   <img src="photo.jpg" loading="lazy">
   ```

### Q6: 如何添加水印？

使用 CSS 添加文字水印：

```css
.photo-grid img {
  position: relative;
}

.photo-grid img::after {
  content: "© Your Name";
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: white;
  font-size: 14px;
  text-shadow: 1px 1px 2px black;
}
```

或使用图片处理软件批量添加水印。

---

## 📝 快速开始清单

### 图库页面

- [ ] 创建 `source/gallery/` 目录
- [ ] 上传照片到对应子文件夹
- [ ] 选择插件方案（hexo-album / hexo-gallery / 纯CSS）
- [ ] 配置插件参数
- [ ] 测试页面显示
- [ ] 优化图片大小和格式

### 音乐页面

- [ ] 创建 `source/music/` 目录
- [ ] 上传音频文件到 `audio/` 子文件夹
- [ ] 安装 hexo-tag-aplayer 插件
- [ ] 在页面中插入播放器代码
- [ ] 测试播放功能
- [ ] 添加播放列表

---

## 🔗 相关资源

- [Hexo 官方文档](https://hexo.io/zh-cn/docs/)
- [Butterfly 主题文档](https://butterfly.js.org/)
- [APlayer 文档](https://aplayer.js.org/)
- [MetingJS GitHub](https://github.com/metowolf/MetingJS)
- [Font Awesome 图标](https://fontawesome.com/icons)
- [TinyPNG 图片压缩](https://tinypng.com/)

---

## 💬 需要帮助？

如有任何问题，可以：
1. 查看 Hexo 官方文档
2. 访问 Butterfly 主题 GitHub Issues
3. 在博客评论区留言
4. 联系邮箱：1811552860@qq.com

---

*最后更新：2026-04-30*
*作者：jdy*