<template>
  <div id="app">
    <a href="https://github.com/SevenOutman/vue-aplayer" target="_blank" class="github-corner">
      <svg width="80" height="80" viewBox="0 0 250 250"
           style="fill:#41b883; color:#35495e; position: absolute; top: 0; border: 0; right: 0;">
        <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
        <path
          d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
          fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path>
        <path
          d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
          fill="currentColor" class="octo-body"></path>
      </svg>
    </a>
    <div class="container">
      <h1 align="center">Vue-APlayer</h1>
      <p align="center">
        <img :src="`https://img.shields.io/badge/DEMO-v${version}-41b883.svg?style=flat-square`" />
        <a href="https://www.npmjs.com/package/vue-aplayer"><img
          src="https://img.shields.io/npm/v/vue-aplayer.svg?style=flat-square" /></a>
        <a href="https://www.npmjs.com/package/vue-aplayer"><img
          src="https://img.shields.io/npm/dt/vue-aplayer.svg?style=flat-square" /></a>
        <a href="https://github.com/SevenOutman/vue-aplayer/blob/master/LICENSE"><img
          src="https://img.shields.io/npm/l/vue-aplayer.svg?style=flat-square" /></a>
      </p>
      <h3>Basic (zero config)</h3>
      <aplayer
        :music="{
          title: 'secret base~君がくれたもの~',
          artist: 'Silent Siren',
          src: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.mp3',
          pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg'
        }"
      />

      <h3>Featured</h3>
      <aplayer
        autoplay
        theme="pic"
        shuffle
        repeat="list"
        show-lrc
        :controls="controls"
        :muted.sync="muted"
        :volume.sync="volumeVal"
        :music.sync='music3'
        :list='list3'
      />
      <ul style="text-align: start">
        <li>Playlist</li>
        <li>Lyrics scroll</li>
        <li>Per-song theme & self-adapting theme</li>
        <li>HLS support</li>
        <li>External controls</li>
        <ul>
          <li>
            <a role="button" tabindex="-1" @click="muted = !muted">
              {{ muted ? 'Unmute' : 'Mute' }} player
            </a>
          </li>
          <li>Volume: <input type="number" step="0.1" min="0" max="1" v-model="volume"></li>
        </ul>
      </ul>
      <h3>Mini mode / Float mode (try dragging it around)</h3>
      <aplayer
        mini
        float
        mode="circulation"
        :music="{
          title: 'トリカゴ',
          artist: 'XX:me',
          src: 'https://moeplayer.b0.upaiyun.com/aplayer/darling.mp3',
          pic: 'https://moeplayer.b0.upaiyun.com/aplayer/darling.jpg',
        }"
      />
      <footer align="center">
        <p>Thank <a href="https://github.com/DIYgod" target="_blank">@DIYgod</a> and <a
          href="https://github.com/MoePlayer/APlayer" target="_blank">APlayer</a> for hosting demo resources</p>
      </footer>
    </div>
  </div>
</template>
<script>
  import Aplayer from '../vue-aplayer.vue'

  export default {
    name: 'App',
    components: {
      Aplayer,
    },
    computed: {
      volumeVal: {
        get () {
          return +this.volume
        },
        set (val) {
          this.volume = val
        },
      },
    },
    data () {
      return {
        version: VERSION,
        controls: false,
        volume: 1,
        muted: false,
        music3: null,
        list3: [
          {
            title: '前前前世',
            artist: 'RADWIMPS',
            src: 'https://moeplayer.b0.upaiyun.com/aplayer/yourname.mp3',
            pic: 'https://moeplayer.b0.upaiyun.com/aplayer/yourname.jpg',
            lrc: 'https://moeplayer.b0.upaiyun.com/aplayer/yourname.lrc',
          },
          {
            title: '光るなら.m3u8',
            artist: 'Goose house',
            src: 'https://moeplayer.b0.upaiyun.com/aplayer/hls/hikarunara.m3u8',
            pic: 'https://moeplayer.b0.upaiyun.com/aplayer/hikarunara.jpg',
            lrc: 'https://moeplayer.b0.upaiyun.com/aplayer/hikarunara.lrc',
          },
          {
            title: '回レ！雪月花',
            artist: '小倉唯',
            src: 'https://moeplayer.b0.upaiyun.com/aplayer/snowmoonflowers.mp3',
            pic: 'https://moeplayer.b0.upaiyun.com/aplayer/snowmoonflowers.jpg',
            lrc: 'https://moeplayer.b0.upaiyun.com/aplayer/snowmoonflowers.lrc',
          },
          {
            title: 'あっちゅ～ま青春!',
            artist: '七森中☆ごらく部',
            src: 'https://moeplayer.b0.upaiyun.com/aplayer/yuruyuri.mp3',
            pic: 'https://moeplayer.b0.upaiyun.com/aplayer/yuruyuri.jpg',
            lrc: 'https://moeplayer.b0.upaiyun.com/aplayer/yuruyuri.lrc',
          },
        ],
      }
    },
    created () {
      this.music3 = this.list3[0]
    },
  }
</script>
<style>
  body {
    font-family: Source Sans Pro, 'PingFang SC', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background: linear-gradient(135deg, rgb(65, 184, 131), rgb(74, 156, 238));
    color: #fff;
  }

  #app {
    text-align: center;
  }

  .container {
    max-width: 32rem;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50px;
    padding: 0 15px;
  }

  h1 {
    font-size: 48px;
    /*color: #41b883;*/
    margin: 30px 0 10px;
  }

  h2 {
    font-size: 22px;
    /*color: #555;*/
  }

  h3 {
    font-size: 24px;
    /*color: #555;*/
  }

  hr {
    display: block;
    width: 7rem;
    height: 1px;
    margin: 2.5rem 0;
    background-color: #eee;
    border: 0;
  }

  input {
    background-color: transparent;
    outline: none;
    border: none;
    color: inherit;
    font-size: inherit;
    text-align: center;
    border-bottom: 1px solid rgba(255, 255, 255, .5);
  }

  a {
    color: #35495e;
    text-decoration: none;
  }

  p {
    font-size: 18px;
  }

  .github-corner:hover .octo-arm {
    animation: octocat-wave 560ms ease-in-out
  }

  @keyframes octocat-wave {
    0%, 100% {
      transform: rotate(0deg)
    }
    20%, 60% {
      transform: rotate(-25deg)
    }
    40%, 80% {
      transform: rotate(10deg)
    }
  }

  @media (max-width: 500px) {
    .github-corner:hover .octo-arm {
      animation: none
    }

    .github-corner .octo-arm {
      animation: octocat-wave 560ms ease-in-out
    }
  }
</style>