@echo off
title Hexo Blog Deploy Tool

echo.
echo ========================================
echo   Hexo Blog Deploy Tool
echo ========================================
echo.
echo Starting deployment process...
echo.

:: Step 1: Clean cache
echo [1/3] Cleaning cache...
hexo clean
if errorlevel 1 (
    echo.
    echo ERROR: Clean failed! Please check the error message above.
    pause
    exit /b 1
)
echo SUCCESS: Cache cleaned
echo.

:: Step 2: Generate static files
echo [2/3] Generating static files...
hexo generate
if errorlevel 1 (
    echo.
    echo ERROR: Generate failed! Please check the error message above.
    pause
    exit /b 1
)
echo SUCCESS: Files generated
echo.

:: Step 3: Deploy to server
echo [3/3] Deploying to server...
echo Note: You may need to enter server password for first deployment
echo.
hexo deploy
if errorlevel 1 (
    echo.
    echo ERROR: Deploy failed! Please check network connection and server config.
    pause
    exit /b 1
)
echo SUCCESS: Deployment completed
echo.

echo ========================================
echo   Deployment Successful!
echo ========================================
echo.
echo Website updated on server: 8.141.86.241
echo.
pause