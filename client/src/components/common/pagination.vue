/**
* Created by zenghongtu on 04/09/2018.
* Desc: pagination
*/

<template>
    <div class="page-navigator">
        <span :class="[prevPage?'':'hidden','prev-btn']" @click="changePage(prevPage)">上一页</span>
        <span class="page-btn-wrap">
            <span :class="[curPage===page?'page-current':'',page?'':'page-sep','page-btn']"
                  v-for="(page,idx) in showPage"
                  v-text="page? page:'...'" @click="changePage(page)"></span>
        </span>
        <span :class="[nextPage?'':'hidden','next-btn']" @click="changePage(nextPage)">下一页</span>
    </div>
</template>

<script>
    export default {
        name: "pagination",
        props: {
            totalPage: Number,
            curPage: Number,
        },
        computed: {
            prevPage() {
                return (this.curPage > 1 && this.curPage - 1)
            },
            nextPage() {
                return (this.curPage < this.totalPage && this.curPage + 1)
            },
            showPage() {
                const totalPage = this.totalPage;
                const curPage = this.curPage;
                if (totalPage <= 7) {
                    return [...new Array(totalPage)].map((v, i) => i + 1)
                } else {
                    if (curPage < 5) {
                        return [...[...new Array(curPage)].map((v, i) => i + 1), curPage + 1, curPage + 2, 0, totalPage]
                    } else {
                        if (totalPage - curPage >= 4) {
                            return [1, 0, curPage - 2, curPage - 1, curPage, curPage + 1, curPage + 2, 0, totalPage]
                        } else {
                            return [1, 0, curPage - 2, curPage - 1, curPage, ...[...new Array(totalPage - curPage)]
                                .map((v, i) => i + 1 + curPage)]
                        }
                    }
                }
            }
        },
        methods: {
            changePage(page) {
                if (!page) return false;
                this.$emit('getNewArticles', page)
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/style/index";

    $height: 1.785em;
    $top: $height;
    $_border: 1px solid $border;

    @mixin active {
        border-bottom-color: $btn-active-border;
        background-color: $btn-active-bg;
    }

    @mixin p {
        display: inline-block;
        height: $height;
        line-height: 2em;
        padding: .357em .642em;
        border: $_border;
        text-align: center;
        cursor: pointer;
        transition: border-bottom .3s ease-in;
        &:hover {
            @include active;
        }
    }

    .page-navigator {
        display: flex;
        justify-content: space-between;
        font-size: .875rem;
        margin-top: $top;
        padding-top: $top;
        border-top: $_border;
        user-select: none;
        .prev-btn, .next-btn {
            @include p;
        }
        .page-btn-wrap {
            .page-btn {
                margin: 0 .357em .357em 0;
                @include p;
            }
            .page-current {
                @include active;
            }
            .page-sep {
                padding: .357em .357em;
                margin-right: .357em;
                border: none;
                cursor: default;
                &:hover {
                    border: none;
                    background-color: $background;
                }
            }
        }
        .hidden {
            visibility: hidden;
        }
    }
</style>
