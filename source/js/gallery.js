/**
 * 相册页面交互脚本 - Gallery Page Scripts
 */

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

// 自动统计照片数量
function updateGalleryStats() {
  const photoItems = document.querySelectorAll('.photo-item');
  const categories = new Set();
  
  photoItems.forEach(item => {
    categories.add(item.dataset.category);
  });
  
  // 更新总照片数
  const totalNumberEl = document.querySelector('.stat-number');
  if (totalNumberEl && totalNumberEl.textContent === '4') {
    totalNumberEl.textContent = photoItems.length;
  }
  
  // 更新分类数量
  const categoryLabels = document.querySelectorAll('.stat-label');
  categoryLabels.forEach(label => {
    if (label.textContent === '分类数量') {
      const numberEl = label.previousElementSibling;
      if (numberEl) {
        numberEl.textContent = categories.size;
      }
    }
  });
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  updateGalleryStats();
});
