<template>
  <svg xmlns:xlink="http://www.w3.org/1999/xlink" height="100%" version="1.1" :viewBox="svg.viewBox" width="100%"
       :style="style">
    <use xlink:href="#aplayer-${type}"></use>
    <path class="aplayer-fill" :d="svg.d"></path>
  </svg>
</template>

<script>
  const requireAssets = require.context('../assets', false, /\.svg$/)
  const SVGs = requireAssets.keys().reduce((svgs, path) => {
    const inlineSvg = requireAssets(path)
    const [raw, viewBox, d] = inlineSvg.match(/^<svg.+?viewBox="(.+?)".*><path.+?d="(.+?)".*><\/path><\/svg>$/)

    svgs[path.match(/^.*\/(.+?)\.svg$/)[1]] = {
      viewBox,
      d
    }
    return svgs
  }, {})

  export default {
    props: ['type'],
    computed: {
      svg () {
        let icon = this.type
        if (this.type === 'prev' || this.type === 'next') {
          icon = 'skip'
        }
        return SVGs[this.type] || {}
      },
      style () {
        if (this.type === 'next') {
          return {
            transform: 'rotate(180deg)',
          }
        }
      }
    }
  }
</script>