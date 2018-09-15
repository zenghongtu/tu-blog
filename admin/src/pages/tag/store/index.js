/**
 * Created by zenghongtu on 09/09/2018
 * Desc: index
 */

import reducer from "./reducer";
import {
    getAllTagsHandler,
    setTagsHandler,
    deleteTagHandler,
    addTagHandler
} from "./actionCreators";

import * as constants from "./constants";


export {
    constants,
    reducer,
    getAllTagsHandler,
    setTagsHandler,
    deleteTagHandler,
    addTagHandler,
}
