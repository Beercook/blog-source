# 🎵 音乐文件说明

## 当前目录结构

```
source/music/
├── index.md              # 音乐页面
├── audio/                # 音频文件目录
│   ├── qingtian.mp3      # ← 需要添加真实音频
│   ├── pingfan.mp3       # ← 需要添加真实音频
│   └── night-star.mp3    # ← 需要添加真实音频
└── covers/               # 封面图片目录
    ├── jay-chou.jpg      # ← 需要添加封面图片
    ├── pushu.jpg         # ← 需要添加封面图片
    └── escape-plan.jpg   # ← 需要添加封面图片
```

## 📝 如何添加音乐

### 方法一：直接复制文件

1. 准备好你的音频文件（MP3 格式）
2. 将音频文件复制到 `source/music/audio/` 目录
3. 重命名为合适的名称（如 `qingtian.mp3`）
4. 准备封面图片，放入 `source/music/covers/` 目录
5. 运行部署命令

### 方法二：使用命令行

```bash
# Windows PowerShell
Copy-Item "C:\Users\YourName\Music\qingtian.mp3" ".\source\music\audio\qingtian.mp3"
Copy-Item "C:\Users\YourName\Pictures\jay-chou.jpg" ".\source\music\covers\jay-chou.jpg"

# Linux/Mac
cp ~/Music/qingtian.mp3 ./source/music/audio/qingtian.mp3
cp ~/Pictures/jay-chou.jpg ./source/music/covers/jay-chou.jpg
```

## 🎯 音频要求

| 项目 | 建议值 |
|------|--------|
| 格式 | MP3（兼容性最好）、AAC、OGG |
| 比特率 | 128kbps（标准）、192kbps（高质量）、320kbps（无损） |
| 采样率 | 44.1kHz |
| 大小 | < 10MB |
| 元数据 | 使用 Mp3tag 添加 ID3 标签 |

## 🔧 音频处理推荐工具

### 音频转换/编辑
1. **Audacity** (免费) - https://www.audacityteam.org/
2. **FFmpeg** (命令行) - https://ffmpeg.org/
3. **Online Audio Converter** (在线) - https://online-audio-converter.com/

### 标签编辑
1. **Mp3tag** (Windows) - https://www.mp3tag.de/
2. **Kid3** (Linux) - https://kid3.kde.org/
3. **Meta** (Mac) - App Store

### 封面图片
- 尺寸：500x500px 或更大
- 格式：JPG、PNG
- 大小：< 500KB

## 📋 添加新歌的步骤

1. 准备音频文件和封面图片

2. 复制到对应目录：
   ```bash
   cp your-song.mp3 ./source/music/audio/
   cp cover.jpg ./source/music/covers/
   ```

3. 编辑 `source/music/index.md`，添加：
   ```markdown
   ### 歌曲名 - 歌手
   
   {% aplayer "歌曲名" "歌手" "/music/audio/your-song.mp3" "/music/covers/cover.jpg" %}
   ```

4. 部署：
   ```bash
   hexo clean && hexo generate && hexo deploy
   ```

## 🌐 使用网易云音乐外链（无需上传文件）

如果你不想上传音频文件，可以直接嵌入网易云音乐的歌曲：

```markdown
{% meting "song" "netease" "歌曲ID" "theme:#ad7a86" %}
```

例如：
```markdown
{% meting "song" "netease" "186016" "theme:#ad7a86" %}
```

### 如何获取歌曲 ID

1. 打开[网易云音乐](https://music.163.com/)
2. 搜索歌曲并进入播放页面
3. 查看地址栏 URL：`https://music.163.com/#/song?id=186016`
4. `id=` 后面的数字就是歌曲 ID

## 💡 高级用法

### 添加歌词

创建 LRC 歌词文件（`source/music/lrc/qingtian.lrc`）：

```lrc
[00:00.00]晴天 - 周杰伦
[00:05.00]故事的小黄花
[00:08.50]从出生那年就飘着
[00:12.00]童年的荡秋千
```

然后在播放器中引用：

```markdown
{% aplayer "晴天" "周杰伦" "/music/audio/qingtian.mp3" "/music/covers/jay.jpg" "lrc:/music/lrc/qingtian.lrc" %}
```

### 创建播放列表

```markdown
{% aplaylist listid="705123491" server="netease" type="playlist" %}
```

## ⚠️ 版权提醒

请注意版权问题：
- ✅ 可以上传自己创作的音乐
- ✅ 可以使用无版权/开源音乐
- ✅ 可以嵌入网易云音乐等平台的公开歌单
- ❌ 不要上传受版权保护的商业音乐用于公开传播
- ❌ 不要用于商业用途

建议优先使用 MetingJS 嵌入在线音乐平台的内容，避免版权风险。

## ❓ 常见问题

**Q: 音频无法播放怎么办？**
A: 检查以下几点：
- 文件路径是否正确
- 文件格式是否为 MP3
- 浏览器是否支持该音频格式
- 是否执行了 `hexo clean`

**Q: 可以添加多少首歌？**
A: 没有硬性限制，但建议每页不超过 20 首，以保证加载速度。

**Q: 支持 FLAC 无损格式吗？**
A: 部分浏览器不支持 FLAC，建议转换为 MP3 格式以确保兼容性。

---

*最后更新：2026-04-30*
