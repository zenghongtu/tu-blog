/**
* Created by zenghongtu on 02/09/2018
* Desc: explore
*/

<template>
    <div class="wrap">
        <main class="left">main</main>
        <Sidebar class="right"></Sidebar>
    </div>
</template>

<script>
    import Sidebar from "./sidebar";


    export default {
        name: "explore",
        components: {
            Sidebar
        },
        data() {
            return {
                articles: undefined
            }
        },
        created() {
            this.$ajax.get('/articles').then(res => {

            })
        }
    }
</script>

<style scoped lang="scss">
    .wrap {
        display: flex;
        .left {
            flex: 3;
        }
        .right {
            flex: 1;
        }
    }
</style>
