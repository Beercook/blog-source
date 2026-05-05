/**
 * 相册页面交互脚本 - Gallery Page Scripts
 */

// 从YAML数据加载照片（需要手动维护JSON格式）
const galleryData = {
  photos: [
    {
      title: "毒液",
      image: "/gallery/photos/duye.jpg",
      category: "wallpaper"
    },
    {
      title: "粉色",
      image: "/gallery/photos/fense.jpeg",
      category: "wallpaper"
    },
    {
      title: "势太史慈",
      image: "/gallery/photos/shitaishici.jpg",
      category: "wallpaper"
    },
    {
      title: "势魏延",
      image: "/gallery/photos/shiweiyan.jpg",
      category: "wallpaper"
    }
  ]
};

// 渲染照片网格
function renderPhotos() {
  const grid = document.getElementById('photoGrid');
  if (!grid) return;
  
  let html = '';
  
  galleryData.photos.forEach(photo => {
    const tagClass = `tag-${photo.category}`;
    const tagName = getCategoryName(photo.category);
    
    html += `
<div class="photo-item" data-category="${photo.category}">
  <a href="${photo.image}" target="_blank">
    <img src="${photo.image}" alt="${photo.title}">
  </a>
  <div class="photo-info">
    <div class="photo-title">${photo.title}</div>
    <span class="photo-tag ${tagClass}">${tagName}</span>
  </div>
</div>`;
  });
  
  grid.innerHTML = html;
  
  // 更新统计信息
  updateStats();
}

// 获取分类名称
function getCategoryName(category) {
  const names = {
    'wallpaper': '壁纸',
    'life': '生活',
    'photography': '摄影'
  };
  return names[category] || category;
}

// 更新统计信息
function updateStats() {
  const totalEl = document.getElementById('totalPhotos');
  if (totalEl) {
    totalEl.textContent = galleryData.photos.length;
  }
}

// 照片筛选功能
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

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  renderPhotos();
});
