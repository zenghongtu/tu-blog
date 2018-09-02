/**
 * Created by zenghongtu on 02/09/2018
 * Desc: router 入口文件
 */

import Vue from 'vue'
import Router from 'vue-router'
import Read from '../views/read';
import Explore from '../views/explore';
import Archive from '../views/archive';
import About from '../views/about';
import Laboratory from '../views/laboratory';
import Home from '../views/home';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/read',
            name: 'read',
            component: Read
        },
        {
            path: '/explore',
            name: 'explore',
            component: Explore
        },
        {
            path: '/archive',
            name: 'archive',
            component: Archive
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/laboratory',
            name: 'laboratory',
            component: Laboratory
        },
        {
            path: '/',
            name: 'home',
            component: Home
        }
    ]
});

