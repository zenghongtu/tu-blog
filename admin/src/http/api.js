/**
 * Created by zenghongtu on 09/09/2018
 * Desc: server
 */

import $ajax from './config'

export const getSiteInfo = () => {
    return $ajax.get('/siteInfo')
};

export const saveArticle = (content) => {
    return $ajax.post('/articles', content)
};

export const deleteArticle = (id) => {
    return $ajax.delete(`/articles/${id}`)
};

export const updateArticle = (id, content) => {
    return $ajax.put(`/articles/${id}`, content)
};

export const getArticleList = (page, limit = 10) => {
    return $ajax.get(`/articles`)
};
