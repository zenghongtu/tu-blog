/**
* Created by zenghongtu on 26/09/2018.
* Desc: loading
*/

<template>
    <div v-show="visible" class="csshub-page">
        <div class="csshub-circle-loader">
            <div class="csshub-circle-line">
                <div class="csshub-circle csshub-circle-blue"></div>
                <div class="csshub-circle csshub-circle-blue"></div>
                <div class="csshub-circle csshub-circle-blue"></div>
            </div>
            <div class="csshub-circle-line">
                <div class="csshub-circle csshub-circle-yellow"></div>
                <div class="csshub-circle csshub-circle-yellow"></div>
                <div class="csshub-circle csshub-circle-yellow"></div>
            </div>
            <div class="csshub-circle-line">
                <div class="csshub-circle csshub-circle-red"></div>
                <div class="csshub-circle csshub-circle-red"></div>
                <div class="csshub-circle csshub-circle-red"></div>
            </div>
            <div class="csshub-circle-line">
                <div class="csshub-circle csshub-circle-green"></div>
                <div class="csshub-circle csshub-circle-green"></div>
                <div class="csshub-circle csshub-circle-green"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "loading",
        data() {
            return {
                visible: false,
            }
        },
        methods: {
            hide() {
                this.visible = false
            },
            show() {
                this.visible = true
            }
        }
    }
</script>

<style scoped>
    .csshub-page {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .csshub-circle-loader {
        display: block;
        width: 64px;
        height: 64px;
        -webkit-transform-origin: 16px 16px;
        transform-origin: 16px 16px;
        -webkit-animation: csshub-rotate-animation 5s infinite;
        animation: csshub-rotate-animation 5s infinite;
        -webkit-animation-timing-function: linear;
        animation-timing-function: linear;
    }

    .csshub-circle-loader .csshub-circle {
        -webkit-animation: move-animation 2.5s infinite;
        animation: move-animation 2.5s infinite;
        -webkit-animation-timing-function: linear;
        animation-timing-function: linear;
        position: absolute;
        left: 50%;
        top: 50%;
    }

    .csshub-circle-loader .csshub-circle-line {
        width: 64px;
        height: 24px;
        position: absolute;
        top: 4px;
        left: 0;
        -webkit-transform-origin: 4px 4px;
        transform-origin: 4px 4px;
    }

    .csshub-circle-loader .csshub-circle-line:nth-child(0) {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    .csshub-circle-loader .csshub-circle-line:nth-child(1) {
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
    }

    .csshub-circle-loader .csshub-circle-line:nth-child(2) {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
    }

    .csshub-circle-loader .csshub-circle-line:nth-child(3) {
        -webkit-transform: rotate(270deg);
        transform: rotate(270deg);
    }

    .csshub-circle-loader .csshub-circle-line .csshub-circle:nth-child(1) {
        width: 8px;
        height: 8px;
        top: 50%;
        left: 50%;
        margin-top: -4px;
        margin-left: -4px;
        border-radius: 4px;
        -webkit-animation-delay: -0.3s;
        animation-delay: -0.3s;
    }

    .csshub-circle-loader .csshub-circle-line .csshub-circle:nth-child(2) {
        width: 16px;
        height: 16px;
        top: 50%;
        left: 50%;
        margin-top: -8px;
        margin-left: -8px;
        border-radius: 8px;
        -webkit-animation-delay: -0.6s;
        animation-delay: -0.6s;
    }

    .csshub-circle-loader .csshub-circle-line .csshub-circle:nth-child(3) {
        width: 24px;
        height: 24px;
        top: 50%;
        left: 50%;
        margin-top: -12px;
        margin-left: -12px;
        border-radius: 12px;
        -webkit-animation-delay: -0.9s;
        animation-delay: -0.9s;
    }

    .csshub-circle-loader .csshub-circle-blue {
        background-color: #1f4e5a;
    }

    .csshub-circle-loader .csshub-circle-red {
        background-color: #ff5955;
    }

    .csshub-circle-loader .csshub-circle-yellow {
        background-color: #ffb265;
    }

    .csshub-circle-loader .csshub-circle-green {
        background-color: #00a691;
    }

    @-webkit-keyframes csshub-rotate-animation {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }

    @keyframes csshub-rotate-animation {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }

    @-webkit-keyframes move-animation {
        0% {
            -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
        }
        25% {
            -webkit-transform: translate(-64px, 0);
            transform: translate(-64px, 0);
        }
        75% {
            -webkit-transform: translate(32px, 0);
            transform: translate(32px, 0);
        }
        100% {
            -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
        }
    }

    @keyframes move-animation {
        0% {
            -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
        }
        25% {
            -webkit-transform: translate(-64px, 0);
            transform: translate(-64px, 0);
        }
        75% {
            -webkit-transform: translate(32px, 0);
            transform: translate(32px, 0);
        }
        100% {
            -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
        }
    }
</style>
