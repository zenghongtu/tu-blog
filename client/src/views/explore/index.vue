/**
* Created by zenghongtu on 02/09/2018
* Desc: explore
*/

<template>
    <div class="wrap">
        <div class="left-wrap">
            <main class="left">
                <article class="article-wrap" v-for="article in pageArticles" :key="article._id">
                    <a @click="linkTo('article',article._id)" class="article-title">
                        {{article.title}}
                    </a>
                    <div class="article-date">
                        <i class="iconfont icon-riqi"></i> {{article.created.slice(0,10)}}
                    </div>
                    <article class="article-content" v-html="$options.filters.compileMarkdown(article.desc)">
                    </article>
                    <p class="read-more-wrap">
                        <a @click="linkTo('article',article._id)" class="read-more">
                            阅读全文
                        </a>
                    </p>
                </article>
            </main>
            <Pagination @getNewArticles="getNewArticles" :totalPage="totalPage" :curPage="curPage"></Pagination>
        </div>
        <Sidebar class="right"></Sidebar>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import Sidebar from "./sidebar";
    import Pagination from "@/components/common/pagination";
    import {DEFAULT_LIMIT} from "../../store/constants";
    import marked from '../../util/markdown';


    export default {
        name: "explore",
        components: {
            Sidebar,
            Pagination
        },
        computed: {
            totalPage() {
                return Math.ceil(this.articleTotal / DEFAULT_LIMIT)
            },
            ...mapState({
                pageArticles(state) {
                    const page = state.curPage;
                    if (!state.pageArticles[page]) {
                        this.fetchPageArticles(page);
                        return []
                    }
                    return state.pageArticles[page]
                },
                articleTotal: 'articleTotal',
                curPage: 'curPage',
            }),
        },
        filters: {
            compileMarkdown: function (value) {
                if (!value) return '';
                return marked(value, {sanitize: true})
            }
        },
        methods: {
            ...mapActions(['fetchPageArticles', 'changePage']),
            getNewArticles(page) {
                this.changePage(page)
            },
            linkTo(location, _id) {
                this.$router.push({name: location, params: {_id}})
            },
        }
    };
</script>

<style scoped lang="scss">
    @import '../../assets/style/index';

    .wrap {
        display: flex;
        margin-top: 1.25em;
        margin-bottom: .95em;
        .left-wrap {
            flex: 3;
            margin-right: 3.125em;
            @media all and (max-width: $maxWidth) {
                margin-right: 0;
            }
            .article-wrap {
                margin-top: 1.5625em;
                text-align: left;

                @mixin border-bottom($border:$background,$color:$title) {
                    text-decoration: none;
                    transition: all .3s ease-in;
                    border-bottom: 1px solid $border;
                    &:hover {
                        border-bottom: 1px solid $color;
                    }
                }

                .article-title {
                    color: $title;
                    font-size: 1.5625rem;
                    margin: 0 auto;
                    cursor: pointer;
                    @include border-bottom();

                }
                .article-date {
                    color: $date;
                    font-size: .875rem;
                    margin-top: .95em;
                }
                .article-content {
                    color: $word;
                    font-size: 1rem;
                    margin: .95em 0 0;
                    text-align: justify;
                }
                .read-more-wrap {
                    text-align: right;
                    margin-top: 0;
                    .read-more {
                        color: $word;
                        font-size: .875rem;
                        display: inline-block;
                        border: 1px solid $border;
                        border-radius: 5px;
                        padding: .3125em .625em;
                        margin-top: .2em;
                        cursor: pointer;
                        &:hover {
                            background-color: $btn-active-bg;
                        }
                        @include border-bottom($border, $btn-active-border);
                    }
                }

            }
        }
        .right {
            flex: 1;
            @media all and (max-width: $maxWidth) {
                display: none;
            }
        }
    }

</style>
