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
      />
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
      currentPicStyleObj () {
        if (!this.pic) return {}
        return {
          backgroundImage: `url(${this.pic})`,
        }
      },
    },
  }
</script>

<style lang="scss">
  @import "../scss/variables";

  .aplayer-pic {
    position: relative;
    float: left;
    height: $aplayer-height;
    width: $aplayer-height;
    background-image: url(../default.jpg);
    background-size: cover;
    transition: all 0.3s ease;

    .aplayer-button {
      position: absolute;
      border-radius: 50%;
      opacity: 0.8;
      cursor: pointer;
      text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
      background: rgba(0, 0, 0, 0.2);
      transition: all 0.1s ease;
      &:hover {
        opacity: 1;
      }

      .aplayer-fill {
        fill: #fff;
      }
    }

    .aplayer-hide {
      display: none;
    }

    .aplayer-play {
      width: 26px;
      height: 26px;
      border: 2px solid #fff;
      bottom: 50%;
      right: 50%;
      margin: 0 -15px -15px 0;
      .aplayer-icon-play {
        position: absolute;
        top: 3px;
        left: 4px;
        height: 20px;
        width: 20px;
      }
    }

    .aplayer-pause {
      width: 16px;
      height: 16px;
      border: 2px solid #fff;
      bottom: 4px;
      right: 4px;
      .aplayer-icon-pause {
        position: absolute;
        top: 2px;
        left: 2px;
        height: 12px;
        width: 12px;
      }
    }
  }

</style>