/**
* Created by zenghongtu on 02/09/2018
* Desc: footer
*/

<template>
    <div class="footer-wrap">
        Copyright © 2018 <a class="link" href="https://zenghongtu.com">这个码农不太冷</a> | <a class="link" target="_blank"
                                                                                        href="https://github.com/zenghongtu">GitHub</a>
    </div>
</template>

<script>
    export default {
        name: "footer"
    }
</script>

<style scoped lang="scss">
    @import '../../assets/style/index';

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
</style>
