/**
* Created by zenghongtu on 02/09/2018
* Desc: read
*/

<template>
    <div class="table-wrap">
        <table class="table-content">
            <tr>
                <th>书名</th>
                <th>作者</th>
                <th>我de读感</th>
            </tr>
            <tr v-for="(info,idx) in bookList" :key="idx">
                <td class="col-1"><span class="link">{{info.title}}</span></td>
                <td class="col-2">{{info.authors.join(', ')}}</td>
                <td class="col-3">
                    <ol type="I">
                        <li v-for="(item,i) in info.articles" :key="i">
                            <span class="link">{{item.article}}</span>
                        </li>
                    </ol>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: "read",
        data() {
            return {
                bookList: null,
            }
        },
        methods: {
            async fetchBooks() {
                const rsp = await this.$ajax.get(`/books`);
                this.bookList = rsp.data
            },
        },
        created() {
            this.fetchBooks()
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/style/index";

    $w: 1px dotted $word;

    .table-wrap {
        margin-top: 1.875em;
        .table-content {
            width: 100%;
            border-collapse: collapse;
            th {
                color: $title;
                padding-bottom: .5em;
                border-bottom: 1px solid $word;
            }
            td {
                padding: .8em .5em;
                word-break: keep-all;
                text-align: left;
                border-bottom: $w;
                line-height: 1.4em;
                color: $base;
            }
            .col-1,
            .col-2 {
                width: 25%;
            }
            .col-2 {
                border-left: $w;
                border-right: $w;
                text-align: center;
            }
            .col-1, .col-3 {
                .link {
                    cursor: pointer;
                    &:hover {
                        color: $word;
                    }
                }
            }
        }
    }
</style>
