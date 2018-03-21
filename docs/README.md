## Installation

```
$ npm install vue-aplayer --save
```

## Requirements

- Promise
- fetch

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
| showLrc | Boolean | `false` | Whether to show lyrics or not |
| mutex | Boolean | `true` | Pause other players when this player is playing |
| theme | String | `'#41b883'` | Theme color, will be overridden by current `music`'s theme if set |
| mode | String | `'circulation'` | Play mode, can be 'random' 'single 'circulation'(loop) or 'order'(no loop) |
| preload | String | `'auto'` | The way to load music, can be 'none' 'metadata' or 'auto' |
| listMaxHeight | String | *none* | Max height of play list |
| controls | Boolean | `false` | Whether to show native audio controls below Vue-APlayer, only works in development environment, not working in mini mode |
| narrow |  | | DEPRECATED, use `mini` instead |
| listmaxheight |  |  | DEPRECATED, use `listMaxHeight` instead |
| showlrc |  |  | DEPRECATED, use `showLrc` instead |

> If you are using Vue@2.3.0+, you can use [`.sync` Modifier](https://vuejs.org/v2/guide/components.html#sync-Modifier) on `music` and `mode` prop.

### Music info

The `music` props can either be an object containing info of the song to play, or an array of such objects.

| Property | Default | Description |
| -------- | ------- | ----------- |
| url | *required* | Music source url |
| title | `'Untitled'` | Music title |
| author | `'Unknown'` | Music author |
| pic | *none* | Music cover picture |
| theme | *none* | Song-specific theme color |
| lrc | *none* | lrc or url to a .lrc file, see: [LRC](https://aplayer.js.org/#/home?id=lrc) |

> vue-aplayer uses [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to load your lrc when it's a url.
> If your browser doesn't support fetch by default, please use polyfills like [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch).

### Events

| Name | Params | Description |
| ---- | ------ | ----------- |
| play | none | Triggered when APlayer start play |
| pause | none | Triggered when APlayer paused |
| canplay | none | Triggered when enough data is available that APlayer can play |
| playing | none | Triggered periodically when APlayer is playing |
| ended | none | Triggered when APlayer ended playing |
| error | none | Triggered when an error occurs |

## Advanced

### Self-adapting theme color
Since `v1.3.0`, if you set a **Music Object**'s `theme` property to `'pic'`, Vue-APlayer will pick color from the songs cover image as theme color.
Also, you can set player's `theme` prop to `'pic'`, it will apply to every song.

All you need to do is adding [color-thief](https://github.com/lokesh/color-thief) to your page.
> Note that color-thief is **NOT module compatible**

```
<!-- or other CDNs you prefer -->
<script src="https://cdn.jsdelivr.net/npm/colorthief@2.0.2/src/color-thief.js"></script>
```

### HLS support
Since `v1.3.0`, Vue-APlayer supports `*.m3u8` media as an optional functionality. Simply install [hls.js](https://github.com/video-dev/hls.js) into your project, and Vue-APlayer handles the rest.

### Slots

- `slot="display"`

This slot represents the content displayed on the music info panel, which by default is the lyric scroll.

The component in this slot will receive two props: `currentMusic` and `playStat`.

## Contribute

Clone this repo, then **use Yarn**

```
$ yarn
$ yarn run dev
```
