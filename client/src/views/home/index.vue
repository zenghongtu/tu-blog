/**
* Created by zenghongtu on 02/09/2018
* Desc: home
*/

<template>
    <div class="site-wrap">
        <div class="site-content">
            <h2>欢迎您,本站第{{visitorNum}}位访客</h2>
            <h2>您打开过本站{{ viewNum}}次</h2>
            <h2>本站一共被访问过{{pageNum}}次</h2>
            <h2>本站已存活{{runtime}}秒</h2>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                pageNum: null,
                runtime: null,
                viewNum: null,
                visitorNum: null,
            }
        },
        methods: {
            async fetchSiteInfo() {
                const rsp = await this.$ajax.get(`/siteinfo`);
                const data = rsp.data;
                this.pageNum = data.pageNum;
                this.runtime = data.runtime;
                this.viewNum = data.viewNum;
                this.visitorNum = data.visitorNum
            },
        },
        created() {
            this.fetchSiteInfo()
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/style/index";

    .site-wrap {
        width: 100vw;
        overflow: hidden;
        .site-content {
            margin-top: 3em;
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            right: 0;
            background-color: $background;
        }
    }
</style>
