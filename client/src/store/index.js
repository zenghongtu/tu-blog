/**
 * Created by zenghongtu on 20/09/2018
 * Desc: index
 */

import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations'
import actions from './action'
import getters from './getters'
import {INIT_PAGE} from "./constants";

Vue.use(Vuex);

const state = {
    pageArticles: [],
    articleTotal: null,
    curPage: INIT_PAGE,
    curArticleNum: null,
    categories: [],
    tags: [],
    topArticles: [],
    articleList: null,
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
});

