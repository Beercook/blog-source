---
title: Hexo博客开发与部署完整工作流指南
date: 2026-05-01 17:45:00
categories:
  - 技术文档
  - 网站文档
tags:
  - Hexo
  - 工作流
  - Git
  - 最佳实践
  - 开发规范
top_img: /img/top-banner.jpg
---

# Hexo博客开发与部署完整工作流指南

> **本文档总结了Hexo博客从开发到部署的完整工作流程，包含所有关键操作步骤和注意事项。**
> 
> **创建时间**: 2026-05-01  
> **适用对象**: Hexo博客开发者、内容创作者  
> **难度等级**: 入门级

---

## 📋 目录

- [背景说明](#背景说明)
- [环境配置](#环境配置)
- [日常开发工作流](#日常开发工作流)
- [版本控制规范](#版本控制规范)
- [部署流程](#部署流程)
- [常见问题处理](#常见问题处理)
- [应急恢复方案](#应急恢复方案)
- [检查清单](#检查清单)
- [附录：常用命令速查](#附录常用命令速查)

---

## 背景说明

### 项目信息

- **博客框架**: Hexo 7.3.0
- **主题**: Butterfly 5.5.4
- **操作系统**: Windows 25H2
- **Node.js**: 16.20.2
- **Git**: 已配置

### 仓库结构

```
jdyblog/
├── .git/                    # ✅ 本地Git仓库（源文件版本控制）
├── .deploy_git/             # ✅ 部署用Git仓库（HTML文件）
├── source/                  # ✅ 博客源文件（需要备份）
│   ├── _posts/             # 文章目录
│   ├── gallery/            # 相册页面
│   ├── music/              # 音乐页面
│   ├── img/                # 图片资源
│   └── css/                # 自定义CSS
├── themes/                  # ✅ 主题文件（需要备份）
├── public/                  # ❌ 生成的静态文件（自动生成，无需备份）
├── node_modules/            # ❌ 依赖包（可通过npm install重建）
├── _config.yml              # ✅ Hexo主配置（需要备份）
├── _config.butterfly.yml    # ✅ 主题配置（需要备份）
├── package.json             # ✅ 项目依赖（需要备份）
└── .gitignore               # ✅ Git忽略规则
```

### 远程仓库

| 仓库类型 | 地址 | 用途 |
|---------|------|------|
| **GitHub** | https://github.com/Beercook/blog-source | 源文件备份、版本控制 |
| **服务器** | 8.141.86.241:/root/hexo.git | 部署生成的HTML文件 |

---

## 环境配置

### 1. 确认Hexo可用

```powershell
# 检查Hexo版本
hexo version

# 应该显示：
# hexo: 7.3.0
# hexo-cli: 4.3.2
```

### 2. 确认Git已配置

```powershell
# 检查Git用户信息
git config user.name
git config user.email

# 如果未配置，执行：
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
```

### 3. 确认两个Git仓库

```powershell
# 检查项目根目录Git仓库
cd e:\jdyblog\jdyblog
git status

# 检查部署仓库
cd e:\jdyblog\jdyblog\.deploy_git
git status
```

---

## 日常开发工作流

### 🎯 核心原则

> **每次修改后立即提交到Git，定期推送到GitHub，最后部署到服务器。**

---

### 场景1：创建新文章

#### 步骤1：创建文章

```powershell
# 方法1：使用Hexo命令
hexo new "文章标题"

# 方法2：手动创建
# 在 source/_posts/ 目录下创建 .md 文件
```

#### 步骤2：编辑文章

使用你喜欢的编辑器（VS Code、Typora等）编辑文章：

```markdown
---
title: 文章标题
date: 2026-05-01 18:00:00
categories:
  - 技术文档
tags:
  - Hexo
top_img: /img/top-banner.jpg
---

# 文章内容

这里是正文...
```

#### 步骤3：保存到Git

```powershell
# 查看状态
git status

# 添加更改
git add .

# 提交更改（使用语义化消息）
git commit -m "feat: 添加新文章《文章标题》"

# 推送到GitHub
git push
```

#### 步骤4：预览效果

```powershell
# 清理缓存
hexo clean

# 生成静态文件
hexo generate

# 启动本地服务器
hexo server

# 访问 http://localhost:4000 预览
```

#### 步骤5：部署到服务器

```powershell
# 停止本地服务器（Ctrl+C）

# 部署到服务器
hexo deploy

# 或使用npm脚本
npm run deploy
```

---

### 场景2：修改现有文章

#### 步骤1：编辑文章

直接打开 `source/_posts/xxx.md` 进行修改。

#### 步骤2：保存并提交

```powershell
git add .
git commit -m "fix: 修正《文章标题》的错别字"
git push
```

#### 步骤3：重新生成并部署

```powershell
hexo clean
hexo generate
hexo deploy
```

---

### 场景3：修改配置文件

#### 步骤1：编辑配置

修改 `_config.yml` 或 `_config.butterfly.yml`。

#### 步骤2：保存并提交

```powershell
git add .
git commit -m "refactor: 优化主题配置"
git push
```

#### 步骤3：重新生成并部署

```powershell
hexo clean
hexo generate
hexo deploy
```

---

### 场景4：添加新功能（如新页面）

#### 步骤1：创建页面

```powershell
# 创建新页面
hexo new page "about"

# 或在 source/ 下创建目录和 index.md
mkdir source/about
echo "---
title: 关于我
---" > source/about/index.md
```

#### 步骤2：编辑页面内容

#### 步骤3：保存并提交

```powershell
git add .
git commit -m "feat: 添加关于我页面"
git push
```

#### 步骤4：重新生成并部署

```powershell
hexo clean
hexo generate
hexo deploy
```

---

## 版本控制规范

### Commit消息规范

使用**语义化commit消息**，格式：`类型: 描述`

| 类型 | 说明 | 示例 |
|------|------|------|
| `feat` | 新功能 | `feat: 添加音乐播放器` |
| `fix` | 修复bug | `fix: 修复图片加载问题` |
| `docs` | 文档更新 | `docs: 更新README` |
| `style` | 样式调整 | `style: 优化CSS样式` |
| `refactor` | 代码重构 | `refactor: 重构配置文件` |
| `perf` | 性能优化 | `perf: 优化图片加载速度` |
| `test` | 测试相关 | `test: 添加单元测试` |
| `chore` | 其他更改 | `chore: 更新依赖版本` |

### 提交频率

- ✅ **每次有意义的修改都提交**
- ✅ **完成一个功能点后提交**
- ✅ **每天至少提交一次**
- ❌ **不要累积太多更改再提交**

### 推送频率

- ✅ **每次提交后立即推送**
- ✅ **离开电脑前确保已推送**
- ❌ **不要只在本地保存**

---

## 部署流程

### 标准部署流程

```powershell
# 1. 确保所有更改已提交
git status
git add .
git commit -m "准备部署"
git push

# 2. 清理缓存
hexo clean

# 3. 生成静态文件
hexo generate

# 4. 部署到服务器
hexo deploy

# 5. 验证部署成功
# 访问网站检查内容是否正常
```

### 一键部署脚本

创建 `deploy.ps1`：

```powershell
# deploy.ps1
Write-Host "=== 开始部署 ===" -ForegroundColor Cyan

# 1. 提交到Git
Write-Host "1. 提交到Git..." -ForegroundColor Yellow
git add .
git commit -m "deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
git push

# 2. 清理和生成
Write-Host "2. 清理和生成..." -ForegroundColor Yellow
hexo clean
hexo generate

# 3. 部署
Write-Host "3. 部署到服务器..." -ForegroundColor Yellow
hexo deploy

Write-Host "✅ 部署完成！" -ForegroundColor Green
```

使用方法：

```powershell
.\deploy.ps1
```

---

## 常见问题处理

### 问题1：Hexo命令找不到

**现象**：
```
hexo : 无法将"hexo"项识别为 cmdlet、函数、脚本文件或可运行程序的名称
```

**解决**：
```powershell
# 方法1：使用npm run
npm run clean
npm run build
npm run deploy

# 方法2：检查PATH
# 确保 Node.js 和 npm 已正确安装
node -v
npm -v
```

---

### 问题2：部署失败

**现象**：
```
ERROR Deployer not found: git
```

**解决**：
```powershell
# 安装Git部署插件
npm install hexo-deployer-git --save

# 检查 _config.yml 中的deploy配置
# deploy:
#   type: git
#   repo: root@8.141.86.241:/root/hexo.git
#   branch: master
```

---

### 问题3：Git推送失败

**现象**：
```
fatal: unable to access 'https://github.com/xxx/xxx.git': ...
```

**解决**：
```powershell
# 方法1：使用浏览器认证
git push
# 会提示在浏览器中完成认证

# 方法2：配置SSH密钥
ssh-keygen -t rsa -C "your_email@example.com"
# 将公钥添加到GitHub

# 方法3：使用Personal Access Token
# 在GitHub设置中生成Token
# 使用Token代替密码
```

---

### 问题4：本地预览正常，部署后异常

**原因**：
- 缓存问题
- 路径问题
- 生成不完整

**解决**：
```powershell
# 1. 彻底清理
hexo clean

# 2. 重新生成
hexo generate

# 3. 检查public目录
ls public/

# 4. 重新部署
hexo deploy

# 5. 强制刷新浏览器
# Ctrl + F5
```

---

### 问题5：图片不显示

**检查清单**：
- [ ] 图片路径是否正确
- [ ] 图片是否在source目录下
- [ ] 是否使用了相对路径
- [ ] 图片文件名是否有特殊字符

**正确做法**：
```markdown
# ✅ 推荐：放在 source/img/ 下
![图片](/img/photo.jpg)

# ✅ 也可以：放在文章同名文件夹下
![图片](./photo.jpg)

# ❌ 避免：使用绝对路径
![图片](C:/Users/xxx/photo.jpg)
```

---

## 应急恢复方案

### 场景1：误删了重要文件

```powershell
# 1. 查看Git历史
git log --oneline

# 2. 恢复到之前的版本
git checkout [commit-id] -- 文件路径

# 3. 或者恢复整个目录
git checkout [commit-id] -- source/_posts/

# 4. 重新生成和部署
hexo clean
hexo generate
hexo deploy
```

---

### 场景2：本地项目损坏

```powershell
# 1. 从GitHub克隆
git clone https://github.com/Beercook/blog-source.git
cd blog-source

# 2. 安装依赖
npm install

# 3. 验证
hexo generate
hexo server

# 4. 继续工作
```

---

### 场景3：服务器内容异常

```powershell
# 1. 检查.deploy_git的历史
cd .deploy_git
git log --oneline

# 2. 恢复到正确的版本
git checkout [correct-commit-id] -- .

# 3. 同步到public
cd ..
Remove-Item -Path public\* -Recurse -Force
Copy-Item -Path .deploy_git\* -Destination public\ -Recurse -Force

# 4. 重新部署
hexo deploy
```

---

## 检查清单

### 📝 每日工作结束前检查

```
□ 所有更改已提交到Git
  □ git status 显示干净
  □ git log 有最新提交

□ 已推送到GitHub
  □ 访问GitHub确认最新提交
  □ 确认文件都已上传

□ 已部署到服务器（如有更改）
  □ hexo deploy 执行成功
  □ 访问网站确认正常

□ 备份重要数据
  □ 确认GitHub仓库是最新的
  □ 必要时进行额外备份
```

---

### 📝 发布新文章前检查

```
□ 文章内容已校对
  □ 无错别字
  □ 格式正确
  □ 图片正常显示

□ Front-matter配置正确
  □ title 已填写
  □ date 正确
  □ categories 合适
  □ tags 准确

□ 已提交到Git
  □ git add .
  □ git commit -m "feat: ..."
  □ git push

□ 已本地预览
  □ hexo server 运行正常
  □ 浏览器中检查效果

□ 已部署到服务器
  □ hexo deploy 执行成功
  □ 网站已更新
```

---

### 📝 迁移或重装系统前检查

```
□ 确认GitHub仓库是最新的
  □ git push 执行成功
  □ 访问GitHub确认

□ 记录关键配置
  □ _config.yml 已提交
  □ _config.butterfly.yml 已提交
  □ package.json 已提交

□ 备份额外文件
  □ source/ 下的所有文件
  □ themes/ 下的自定义修改
  □ 其他重要文件

□ 记录操作文档
  □ 阅读本指南
  □ 了解恢复流程
```

---

## 附录：常用命令速查

### Hexo命令

```powershell
# 基础命令
hexo clean              # 清理缓存
hexo generate           # 生成静态文件（可简写为 hexo g）
hexo server             # 启动本地服务器（可简写为 hexo s）
hexo deploy             # 部署到服务器（可简写为 hexo d）

# 组合命令
hexo clean && hexo g && hexo s    # 清理、生成、启动
hexo g && hexo d                  # 生成并部署

# 创建内容
hexo new "文章标题"     # 创建新文章
hexo new page "页面名"  # 创建新页面
hexo new draft "草稿名" # 创建草稿
```

---

### npm脚本

```powershell
npm run clean           # 清理缓存
npm run build           # 生成静态文件
npm run server          # 启动本地服务器
npm run deploy          # 部署到服务器
```

---

### Git命令

```powershell
# 查看状态
git status              # 查看当前状态
git log --oneline       # 查看提交历史
git diff                # 查看更改

# 提交更改
git add .               # 添加所有更改
git add 文件路径         # 添加指定文件
git commit -m "消息"    # 提交更改
git push                # 推送到远程

# 版本控制
git checkout [id] -- 文件  # 恢复文件到指定版本
git reset --hard [id]      # 重置到指定版本（谨慎使用）
git tag "标签名"           # 打标签

# 远程仓库
git remote -v           # 查看远程仓库
git pull                # 拉取远程更改
git fetch               # 获取远程信息
```

---

### PowerShell快捷命令

```powershell
# 快速部署
hexo clean; hexo g; hexo d

# 快速预览
hexo clean; hexo g; hexo s

# 查看文件数量
Get-ChildItem source\_posts -Recurse -Filter *.md | Measure-Object

# 列出所有文章
Get-ChildItem source\_posts -Recurse -Filter *.md | Select-Object Name
```

---

## 完整工作流程图

```
┌─────────────────────────────────────────────────┐
│              开始创作                            │
└──────────────┬──────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────┐
│         编辑文章/配置/页面                        │
│         (source/ 目录下)                         │
└──────────────┬──────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────┐
│         保存到Git                                │
│         git add .                                │
│         git commit -m "消息"                     │
│         git push                                 │
└──────────────┬──────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────┐
│         本地预览（可选）                          │
│         hexo clean                               │
│         hexo generate                            │
│         hexo server                              │
│         访问 http://localhost:4000               │
└──────────────┬──────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────┐
│         部署到服务器                              │
│         hexo clean                               │
│         hexo generate                            │
│         hexo deploy                              │
└──────────────┬──────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────┐
│         验证部署                                  │
│         访问网站检查内容                          │
│         Ctrl+F5 强制刷新                         │
└──────────────┬──────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────┐
│         完成 ✅                                   │
└─────────────────────────────────────────────────┘
```

---

## 关键要点总结

### ⭐ 最重要的5条规则

1. **每次修改后立即提交Git**
   - 保护你的劳动成果
   - 可以随时回滚
   - 避免数据丢失

2. **每次提交后立即推送到GitHub**
   - 多重备份
   - 防止本地损坏
   - 方便迁移

3. **部署前确保Git是干净的**
   - `git status` 应该显示干净
   - 所有更改都已提交和推送

4. **使用语义化的Commit消息**
   - 便于追溯
   - 便于协作
   - 便于管理

5. **定期验证备份**
   - 每周检查GitHub仓库
   - 确认文件都是最新的
   - 测试恢复流程

---

### ⚠️ 常见错误及避免方法

| 错误 | 后果 | 避免方法 |
|------|------|----------|
| 只部署不提交Git | 源文件丢失无法恢复 | 先git push，再hexo deploy |
| 累积大量更改再提交 | 难以追溯问题 | 每次修改立即提交 |
| 不在GitHub备份 | 本地损坏全部丢失 | 每次提交后立即push |
| 忽略.gitignore | 上传不必要文件 | 正确使用.gitignore |
| 不验证部署结果 | 网站异常不知道 | 部署后立即访问检查 |

---

## 相关文档

本项目的其他重要文档：

1. **[Hexo博客数据迁移问题总结与最佳实践](/2026/05/01/Hexo博客数据迁移问题总结与最佳实践/)**
   - 迁移常见问题
   - 解决方案和预防措施
   - 实用脚本和检查清单

2. **[Hexo博客迁移与版本恢复完整指南](/2026/05/01/Hexo博客迁移与版本恢复完整指南/)**
   - 版本恢复操作步骤
   - 故障排查方法
   - 应急处理流程

3. **[Butterfly主题一图流完整配置指南](/2026/05/01/Butterfly主题一图流完整配置指南（含移动端适配）/)**
   - 主题配置详解
   - 移动端适配方案

---

## 结语

遵循本指南的工作流程，你可以：

✅ **安全地创作内容** - Git版本控制保护你的每一篇文章  
✅ **轻松地迁移项目** - GitHub备份让你随时可以重新开始  
✅ **高效地部署更新** - 标准化的流程减少出错可能  
✅ **快速地解决问题** - 清晰的文档帮助你快速定位和修复  

**记住**：好的习惯胜过一切工具。养成规范的workflow，让你的博客创作之路更加顺畅！

---

**文档版本**: v1.0  
**最后更新**: 2026-05-01  
**作者**: jdy  
**联系方式**: 1811552860@qq.com

---

> 💡 **提示**: 建议将此文档加入书签，每次写作前快速浏览一遍，养成良好的工作习惯！
