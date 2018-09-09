/**
 * Created by zenghongtu on 09/09/2018
 * Desc: actionCreators
 */

import {$ajax} from '../../../http/'

import {
    GET_ALL_TAGS,
    SET_TAGS,
    DELETE_TAG,
    ADD_TAG,
} from "./constants";

const getAllTagsAction = (result) => {
    return {
        type: GET_ALL_TAGS,
        content: result
    }
};

const getAllTagsHandler = () => {
    return async (dispatch) => {
        const rsp = await $ajax.get('/tags');
        dispatch(getAllTagsAction(rsp))
    }
};

const setTagsAction = (name) => {
    return {
        type: SET_TAGS,
        content: name
    }
};

const setTagsHandler = (name, aid) => {
    return async (dispatch) => {
        const rsp = await $ajax.put(`/tags/${name}`, {
            aid
        });
        dispatch(setTagsAction(name))
    }
};

const deleteTagAction = (name) => {
    return {
        type: DELETE_TAG,
        content: name
    }
};

const deleteTagHandler = (name) => {
    return async (dispatch) => {
        const rsp = await $ajax.delete(`/tags/${name}`);
        dispatch(deleteTagAction(name))
    }
};

const addTagAction = (name) => {
    return {
        type: ADD_TAG,
        content: name
    }
};

const addTagHandler = (name) => {
    return async (dispath) => {
        const rsp = await $ajax.post(`/tags`, {
            name
        });
        dispath(addTagAction(name))
    }
};

export {
    getAllTagsHandler,
    setTagsHandler,
    deleteTagHandler,
    addTagHandler
}
