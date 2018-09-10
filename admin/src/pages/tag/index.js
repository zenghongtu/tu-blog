/**
 * Created by zenghongtu on 08/09/2018
 * Desc: index
 */
import React from "react";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';

import {Link} from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TextField from "@material-ui/core/TextField";

import {
    getAllTagsHandler,
    setTagsHandler,
    deleteTagHandler,
    addTagHandler
} from "./store";

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing.unit / 2,
    },
    chip: {
        margin: theme.spacing.unit / 2,
        cursor: 'pointer'
    },
    button: {
        // width:'0',
        float: 'left',
        margin: theme.spacing.unit,
    },
    hide: {
        display: 'none',
    },
    inputBxo: {
        width: '0',
        float: 'left',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        margin: theme.spacing.unit,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    inputBxoClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: '20em',
    },
    textField: {
        width: '12.5em',
        margin: 0,
        marginRight: theme.spacing.unit,
    },
});

class Tag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        this.openInputBox = this.openInputBox.bind(this)
    }

    componentDidMount() {
        this.props.getAllTags()
    }

    openInputBox() {
        this.setState({open: !this.state.open});
    }

    render() {
        const {
            tags,
            setTags,
            deleteTag,
            addTag,
            classes
        } = this.props;

        return (
            <React.Fragment>
                <Typography variant="title" gutterBottom={true}>
                    标签管理
                </Typography>
                <Paper className={classes.root}>
                    {tags.map(data => {
                        return (
                            <Chip
                                key={data}
                                label={data}
                                onDelete={(e) => {
                                    e.preventDefault();
                                    deleteTag(data);
                                }}
                                className={classes.chip}
                                component={Link}
                                to={"/" + data}
                                avatar={<Avatar>{data.slice(0, 2)}</Avatar>}
                            />
                        );
                    })}
                </Paper>
                <Button variant="fab" mini color="primary" aria-label="Add" onClick={this.openInputBox}
                        className={classes.button}>
                    <AddIcon/>
                </Button>
                <div className={classNames(classes.inputBxo, this.state.open && classes.inputBxoClose)}>
                    <TextField
                        label="新标签"
                        id="margin-normal"
                        className={classes.textField}
                        margin="normal"
                        inputRef={(el) => {
                            this.el = el
                        }}
                    />
                    <Button variant="contained" color="primary" onClick={() => {
                        addTag(this.el.value)
                    }}>
                        确定
                    </Button>
                </div>
            </React.Fragment>
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

Tag.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default connect(mapState, mapDispatch)(withStyles(styles)(Tag))
