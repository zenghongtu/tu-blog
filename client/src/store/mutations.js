/**
 * Created by zenghongtu on 20/09/2018
 * Desc: mutations
 */

import {SAVE_PAGE_ARTICLES, SAVE_SIDEBAR_ITEMS,} from "./mutation-types";

export default {
    [SAVE_PAGE_ARTICLES](state, data) {
        state.articleTotal = data.total;
        state.curPage = data.page;
        state.pageArticles[data.page] = data.data;
    },
    [SAVE_SIDEBAR_ITEMS](state, data) {
        state.categories = data.categories;
        state.tags = data.tags;
        state.topArticles = data.topArticles
    }
}
