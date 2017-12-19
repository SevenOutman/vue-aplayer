<template>
  <div class="aplayer-bar-wrap" @click="seekProgress" ref="barWrap">
    <div class="aplayer-bar">
      <div class="aplayer-loaded" :style="{width: `${Math.trunc(loadProgress * 100)}%`}"></div>
      <div class="aplayer-played"
           :style="{width: `${Math.trunc(playProgress * 100)}%`, background: theme}"
      >
              <span
                      class="aplayer-thumb"
                      :style="{border: '1px solid', borderColor:　theme}">
              </span>
      </div>
    </div>
  </div>
</template>

<script>
  function getElementViewLeft(element) {
    let actualLeft = element.offsetLeft;
    let current = element.offsetParent;
    let elementScrollLeft;
    while (current !== null) {
      actualLeft += current.offsetLeft;
      current = current.offsetParent;
    }
    elementScrollLeft = document.body.scrollLeft + document.documentElement.scrollLeft;
    return actualLeft - elementScrollLeft;
  }

  export default {
    props: ['loadProgress', 'playProgress', 'theme'],
    methods: {
      seekProgress(e) {
        const barWidth = this.$refs.barWrap.clientWidth;
        let percentage = (e.clientX - getElementViewLeft(this.$refs.barWrap)) / barWidth;
        percentage = percentage > 0 ? percentage : 0;
        percentage = percentage < 1 ? percentage : 1;
        this.$emit('setprogress', percentage)

      }
    }
  }
</script>
