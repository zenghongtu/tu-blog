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

class Category extends React.Component {
    state = {
        open: false
    };

    componentDidMount() {
        this.props.getAllCategories()
    }

    openInputBox = _ => _ => {
        this.setState({open: !this.state.open});
    };

    render() {
        const {
            categories,
            setCategories,
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
                    {categories.map(data => {
                        return (
                            <Chip
                                key={data._id}
                                label={data.name}
                                onDelete={(e) => {
                                    e.preventDefault();
                                    deleteCategory(data._id);
                                }}
                                className={classes.chip}
                                component={Link}
                                to={"/categories/" + data._id}
                                avatar={<Avatar>{data.name.slice(0, 2)}</Avatar>}
                            />
                        );
                    })}
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
