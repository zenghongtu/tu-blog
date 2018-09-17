/**
 * Created by zenghongtu on 02/09/2018
 * Desc: router 入口文件
 */

import Vue from 'vue';
import Router from 'vue-router';
import Read from '../views/read/index.vue';
import Explore from '../views/explore/index.vue';
import Archive from '../views/archive/index.vue';
import About from '../views/about/index.vue';
import Laboratory from '../views/laboratory/index.vue';
import Home from '../views/home/index.vue';
import Article from '../views/article/index.vue';
import Category from '../views/category/index.vue';
import Tag from '../views/tag/index.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/read',
            name: 'read',
            component: Read,
        },
        {
            path: '/tag/:_id',
            name: 'tag',
            component: Tag,
        },
        {
            path: '/category/:_id',
            name: 'category',
            component: Category,
        },
        {
            path: '/explore',
            name: 'explore',
            component: Explore,
        },
        {
            path: '/archive',
            name: 'archive',
            component: Archive,
        },
        {
            path: '/about',
            name: 'about',
            component: About,
        },
        {
            path: '/laboratory/',
            name: 'laboratory',
            component: Laboratory,
        },
        {
            path: '/article/:_id',
            name: 'article',
            component: Article,
        },
        {
            path: '/',
            name: 'home',
            component: Home,
        },
    ],
});

