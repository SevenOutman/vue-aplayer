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
    name: "aplayer-list",
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
    mounted() {
      this.$el.style.height = `${this.$el.offsetHeight}px`
    },
  }
</script>
