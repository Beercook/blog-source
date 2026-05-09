---
title: 我的音乐
date: 2026-05-05 17:43:27
comments: false
top_img: /img/top-banner.jpg
---

{% raw %}
<style>
/* 强制覆盖Butterfly主题样式 */
#page .music-page-container * { margin: 0 !important; padding: 0 !important; box-sizing: border-box !important; }
#page .music-page-container { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Microsoft YaHei', sans-serif !important; min-height: 100vh !important; color: #ffffff !important; padding: 30px 20px !important; background: linear-gradient(135deg, #1e1e2e 0%, #2d2d44 50%, #1a1a2e 100%) !important; }
#page .music-content-wrapper { max-width: 1400px !important; margin: 0 auto !important; position: relative !important; z-index: 1 !important; }
#page .music-header { display: flex !important; justify-content: space-between !important; align-items: center !important; margin-bottom: 40px !important; }
#page .music-main-content { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 40px !important; margin-bottom: 40px !important; }
#page .player-section { position: relative !important; }
#page .disc-container { width: 100% !important; max-width: 500px !important; aspect-ratio: 1 !important; margin: 0 auto 30px !important; position: relative !important; }
#page .vinyl-disc { width: 100% !important; height: 100% !important; border-radius: 50% !important; background: radial-gradient(circle at center, #333 0%, #111 50%, #000 100%) !important; position: relative !important; box-shadow: 0 0 40px rgba(0,0,0,0.5) !important; }
#page .disc-cover { position: absolute !important; top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important; width: 35% !important; height: 35% !important; border-radius: 50% !important; }
@keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
#page .song-info { text-align: center !important; margin-bottom: 30px !important; }
#page .song-title { font-size: 24px !important; font-weight: bold !important; margin-bottom: 8px !important; }
#page .song-artist { font-size: 16px !important; opacity: 0.8 !important; }
#page .progress-section { margin-bottom: 20px !important; }
#page .progress-bar { width: 100% !important; height: 6px !important; background: rgba(255,255,255,0.2) !important; border-radius: 3px !important; overflow: hidden !important; cursor: pointer !important; }
#page .progress-fill { width: 0% !important; height: 100% !important; background: linear-gradient(90deg, #ff6b6b, #ff8e8e) !important; border-radius: 3px !important; transition: width 0.1s !important; }
#page .time-display { display: flex !important; justify-content: space-between !important; margin-top: 8px !important; font-size: 12px !important; opacity: 0.6 !important; }
#page .control-buttons { display: flex !important; justify-content: center !important; align-items: center !important; gap: 20px !important; }
#page .control-btn { width: 50px !important; height: 50px !important; border-radius: 50% !important; border: none !important; background: rgba(255,255,255,0.1) !important; color: #fff !important; font-size: 20px !important; cursor: pointer !important; transition: all 0.3s !important; display: flex !important; align-items: center !important; justify-content: center !important; }
#page .control-btn.play { width: 70px !important; height: 70px !important; background: linear-gradient(135deg, #ff6b6b, #ff8e8e) !important; box-shadow: 0 4px 20px rgba(255,107,107,0.4) !important; }
#page .control-btn:hover { transform: scale(1.1) !important; background: rgba(255,255,255,0.2) !important; }
#page .lyrics-section { background: rgba(0,0,0,0.3) !important; border-radius: 20px !important; padding: 30px !important; max-height: 500px !important; overflow: hidden !important; }
#page .lyrics-header { display: flex !important; justify-content: space-between !important; align-items: center !important; margin-bottom: 20px !important; }
#page .lyrics-title { font-size: 18px !important; font-weight: bold !important; }
#page .lyrics-content { max-height: 400px !important; overflow-y: auto !important; text-align: center !important; line-height: 2.5 !important; }
#page .lyric-line { opacity: 0.35 !important; transition: all 0.3s !important; padding: 5px 0 !important; cursor: pointer !important; }
#page .lyric-line.active { opacity: 1 !important; font-size: 1.3em !important; text-shadow: 0 0 10px rgba(255,107,107,0.5) !important; }
#page .playlist-section { background: rgba(0,0,0,0.3) !important; border-radius: 20px !important; padding: 30px !important; }
#page .playlist-header { margin-bottom: 20px !important; }
#page .playlist-title { font-size: 18px !important; font-weight: bold !important; }
#page .playlist-count { opacity: 0.6 !important; font-size: 14px !important; margin-left: 10px !important; }
#page .playlist-grid { display: grid !important; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)) !important; gap: 15px !important; }
#page .playlist-item { background: rgba(255,255,255,0.05) !important; border-radius: 12px !important; padding: 10px !important; display: flex !important; gap: 10px !important; align-items: center !important; cursor: pointer !important; transition: all 0.3s !important; }
#page .playlist-item:hover { background: rgba(255,255,255,0.1) !important; transform: translateY(-2px) !important; }
#page .playlist-cover { width: 50px !important; height: 50px !important; border-radius: 8px !important; flex-shrink: 0 !important; }
#page .playlist-info { flex: 1 !important; min-width: 0 !important; }
#page .playlist-title-text { font-size: 14px !important; font-weight: bold !important; margin-bottom: 4px !important; overflow: hidden !important; text-overflow: ellipsis !important; white-space: nowrap !important; }
#page .playlist-artist { font-size: 12px !important; opacity: 0.7 !important; }
#page .playlist-duration { font-size: 12px !important; opacity: 0.6 !important; flex-shrink: 0 !important; }
#page .copyright-notice { text-align: center !important; margin-top: 30px !important; padding: 20px !important; background: rgba(255,255,255,0.05) !important; border-radius: 10px !important; font-size: 12px !important; opacity: 0.8 !important; }
#page .layout, #page #page, #page #content-wrap { background: transparent !important; }

/* 修复旋转动画控制，确保只有在播放时才旋转 */
#page .vinyl-disc {
    animation: rotate 20s linear infinite !important;
    animation-play-state: paused !important;
}

#page .vinyl-disc.playing {
    animation-play-state: running !important;
}
</style>

<link rel="stylesheet" href="/css/music-netease.css">

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
                        <button class="control-btn" onclick="nextSong()" title="下一首">⏭</button>
                    </div>
                </div>
            </div>

            <!-- 右侧：歌词区 -->
            <div class="lyrics-section">
                <div class="lyrics-header">
                    <div class="lyrics-title">歌词</div>
                    <div class="lyrics-actions">
                        <button class="lyrics-action-btn" onclick="toggleFullscreen()" title="全屏显示">⛶</button>
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
                    <span class="playlist-count">10首</span>
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

                <div class="playlist-item" onclick="playSong(this, '我又想你了', '陈信喆')">
                    <div class="playlist-cover" style="background-image: url('/music/covers/我又想你了.jpg'); background-size: cover; background-position: center;"></div>
                    <div class="playlist-info">
                        <div class="playlist-title-text">我又想你了</div>
                        <div class="playlist-artist">陈信喆</div>
                    </div>
                    <div class="playlist-duration">4:25</div>
                </div>

                <div class="playlist-item" onclick="playSong(this, '无数', '薛之谦')">
                    <div class="playlist-cover" style="background-image: url('/music/covers/无数.png'); background-size: cover; background-position: center;"></div>
                    <div class="playlist-info">
                        <div class="playlist-title-text">无数</div>
                        <div class="playlist-artist">薛之谦</div>
                    </div>
                    <div class="playlist-duration">5:10</div>
                </div>

                <div class="playlist-item" onclick="playSong(this, '泡沫', '邓紫棋')">
                    <div class="playlist-cover" style="background-image: url('/music/covers/泡沫.jpg'); background-size: cover; background-position: center;"></div>
                    <div class="playlist-info">
                        <div class="playlist-title-text">泡沫</div>
                        <div class="playlist-artist">邓紫棋</div>
                    </div>
                    <div class="playlist-duration">4:15</div>
                </div>

                <div class="playlist-item" onclick="playSong(this, '灵魂歌手', '梁博')">
                    <div class="playlist-cover" style="background-image: url('/music/covers/灵魂歌手.jpg'); background-size: cover; background-position: center;"></div>
                    <div class="playlist-info">
                        <div class="playlist-title-text">灵魂歌手</div>
                        <div class="playlist-artist">梁博</div>
                    </div>
                    <div class="playlist-duration">6:30</div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- 版权声明 -->
    <div class="copyright-notice">
        <p>声明📢：本页面音乐仅用于个人收听，不用于任何商业用途及盈利，如有侵权，请联系我删除📮 1811552860@qq.com</p>
    </div>
</div>

<script src="/js/music-player.js"></script>
{% endraw %}