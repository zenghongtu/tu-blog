/**
 * Created by zenghongtu on 09/09/2018
 * Desc: reducer
 */


import {combineReducers} from "redux-immutable";

import {reducer as loginReducer} from '../pages/login/store'


const reducer = combineReducers({
    login: loginReducer
});

export default reducer
