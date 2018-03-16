<h1 align="center">Vue-APlayer</h1>

> Vue implementation of [APlayer](https://github.com/MoePlayer/APlayer) prototype.
[**Demo**](https://sevenoutman.github.io/vue-aplayer)


[![Travis](https://img.shields.io/travis/SevenOutman/vue-aplayer.svg?style=flat-square)](https://travis-ci.org/SevenOutman/vue-aplayer)
[![npm](https://img.shields.io/npm/v/vue-aplayer.svg?style=flat-square)](https://www.npmjs.com/package/vue-aplayer)
[![devDependency Status](https://img.shields.io/david/dev/SevenOutman/vue-aplayer.svg?style=flat-square)](https://david-dm.org/SevenOutman/vue-aplayer#info=devDependencies)
[![npm](https://img.shields.io/npm/dt/vue-aplayer.svg?style=flat-square)](https://www.npmjs.com/package/vue-aplayer)

![vue-aplayer](https://i.loli.net/2018/03/16/5aab3da0746e7.png)

### Features
- Clean and simple UI
- Playlist
- Lyrics scroll
- Custom theme color
- Mutex play
- HLS support (upcoming)

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
 [**Full documentation**](https://github.com/SevenOutman/vue-aplayer/blob/master/docs)

## Contribute

Feel free to [open an issue](https://github.com/SevenOutman/vue-aplayer/issues) if you find a bug or have a nice idea.

[PRs are welcome](https://github.com/SevenOutman/vue-aplayer/blob/master/docs/README.md#contribute).

## Thanks
[APlayer](https://github.com/MoePlayer/APlayer), for appearance&api design inspiration and prototyping.

## License

[MIT Licensed](https://github.com/SevenOutman/vue-aplayer/blob/master/LICENSE). Copyright (c) 2016-present Shenghao "Doma" Lei

