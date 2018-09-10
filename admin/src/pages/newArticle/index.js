/**
 * Created by zenghongtu on 10/09/2018.
 * Desc: index
 */

import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper/Paper";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";

import SelectTags from './selectTags'
import SelectCategories from './selectCategories'

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing.unit / 2,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
            width: 900,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    margin: {
        margin: theme.spacing.unit,
    },
});


class NewArticle extends React.Component {
    state = {
        title: ''
    };

    handleChange = prop => event => {
        this.setState({[prop]: event.target.value});
    };


    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <Typography variant="title" gutterBottom={true}>
                    新建文章
                </Typography>

                <Paper className={classes.root}>
                    <FormControl fullWidth className={classes.margin}>
                        <InputLabel htmlFor="title-input">
                            标题
                        </InputLabel>
                        <Input id="title-input" onChange={this.handleChange('title')}/>
                    </FormControl>

                    <SelectTags/>
                    <SelectCategories/>
                    <main className={classes.layout}>
                        <Grid container spacing={40} alignItems="flex-end">

                        </Grid>
                    </main>
                </Paper>
            </React.Fragment>
        );
    }
}


NewArticle.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(NewArticle);
