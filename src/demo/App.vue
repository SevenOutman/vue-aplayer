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
          title: '(Maria)',
          artist: '华莎',
          src: 'http://antiserver.kuwo.cn/anti.s?useless=/resource/&format=mp3&rid=MUSIC_145557417&response=res&type=convert_url',
          pic: 'http://y.qq.com/music/photo_new/T001R150x150M000001HBhty3s7aog.jpg?max_age=2592000'
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
          title: '兰亭序',
          artist: '周杰伦',
          src: 'http://antiserver.kuwo.cn/anti.s?useless=/resource/&format=mp3&response=res&type=convert_url&rid=MUSIC_118980',
          pic: 'http://img4.kuwo.cn/star/starheads/120/4/80a74b254395e7d786fdc3f68703377_0.jpg',
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
            title: '晴天',
            artist: '周杰伦',
            src: 'http://antiserver.kuwo.cn/anti.s?useless=/resource/&format=mp3&rid=MUSIC_228908&response=res&type=convert_url',
            pic: 'http://img4.kuwo.cn/star/starheads/120/4/80a74b254395e7d786fdc3f68703377_0.jpg',
            lrc: '[00:0.0]\u6674\u5929 - \u5468\u6770\u4f26 (Jay Chou)\r\n[00:7.34]\u8bcd\uff1a\u5468\u6770\u4f26\r\n[00:14.69]\u66f2\uff1a\u5468\u6770\u4f26\r\n[00:22.04]\u7f16\u66f2\uff1a\u5468\u6770\u4f26\r\n[00:29.39]\u6545\u4e8b\u7684\u5c0f\u9ec4\u82b1\r\n[00:32.64]\u4ece\u51fa\u751f\u90a3\u5e74\u5c31\u98d8\u7740\r\n[00:36.19]\u7ae5\u5e74\u7684\u8361\u79cb\u5343\r\n[00:39.93]\u968f\u8bb0\u5fc6\u4e00\u76f4\u6643\u5230\u73b0\u5728\r\n[00:42.99]Re So So Si Do Si La \r\n[00:46.11]So La Si Si Si Si La Si La So \r\n[00:49.79]\u5439\u7740\u524d\u594f\u671b\u7740\u5929\u7a7a\r\n[00:53.35]\u6211\u60f3\u8d77\u82b1\u74e3\u8bd5\u7740\u6389\u843d\r\n[00:56.78]\u4e3a\u4f60\u7fd8\u8bfe\u7684\u90a3\u4e00\u5929\r\n[00:59.03]\u82b1\u843d\u7684\u90a3\u4e00\u5929\r\n[01:01.08]\u6559\u5ba4\u7684\u90a3\u4e00\u95f4\r\n[01:03.68]\u6211\u600e\u4e48\u770b\u4e0d\u89c1\r\n[01:06.7]\u6d88\u5931\u7684\u4e0b\u96e8\u5929\r\n[01:09.52]\u6211\u597d\u60f3\u518d\u6dcb\u4e00\u904d\r\n[01:16.58]\u6ca1\u60f3\u5230\u5931\u53bb\u7684\u52c7\u6c14\u6211\u8fd8\u7559\u7740\r\n[01:26.88]\u597d\u60f3\u518d\u95ee\u4e00\u904d\r\n[01:29.78]\u4f60\u4f1a\u7b49\u5f85\u8fd8\u662f\u79bb\u5f00\r\n[01:41.23]\u522e\u98ce\u8fd9\u5929\u6211\u8bd5\u8fc7\u63e1\u7740\u4f60\u624b\r\n[01:50.7]\u4f46\u504f\u504f\u96e8\u6e10\u6e10\u5927\u5230\u6211\u770b\u4f60\u4e0d\u89c1\r\n[01:64.73]\u8fd8\u8981\u591a\u4e45\u6211\u624d\u80fd\u5728\u4f60\u8eab\u8fb9\r\n[01:75.67]\u7b49\u5230\u653e\u6674\u7684\u90a3\u5929\u4e5f\u8bb8\u6211\u4f1a\u6bd4\u8f83\u597d\u4e00\u70b9\r\n[01:87.93]\u4ece\u524d\u4ece\u524d\u6709\u4e2a\u4eba\u7231\u4f60\u5f88\u4e45\r\n[01:97.5]\u4f46\u504f\u504f\u98ce\u6e10\u6e10\u628a\u8ddd\u79bb\u5439\u5f97\u597d\u8fdc\r\n[02:11.23]\u597d\u4e0d\u5bb9\u6613\u53c8\u80fd\u518d\u591a\u7231\u4e00\u5929\r\n[02:22.25]\u4f46\u6545\u4e8b\u7684\u6700\u540e\u4f60\u597d\u50cf\u8fd8\u662f\u8bf4\u4e86\u62dc\u62dc\r\n[02:58.33]\u4e3a\u4f60\u7fd8\u8bfe\u7684\u90a3\u4e00\u5929\r\n[02:61.25]\u82b1\u843d\u7684\u90a3\u4e00\u5929\r\n[02:64.38]\u6559\u5ba4\u7684\u90a3\u4e00\u95f4\r\n[02:67.18]\u6211\u600e\u4e48\u770b\u4e0d\u89c1\r\n[02:70.08]\u6d88\u5931\u7684\u4e0b\u96e8\u5929\r\n[02:72.9]\u6211\u597d\u60f3\u518d\u6dcb\u4e00\u904d\r\n[02:79.97]\u6ca1\u60f3\u5230\u5931\u53bb\u7684\u52c7\u6c14\u6211\u8fd8\u7559\u7740\r\n[02:90.88]\u597d\u60f3\u518d\u95ee\u4e00\u904d\r\n[02:93.28]\u4f60\u4f1a\u7b49\u5f85\u8fd8\u662f\u79bb\u5f00\r\n[03:04.62]\u522e\u98ce\u8fd9\u5929\u6211\u8bd5\u8fc7\u63e1\u7740\u4f60\u624b\r\n[03:14.08]\u4f46\u504f\u504f\u96e8\u6e10\u6e10\u5927\u5230\u6211\u770b\u4f60\u4e0d\u89c1\r\n[03:28.12]\u8fd8\u8981\u591a\u4e45\u6211\u624d\u80fd\u5728\u4f60\u8eab\u8fb9\r\n[03:39.15]\u7b49\u5230\u653e\u6674\u7684\u90a3\u5929\u4e5f\u8bb8\u6211\u4f1a\u6bd4\u8f83\u597d\u4e00\u70b9\r\n[03:51.52]\u4ece\u524d\u4ece\u524d\u6709\u4e2a\u4eba\u7231\u4f60\u5f88\u4e45\r\n[03:61.72]\u504f\u504f\u98ce\u6e10\u6e10\u628a\u8ddd\u79bb\u5439\u5f97\u597d\u8fdc\r\n[03:74.62]\u597d\u4e0d\u5bb9\u6613\u53c8\u80fd\u518d\u591a\u7231\u4e00\u5929\r\n[03:85.12]\u4f46\u6545\u4e8b\u7684\u6700\u540e\u4f60\u597d\u50cf\u8fd8\u662f\u8bf4\u4e86\u62dc\u62dc\r\n[03:99.37]\u522e\u98ce\u8fd9\u5929\u6211\u8bd5\u8fc7\u63e1\u7740\u4f60\u624b\r\n[04:03.42]\u4f46\u504f\u504f\u96e8\u6e10\u6e10\u5927\u5230\u6211\u770b\u4f60\u4e0d\u89c1\r\n[04:09.07]\u8fd8\u8981\u591a\u4e45\u6211\u624d\u80fd\u591f\u5728\u4f60\u8eab\u8fb9\r\n[04:14.98]\u7b49\u5230\u653e\u6674\u90a3\u5929\u4e5f\u8bb8\u6211\u4f1a\u6bd4\u8f83\u597d\u4e00\u70b9\r\n[04:21.43]\u4ece\u524d\u4ece\u524d\u6709\u4e2a\u4eba\u7231\u4f60\u5f88\u4e45\r\n[04:26.43]\u4f46\u504f\u504f\u96e8\u6e10\u6e10\u628a\u8ddd\u79bb\u5439\u5f97\u597d\u8fdc\r\n[04:32.15]\u597d\u4e0d\u5bb9\u6613\u53c8\u80fd\u518d\u591a\u7231\u4e00\u5929\r\n[04:37.98]\u4f46\u6545\u4e8b\u7684\u6700\u540e\u4f60\u597d\u50cf\u8fd8\u662f\u8bf4\u4e86\u62dc',
          },
          {
            title: '兰亭序',
            artist: '周杰伦',
            src: 'http://antiserver.kuwo.cn/anti.s?useless=/resource/&format=mp3&response=res&type=convert_url&rid=MUSIC_440616',
            pic: 'http://img4.kuwo.cn/star/starheads/120/4/80a74b254395e7d786fdc3f68703377_0.jpg',
            lrc: '[00:00]\u6682\u65e0\u6b4c\u8bcd'
          },
          {
            title: '告白气球',
            artist: '周杰伦',
            src: 'http://antiserver.kuwo.cn/anti.s?useless=/resource/&format=mp3&rid=MUSIC_7149583&response=res&type=convert_url',
            pic: 'http://img4.kuwo.cn/star/starheads/120/4/80a74b254395e7d786fdc3f68703377_0.jpg',
            lrc: '[00:0.73]\u544a\u767d\u6c14\u7403 - \u5468\u6770\u4f26\n[00:3.17]\u8bcd\uff1a\u65b9\u6587\u5c71\n[00:5.03]\u66f2\uff1a\u5468\u6770\u4f26\n[00:23.56]\u585e\u7eb3\u6cb3\u7554  \u5de6\u5cb8\u7684\u5496\u5561\n[00:26.28]\u6211\u624b\u4e00\u676f  \u54c1\u5c1d\u4f60\u7684\u7f8e\n[00:29.27]\u7559\u4e0b\u5507\u5370\u7684\u5634\n[00:34.08]\u82b1\u5e97\u73ab\u7470  \u540d\u5b57\u5199\u9519\u8c01\n[00:36.8]\u544a\u767d\u6c14\u7403  \u98ce\u5439\u5230\u5bf9\u8857\n[00:39.86]\u5fae\u7b11\u5728\u5929\u4e0a\u98de\n[00:44.03]\u4f60\u8bf4\u4f60\u6709\u70b9\u96be\u8ffd\n[00:46.66]\u60f3\u8ba9\u6211\u77e5\u96be\u800c\u9000\n[00:49.32]\u793c\u7269\u4e0d\u9700\u6311\u6700\u8d35\n[00:51.53]\u53ea\u8981\u9999\u69ad\u7684\u843d\u53f6\n[00:54.48]\u5594\uff5e\u8425\u9020\u6d6a\u6f2b\u7684\u7ea6\u4f1a\n[00:56.81]\u4e0d\u5bb3\u6015\u641e\u7838\u4e00\u5207\n[00:59.56]\u62e5\u6709\u4f60\u5c31\u62e5\u6709  \u5168\u4e16\u754c\n[01:08.23]\u4eb2\u7231\u7684  \u7231\u4e0a\u4f60  \u4ece\u90a3\u5929\u8d77\n[01:18.82]\u751c\u871c\u7684\u5f88\u8f7b\u6613\n[01:26.02]\u4eb2\u7231\u7684  \u522b\u4efb\u6027  \u4f60\u7684\u773c\u775b\n[01:36.67]\u5728\u8bf4\u6211\u613f\u610f\n[01:81.3]\u585e\u7eb3\u6cb3\u7554  \u5de6\u5cb8\u7684\u5496\u5561\n[01:85.72]\u6211\u624b\u4e00\u676f  \u54c1\u5c1d\u4f60\u7684\u7f8e\n[01:91.35]\u7559\u4e0b\u5507\u5370\u7684\u5634\n[01:99.05]\u82b1\u5e97\u73ab\u7470  \u540d\u5b57\u5199\u9519\u8c01\n[02:03.35]\u544a\u767d\u6c14\u7403  \u98ce\u5439\u5230\u5bf9\u8857\n[02:08.68]\u5fae\u7b11\u5728\u5929\u4e0a\u98de\n[02:15.57]\u4f60\u8bf4\u4f60\u6709\u70b9\u96be\u8ffd\n[02:19.53]\u60f3\u8ba9\u6211\u77e5\u96be\u800c\u9000\n[02:23.88]\u793c\u7269\u4e0d\u9700\u6311\u6700\u8d35\n[02:28.12]\u53ea\u8981\u9999\u69ad\u7684\u843d\u53f6\n[02:32.68]\u5594\uff5e\u8425\u9020\u6d6a\u6f2b\u7684\u7ea6\u4f1a\n[02:36.92]\u4e0d\u5bb3\u6015\u641e\u7838\u4e00\u5207\n[02:41.53]\u62e5\u6709\u4f60\u5c31\u62e5\u6709  \u5168\u4e16\u754c\n[02:50.4]\u4eb2\u7231\u7684  \u7231\u4e0a\u4f60  \u4ece\u90a3\u5929\u8d77\n[02:61.22]\u751c\u871c\u7684\u5f88\u8f7b\u6613\n[02:68.22]\u4eb2\u7231\u7684  \u522b\u4efb\u6027  \u4f60\u7684\u773c\u775b\n[02:78.9]\u5728\u8bf4\u6211\u613f\u610f\n[02:86.02]\u4eb2\u7231\u7684  \u7231\u4e0a\u4f60  \u604b\u7231\u65e5\u8bb0\n[02:96.87]\u98d8\u9999\u6c34\u7684\u56de\u5fc6\n[03:03.82]\u4e00\u6574\u74f6  \u7684\u68a6\u5883  \u5168\u90fd\u6709\u4f60\n[03:14.73]\u6405\u62cc\u5728\u4e00\u8d77\n[03:21.42]\u4eb2\u7231\u7684\u522b\u4efb\u6027  \u4f60\u7684\u773c\u775b\n[03:35.28]\u5728\u8bf4\u6211\u613f\u610f\n',
          },
          {
            title: '夜曲',
            artist: '周杰伦',
            src: 'http://antiserver.kuwo.cn/anti.s?useless=/resource/&format=mp3&response=res&type=convert_url&rid=MUSIC_118980',
            pic: 'http://img4.kuwo.cn/star/starheads/120/4/80a74b254395e7d786fdc3f68703377_0.jpg',
            lrc: '[00:00]\u6682\u65e0\u6b4c\u8bcd',
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