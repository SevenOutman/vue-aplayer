<template>
    <div class="aplayer"></div>
</template>
<script type="text/babel">
    import APlayer from 'aplayer'
    export default {
        props: {
            narrow: {
                type: Boolean,
                default: false
            },
            autoplay: {
                type: Boolean,
                default: false
            },
            showlrc: {
                type: Number,
                default: 0
            },
            mutex: {
                type: Boolean,
                default: false
            },
            theme: {
                type: String,
                default: '#b7daff'
            },
            mode: {
                type: String,
                default: 'circulation'
            },
            preload: {
                type: String,
                default: 'auto'
            },
            listmaxheight: String,
            music: [Object, Array]
        },
        data() {
            return {
                player: null
            }
        },
        mounted() {
            let player = this.player = new APlayer({
                element: this.$el,
                narrow: this.narrow,
                autoplay: this.autoplay,
                showlrc: this.showlrc,
                mutex: this.mutex,
                theme: this.theme,
                preload: this.preload,
                mode: this.mode,
                listmaxheight: this.listmaxheight,
                music: this.music
            })
            player.on('play', () => {
                this.$emit('play')
            })
            player.on('pause', () => {
                this.$emit('pause')
            })
            player.on('canplay', () => {
                this.$emit('canplay')
            })
            player.on('playing', () => {
                this.$emit('playing')
            })
            player.on('ended', () => {
                this.$emit('ended')
            })
            player.on('error', () => {
                this.$emit('error')
            })
        }
    }


</script>