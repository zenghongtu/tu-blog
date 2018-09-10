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
            return List.of(...action.content);
        case SET_TAGS:
            return List.of(...action.content);
        case DELETE_TAG:
            return List.of(...action.content);
        case ADD_TAG:
            return List.of(...action.content);
        default:
            return state
    }
};

export default reducer
