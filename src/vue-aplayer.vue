<template>
  <div
    class="aplayer"
    :class="{
      'aplayer-narrow': isMiniMode,
      'aplayer-withlist' : !isMiniMode && musicList.length > 0,
      'aplayer-withlrc': !isMiniMode && (!!$slots.display || shouldShowLrc),
      'aplayer-float': isFloatMode,
      'aplayer-loading': isPlaying && isLoading
    }"
    :style="floatStyleObj"
  >
    <div class="aplayer-body">
      <thumbnail
        :pic="currentMusic.pic"
        :playing="isPlaying"
        :enable-drag="isFloatMode"
        :theme="currentTheme"
        @toggleplay="toggle"
        @dragbegin="onDragBegin"
        @dragging="onDragAround"
      />
      <div class="aplayer-info" v-show="!isMiniMode">
        <div class="aplayer-music">
          <span class="aplayer-title">{{ currentMusic.title || 'Untitled' }}</span>
          <span class="aplayer-author">{{ currentMusic.artist || currentMusic.author || 'Unknown' }}</span>
        </div>
        <slot name="display" :current-music="currentMusic" :play-stat="playStat">
          <lyrics :current-music="currentMusic" :play-stat="playStat" v-show="shouldShowLrc"/>
        </slot>
        <controls
          :mode="playMode"
          :stat="playStat"
          :volume="audioVolume"
          :muted="isAudioMuted"
          :theme="currentTheme"
          @togglelist="showList = !showList"
          @togglemute="toggleMute"
          @setvolume="setAudioVolume"
          @dragbegin="onProgressDragBegin"
          @dragend="onProgressDragEnd"
          @dragging="onProgressDragging"
          @nextmode="setNextMode"
        />
      </div>
    </div>
    <audio ref="audio"></audio>
    <music-list
      :show="showList && !isMiniMode"
      :current-music="currentMusic"
      :music-list="musicList"
      :play-index="playIndex"
      :listmaxheight="listmaxheight || listMaxHeight"
      :theme="currentTheme"
      @selectsong="onSelectSong"
    />
  </div>
</template>
<script type="text/babel">
  import Vue from 'vue'
  import Thumbnail from './components/aplayer-thumbnail.vue'
  import MusicList from './components/aplayer-list.vue'
  import Controls from './components/aplayer-controller.vue'
  import Lyrics from './components/aplayer-lrc.vue'
  import {deprecatedProp, versionCompare, warn} from './utils'

  // version badge
  console.log(`\n\n %c Vue-APlayer ${VERSION} %c vue-aplayer.js.org \n`, 'color: #fff; background:#41b883; padding:5px 0;', 'color: #fff; background: #35495e; padding:5px 0;')

  const canUseSync = versionCompare(Vue.version, '2.3.0') >= 0

  /**
   * memorize self-adapting theme for cover image urls
   * @type {Object.<url, rgb()>}
   */
  const picThemeCache = {}

  // mutex playing instance
  let activeMutex = null
  export default {
    name: 'APlayer',
    components: {
      Thumbnail,
      Controls,
      MusicList,
      Lyrics,
    },
    props: {
      music: {
        type: Object,
        required: true,
        validator (song) {
          if (song.url) {
            deprecatedProp('music.url', '1.4.0', 'music.src')
          }
          if (song.author) {
            deprecatedProp('music.author', '1.4.1', 'music.artist')
          }
          return song.src || song.url
        },
      },
      list: {
        type: Array,
        default () {
          return []
        }
      },
      mini: {
        type: Boolean,
        default: false
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
        default: '#41b883',
      },
      mode: {
        type: String,
        default: 'circulation',
      },
      listMaxHeight: String,
      /**
       * @since 1.4.1
       * Fold playlist initially
       */
      listFolded: {
        type: Boolean,
        default: false
      },

      /**
       * @since 1.2.0 Float mode
       */
      float: {
        type: Boolean,
        default: false
      },

      // Audio attributes as props
      // autoplay controls muted preload volume
      // autoplay is not observable

      /**
       * @since 1.4.0
       * not observable
       */
      autoplay: {
        type: Boolean,
        default: false,
      },

      /**
       * @since 1.4.0
       * whether to show native audio controls below Vue-APlayer
       * only work in development environment and not mini mode
       *
       * observable
       */
      controls: {
        type: Boolean,
        default: false
      },

      /**
       * @since 1.4.0
       * observable, sync
       */
      muted: {
        type: Boolean,
        default: false
      },
      /**
       * @since 1.4.0
       * observable
       */
      preload: String,

      /**
       * @since 1.4.0
       * observable, sync
       */
      volume: {
        type: Number,
        default: 0.8,
        validator (value) {
          return value >= 0 && value <= 1
        }
      },

      /**
       * @deprecated since 1.1.2, use listMaxHeight instead
       */
      listmaxheight: {
        type: String,
        validator (value) {
          if (value) {
            deprecatedProp('listmaxheight', '1.1.2', 'listMaxHeight')
          }
          return true
        }
      },
      /**
       * @deprecated since 1.1.2, use mini instead
       */
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
      /**
       * @deprecated since 1.2.2
       */
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
    },
    data () {
      return {
        internalMusic: this.music,
        internalMode: this.mode,
        isPlaying: false,
        isSeeking: false,
        wasPlayingBeforeSeeking: false,
        isMobile: /mobile/i.test(window.navigator.userAgent),
        playStat: {
          duration: 0,
          loadedTime: 0,
          playedTime: 0,
        },
        showList: !this.listFolded,

        // handle Promise returned from audio.play()
        // @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play
        audioPlayPromise: Promise.resolve(),


        // @since 1.2.0 float mode

        floatOriginX: 0,
        floatOriginY: 0,
        floatOffsetLeft: 0,
        floatOffsetTop: 0,


        // @since 1.3.0 self adapting theme
        selfAdaptingTheme: null,


        // @since 1.4.0
        // sync muted, volume

        internalMuted: this.muted,
        internalVolume: this.volume,

        // @since 1.4.1
        // Loading indicator
        isLoading: false
      }
    },
    computed: {
      // alias for $refs.audio
      audio () {
        return this.$refs.audio
      },

      currentMusic () {
        return this.internalMusic
      },
      // compatible for deprecated props
      isMiniMode () {
        return this.mini || this.narrow
      },
      shouldShowLrc () {
        return this.showLrc || this.showlrc
      },

      // props wrappers

      currentTheme () {
        return this.selfAdaptingTheme || this.currentMusic.theme || this.theme
      },
      isFloatMode () {
        return this.float && !this.isMobile
      },
      shouldAutoplay () {
        if (this.isMobile) return false
        return this.autoplay
      },
      playMode () {
        return this.internalMode
      },
      musicList () {
        return this.list
      },
      shouldShowNativeControls () {
        return process.env.NODE_ENV !== 'production' &&
          this.controls &&
          !this.isMiniMode
      },

      // useful

      floatStyleObj () {
        // transform: translate(floatOffsetLeft, floatOffsetY)
        return {
          transform: `translate(${this.floatOffsetLeft}px, ${this.floatOffsetTop}px)`,
          webkitTransform: `translate(${this.floatOffsetLeft}px, ${this.floatOffsetTop}px)`,
        }
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
      },

      // since 1.4.0
      // sync muted, volume

      isAudioMuted: {
        get () {
          return this.internalMuted
        },
        set (val) {
          canUseSync && this.$emit('update:muted', val)
          this.internalMuted = val
        }
      },
      audioVolume: {
        get () {
          return this.internalVolume
        },
        set (val) {
          canUseSync && this.$emit('update:volume', val)
          this.internalVolume = val
        }
      }
    },
    methods: {
      // Float mode

      onDragBegin () {
        this.floatOriginX = this.floatOffsetLeft
        this.floatOriginY = this.floatOffsetTop
      },
      onDragAround ({offsetLeft, offsetTop}) {
        this.floatOffsetLeft = this.floatOriginX + offsetLeft
        this.floatOffsetTop = this.floatOriginY + offsetTop
      },

      // functions

      setCurrentMusic (music) {
        canUseSync && this.$emit('update:music', music)
        this.internalMusic = music
      },
      setPlayMode (mode) {
        canUseSync && this.$emit('update:mode', mode)
        this.internalMode = mode
      },
      thenPlay () {
        this.$nextTick(() => {
          this.play()
        })
      },

      // controls

      // play/pause

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
          .then(() => {
            this.audio.pause()
          })
          // Avoid force rejection throws Uncaught
          .catch(() => {
            this.audio.pause()
          })

        // audioPlayPromise is still pending
        if (this.rejectPlayPromise) {
          // force reject playPromise
          this.rejectPlayPromise()
          this.rejectPlayPromise = null
        }
      },

      // progress bar

      onProgressDragBegin (val) {
        this.wasPlayingBeforeSeeking = this.isPlaying
        this.pause()
        this.isSeeking = true

        this.audio.currentTime = this.audio.duration * val
      },
      onProgressDragging (val) {
        if (isNaN(this.audio.duration)) {
          this.playStat.playedTime = 0
        } else {
          this.audio.currentTime = this.audio.duration * val
        }
      },
      onProgressDragEnd (val) {
        this.isSeeking = false

        if (this.wasPlayingBeforeSeeking) {
          this.thenPlay()
        }
      },

      // volume

      toggleMute () {
        this.setAudioMuted(!this.audio.muted)
      },
      setAudioMuted (val) {
        this.audio.muted = val
      },
      setAudioVolume (val) {
        this.audio.volume = val
        if (val > 0) {
          this.setAudioMuted(false)
        }
      },

      // playlist

      onSelectSong (song) {
        if (this.currentMusic === song) {
          this.toggle()
        } else {
          this.setCurrentMusic(song)
          this.thenPlay()
        }
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

      // event handlers
      // for keeping up with audio states

      onAudioPlay () {
        this.isPlaying = true
      },
      onAudioPause () {
        this.isPlaying = false
      },
      onAudioWaiting () {
        this.isLoading = true
      },
      onAudioCanplay () {
        this.isLoading = false
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
      onAudioSeeking () {
        this.playStat.playedTime = this.audio.currentTime
      },
      onAudioSeeked () {
        this.playStat.playedTime = this.audio.currentTime
      },
      onAudioVolumeChange () {
        this.audioVolume = this.audio.volume
        this.isAudioMuted = this.audio.muted
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
      },

      initAudio () {

        // since 1.4.0 Audio attributes as props

        this.audio.controls = this.shouldShowNativeControls
        this.audio.muted = this.muted
        this.audio.preload = this.preload
        this.audio.volume = this.volume


        // since 1.4.0 Emit as many native audio events
        // @see https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events

        const mediaEvents = [
          'abort',
          'canplay', 'canplaythrough',
          'durationchange',
          'emptied', 'encrypted', 'ended', 'error',
          'interruptbegin', 'interruptend',
          'loadeddata', 'loadedmetadata', 'loadstart',
          'mozaudioavailable',
          'pause', 'play', 'playing', 'progress',
          'ratechange',
          'seeked', 'seeking', 'stalled', 'suspend',
          'timeupdate',
          'volumechange',
          'waiting'
        ]
        mediaEvents.forEach(event => {
          this.audio.addEventListener(event, e => this.$emit(event, e))
        })


        // event handlers
        // they don't emit native media events

        this.audio.addEventListener('play', this.onAudioPlay)
        this.audio.addEventListener('pause', this.onAudioPause)
        this.audio.addEventListener('abort', this.onAudioPause)
        this.audio.addEventListener('waiting', this.onAudioWaiting)
        this.audio.addEventListener('canplay', this.onAudioCanplay)
        this.audio.addEventListener('progress', this.onAudioProgress)
        this.audio.addEventListener('durationchange', this.onAudioDurationChange)
        this.audio.addEventListener('seeking', this.onAudioSeeking)
        this.audio.addEventListener('seeked', this.onAudioSeeked)
        this.audio.addEventListener('timeupdate', this.onAudioTimeUpdate)
        this.audio.addEventListener('volumechange', this.onAudioVolumeChange)
        this.audio.addEventListener('ended', this.onAudioEnded)


        if (this.currentMusic) {
          this.audio.src = this.currentMusic.src || this.currentMusic.url
        }
      },

      setSelfAdaptingTheme () {
        // auto theme according to current music cover image
        if ((this.currentMusic.theme || this.theme) === 'pic') {
          const pic = this.currentMusic.pic
          // use cache
          if (picThemeCache[pic]) {
            this.selfAdaptingTheme = picThemeCache[pic]
          } else {
            try {
              new ColorThief().getColorAsync(pic, ([r, g, b]) => {
                picThemeCache[pic] = `rgb(${r}, ${g}, ${b})`
                this.selfAdaptingTheme = `rgb(${r}, ${g}, ${b})`
              })
            } catch (e) {
              warn('color-thief is required to support self-adapting theme')
            }
          }
        } else {
          this.selfAdaptingTheme = null
        }
      }
    },
    watch: {
      music (music) {
        this.internalMusic = music
      },

      currentMusic: {
        handler (music) {
          // async
          this.setSelfAdaptingTheme()

          const src = music.src || music.url
          // HLS support
          if (/\.m3u8(?=(#|\?|$))/.test(src)) {
            if (this.audio.canPlayType('application/x-mpegURL') || this.audio.canPlayType('application/vnd.apple.mpegURL')) {
              this.audio.src = src
            } else {
              try {
                const Hls = require('hls.js')
                if (Hls.isSupported()) {
                  if (!this.hls) {
                    this.hls = new Hls()
                  }
                  this.hls.loadSource(src)
                  this.hls.attachMedia(this.audio)
                } else {
                  warn('HLS is not supported on your browser')
                  this.audio.src = src
                }
              } catch (e) {
                warn('hls.js is required to support m3u8')
                this.audio.src = src
              }
            }
          } else {
            this.audio.src = src
          }
          // self-adapting theme color
        },
      },

      // since 1.4.0
      // observe controls, muted, preload, volume

      shouldShowNativeControls (val) {
        this.audio.controls = val
      },
      isAudioMuted (val) {
        this.audio.muted = val
      },
      preload (val) {
        this.audio.preload = val
      },
      audioVolume (val) {
        this.audio.volume = val
      },

      // sync muted, volume

      muted (val) {
        this.internalMuted = val
      },
      volume (val) {
        this.internalVolume = val
      }
    },
    mounted () {
      this.initAudio()
      this.setSelfAdaptingTheme()
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
    .aplayer-body {
      display: flex;

      position: relative;
      .aplayer-info {
        flex-grow: 1;
        display: flex;
        flex-direction: column;

        padding: 14px 7px 0 10px;
        height: $aplayer-height;
        box-sizing: border-box;
        background: #fff;

        .aplayer-music {
          flex-grow: 1;

          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          margin-left: 5px;
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

    audio[controls] {
      display: block;
      width: 100%;
    }

    // Mini mode
    &.aplayer-narrow {
      width: $aplayer-height;

      // never this case
      // &.aplayer-withlrc {
      //  width: $aplayer-height-lrc;
      // }
    }

    &.aplayer-withlrc {
      .aplayer-body {
        .aplayer-pic {
          height: $aplayer-height-lrc;
          width: $aplayer-height-lrc;
        }

        .aplayer-info {
          height: $aplayer-height-lrc;
        }

        .aplayer-info {
          padding: 10px 7px 0 7px;
        }
      }
    }

    &.aplayer-withlist {
      .aplayer-body {
        .aplayer-info {
          border-bottom: 1px solid #e9e9e9;
        }

        .aplayer-icon-menu {
          display: block !important;
        }
      }

      // never useful in vue
      /*.aplayer-list {*/
      /*display: block;*/
      /*}*/
    }

    /* floating player on top */
    position: relative;
    &.aplayer-float {
      z-index: 1;
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