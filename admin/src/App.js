import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Link, Redirect, Route, Switch} from "react-router-dom";
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from "@material-ui/core/Button/Button";

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AddIcon from '@material-ui/icons/Add';

import './App.css';

import {Navigation} from "./common/index";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";
import Article from "./pages/article";
import ArticleList from "./pages/articleList";
import Category from "./pages/category";
import Tag from "./pages/tag";
import Read from "./pages/read";
import Laboratory from "./pages/laboratory";
import {connect} from "react-redux";
import {logoutAction, loginAction} from "./pages/login/store/actionCreators";
import TopSnackbar from './common/topSnackbar'

const drawerWidth = 190;

const styles = theme => ({
    layout: {
        minWidth: '30rem'
    },
    root: {
        flexGrow: 1,
        height: '100vh',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
    },
    flex: {
        flexGrow: 1,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        overflow: 'scroll'
    },
});

const RedirectTo = ({...rest}) => (
    <Route
        {...rest}
        render={props =>
            (<Redirect
                to={{
                    pathname: "/login",
                    state: {from: props.location}
                }}
            />)
        }
    />
);

class App extends Component {
    state = {
        open: false,
    };

    constructor(props) {
        super(props);
        const token = sessionStorage.getItem('token');
        if (token) {
            props.changeLogin({isAuthenticated: true, token})
        }
    }


    handleDrawerSwitch = () => {
        this.setState({open: !this.state.open});
    };

    handlerLogout = () => {
        const {logout} = this.props;
        logout()
    };

    render() {
        const {classes, theme, isAuthenticated} = this.props;
        return (
            <Router basename="/admin">
                <div className={classes.layout}>
                    <TopSnackbar/>
                    {
                        isAuthenticated ?
                            (
                                <div className={classes.root}>
                                    <AppBar
                                        position="absolute"
                                        className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
                                    >
                                        <Toolbar disableGutters={!this.state.open}>
                                            <IconButton
                                                color="inherit"
                                                aria-label="Open drawer"
                                                onClick={this.handleDrawerSwitch}
                                                className={classNames(classes.menuButton, this.state.open && classes.hide)}
                                            >
                                                <MenuIcon/>
                                            </IconButton>
                                            <Button color="inherit" component={Link} to="/article">
                                                <AddIcon/>
                                                Article
                                            </Button>
                                            <Typography variant="title" color="inherit" align="center"
                                                        className={classes.flex}>
                                                <Button color="inherit" component={Link} to="/">TuBlog 后台管理</Button>
                                            </Typography>
                                            <Button color="inherit" onClick={this.handlerLogout}>Logout</Button>
                                        </Toolbar>
                                    </AppBar>
                                    <Drawer
                                        variant="permanent"
                                        classes={{
                                            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                                        }}
                                        open={this.state.open}
                                    >
                                        <div className={classes.toolbar}>
                                            <IconButton onClick={this.handleDrawerSwitch}>
                                                {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                                            </IconButton>
                                        </div>
                                        <Divider/>
                                        <Navigation/>
                                    </Drawer>
                                    <main className={classes.content}>
                                        <div className={classes.appBarSpacer}/>
                                        <Switch>
                                            <Route path="/dashboard" component={Dashboard}/>
                                            <Route path="/profile" component={Profile}/>
                                            <Route path="/article_list" component={ArticleList}/>
                                            <Route path="/article/:id" component={Article}/>
                                            <Route path="/article" component={Article}/>
                                            <Route path="/category" component={Category}/>
                                            <Route path="/tag" component={Tag}/>
                                            <Route path="/read" component={Read}/>
                                            <Route path="/laboratory" component={Laboratory}/>
                                            <Redirect path="/" to="/dashboard"/>
                                        </Switch>
                                    </main>
                                </div>
                            )
                            :
                            (
                                <Switch>
                                    <Route exact path="/login" component={Login}/>
                                    <RedirectTo path="/"/>
                                </Switch>
                            )
                    }

                </div>
            </Router>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

const mapState = (state) => {
    return {
        isAuthenticated: state.getIn(['login', 'isAuthenticated'])
    }
};

const mapDispatch = (dispath) => {
    return {
        logout() {
            dispath(logoutAction())
        },
        changeLogin(data) {
            dispath(loginAction(data))
        }
    }
};

export default connect(mapState, mapDispatch)(withStyles(styles, {withTheme: true})(App));
