/**
 * Created by zenghongtu on 20/09/2018
 * Desc: index
 */

import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex);

const state = {
    pageArticles: [],
    articleTotal: null,
    curPage: 1,
    categories: [],
    tags: [],
    topArticles: [],
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
});

