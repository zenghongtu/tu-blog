/**
 * Created by zenghongtu on 18/09/2018.
 * Desc: api
 */
import $ajax from './config'

export const getArticleList = _ => $ajax.get(`/articles?field=title&field=meta`);
export const getArticle = _id => $ajax.get(`/articles/${_id}`);
