---
title: 我的音乐
date: 2026-04-30 17:00:00
type: "music"
comments: false
top_img: /img/top-banner.jpg
---

# 🎵 我的私人曲库

这里收藏了我喜爱的音乐作品。

---

## 🎼 推荐歌曲

### 金斧子银斧子 - 薛之谦

{% aplayer "金斧子银斧子" "薛之谦" "/music/audio/jinfuzi.mp3" "/music/covers/jinfuzi.jpg" "lrc:/music/lrc/jinfuzi.lrc" %}

---

### 晴天 - 周杰伦

{% aplayer "晴天" "周杰伦" "/music/audio/qingtian.mp3" "/music/covers/jay-chou.jpg" "lrc:/music/lrc/qingtian.lrc" %}

---

### 平凡之路 - 朴树

{% aplayer "平凡之路" "朴树" "/music/audio/pingfan.mp3" "/music/covers/pushu.jpg" %}

---

### 夜空中最亮的星 - 逃跑计划

{% aplayer "夜空中最亮的星" "逃跑计划" "/music/audio/night-star.mp3" "/music/covers/escape-plan.jpg" %}

---

## 🌐 网易云音乐歌单

### 使用 MetingJS 嵌入在线歌单

你可以直接嵌入网易云音乐的公开歌单：

{% meting "playlist" "netease" "705123491" "theme:#ad7a86" %}

> **提示**：将 `705123491` 替换为你自己的歌单 ID

---

### 如何获取歌单 ID

1. 打开[网易云音乐网页版](https://music.163.com/)
2. 进入你的歌单页面
3. 查看浏览器地址栏的 URL
4. URL 中的数字即为歌单 ID

例如：
```
https://music.163.com/#/playlist?id=705123491
                                    ^^^^^^^^^^
                                    这就是歌单 ID
```

---

## 💿 单曲播放示例

### 方式一：本地音频文件

````
{% aplayer "歌曲名" "歌手名" "音频文件路径" "封面图片路径" %}
```

示例：
```
{% aplayer "晴天" "周杰伦" "/music/audio/qingtian.mp3" "/music/covers/jay.jpg" %}
```

### 方式二：带歌词

```
{% aplayer "歌曲名" "歌手名" "音频路径" "封面路径" "lrc:歌词文件路径" %}
```

示例：
```
{% aplayer "晴天" "周杰伦" "/music/audio/qingtian.mp3" "/music/covers/jay.jpg" "lrc:/music/lrc/qingtian.lrc" %}
```

### 方式三：网易云音乐外链

```
{% meting "song" "netease" "歌曲ID" "theme:#ad7a86" %}
```

示例：
```
{% meting "song" "netease" "186016" "theme:#ad7a86" %}
```

---

## 📁 文件组织建议

推荐的目录结构：

```
source/music/
├── index.md              # 当前文件
├── audio/                # 音频文件
│   ├── jay-chou/
│   │   ├── qingtian.mp3
│   │   └── qinghuaci.mp3
│   ├── pop/
│   │   ├── song1.mp3
│   │   └── song2.mp3
│   └── classical/
│       └── beethoven.mp3
├── covers/               # 封面图片
│   ├── jay-chou.jpg
│   ├── pushu.jpg
│   └── escape-plan.jpg
└── lrc/                  # 歌词文件（可选）
    ├── qingtian.lrc
    └── pingfan.lrc
```

---

## 💡 小贴士

### 音频优化

- ✅ 格式：MP3（兼容性最好）
- ✅ 比特率：128-320kbps
- ✅ 单首大小：< 10MB
- ✅ 添加 ID3 标签（标题、艺术家、专辑）

### 推荐工具

- **音频转换**：[Audacity](https://www.audacityteam.org/)、FFmpeg
- **标签编辑**：[Mp3tag](https://www.mp3tag.de/)
- **在线转换**：[Online Audio Converter](https://online-audio-converter.com/)

### 版权提醒

⚠️ 请注意版权问题，上传的音乐仅用于个人欣赏，不要用于商业用途或公开传播受版权保护的内容。

---

*更多详细配置请参考：[图库和音乐页面配置指南](/2026/04/30/GALLERY_MUSIC_GUIDE/)*