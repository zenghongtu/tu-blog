/**
* Created by zenghongtu on 02/09/2018
* Desc: footer
*/

<template>
    <div class="footer">
        <div :class="'notice '+ (ida ? 'blink':'')" v-show="true" @click="clickHandler" :title="msg">
            <i class="iconfont icon-tixing1 notice-icon"></i>
        </div>
        <div class="footer-wrap">
            Copyright © 2018 <a class="link" href="https://zenghongtu.com">这个码农不太冷</a> | <a class="link" target="_blank"
                                                                                            href="https://github.com/zenghongtu">GitHub</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "foot",
        data() {
            return {
                ida: null,
                msg: '暂无留言消息,快去文章下面写一条吧~',
            }
        },
        methods: {
            clickHandler() {
                if (this._ida) {
                    this.$router.push({name: 'article', params: {_id: this._ida}})
                }
            }
        },
        created() {
            const _ida = window.localStorage.getItem('_ida');
            _ida && (this.ida = _ida) && (this.msg = '有一条留言被回复了哦,点击前往查看')
        }
    }
</script>

<style scoped lang="scss">
    @import '../../assets/style/index';

    .footer {
        .footer-wrap {
            padding: .8em 0 3.6em;
            margin-top: 1em;
            line-height: 2.5em;
            color: $base;
            text-align: center;
            .link {
                color: $word;
                font-size: .875rem;
                text-decoration: none;
            }
        }
        .notice {
            position: fixed;
            bottom: 3em;
            right: 3em;
            cursor: pointer;
            color: $base;
            .notice-icon {
                font-size: 2em;
            }
            &.blink {
                animation: blink 1s infinite;
            }
        }
    }

    @keyframes blink {
        0% {
            color: $btn-active-border;
        }
        50% {
            color: $active;
        }
        100% {
            color: $btn-active-border;
        }
    }
</style>
