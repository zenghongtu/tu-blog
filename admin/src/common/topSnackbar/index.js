/**
 * Created by zenghongtu on 16/09/2018
 * Desc: snackbar
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import {withStyles} from '@material-ui/core/styles';

import {
    SUCCESS,
    WARNING,
    ERROR,
    INFO,
} from './store/constants'
import {connect} from "react-redux";
import {setShowAction} from "./store";

const variantIcon = {
    [SUCCESS]: CheckCircleIcon,
    [WARNING]: WarningIcon,
    [ERROR]: ErrorIcon,
    [INFO]: InfoIcon,
};

const styles1 = theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});

function MySnackbarContent(props) {
    const {classes, className, message, onClose, variant, ...other} = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={classNames(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)}/>
                    {message}
        </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={onClose}
                >
                    <CloseIcon className={classes.icon}/>
                </IconButton>,
            ]}
            {...other}
        />
    );
}

MySnackbarContent.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf([
        SUCCESS,
        WARNING,
        ERROR,
        INFO,]).isRequired,
};

const SnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles2 = theme => ({
    margin: {
        margin: theme.spacing.unit,
    },
});

class TopSnackbar extends React.Component {
    state = {
        open: false,
        status: ERROR,
        message: 'this is a success warning'
    };

    handleClick = () => {
        const {setShow, isShow} = this.props;
        setShow(!isShow)
    };


    render() {
        const {classes, status, isShow, message} = this.props;

        return (
            <div>
                <Button className={classes.margin} onClick={this.handleClick}>
                    Open success snackbar
                </Button>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={isShow}
                    autoHideDuration={1000}
                    onClose={this.handleClick}
                >
                    <SnackbarContentWrapper
                        onClose={this.handleClick}
                        variant={status}
                        message={message}
                    />
                </Snackbar>

            </div>
        );
    }
}

TopSnackbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapState = (state) => {
    const _state = state.get('snackbar');
    return {
        status: _state.get('status'),
        isShow: _state.get('isShow'),
        message: _state.get('message')
    }
};

const mapDispatch = (dispatch) => ({
    setShow(isShow) {
        return dispatch(setShowAction(isShow))
    }
});


export default connect(mapState, mapDispatch)(withStyles(styles2)(TopSnackbar));
