<template>
  <div
    class="aplayer-list"
    :class="{'aplayer-list-hide': !show}"
    :style="{maxHeight: listmaxheight || ''}"
    ref="list"
  >
    <ol
      ref="ol"
      :style="{maxHeight: listmaxheight || ''}"
    >
      <li
        v-for="(aMusic, index) of musicList"
        :key="index"
        :class="{'aplayer-list-light': aMusic === currentMusic}"
        @click="$emit('selectsong', aMusic)"
      >
        <span class="aplayer-list-cur" :style="{background: theme}"></span>
        <span class="aplayer-list-index">{{ index + 1}}</span>
        <span class="aplayer-list-title">{{ aMusic.title || 'Untitled' }}</span>
        <span class="aplayer-list-author">{{ aMusic.artist || aMusic.author || 'Unknown' }}</span>
      </li>
    </ol>
  </div>
</template>

<script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: true,
      },
      currentMusic: Object,
      musicList: {
        type: Array,
        default () {
          return []
        }
      },
      playIndex: {
        type: Number,
        default: 0,
      },
      theme: String,
      listmaxheight: String,
    },
    mounted () {
      const listHeight = 33 * this.musicList.length - 1
      this.$el.style.height = `${listHeight}px`
      this.$refs.ol.style.height = `${listHeight}px`
    },
  }
</script>

<style lang="scss">

  .aplayer-list {
    transition: all 0.5s ease;
    will-change: height;
    overflow: hidden;
    // never useful in vue
    /*display: none;*/

    &.aplayer-list-hide {
      height: 0 !important;
    }

    ol {
      list-style-type: none;
      margin: 0;
      padding: 0;
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 5px;
      }
      &::-webkit-scrollbar-track {
        background-color: #f9f9f9;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background-color: #eee;
      }
      &::-webkit-scrollbar-thumb:hover {
        background-color: #ccc;
      }
      &:hover {
        li.aplayer-list-light:not(:hover) {
          background-color: inherit;
          transition: inherit;
        }
      }

      &:not(:hover) {
        li.aplayer-list-light {
          transition: background-color .6s ease;
        }
      }
      li {
        position: relative;
        height: 32px;
        line-height: 32px;
        padding: 0 15px;
        font-size: 12px;
        border-top: 1px solid #e9e9e9;
        cursor: pointer;
        transition: all 0.2s ease;
        overflow: hidden;
        margin: 0;

        &:first-child {
          border-top: none;
        }

        &:hover {
          background: #efefef;
        }

        &.aplayer-list-light {
          /*background: #e9e9e9;*/
          background: #efefef;

          .aplayer-list-cur {
            display: inline-block;
          }
        }

        .aplayer-list-cur {
          display: none;
          width: 3px;
          height: 22px;
          position: absolute;
          left: 0;
          top: 5px;
          cursor: pointer;
          transition: background-color .3s;
        }
        .aplayer-list-index {
          color: #666;
          margin-right: 12px;
          cursor: pointer;
        }
        .aplayer-list-author {
          color: #666;
          float: right;
          cursor: pointer;
        }
      }
    }
  }
</style>