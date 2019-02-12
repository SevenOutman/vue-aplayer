## 安装

### Node

```
$ yarn add vue-aplayer
```

或者如果你选择 `npm`

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


## 运行时要求

- [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)



## 使用

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

| 名称 | 类型 | 默认值 | 说明 |
| ---- | ---- | ------- | ----------- |
| music| Object | *必需* | 当前播放的音乐。 具体请看[音乐信息](https://github.com/SevenOutman/vue-aplayer/blob/develop/docs/README.zh-CN.md#音乐信息) |
| list | Array | `[]` | 播放列表。如果 list 不是空数组，播放列表就会显示出来，即使 list 中只有一首歌并且它和 music 一样 |
| mini | Boolean | `false` | 迷你模式 |
| float | Boolean | `false` | 浮动模式。你可以在页面上随意拖放你的播放器 |
| showLrc | Boolean | `false` | 是否显示歌词 |
| mutex | Boolean | `true` | 是否在该播放器播放时暂停其他播放器 |
| theme | String | `'#41b883'` | 主题色。如果当前歌曲也设置了 `theme` 则以歌曲的为准 |
| shuffle | Boolean | `false` | 随机播放 |
| repeat | String | `'no-repeat'` | 轮播模式。值可以是 `'repeat-one'`（单曲循环）`'repeat-all'`（列表循环）或者 `'no-repeat'`（不循环）。为了好记，还可以使用对应的 `'music'` `'list'` `'none'` |
| listMaxHeight | String | *none* | 播放列表面板最大高度 |
| listFolded | Boolean | `false` | 默认收起播放列表 |
| narrow |  | | DEPRECATED, 请使用 `mini` |
| listmaxheight |  |  | DEPRECATED, 请使用 `listMaxHeight` |
| showlrc |  |  | DEPRECATED, 请使用 `showLrc` |

> 如果你是用的是 Vue@2.3.0+, 你可以在 `music` `shuffle` 和 `repeat` 上使用 [`.sync` 修饰符](https://cn.vuejs.org/v2/guide/components.html#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6)。



### 将 Audio 属性作为 props

从 `v1.4.0` 开始，我们选取了一些 `<audio>` 属性并将它们运用为 props

| 名称 | 类型 | 默认值 | 是否可变 | 说明 |
| ---- | ---- | ------- | ---------- | ---------- |
| autoplay | Boolean | `false` | false | 自动播放。如果多个 mutex 播放器设置了 autoplay，只有第一个会自动播放|
| controls | Boolean | `false` | true | 显示原生 audio 元素（在播放器面板和播放列表面板之间） |
| muted | Boolean | `false` | true | 静音 |
| preload | String | *none* | true | The way to load music, can be 'none' 'metadata' or 'auto' |
| volume | Number | `0.8` | true | 播放音量 |

>  `muted` 和 `volume` 也可以使用 `.sync` 修饰符，你可以利用这一点做一些自定义的控制



### 音乐信息

`music` props 包含了当前播放歌曲的如下信息。

| 属性 | 默认值 | 说明 |
| -------- | ------- | ----------- |
| src | *必需* | 音频文件的 URL |
| title | `'Untitled'` | 歌曲名称 |
| artist | `'Unknown'` | 演唱者 |
| pic | *none* | 封面图片 URL |
| lrc | *none* | LRC 歌词或者歌词文件的 URL |
| theme | *none* | 歌曲的主题色，会覆盖播放器的主题色 |
| url | | DEPRECATED, 请使用 `src` |
| author |  | DEPRECATED, 请使用 `artist` |



### 事件

从 `v1.4.0` 开始, Vue-APlayer 会抛出它内部的 `<audio>` 元素上触发的所有媒体事件. 你可以[查阅 MDN 上的这张完整列表](https://developer.mozilla.org/zh-CN/docs/Web/Guide/Events/Media_events).

在 `v1.4.0` 以前, 我们有一些自定义事件，如 `play` `pause` `canplay` `playing` `ended` `error`, 它们现在已全部被废弃。



## 进阶使用

### 自适应主题色

从 `v1.3.0` 开始, 如果你将一首歌的 `theme` 值设为 `'pic'`, Vue-APlayer 会从它的封面图片中提取颜色作为主题色.
你也可以直接将 Vue-APlayer 的 `theme` prop 设为 `'pic'`, 这样所有的歌曲都会使用自适应主题色

你只需将 [color-thief](https://github.com/lokesh/color-thief) 库加入页面中.
> 注意 color-thief **无法正常使用 npm 安装**

```
<!-- 或者你选择的其他 CDN -->
<script src="https://cdn.jsdelivr.net/npm/colorthief@2.0.2/src/color-thief.js"></script>
```



### 支持 HLS

从 `v1.3.0` 开始, Vue-APlayer 可选支持 `*.m3u8` 音频. 你需要做的就是在项目中安装 [hls.js](https://github.com/video-dev/hls.js) 包即可.


### `disableVersionBadge`

Vue-APlayer 默认会在控制台打印出当前的版本标识，如果你想要禁用它，可以将 `disableVersionBadge` 设为 `true`。

```js
import VueAPlayer from 'vue-aplayer'
VueAPlayer.disableVersionBadge = true
```


### Slots

- `slot="display"`

这个 slot 代表播放器主体上显示的内容, 默认是滚动歌词.

这个 slot 中的组件会接收两个 props: `currentMusic` 和 `playStat`.



## 贡献

Clone 这个 repo, **使用 Yarn 开发**

```
$ yarn
$ yarn run dev
```
