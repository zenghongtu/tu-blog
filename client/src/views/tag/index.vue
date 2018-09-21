/**
* Created by zenghongtu on 17/09/2018
* Desc: index
*/

<template>
    <div class="tag-wrap">
        <h3 class="label-title">正在查看 {{name}} 下的文章</h3>
        <div class="tag-content" v-for="year in timeArticlesSort" :key="year">
            <h2 class="tag-year">{{year}}</h2>
            <ul class="tag-item-wrap">
                <li class="tag-item" v-for="article in timeArticles[year]" :key="article.id">
                    <span class="date">{{article.date}}</span>
                    <span @click="linkTo('article',article.id)" class="title link">{{article.title}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {getTagArticles} from "../../http/api";

    export default {
        name: "tag",
        data() {
            return {
                timeArticles: [],
                name: ''
            }
        },
        computed: {
            timeArticlesSort() {
                return Object.keys(this.timeArticles).reverse()
            }
        },
        methods: {
            async fetchTagArticles() {
                const _id = this.$route.params._id;
                const rsp = await getTagArticles(_id);
                const item = rsp.data;
                const timeArticles = {};
                this.name = item.name;
                item.articles.forEach((item) => {
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
            }
        },
        created() {
            this.fetchTagArticles()
        }
    }
</script>

<style scoped lang="scss">
    @import '../../assets/style/index';

    .tag-wrap {
        padding: 1.25em .9375em 0;
        .label-title {
            margin-top: 1.1em;
            margin-bottom: .5em;
            font-size: 1.3rem;
            font-weight: 300;
            color: #888;
        }
        .tag-content {
            padding: 1.5625em .9375em .8em;
            text-align: left;
            color: $word;
            .tag-year {
                margin: 0;
                &:before {
                    content: '# ';
                }
            }
            .tag-item-wrap {
                list-style-type: circle;
                margin-left: 1.5em;
                line-height: 1.8em;
                .tag-item {
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
