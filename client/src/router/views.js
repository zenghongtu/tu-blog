/**
 * Created by zenghongtu on 27/09/2018.
 * Desc: view
 */

const views = {
    Read: () => import(/* webpackChunkName: "login" */'@/views/read/index.vue'),
    Explore: () => import(/* webpackChunkName: "read " */'@/views/explore/index.vue'),
    Archive: () => import(/* webpackChunkName: "explore " */'@/views/archive/index.vue'),
    About: () => import(/* webpackChunkName: "archive " */'@/views/about/index.vue'),
    Laboratory: () => import(/* webpackChunkName: "about " */'@/views/laboratory/index.vue'),
    Home: () => import(/* webpackChunkName: "laboratory " */'@/views/home/index.vue'),
    Article: () => import(/* webpackChunkName: "home " */'@/views/article/index.vue'),
    Category: () => import(/* webpackChunkName: "article " */'@/views/category/index.vue'),
    Tag: () => import(/* webpackChunkName: "category " */'@/views/tag/index.vue'),
    NotFound: () => import(/* webpackChunkName: "category " */'@/views/not-found/index.vue'),
};

export default views
