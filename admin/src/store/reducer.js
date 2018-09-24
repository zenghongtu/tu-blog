/**
 * Created by zenghongtu on 09/09/2018
 * Desc: reducer
 */


import {combineReducers} from "redux-immutable";

import {reducer as loginReducer} from '../pages/login/store'
import {reducer as tagReducer} from '../pages/tag/store'
import {reducer as categoryReducer} from '../pages/category/store'
import {reducer as SnackbarReducer} from '../common/topSnackbar/store'


const reducer = combineReducers({
    login: loginReducer,
    tag: tagReducer,
    category: categoryReducer,
    snackbar: SnackbarReducer,
});


export default reducer
