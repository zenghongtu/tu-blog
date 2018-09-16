/**
 * Created by zenghongtu on 09/09/2018
 * Desc: reducer
 */

import {
    GET_ALL_TAGS,
    SET_TAGS,
    DELETE_TAG,
    ADD_TAG,
} from "./constants";
import {List} from "immutable/dist/immutable";

const initState = List([]);

const reducer = (state = initState, action) => {
    switch (action.type) {
        case GET_ALL_TAGS:
            return List(action.content);
        case SET_TAGS:
            return List.of(...action.content);
        case DELETE_TAG:
            const idx = state.findKey((value) => {
                return value._id === action.content._id
            });
            return state.delete(idx);
        case ADD_TAG:
            return state.push(action.content);
        default:
            return state


    }
};

export default reducer
