<template>
  <div
    class="aplayer-bar-wrap"
    @mousedown="onThumbMouseDown"
    @touchstart="onThumbTouchStart"
    ref="barWrap"
  >
    <div class="aplayer-bar">
      <div
        class="aplayer-loaded"
        :style="{width: `${loadProgress * 100}%`}">
      </div>
      <div
        class="aplayer-played"
        :style="{width: `${playProgress * 100}%`, background: theme}"
      >
        <span
          ref="thumb"
          @mouseover="thumbHovered = true"
          @mouseout="thumbHovered = false"
          class="aplayer-thumb"
          :style="{border: '1px solid', borderColor:　theme, backgroundColor: thumbHovered ? theme : '#fff'}"
        >
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import {getElementViewLeft} from '../utils'

  export default {
    props: ['loadProgress', 'playProgress', 'theme'],
    data () {
      return {
        thumbHovered: false,
      }
    },
    methods: {
      onThumbMouseDown (e) {
        const barWidth = this.$refs.barWrap.clientWidth
        let percentage = (e.clientX - getElementViewLeft(this.$refs.barWrap)) / barWidth
        percentage = percentage > 0 ? percentage : 0
        percentage = percentage < 1 ? percentage : 1

        this.$emit('dragbegin', percentage)
        document.addEventListener('mousemove', this.onDocumentMouseMove)
        document.addEventListener('mouseup', this.onDocumentMouseUp)
      },
      onDocumentMouseMove (e) {
        const barWidth = this.$refs.barWrap.clientWidth
        let percentage = (e.clientX - getElementViewLeft(this.$refs.barWrap)) / barWidth
        percentage = percentage > 0 ? percentage : 0
        percentage = percentage < 1 ? percentage : 1

        this.$emit('dragging', percentage)
      },
      onDocumentMouseUp (e) {
        document.removeEventListener('mouseup', this.onDocumentMouseUp)
        document.removeEventListener('mousemove', this.onDocumentMouseMove)

        const barWidth = this.$refs.barWrap.clientWidth
        let percentage = (e.clientX - getElementViewLeft(this.$refs.barWrap)) / barWidth
        percentage = percentage > 0 ? percentage : 0
        percentage = percentage < 1 ? percentage : 1
        this.$emit('dragend', percentage)
      },
      onThumbTouchStart (e) {
        const barWidth = this.$refs.barWrap.clientWidth
        let percentage = (e.clientX - getElementViewLeft(this.$refs.barWrap)) / barWidth
        percentage = percentage > 0 ? percentage : 0
        percentage = percentage < 1 ? percentage : 1

        this.$emit('dragbegin', percentage)
        document.addEventListener('touchmove', this.onDocumentTouchMove)
        document.addEventListener('touchend', this.onDocumentTouchEnd)
      },
      onDocumentTouchMove (e) {
        const touch = e.changedTouches[0]
        const barWidth = this.$refs.barWrap.clientWidth
        let percentage = (touch.clientX - getElementViewLeft(this.$refs.barWrap)) / barWidth
        percentage = percentage > 0 ? percentage : 0
        percentage = percentage < 1 ? percentage : 1

        this.$emit('dragging', percentage)
      },
      onDocumentTouchEnd (e) {
        document.removeEventListener('touchend', this.onDocumentTouchEnd)
        document.removeEventListener('touchmove', this.onDocumentTouchMove)

        const touch = e.changedTouches[0]
        const barWidth = this.$refs.barWrap.clientWidth
        let percentage = (touch.clientX - getElementViewLeft(this.$refs.barWrap)) / barWidth
        percentage = percentage > 0 ? percentage : 0
        percentage = percentage < 1 ? percentage : 1
        this.$emit('dragend', percentage)
      },
    },
  }
</script>
