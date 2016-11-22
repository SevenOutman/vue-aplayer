<template>
    <div id="app">
        <a href="https://github.com/DIYgod/APlayer" target="_blank" class="github-corner">
            <svg width="80" height="80" viewBox="0 0 250 250"
                 style="fill:#151513; color:#fff; position: absolute; top: 0; border: 0; right: 0;">
                <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
                <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
                      fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path>
                <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
                      fill="currentColor" class="octo-body"></path>
            </svg>
        </a>
        <div class="container">
            <h1>APlayer</h1>
            <h2>Wow, such a beautiful html5 music player</h2>
            <p>Made by <a href="https://www.anotherhome.net/" target="_blank">DIYgod</a>. Available on <a
                    href="https://github.com/DIYgod/APlayer" target="_blank">GitHub</a>. Licensed MIT.</p>
            <hr>
            <h3>Normal</h3>
            <a-player id="player1" autoplay mutex theme="#e6d0b2" preload="metadata" mode="circulation" :music="{
                    title: 'Preparation',
                    author: 'Hans Zimmer/Richard Harvey',
                    url: 'http://devtest.qiniudn.com/Preparation.mp3',
                    pic: 'http://devtest.qiniudn.com/Preparation.jpg'
                }"></a-player>

            <h3>With lyrics</h3>
            <a-player id="player3" mutex theme="#615754" :showlrc="3" mode="circulation" :music="{
                title: '回レ！雪月花',
                author: '小倉唯',
                url: 'http://devtest.qiniudn.com/回レ！雪月花.mp3',
                pic: 'http://devtest.qiniudn.com/回レ！雪月花.jpg',
                lrc: './回レ！雪月花.lrc'
            }"></a-player>
            <h3>With playlist</h3>
            <a-player id="player4" mutex theme="#ad7a86" mode="random" :music="[
            {
                title: 'あっちゅ～ま青春!',
                author: '七森中☆ごらく部',
                url: 'http://devtest.qiniudn.com/あっちゅ～ま青春!.mp3',
                pic: 'http://devtest.qiniudn.com/あっちゅ～ま青春!.jpg'
            },
            {
                title: 'secret base~君がくれたもの~',
                author: '茅野愛衣',
                url: 'http://devtest.qiniudn.com/secret base~.mp3',
                pic: 'http://devtest.qiniudn.com/secret base~.jpg'
            },
            {
                title: '回レ！雪月花',
                author: '小倉唯',
                url: 'http://devtest.qiniudn.com/回レ！雪月花.mp3',
                pic: 'http://devtest.qiniudn.com/回レ！雪月花.jpg'
            }]"></a-player>
            <h3>With playlist and lyrics</h3>
            <a-player id="player5" :showlrc="3" mutex theme="#ad7a86" mode="random" listmaxheight="80px" :music="[
            {
                title: 'あっちゅ～ま青春!',
                author: '七森中☆ごらく部',
                url: 'http://devtest.qiniudn.com/あっちゅ～ま青春!.mp3',
                pic: 'http://devtest.qiniudn.com/あっちゅ～ま青春!.jpg',
                lrc: 'あっちゅ～ま青春!.lrc'
            },
            {
                title: 'secret base~君がくれたもの~',
                author: '茅野愛衣',
                url: 'http://devtest.qiniudn.com/secret base~.mp3',
                pic: 'http://devtest.qiniudn.com/secret base~.jpg',
                lrc: 'secret base~君がくれたもの~.lrc'
            },
            {
                title: '回レ！雪月花',
                author: '小倉唯',
                url: 'http://devtest.qiniudn.com/回レ！雪月花.mp3',
                pic: 'http://devtest.qiniudn.com/回レ！雪月花.jpg',
                lrc: '回レ！雪月花.lrc'
            }]"></a-player>
            <h3>Narrow</h3>
            <a-player id="player2" narrow mutex theme="#e6d0b2" mode="circulation" :music="{
                title: 'Preparation',
                author: 'Hans Zimmer/Richard Harvey',
                url: 'http://devtest.qiniudn.com/Preparation.mp3',
                pic: 'http://devtest.qiniudn.com/Preparation.jpg'
            }"></a-player>
        </div>
    </div>
</template>
<script>
    import VueAplayer from '../vue-aplayer.vue'
    export default {
        name: 'App',
        components: {
            'a-player': VueAplayer
        },
    }
</script>
<style>
    body {
        font-family: 'PingFang SC', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .container {
        max-width: 32rem;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 50px;
    }

    h1 {
        font-size: 54px;
        color: #333;
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
        color: #08c;
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