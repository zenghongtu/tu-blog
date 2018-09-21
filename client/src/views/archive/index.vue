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
                    <span @click="linkTo('article',article.id)" class="title link">{{article.title}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions} from "vuex";
    import {getArticleList} from "../../http/api";

    export default {
        name: "archive",
        data() {
            return {
                timeArticles: []
            }
        },
        computed: {
            timeArticlesSort() {
                return Object.keys(this.timeArticles).reverse()
            },
            ...mapState(['articleList']),
        },
        methods: {
            fetchArchiveArticles() {
                const item = this.articleList;
                const timeArticles = {};
                item.forEach((item) => {
                    const d = item.created;
                    const t = item.title;
                    const id = item._id;
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
            linkTo(location, _id) {
                this.$router.push({name: location, params: {_id}})
            },
            ...mapActions(['getArticleList']),
        },
        created() {
            if (this.articleList.length < 1) {
                this.getArticleList()
            }
        },
        mounted() {
            setTimeout(() => {
                this.fetchArchiveArticles()
            }, 500)
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
                        color: $base;
                    }
                    @include link;
                }
            }
        }
    }
</style>
