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
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
