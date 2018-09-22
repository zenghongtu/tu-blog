/**
* Created by zenghongtu on 02/09/2018.
* Desc: header 组件
*/

<template>
    <div class="header">
        <h1 class="name" @click="linkHandler">这个码农不太冷</h1>
        <h5 class="description">JasonZeng's blog</h5>
        <nav class="nav">
            <router-link :class="'nav-item '+($route.name===item.link?'active':'')" v-for="item in routes_"
                         :key="item.id" :to="'/'+item.link"><i :class="'iconfont icon-'+item.link"></i> {{item.name}}
            </router-link>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "header",
        data() {
            return {
                routes_: [
                    {id: 0, link: 'explore', name: '看看'},
                    {id: 1, link: 'archive', name: '归档'},
                    {id: 2, link: 'read', name: '读书'},
                    {id: 3, link: 'laboratory', name: '实验室'},
                    {id: 4, link: 'about', name: '关于'}
                ]
            }
        },
        methods: {
            linkHandler() {
                this.$router.push('/')
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../../assets/style/index";

    .header {
        @include font((sans-serif));
        color: $title;
        padding-top: 3.625em;
        text-align: left;
        border-bottom: 1px solid $border;
        .name {
            display: inline-block;
            font-size: 2.375rem;
            font-weight: 900;
            margin: 0;
            cursor: pointer;
        }
        .description {
            @include font();
            color: $base;
            margin: .3em 0;
            font-weight: 300;
            font-size: .875rem;
        }
        .nav {
            text-align: right;
            .nav-item {
                color: $word;
                font-weight: 400;
                display: inline-block;
                padding: .1875em 1.25em .1875em;
                line-height: 1.875em;
                font-size: .8125rem;
                border: 1px solid transparent;
                box-sizing: border-box;
                text-decoration: none;
                position: relative;
                bottom: -.0625em;
                margin: 0 .2em;
                transition: border-color .6s ease-in;
                &.active {
                    border: 1px solid $border;
                    border-bottom: 2px solid $background;
                    &:hover {
                        border-bottom-color: $background;
                    }
                }
                &:hover {
                    border-bottom-color: $active;
                }
            }

        }
    }

    @media all and (max-width: $maxWidth) {
        .header, .name, .header .nav {
            text-align: center;
        }
    }
</style>

