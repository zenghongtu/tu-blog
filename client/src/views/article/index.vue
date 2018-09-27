/**
* Created by zenghongtu on 07/09/2018
* Desc: article
*/

<template>
    <div class="article-wrap">
        <div class="article-content" v-if="article">
            <h2 class="article-title">{{article.title}}</h2>
            <div class="article-meta">
                <div class="date">发布于: {{article.created}}</div>
                <div class="category" @click="linkTo(article.category._id,'category')"> &nbsp;|&nbsp;&nbsp; <i
                        class="iconfont icon-icon"></i> {{article.category.name}}
                </div>
                <div class="comment">{{article.meta.viewCount}} <i class="iconfont icon-liulan1"></i></div>
            </div>
            <div class="content">
                <p v-html="compileDesc"></p>
                <hr class="hr"/>
                <article v-html="compileArticle"></article>
            </div>
            <p>-- EOF --</p>
            <div class="tags"><span class="tag" @click="linkTo(tag._id,'tag')" v-for="tag of article.tags"
                                    :key="tag._id"><i class="iconfont icon-labeltag"></i>  {{tag.name}}</span></div>
            <p>
                <span>本文链接:<a class="article-url" @click="linkTo(article._id)">{{url}} </a></span>
            </p>
            <div class="update">最后更新于: {{article.updated}}</div>
        </div>
        <div class="article-nav">
            <div class="pre" v-if="getNextArticle[0]" @click="linkTo(getNextArticle[0]._id)"> < 上一篇:
                {{getNextArticle[0].title}}
            </div>
            <div v-else></div>
            <div class="next" v-if="getNextArticle[1]" @click="linkTo(getNextArticle[1]._id,true)"> 下一篇:
                {{getNextArticle[1].title}}
                >
            </div>
        </div>
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
                url: null
            }
        },
        components: {
            Comment,
        },
        computed: {
            ...mapState({
                // articleList: 'articleList',
                getNextArticle(state) {
                    // const curArticleNum = state.curArticleNum
                    const articleList = state.articleList;
                    const _len = articleList.length;
                    if (_len < 1) {
                        this.getArticleList();
                        return []
                    }
                    return this.computeArticleNum(state.articleList);
                },
                // todo 优化
                // curArticleNum: 'curArticleNum',
            }),
            compileArticle() {
                return marked(this.article.body, {sanitize: true})
            },
            compileDesc() {
                return marked(this.article.desc, {sanitize: true})
            }
        },
        methods: {
            ...mapActions(['getArticleList', 'changeCurArticleNum']),
            computeArticleNum(list) {
                const _id = this.$route.params._id;
                const _len = list.length;
                for (let i = 0, item = list[0]; item = list[i++];) {
                    if (item._id === _id) {
                        let nextArticle = null;
                        let preArticle = null;
                        if (i < _len) {
                            nextArticle = list[i]
                        }
                        if (i > 0) {
                            preArticle = list[i - 2]
                        }
                        return [preArticle, nextArticle]
                    }
                }
            },
            async fetchArticle() {
                const _id = this.$route.params._id;
                const rsp = await getArticle(_id);
                this.article = rsp.data.article;
                this.comments = rsp.data.comments;
                this.url = window.location.href
            },
            linkTo(_id, next = false, location = 'article',) {
                next ? this.changeCurArticleNum(this.curArticleNum + 1)
                    : this.changeCurArticleNum(this.curArticleNum - 1);

                this.$router.push({name: location, params: {_id}})
            },
            storageHandler(name, email) {
                localStorage.setItem('user_info', JSON.stringify({name, email}));
                return localStorage.getItem('_id')
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
                const user_id = localStorage.getItem('_id');
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
            scrollToTop() {
                window.scrollTo(0, 0);
            },
        },
        created() {
            this.fetchArticle()
        },
        beforeRouteUpdate(to, from, next) {
            if (to.path !== from.path) {
                this.fetchArticle();
                this.scrollToTop()
            }
            next()
        },
        beforeRouteEnter(to, from, next) {
            const _ida = localStorage.getItem('_ida');
            if (_ida && to.params._id === _ida) {
                localStorage.setItem('_ida', ':')
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
