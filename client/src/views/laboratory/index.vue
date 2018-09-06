/**
* Created by zenghongtu on 02/09/2018
* Desc: laboratory
*/

<template>
    <div class="lab-wrap">
        <div class="lab-content" v-for="(project,key) in projects" :key="key">
            <div class="item-title">{{key.toUpperCase()}}:</div>
            <ul class="item-wrap">
                <li class="item-content" v-for="info in project">
                    <h5 class="item-name"><i class="fa">#</i><a class="link" :href="info.url">{{info.name}}</a></h5>
                    <div class="item-desc">{{info.desc}}</div>
                    <div class="item-star">star: {{info.star}}</div>
                    <div class="item-fork">fork: {{info.fork}}</div>
                    <ol type="i" class="item-articles-wrap">
                        <li class="item-articles-content" v-for="(item,idx) in info.articles" :key="item.id">
                            {{idx}}: <span class="link">{{item.article}}</span>
                        </li>
                    </ol>
                </li>
                <li class="item-content" style="visibility: hidden" v-if="Object.keys(project).length%2!==0"></li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "laboratory",
        data() {
            return {
                projects: null
            }
        },
        methods: {
            async fetchProjects() {
                const rsp = await this.$ajax.get(`/projects`);
                this.projects = rsp.data;
            },
        },
        created() {
            this.fetchProjects()
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/style/index";

    $_border: 1px solid $border;

    %overflow {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .lab-wrap {
        margin-top: 2.8125em;
        .lab-content {
            .item-title {
                font-size: 1rem;
                color: $black;
                font-family: Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                margin-top: 1.5em;
                margin-bottom: .5em;
                box-sizing: border-box;
                text-align: left;
            }
            .item-wrap {
                width: 100%;
                padding: 0;
                list-style: none;
                margin-bottom: 1.5em;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-evenly;
                word-break: keep-all;
                .item-content {
                    width: 31.125em;
                    height: 10.375em;
                    box-sizing: border-box;
                    margin-bottom: 1em;
                    padding: 2em;
                    border: $_border;
                    border-radius: .25em;
                    text-align: left;
                    overflow: hidden;
                    position: relative;
                    &:hover {
                        .item-articles-wrap {
                            transition: bottom .5s ease-out;
                            bottom: -35%;
                        }
                    }
                    .item-name {
                        margin: 0;
                        font-size: 1rem;
                        line-height: 1.3125em;
                        max-width: 28.75em;
                        @extend %overflow;
                        .fa {
                            padding-right: .3125em;
                        }
                        .link {
                            color: $link;
                            text-decoration: none;
                            &:hover {
                                text-decoration: underline;
                            }
                        }
                    }
                    .item-desc {
                        margin: 1.2em 0 1.8em;
                        font-size: .9em;
                        color: $word;

                    }
                    .item-star, .item-fork {
                        display: inline-block;
                        margin: .5em 2em 0 .5em;
                        font-size: .9em;
                        color: $black;
                    }
                    .item-articles-wrap {
                        width: 100%;
                        height: 100%;
                        line-height: 1.5em;
                        background: $background;
                        padding: 1em 2em 0;
                        box-sizing: border-box;
                        border-top: $_border;
                        position: absolute;
                        bottom: -100%;
                        left: 0;
                        .item-articles-content {
                            @extend %overflow;
                            .link {
                                cursor: pointer;
                                &:hover {
                                    color: $word;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>

update user set authentication_string=PASSWORD("anfu@A7") where User='root';
