/**
 * Created by zenghongtu on 20/09/2018
 * Desc: mutations
 */

import {CHANGE_PAGE, SAVE_PAGE_ARTICLES, SAVE_SIDEBAR_ITEMS, SAVE_ARTICLE_LIST} from "./mutation-types";

export default {
    [SAVE_PAGE_ARTICLES](state, data) {
        state.articleTotal = data.total;
        state.curPage = data.page;
        const newState = [...state.pageArticles];
        newState[data.page] = data.data;
        state.pageArticles = newState
    },
    [SAVE_SIDEBAR_ITEMS](state, data) {
        state.categories = data.categories;
        state.tags = data.tags;
        state.topArticles = data.topArticles
    },
    [CHANGE_PAGE](state, page) {
        state.curPage = page
    },
    [SAVE_ARTICLE_LIST](state, data) {
        state.articleList = data.data;
        state.articleTotal = data.total
    }
}
