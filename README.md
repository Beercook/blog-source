# Hexo 博客项目

> 基于 Hexo 7.3.0 + Butterfly 5.5.4 主题的个人博客

## 📋 项目说明

这是一个完整的Hexo博客项目，包含所有源文件和配置。

### 项目结构

```
jdyblog/
├── source/              # 博客源文件（Markdown等）
│   ├── _posts/         # 文章目录
│   ├── gallery/        # 相册页面
│   ├── music/          # 音乐页面
│   ├── img/            # 图片资源
│   └── css/            # 自定义CSS
├── themes/             # 主题文件
├── _config.yml         # Hexo主配置文件
├── _config.butterfly.yml  # Butterfly主题配置
├── package.json        # 项目依赖
└── .gitignore          # Git忽略规则
```

---

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/jdy/blog-source.git
cd blog-source
```

### 2. 安装依赖

```bash
npm install
```

### 3. 本地预览

```bash
hexo clean
hexo generate
hexo server
```

访问 http://localhost:4000

### 4. 部署到服务器

```bash
hexo deploy
```

或使用npm脚本：

```bash
npm run clean
npm run build
npm run deploy
```

---

## 📝 工作流程

### 日常写作

1. **创建新文章**
   ```bash
   hexo new "文章标题"
   ```

2. **编辑文章**
   - 在 `source/_posts/` 目录下编辑Markdown文件

3. **提交到Git**
   ```bash
   git add .
   git commit -m "feat: 添加新文章《文章标题》"
   ```

4. **生成并部署**
   ```bash
   npm run build
   npm run deploy
   ```

### 版本控制最佳实践

- ✅ **每次修改后立即提交**：保护源文件安全
- ✅ **使用语义化commit消息**：
  - `feat:` 新功能
  - `fix:` 修复问题
  - `docs:` 文档更新
  - `style:` 样式调整
  - `refactor:` 代码重构
- ✅ **定期推送到远程仓库**：多重备份

---

## 🔧 常用命令

### Hexo命令

```bash
hexo clean          # 清理缓存
hexo generate       # 生成静态文件
hexo server         # 本地服务器
hexo deploy         # 部署到服务器
hexo new "标题"     # 创建新文章
```

### npm脚本

```bash
npm run clean       # 清理缓存
npm run build       # 生成静态文件
npm run server      # 本地服务器
npm run deploy      # 部署到服务器
```

### Git命令

```bash
git status          # 查看状态
git add .           # 添加所有文件
git commit -m "消息" # 提交更改
git push            # 推送到远程
git log --oneline   # 查看历史
```

---

## 📦 技术栈

- **博客框架**: Hexo 7.3.0
- **主题**: Butterfly 5.5.4
- **渲染器**: 
  - hexo-renderer-marked (Markdown)
  - hexo-renderer-ejs (模板)
  - hexo-renderer-stylus (样式)
- **插件**:
  - hexo-deployer-git (Git部署)
  - hexo-tag-aplayer (音乐播放器)
  - hexo-helper-live2d (Live2D看板娘)

---

## 🌐 部署说明

### 本地部署

项目使用Git部署到远程服务器：

- **服务器地址**: 8.141.86.241
- **部署路径**: /root/blog/jdyblog/public
- **Git仓库**: root@8.141.86.241:/root/hexo.git

### GitHub备份

源文件备份到GitHub：

- **仓库地址**: https://github.com/jdy/blog-source
- **分支**: master
- **内容**: 所有源文件和配置（不含生成的HTML）

---

## ⚠️ 注意事项

### 重要提醒

1. **不要删除 `.git` 目录**
   - 这是项目的版本控制核心
   - 包含所有历史记录和配置

2. **不要手动修改 `public/` 目录**
   - 该目录由 `hexo generate` 自动生成
   - 已被 `.gitignore` 排除

3. **定期备份**
   - 已配置Git版本控制
   - 建议同时保留本地备份

4. **迁移时完整复制**
   - 必须包含 `source/` 目录
   - 必须包含 `_config.yml` 等配置文件
   - 不能只复制 `.deploy_git`

---

## 📚 相关文档

项目中包含以下详细文档：

1. **[Hexo博客数据迁移问题总结与最佳实践](source/_posts/Hexo博客数据迁移问题总结与最佳实践.md)**
   - 迁移常见问题
   - 解决方案和预防措施
   - 实用脚本和检查清单

2. **[Hexo博客迁移与版本恢复完整指南](source/_posts/Hexo博客迁移与版本恢复完整指南.md)**
   - 版本恢复操作步骤
   - 故障排查方法
   - 应急处理流程

3. **[Butterfly主题一图流完整配置指南](source/_posts/Butterfly主题一图流完整配置指南（含移动端适配）.md)**
   - 主题配置详解
   - 移动端适配方案

4. **[技术文档管理指南](source/_posts/技术文档管理指南.md)**
   - 文档分类规范
   - 命名约定

---

## 👤 作者

- **用户名**: jdy
- **邮箱**: 1811552860@qq.com

---

## 📄 许可证

MIT License

---

## 🔗 相关链接

- [Hexo官方文档](https://hexo.io/zh-cn/docs/)
- [Butterfly主题文档](https://butterfly.js.org/)
- [GitHub仓库](https://github.com/jdy/blog-source)

---

**最后更新**: 2026-05-01
