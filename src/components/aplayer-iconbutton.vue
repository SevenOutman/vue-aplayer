<template>
  <button
          type="button"
          class="aplayer-icon"
  >
    <icon :type="icon"/>
  </button>
</template>

<script>
  import Icon from './aplayer-icon.vue'

  export default {
    components: {
      Icon,
    },
    props: ['icon'],
  }
</script>
