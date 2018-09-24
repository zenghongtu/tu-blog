/**
 * Created by zenghongtu on 09/09/2018
 * Desc: actionCreators
 */

import {LOGIN, LOGOUT} from "./constants";
import {login} from "../../../http";
import {setSnackbarAction} from "../../../common/topSnackbar/store";
import {ERROR} from "../../../common/topSnackbar/store/constants";

const loginAction = (result) => {
    return {
        type: LOGIN,
        content: {
            isAuthenticated: result.isAuthenticated,
            token: result.token
        }
    }
};

const loginActionHandler = (account, password) => {
    return async (dispatch) => {
        try {
            const data = await login({name: account, password});
            dispatch(loginAction(data))
        } catch (err) {
            dispatch(setSnackbarAction({
                status: ERROR,
                isShow: true,
                message: err.message
            }))
        }
    }
};

const logoutAction = () => {
    return {
        type: LOGOUT
    }
};


export {
    loginActionHandler,
    logoutAction,
    loginAction,
}
