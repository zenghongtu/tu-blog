/**
* Created by zenghongtu on 02/09/2018
* Desc: footer
*/

<template>
    <div>
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

    .link {
        color: $word;
        font-size: .875rem;
        text-decoration: none;
    }
</style>
