/**
 * Created by zenghongtu on 10/09/2018.
 * Desc: selectTags
 */


import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper/Paper";
import {connect} from "react-redux";
import {addTagHandler, getAllTagsHandler} from "../tag/store";
import TextField from "@material-ui/core/TextField/TextField";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Chip from "@material-ui/core/Chip/Chip";
import CancelIcon from '@material-ui/icons/Cancel';
import {emphasize} from '@material-ui/core/styles/colorManipulator';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
    input: {
        display: 'flex',
        minWidth: '11.25em',
        boxSizing: 'border-box',
        padding: 0,
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
            0.08,
        ),
    },
    noOptionsMessage: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    placeholder: {
        position: 'absolute',
        left: 2,
        fontSize: 16,
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
    label: {
        marginTop: '.8em',
        marginRight: '.5em'
    }
});

function NoOptionsMessage(props) {
    const {addTag, classes, inputValue} = props.selectProps;
    return (
        <MenuItem
            component="div"
            style={{
                fontWeight: props.isSelected ? 500 : 400,
            }}
            className={classes.noOptionsMessage}
        >
            <Typography
                color="textSecondary"
                {...props.innerProps}
            >
                {inputValue}
            </Typography>
            <Button variant="fab" mini color="primary" aria-label="Add"
                    onClick={
                        () => {
                            addTag(inputValue)
                        }
                    }>
                <AddIcon/>
            </Button>
        </MenuItem>
    );
}

function inputComponent({inputRef, ...props}) {
    return <div ref={inputRef} {...props} />;
}

function Control(props) {
    return (
        <TextField
            fullWidth
            InputProps={{
                inputComponent,
                inputProps: {
                    className: props.selectProps.classes.input,
                    inputRef: props.innerRef,
                    children: props.children,
                    ...props.innerProps,
                },
            }}
            {...props.selectProps.textFieldProps}
        />
    );
}

function Option(props) {
    return (
        <MenuItem
            buttonRef={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
                fontWeight: props.isSelected ? 500 : 400,
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
}

function Placeholder(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.placeholder}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}


function ValueContainer(props) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
    return (
        <Chip
            tabIndex={-1}
            label={props.children}
            className={classNames(props.selectProps.classes.chip, {
                [props.selectProps.classes.chipFocused]: props.isFocused,
            })}
            onDelete={props.removeProps.onClick}
            deleteIcon={<CancelIcon {...props.removeProps} />}
        />
    );
}

function Menu(props) {
    return (
        <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
        </Paper>
    );
}

const components = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    ValueContainer,
};


class selectTags extends React.Component {
    state = {
        multi: null,
    };
    handleChangeSelect = name => value => {
        this.setState({
            [name]: value,
        });
    };

    componentDidMount() {
        this.props.getAllTags()
    }

    render() {
        const {classes, tags, addTag} = this.props;
        return (
            <React.Fragment>
                <Typography
                    variant="subheading"
                    className={classes.label}
                    color="textSecondary"
                >
                    标签
                </Typography>
                <Select
                    classes={classes}
                    addTag={addTag}
                    style={{width: '200px'}}
                    options={tags.map(tag => ({
                        value: tag,
                        label: tag
                    }))}
                    components={components}
                    value={this.state.multi}
                    onChange={this.handleChangeSelect('multi')}
                    placeholder="可直接输入"
                    isMulti
                />
            </React.Fragment>
        );
    }
}


selectTags.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapToState = (state) => {
    return {
        tags: state.get('tag').toArray()
    }
};

const mapToDispatch = (dispatch) => {
    return {
        getAllTags() {
            return dispatch(getAllTagsHandler())
        },
        addTag(name) {
            return dispatch(addTagHandler(name))
        }
    }
};

export default connect(mapToState, mapToDispatch)(withStyles(styles)(selectTags));
