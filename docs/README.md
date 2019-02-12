## Installation

### Node

```
$ yarn add vue-aplayer
```
or if you prefer `npm`

```
$ npm i vue-aplayer
```

### CDN

```html
<script src="//cdn.jsdelivr.net/npm/vue-aplayer"></script>
<script>
  Vue.component('aplayer', VueAPlayer)
</script>
```


## Requirements

- [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)



## Usage

```HTML
<aplayer autoplay
  :music="{
    title: 'secret base~君がくれたもの~',
    artist: 'Silent Siren',
    src: 'https://cn-east-17-aplayer-35525609.oss.dogecdn.com/secretbase.mp3',
    pic: 'https://cn-east-17-aplayer-35525609.oss.dogecdn.com/secretbase.jpg'
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

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| music| Object | *required* | Music info for current playing music, see [Music info](https://github.com/SevenOutman/vue-aplayer/blob/develop/docs/README.md#music-info) |
| list | Array | `[]` | Music list to play and display. If list is not empty, music list panel will be shown, even if the only song in the list is identical to music prop. |
| mini | Boolean | `false` | Mini mode |
| float | Boolean | `false` | Float mode, in which you can drag the player around and leave it anywhere on your page |
| showLrc | Boolean | `false` | Whether to show lyrics or not |
| mutex | Boolean | `true` | Pause other players when this player is playing |
| theme | String | `'#41b883'` | Theme color, will be overridden by current `music`'s theme if set |
| shuffle | Boolean | `false` | Shuffle the playlist |
| repeat | String | `'no-repeat'` | How to repeat play. Either to `'repeat-one'` `'repeat-all'` or `'no-repeat'`. You can also use accordingly `'music'` `'list'` `'none'` for easier remembering |
| listMaxHeight | String | *none* | Max height of play list |
| listFolded | Boolean | `false` | Fold playlist initially |
| narrow |  | | DEPRECATED, use `mini` instead |
| listmaxheight |  |  | DEPRECATED, use `listMaxHeight` instead |
| showlrc |  |  | DEPRECATED, use `showLrc` instead |

> If you are using Vue@2.3.0+, you can use [`.sync` Modifier](https://vuejs.org/v2/guide/components.html#sync-Modifier) on `music`, `shuffle` and `repeat` props.



### Audio attributes as props

Since `v1.4.0`, we added some props that names after `<audio>` attributes and also work as they do

| Name | Type | Default | Observable | Description |
| ---- | ---- | ------- | ---------- | ---------- |
| autoplay | Boolean | `false` | false | Starts playing as soon as loaded. If more than one mutex player are set autoplay, only the first one will play.|
| controls | Boolean | `false` | true | Shows native audio controls below the player, or between player and playlist. This only works in develop environment, and doesn't work in Mini mode. |
| muted | Boolean | `false` | true | Player is muted. |
| preload | String | *none* | true | The way to load music, can be 'none' 'metadata' or 'auto' |
| volume | Number | `0.8` | true | Playback volume. |

>  `muted` and `volume` props also accept `.sync` modifier, allowing you some custom external control capability.



### Music info

The `music` props contains info of the song to play.

| Property | Default | Description |
| -------- | ------- | ----------- |
| src | *required* | Music source url |
| title | `'Untitled'` | Music title |
| artist | `'Unknown'` | Music artist |
| pic | *none* | Music cover picture |
| lrc | *none* | lrc or url to a .lrc file, see: [LRC](https://aplayer.js.org/#/home?id=lrc) |
| theme | *none* | Song-specific theme color |
| url | | DEPRECATED, use `src` instead |
| author |  | DEPRECATED, use `artist` instead |



### Events

Since `v1.4.0`, Vue-APlayer emits every Media Element triggered from its inner `<audio>` element. You can [refer to MDN for the full list](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events).

Custom events that were supported before `v1.4.0`, which are `play` `pause` `canplay` `playing` `ended` `error`, are all deprecated now.



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


### `disableVersionBadge`

By default Vue-APlayer prints a version badge in console. If you want to silent it, you can set `disableVersionBadge` to `true` before you first create a Vue-APlayer instance.

```js
import VueAPlayer from 'vue-aplayer'
VueAPlayer.disableVersionBadge = true
```


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
