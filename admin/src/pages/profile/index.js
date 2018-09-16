/**
 * Created by zenghongtu on 08/09/2018
 * Desc: index
 */
import React from "react";
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

import Input from "@material-ui/core/Input";
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";

import {changePassword} from "../../http/api";
import {connect} from "react-redux";
import {setSnackbarAction} from "../../common/topSnackbar/store";
import {ERROR, SUCCESS} from "../../common/topSnackbar/store/constants";

const styles = theme => ({
    layout: {
        display: 'flex',
        marginTop: theme.spacing.unit
    },
    item: {
        textAlign: 'center',
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
});

class Profile extends React.Component {
    state = {
        showPassword: false,
        open: false,
    };

    handleChange = prop => event => {
        this.setState({[prop]: event.target.value});
    };
    handleMouseDownPassword = event => {
        event.preventDefault();
    };
    handleClickShowPassword = () => {
        this.setState(state => ({showPassword: !state.showPassword}));
    };
    handleChangePassword = async () => {
        const {password} = this.state;
        const {showMsg} = this.props;
        try {
            const rsp = await changePassword('tu', password);
            showMsg(SUCCESS, rsp)
        } catch (e) {
            showMsg(ERROR, e.message)
        }
    };

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.layout}>
                <Typography variant="body2" className={classes.item}>
                    修改密码:
                </Typography>
                <Input
                    id="adornment-password"
                    type={this.state.showPassword ? 'text' : 'password'}
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="Toggle password visibility"
                                onClick={this.handleClickShowPassword}
                                onMouseDown={this.handleMouseDownPassword}
                            >
                                {this.state.showPassword ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                        </InputAdornment>
                    }
                    className={classes.item}
                />
                <Button variant="contained" className={classNames(classes.item)} onClick={this.handleChangePassword}>
                    确定
                </Button>

            </div>
        );
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapDispatch = (dispatch) => {
    return {
        showMsg(status, rsp) {
            dispatch(setSnackbarAction({
                status,
                isShow: true,
                message: rsp
            }))
        }
    }
};

export default connect(null, mapDispatch)(withStyles(styles)(Profile));
