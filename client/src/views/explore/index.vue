/**
* Created by zenghongtu on 02/09/2018
* Desc: explore
*/

<template>
    <div class="wrap">
        <div class="left-wrap">
            <main class="left">
                <article class="article-wrap" v-for="item in articles" :key="item.id">
                    <a :href="'/article/'+item.id" class="article-title">
                        {{item.title}}
                    </a>
                    <div class="article-date">
                        {{item.updatedAt}}
                    </div>
                    <p class="article-content">
                        {{item.content}}
                    </p>
                    <p class="read-more-wrap">
                        <a :href="'/article/'+item.id" class="read-more">
                            阅读全文
                        </a>
                    </p>
                </article>
            </main>
            <Pagination @getPage="getPage" :totalPage="totalPage" :curPage="curPage"></Pagination>
        </div>
        <Sidebar class="right"></Sidebar>
    </div>
</template>

<script>
    import Sidebar from "./sidebar";
    import Pagination from "@/components/common/pagination";


    export default {
        name: "explore",
        components: {
            Sidebar,
            Pagination
        },
        data() {
            return {
                articles: undefined,
                articleTotal: 0,
                limit: 2,
                curPage: 1,
            }
        },
        computed: {
            totalPage() {
                return Math.ceil(this.articleTotal / this.limit)
            }
        },
        methods: {
            fetch(page = 1, limit = this.limit) {
                this.$ajax.get(`/articles?_page=${page}&_limit=${limit}`).then(rsp => {
                    this.articleTotal = +rsp.headers['x-total-count'];
                    this.curPage = page;
                    this.articles = rsp.data;
                })
            },
            getPage(page) {
                this.fetch(page)
            }
        },
        created() {
            this.fetch()
        },
        mounted() {
            console.log(this.totalPage);
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
        }
    }
</style>
