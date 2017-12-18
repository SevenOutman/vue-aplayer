<template>
  <div
          class="aplayer-pic"
          :style="currentPicStyleObj"
  >
    <div class="aplayer-button" :class="playing ? 'aplayer-pause' : 'aplayer-play'">
      <button
              type="button"
              class="aplayer-icon"
              :class="playing ? 'aplayer-icon-pause' : 'aplayer-icon-play'"
              @click="$emit('toggleplay')"
      >
        <icon :type="playing ? 'pause' : 'play'"></icon>
      </button>
    </div>
  </div>
</template>
<script>
  import AplayerIcon from './aplayer-icon.vue'

  export default {
    components: {
      icon: AplayerIcon,
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
          backgroundImage: `url(${this.pic})`
        }
      }
    }
  }
</script>