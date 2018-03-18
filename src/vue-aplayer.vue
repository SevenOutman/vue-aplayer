<template>
  <div
    class="aplayer"
    :class="{
      'aplayer-narrow': isMiniMode,
      'aplayer-withlist' : musicList.length > 0,
      'aplayer-withlrc': !!$slots.display || showlrc,
      'aplayer-float': enableFloat
    }"
    :style="floatStyleObj"
  >
    <thumbnail
      :pic="currentMusic.pic"
      :playing="isPlaying"
      :enable-drag="enableFloat"
      @toggleplay="toggle"
      @dragbegin="onDragBegin"
      @dragging="onDragAround"
    />
    <div class="aplayer-info" v-show="!narrow && !mini">
      <div class="aplayer-music">
        <span class="aplayer-title">{{ currentMusic.title }}</span>
        <span class="aplayer-author">{{ currentMusic.author }}</span>
      </div>
      <slot name="display" :current-music="currentMusic" :play-stat="playStat">
        <lyrics :current-music="currentMusic" :play-stat="playStat" v-show="showlrc"/>
      </slot>
      <controls
        :mode="playMode"
        :stat="playStat"
        :volume="volume"
        :muted="muted"
        :theme="currentTheme"
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
      :show="showList && !isMiniMode"
      :current-music="currentMusic"
      :music-list="musicList"
      :play-index="playIndex"
      :listmaxheight="listmaxheight || listMaxHeight"
      :theme="currentTheme"
      @selectsong="onSelectSong"
    />
    <audio ref="audio"></audio>
  </div>
</template>
<script type="text/babel">
  import Vue from 'vue'
  import Thumbnail from './components/aplayer-thumbnail.vue'
  import MusicList from './components/aplayer-list.vue'
  import Controls from './components/aplayer-controller.vue'
  import Lyrics from './components/aplayer-lrc.vue'
  import {deprecatedProp, versionCompare, warn} from './utils'

  const canUseSync = versionCompare(Vue.version, '2.3.0') >= 0

  /** polyfill for browsers without Promise */
  /** btw does vue2 still support them? */
  function resolved () {
    // only used as initial VueAplayer.audioPlayPromise
    // no need to handle resolve value or catch
    return Promise ? Promise.resolve() : {
      then (func) {
        func()
        return this
      }
    }
  }

  export const version = VERSION

  let activeMutex = null
  let instanceId = 1
  console.log(`\n %c Vue-APlayer ${version} %c https://vue-aplayer.js.org \n\n`, "color: #fff; background:#41b883; padding:5px 0;", "color: #fff; background: #35495e; padding:5px 0;");
  export default {
    name: 'APlayer',
    components: {
      Thumbnail,
      Controls,
      MusicList,
      Lyrics,
    },
    props: {
      // @deprecated, use mini instead
      narrow: {
        type: Boolean,
        default: false,
        validator (value) {
          if (value) {
            deprecatedProp('narrow', '1.1.2', 'mini')
          }
          return true
        }
      },
      mini: {
        type: Boolean,
        default: false
      },
      autoplay: {
        type: Boolean,
        default: false,
      },
      // @deprecated since 1.2.2
      showlrc: {
        type: Boolean,
        default: false,
        validator (value) {
          if (value) {
            deprecatedProp('showlrc', '1.2.2', 'showLrc')
          }
          return true
        }
      },
      showLrc: {
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
      listmaxheight: {
        type: String,
        validator (value) {
          if (value) {
            deprecatedProp('listmaxheight', '1.1.2', 'listMaxHeight')
          }
          return true
        }
      },
      listMaxHeight: String,
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
      },
      float: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        id: instanceId++,
        internalMusic: this.music,
        internalMode: this.mode,
        isPlaying: false,
        isMobile: /mobile/i.test(window.navigator.userAgent),
        playStat: {
          duration: 0,
          loadedTime: 0,
          playedTime: 0,
        },
        volume: 0.8,
        muted: false,
        showList: true,

        // handle Promise returned from audio.play()
        // @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play
        audioPlayPromise: resolved(),

        floatOriginX: 0,
        floatOriginY: 0,
        floatOffsetLeft: 0,
        floatOffsetTop: 0
      }
    },
    computed: {
      currentTheme () {
        return this.currentMusic.theme || this.theme
      },
      enableFloat () {
        return this.float && !this.isMobile
      },
      floatStyleObj () {
        // transform: translate(floatOffsetLeft, floatOffsetY)
        return {
          transform: `translate(${this.floatOffsetLeft}px, ${this.floatOffsetTop}px)`,
          webkitTransform: `translate(${this.floatOffsetLeft}px, ${this.floatOffsetTop}px)`,
        }
      },
      // for deprecated `narrow`
      isMiniMode () {
        return this.mini || this.narrow
      },
      audio () {
        return this.$refs.audio
      },
      shouldAutoplay () {
        if (this.isMobile) return false
        return this.autoplay
      },
      currentMusic () {
        return this.internalMusic
      },
      playMode () {
        return this.internalMode
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
      onDragBegin () {
        this.floatOriginX = this.floatOffsetLeft
        this.floatOriginY = this.floatOffsetTop
      },
      onDragAround ({offsetLeft, offsetTop}) {
        this.floatOffsetLeft = this.floatOriginX + offsetLeft
        this.floatOffsetTop = this.floatOriginY + offsetTop
      },
      setCurrentMusic (music) {
        canUseSync && this.$emit('update:music', music)
        this.internalMusic = music
      },
      setPlayMode (mode) {
        canUseSync && this.$emit('update:mode', mode)
        this.internalMode = mode
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
          if (activeMutex && activeMutex !== this) {
            activeMutex.pause()
          }
          activeMutex = this
        }
        // handle .play() Promise
        const audioPlayPromise = this.audio.play()
        if (audioPlayPromise) {
          return this.audioPlayPromise = new Promise((resolve, reject) => {
            // rejectPlayPromise is to force reject audioPlayPromise if it's still pending when pause() is called
            this.rejectPlayPromise = reject
            audioPlayPromise.then((res) => {
              this.rejectPlayPromise = null
              resolve(res)
            }).catch(warn)
          })
        }
      },
      pause () {
        this.audioPlayPromise
        // Avoid force rejection throws Uncaught
          .catch(() => {
          })
          .finally(() => {
            this.audio.pause()
          })

        // audioPlayPromise is still pending
        if (this.rejectPlayPromise) {
          // force reject playPromise
          this.rejectPlayPromise()
          this.rejectPlayPromise = null
        }
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
        if (this.musicList.length) {
          if (this.playMode === 'random') {
            this.setPlayMode('single')
          } else if (this.playMode === 'single') {
            this.setPlayMode('order')
          } else if (this.playMode === 'order') {
            this.setPlayMode('circulation')
          } else if (this.playMode === 'circulation') {
            this.setPlayMode('random')
          }
        } else {
          if (this.playMode === 'circulation') {
            this.setPlayMode('order')
          } else {
            this.setPlayMode('circulation')
          }
        }
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

        if (this.currentMusic) {
          this.audio.src = this.currentMusic.url
        }
      },
    },
    watch: {
      music (music) {
        this.internalMusic = music
      },
      currentMusic: {
        handler (music) {
          // HLS support
          if (/\.m3u8(?=(#|\?|$))/.test(music.url)) {
            if (this.audio.canPlayType('application/x-mpegURL') || this.audio.canPlayType('application/vnd.apple.mpegURL')) {
              this.audio.src = music.url;
            } else {
              try {
                const Hls = require('hls.js')
                if (Hls.isSupported()) {
                  if (!this.hls) {
                    this.hls = new Hls()
                  }
                  this.hls.loadSource(music.url)
                  this.hls.attachMedia(this.audio)
                } else {
                  warn('HLS is not supported on your browser');
                }
              } catch (e) {
                warn('hls.js is required to support m3u8')
              }
            }
          } else {
            this.audio.src = music.url
          }
        }
      }
    },
    mounted () {
      this.setupAudio()
      if (this.autoplay) this.play()
    },
    beforeDestroy () {
      if (activeMutex === this) {
        activeMutex = null
      }
      if (this.hls) {
        this.hls.destroy()
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

    /* floating player on top */
    position: relative;
    &.aplayer-float {
      z-index: 1;
    }

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
      background: #fff;

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