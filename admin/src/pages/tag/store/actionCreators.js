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
import {setSnackbarAction} from "../../../common/topSnackbar/store";
import {ERROR} from "../../../common/topSnackbar/store/constants";

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
        dispatch(setTagsAction(rsp))
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
        dispatch(deleteTagAction(rsp))
    }
};

const addTagAction = (name) => {
    return {
        type: ADD_TAG,
        content: name
    }
};

const addTagHandler = (name, el) => {
    return async (dispatch) => {
        try {
            const rsp = await $ajax.post(`/tags`, {
                name
            });
            dispatch(addTagAction(rsp));
            el.value = ''
        } catch (err) {
            dispatch(setSnackbarAction({
                status: ERROR,
                isShow: true,
                message: err.message
            }))
        }
    }
};

export {
    getAllTagsHandler,
    setTagsHandler,
    deleteTagHandler,
    addTagHandler
}
