# vue-aplayer
A Vue 2.x component of easy-to-config music players with controls.

### Introduction

[Demo](https://sevenoutman.github.io/vue-aplayer/demo)

This component is a wrapper for [APlayer](https://github.com/DIYgod/APlayer).

Screenshot

![image](https://i.imgur.com/JDrJXCr.png)

## Install

```
$ npm install vue-aplayer --save
```

## Usage

```HTML
<a-player autoplay :music="{
  title: 'Preparation',
  author: 'Hans Zimmer/Richard Harvey',
  url: 'http://devtest.qiniudn.com/Preparation.mp3',
  pic: 'http://devtest.qiniudn.com/Preparation.jpg',
  lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
}"></a-player>
```

```JS
// ES6
import VueAplayer from 'vue-aplayer'

new Vue({
    components: {
        'a-player': VueAplayer
    }
})
```

#### Props

Props are mostly the same as [Aplayer's options](https://github.com/DIYgod/APlayer#options).

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| narrow | Boolean | false | narrow style |
| autoplay | Boolean | false | autoplay song(s), not supported by mobile browsers |
| showlrc | Number | 0 | show lrc, can be 0, 1, 2, see: [With lrc](https://github.com/DIYgod/APlayer#with-lrc) |
| mutex | Boolean | false | pause other players when this player playing |
| theme | String | '#b7daff' | theme color |
| mode | String | 'circulation' | play mode, can be 'random' 'single 'circulation'(loop) or 'order'(no loop) |
| preload | String | 'auto' | the way to load music, can be 'none' 'metadata' or 'auto' |
| listmaxheight | String | none | max height of play list |
| music| Object or Array | `required` | music info, see [Music info](https://github.com/SevenOutman/vue-aplayer#music-info) |

#### Music info

The `music` props can either be an object containing info of the song to play, or an array of such objects.

| Property | Default | Description |
| -------- | ------- | ----------- |
| title | 'Untitled' | music title |
| author | 'Unknown' | music author |
| url | `required` | music url |
| pic | none | music cover picture |
| lrc | none | lrc or url to a .lrc file, see: [With lrc](https://github.com/DIYgod/APlayer#with-lrc) |

#### Events

| Name | Params | Description |
| ---- | ------ | ----------- |
| play | none | Triggered when APlayer start play |
| pause | none | Triggered when APlayer paused |
| canplay | none | Triggered when enough data is available that APlayer can play |
| playing | none | Triggered periodically when APlayer is playing |
| ended | none | Triggered when APlayer ended playing |
| error | none | Triggered when an error occurs |

#### API

You are allowed to access the APlayer instance wrapped in the component via `control` property, so that you can use its [APIs](https://github.com/DIYgod/APlayer#api).

```HTML
<a-player :music="songs" ref="player"></a-player>
```

```JS
// ES6
import VueAplayer from 'vue-aplayer'

new Vue({
    components: {
        'a-player': VueAplayer
    },
    data: {
        songs: [
            {
              title: 'Preparation',
              author: 'Hans Zimmer/Richard Harvey',
              url: 'http://devtest.qiniudn.com/Preparation.mp3',
              pic: 'http://devtest.qiniudn.com/Preparation.jpg',
              lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
            }
        ]
    },
    mounted() {
        let aplayer = this.$refs.player.control
        aplayer.play()
    }
})
```

## LICENSE

[The MIT License](https://github.com/SevenOutman/vue-aplayer/blob/master/LICENSE)