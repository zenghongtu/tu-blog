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
    getAllCategoryHandler,
    deleteCategoryHandler,
    setCategoryHandler,
    addCategoryHandler
} from "./store";
import Modal from "@material-ui/core/Modal/Modal";

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

class Category extends React.Component {
    state = {
        open: false,
        curCatIdx: -1,
    };

    componentDidMount() {
        this.props.getAllCategories()
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
            categories,
            // setCategories,  // todo
            deleteCategory,
            addCategory,
            classes
        } = this.props;

        return (
            <React.Fragment>
                <Typography variant="title" gutterBottom={true}>
                    分类管理
                </Typography>
                <Paper className={classes.root}>
                    {categories.length > 0 ? categories.map((data, idx) => {
                            return (
                                <Chip
                                    key={data._id}
                                    label={data.name}
                                    onDelete={() => {
                                        deleteCategory(data._id);
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
                        label="新分类"
                        id="margin-normal"
                        className={classes.textField}
                        margin="normal"
                        inputRef={(el) => {
                            this.el = el
                        }}
                    />
                    <Button variant="contained" color="primary" onClick={() => {
                        addCategory(this.el.value, this.el)
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
                        {
                            categories[this.state.curCatIdx] ?
                                categories[this.state.curCatIdx].articles.map(item => {
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
        categories: state.get('category').toArray()
    })
};

const mapDispatch = (dispatch) => {
    return ({
        getAllCategories() {
            return dispatch(getAllCategoryHandler())
        },
        setCategories(name) {
            return dispatch(setCategoryHandler(name))
        },
        deleteCategory(name) {
            return dispatch(deleteCategoryHandler(name))
        },
        addCategory(name, el) {
            return dispatch(addCategoryHandler(name, el))
        },
    })
};

Category.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default connect(mapState, mapDispatch)(withStyles(styles)(Category))
