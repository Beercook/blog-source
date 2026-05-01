# Hexo 博客部署脚本
# 使用方法: .\deploy.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Hexo 博客部署脚本" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 第一步：清理缓存
Write-Host "[1/4] 清理缓存..." -ForegroundColor Yellow
hexo clean
if ($LASTEXITCODE -ne 0) {
    Write-Host "错误: hexo clean 失败!" -ForegroundColor Red
    exit 1
}
Write-Host "✓ 清理完成" -ForegroundColor Green
Write-Host ""

# 第二步：生成静态文件
Write-Host "[2/4] 生成静态文件..." -ForegroundColor Yellow
hexo generate
if ($LASTEXITCODE -ne 0) {
    Write-Host "错误: hexo generate 失败!" -ForegroundColor Red
    exit 1
}
Write-Host "✓ 生成完成" -ForegroundColor Green
Write-Host ""

# 第三步：部署到服务器
Write-Host "[3/4] 部署到服务器..." -ForegroundColor Yellow
Write-Host "提示: 首次部署可能需要输入服务器密码" -ForegroundColor Cyan
hexo deploy
if ($LASTEXITCODE -ne 0) {
    Write-Host "错误: hexo deploy 失败!" -ForegroundColor Red
    exit 1
}
Write-Host "✓ 部署完成" -ForegroundColor Green
Write-Host ""

# 第四步：启动本地服务器（可选）
Write-Host "[4/4] 是否启动本地服务器预览？(Y/N)" -ForegroundColor Yellow
$answer = Read-Host
if ($answer -eq "Y" -or $answer -eq "y") {
    Write-Host "启动本地服务器 (端口 80)..." -ForegroundColor Cyan
    hexo server -p 80
} else {
    Write-Host "跳过本地服务器启动" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  部署完成！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green