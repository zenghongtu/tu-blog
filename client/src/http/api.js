/**
 * Created by zenghongtu on 18/09/2018.
 * Desc: api
 */
import ajax from './config'

export const getPageArticles = (page, limit) => ajax.get(`/articles?page=${page - 1}&limit=${limit}&field=-body`);
export const getCategories = _ => ajax.get('/categories?field=name');
export const getTags = _ => ajax.get('/tags?field=name');
export const getTopArticles = _ => ajax.get('/articles?page=0&limit=10&field=title&sort=-meta.viewCount');
export const getArticleList = _ => ajax.get(`/articles?field=title&field=meta`);
export const getArticle = _id => ajax.get(`/articles/${_id}`);
export const getArticleTitleList = _ => ajax.get(`/articles?field=title`);
export const getTagArticles = _id => ajax.get(`/tags/${_id}`);
export const getcategoriesArticles = _id => ajax.get(`/categories/${_id}`);
export const getBooks = _ => ajax.get(`/books`);
export const getProjects = _ => ajax.get(`/projects`);
export const getSiteInfo = _ => ajax.get(`/site?field=-dayViewsList`);
