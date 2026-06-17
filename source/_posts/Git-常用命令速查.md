---
title: Git 常用命令速查
date: 2025-10-20 14:52:00
categories:
  - 技术文档
  - 网站文档
tags:
  - Git
  - 版本控制
  - 命令行
top_img: /img/top-banner.jpg
---

# Git 常用命令速查

## 📋 基础命令

### 初始化仓库
```bash
git init                    # 初始化本地仓库
git clone <url>            # 克隆远程仓库
```

### 查看状态
```bash
git status                 # 查看工作区状态
git log                    # 查看提交历史
git log --oneline         # 简洁显示提交历史
```

## 💾 提交更改

### 添加文件
```bash
git add <file>            # 添加指定文件
git add .                 # 添加所有更改的文件
git add -A                # 添加所有更改（包括删除）
```

### 提交
```bash
git commit -m "提交信息"   # 提交更改
git commit -am "提交信息"  # 添加并提交已跟踪的文件
```

## 🌿 分支管理

### 分支操作
```bash
git branch                # 查看所有分支
git branch <name>         # 创建新分支
git checkout <name>       # 切换分支
git checkout -b <name>    # 创建并切换到新分支
git merge <branch>        # 合并分支
git branch -d <name>      # 删除分支
```

## 🔄 远程操作

### 远程仓库
```bash
git remote -v             # 查看远程仓库
git remote add origin <url>  # 添加远程仓库
git push origin <branch>  # 推送到远程
git pull origin <branch>  # 从远程拉取
git fetch origin          # 获取远程更新
```

## 🔍 撤销操作

### 撤销更改
```bash
git checkout -- <file>    # 撤销工作区修改
git reset HEAD <file>     # 撤销暂存
git reset --hard HEAD     # 重置到最近一次提交
git revert <commit>       # 撤销某次提交
```

## 🏷️ 标签管理

```bash
git tag                   # 查看所有标签
git tag -a v1.0 -m "版本1.0"  # 创建标签
git push origin --tags    # 推送标签
```

## 💡 实用技巧

### 查看差异
```bash
git diff                  # 查看工作区差异
git diff --staged        # 查看暂存区差异
git diff <commit1> <commit2>  # 比较两次提交
```

###  stash（临时存储）
```bash
git stash                # 保存当前工作状态
git stash list           # 查看 stash 列表
git stash pop            # 恢复最近一次的 stash
git stash apply          # 应用 stash 但不删除
```

### 清理
```bash
git clean -n             # 预览要删除的未跟踪文件
git clean -f             # 删除未跟踪文件
```

---

**提示：** 建议定期执行 `git status` 了解当前状态，养成写清晰提交信息的习惯。
