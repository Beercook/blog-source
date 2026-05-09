// 网易云音乐风格 - 音乐播放器功能（优化版）

class MusicPlayer {
    constructor() {
        this.isPlaying = false;
        this.currentSongIndex = 0;
        this.lyrics = [];
        this.currentLyricIndex = -1;
        this.isLoaded = false;
        this.scrollPosition = 0; // 保存滚动位置
        
        // 歌曲列表 - 使用正确的路径
        this.songs = [
            {
                title: '王位',
                artist: '杨和苏KeyNG',
                url: '/music/audio/王位.mp3',
                cover: '/music/covers/王位.jpg',
                lrc: '/music/lrc/王位.lrc',
                duration: '3:58'
            },
            {
                title: '金斧子银斧子',
                artist: '薛之谦',
                url: '/music/audio/jinfuzi.mp3',
                cover: '/music/covers/jinfuzi.jpg',
                lrc: '/music/lrc/jinfuzi.lrc',
                duration: '4:15'
            },
            {
                title: '于是',
                artist: '邓紫棋',
                url: '/music/audio/于是.mp3',
                cover: '/music/covers/于是.jpg',
                lrc: '/music/lrc/于是.lrc',
                duration: '3:42'
            },
            {
                title: 'Walk On Water',
                artist: '邓紫棋',
                url: '/music/audio/WalkOnWater.mp3',
                cover: '/music/covers/WalkOnWater.jpg',
                lrc: '/music/lrc/WalkOnWater.lrc',
                duration: '4:30'
            },
            {
                title: '年少有为',
                artist: '李荣浩',
                url: '/music/audio/年少有为.mp3',
                cover: '/music/covers/年少有为.jpg',
                lrc: '/music/lrc/年少有为.lrc',
                duration: '4:35'
            },
            {
                title: '赤焰之缨',
                artist: '王者荣耀',
                url: '/music/audio/赤焰之缨.mp3',
                cover: '/music/covers/赤焰之缨.jpg',
                lrc: '/music/lrc/赤焰之缨.lrc',
                duration: '4:20'
            },
            {
                title: '我又想你了',
                artist: '陈信喆',
                url: '/music/audio/我又想你了.mp3',
                cover: '/music/covers/我又想你了.jpg',
                lrc: '/music/lrc/我又想你了.lrc',
                duration: '4:25'
            },
            {
                title: '无数',
                artist: '薛之谦',
                url: '/music/audio/无数.mp3',
                cover: '/music/covers/无数.png',
                lrc: '/music/lrc/无数.lrc',
                duration: '5:10'
            },
            {
                title: '泡沫',
                artist: 'G.E.M. 邓紫棋',
                url: '/music/audio/泡沫.mp3',
                cover: '/music/covers/泡沫.jpg',
                lrc: '/music/lrc/泡沫.lrc',
                duration: '4:15'
            },
            {
                title: '灵魂歌手',
                artist: '梁博',
                url: '/music/audio/灵魂歌手.mp3',
                cover: '/music/covers/灵魂歌手.jpg',
                lrc: '/music/lrc/灵魂歌手.lrc',
                duration: '6:30'
            }
        ];
        
        this.audio = new Audio();
        this.audio.preload = 'auto'; // 预加载音频
        
        this.initElements();
        this.bindEvents();
        this.loadSong(0);
    }
    
    initElements() {
        this.vinylDisc = document.getElementById('vinylDisc');
        this.needleArm = document.getElementById('needleArm');
        this.playBtn = document.getElementById('playBtn');
        this.progressFill = document.getElementById('progressFill');
        this.currentTimeEl = document.getElementById('currentTime');
        this.totalTimeEl = document.getElementById('totalTime');
        this.songTitleEl = document.getElementById('songTitle');
        this.songArtistEl = document.getElementById('songArtist');
        this.discCoverEl = document.querySelector('.disc-cover');
        this.lyricsContent = document.getElementById('lyricsContent');
        this.playlistItems = document.querySelectorAll('.playlist-item');
        
        // 初始化时确保黑胶唱片不旋转
        if (this.vinylDisc) {
            this.vinylDisc.style.animationPlayState = 'paused';
        }
    }
    
    bindEvents() {
        // 播放/暂停按钮 - 使用更可靠的绑定方式
        if (this.playBtn) {
            this.playBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('点击播放按钮');
                this.togglePlay();
            });
        }
        
        // 音频事件
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('ended', () => this.nextSong());
        this.audio.addEventListener('loadedmetadata', () => {
            this.totalTimeEl.textContent = this.formatTime(this.audio.duration);
            this.isLoaded = true;
            console.log('音频元数据加载完成');
        });
        
        this.audio.addEventListener('canplaythrough', () => {
            console.log('音频可以流畅播放');
        });
        
        this.audio.addEventListener('error', (e) => {
            console.error('音频加载错误:', e);
            alert('音频加载失败，请检查文件路径');
        });
        
        this.audio.addEventListener('pause', () => {
            console.log('音频已暂停');
            this.isPlaying = false;
            this.updatePlayButton();
            this.stopVinylRotation(); // 添加这行确保暂停时停止旋转
        });
        
        this.audio.addEventListener('play', () => {
            console.log('音频开始播放');
            this.isPlaying = true;
            this.updatePlayButton();
            this.startVinylRotation(); // 添加这行确保播放时启动旋转
        });
        
        // 进度条点击
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.addEventListener('click', (e) => this.seek(e));
        }
        
        // 防止页面自动滚动到顶部
        window.addEventListener('beforeunload', () => {
            this.scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        });
        
        // 页面加载后恢复滚动位置
        window.addEventListener('load', () => {
            if (this.scrollPosition > 0) {
                window.scrollTo(0, this.scrollPosition);
            }
        });
    }
    
    async loadSong(index) {
        console.log('加载歌曲:', index);
        this.currentSongIndex = index;
        const song = this.songs[index];
        
        // 更新歌曲信息
        this.songTitleEl.textContent = song.title;
        this.songArtistEl.textContent = song.artist;
        
        // 更新封面 - 使用更可靠的方式
        if (this.discCoverEl) {
            // 设置封面图片
            this.discCoverEl.style.backgroundImage = `url('${song.cover}')`;
            this.discCoverEl.style.backgroundSize = 'cover';
            this.discCoverEl.style.backgroundPosition = 'center';
            this.discCoverEl.style.backgroundRepeat = 'no-repeat';
            console.log('封面已更新为:', song.cover);
        }
        
        // 停止当前播放
        this.audio.pause();
        this.audio.currentTime = 0;
        this.isPlaying = false;
        this.updatePlayButton();
        this.stopVinylRotation(); // 确保停止旋转
        
        // 加载新音频
        this.audio.src = song.url;
        this.audio.load();
        
        // 加载歌词
        await this.loadLyrics(song.lrc);
        
        // 更新播放列表选中状态
        this.updatePlaylistActive(index);
        
        // 重置进度
        this.progressFill.style.width = '0%';
        this.currentTimeEl.textContent = '0:00';
        this.totalTimeEl.textContent = song.duration;
        
        console.log('歌曲加载完成，准备播放');
    }
    
    async loadLyrics(lrcUrl) {
        try {
            console.log('加载歌词:', lrcUrl);
            const response = await fetch(lrcUrl);
            if (!response.ok) {
                throw new Error('歌词文件不存在');
            }
            const lrcText = await response.text();
            this.lyrics = this.parseLyrics(lrcText);
            this.renderLyrics();
            console.log('歌词加载成功，共', this.lyrics.length, '行');
        } catch (error) {
            console.error('加载歌词失败:', error);
            this.lyrics = [];
            this.lyricsContent.innerHTML = '<div class="lyric-line active">暂无歌词</div>';
        }
    }
    
    parseLyrics(lrcText) {
        const lines = lrcText.split('\n');
        const lyrics = [];
        
        lines.forEach(line => {
            const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/);
            if (match) {
                const minutes = parseInt(match[1]);
                const seconds = parseInt(match[2]);
                const milliseconds = parseInt(match[3].padEnd(3, '0'));
                const time = minutes * 60 + seconds + milliseconds / 1000;
                const text = match[4].trim();
                
                if (text) {
                    lyrics.push({ time, text });
                }
            }
        });
        
        return lyrics.sort((a, b) => a.time - b.time);
    }
    
    renderLyrics() {
        this.lyricsContent.innerHTML = '';
        
        if (this.lyrics.length === 0) {
            this.lyricsContent.innerHTML = '<div class="lyric-line active">暂无歌词</div>';
            return;
        }
        
        this.lyrics.forEach((lyric, index) => {
            const div = document.createElement('div');
            div.className = 'lyric-line';
            div.textContent = lyric.text;
            div.dataset.index = index;
            div.addEventListener('click', () => this.seekToLyric(index));
            this.lyricsContent.appendChild(div);
        });
    }
    
    togglePlay() {
        console.log('切换播放状态，当前:', this.isPlaying, '已加载:', this.isLoaded);
        
        if (!this.isLoaded) {
            console.log('音频未加载完成，等待...');
            // 等待音频加载
            setTimeout(() => {
                if (this.isLoaded) {
                    this.togglePlay();
                }
            }, 500);
            return;
        }
        
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }
    
    play() {
        console.log('开始播放，当前状态:', this.audio.paused);
        
        if (!this.audio.paused) {
            console.log('音频已经在播放');
            return;
        }
        
        const playPromise = this.audio.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('播放成功');
                this.startVinylRotation(); // 开始旋转
            }).catch(error => {
                console.error('播放失败:', error);
                alert('播放失败，请重试');
            });
        }
    }
    
    pause() {
        console.log('暂停播放，当前状态:', !this.audio.paused);
        
        if (this.audio.paused) {
            console.log('音频已经暂停');
            return;
        }
        
        this.audio.pause();
        this.stopVinylRotation(); // 立即停止旋转
        console.log('暂停命令已发送');
    }
    
    updatePlayButton() {
        if (this.playBtn) {
            this.playBtn.textContent = this.isPlaying ? '⏸' : '▶';
            console.log('更新按钮状态:', this.isPlaying ? '暂停图标' : '播放图标');
        }
    }
    
    // 启动黑胶唱片旋转
    startVinylRotation() {
        if (this.vinylDisc) {
            this.vinylDisc.style.animationPlayState = 'running';
        }
        if (this.needleArm) {
            this.needleArm.classList.add('playing');
        }
    }
    
    // 停止黑胶唱片旋转
    stopVinylRotation() {
        if (this.vinylDisc) {
            this.vinylDisc.style.animationPlayState = 'paused';
        }
        if (this.needleArm) {
            this.needleArm.classList.remove('playing');
        }
    }
    
    updateProgress() {
        const current = this.audio.currentTime;
        const duration = this.audio.duration;
        
        if (duration && !isNaN(duration)) {
            const percent = (current / duration) * 100;
            this.progressFill.style.width = percent + '%';
            this.currentTimeEl.textContent = this.formatTime(current);
            
            // 更新歌词高亮
            this.updateLyricHighlight(current);
        }
    }
    
    updateLyricHighlight(currentTime) {
        if (this.lyrics.length === 0) return;
        
        let activeIndex = 0;
        
        for (let i = 0; i < this.lyrics.length; i++) {
            if (this.lyrics[i].time <= currentTime) {
                activeIndex = i;
            } else {
                break;
            }
        }
        
        if (activeIndex !== this.currentLyricIndex) {
            this.currentLyricIndex = activeIndex;
            
            // 移除所有active类
            const allLines = this.lyricsContent.querySelectorAll('.lyric-line');
            allLines.forEach(line => line.classList.remove('active'));
            
            // 添加active类到当前行
            if (allLines[activeIndex]) {
                allLines[activeIndex].classList.add('active');
                
                // 只在歌词容器内滚动，不影响整个页面
                const lyricsContainer = document.querySelector('.lyrics-content');
                if (lyricsContainer) {
                    const activeLine = allLines[activeIndex];
                    const containerRect = lyricsContainer.getBoundingClientRect();
                    const lineRect = activeLine.getBoundingClientRect();
                    
                    // 计算需要滚动的位置（相对于容器）
                    const scrollTop = lyricsContainer.scrollTop + (lineRect.top - containerRect.top) - (containerRect.height / 2) + (lineRect.height / 2);
                    
                    // 平滑滚动到目标位置
                    lyricsContainer.scrollTo({
                        top: scrollTop,
                        behavior: 'smooth'
                    });
                }
            }
        }
    }
    
    seek(event) {
        const progressBar = event.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const width = rect.width;
        const percent = clickX / width;
        
        if (this.audio.duration && !isNaN(this.audio.duration)) {
            this.audio.currentTime = percent * this.audio.duration;
        }
    }
    
    seekToLyric(index) {
        if (this.lyrics[index]) {
            this.audio.currentTime = this.lyrics[index].time;
            if (!this.isPlaying) {
                this.play();
            }
        }
    }
    
    prevSong() {
        let newIndex = this.currentSongIndex - 1;
        if (newIndex < 0) {
            newIndex = this.songs.length - 1;
        }
        this.loadSong(newIndex);
    }
    
    nextSong() {
        let newIndex = this.currentSongIndex + 1;
        if (newIndex >= this.songs.length) {
            newIndex = 0;
        }
        this.loadSong(newIndex);
    }
    
    updatePlaylistActive(index) {
        this.playlistItems.forEach((item, i) => {
            item.classList.remove('active');
            const indicator = item.querySelector('.playing-indicator');
            if (indicator) indicator.remove();
            
            if (i === index) {
                item.classList.add('active');
                
                // 添加播放指示器
                const indicator = document.createElement('div');
                indicator.className = 'playing-indicator';
                indicator.innerHTML = `
                    <div class="playing-bar"></div>
                    <div class="playing-bar"></div>
                    <div class="playing-bar"></div>
                `;
                item.insertBefore(indicator, item.querySelector('.playlist-duration'));
            }
        });
    }
    
    formatTime(seconds) {
        if (isNaN(seconds) || seconds === null || seconds === undefined) return '0:00';
        
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
}

// 页面加载完成后初始化播放器
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM加载完成，初始化播放器');
    window.musicPlayer = new MusicPlayer();
});

// 全局函数（供HTML调用）
function togglePlay() {
    if (window.musicPlayer) {
        window.musicPlayer.togglePlay();
    }
}

function prevSong() {
    if (window.musicPlayer) {
        window.musicPlayer.prevSong();
    }
}

function nextSong() {
    if (window.musicPlayer) {
        window.musicPlayer.nextSong();
    }
}

function playSong(element, title, artist) {
    if (window.musicPlayer) {
        const index = Array.from(document.querySelectorAll('.playlist-item')).indexOf(element);
        if (index !== -1) {
            window.musicPlayer.loadSong(index);
            // 延迟一下再播放，确保音频加载完成
            setTimeout(() => {
                window.musicPlayer.play();
            }, 300);
        }
    }
}

function seek(event) {
    if (window.musicPlayer) {
        window.musicPlayer.seek(event);
    }
}

// 全屏功能
function toggleFullscreen() {
    const lyricsSection = document.querySelector('.lyrics-section');
    if (lyricsSection) {
        if (!document.fullscreenElement) {
            lyricsSection.requestFullscreen().catch(err => {
                console.error('全屏失败:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }
}