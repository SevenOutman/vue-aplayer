<template>
  <div id="app">
    <a href="https://github.com/SevenOutman/vue-aplayer" target="_blank" class="github-corner">
      <svg width="80" height="80" viewBox="0 0 250 250"
           style="fill:#39AF78; color:#2F4053; position: absolute; top: 0; border: 0; right: 0;">
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
      <h1>Vue-APlayer</h1>
      <h2>A Vue 2.x implementation of <a href="https://github.com/MoePlayer/APlayer" target="_blank">APlayer</a></h2>
      <p>
        <a href="https://www.npmjs.com/package/vue-aplayer"><img
          src="https://img.shields.io/npm/v/vue-aplayer.svg?style=flat-square"/></a>
        <a href="https://david-dm.org/SevenOutman/vue-aplayer#info=devDependencies"><img
          src="https://img.shields.io/david/dev/SevenOutman/vue-aplayer.svg?style=flat-square"/></a>
        <a href="https://www.npmjs.com/package/vue-aplayer"><img
          src="https://img.shields.io/npm/dt/vue-aplayer.svg?style=flat-square"/></a>
        <a href="https://github.com/SevenOutman/vue-aplayer/blob/master/LICENSE"><img
          src="https://img.shields.io/npm/l/vue-aplayer.svg?style=flat-square"/></a>
      </p>
      <p>View on <a href="https://github.com/SevenOutman/vue-aplayer" target="_blank">GitHub</a></p>
      <hr>
      <h3>Normal</h3>
      <aplayer
        autoplay
        mutex
        theme="#42b983"
        preload="metadata"
        mode="circulation"
        :music="{
                    title: 'secret base~君がくれたもの~',
                    author: 'Silent Siren',
                    url: 'https://storage.googleapis.com/gh-pages-static/secretbase.mp3',
                    pic: 'https://p3.music.126.net/HJYMPi7BLKFfSvA2T3OUmg==/3316127069531628.jpg?param=90y90'
                }"
      />

      <h3>With lyrics</h3>
      <aplayer
        mutex
        theme="rgb(173, 122, 134)"
        showlrc
        mode="circulation"
        :music="{
                title: 'Another Love',
                author: 'Tom Odell',
                url: 'https://storage.googleapis.com/gh-pages-static/anotherlove.mp3',
                pic: 'https://y.gtimg.cn/music/photo_new/T002R90x90M000002sJhjf0PwjRN.jpg?max_age=2592000',
                lrc: 'https://storage.googleapis.com/gh-pages-static/anotherlove.lrc'
            }"/>
      <h3>With playlist</h3>
      <aplayer
        mutex
        theme="#e6d0b2"
        mode="random"
        :music.sync='music3'
        :list='list3'
        list-max-height="80px"
      />
      <h3>Mini Mode</h3>
      <aplayer
        mini
        mutex
        theme="#e6d0b2"
        mode="circulation"
        :music="{
                    title: 'secret base~君がくれたもの~',
                    author: 'Silent Siren',
                    url: 'https://storage.googleapis.com/gh-pages-static/secretbase.mp3',
                    pic: 'https://p3.music.126.net/HJYMPi7BLKFfSvA2T3OUmg==/3316127069531628.jpg?param=90y90'
                }"
      />
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
        music3: null,
        list3: [
          {
            title: 'secret base~君がくれたもの~',
            author: 'Silent Siren',
            url: 'https://storage.googleapis.com/gh-pages-static/secretbase.mp3',
            pic: 'https://p3.music.126.net/HJYMPi7BLKFfSvA2T3OUmg==/3316127069531628.jpg?param=90y90'
          },
          {
            'title': 'Prelude (VIP Edit)',
            'author': 'TheFatRat',
            'url': 'https:\/\/p2.music.126.net\/76dIbScfeWMw_HFlsV0-vQ==\/18678503534751351.mp3',
            'pic': 'https:\/\/p3.music.126.net\/2G40ihs8ysucvUI2GkeTlQ==\/3262251007253950.jpg?param=130y130'
          },
          {
            'title': 'Monody (Radio Edit)',
            'author': 'TheFatRat',
            'url': 'https:\/\/p2.music.126.net\/aNplYKQGtlWgDIgqU1KI6Q==\/18738976673665483.mp3',
            'pic': 'https:\/\/p3.music.126.net\/2G40ihs8ysucvUI2GkeTlQ==\/3262251007253950.jpg?param=130y130'
          },
          {
            'title': 'Jackpot',
            'author': 'TheFatRat',
            'url': 'https:\/\/p2.music.126.net\/Ah9t98gNkEvh_D9_mLwOWw==\/2946691245626258.mp3',
            'pic': 'https:\/\/p3.music.126.net\/2G40ihs8ysucvUI2GkeTlQ==\/3262251007253950.jpg?param=130y130'
          },
          {
            'title': 'Unity',
            'author': 'TheFatRat',
            'url': 'https:\/\/p2.music.126.net\/Nqpswgs943Uf8RKxe6QFow==\/6642149744285980.mp3',
            'pic': 'https:\/\/p3.music.126.net\/2G40ihs8ysucvUI2GkeTlQ==\/3262251007253950.jpg?param=130y130'
          },
        ]
      }
    },
    created () {
      this.music3 = this.list3[0]
    }
  }
</script>
<style>
  body {
    font-family: Source Sans Pro, 'PingFang SC', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  .container {
    max-width: 32rem;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50px;
  }

  h1 {
    font-size: 54px;
    color: #42b983;
    margin: 30px 0 10px;
  }

  h2 {
    font-size: 22px;
    color: #555;
  }

  h3 {
    font-size: 24px;
    color: #555;
  }

  hr {
    display: block;
    width: 7rem;
    height: 1px;
    margin: 2.5rem 0;
    background-color: #eee;
    border: 0;
  }

  a {
    color: #42b983;
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