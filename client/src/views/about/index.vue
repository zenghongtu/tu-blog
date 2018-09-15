/**
* Created by zenghongtu on 02/09/2018
* Desc: about
*/

<template>
    <div class="about-wrap">
        <div class="about-content">
            <div class="about-item">
                <div class="about-title">About site</div>
                <h4>您是本站第<span class="light">{{visitorNum}}</span>位访客</h4>
                <h5>访问过本站<span class="light">{{ viewNum}}</span>次页面</h5>
                <h4>本站一共被访问过<span class="light">{{pageNum}}</span>次</h4>
                <h5>已经稳定运行<span class="light">{{runtime}}</span>秒</h5>
            </div>
            <div class="about-item">
                <div class="about-title">About me</div>
                <h3>全干码农一枚</h3>
                <hr>
                <h4 class="typing">{{type}}</h4><i v-if="isTyping" class="flash"></i>
                <hr>
                <h5 class="job">目前就职于一家人工智能企业</h5>
            </div>
            <div class="about-item">
                <div class="about-title">Contact me</div>
                <ul class="contact-info">
                    <li class="email">邮箱:<span class="link">zenghongtu@gmail.com</span></li>
                    <li class="github">GitHub:<span class="link">https://github.com/zenghongtu</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "about",
        data() {
            return {
                slogan: '',
                type: '',
                isTyping: true,
                pageNum: '',
                runtime: '',
                viewNum: '',
                visitorNum: '',
            }
        },
        methods: {
            generateSlogan(s) {
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
            async fetchAboutInfo() {
                const rsp = await this.$ajax.get(`/aboutinfo`);
                const data = rsp.data;
                const slogan = data.slogan;
                this.generateSlogan(slogan)
            },
            async fetchSiteInfo() {
                const rsp = await this.$ajax.get(`/siteinfo`);
                const data = rsp.data;
                this.pageNum = data.pageNum;
                this.runtime = data.runtime;
                this.viewNum = data.viewNum;
                this.visitorNum = data.visitorNum
            },
        },
        mounted() {
            this.fetchAboutInfo();
            this.fetchSiteInfo()
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
                    }
                    @include link;
                }
            }
        }
    }

</style>
