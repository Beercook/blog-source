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
    <div class="stat-number">4</div>
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

<div class="photo-item" data-category="wallpaper">
  <a href="/gallery/photos/duye.jpg" target="_blank">
    <img src="/gallery/photos/duye.jpg" alt="毒液">
  </a>
  <div class="photo-info">
    <div class="photo-title">毒液</div>
    <span class="photo-tag tag-wallpaper">壁纸</span>
  </div>
</div>

<div class="photo-item" data-category="wallpaper">
  <a href="/gallery/photos/fense.jpeg" target="_blank">
    <img src="/gallery/photos/fense.jpeg" alt="粉色">
  </a>
  <div class="photo-info">
    <div class="photo-title">粉色</div>
    <span class="photo-tag tag-wallpaper">壁纸</span>
  </div>
</div>

<div class="photo-item" data-category="wallpaper">
  <a href="/gallery/photos/shitaishici.jpg" target="_blank">
    <img src="/gallery/photos/shitaishici.jpg" alt="势太史慈">
  </a>
  <div class="photo-info">
    <div class="photo-title">势太史慈</div>
    <span class="photo-tag tag-wallpaper">壁纸</span>
  </div>
</div>

<div class="photo-item" data-category="wallpaper">
  <a href="/gallery/photos/shiweiyan.jpg" target="_blank">
    <img src="/gallery/photos/shiweiyan.jpg" alt="势魏延">
  </a>
  <div class="photo-info">
    <div class="photo-title">势魏延</div>
    <span class="photo-tag tag-wallpaper">壁纸</span>
  </div>
</div>

</div>

---

<style>
/* 相册统计样式 */
.gallery-stats {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin: 30px 0;
  flex-wrap: wrap;
}

.stat-item {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px 30px;
  border-radius: 12px;
  text-align: center;
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  min-width: 120px;
}

.stat-number {
  font-size: 2.5em;
  font-weight: bold;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 0.9em;
  opacity: 0.9;
}

/* 筛选标签样式 */
.filter-tabs {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin: 30px 0;
  flex-wrap: wrap;
}

.filter-tab {
  padding: 10px 25px;
  background: white;
  border: 2px solid #667eea;
  color: #667eea;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 1em;
}

.filter-tab:hover {
  background: #667eea;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.filter-tab.active {
  background: #667eea;
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

/* 照片网格样式 */
.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
  padding: 20px 0;
}

.photo-item {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.photo-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.photo-item a {
  display: block;
  overflow: hidden;
}

.photo-item img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.photo-item:hover img {
  transform: scale(1.05);
}

.photo-info {
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.photo-title {
  font-size: 1.1em;
  color: #2c3e50;
  font-weight: 600;
}

.photo-tag {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.8em;
  font-weight: 500;
}

.tag-wallpaper {
  background: #ffeaa7;
  color: #d63031;
}

.tag-life {
  background: #74b9ff;
  color: #0984e3;
}

.tag-photography {
  background: #a29bfe;
  color: #6c5ce7;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .photo-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
  
  .gallery-stats {
    gap: 15px;
  }
  
  .stat-item {
    padding: 15px 20px;
    min-width: 100px;
  }
  
  .stat-number {
    font-size: 2em;
  }
  
  .filter-tabs {
    gap: 10px;
  }
  
  .filter-tab {
    padding: 8px 20px;
    font-size: 0.9em;
  }
}

@media (max-width: 480px) {
  .photo-grid {
    grid-template-columns: 1fr;
  }
}
</style>

<script>
function filterPhotos(category) {
  const items = document.querySelectorAll('.photo-item');
  const tabs = document.querySelectorAll('.filter-tab');
  
  // 更新标签状态
  tabs.forEach(tab => tab.classList.remove('active'));
  event.target.classList.add('active');
  
  // 筛选照片
  items.forEach((item, index) => {
    if (category === 'all' || item.dataset.category === category) {
      item.style.display = 'block';
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
      }, index * 50);
    } else {
      item.style.opacity = '0';
      item.style.transform = 'scale(0.8)';
      setTimeout(() => {
        item.style.display = 'none';
      }, 300);
    }
  });
}
</script>
