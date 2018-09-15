/**
 * Created by zenghongtu on 08/09/2018
 * Desc: index
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import {loginAction} from "./store/actionCreators";


const styles = theme => ({
    layout: {
        width: '100vw',
        height: '100vh',
        display: 'block', // Fix IE11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handlerSubmit = this.handlerSubmit.bind(this)
    }

    handlerSubmit(e) {
        e.preventDefault();
        const {login} = this.props;
        login(this.account, this.password);
        return false;
    }

    render() {
        const {classes, location} = this.props;
        const {from} = location.state || {from: {pathname: "/"}};
        const {isAuthenticated} = this.props;
        if (isAuthenticated) {
            return <Redirect to={from}/>;
        }
        return (
            <React.Fragment>
                <CssBaseline/>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockIcon/>
                        </Avatar>
                        <Typography variant="headline">TuBlog</Typography>
                        <form className={classes.form} onSubmit={this.handlerSubmit}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="account">Account</InputLabel>
                                <Input id="account" name="account" autoComplete="account" autoFocus onChange={(e) => {
                                    this.account = e.target.value
                                }}/>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input
                                    name="password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={(e) => {
                                        this.password = e.target.value
                                    }}
                                />
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="raised"
                                color="primary"
                                className={classes.submit}
                            >
                                Login
                            </Button>
                        </form>
                    </Paper>
                </main>
            </React.Fragment>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapState = (state) => {
    return {
        isAuthenticated: state.getIn(['login', 'isAuthenticated'])
    }
};

const mapDispatch = (dispatch) => {
    return {
        login(account, password) {
            dispatch(loginAction(account, password))
        }
    }
};

export default connect(mapState, mapDispatch)(withStyles(styles)(Login));
