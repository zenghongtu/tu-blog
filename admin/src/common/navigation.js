/**
 * Created by zenghongtu on 08/09/2018
 * Desc: menu
 */

import React from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom'

import {withStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';

import Icon from '@material-ui/core/Icon';

const styles = theme => ({
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
});


class NavListItem extends React.PureComponent {
    render() {
        const {to, name, icon, location, className} = this.props;
        return (
            <ListItem button className={className} component={Link} to={to}>
                <ListItemIcon>
                    <Icon color={to === location.pathname ? 'primary' : 'inherit'}>{icon}</Icon>
                </ListItemIcon>
                <ListItemText primary={name}/>
            </ListItem>
        )
    }
}


class Navigation extends React.Component {
    state = {
        open: true,
    };

    handleClick = () => {
        this.setState(state => ({open: !state.open}));
    };

    render() {
        const {classes, location} = this.props;
        return (
            <div>
                <List>
                    <NavListItem location={location} to="/dashboard" icon="timeline" name="Dashboard"/>
                    <NavListItem location={location} to="/profile" icon="person" name="Profile"/>
                    <ListItem button onClick={this.handleClick}>
                        <ListItemIcon>
                            <Icon>file_copy</Icon>
                        </ListItemIcon>
                        <ListItemText inset primary="Article"/>
                        {this.state.open ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <NavListItem to="/article" location={location} icon="list" name="List"
                                         className={classes.nested}/>
                            <NavListItem to="/new_article" location={location} icon="add" name="New"
                                         className={classes.nested}/>
                            <NavListItem to="/category" location={location} icon="class" name="Category"
                                         className={classes.nested}/>
                            <NavListItem to="/tag" location={location} icon="label" name="Tag"
                                         className={classes.nested}/>
                        </List>
                    </Collapse>
                    <NavListItem to="/read" location={location} icon="chrome_reader_mode" name="Read"/>
                    <NavListItem to="/laboratory" location={location} icon="developer_board" name="Laboratory"/>
                </List>
            </div>
        )
    }
}

Navigation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Navigation));
