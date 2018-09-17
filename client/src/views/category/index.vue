/**
* Created by zenghongtu on 17/09/2018
* Desc: index
*/

<template>
    <div class="category-wrap">
        <h3 class="label-title">正在查看 {{$route.query.name}} 下的文章</h3>
        <div class="category-content" v-for="year in timeArticlesSort" :key="year">
            <h2 class="category-year">{{year}}</h2>
            <ul class="category-item-wrap">
                <li class="category-item" v-for="article in timeArticles[year]" :key="article.id">
                    <span class="date">{{article.date}}</span>
                    <span @click="linkTo('article',article.id)" class="title link">{{article.title}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "category",
        data() {
            return {
                timeArticles: []
            }
        },
        computed: {
            timeArticlesSort() {
                return Object.keys(this.timeArticles).reverse()
            }
        },
        methods: {
            async fetchCategoryArticles() {
                const _id = this.$route.params._id;
                const rsp = await this.$ajax.get(`/categories/${_id}`);
                const item = rsp.data[0];
                const timeArticles = {};
                item.articles.forEach((item) => {
                    const d = item.meta.createAt;
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
            this.fetchCategoryArticles()
        }
    }
</script>

<style scoped lang="scss">
    @import '../../assets/style/index';

    .category-wrap {
        padding: 1.25em .9375em 0;
        .label-title {
            margin-top: 1.1em;
            margin-bottom: .5em;
            font-size: 1.3rem;
            font-weight: 300;
            color: #888;
        }
        .category-content {
            padding: 1.5625em .9375em .8em;
            text-align: left;
            color: $word;
            .category-year {
                margin: 0;
                &:before {
                    content: '# ';
                }
            }
            .category-item-wrap {
                list-style-type: circle;
                margin-left: 1.5em;
                line-height: 1.8em;
                .category-item {
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
