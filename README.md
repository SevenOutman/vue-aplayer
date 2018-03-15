<h1 align="center">vue-aplayer</h1>

> Vue implementation of [APlayer](https://github.com/MoePlayer/APlayer) prototype.
[**Demo**](https://sevenoutman.github.io/vue-aplayer)


[![Travis](https://img.shields.io/travis/SevenOutman/vue-aplayer.svg?style=flat-square)](https://travis-ci.org/SevenOutman/vue-aplayer)
[![npm](https://img.shields.io/npm/v/vue-aplayer.svg?style=flat-square)](https://www.npmjs.com/package/vue-aplayer)
[![devDependency Status](https://img.shields.io/david/dev/SevenOutman/vue-aplayer.svg?style=flat-square)](https://david-dm.org/SevenOutman/vue-aplayer#info=devDependencies)
[![npm](https://img.shields.io/npm/dt/vue-aplayer.svg?style=flat-square)](https://www.npmjs.com/package/vue-aplayer)

![image](https://i.loli.net/2018/03/13/5aa6bd4562f39.png)

### Features
- Playlist
- Lyrics scroll
- Custom theme color
- Mutex play
- HLS support

## Installation

```
$ npm install vue-aplayer --save
```

## Usage

```HTML
<aplayer autoplay
  :music="{
    title: 'Preparation',
    author: 'Hans Zimmer/Richard Harvey',
    url: 'http://devtest.qiniudn.com/Preparation.mp3',
    pic: 'http://devtest.qiniudn.com/Preparation.jpg',
    lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
  }"
/>
```

```JS
// ES6
import Aplayer from 'vue-aplayer'

new Vue({
    components: {
        Aplayer
    }
})
```

### Props

Props are mostly the same as [APlayer's options](https://aplayer.js.org/#/home?id=options).

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| music| Object | *required* | Music info for current playing music, see [Music info](https://github.com/SevenOutman/vue-aplayer#music-info) |
| list | Array | `[]` | Music list to play and display. If list is not empty, music list panel will be shown, even if the only song in the list is identical to music prop. |
| mini | Boolean | `false` | Mini mode |
| float | Boolean | `false` | Float mode, in which you can drag the player around and leave it anywhere on your page |
| autoplay | Boolean | `false` | Whether to autoplay. If more than one mutex player are set autoplay, only the first one will play. |
| showlrc | Boolean | `false` | Whether to show lyrics or not |
| mutex | Boolean | `false` | Pause other players when this player is playing |
| theme | String | `'#b7daff'` | Theme color |
| mode | String | `'circulation'` | Play mode, can be 'random' 'single 'circulation'(loop) or 'order'(no loop) |
| preload | String | `'auto'` | The way to load music, can be 'none' 'metadata' or 'auto' |
| listMaxHeight | String | *none* | Max height of play list |
| narrow | Boolean | `false` | DEPRECATED, use `mini` instead |
| listmaxheight | String | *none* | DEPRECATED, use `listMaxHeight` instead |

> If you are using Vue@2.3.0+, you can use [`.sync` Modifier](https://vuejs.org/v2/guide/components.html#sync-Modifier) on `music` and `mode` prop.

### Music info

The `music` props can either be an object containing info of the song to play, or an array of such objects.

| Property | Default | Description |
| -------- | ------- | ----------- |
| url | *required* | music url |
| title | `'Untitled'` | music title |
| author | `'Unknown'` | music author |
| pic | *none* | music cover picture |
| lrc | *none* | lrc or url to a .lrc file, see: [LRC](https://aplayer.js.org/#/home?id=lrc) |

> vue-aplayer uses [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to load your lrc when it's a url.
> If your browser doesn't support fetch by default, please use polyfills like [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch).

### HLS support
Simply install [hls.js](https://github.com/video-dev/hls.js) into your project. `vue-aplayer` detects `*.m3u8` sources and handles the rest.

### Events

| Name | Params | Description |
| ---- | ------ | ----------- |
| play | none | Triggered when APlayer start play |
| pause | none | Triggered when APlayer paused |
| canplay | none | Triggered when enough data is available that APlayer can play |
| playing | none | Triggered periodically when APlayer is playing |
| ended | none | Triggered when APlayer ended playing |
| error | none | Triggered when an error occurs |

### Slots

- `slot="display"`

This slot represents the content displayed on the music info panel, which by default is the lyric scroll.

The component in this slot will receive two props: `currentMusic` and `playStat`.

## Contribute

Feel free to [open an issue](https://github.com/SevenOutman/vue-aplayer/issues) if you find a bug.

Feature requests and PRs are welcome.

## Thanks
[APlayer](https://github.com/MoePlayer/APlayer), for appearance&api design inspiration and prototyping.

## License

[MIT Licensed](https://github.com/SevenOutman/vue-aplayer/blob/master/LICENSE). Copyright (c) 2016-present Shenghao "Doma" Lei

