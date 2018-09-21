/**
 * Created by zenghongtu on 20/09/2018
 * Desc: action
 */


import axios from "axios";
import {getArticleTitleList, getCategories, getPageArticles, getTags, getTopArticles} from '../http/api'
import {CHANGE_PAGE, SAVE_ARTICLE_TITLE_LIST, SAVE_PAGE_ARTICLES, SAVE_SIDEBAR_ITEMS} from "./mutation-types";
import {DEFAULT_LIMIT, INIT_PAGE} from "./constants";

const fetchPageArticles = async ({commit, state}, page = INIT_PAGE, limit = DEFAULT_LIMIT) => {
    let rsp = await getPageArticles(page, limit);
    const data = rsp.data;
    data.page = page;
    commit(SAVE_PAGE_ARTICLES, data)
};

const fetchSidebarItems = ({commit, state}) => {
    axios.all([getCategories(), getTags(), getTopArticles(),])
        .then(axios.spread((categories, tags, topArticles) => {
            const data = {};
            data.categories = categories.data;
            data.tags = tags.data;
            data.topArticles = topArticles.data.data;
            commit(SAVE_SIDEBAR_ITEMS, data)
        }))
};

const changePage = ({commit, state}, page) => {
    // if (!state.pageArticles[page]) {
    //     fetchPageArticles({commit, state}, page)
    // } else {
    commit(CHANGE_PAGE, page)
    // }
};

const getArticleList = async ({commit, state}) => {
    let rsp = await getArticleTitleList();
    commit(SAVE_ARTICLE_TITLE_LIST, rsp.data)
};

export default {
    fetchPageArticles,
    fetchSidebarItems,
    changePage,
    getArticleList
}
