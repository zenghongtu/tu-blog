/**
* Created by zenghongtu on 07/09/2018
* Desc: article
*/

<template>
    <div class="article-wrap">
        <div class="article-content" v-if="article">
            <h2 class="article-title">{{article.title}}</h2>
            <div class="article-meta">
                <div class="date">发布于:{{article.createAt}}</div>
                <div class="category" @click="linkTo(article.category._id,'category')">| # {{article.category.name}}
                </div>
                <div class="comment">{{article.meta.viewCount}}</div>
            </div>
            <div class="content">
                <p v-html="compileDesc"></p>
                <hr class="hr"/>
                <article v-html="compileArticle"></article>
            </div>
            <p>-- EOF --</p>
            <div class="tags"># <span class="tag" @click="linkTo(tag._id,'tag')" v-for="tag of article.tags"
                                      :key="tag._id">{{tag.name}}</span></div>
            <p>
                <span>本文链接:<a class="article-url" @click="linkTo(article._id)">{{url}} </a></span>
            </p>
            <div class="update">最后更新于: {{article.updated}}</div>
        </div>
        <!--todo-->
        <!--<div class="article-nav">-->
        <!--<div class="pre" v-if="preArticle._id" @click="linkTo(preArticle._id)"> < 上一篇: {{preArticle.title}}</div>-->
        <!--<div v-else></div>-->
        <!--<div class="next" v-if="nextArticle._id" @click="linkTo(nextArticle._id)"> 下一篇: {{nextArticle.title}} ></div>-->
        <!--</div>-->
        <div>
            <Comment @reply="replyHandler" @replyComment="replyCommentHandler" :comments="comments"></Comment>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import {getArticle, getComment, postComment, putComment} from "../../http/api";
    import Comment from "../../components/common/comment";
    import marked from '../../util/markdown';

    export default {
        name: "articleDetail",
        data() {
            return {
                article: null,
                comments: null,
                preArticle: null,
                nextArticle: null,
                url: null
            }
        },
        components: {
            Comment,
        },
        computed: {
            ...mapState(['articleList']),
            compileArticle() {
                return marked(this.article.body, {sanitize: true})
            },
            compileDesc() {
                return marked(this.article.desc, {sanitize: true})
            }
        },
        methods: {
            async fetchArticle() {
                const _id = this.$route.params._id;
                const rsp = await getArticle(_id);
                this.article = rsp.data.article;
                this.comments = rsp.data.comments;
                this.url = window.location.href
            },
            linkTo(_id, location = 'article') {
                this.$router.push({name: location, params: {_id}})
            },
            ...mapActions({
                getArticleList: 'getArticleList'
            }),
            getNextArticle() {
                setTimeout(() => {
                    const _id = this.$route.params._id;
                    const list = this.articleList;
                    const _len = list.length;
                    for (let i = 0, item = list[0]; item = list[i++];) {
                        if (item._id === _id) {
                            if (i < _len) {
                                this.nextArticle = list[i]
                            } else {
                                this.nextArticle = null
                            }
                            if (i > 0) {
                                this.preArticle = list[i - 2]
                            } else {
                                this.preArticle = null
                            }
                            break;
                        }

                    }
                }, 200)
            },
            storageHandler(name, email) {
                const storage = window.localStorage;
                storage.setItem('user_info', JSON.stringify({name, email}));
                return storage.getItem('_id')
            }
            ,
            async replyHandler(info) {
                const [name, email, content] = info;
                const user_id = this.storageHandler(name, email);
                const data = {
                    user: {
                        name,
                        email,
                    },
                    comment: {
                        article: this.article._id,
                        content: content,
                        from: user_id,
                    }
                };
                const rsp = await postComment(data);
                if (rsp) {
                    const r = await getComment(rsp.data.article);
                    this.comments = r.data
                }
            },
            async replyCommentHandler(info) {
                const [_id, to_id, content] = info;
                const user_id = window.localStorage.getItem('_id');
                const data = {
                    user: {},
                    comment: {
                        from: user_id,
                        to: to_id,
                        content,
                        created: new Date(),
                    },
                };
                const rsp = await putComment(_id, data);
                if (rsp) {
                    const r = await getComment(rsp.data.article);
                    this.comments = r.data
                }
            },
        },
        created() {
            this.fetchArticle();
            if (this.articleList.length < 1) {
                this.getArticleList()
            }
        },
        mounted() {
            this.getNextArticle()

        },
        beforeRouteUpdate(to, from, next) {
            if (to.path !== from.path) {
                this.fetchArticle();
                this.getNextArticle()
            }
            next()
        },
        beforeRouteEnter(to, from, next) {
            const storage = window.localStorage;
            const _ida = storage.getItem('_ida');
            if (_ida && to.params._id === _ida) {
                storage.setItem('_ida', ':')
            }
            next()
        },
    }
</script>

<style scoped lang="scss">
    @import "../../assets/style/index";

    @mixin h {
        color: $date;
        cursor: pointer;
        &:hover {
            color: $link;
        }
        transition: color 1s ease-out;
    }

    .article-wrap {
        padding-top: 1.25em;
        box-sizing: border-box;
        .article-content {
            padding: 1.5625em 0 0.9375em;
            text-align: left;
            .article-title {
                margin: 0;
                color: $title;
                font: bold 1.5625em/1.1 ff-tisa-web-pro, Cambria, "Times New Roman", Georgia, Times, sans-serif;
            }
            .article-meta {
                width: 100%;
                padding: 0;
                margin: 0.9375em 0;
                color: $date;
                text-indent: .15em;
                display: inline-block;
                line-height: 1.3em;
                overflow: hidden;
                .date {
                    display: inline-block;
                }
                .category {
                    display: inline-block;
                    @include h;
                }
                .comment {
                    display: inline-block;
                    float: right;
                    margin-right: 5em;
                    text-indent: .15em;
                }
            }
            .article-url {
                @include h;
            }
            .content {
                font-size: 0.9375em;
                line-height: 1.5em;
                color: $word;
                padding-top: .9375em;
                word-break: keep-all;
                text-indent: 2em;
                .hr {
                    background-color: $block;
                    height: 1px;
                    border: none;
                }
            }
            .tag {
                margin-right: 1em;
                @include h;
            }
        }
        .article-nav {
            margin-bottom: 1.25em;
            padding: 1em 0.625em;
            white-space: nowrap;
            border-top: 1px solid $block;
            display: flex;
            justify-content: space-between;
            .pre, .next {
                display: inline-block;
                line-height: 1.5625em;
                font-size: 0.9375em;
                @include h;
            }
        }
    }

</style>
