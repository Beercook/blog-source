---
title: 我的音乐
date: 2026-04-30 17:00:00
type: "music"
comments: false
top_img: /img/top-banner.jpg
---

<link rel="stylesheet" href="/assets/css/APlayer.min.css">

# 🎵 我的私人曲库

这里收藏了我喜爱的音乐作品。

---

## 🎼 推荐歌曲

### 金斧子银斧子 - 薛之谦

<div class="aplayer" data-id="jinfuzi" data-server="local" data-type="song" data-url="/music/audio/jinfuzi.mp3" data-name="金斧子银斧子" data-artist="薛之谦" data-cover="/music/covers/jinfuzi.jpg" data-lrc="/music/lrc/jinfuzi.lrc"></div>

---

### 于是 - 邓紫棋

<div class="aplayer" data-id="yushi" data-server="local" data-type="song" data-url="/music/audio/于是.mp3" data-name="于是" data-artist="邓紫棋" data-cover="/music/covers/a968a81f0c390bc6bb2a0ce00b79612c.jpg" data-lrc="/music/lrc/于是-G.E.M.邓紫棋_www.2t58.com.lrc"></div>

<script src="/assets/js/APlayer.min.js"></script>
<script src="/assets/js/Meting.min.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
  var aplayers = document.querySelectorAll('.aplayer');
  aplayers.forEach(function(element) {
    new APlayer({
      container: element,
      audio: [{
        name: element.getAttribute('data-name'),
        artist: element.getAttribute('data-artist'),
        url: element.getAttribute('data-url'),
        cover: element.getAttribute('data-cover'),
        lrc: element.getAttribute('data-lrc')
      }]
    });
  });
});
</script>
