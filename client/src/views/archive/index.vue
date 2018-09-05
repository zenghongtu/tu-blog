/**
* Created by zenghongtu on 02/09/2018
* Desc: archive
*/

<template>
    <div class="archive-wrap">
        <div class="archive-content" v-for="year in timeArticlesSort" :key="year">
            <h2 class="archive-year">{{year}}</h2>
            <ul class="archive-item-wrap">
                <li class="archive-item" v-for="article in timeArticles[year]" :key="article.id">
                    <span class="date">{{article.date}}</span>
                    <span class="title">{{article.title}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "archive",
        data() {
            return {
                timeArticles: {}
            }
        },
        computed: {
            timeArticlesSort() {
                return Object.keys(this.timeArticles).reverse()
            }
        },
        methods: {
            async fetchArticleList() {
                const rsp = await this.$ajax.get(`/articles`);
                const articles = rsp.data;
                const timeArticles = {};
                articles.forEach((item) => {
                    const d = item.createdAt;
                    const t = item.title;
                    const id = item.id;
                    const year = d.slice(0, 4);
                    if (!Object.keys(timeArticles).includes(year)) {
                        timeArticles[year] = []
                    }
                    timeArticles[year].push({date: d.slice(5, 10), title: t, id: id})
                });
                Object.keys(timeArticles).forEach((year) => {
                    timeArticles[year].sort(function (a, b) {
                        return ((b.date > a.date) ? 1 : -1);
                    })
                });
                this.timeArticles = timeArticles
            },
        },
        created() {
            this.fetchArticleList()
        }
    }
</script>

<style scoped lang="scss">
    @import '../../assets/style/index';

    .archive-wrap {
        padding: 1.25em .9375em 0;
        .archive-content {
            padding: 1.5625em .9375em .8em;
            text-align: left;
            color: $word;
            .archive-year {
                margin: 0;
                &:before {
                    content: '# ';
                }
            }
            .archive-item-wrap {
                list-style-type: circle;
                margin-left: 1.5em;
                line-height: 1.8em;
                .archive-item {
                    .date {
                        margin-right: .7em;
                    }
                    .title {
                        cursor: pointer;
                        color: $base;
                        &:hover {
                            color: $word;
                        }
                    }
                }
            }
        }
    }
</style>
