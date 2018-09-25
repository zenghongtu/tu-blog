/**
* Created by zenghongtu on 03/09/2018.
* Desc: sidebar
*/

<template>
    <div class="sidebar-wrap">
        <div class="widget">
            <form class="search-form" action="//www.google.com/search" method="get"
                  accept-charset="UTF-8" target="_parent">
                <input class="search-content" type="text" name="q" maxlength="20" placeholder="Google Search">
                <input type="hidden" name="sitesearch" value="zenghongtu.com">
            </form>
        </div>
        <div class="widget">
            <div class="widget-title"><i class="iconfont icon-icon"></i> 分类</div>
            <div class="category-list">
                <div class="category-list-item" v-for="category in categories" :key="category._id"
                     @click="linkTo('category',category._id,category.name)">{{category.name}}
                </div>
            </div>
        </div>
        <div class="widget">
            <div class="widget-title"><i class="iconfont icon-labeltag"></i> 标签</div>
            <div class="tag-list">
                <span class="tag" v-for="tag in tags" :key="tag._id"
                      @click="linkTo('tag',tag._id,tag.name)">{{tag.name}}</span>
            </div>
        </div>
        <div class="widget">
            <div class="widget-title"><i class="iconfont icon-remen"></i> 热门文章</div>
            <div class="article-list">
                <div class="article-list-item" v-for="item in topArticles" :key="item._id"
                     @click="linkTo('article',item._id)">{{item.title}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'

    export default {
        name: "sidebar",
        computed: mapState(['categories', 'tags', 'topArticles',]),
        methods: {
            ...mapActions(['fetchSidebarItems']),
            linkTo(location, _id, name = '') {
                this.$router.push({name: location, params: {_id}, query: {name}})
            }
        },
        created() {
            if (this.topArticles.length < 1) {
                this.fetchSidebarItems()
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/style/index";

    $_border: 1px solid $border;

    @mixin item-hover {
        &:hover {
            color: $word;
        }
    }

    @mixin item {
        margin: .357em 0;
        line-height: 1.5em;
        cursor: pointer;
        @include item-hover;
    }

    .sidebar-wrap {
        font-size: 1rem;
        border-left: $_border;
        padding-left: 2.1875em;
        margin-top: 2.5em;
        padding-bottom: 1.25em;
        word-wrap: break-word;
        .widget {
            font-size: .875rem;
            margin-bottom: 2.142em;
            text-align: left;
            .search-content {
                padding: .5em .785em .5em 2em;
                line-height: 1.142em;
                border: $_border;
                width: 70%;
            }
            .widget-title {
                font-size: 1rem;
                color: $base;
                line-height: 2.7em;
                border-bottom: $_border;
                font-weight: 400;
            }
            .category-list {
                font-size: .875rem;
                margin: 1em 0;
                .category-list-item {
                    @include item;
                }
            }
            .tag-list {
                margin-top: .714em;
                .tag {
                    line-height: 1.5em;
                    padding: .357em;
                    cursor: pointer;
                    word-break: break-all;
                    @include item-hover;
                }
            }
            .article-list {
                margin-top: .714em;
                .article-list-item {
                    @include item;
                }
            }

        }
    }
</style>
