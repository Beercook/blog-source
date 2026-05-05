// 网易云音乐风格 - 音乐播放器功能

class MusicPlayer {
    constructor() {
        this.isPlaying = false;
        this.currentSongIndex = 0;
        this.lyrics = [];
        this.currentLyricIndex = 0;
        
        // 歌曲列表
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
            }
        ];
        
        this.audio = new Audio();
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
    }
    
    bindEvents() {
        // 播放/暂停按钮
        this.playBtn.addEventListener('click', () => this.togglePlay());
        
        // 音频事件
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('ended', () => this.nextSong());
        this.audio.addEventListener('loadedmetadata', () => {
            this.totalTimeEl.textContent = this.formatTime(this.audio.duration);
        });
        
        // 进度条点击
        document.querySelector('.progress-bar').addEventListener('click', (e) => this.seek(e));
        
        // 上一首/下一首
        document.querySelector('.control-btn[onclick="prevSong()"]').addEventListener('click', () => this.prevSong());
        document.querySelector('.control-btn[onclick="nextSong()"]').addEventListener('click', () => this.nextSong());
    }
    
    async loadSong(index) {
        this.currentSongIndex = index;
        const song = this.songs[index];
        
        // 更新歌曲信息
        this.songTitleEl.textContent = song.title;
        this.songArtistEl.textContent = song.artist;
        this.totalTimeEl.textContent = song.duration;
        
        // 更新封面
        this.discCoverEl.style.backgroundImage = `url(${song.cover})`;
        this.discCoverEl.style.backgroundSize = 'cover';
        
        // 加载音频
        this.audio.src = song.url;
        
        // 加载歌词
        await this.loadLyrics(song.lrc);
        
        // 更新播放列表选中状态
        this.updatePlaylistActive(index);
        
        // 重置进度
        this.progressFill.style.width = '0%';
        this.currentTimeEl.textContent = '0:00';
    }
    
    async loadLyrics(lrcUrl) {
        try {
            const response = await fetch(lrcUrl);
            const lrcText = await response.text();
            this.lyrics = this.parseLyrics(lrcText);
            this.renderLyrics();
        } catch (error) {
            console.error('加载歌词失败:', error);
            this.lyrics = [];
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
                const milliseconds = parseInt(match[3]);
                const time = minutes * 60 + seconds + milliseconds / 1000;
                const text = match[4].trim();
                
                if (text) {
                    lyrics.push({ time, text });
                }
            }
        });
        
        return lyrics;
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
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }
    
    play() {
        this.audio.play();
        this.isPlaying = true;
        this.vinylDisc.classList.add('playing');
        this.needleArm.classList.add('playing');
        this.playBtn.textContent = '⏸';
    }
    
    pause() {
        this.audio.pause();
        this.isPlaying = false;
        this.vinylDisc.classList.remove('playing');
        this.needleArm.classList.remove('playing');
        this.playBtn.textContent = '▶';
    }
    
    updateProgress() {
        const current = this.audio.currentTime;
        const duration = this.audio.duration;
        
        if (duration) {
            const percent = (current / duration) * 100;
            this.progressFill.style.width = percent + '%';
            this.currentTimeEl.textContent = this.formatTime(current);
            
            // 更新歌词高亮
            this.updateLyricHighlight(current);
        }
    }
    
    updateLyricHighlight(currentTime) {
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
                
                // 滚动到当前行
                allLines[activeIndex].scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }
    }
    
    seek(event) {
        const progressBar = event.currentTarget;
        const clickX = event.offsetX;
        const width = progressBar.offsetWidth;
        const percent = clickX / width;
        
        if (this.audio.duration) {
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
        if (this.isPlaying) {
            this.play();
        }
    }
    
    nextSong() {
        let newIndex = this.currentSongIndex + 1;
        if (newIndex >= this.songs.length) {
            newIndex = 0;
        }
        this.loadSong(newIndex);
        if (this.isPlaying) {
            this.play();
        }
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
        if (isNaN(seconds)) return '0:00';
        
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
}

// 页面加载完成后初始化播放器
document.addEventListener('DOMContentLoaded', function() {
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
            window.musicPlayer.play();
        }
    }
}

function seek(event) {
    if (window.musicPlayer) {
        window.musicPlayer.seek(event);
    }
}