/**
 * Created by zenghongtu on 08/09/2018
 * Desc: index
 */
import React from "react";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';

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
import Modal from "@material-ui/core/Modal/Modal";
import {Link} from "react-router-dom";

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing.unit / 2,
    },
    chip: {
        margin: theme.spacing.unit / 2,
    },
    button: {
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
    modalPaper: {
        width: `75vw`,
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: `translateX(-50%)`,
        overflowY: 'scroll',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    }
});

class Tag extends React.Component {
    state = {
        open: false,
        curCatIdx: -1,
    };

    componentDidMount() {
        this.props.getAllTags()
    }

    openInputBox = _ => _ => {
        this.setState({open: !this.state.open});
    };

    handleModalSwitch = (idx = -1) => () => {
        this.setState({
            curCatIdx: idx
        })
    };

    render() {
        const {
            tags,
            // setTags,  todo
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
                    {tags.length > 0 ? tags.map((data, idx) => {
                            return (
                                <Chip
                                    key={data._id}
                                    label={data.name}
                                    onDelete={() => {
                                        deleteTag(data._id);
                                    }}
                                    className={classes.chip}
                                    avatar={
                                        <Avatar onClick={this.handleModalSwitch(idx)}>
                                            {data.name.slice(0, 2)}
                                        </Avatar>
                                    }
                                />
                            );
                        }) :
                        <Typography variant="body2" gutterBottom={true}>
                            什么都没有,快来添加一个吧~
                        </Typography>
                    }
                </Paper>
                <Button variant="fab" mini color="primary" aria-label="Add" onClick={this.openInputBox()}
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
                        addTag(this.el.value, this.el)
                    }}>
                        确定
                    </Button>
                </div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.curCatIdx > -1}
                    onClose={this.handleModalSwitch()}
                >
                    <div className={classes.modalPaper}>
                        { // todo
                            tags[this.state.curCatIdx] ?
                                tags[this.state.curCatIdx].articles.map(item => {
                                    return <div key={item._id}>
                                        <Button component={Link} to={"/article/" + item._id}>
                                            {item.title}
                                        </Button>
                                    </div>
                                }) : null
                        }
                    </div>
                </Modal>
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
        addTag(name, el) {
            return dispatch(addTagHandler(name, el))
        },
    })
};

Tag.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default connect(mapState, mapDispatch)(withStyles(styles)(Tag))
