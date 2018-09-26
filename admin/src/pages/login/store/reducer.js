/**
 * Created by zenghongtu on 09/09/2018
 * Desc: reducer
 */

import {fromJS} from "immutable";
import {LOGIN, LOGOUT} from "./constants";

const initState = fromJS({
    isAuthenticated: false
});


const reducer = (state = initState, action) => {
    switch (action.type) {
        case LOGIN:
            const content = action.content;
            sessionStorage.setItem('token', content.token);
            return state.set('isAuthenticated', content.isAuthenticated);
        case LOGOUT:
            sessionStorage.clear();
            return state.set('isAuthenticated', false);
        default:
            return state
    }
};

export default reducer
