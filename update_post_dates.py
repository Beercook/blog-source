#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
批量修改Hexo博客文章发布日期
从2025年9月22日开始，每周发布一篇文章
"""

import os
import re
from datetime import datetime, timedelta

# 配置
POSTS_DIR = r"e:\jdyblog\jdyblog\source\_posts"
START_DATE = datetime(2025, 9, 22, 12, 0, 0)

def update_post_dates():
    # 获取所有.md文件并排序
    files = sorted([f for f in os.listdir(POSTS_DIR) if f.endswith('.md')])
    
    print(f"找到 {len(files)} 篇文章\n")
    
    for i, filename in enumerate(files):
        filepath = os.path.join(POSTS_DIR, filename)
        
        # 计算发布日期（每周递增7天）
        publish_date = START_DATE + timedelta(days=i * 7)
        
        # 设置不同的发布时间段
        hour = 10 + (i % 6)  # 10点到15点之间循环
        minute = (i * 13) % 60  # 使用不同的分钟数
        
        new_date = publish_date.replace(hour=hour, minute=minute)
        date_str = new_date.strftime("%Y-%m-%d %H:%M:%S")
        
        print(f"处理: {filename}")
        print(f"  新日期: {date_str}")
        
        # 读取文件
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 替换date行
        pattern = r'^date:.*$'
        replacement = f'date: {date_str}'
        new_content = re.sub(pattern, replacement, content, count=1, flags=re.MULTILINE)
        
        # 写回文件
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"  ✓ 完成\n")
    
    print("所有文章日期修改完成！")
    print("\n提示：请运行 'hexo clean && hexo generate' 重新生成静态页面")

if __name__ == "__main__":
    update_post_dates()
