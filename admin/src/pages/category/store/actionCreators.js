/**
 * Created by zenghongtu on 10/09/2018.
 * Desc: actionCreators
 */

import {$ajax} from '../../../http'
import {
    ADD_CATEGORY,
    SET_CATEGORY,
    DELETE_CATEGORY,
    GET_ALL_CATEGORY,
} from "./constants";


const addCategoryAction = (name) => {
    return {
        type: ADD_CATEGORY,
        content: name
    }
};

const addCategoryHandler = (name) => {
    return async (dispatch) => {
        const rsp = await $ajax.post('/categories', {
            name
        });
        dispatch(addCategoryAction(rsp))
    }
};

const setCategoryAction = (name) => {
    return {
        type: SET_CATEGORY,
        content: name
    }
};

const setCategoryHandler = (name, aid) => {
    return async (dispatch) => {
        const rsp = await $ajax.put(`/categories/${name}`, {
            aid
        });
        dispatch(setCategoryAction(rsp))
    }
};

const deleteCategoryAction = (name) => {
    return {
        type: DELETE_CATEGORY,
        content: name
    }
};

const deleteCategoryHandler = (name) => {
    return async (dispatch) => {
        const rsp = await $ajax.delete(`/categories/${name}`);
        dispatch(deleteCategoryAction(rsp))
    }
};

const getAllCategoryAction = (result) => {
    return {
        type: GET_ALL_CATEGORY,
        content: result
    }
};

const getAllCategoryHandler = () => {
    return async (dispatch) => {
        const rsp = await $ajax.get('/categories');
        dispatch(getAllCategoryAction(rsp))
    }
};

export {
    getAllCategoryHandler,
    deleteCategoryHandler,
    setCategoryHandler,
    addCategoryHandler
}
