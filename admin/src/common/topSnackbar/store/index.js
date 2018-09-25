/**
 * Created by zenghongtu on 16/09/2018
 * Desc: index
 */


import {fromJS} from "immutable";
import {
    SETSTATUS,
    SETSHOW,
    SETMESSAGE,
    SETSNACKBAR,
    SUCCESS,
    // WARNING,
    // ERROR,
    // INFO,
} from "./constants";

export const setStatusAction = (status) => {
    return {
        type: SETSTATUS,
        value: status
    }
};

export const setShowAction = (isShow) => {
    return {
        type: SETSHOW,
        value: isShow
    }
};

export const setMessageAction = (message) => {
    return {
        type: SETMESSAGE,
        value: message
    }
};

export const setSnackbarAction = (value) => {
    return {
        type: SETSNACKBAR,
        value
    }
};

const defaultStore = fromJS({
    status: SUCCESS,
    isShow: false,
    message: 'success'
});

export const reducer = (state = defaultStore, action) => {
    switch (action.type) {
        case SETSTATUS:
            return state.set('status', action.value);
        case SETSHOW:
            return state.set('isShow', action.value);
        case SETMESSAGE:
            return state.set('message', action.value);
        case SETSNACKBAR:
            return state.merge(action.value);
        default:
            return state
    }
};
