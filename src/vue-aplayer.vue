<template>
  <div
    class="aplayer"
    :class="{'aplayer-narrow': narrow, 'aplayer-withlist' : musicList.length > 0, 'aplayer-withlrc': !!$slots.display || showlrc}"
  >
    <thumbnail :pic="currentMusic.pic" :playing="isPlaying" @toggleplay="toggle"/>
    <div class="aplayer-info" v-show="!narrow">
      <div class="aplayer-music">
        <span class="aplayer-title">{{ currentMusic.title }}</span>
        <span class="aplayer-author">{{ currentMusic.author }}</span>
      </div>
      <slot name="display" :current-music="currentMusic" :play-stat="playStat">
        <lyrics :current-music="currentMusic" :play-stat="playStat" v-show="showlrc"/>
      </slot>
      <controls
        :mode="mode"
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
      />
    </div>

    <music-list
      :show="showList"
      :current-music="currentMusic"
      :music-list="musicList"
      :play-index="playIndex"
      :listmaxheight="listmaxheight"
      :theme="theme"
      @selectsong="onSelectSong"
    />
    <audio :src="currentMusic.url" ref="audio"></audio>
  </div>
</template>
<script type="text/babel">
  import Vue from 'vue'
  import Thumbnail from './components/aplayer-thumbnail.vue'
  import MusicList from './components/aplayer-list.vue'
  import Controls from './components/aplayer-controller.vue'
  import Lyrics from './components/aplayer-lrc.vue'
  import {versionCompare} from './utils'

  const canUseSync = versionCompare(Vue.version, '2.3.0') >= 0

  let activeMutex = null
  let instanceId = 1
  // console.log("\n %c APlayer 1.6.1 %c http://aplayer.js.org \n\n", "color: #fadfa3; background: #030307; padding:5px 0;", "background: #fadfa3; padding:5px 0;");

  export default {
    name: 'APlayer',
    components: {
      Thumbnail,
      Controls,
      MusicList,
      Lyrics,
    },
    props: {
      narrow: {
        type: Boolean,
        default: false,
      },
      autoplay: {
        type: String,
        default: null,
      },
      showlrc: {
        type: Boolean,
        default: false,
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
        type: Object,
        required: true,
        validator (value) {
          let song = value
          if (!song.url || !song.title || !song.author) {
            song.title = song.title || 'Untitled'
            song.author = song.author || 'Unknown'
            return false
          }
          return true
        },
      },
      list: {
        type: Array,
        default () {
          return []
        },
        validator (value) {
          let songs = value
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
      }
    },
    data () {
      return {
        id: instanceId++,
        internalMusic: this.music,
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
      audio () {
        return this.$refs.audio
      },
      shouldAutoplay () {
        if (this.isMobile) return false
        return this.autoplay
      },
      currentMusic () {
        return canUseSync ? this.music : this.internalMusic
      },
      musicList () {
        return this.list
      },
      currentPicStyleObj () {
        if (this.currentMusic && this.currentMusic.pic) {
          return {
            backgroundImage: `url(${this.currentMusic.pic})`,
          }
        }
        return {}
      },
      loadProgress () {
        if (this.playStat.duration === 0) return 0
        return this.playStat.loadedTime / this.playStat.duration
      },
      playProgress () {
        if (this.playStat.duration === 0) return 0
        return this.playStat.playedTime / this.playStat.duration
      },
      playIndex: {
        get () {
          return this.musicList.indexOf(this.currentMusic)
        },
        set (val) {
          this.setCurrentMusic(this.musicList[val])
        }
      }
    },
    methods: {
      setCurrentMusic (music) {
        canUseSync && this.$emit('update:music', music)
        this.internalMusic = music
      },
      toggle () {
        if (!this.audio.paused) {
          this.pause()
        } else {
          this.play()
        }
      },
      play () {
        if (this.mutex) {
          if (activeMutex) {
            activeMutex.pause()
          }
          activeMutex = this
        }
        this.audio.play()
      },
      pause () {
        this.audio.pause()
      },
      thenPlay () {
        this.$nextTick(() => {
          this.play()
        })
      },
      onSelectSong (song) {
        if (this.currentMusic === song) {
          this.toggle()
        } else {
          this.setCurrentMusic(song)
          this.thenPlay()
        }
      },
      jump () {

      },
      jumpToTime (time) {
        this.audio.currentTime = time
      },
      toggleMute () {
        this.setMuted(!this.audio.muted)
      },
      setMuted (val) {
        this.audio.muted = val
        this.muted = this.audio.muted
      },
      setVolume (val) {
        this.audio.volume = val
        if (val > 0) {
          this.setMuted(false)
        }
      },
      setProgress (val) {
        if (isNaN(this.audio.duration)) {
          this.playStat.playedTime = 0
        } else {
          this.audio.currentTime = this.audio.duration * val
          this.playStat.playedTime = this.audio.currentTime
        }
      },
      onProgressDragBegin () {
        this.audio.removeEventListener('timeupdate', this.onAudioTimeUpdate)
      },
      onProgressDragging (val) {
        this.playStat.playedTime = this.audio.duration * val
      },
      onProgressDragEnd (val) {
        if (isNaN(this.audio.duration)) {
          this.playStat.playedTime = 0
        } else {
          this.audio.currentTime = this.audio.duration * val
        }
        this.audio.addEventListener('timeupdate', this.onAudioTimeUpdate)
      },

      setNextMode () {
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
        this.$emit('update:mode', this.playMode)
      },
      onAudioPlay () {
        this.isPlaying = true
        this.$emit('play')
      },
      onAudioPause () {
        this.isPlaying = false
        this.$emit('pause')
      },
      onAudioDurationChange () {
        if (this.audio.duration !== 1) {
          this.playStat.duration = this.audio.duration
        }
      },
      onAudioProgress () {
        if (this.audio.buffered.length) {
          this.playStat.loadedTime = this.audio.buffered.end(this.audio.buffered.length - 1)
        } else {
          this.playStat.loadedTime = 0
        }
      },
      onAudioTimeUpdate () {
        this.playStat.playedTime = this.audio.currentTime
      },
      onAudioVolumeChange () {
        this.volume = this.audio.volume
      },
      onAudioEnded () {
        // if (!this.musicList.includes(this.currentMusic)) {
        if (this.playIndex === -1) {
          // if music list doesn't contain current music
          // and should play next song according to `mode`
          // set playIndex 0
          // switch (this.mode) {
          //   case 'order':
          //   case 'circulation':
          //   case 'random':
          //     this.playIndex = 0
          //     this.thenPlay()
          //     break;
          //   default:
          //     break;
          // }
        } else {
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
        }

        this.$emit('ended')
      },

      setupAudio () {
        this.muted = this.audio.muted

        // there's no point making preload configurable
        this.audio.preload = true // this.preload

        this.audio.addEventListener('play', this.onAudioPlay)
        this.audio.addEventListener('pause', this.onAudioPause)
        this.audio.addEventListener('abort', this.onAudioPause)
        this.audio.addEventListener('progress', this.onAudioProgress)

        this.audio.addEventListener('durationchange', this.onAudioDurationChange)
        this.audio.addEventListener('timeupdate', this.onAudioTimeUpdate)
        this.audio.addEventListener('volumechange', this.onAudioVolumeChange)

        this.audio.addEventListener('ended', this.onAudioEnded)
      },
      startAutoplay () {
        if (this.autoplay !== null) {
          if (!this.autoplay) {
            this.playIndex = 0
            this.thenPlay()
          } else {
            let autoplaySong = this.musicList.find(song => song.url === this.autoplay)
            if (autoplaySong) {
              this.playIndex = this.musicList.indexOf(autoplaySong)
              this.thenPlay()
            }
          }
        }
      },
    },
    watch: {
      internalMusic () {
        console.log('internalMusic change', this.internalMusic)
      },
      music () {
        this.internalMusic = this.music
      },
      autoplay () {
        this.startAutoplay()
      },
    },
    mounted () {
      this.setupAudio()
      this.startAutoplay()
    },
    beforeDestroy () {
      if (activeMutex === this) {
        activeMutex = null
      }
    },
  }


</script>

<style lang="scss">
  @import "./scss/variables";

  .aplayer-narrow {
    width: $aplayer-height;
  }

  .aplayer-withlrc {
    &.aplayer-narrow {
      width: $aplayer-height-lrc;
    }
    &.aplayer {
      .aplayer-pic {
        height: $aplayer-height-lrc;
        width: $aplayer-height-lrc;
      }

      .aplayer-info {
        margin-left: $aplayer-height-lrc;
        height: $aplayer-height-lrc;
      }

      .aplayer-info {
        padding: 10px 7px 0 7px;
      }
    }
  }

  .aplayer-withlist {
    &.aplayer {
      .aplayer-info {
        border-bottom: 1px solid #e9e9e9;
      }

      .aplayer-list {
        display: block;
      }

      .aplayer-icon-menu {
        display: inline !important;
      }
    }
  }

  .aplayer {
    font-family: Arial, Helvetica, sans-serif;
    margin: 5px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.07), 0 1px 5px 0 rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    overflow: hidden;
    user-select: none;
    line-height: initial;

    * {
      box-sizing: content-box;
    }

    .aplayer-lrc-content {
      display: none;
    }

    .aplayer-info {
      margin-left: $aplayer-height;
      padding: 14px 7px 0 10px;
      height: $aplayer-height;
      box-sizing: border-box;

      .aplayer-music {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin: 0 0 13px 5px;
        user-select: text;
        cursor: default;
        padding-bottom: 2px;

        .aplayer-title {
          font-size: 14px;
        }

        .aplayer-author {
          font-size: 12px;
          color: #666;
        }
      }
    }
  }

  @keyframes aplayer-roll {
    0% {
      left: 0
    }
    100% {
      left: -100%
    }
  }
</style>