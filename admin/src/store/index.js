/**
 * Created by zenghongtu on 09/09/2018
 * Desc: index
 */

import {applyMiddleware, compose, createStore} from "redux";

import thunk from "redux-thunk";

import reducer from "./reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    /* preloadedState, */
    composeEnhancers(applyMiddleware(thunk))
);

export default store


