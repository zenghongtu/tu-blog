/**
* Created by zenghongtu on 24/09/2018
* Desc: comment
*/

<template>
    <div class="wrap">
        <h3 class="title"><label for="content">留言板:</label></h3>
        <div class="comment-box" id="comment">
            <div class="info-box">
                <input class="info" v-model="name" placeholder="name" type="text">
                <input class="info" v-model="email" placeholder="email" type="text">
            </div>
            <div class="content-box">
                <textarea id="content" class="content" ref="content" v-model="content"
                          :placeholder="placeholder"></textarea>
            </div>
            <button class="enter" @click="replyHandler">回复</button>
        </div>
        <div class="comment-list" v-if="comments">
            <div class="comment-card" v-for="comment in comments" :key="comment._id">
                <img src="http://p5yy6xq69.bkt.clouddn.com/avatar.png" alt="" class="gavatar">
                <div class="info">
                    <div class="head">
                        <div class="name">{{comment.from.name.slice(0,-6)}}</div>
                        <div class="agent"><span class="meta-item" v-for="(val,name) of comment.from.agent">
                        {{val}}</span></div>
                    </div>
                    <div class="meta">
                        <div class="time">{{comment.created|diffTime}}</div>
                        <div class="reply"
                             @click="replyCommentHandler(comment._id,comment.from._id,comment.from.name)">
                            回复
                        </div>
                    </div>
                    <div class="content">{{comment.content}}</div>
                    <div class="sub-comment-card" v-for="replyComment in comment.reply" :key="replyComment._id">
                        <img src="http://p5yy6xq69.bkt.clouddn.com/avatar.png" alt="" class="gavatar">
                        <div class="info">
                            <div class="head">
                                <div class="name">{{replyComment.from.name.slice(0,-6)}}</div>
                                <div class="agent"><span class="meta-item"
                                                         v-for="(val,name) of replyComment.from.agent">
                        {{val}}</span></div>
                            </div>
                            <div class="meta">
                                <div class="time">{{replyComment.created|diffTime}}</div>
                                <div class="reply"
                                     @click="replyCommentHandler(replyComment._id,replyComment.from._id,replyComment.from.name)">
                                    回复
                                </div>
                            </div>
                            <div class="content">
                                <div class="reply-name">
                                    @{{replyComment.to.name.slice(0,-6)}}
                                </div>
                                {{replyComment.content}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>来做第一个留言的人吧~</div>
    </div>
</template>

<script>
    export default {
        name: "comment",
        props: ['reply', 'comments', 'replyComment'],
        data() {
            return {
                name: '',
                email: '',
                content: '',
                placeholder: 'Write something.',
                _id: null,
                to_id: null,
                isChange: false,
            }
        },
        watch: {
            name(val, oldVal) {
                if (val !== oldVal) {
                    this.isChange = true
                }
            }
        },
        methods: {
            replyHandler() {
                if (this.to_id) {
                    this.$emit('replyComment', [this._id, this.to_id, this.content])
                } else {
                    this.$emit('reply', [this.isChange ? this.name + ('' + Date.now()).slice(7) : this.name, this.email, this.content])
                }
                this.content = ''
            },
            replyCommentHandler(_id, to_id, user_name) {
                this.placeholder = '@' + user_name;
                this.$refs['content'].focus();
                this._id = _id;
                this.to_id = to_id
            }
        },
        created() {
            const user_info = window.localStorage.getItem('user_info');
            if (user_info) {
                const {name, email} = JSON.parse(user_info);
                this.name = name;
                this.email = email
            }
        },
        filters: {
            diffTime(time) {
                if (!time) return '';
                const d = new Date(time);
                const oldTime = d.getTime();
                const currTime = +new Date();
                const duration = currTime - oldTime;

                // 参考 https://github.com/xCss/Valine/blob/2c85c6d735c439d6d196700b1461695aeb7dad59/src/index.js
                const days = Math.floor(duration / (24 * 3600 * 1000));
                if (days === 0) {
                    //计算相差小时数
                    const leave1 = duration % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
                    const hours = Math.floor(leave1 / (3600 * 1000));
                    if (hours === 0) {
                        //计算相差分钟数
                        const leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
                        const minutes = Math.floor(leave2 / (60 * 1000));
                        if (minutes === 0) {
                            //计算相差秒数
                            const leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
                            const seconds = Math.round(leave3 / 1000);
                            return seconds + ' 秒前';
                        }
                        return minutes + ' 分钟前';
                    }
                    return hours + ' 小时前';
                }
                if (days < 0) return '刚刚';
                if (days < 8) {
                    return days + ' 天前';
                } else {
                    return d.toLocaleDateString()
                }
            },
        }
    };
</script>

<style scoped lang="scss">
    @import '../../assets/style/variable';

    .wrap {
        width: 100%;
        margin-bottom: 3em;
        border-top: 1px solid $border;
        .title {
            text-align: left;
        }
        .comment-box {
            overflow: hidden;
            border: 1px solid $border;
            padding: 1.5em .5em .5em;
            border-radius: .3em;
            margin-bottom: 2em;
            .info-box {
                .info {
                    width: 45%;
                    outline: none;
                    border: none;
                }
            }
            .content-box {
                .content {
                    width: 100%;
                    height: 6em;
                    outline: none;
                    border: none;
                    margin-top: 2em;
                    resize: vertical;
                }
            }
            .enter {
                float: right;
                width: 5em;
                height: 2.3em;
                margin-top: 1em;
                border: 1px solid $border;
                line-height: 2.3em;
                border-radius: .3em;
                font-weight: 200;
                outline-style: none;
                cursor: pointer;
                &:hover {
                    background: $btn-active-bg;
                }
            }
        }
        .comment-list {
            padding: 2em .4em;
            text-align: center;
            .comment-card {
                border-bottom: 1px solid $border;
                text-align: left;
                padding-top: 1.5em;
                .gavatar {
                    width: 2.5em;
                    height: 2.5em;
                    float: left;
                    border-radius: 50%;
                    margin-right: .7525em;
                    border: 1px solid #f5f5f5;
                    padding: .125em;
                }
                .info {
                    overflow: hidden;
                    .head {
                        .name {
                            color: $link;
                            cursor: pointer;
                            display: inline-block;
                            line-height: 1.9em;
                        }
                        .agent {
                            display: inline-block;
                            .meta-item {
                                background: $btn-active-bg;
                                padding: .4em;
                                box-sizing: border-box;
                                font-size: .8rem;
                                margin-left: 1em;
                                border-radius: .3em;
                            }
                        }
                    }
                    .meta {
                        overflow: hidden;
                        .time {
                            font-size: .7em;
                        }
                        .reply {
                            float: right;
                            color: $btn-active-border;
                            cursor: pointer;
                        }
                    }
                    .content {
                        padding: 1em 0;
                        box-sizing: border-box;
                        text-align: left;
                        .reply-name {
                            padding-bottom: 1em;
                            font-weight: 800;
                        }
                    }
                    .sub-comment-card {
                        overflow: hidden;
                    }
                }

            }
        }
    }
</style>
