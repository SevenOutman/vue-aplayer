<template>
  <div
    class="aplayer-list"
    :class="{'aplayer-list-hide': !show}"
    :style="{maxHeight: listmaxheight || ''}"
    ref="list"
  >
    <ol>
      <li v-for="(aMusic, index) of musicList"
          :class="{'aplayer-list-light': index === playIndex}"
          @click="$emit('selectsong', index)"
      >
        <span class="aplayer-list-cur" :style="{background: theme}"></span>
        <span class="aplayer-list-index">{{ index + 1}}</span>
        <span class="aplayer-list-title">{{ aMusic.title }}</span>
        <span class="aplayer-list-author">{{ aMusic.author }}</span>
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
      musicList: {
        type: Array,
      },
      playIndex: {
        type: Number,
        default: 0,
      },
      theme: String,
      listmaxheight: String,
    },
    mounted () {
      this.$el.style.height = `${this.$el.offsetHeight}px`
    },
  }
</script>

<style lang="scss">

  .aplayer-list {
    overflow: auto;
    transition: all 0.5s ease;
    will-change: height;
    display: none;

    &.aplayer-list-hide {
      height: 0 !important;
    }

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

    ol {
      list-style-type: none;
      margin: 0;
      padding: 0;

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

        &:first-child {
          border-top: none;
        }

        &:hover {
          background: #efefef;
        }

        &.aplayer-list-light {
          background: #e9e9e9;

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