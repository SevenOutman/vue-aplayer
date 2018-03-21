<template>
  <div class="aplayer-volume-wrap">
    <icon-button
      v-if="!$parent.$parent.isMobile"
      :class="`aplayer-icon-${volumeIcon}`"
      :icon="volumeIcon"
      @click.native="$emit('togglemute')"
    />
    <div
      class="aplayer-volume-bar-wrap"
      @mousedown="onBarMouseDown"
      @touchstart="onBarTouchStart"
    >
      <div class="aplayer-volume-bar" ref="bar">
        <div
          class="aplayer-volume"
          :style="{
            height: muted ? 0 : `${Math.trunc(volume * 100)}%`,
            background: theme
          }"
        >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import IconButton from './aplayer-iconbutton.vue'
  import {getElementViewTop} from '../utils'

  const barHeight = 40

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
        let percentage = (barHeight - e.clientY + getElementViewTop(this.$refs.bar)) / barHeight
        percentage = percentage > 0 ? percentage : 0
        percentage = percentage < 1 ? percentage : 1
        this.$emit('setvolume', percentage)
      },
      onBarMouseDown () {
        document.addEventListener('mousemove', this.onDocumentMouseMove)
        document.addEventListener('mouseup', this.onDocumentMouseUp)
      },
      onDocumentMouseMove (e) {
        let percentage = (barHeight - e.clientY + getElementViewTop(this.$refs.bar)) / barHeight
        percentage = percentage > 0 ? percentage : 0
        percentage = percentage < 1 ? percentage : 1
        this.$emit('setvolume', percentage)
      },
      onDocumentMouseUp (e) {
        document.removeEventListener('mouseup', this.onDocumentMouseUp)
        document.removeEventListener('mousemove', this.onDocumentMouseMove)

        let percentage = (barHeight - e.clientY + getElementViewTop(this.$refs.bar)) / barHeight
        percentage = percentage > 0 ? percentage : 0
        percentage = percentage < 1 ? percentage : 1
        this.$emit('setvolume', percentage)
      },
      onBarTouchStart () {
        this.$emit('dragbegin')
        document.addEventListener('touchmove', this.onDocumentTouchMove)
        document.addEventListener('touchend', this.onDocumentTouchEnd)
      },
      onDocumentTouchMove (e) {
        const touch = e.changedTouches[0]

        let percentage = (barHeight - touch.clientY + getElementViewTop(this.$refs.bar)) / barHeight
        percentage = percentage > 0 ? percentage : 0
        percentage = percentage < 1 ? percentage : 1
        this.$emit('setvolume', percentage)
      },
      onDocumentTouchEnd (e) {
        document.removeEventListener('touchend', this.onDocumentTouchEnd)
        document.removeEventListener('touchmove', this.onDocumentTouchMove)

        const touch = e.changedTouches[0]
        let percentage = (barHeight - touch.clientY + getElementViewTop(this.$refs.bar)) / barHeight
        percentage = percentage > 0 ? percentage : 0
        percentage = percentage < 1 ? percentage : 1
        this.$emit('setvolume', percentage)
      },
    }
  }
</script>
