<template>
  <div class="aplayer-volume-wrap">
    <icon-button
      v-if="!$parent.$parent.isMobile"
      :class="`aplayer-icon-${volumeIcon}`"
      :icon="volumeIcon"
      @click.native="$emit('togglemute')"
    />
    <div class="aplayer-volume-bar-wrap" @click="adjustVolume">
      <div class="aplayer-volume-bar" ref="volumeBarWrap">
        <div
          class="aplayer-volume"
          :style="{
                  height: muted ? 0 : `${Math.trunc(volume * 100)}%`,
                  background: theme
                }">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import IconButton from './aplayer-iconbutton.vue'

  function getElementViewTop (element) {
    let actualTop = element.offsetTop
    let current = element.offsetParent
    let elementScrollTop
    while (current !== null) {
      actualTop += current.offsetTop
      current = current.offsetParent
    }
    elementScrollTop = document.body.scrollTop + document.documentElement.scrollTop
    return actualTop - elementScrollTop
  }

  export default {
    components: {
      IconButton,
    },
    props: ['volume', 'muted', 'theme'],
    computed: {
      volumeIcon () {
        if (this.muted || this.volume <= 0) return 'volume-off'
        if (this.volume >= 1) return 'volume-up'
        return 'volume-down'
      },
    },
    methods: {
      adjustVolume (e) {
        const barHeight = 35

        let percentage = (barHeight - e.clientY + getElementViewTop(this.$refs.volumeBarWrap)) / barHeight
        percentage = percentage > 0 ? percentage : 0
        percentage = percentage < 1 ? percentage : 1
        this.$emit('setvolume', percentage)
      }
    }
  }
</script>
