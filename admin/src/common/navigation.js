/**
 * Created by zenghongtu on 08/09/2018
 * Desc: menu
 */

import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

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

class Navigation extends React.Component {
    state = {
        open: true,
    };

    handleClick = () => {
        this.setState(state => ({open: !state.open}));
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <List>
                    <ListItem button component={Link} to="/profile">
                        <ListItemIcon>
                            <Icon color="primary">person</Icon>
                        </ListItemIcon>
                        <ListItemText primary="Profile"/>
                    </ListItem>
                    <ListItem button onClick={this.handleClick}>
                        <ListItemIcon>
                            <Icon>file_copy</Icon>
                        </ListItemIcon>
                        <ListItemText inset primary="Article"/>
                        {this.state.open ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested} component={Link} to="/article">
                                <ListItemIcon>
                                    <Icon>list</Icon>
                                </ListItemIcon>
                                <ListItemText inset primary="List"/>
                            </ListItem>
                            <ListItem button className={classes.nested} component={Link} to="/category">
                                <ListItemIcon>
                                    <Icon>class</Icon>
                                </ListItemIcon>
                                <ListItemText primary="Category"/>
                            </ListItem>
                            <ListItem button className={classes.nested} component={Link} to="/tag">
                                <ListItemIcon>
                                    <Icon>label</Icon>
                                </ListItemIcon>
                                <ListItemText primary="Tag"/>
                            </ListItem>
                        </List>
                    </Collapse>
                    <ListItem button component={Link} to="/read">
                        <ListItemIcon>
                            <Icon>chrome_reader_mode</Icon>
                        </ListItemIcon>
                        <ListItemText primary="Read"/>
                    </ListItem>
                    <ListItem button component={Link} to="/laboratory">
                        <ListItemIcon>
                            <Icon>developer_board</Icon>
                        </ListItemIcon>
                        <ListItemText primary="Laboratory"/>
                    </ListItem>
                </List>
            </div>
        );
    }
}

Navigation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigation);
