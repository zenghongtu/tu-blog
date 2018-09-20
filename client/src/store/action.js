/**
 * Created by zenghongtu on 20/09/2018
 * Desc: action
 */


import axios from "axios";
import {getCategories, getPageArticles, getTags, getTopArticles} from '../http/api'
import {SAVE_PAGE_ARTICLES, SAVE_SIDEBAR_ITEMS} from "./mutation-types";
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

export default {
    fetchPageArticles,
    fetchSidebarItems,
}
