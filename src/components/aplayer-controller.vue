<template>
  <div class="aplayer-controller">
    <v-progress
      :loadProgress="loadProgress"
      :playProgress="playProgress"
      :theme="theme"
      @dragbegin="val => $emit('dragbegin', val)"
      @dragend="val => $emit('dragend', val)"
      @dragging="val => $emit('dragging', val)"
    />
    <div class="aplayer-time">
      <div class="aplayer-time-inner">
        - <span class="aplayer-ptime">{{secondToTime(stat.playedTime)}}</span> / <span
        class="aplayer-dtime">{{secondToTime(stat.duration)}}</span>
      </div>
      <volume
        :volume="volume"
        :theme="theme"
        :muted="muted"
        @togglemute="$emit('togglemute')"
        @setvolume="v => $emit('setvolume', v)"
      />
      <icon-button class="aplayer-icon-mode" :icon="mode" @click.native="$emit('nextmode')"/>
      <icon-button class="aplayer-icon-menu" icon="menu" @click.native="$emit('togglelist')"/>
    </div>
  </div>
</template>

<script>
  import IconButton from './aplayer-iconbutton.vue'
  import VProgress from './aplayer-controller-progress.vue'
  import Volume from './aplayer-controller-volume.vue'

  export default {
    components: {
      IconButton,
      VProgress,
      Volume,
    },
    props: ['mode', 'stat', 'theme', 'volume', 'muted'],
    computed: {
      loadProgress () {
        if (this.stat.duration === 0) return 0
        return this.stat.loadedTime / this.stat.duration
      },
      playProgress () {
        if (this.stat.duration === 0) return 0
        return this.stat.playedTime / this.stat.duration
      },
    },
    methods: {
      secondToTime (second) {
        if (isNaN(second)) {
          return '00:00'
        }
        const pad0 = (num) => {
          return num < 10 ? '0' + num : '' + num
        }

        const min = Math.trunc(second / 60)
        const sec = Math.trunc(second - min * 60)
        const hours = Math.trunc(min / 60)
        const minAdjust = Math.trunc((second / 60) - (60 * Math.trunc((second / 60) / 60)))
        return second >= 3600 ? pad0(hours) + ':' + pad0(minAdjust) + ':' + pad0(sec) : pad0(min) + ':' + pad0(sec)
      },
    },
  }
</script>

<style lang="scss">

  .aplayer-controller {
    display: flex;
    align-items: center;

    position: relative;


    .aplayer-time {
      display: flex;
      align-items: center;

      position: relative;
      height: 17px;
      color: #999;
      font-size: 11px;
      padding-left: 7px;

      .aplayer-time-inner {
      }

      .aplayer-icon {
        cursor: pointer;
        transition: all 0.2s ease;

        .aplayer-fill {
          fill: #666;
        }

        &.aplayer-icon-mode {
          margin-right: 4px;
        }

        &:hover {
          .aplayer-fill {
            fill: #000;
          }
        }

        &.aplayer-icon-menu {
          display: none;
        }
      }

      &.aplayer-time-narrow {
        .aplayer-icon-mode {
          display: none;
        }

        .aplayer-icon-menu {
          display: none;
        }
      }
    }

    .aplayer-volume-wrap {
      position: relative;
      margin-left: 3px;
      cursor: pointer !important;

      &:hover .aplayer-volume-bar-wrap {
        height: 40px;
      }

      .aplayer-volume-bar-wrap {
        position: absolute;
        bottom: 15px;
        right: -3px;
        width: 25px;
        height: 0;
        z-index: 99;
        overflow: hidden;
        transition: all .2s ease;

        .aplayer-volume-bar {
          position: absolute;
          bottom: 0;
          right: 10px;
          width: 5px;
          height: 40px;
          background: #aaa;
          border-radius: 2.5px;
          overflow: hidden;

          .aplayer-volume {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 5px;
            transition: all 0.1s ease, background-color .3s;
            will-change: height;
          }
        }
      }
    }
  }

</style>