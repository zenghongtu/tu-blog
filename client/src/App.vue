/**
* Created by zenghongtu on 02/09/2018
* Desc: App
*/

<template>
    <div id="app">
        <Header></Header>
        <router-view/>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from '@/components/header';
    import Footer from '@/components/footer';

    export default {
        name: "App",
        components: {
            Header,
            Footer
        }
    }
</script>

<style lang="scss" scoped>
    @import './assets/style/index';

    #app {
        @include font();
        color: $base;
        text-align: center;
        padding: 0 60px;
        max-width: 1150px;
        margin: 0 auto;
        @media all and (max-width: $maxWidth) {
            padding: 0 30px;
        }
    }

</style>
