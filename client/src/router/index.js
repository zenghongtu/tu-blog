/**
 * Created by zenghongtu on 02/09/2018
 * Desc: router 入口文件
 */

import Vue from 'vue';
import Router from 'vue-router';
import views from './views'

Vue.use(Router);


const router = new Router({
    routes: [
        {
            path: '/read',
            name: 'read',
            component: views.Read,
        },
        {
            path: '/tag/:views._id',
            name: 'tag',
            component: views.Tag,
        },
        {
            path: '/category/:_id',
            name: 'category',
            component: views.Category,
        },
        {
            path: '/explore',
            name: 'explore',
            component: views.Explore,
        },
        {
            path: '/archive',
            name: 'archive',
            component: views.Archive,
        },
        {
            path: '/about',
            name: 'about',
            component: views.About,
        },
        {
            path: '/laboratory/',
            name: 'laboratory',
            component: views.Laboratory,
        },
        {
            path: '/article/:_id',
            name: 'article',
            component: views.Article
        },
        {
            path: '/',
            name: 'home',
            component: views.Home,
        },
        {
            path: '*',
            name: 'NotFound',
            component: views.NotFound
        }
    ],
});


export default router
