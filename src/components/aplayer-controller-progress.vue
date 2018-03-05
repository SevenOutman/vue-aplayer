<template>
  <div class="aplayer-bar-wrap" @click="seekProgress" ref="barWrap">
    <div class="aplayer-bar">
      <div
        class="aplayer-loaded"
        :style="{width: `${Math.trunc(loadProgress * 100)}%`}">

      </div>
      <div
        class="aplayer-played"
        :style="{width: `${Math.trunc(playProgress * 100)}%`, background: theme}"
      >
        <span
          ref="thumb"
          @mouseover="thumbHovered = true"
          @mouseout="thumbHovered = false"
          @mousedown="onThumbMouseDown"
          class="aplayer-thumb"
          :style="{border: '1px solid', borderColor:　theme, backgroundColor: thumbHovered ? theme : '#fff'}"
        >
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  function getElementViewLeft (element) {
    let actualLeft = element.offsetLeft
    let current = element.offsetParent
    let elementScrollLeft
    while (current !== null) {
      actualLeft += current.offsetLeft
      current = current.offsetParent
    }
    elementScrollLeft = document.body.scrollLeft + document.documentElement.scrollLeft
    return actualLeft - elementScrollLeft
  }

  export default {
    props: ['loadProgress', 'playProgress', 'theme'],
    data () {
      return {
        thumbHovered: false,
      }
    },
    methods: {
      seekProgress (e) {
        const barWidth = this.$refs.barWrap.clientWidth
        let percentage = (e.clientX - getElementViewLeft(this.$refs.barWrap)) / barWidth
        percentage = percentage > 0 ? percentage : 0
        percentage = percentage < 1 ? percentage : 1
        this.$emit('setprogress', percentage)
      },
      onThumbMouseDown () {
        this.$emit('dragbegin')
        document.addEventListener('mousemove', this.onDocumentMouseMove)
        document.addEventListener('mouseup', this.onDocumentMouseUp)
      },
      onDocumentMouseMove (e) {
        const barWidth = this.$refs.barWrap.clientWidth
        let percentage = (e.clientX - getElementViewLeft(this.$refs.barWrap)) / barWidth
        percentage = percentage > 0 ? percentage : 0
        percentage = percentage < 1 ? percentage : 1
        // if (this.option.showlrc) {
        //   this.updateLrc(parseFloat(bar.playedBar.style.width) / 100 * this.audio.duration);
        // }
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
    },
  }
</script>
