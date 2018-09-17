/**
 * Created by zenghongtu on 09/09/2018
 * Desc: server
 */

import $ajax from './config'

export const login = (playload) => {
    return $ajax.post('/authenticate', playload)
};

export const changePassword = (name, password) => {
    return $ajax.put('/users/:', {name, password})
};

export const getSiteInfo = () => {
    return $ajax.get('/site')
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

export const getArticleList = (page, limit = 10, field = '-body') => {
    return $ajax.get(`/articles?page=${page}&limit=${limit}&field=${field}`)
};

export const getArticle = (id) => {
    return $ajax.get(`/articles/${id}`)
};

export const getBooks = () => {
    return $ajax.get(`/books`)
};

export const addBook = (content) => {
    return $ajax.post('/books', content)
};

export const updateBook = (id, content) => {
    return $ajax.put(`/books/${id}`, content)
};

export const deleteBook = (id) => {
    return $ajax.delete(`/books/${id}`)
};

export const getProjects = () => {
    return $ajax.get(`/projects`)
};

export const addProject = (content) => {
    return $ajax.post('/projects', content)
};

export const updateProject = (id, content) => {
    return $ajax.put(`/projects/${id}`, content)
};

export const deleteProject = (id) => {
    return $ajax.delete(`/projects/${id}`)
};

