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
            <tr v-for="book in bookList" :key="book._id">
                <td class="col-1"><span class="link"><i class="iconfont icon-book"></i> {{book.title}}</span></td>
                <td class="col-2">{{book.authors.join(', ')}}</td>
                <td class="col-3">
                    <ol type="I">
                        <li v-for="article in book.articles" :key="article._id">
                            <span class="link"><a @click="linkTo('article',article._id)">{{article.title}}</a></span>
                        </li>
                    </ol>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    import {getBooks} from "../../http/api";

    export default {
        name: "read",
        data() {
            return {
                bookList: null,
            }
        },
        methods: {
            async fetchBooks() {
                const rsp = await getBooks();
                this.bookList = rsp.data.data
            },
            linkTo(location, _id) {
                this.$router.push({name: location, params: {_id}})
            }
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
                @include link;
            }
        }
    }
</style>
