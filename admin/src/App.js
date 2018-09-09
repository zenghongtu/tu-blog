import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
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
import Category from "./pages/category";
import Tag from "./pages/tag";
import Read from "./pages/read";
import Laboratory from "./pages/laboratory";
import {connect} from "react-redux";
import {logoutAction} from "./pages/login/store/actionCreators";

const drawerWidth = 190;

const styles = theme => ({
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
    },
});

class App extends Component {
    state = {
        open: false,
        isAuthenticated: false
    };

    handleDrawerSwitch = () => {
        this.setState({open: !this.state.open});
    };

    handleCreateArticle = () => {
        console.log('createArticle');
    };

    handlerLogout = () => {
        const {logout} = this.props;
        logout()
    };

    render() {
        const {classes, theme, isAuthenticated} = this.props;
        return (
            <Router>
                <div>
                    {
                        isAuthenticated ?
                            (<div className={classes.root}>
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
                                        <Button color="inherit" onClick={this.handleCreateArticle}>
                                            <AddIcon/>
                                            Article
                                        </Button>
                                        <Typography variant="title" color="inherit" align="center"
                                                    className={classes.flex}>
                                            <Button color="inherit" component={Link} to="/">TuBlog
                                                Administration</Button>
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
                                    <Route exact path="/" component={Dashboard}/>
                                    <Route path="/profile" component={Profile}/>
                                    <Route path="/article" component={Article}/>
                                    <Route path="/category" component={Category}/>
                                    <Route path="/tag" component={Tag}/>
                                    <Route path="/read" component={Read}/>
                                    <Route path="/laboratory" component={Laboratory}/>
                                </main>
                            </div>) :
                            <Route path="/login" component={Login}/>
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
        }
    }
};

export default connect(mapState, mapDispatch)(withStyles(styles, {withTheme: true})(App));
