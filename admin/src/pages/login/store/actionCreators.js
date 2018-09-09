/**
 * Created by zenghongtu on 09/09/2018
 * Desc: actionCreators
 */

import {$ajax} from "../../../http/index";
import {LOGIN, LOGOUT} from "./constants";

const loginActionHandler = (result) => {
    return {
        type: LOGIN,
        content: {
            isAuthenticated: result.isAuthenticated,
            token: result.data
        }
    }
};

const loginAction = (account, password) => {
    return async (dispatch) => {
        try {
            const rsp = await $ajax.get(`/login?account=${account}&password=${password}`);
            dispatch(loginActionHandler(rsp))
        } catch (err) {
            throw new Error(err)
        }
    }
};

const logoutAction = () => {
    return {
        type: LOGOUT
    }
};


export {
    loginAction,
    logoutAction
}
