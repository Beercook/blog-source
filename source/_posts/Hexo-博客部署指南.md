---
title: Hexo 博客部署指南
date: 2025-11-10 11:31:00
categories:
  - 技术文档
  - 网站文档
tags:
  - Hexo
  - 部署
  - Git
top_img: /img/top-banner.jpg
---

# Hexo 博客部署指南

## 📋 部署命令

### 方法一：使用部署脚本（推荐）

**PowerShell 脚本：**
```powershell
.\deploy.ps1
```

**批处理脚本：**
```batch
deploy.bat
```

### 方法二：手动执行命令

```bash
# 1. 清理缓存
hexo clean

# 2. 生成静态文件
hexo generate

# 3. 部署到服务器
hexo deploy
```

### 方法三：一键命令（简洁版）

```bash
hexo clean && hexo generate && hexo deploy
```

或使用简写：

```bash
hexo d -g
```

> 注意：`hexo d -g` 等同于 `hexo generate && hexo deploy`

---

## 🔄 完整工作流程

### 日常更新流程：

1. **创建新文章**
   ```bash
   hexo new "文章标题"
   ```

2. **编辑文章**
   - 在 `source/_posts/` 目录下找到对应的 Markdown 文件
   - 使用你喜欢的编辑器进行编辑

3. **预览效果**（可选）
   ```bash
   hexo server -p 80
   ```
   然后在浏览器中访问：http://localhost/

4. **部署到服务器**
   ```bash
   .\deploy.ps1
   # 或
   deploy.bat
   # 或
   hexo clean && hexo generate && hexo deploy
   ```

---

## ⚙️ 部署配置说明

当前部署配置在 `_config.yml` 文件中：

```yaml
deploy:
  type: git
  repo: root@8.141.86.241:/root/hexo.git
  branch: master
```

**配置项说明：**
- `type`: 部署类型（git）
- `repo`: Git 仓库地址（你的服务器地址）
- `branch`: 部署分支（master）

---

## 🔑 首次部署注意事项

1. **SSH 密钥配置**
   - 确保你的电脑已生成 SSH 密钥
   - 将公钥添加到服务器的 `~/.ssh/authorized_keys` 文件中

2. **首次部署可能需要输入密码**
   - 如果是第一次连接服务器，会提示输入密码
   - 建议配置 SSH 免密登录

3. **检查网络连接**
   - 确保能够连接到服务器 `8.141.86.241`

---

## 📝 常用命令速查

```bash
# 新建文章
hexo new "文章标题"

# 新建页面
hexo new page "页面名称"

# 清理缓存
hexo clean

# 生成静态文件
hexo generate
# 或简写
hexo g

# 启动本地服务器
hexo server
# 或简写
hexo s

# 指定端口启动
hexo server -p 80

# 部署到服务器
hexo deploy
# 或简写
hexo d

# 生成并部署（一步完成）
hexo deploy --generate
# 或简写
hexo d -g

# 清理、生成、部署（完整流程）
hexo clean && hexo generate && hexo deploy
```

---

## 🎨 更换首页图片

1. 准备图片（建议 1920x1080，JPG/PNG 格式）
2. 重命名为 `top-banner.jpg`
3. 复制到 `source/img/` 目录
4. 执行部署命令：
   ```bash
   .\deploy.ps1
   ```

---

## ❓ 常见问题

### Q1: 部署时提示权限错误？
**A:** 检查 SSH 密钥是否正确配置，或联系服务器管理员。

### Q2: 部署后网站没有更新？
**A:** 
1. 清除浏览器缓存（Ctrl+F5 强制刷新）
2. 检查服务器上的 Nginx/Apache 配置
3. 确认部署成功（查看命令行输出）

### Q3: 如何回滚到之前的版本？
**A:** 
```bash
# 在服务器上操作
cd /root/hexo.git
git log  # 查看历史提交
git reset --hard <commit-hash>  # 回滚到指定版本
```

### Q4: 部署速度慢怎么办？
**A:** 
1. 压缩图片大小（使用 TinyPNG 等工具）
2. 减少不必要的文件
3. 使用 CDN 加速

---

## 📞 技术支持

如有问题，请检查：
1. Hexo 版本：`hexo version`
2. 主题版本：查看 `node_modules/hexo-theme-butterfly/package.json`
3. 日志输出：部署时的命令行输出信息

---

**最后更新时间：** 2026-04-29
