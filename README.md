<p align="center">
<img src="https://github.com/SevenOutman/vue-aplayer/blob/develop/src/assets/vue-aplayer-round.png" alt="Vue-APlayer" width="100">
</p>
<h1 align="center">Vue-APlayer</h1>

> Vue implementation of [APlayer](https://github.com/MoePlayer/APlayer) prototype.
[**Demo**](https://sevenoutman.github.io/vue-aplayer)


[![Travis](https://img.shields.io/travis/SevenOutman/vue-aplayer.svg?style=flat-square)](https://travis-ci.org/SevenOutman/vue-aplayer)
[![npm](https://img.shields.io/npm/v/vue-aplayer.svg?style=flat-square)](https://www.npmjs.com/package/vue-aplayer)
[![npm](https://img.shields.io/npm/dt/vue-aplayer.svg?style=flat-square)](https://www.npmjs.com/package/vue-aplayer)
[![devDependency Status](https://img.shields.io/david/dev/SevenOutman/vue-aplayer.svg?style=flat-square)](https://david-dm.org/SevenOutman/vue-aplayer#info=devDependencies)

[![GitHub commit activity the past week, 4 weeks, year](https://img.shields.io/github/commit-activity/y/SevenOutman/vue-aplayer.svg?style=flat-square)](https://github.com/SevenOutman/vue-aplayer/commits/develop)
[![GitHub last commit](https://img.shields.io/github/last-commit/SevenOutman/vue-aplayer/develop.svg?style=flat-square)](https://github.com/SevenOutman/vue-aplayer/commits/develop)
[![Discord](https://img.shields.io/badge/Discord-Join%20chat%20%E2%86%92-738bd7.svg?style=flat-square)](https://discord.gg/e3SeMJE)

![Screenshot](https://i.loli.net/2018/05/26/5b0912ce2e250.png)


### Features
- Clean and simple UI
- Playlist
- Lyrics scroll
- Custom theme color / Self-adapting theme color
- Drag and place anywhere
- Mutex play
- HLS support
- **Dependency free** and light-weight (gzipped 16KB)

Using Vue-APlayer in your project? [Let me know!](https://github.com/SevenOutman/vue-aplayer/issues/26)


## Usage

```HTML
<aplayer autoplay
  :music="{
    title: 'secret base~君がくれたもの~',
    artist: 'Silent Siren',
    src: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.mp3',
    pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg'
  }"
/>
```
 [**Full documentation**](https://github.com/SevenOutman/vue-aplayer/blob/develop/docs/README.md)

 [**中文文档**](https://github.com/SevenOutman/vue-aplayer/blob/develop/docs/README.zh-CN.md)


## Changelog

Detailed changes fro each release are documented in the [release notes](https://github.com/SevenOutman/vue-aplayer/releases).


## Contribution

Feel free to [open an issue](https://github.com/SevenOutman/vue-aplayer/issues) if you find a bug or have a nice idea.

[PRs are welcome](https://github.com/SevenOutman/vue-aplayer/blob/master/docs/README.md#contribute).


## The Name

- When referring to `Vue-APlayer`, the name should be written in exactly the same case.
- When referring to its versions, either `Vue-APlayer@1.x` (GitHub) or `vue-aplayer@1.x` (npm) is fine.


## Thanks
[APlayer](https://github.com/MoePlayer/APlayer), for appearance&api design inspiration and prototyping.

[@DIYgod](https://github.com/DIYgod), for creating APlayer and sharing cloud storage for hosting my demo page media resources.


## License

[MIT Licensed](https://github.com/SevenOutman/vue-aplayer/blob/master/LICENSE). Copyright (c) 2016-present Shenghao "Doma" Lei

