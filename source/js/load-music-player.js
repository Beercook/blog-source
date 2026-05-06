// 音乐页面内容加载器
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('music-player-container');
    if (!container) return;
    
    // 1. 动态加载CSS（使用link标签确保样式正确加载）
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = '/css/music-netease.css';
    document.head.appendChild(linkElement);
    
    // 2. 注入HTML内容
    container.innerHTML = `
<div class="music-page-container">
    <div class="music-content-wrapper">
        <!-- 顶部导航 -->
        <div class="music-header">
            <a href="/" class="back-btn">←</a>
            <div class="page-title"></div>
        </div>

        <div class="music-main-content">
            <!-- 左侧：播放器区 -->
            <div class="player-section">
                <div class="disc-container">
                    <!-- 唱针臂 -->
                    <div class="needle-arm" id="needleArm">
                        <div class="needle-base"></div>
                        <div class="needle-stick">
                            <div class="needle-head"></div>
                        </div>
                    </div>

                    <!-- 黑胶唱片 -->
                    <div class="vinyl-disc" id="vinylDisc">
                        <div class="disc-cover"></div>
                    </div>
                </div>

                <!-- 歌曲信息 -->
                <div class="song-info">
                    <div class="song-title" id="songTitle">加载中...</div>
                    <div class="song-artist">
                        <span class="artist-icon">♫</span>
                        <span id="songArtist">-</span>
                    </div>
                </div>

                <!-- 控制区 -->
                <div class="controls-wrapper">
                    <!-- 进度条 -->
                    <div class="progress-section">
                        <div class="progress-bar">
                            <div class="progress-fill" id="progressFill"></div>
                        </div>
                        <div class="time-display">
                            <span id="currentTime">0:00</span>
                            <span id="totalTime">0:00</span>
                        </div>
                    </div>

                    <!-- 控制按钮 -->
                    <div class="control-buttons">
                        <button class="control-btn" onclick="prevSong()" title="上一首">⏮</button>
                        <button class="control-btn play" id="playBtn" onclick="togglePlay()" title="播放/暂停">▶</button>
                        <button class="control-btn" onclick="nextSong()" title="下一首"></button>
                    </div>
                </div>
            </div>

            <!-- 右侧：歌词区 -->
            <div class="lyrics-section">
                <div class="lyrics-header">
                    <div class="lyrics-title">歌词</div>
                    <div class="lyrics-actions">
                        <button class="lyrics-action-btn" onclick="toggleFullscreen()" title="全屏显示"></button>
                    </div>
                </div>
                <div class="lyrics-content" id="lyricsContent">
                    <div class="lyric-line active">加载中...</div>
                </div>
            </div>
        </div>

        <!-- 底部：播放列表 -->
        <div class="playlist-section">
            <div class="playlist-header">
                <div class="playlist-title">
                    播放列表
                    <span class="playlist-count">6首</span>
                </div>
            </div>
            <div class="playlist-grid">
                <div class="playlist-item" onclick="playSong(this, '王位', '杨和苏KeyNG')">
                    <div class="playlist-cover" style="background-image: url('/music/covers/王位.jpg'); background-size: cover; background-position: center;"></div>
                    <div class="playlist-info">
                        <div class="playlist-title-text">王位</div>
                        <div class="playlist-artist">杨和苏KeyNG</div>
                    </div>
                    <div class="playlist-duration">3:58</div>
                </div>

                <div class="playlist-item" onclick="playSong(this, '金斧子银斧子', '薛之谦')">
                    <div class="playlist-cover" style="background-image: url('/music/covers/jinfuzi.jpg'); background-size: cover; background-position: center;"></div>
                    <div class="playlist-info">
                        <div class="playlist-title-text">金斧子银斧子</div>
                        <div class="playlist-artist">薛之谦</div>
                    </div>
                    <div class="playlist-duration">4:15</div>
                </div>

                <div class="playlist-item" onclick="playSong(this, '于是', '邓紫棋')">
                    <div class="playlist-cover" style="background-image: url('/music/covers/于是.jpg'); background-size: cover; background-position: center;"></div>
                    <div class="playlist-info">
                        <div class="playlist-title-text">于是</div>
                        <div class="playlist-artist">邓紫棋</div>
                    </div>
                    <div class="playlist-duration">3:42</div>
                </div>

                <div class="playlist-item" onclick="playSong(this, 'Walk On Water', '邓紫棋')">
                    <div class="playlist-cover" style="background-image: url('/music/covers/WalkOnWater.jpg'); background-size: cover; background-position: center;"></div>
                    <div class="playlist-info">
                        <div class="playlist-title-text">Walk On Water</div>
                        <div class="playlist-artist">邓紫棋</div>
                    </div>
                    <div class="playlist-duration">4:30</div>
                </div>

                <div class="playlist-item" onclick="playSong(this, '年少有为', '李荣浩')">
                    <div class="playlist-cover" style="background-image: url('/music/covers/年少有为.jpg'); background-size: cover; background-position: center;"></div>
                    <div class="playlist-info">
                        <div class="playlist-title-text">年少有为</div>
                        <div class="playlist-artist">李荣浩</div>
                    </div>
                    <div class="playlist-duration">4:35</div>
                </div>

                <div class="playlist-item" onclick="playSong(this, '赤焰之缨', '王者荣耀')">
                    <div class="playlist-cover" style="background-image: url('/music/covers/赤焰之缨.jpg'); background-size: cover; background-position: center;"></div>
                    <div class="playlist-info">
                        <div class="playlist-title-text">赤焰之缨</div>
                        <div class="playlist-artist">王者荣耀</div>
                    </div>
                    <div class="playlist-duration">4:20</div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- 版权声明 -->
    <div class="copyright-notice">
        <p>声明：本页面音乐仅用于个人收听，不用于任何商业用途及盈利，如有侵权，请联系我删除 1811552860@qq.com</p>
    </div>
</div>
`;
    
    // 3. 显示容器并应用关键样式
    container.style.display = 'block';
    container.style.cssText = 'display: block !important; background: transparent !important;';
    
    // 4. 加载音乐播放器脚本并初始化
    const script = document.createElement('script');
    script.src = '/js/music-player.js';
    script.onload = function() {
        // 等待DOM渲染完成后初始化播放器
        setTimeout(function() {
            if (window.MusicPlayer) {
                window.musicPlayer = new window.MusicPlayer();
                console.log('音乐播放器初始化成功');
            }
        }, 100);
    };
    document.body.appendChild(script);
});
