/**
* Created by zenghongtu on 04/09/2018.
* Desc: pagination
*/

<template>
    <div class="page-navigator">
        <span class="prev-btn">上一页</span>
        <span class="page-btn-wrap">
            <span class="page-btn">1</span>
            <span class="page-btn">2</span>
            <span class="page-btn">3</span>
            <span class="page-btn page-current">3</span>
            <span class="page-btn">3</span>
            <span class="page-sep">...</span>
            <span class="page-btn">3</span>
        </span>
        <span class="next-btn">下一页</span>
    </div>
</template>

<script>
    export default {
        name: "pagination",
        props: {
            totalPage: Number,
            curPage: Number,
        },
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
        margin-top: $top;
        padding-top: $top;
        border-top: $_border;
        font-size: .875rem;
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
            }
        }
    }
</style>
