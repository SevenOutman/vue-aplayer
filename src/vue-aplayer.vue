<template>
  <div class="aplayer" :class="{'aplayer-narrow': narrow, 'aplayer-withlist' : music instanceof Array}">
    <thumbnail :pic="currentMusic.pic" :playing="isPlaying" @toggleplay="toggle"></thumbnail>
    <div class="aplayer-info">
      <div class="aplayer-music">
        <span class="aplayer-title">{{ currentMusic.title}}</span>
        <span class="aplayer-author">{{ currentMusic.author }}</span>
      </div>
      <div class="aplayer-lrc">
        <div class="aplayer-lrc-contents"
             style="transform: translateY(0); -webkit-transform: translateY(0);"></div>
      </div>
      <controls
              :mode="playMode"
              :stat="playStat"
              :volume="volume"
              :muted="muted"
              :theme="theme"
              @togglelist="showList = !showList"
              @togglemute="toggleMute"
              @setvolume="setVolume"
              @setprogress="setProgress"
              @dragbegin="onProgressDragBegin"
              @dragend="onProgressDragEnd"
              @dragging="onProgressDragging"
              @nextmode="setNextMode"
      >
      </controls>
    </div>

    <music-list :show="showList" :music-list="musicList" :play-index="playIndex" :listmaxheight="listmaxheight"
                :theme="theme" @selectsong="setPlayIndex"></music-list>
    <audio :src="currentMusic.url" ref="audio"></audio>
  </div>
</template>
<script type="text/babel">
  import Thumbnail from './components/aplayer-thumbnail.vue'
  import MusicList from './components/aplayer-list.vue'
  import Controls from './components/aplayer-controller.vue'

  let activeMutex = null
  let instanceId = 1
  // console.log("\n %c APlayer 1.6.1 %c http://aplayer.js.org \n\n", "color: #fadfa3; background: #030307; padding:5px 0;", "background: #fadfa3; padding:5px 0;");

  export default {
    name: 'APlayer',
    components: {
      Thumbnail,
      Controls,
      MusicList,
    },
    props: {
      narrow: {
        type: Boolean,
        default: false,
      },
      autoplay: {
        type: Boolean,
        default: false,
      },
      showlrc: {
        type: Number,
        default: 0,
      },
      mutex: {
        type: Boolean,
        default: true,
      },
      theme: {
        type: String,
        default: '#b7daff',
      },
      mode: {
        type: String,
        default: 'circulation',
      },
      preload: {
        type: String,
        default: 'auto',
      },
      listmaxheight: String,
      music: {
        type: [Object, Array],
        required: true,
        validator(value) {
          let songs
          if (!(value instanceof Array)) {
            songs = [value]
          } else {
            songs = value
          }
          for (let i = 0; i < songs.length; i++) {
            let song = songs[i]
            if (!song.url || !song.title || !song.author) {
              song.title = song.title || 'Untitled'
              song.author = song.author || 'Unknown'
              return false
            }
          }
          return true
        },
      },
    },
    data() {
      return {
        id: instanceId++,
        playIndex: 0,
        isPlaying: false,
        isMobile: /mobile/i.test(window.navigator.userAgent),
        playStat: {
          duration: 0,
          loadedTime: 0,
          playedTime: 0,
        },
        volume: 0.8,
        muted: false,
        playMode: this.mode,
        showList: true,
      }
    },
    computed: {
      audio() {
        return this.$refs.audio
      },
      shouldAutoplay() {
        if (this.isMobile) return false
        return this.autoplay
      },
      musicList() {
        if (this.music instanceof Array) {
          return this.music;
        }
        return [this.music];
      },
      currentMusic() {
        return this.musicList[this.playIndex]
      },
      currentPicStyleObj() {
        if (this.currentMusic && this.currentMusic.pic) {
          return {
            backgroundImage: `url(${this.currentMusic.pic})`,
          }
        }
        return {};
      },
      loadProgress() {
        if (this.playStat.duration === 0) return 0
        return this.playStat.loadedTime / this.playStat.duration
      },
      playProgress() {
        if (this.playStat.duration === 0) return 0
        return this.playStat.playedTime / this.playStat.duration
      },
    },
    methods: {
      toggle() {
        if (!this.audio.paused) {
          this.pause()
        } else {
          this.play()
        }
      },
      play() {
        if (this.mutex) {
          if (activeMutex) {
            activeMutex.pause()
          }
          activeMutex = this
        }
        this.audio.play()
      },
      pause() {
        this.audio.pause()
      },
      thenPlay() {
        this.$nextTick(() => {
          this.play()
        })
      },
      setPlayIndex(index) {
        if (this.playIndex === index) {
          this.toggle()
        } else {
          this.playIndex = index
          this.$nextTick(this.play)
        }
      },
      jump() {

      },
      jumpToTime(time) {
        this.audio.currentTime = time
      },
      toggleMute() {
        this.setMuted(!this.audio.muted)
      },
      setMuted(val) {
        this.audio.muted = val
        this.muted = this.audio.muted
      },
      setVolume(val) {
        this.audio.volume = val
        if (val > 0) {
          this.setMuted(false)
        }
      },
      setProgress(val) {
        if (isNaN(this.audio.duration)) {
          this.playStat.playedTime = 0
        } else {
          this.audio.currentTime = this.audio.duration * val
          this.playStat.playedTime = this.audio.currentTime
        }
      },
      onProgressDragBegin() {
        this.audio.removeEventListener('timeupdate', this.onAudioTimeUpdate)
      },
      onProgressDragging(val) {
        this.playStat.playedTime = this.audio.duration * val
      },
      onProgressDragEnd(val) {
        if (isNaN(this.audio.duration)) {
          this.playStat.playedTime = 0
        } else {
          this.audio.currentTime = this.audio.duration * val
        }
        this.audio.addEventListener('timeupdate', this.onAudioTimeUpdate)
      },

      setNextMode() {
        if (this.music instanceof Array) {
          if (this.playMode === 'random') {
            this.playMode = 'single'
          } else if (this.playMode === 'single') {
            this.playMode = 'order'
          } else if (this.playMode === 'order') {
            this.playMode = 'circulation'
          } else if (this.playMode === 'circulation') {
            this.playMode = 'random'
          }
        } else {
          if (this.playMode === 'circulation') {
            this.playMode = 'order'
          } else {
            this.playMode = 'circulation'
          }
        }
      },
      onAudioPlay() {
        this.isPlaying = true
        this.$emit('play')
      },
      onAudioPause() {
        this.isPlaying = false
        this.$emit('pause')
      },
      onAudioDurationChange() {
        if (this.audio.duration !== 1) {
          this.playStat.duration = this.audio.duration
        }
      },
      onAudioProgress() {
        if (this.audio.buffered.length) {
          this.playStat.loadedTime = this.audio.buffered.end(this.audio.buffered.length - 1)
        } else {
          this.playStat.loadedTime = 0
        }
      },
      onAudioTimeUpdate() {
        this.playStat.playedTime = this.audio.currentTime
      },
      onAudioVolumeChange() {
        this.volume = this.audio.volume
      },
      onAudioEnded() {
        if (this.mode === 'order') {
          if (this.playIndex === this.musicList.length - 1) {
            // do nothing
          } else if (this.playIndex < this.musicList.length - 1) {
            this.playIndex++
            this.thenPlay()
          }
        } else if (this.mode === 'single') {
          this.thenPlay()
        } else if (this.mode === 'circulation') {
          this.playIndex = (this.playIndex + 1) % this.musicList.length
          this.thenPlay()
        } else if (this.mode === 'random') {
          this.playIndex = Math.trunc(Math.random() * this.musicList.length)
          this.thenPlay()
        }

        this.$emit('ended');
      },
    },
    mounted() {
      this.muted = this.audio.muted
      this.audio.preload = this.preload

      this.audio.addEventListener('play', this.onAudioPlay)
      this.audio.addEventListener('pause', this.onAudioPause)
      this.audio.addEventListener('abort', this.onAudioPause)
      this.audio.addEventListener('progress', this.onAudioProgress)

      this.audio.addEventListener('durationchange', this.onAudioDurationChange)
      this.audio.addEventListener('timeupdate', this.onAudioTimeUpdate)
      this.audio.addEventListener('volumechange', this.onAudioVolumeChange)

      this.audio.addEventListener('ended', this.onAudioEnded)

      // dont set audio.autoplay directly, we take control
      if (this.autoplay) {
        this.play()
      }
    },
    beforeDestroy() {
      if (activeMutex === this) {
        activeMutex = null
      }
    }
  }


</script>

<style lang="sass" rel="stylesheet/scss">
  @import "~aplayer/src/APlayer.scss"
</style>