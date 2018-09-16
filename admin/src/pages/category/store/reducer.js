/**
 * Created by zenghongtu on 10/09/2018.
 * Desc: reducer
 */

import {List} from "immutable/dist/immutable";
import {
    ADD_CATEGORY,
    SET_CATEGORY,
    DELETE_CATEGORY,
    GET_ALL_CATEGORY,
} from "./constants";


const initState = List([]);

const reducer = (state = initState, action) => {
    switch (action.type) {
        case GET_ALL_CATEGORY:
            return List(action.content);
        case SET_CATEGORY:
            return List.of(...action.content);
        case ADD_CATEGORY:
            return state.push(action.content);
        case DELETE_CATEGORY:
            const idx = state.findKey((value) => {
                return value._id === action.content._id
            });
            return state.delete(idx);
        default :
            return state
    }
};

export default reducer
