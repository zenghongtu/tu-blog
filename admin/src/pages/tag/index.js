/**
 * Created by zenghongtu on 08/09/2018
 * Desc: index
 */
import React from "react";
import {connect} from "react-redux";
import {
    getAllTagsHandler,
    setTagsHandler,
    deleteTagHandler,
    addTagHandler
} from "./store";

class Tag extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {
            tags,
            getAllTags,
            setTags,
            deleteTag,
            addTag,
        } = this.props;
        console.log(tags);
        return (
            <div>
                <button onClick={getAllTags}>getAllTags</button>
                <button onClick={() => setTags('monitor')}>setTags</button>
                <button onClick={() => deleteTag('monitor')}>deleteTag</button>
                <button onClick={() => addTag('monitor')}>addTag</button>
            </div>
        )
    }
}

const mapState = (state) => {
    return ({
        tags: state.get('tag').toArray()
    })
};

const mapDispatch = (dispatch) => {
    return ({
        getAllTags() {
            return dispatch(getAllTagsHandler())
        },
        setTags(name) {
            return dispatch(setTagsHandler(name))
        },
        deleteTag(name) {
            return dispatch(deleteTagHandler(name))
        },
        addTag(name) {
            return dispatch(addTagHandler(name))
        },
    })
};

export default connect(mapState, mapDispatch)(Tag)
