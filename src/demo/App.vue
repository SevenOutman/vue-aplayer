<template>
  <div id="app">
    <div class="container">
      <h1 align="center">Vue-APlayer</h1>
      <p align="center">
        <img :src="`https://img.shields.io/badge/DEMO-v${version}-41b883.svg?style=flat-square`"/>
        <a href="https://www.npmjs.com/package/vue-aplayer"><img
          src="https://img.shields.io/npm/v/vue-aplayer.svg?style=flat-square"/></a>
        <a href="https://www.npmjs.com/package/vue-aplayer"><img
          src="https://img.shields.io/npm/dt/vue-aplayer.svg?style=flat-square"/></a>
      </p>
      <p>
        <a href="https://github.com/SevenOutman/vue-aplayer/commits/develop">
          <img src="https://img.shields.io/github/commit-activity/y/SevenOutman/vue-aplayer.svg?style=flat-square">
        </a>
        <a href="https://github.com/SevenOutman/vue-aplayer/commits/develop">
          <img src="https://img.shields.io/github/last-commit/SevenOutman/vue-aplayer/develop.svg?style=flat-square">
        </a>
        <a href="https://github.com/SevenOutman/vue-aplayer/blob/master/LICENSE"><img
          src="https://img.shields.io/npm/l/vue-aplayer.svg?style=flat-square"/></a>
      </p>
      <h3>Basic (zero config)</h3>
      <aplayer
        :music="{
          title: 'secret base~君がくれたもの~',
          artist: 'Silent Siren',
          src: 'https://cn-east-17-aplayer-35525609.oss.dogecdn.com/secretbase.mp3',
          pic: 'https://cn-east-17-aplayer-35525609.oss.dogecdn.com/secretbase.jpg'
        }"
      />

      <h3>Featured</h3>
      <aplayer
        autoplay
        theme="pic"
        shuffle
        repeat="list"
        show-lrc
        :muted.sync="muted"
        :volume.sync="volume"
        :music='list3[0]'
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
          <li>Volume: <input type="number" step="0.1" min="0" max="1" v-model.number="volume"></li>
        </ul>
      </ul>
      <h3>Mini mode / Float mode (try dragging it around)</h3>
      <aplayer
        mini
        float
        :music="{
          title: 'トリカゴ',
          artist: 'XX:me',
          src: 'https://cn-east-17-aplayer-35525609.oss.dogecdn.com/darling.mp3',
          pic: 'https://cn-east-17-aplayer-35525609.oss.dogecdn.com/darling.jpg',
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
    data () {
      return {
        version: VERSION,
        volume: 1,
        muted: false,
        music3: null,
        list3: [
          {
            title: '前前前世',
            artist: 'RADWIMPS',
            src: 'https://cn-east-17-aplayer-35525609.oss.dogecdn.com/yourname.mp3',
            pic: 'https://cn-east-17-aplayer-35525609.oss.dogecdn.com/yourname.jpg',
            lrc: 'https://cn-east-17-aplayer-35525609.oss.dogecdn.com/yourname.lrc',
          },
          {
            title: '光るなら.m3u8',
            artist: 'Goose house',
            src: 'https://cn-east-17-aplayer-35525609.oss.dogecdn.com/hls/hikarunara.m3u8',
            pic: 'https://cn-east-17-aplayer-35525609.oss.dogecdn.com/hikarunara.jpg',
            lrc: 'https://cn-east-17-aplayer-35525609.oss.dogecdn.com/hikarunara.lrc',
          },
          {
            title: '回レ！雪月花',
            artist: '小倉唯',
            src: 'https://cn-east-17-aplayer-35525609.oss.dogecdn.com/snowmoonflowers.mp3',
            pic: 'https://cn-east-17-aplayer-35525609.oss.dogecdn.com/snowmoonflowers.jpg',
            lrc: 'https://cn-east-17-aplayer-35525609.oss.dogecdn.com/snowmoonflowers.lrc',
          },
          {
            title: 'あっちゅ～ま青春!',
            artist: '七森中☆ごらく部',
            src: 'https://cn-east-17-aplayer-35525609.oss.dogecdn.com/yuruyuri.mp3',
            pic: 'https://cn-east-17-aplayer-35525609.oss.dogecdn.com/yuruyuri.jpg',
            lrc: 'https://cn-east-17-aplayer-35525609.oss.dogecdn.com/yuruyuri.lrc',
          },
        ],
      }
    }
  }
</script>
<style>
  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  body {
    font-family: Source Sans Pro, 'PingFang SC', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background: linear-gradient(135deg, rgb(65, 184, 131), rgb(74, 156, 238));
    color: #fff;
    overflow-y: auto;
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
    margin: 30px 0 10px;
  }

  h3 {
    font-size: 24px;
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
</style>