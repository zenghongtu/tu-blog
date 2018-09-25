/**
* Created by zenghongtu on 02/09/2018
* Desc: about
*/

<template>
    <div class="about-wrap">
        <div class="about-content">
            <div class="about-item">
                <div class="about-title">Welcome,</div>
                <h4>小站第<span class="light">{{uniqueVisitors}}</span>位访客</h4>
                <h5>访问过小站<span class="light">{{views}}</span>次页面</h5>
            </div>
            <div class="about-item">
                <div class="about-title">About site</div>
                <h4>本站一共被访问过<span class="light">{{pageViews}}</span>次</h4>
                <h5>已稳定运行<span class="light">{{days}}</span>天
                    <span class="light">{{hours}}</span>小时
                    <span class="light">{{minutes}}</span>分钟
                    <span class="light">{{seconds}}</span>秒</h5>
            </div>
            <div class="about-item">
                <div class="about-title">About me</div>
                <h3>全干码农一枚</h3>
                <hr>
                <h4 class="typing">My slogan: {{type}}</h4><i v-if="isTyping" class="flash"></i>
                <hr>
                <h5 class="job">目前就职于一家人工智能企业</h5>
            </div>
            <div class="about-item">
                <div class="about-title">Contact me</div>
                <ul class="contact-info">
                    <li class="email">邮箱:<span><a class="link"
                                                  href="mailto:zenghongtu@gmail.com">zenghongtu@gmail.com</a></span>
                    </li>
                    <li class="github">GitHub:<span><a class="link" href="https://github.com/zenghongtu">https://github.com/zenghongtu</a></span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {getSiteInfo} from "../../http/api";

    export default {
        name: "about",
        data() {
            return {
                slogan: '两眼不闻两届事,一心只写一代码.',
                type: '',
                isTyping: true,
                pageViews: '',
                viewNum: '',
                uniqueVisitors: '',
                start_time: '',
                days: '',
                hours: '',
                minutes: '',
                seconds: '',
            }
        },
        methods: {
            generateSlogan() {
                const s = this.slogan;
                const len = s.length;
                let i = 0;
                const timer = setInterval(() => {
                    this.type += s[i];
                    if (++i >= len) {
                        clearInterval(timer);
                        this.isTyping = false
                    }
                }, 250)
            },
            timer() {
                setInterval(
                    () => {
                        const date = Date.now() - new Date(this.start_time).getTime();
                        const days = Math.floor(date / (24 * 3600 * 1000));
                        const value1 = date % (24 * 3600 * 1000);
                        const hours = Math.floor(value1 / (3600 * 1000));
                        const value2 = value1 % (3600 * 1000);
                        const minutes = Math.floor(value2 / (60 * 1000));
                        const value3 = value2 % (60 * 1000);
                        const seconds = Math.round(value3 / 1000);
                        this.days = days;
                        this.hours = hours;
                        this.minutes = minutes;
                        this.seconds = seconds
                    }, 900
                )
            },
            async fetchSiteInfo() {
                const rsp = await getSiteInfo();
                const site = rsp.data.site;
                const visitor = rsp.data.visitor;
                if (visitor) {
                    this.viewNum = visitor.visits;
                } else {
                    window.localStorage.removeItem('_id')
                }
                this.pageViews = site.pv;
                this.uniqueVisitors = site.uv;
                this.start_time = rsp.data.start_time;
                this.timer();
                this.generateSlogan()
            },
        },
        created() {
            this.views = window.localStorage.getItem('views')
        },
        mounted() {
            this.fetchSiteInfo();
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/style/index";

    .about-wrap {
        margin-top: 2.8125em;
        padding-bottom: 1.25em;
        .about-content {
            .about-item {
                line-height: 1em;
                .about-title {
                    margin-top: 3em;
                    font-weight: 100;
                }
                .light {
                    font-weight: 900;
                    margin: 0 .3em;
                }
                .typing {
                    display: inline-block;
                    margin: .5em 0;
                }
                .flash {
                    width: 2px;
                    height: 1em;
                    display: inline-block;
                    background: $black;
                }
                .contact-info {
                    list-style: none;
                    .link {
                        text-decoration: underline;
                        color: $black;
                    }
                    @include link;
                }
            }
        }
    }

</style>
