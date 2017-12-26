<template>
  <div class="aplayer-lrc">
    <div class="aplayer-lrc-contents"
         :style="transformStyle">
      <p v-for="(line, index) of lrcLines" :class="{ 'aplayer-lrc-current': index === currentLineIndex }">{{ line[1]
        }}</p>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import { parseLrc } from '../utils';

  export default {
    props: ['currentMusic', 'playStat'],
    data() {
      return {
        displayLrc: '',
        currentLineIndex: 0,
      }
    },
    computed: {
      lrcLines() {
        return parseLrc(this.displayLrc)
      },
      currentLine() {
        if (this.currentLineIndex > this.lrcLines.length - 1) {
          return null
        }
        return this.lrcLines[this.currentLineIndex]
      },
      transformStyle() {
        // transform: translateY(0); -webkit-transform: translateY(0);
        return {
          transform: `translateY(${-this.currentLineIndex * 16}px)`,
          webkitTransform: `translateY(${-this.currentLineIndex * 16}px)`,
        }
      },
    },
    methods: {
      applyLrc(lrc) {
        if (/^https?:\/\//.test(lrc)) {
          this.fetchLrc(lrc)
        } else {
          this.displayLrc = lrc
        }
      },
      fetchLrc(src) {
        axios(src)
          .then(({ data }) => {
            this.displayLrc = data
          })
      },
      hideLrc() {
        this.displayLrc = ''
      },
    },
    watch: {
      currentMusic(music) {
        this.currentLineIndex = 0
        if (music.lrc) {
          this.applyLrc(music.lrc)
        } else {
          this.hideLrc()
        }
      },
      'playStat.playedTime'(playedTime) {
        console.log(playedTime)
        // if (this.lrcIndex > this.lrc.length - 1 || currentTime < this.lrc[this.lrcIndex][0] || (!this.lrc[this.lrcIndex + 1] || currentTime >= this.lrc[this.lrcIndex + 1][0])) {
        for (let i = 0; i < this.lrcLines.length; i++) {
          const line = this.lrcLines[i]
          const nextLine = this.lrcLines[i + 1]
          if (playedTime >= line[0] && (!nextLine || playedTime < nextLine[0])) {
            this.currentLineIndex = i;
          }
        }
        // }
      },
    },
    mounted() {

    },
  }
</script>
