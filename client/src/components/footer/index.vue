/**
* Created by zenghongtu on 02/09/2018
* Desc: footer
*/

<template>
    <div class="footer">
        <div class="notice" v-show="_ida" @click="clickHandler">
            <!--todo-->
            <i>消息</i>
        </div>
        <div class="footer-wrap">
            Copyright © 2018 <a class="link" href="https://zenghongtu.com">这个码农不太冷</a> | <a class="link" target="_blank"
                                                                                            href="https://github.com/zenghongtu">GitHub</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "footer",
        data() {
            return {
                _ida: null,
            }
        },
        methods: {
            clickHandler() {
                this.$router.push({name: 'article', params: {_id: this._ida}})
            }
        },
        created() {
            const _ida = window.localStorage.getItem('_ida');
            _ida && (this._ida = _ida)
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
        }
    }
</style>
