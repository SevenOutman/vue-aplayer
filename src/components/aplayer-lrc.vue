<template>
  <div class="aplayer-lrc">
    <div
      class="aplayer-lrc-contents"
      :style="transformStyle">
      <p
        v-for="(line, index) of lrcLines"
        :class="{ 'aplayer-lrc-current': index === currentLineIndex }"
      >
        {{ line[1] }}
      </p>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {parseLrc} from '../utils'

  export default {
    props: ['currentMusic', 'playStat'],
    data () {
      return {
        displayLrc: '',
        currentLineIndex: 0,
      }
    },
    computed: {
      lrcLines () {
        return parseLrc(this.displayLrc)
      },
      currentLine () {
        if (this.currentLineIndex > this.lrcLines.length - 1) {
          return null
        }
        return this.lrcLines[this.currentLineIndex]
      },
      transformStyle () {
        // transform: translateY(0); -webkit-transform: translateY(0);
        return {
          transform: `translateY(${-this.currentLineIndex * 16}px)`,
          webkitTransform: `translateY(${-this.currentLineIndex * 16}px)`,
        }
      },
    },
    methods: {
      applyLrc (lrc) {
        if (/^https?:\/\//.test(lrc)) {
          this.fetchLrc(lrc)
        } else {
          this.displayLrc = lrc
        }
      },
      fetchLrc (src) {
        axios(src)
          .then(({data}) => {
            this.displayLrc = data
          })
      },
      hideLrc () {
        this.displayLrc = ''
      },
    },
    watch: {
      currentMusic (music) {
        this.currentLineIndex = 0
        if (music.lrc) {
          this.applyLrc(music.lrc)
        } else {
          this.hideLrc()
        }
      },
      'playStat.playedTime' (playedTime) {
        for (let i = 0; i < this.lrcLines.length; i++) {
          const line = this.lrcLines[i]
          const nextLine = this.lrcLines[i + 1]
          if (playedTime >= line[0] && (!nextLine || playedTime < nextLine[0])) {
            this.currentLineIndex = i
          }
        }
      },
    },
    mounted () {
      this.currentLineIndex = 0
      if (this.currentMusic.lrc) {
        this.applyLrc(this.currentMusic.lrc)
      } else {
        this.hideLrc()
      }
    }
  }
</script>
<style lang="scss">
  @import "../scss/variables";

  .aplayer-lrc {
    position: relative;
    height: $lrc-height;
    text-align: center;
    overflow: hidden;
    margin: -10px 0 7px;

    &:before {
      position: absolute;
      top: 0;
      z-index: 1;
      display: block;
      overflow: hidden;
      width: 100%;
      height: 10%;
      content: ' ';
      background: -moz-linear-gradient(top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
      background: -webkit-linear-gradient(top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
      background: linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
      filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffff', endColorstr='#00ffffff', GradientType=0);
    }

    &:after {
      position: absolute;
      bottom: 0;
      z-index: 1;
      display: block;
      overflow: hidden;
      width: 100%;
      height: 33%;
      content: ' ';
      background: -moz-linear-gradient(top, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 100%);
      background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 100%);
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 100%);
      filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00ffffff', endColorstr='#ccffffff', GradientType=0);
    }

    p {
      font-size: 12px;
      color: #666;
      line-height: 16px !important;
      height: 16px !important;
      padding: 0 !important;
      margin: 0 !important;
      transition: all 0.5s ease-out;
      opacity: 0.4;
      overflow: hidden;

      &.aplayer-lrc-current {
        opacity: 1;
        overflow: visible;
        height: initial !important;
      }
    }

    .aplayer-lrc-contents {
      width: 100%;
      transition: all 0.5s ease-out;
      user-select: text;
      cursor: default;
    }
  }
</style>