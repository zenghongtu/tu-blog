/**
* Created by zenghongtu on 02/09/2018
* Desc: home
*/

<template>
    <div class="home-wrap">
        <transition name="fade">
            <div class="home-content"
                 v-show="show"
                 :style="`background-image:url(\'http://p5yy6xq69.bkt.clouddn.com/cat${bgImg}.jpg\')`">
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                bgImg: 4,
                i: 0,
                show: true

            }
        },
        methods: {
            timer() {
                setTimeout(() => {
                    this.show = false;
                }, 800);
                setTimeout(() => {
                    this.bgImg = this.i++;
                    this.show = true
                }, 3000);
            },
            changeImg() {
                this.timer();
                setInterval(() => {
                    this.timer();
                    if (this.i > 3) {
                        this.i = 0
                    }
                }, 5000)
            },
            scroll() {
                let i = 165;
                window.scrollTo(0, 165);
                const timer = setInterval(() => {
                    if (i) {
                        window.scrollTo(0, i--)
                    } else {
                        clearInterval(timer)
                    }
                }, 10)
            }
        },
        mounted() {
            this.changeImg();
            this.$nextTick(() => {
                this.scroll()
            })
        }
    }
</script>

<style scoped lang="scss">

    .home-wrap {
        display: flex;
        overflow: hidden;
        height: 100vh;
        margin-top: 1em;
        cursor: pointer;
        .home-content {
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: transform 1.5s ease-in;
    }

    .fade-enter, .fade-leave-to {
        transform: translateX(-100%);
    }
</style>
