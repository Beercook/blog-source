---
title: 我的相册
date: 2026-04-30 20:00:00
comments: false
top_img: /img/top-banner.jpg
---

# 📸 我的相册

这里展示我的生活照片和精彩瞬间。按主题分类，快速浏览你感兴趣的内容。

---

## 📊 相册统计

<div class="gallery-stats">
  <div class="stat-item">
    <div class="stat-number" id="totalPhotos">0</div>
    <div class="stat-label">总照片数</div>
  </div>
  <div class="stat-item">
    <div class="stat-number">3</div>
    <div class="stat-label">分类数量</div>
  </div>
</div>

---

## 🏷️ 分类筛选

<div class="filter-tabs">
  <button class="filter-tab active" onclick="filterPhotos('all')">全部</button>
  <button class="filter-tab" onclick="filterPhotos('wallpaper')">🖼️ 壁纸</button>
  <button class="filter-tab" onclick="filterPhotos('life')">📸 生活</button>
  <button class="filter-tab" onclick="filterPhotos('photography')">📷 摄影</button>
</div>

---

## 🖼️ 照片墙

<div class="photo-grid" id="photoGrid">

<!-- 照片将通过JavaScript从YAML数据动态生成 -->

</div>

<!-- 引入外部样式和脚本 -->
<link rel="stylesheet" href="/css/gallery.css">
<script src="/js/gallery.js"></script>
