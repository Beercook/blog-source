---
title: 图库和音乐页面完整配置指南
date: 2025-10-06 12:26:00
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

# 📸🎵 图库和音乐页面完整配置指南

本文档详细记录了在 Hexo Butterfly 主题博客中配置图库（相册）和音乐播放器的完整过程。

---

## 📋 目录

- [一、功能概述](#一功能概述)
- [二、插件安装](#二插件安装)
- [三、配置文件设置](#三配置文件设置)
- [四、页面内容配置](#四页面内容配置)
- [五、目录结构说明](#五目录结构说明)
- [六、使用方法](#六使用方法)
- [七、常见问题](#七常见问题)
- [八、最佳实践](#八最佳实践)

---

## 一、功能概述

### 1.1 实现的功能

✅ **图库（相册）功能**
- 响应式网格布局（桌面 3 列、平板 3 列、手机 2 列）
- 图片懒加载优化性能
- 灯箱效果（点击放大查看）
- 图片标题显示
- 自定义间距和缩略图尺寸

✅ **音乐播放器功能**
- APlayer 专业播放器界面
- 支持网易云音乐、QQ音乐等多平台外链
- 歌词显示（LRC 格式）
- 播放列表支持
- 自定义主题色和音量控制
- MetingJS 集成，无需上传音频文件

### 1.2 技术方案选择

根据用户偏好记忆，采用成熟的插件组合：

| 功能 | 插件名称 | 优势 |
|------|---------|------|
| 图库 | `hexo-gallery` | 轻量级、响应式、支持灯箱 |
| 音乐 | `hexo-tag-aplayer` + MetingJS | 支持多平台、可嵌入外链、降低部署负担 |

---

## 二、插件安装

### 2.1 安装 hexo-gallery（图库插件）

```bash
cd c:\Users\18115\Desktop\jdyblog\jdyblog
npm install hexo-gallery --save
```

**安装结果：**
- ✅ 成功安装 hexo-gallery
- ⚠️ 注意：hexo-album 插件已废弃（404 Not Found），应选择 hexo-gallery

### 2.2 安装 hexo-tag-aplayer（音乐播放器插件）

```bash
cd c:\Users\18115\Desktop\jdyblog\jdyblog
npm install hexo-tag-aplayer --save
```

**安装结果：**
- ✅ 成功安装 hexo-tag-aplayer
- ✅ 自动包含 APlayer 核心库
- ✅ 自动包含 MetingJS 支持

### 2.3 验证安装

检查 `package.json` 文件中是否包含以下依赖：

```json
{
  "dependencies": {
    "hexo-gallery": "^x.x.x",
    "hexo-tag-aplayer": "^x.x.x"
  }
}
```

---

## 三、配置文件设置

### 3.1 编辑 _config.yml

打开项目根目录的 [_config.yml](file://c:\Users\18115\Desktop\jdyblog\jdyblog\_config.yml) 文件，在末尾添加以下配置：

#### Gallery 配置

```yaml
# --------------------------------------
# Gallery Plugin Configuration (hexo-gallery)
# --------------------------------------
gallery:
  enable: true             # 启用插件
  lazyload: true           # 启用懒加载（提升性能）
  columns: 3               # 桌面端列数
  gap: 15                  # 图片间距（像素）
  thumbnail_size: 400      # 缩略图尺寸
  lightbox: true           # 启用灯箱效果（点击放大）
  caption: true            # 显示图片标题
  
  # 移动端响应式设置
  mobile_columns: 2        # 手机端列数
  tablet_columns: 3        # 平板端列数
```

#### APlayer 配置

```yaml
# --------------------------------------
# APlayer Music Player Configuration (hexo-tag-aplayer)
# --------------------------------------
aplayer:
  meting: true             # 启用 MetingJS 支持（网易云音乐等）
  asset_inject: true       # 自动注入 CSS/JS 资源
  fixed: false             # 固定底部播放器（false=不固定）
  mini: false              # 迷你模式
  autoplay: false          # 自动播放（建议关闭，避免干扰用户）
  theme: '#ad7a86'         # 主题颜色（粉色系）
  volume: 0.7              # 默认音量（0-1）
  mutex: true              # 互斥模式（同时只播放一个）
  lrcType: 3               # 歌词类型（0=无，1=内联，3=外部文件）
  
  # Meting API 配置
  meting_api: 'https://api.i-meto.com/meting/api?server=:server&type=:type&id=:id&r=:r'
```

### 3.2 配置说明

| 参数 | 说明 | 推荐值 |
|------|------|--------|
| `lazyload` | 懒加载，图片进入视口才加载 | `true` |
| `columns` | 网格列数，影响布局密度 | `3` |
| `gap` | 图片间距，影响美观度 | `15px` |
| `lightbox` | 灯箱效果，点击放大查看 | `true` |
| `meting` | 支持在线音乐平台 | `true` |
| `autoplay` | 自动播放，可能干扰用户 | `false` |
| `volume` | 默认音量，避免过大 | `0.7` |
| `mutex` | 互斥播放，避免多个同时播放 | `true` |

---

## 四、页面内容配置

### 4.1 图库页面配置

编辑 [source/gallery/index.md](file://c:\Users\18115\Desktop\jdyblog\jdyblog\source\gallery\index.md)，添加以下内容：

#### Front-matter 设置

```markdown
---
title: 我的相册
date: 2026-04-30 17:00:00
type: "gallery"
comments: false
top_img: /img/top-banner.jpg
---
```

#### 使用 gallery 标签

```markdown
## 🌍 旅行相册

### 2024 北京之旅

{% gallery %}
![](/gallery/travel/2024-beijing/photo1.jpg "故宫博物院")
![](/gallery/travel/2024-beijing/photo2.jpg "长城风光")
![](/gallery/travel/2024-beijing/photo3.jpg "天坛公园")
![](/gallery/travel/2024-beijing/photo4.jpg "颐和园")
{% endgallery %}

---

## 🏠 日常生活

{% gallery %}
![](/gallery/daily/photo1.jpg "清晨的阳光")
![](/gallery/daily/photo2.jpg "午后咖啡")
![](/gallery/daily/photo3.jpg "夕阳西下")
{% endgallery %}
```

**语法说明：**
- `{% gallery %}` ... `{% endgallery %}` - 画廊容器
- `![](图片路径 "图片描述")` - 标准 Markdown 图片语法
- 图片描述会在悬停时显示

### 4.2 音乐页面配置

编辑 [source/music/index.md](file://c:\Users\18115\Desktop\jdyblog\jdyblog\source\music\index.md)，添加以下内容：

#### Front-matter 设置

```markdown
---
title: 我的音乐
date: 2026-04-30 17:00:00
type: "music"
comments: false
top_img: /img/top-banner.jpg
---
```

#### 方式一：本地音频文件

```markdown
### 晴天 - 周杰伦

{% aplayer "晴天" "周杰伦" "/music/audio/qingtian.mp3" "/music/covers/jay-chou.jpg" "lrc:/music/lrc/qingtian.lrc" %}
```

**参数说明：**
1. 歌曲名
2. 歌手名
3. 音频文件路径
4. 封面图片路径
5. 歌词文件路径（可选）

#### 方式二：网易云音乐外链（推荐）

```markdown
### 使用 MetingJS 嵌入歌单

{% meting "playlist" "netease" "705123491" "theme:#ad7a86" %}
```

**参数说明：**
1. 类型：`song`（单曲）、`playlist`（歌单）、`album`（专辑）
2. 平台：`netease`（网易云）、`tencent`（QQ音乐）、`kugou`（酷狗）等
3. ID：从 URL 中获取的数字 ID
4. 主题色：自定义播放器颜色

#### 如何获取网易云音乐 ID

1. 打开[网易云音乐网页版](https://music.163.com/)
2. 进入歌曲或歌单页面
3. 查看浏览器地址栏的 URL
4. 提取 `id=` 后面的数字

**示例：**
```
歌曲：https://music.163.com/#/song?id=186016
                                    ^^^^^^
歌单：https://music.163.com/#/playlist?id=705123491
                                        ^^^^^^^^^^
```

---

## 五、目录结构说明

### 5.1 推荐的目录结构

```
source/
├── gallery/                    # 图库目录
│   ├── index.md               # 图库页面
│   ├── travel/                # 旅行相册
│   │   └── 2024-beijing/      # 具体相册
│   │       ├── photo1.jpg     # 照片文件
│   │       ├── photo2.jpg
│   │       └── photo3.jpg
│   └── daily/                 # 日常生活
│       ├── photo1.jpg
│       └── photo2.jpg
│
└── music/                     # 音乐目录
    ├── index.md               # 音乐页面
    ├── audio/                 # 音频文件（如使用本地文件）
    │   ├── jay-chou/
    │   │   ├── qingtian.mp3
    │   │   └── qinghuaci.mp3
    │   └── pop/
    │       └── song1.mp3
    ├── covers/                # 封面图片
    │   ├── jay-chou.jpg
    │   └── pushu.jpg
    └── lrc/                   # 歌词文件（可选）
        ├── qingtian.lrc
        └── pingfan.lrc
```

### 5.2 创建目录命令

```bash
# Windows PowerShell
mkdir -p source/gallery/travel/2024-beijing
mkdir -p source/gallery/daily
mkdir -p source/music/audio
mkdir -p source/music/covers
mkdir -p source/music/lrc

# Linux/Mac
mkdir -p source/gallery/{travel/2024-beijing,daily}
mkdir -p source/music/{audio,covers,lrc}
```

---

## 六、使用方法

### 6.1 添加新相册

#### 步骤 1：准备照片

- 格式：JPG、PNG、WebP
- 尺寸：宽度 800-1200px，高度 600-900px
- 大小：单张 < 2MB
- 压缩工具：[TinyPNG](https://tinypng.com/)、[Squoosh](https://squoosh.app/)

#### 步骤 2：上传照片

```bash
# Windows PowerShell
Copy-Item "C:\Users\YourName\Pictures\beijing1.jpg" ".\source\gallery\travel\2024-beijing\photo1.jpg"

# Linux/Mac
cp ~/Pictures/beijing1.jpg ./source/gallery/travel/2024-beijing/photo1.jpg
```

#### 步骤 3：编辑页面

在 [source/gallery/index.md](file://c:\Users\18115\Desktop\jdyblog\jdyblog\source\gallery\index.md) 中添加：

```markdown
## 新相册标题

{% gallery %}
![](/gallery/travel/2024-beijing/photo1.jpg "照片描述1")
![](/gallery/travel/2024-beijing/photo2.jpg "照片描述2")
![](/gallery/travel/2024-beijing/photo3.jpg "照片描述3")
{% endgallery %}
```

#### 步骤 4：部署

```bash
hexo clean && hexo generate && hexo deploy
```

### 6.2 添加新歌曲

#### 方式 A：使用网易云音乐（推荐）

**优点：**
- ✅ 无需上传音频文件
- ✅ 节省服务器空间
- ✅ 避免版权问题
- ✅ 音质有保障

**步骤：**

1. 获取歌曲 ID（见 4.2 节）

2. 在 [source/music/index.md](file://c:\Users\18115\Desktop\jdyblog\jdyblog\source\music\index.md) 中添加：

```markdown
### 歌曲名 - 歌手

{% meting "song" "netease" "歌曲ID" "theme:#ad7a86" %}
```

3. 部署

```bash
hexo clean && hexo generate && hexo deploy
```

#### 方式 B：上传本地音频文件

**步骤：**

1. 准备 MP3 文件和封面图片

2. 上传文件：

```bash
# Windows PowerShell
Copy-Item "song.mp3" ".\source\music\audio\"
Copy-Item "cover.jpg" ".\source\music\covers\"

# Linux/Mac
cp song.mp3 ./source/music/audio/
cp cover.jpg ./source/music/covers/
```

3. 编辑页面：

```markdown
### 歌曲名 - 歌手

{% aplayer "歌曲名" "歌手" "/music/audio/song.mp3" "/music/covers/cover.jpg" %}
```

4. 部署

---

## 七、常见问题

### 7.1 图库相关

#### Q1: 图片不显示怎么办？

**解决方案：**

1. 检查文件路径是否正确（区分大小写）
2. 确认文件格式是否为 JPG、PNG、WebP
3. 执行 `hexo clean` 清理缓存
4. 按 **Ctrl + Shift + R** 强制刷新浏览器
5. 检查浏览器控制台是否有 404 错误

#### Q2: 可以添加多少张照片？

**建议：**
- 每个相册不超过 50 张
- 总照片数不超过 500 张
- 过多照片会影响加载速度

#### Q3: 图片加载很慢怎么办？

**优化方案：**

1. 压缩图片（使用 TinyPNG）
2. 启用懒加载（已默认启用）
3. 使用 WebP 格式（体积更小）
4. 减少单页照片数量

#### Q4: 支持视频吗？

**回答：**
hexo-gallery 主要支持图片。如需嵌入视频，建议使用 HTML5 `<video>` 标签：

```html
<video controls width="100%">
  <source src="/gallery/video/demo.mp4" type="video/mp4">
</video>
```

### 7.2 音乐相关

#### Q1: 音乐无法播放怎么办？

**解决方案：**

1. 检查音频文件是否存在
2. 确认文件格式是否为 MP3
3. 检查浏览器是否支持该格式
4. 尝试使用网易云音乐外链（更稳定）

#### Q2: 可以添加多少首歌？

**建议：**
- 每页不超过 20 首
- 总歌曲数不超过 200 首
- 过多歌曲会影响页面加载

#### Q3: 支持 FLAC 无损格式吗？

**回答：**
部分浏览器不支持 FLAC，建议转换为 MP3 格式以确保兼容性。

**转换工具：**
- [Audacity](https://www.audacityteam.org/)（免费）
- FFmpeg（命令行）
- [Online Audio Converter](https://online-audio-converter.com/)（在线）

#### Q4: 如何添加歌词？

**步骤：**

1. 创建 LRC 歌词文件（`source/music/lrc/song.lrc`）：

```lrc
[00:00.00]歌曲名 - 歌手
[00:05.00]第一句歌词
[00:08.50]第二句歌词
[00:12.00]第三句歌词
```

2. 在播放器中引用：

```markdown
{% aplayer "歌曲名" "歌手" "/music/audio/song.mp3" "/music/covers/cover.jpg" "lrc:/music/lrc/song.lrc" %}
```

#### Q5: 版权注意事项

⚠️ **重要提醒：**

- ✅ 可以上传自己创作的音乐
- ✅ 可以使用无版权/开源音乐
- ✅ 可以嵌入网易云音乐等平台的公开歌单
- ❌ 不要上传受版权保护的商业音乐用于公开传播
- ❌ 不要用于商业用途

**建议：** 优先使用 MetingJS 嵌入在线音乐平台的内容，避免版权风险。

---

## 八、最佳实践

### 8.1 图片优化

#### 推荐工具

| 工具 | 类型 | 网址 |
|------|------|------|
| TinyPNG | 在线 | https://tinypng.com/ |
| ImageOptim | Mac | https://imageoptim.com/ |
| Squoosh | 在线 | https://squoosh.app/ |
| Photoshop | 桌面软件 | Adobe 官方 |

#### 优化建议

- ✅ 使用 WebP 格式（比 JPG 小 30%）
- ✅ 宽度控制在 800-1200px
- ✅ 单张图片 < 2MB
- ✅ 批量压缩提高效率

### 8.2 音频优化

#### 推荐参数

| 参数 | 推荐值 | 说明 |
|------|--------|------|
| 格式 | MP3 | 兼容性最好 |
| 比特率 | 128-320kbps | 平衡音质和体积 |
| 采样率 | 44.1kHz | 标准 CD 音质 |
| 单首大小 | < 10MB | 保证加载速度 |

#### 元数据管理

使用 [Mp3tag](https://www.mp3tag.de/) 添加 ID3 标签：
- 标题
- 艺术家
- 专辑
- 封面图片

### 8.3 性能优化

#### 图库优化

1. **启用懒加载**（已配置）
2. **使用缩略图**（thumbnail_size: 400）
3. **限制单页数量**（建议 < 50 张）
4. **压缩图片**（TinyPNG）

#### 音乐优化

1. **使用外链**（MetingJS，无需上传文件）
2. **关闭自动播放**（autoplay: false）
3. **合理设置音量**（volume: 0.7）
4. **启用互斥模式**（mutex: true）

### 8.4 内容组织

#### 相册分类建议

```
gallery/
├── travel/          # 旅行照片
│   ├── 2024-beijing/
│   ├── 2024-shanghai/
│   └── 2025-yunnan/
├── daily/           # 日常生活
│   ├── food/        # 美食
│   ├── pets/        # 宠物
│   └── scenery/     # 风景
└── events/          # 活动记录
    ├── graduation/  # 毕业
    └── wedding/     # 婚礼
```

#### 音乐分类建议

```
music/
├── favorites/       # 最爱歌曲
├── classical/       # 古典音乐
├── pop/             # 流行音乐
├── rock/            # 摇滚乐
└── playlists/       # 播放列表
```

### 8.5 部署流程

#### 标准部署命令

```bash
# 一键完成（推荐）
hexo clean && hexo generate && hexo deploy

# 分步执行
hexo clean              # 清理缓存
hexo generate           # 生成静态文件
hexo deploy             # 部署到服务器
```

#### 本地预览

```bash
hexo server
```

访问：http://localhost:4000/

---

## 九、访问地址

### 9.1 页面地址

| 页面 | 本地预览 | 远程访问 |
|------|---------|---------|
| **图库** | http://localhost/gallery/ | http://8.141.86.241/gallery/ |
| **音乐** | http://localhost/music/ | http://8.141.86.241/music/ |

### 9.2 导航栏入口

已在 [_config.butterfly.yml](file://c:\Users\18115\Desktop\jdyblog\jdyblog\_config.butterfly.yml) 中配置：

```yaml
menu:
  首页: / || fas fa-home
  归档: /archives/ || fas fa-archive
  标签: /tags/ || fas fa-tags
  分类: /categories/ || fas fa-folder-open
  图库: /gallery/ || fas fa-images
  音乐: /music/ || fas fa-music
```

---

## 十、技术栈总结

### 10.1 使用的插件

| 插件名称 | 版本 | 用途 |
|---------|------|------|
| hexo-gallery | latest | 图库相册功能 |
| hexo-tag-aplayer | latest | 音乐播放器 |
| MetingJS | 内置 | 在线音乐平台支持 |

### 10.2 配置文件

| 文件 | 作用 |
|------|------|
| `_config.yml` | 主配置文件，添加插件配置 |
| `_config.butterfly.yml` | 主题配置文件，添加导航菜单 |
| `source/gallery/index.md` | 图库页面内容 |
| `source/music/index.md` | 音乐页面内容 |

### 10.3 生成的资源

部署后会自动生成以下资源：

```
public/
├── gallery/
│   └── index.html           # 图库页面
├── music/
│   └── index.html           # 音乐页面
├── assets/
│   ├── css/
│   │   └── APlayer.min.css  # APlayer 样式
│   └── js/
│       ├── APlayer.min.js   # APlayer 核心库
│       └── Meting.min.js    # MetingJS 库
├── css/
│   └── gallery.css          # 图库样式
└── js/
    └── gallery.js           # 图库脚本
```

---

## 十一、更新日志

### v1.0.0 (2026-04-30)

- ✅ 初始版本发布
- ✅ 集成 hexo-gallery 插件
- ✅ 集成 hexo-tag-aplayer 插件
- ✅ 配置响应式布局
- ✅ 支持网易云音乐外链
- ✅ 编写完整配置文档

---

## 十二、参考资料

### 官方文档

- [Hexo 官方文档](https://hexo.io/zh-cn/docs/)
- [Butterfly 主题文档](https://butterfly.js.org/)
- [APlayer 文档](https://aplayer.js.org/)
- [MetingJS 文档](https://github.com/metowolf/MetingJS)

### 相关工具

- [TinyPNG](https://tinypng.com/) - 图片压缩
- [Mp3tag](https://www.mp3tag.de/) - 音频标签编辑
- [Audacity](https://www.audacityteam.org/) - 音频编辑

---

## 十三、联系方式

如有问题或建议，请联系：

- 📧 邮箱：1811552860@qq.com
- 👤 Git 用户名：jdy
- 🌐 博客地址：http://8.141.86.241/

---

*最后更新：2026-04-30*  
*文档版本：v1.0.0*