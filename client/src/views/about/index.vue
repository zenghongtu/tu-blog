/**
* Created by zenghongtu on 02/09/2018
* Desc: about
*/

<template>
    <div class="about-wrap">
        <div class="about-content">
            <div class="about-item">
                <div class="about-title">About me</div>
                <h3>全干码农一枚</h3>
                <h5 class="job">目前就职于一家人工智能企业</h5>
                <hr>
                <h4 class="typing">{{type}}</h4><i v-if="isTyping" class="flash"></i>
                <hr>
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
        },
        mounted() {
            this.fetchAboutInfo()
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
                line-height: 1.2em;
                .typing {
                    display: inline-block;
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
