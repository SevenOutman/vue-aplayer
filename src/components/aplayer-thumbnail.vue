<template>
  <div
          class="aplayer-pic"
          :style="currentPicStyleObj"
  >
    <div class="aplayer-button" :class="playing ? 'aplayer-pause' : 'aplayer-play'">
      <icon-button
              :icon="playing ? 'pause' : 'play'"
              :class="playing ? 'aplayer-icon-pause' : 'aplayer-icon-play'"
              @click.native="$emit('toggleplay')"
      ></icon-button>
    </div>
  </div>
</template>
<script>
  import IconButton from './aplayer-iconbutton.vue'

  export default {
    components: {
      IconButton,
    },
    props: {
      pic: String,
      playing: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      currentPicStyleObj() {
        if (!this.pic) return {}
        return {
          backgroundImage: `url(${this.pic})`,
        }
      },
    },
  }
</script>