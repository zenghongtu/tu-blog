/**
 * Created by zenghongtu on 10/09/2018.
 * Desc: index
 */

import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper/Paper";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";

import SelectTags from './selectTags'
import SelectCategories from './selectCategories'
import TextField from "@material-ui/core/TextField/TextField";
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import PublishIcon from '@material-ui/icons/Publish';
import LocalSeeIcon from '@material-ui/icons/LocalSee';
import {
    saveArticle,
    deleteArticle,
    updateArticle
} from '../../http'


const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing.unit / 2,
    },
    layout: {
        width: '100%',
        display: 'flex',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        padding: '10px 12px',
    },
    margin: {
        margin: theme.spacing.unit,
    },
    button: {
        marginLeft: theme.spacing.unit * 3,
    },
    selectContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    },
    articleInput: {
        borderRadius: 4,
        fontSize: 14,
        border: '1px solid #ced4da',
        backgroundColor: theme.palette.common.white,
        margin: '0 auto',
        padding: '10px'
    },
    bootstrapInput: {
        width: 'calc(100% - 24px)',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
    bootstrapFormLabel: {},
});


class NewArticle extends React.Component {
    state = {
        id: '',
        title: '',
        content: '',
        tags: [],
        categories: [],
        is_publish: 1,
    };

    handleChange = prop => event => {
        this.setState({[prop]: event.target.value});
    };

    handleSelectChange = prop => value => {
        console.log(value);
        this.setState({[prop]: value});
    };

    handleButtonClick = prop => _ => {
        switch (prop) {
            case 'save':
                this.state.id ? updateArticle(this.state)
                    : saveArticle(this.state);
                break;
            case 'delete':
                deleteArticle(this.state.id);
                break;
            case 'draft':
                saveArticle({...this.state, is_publish: 0});
                break;
            case 'preview':
                console.log('preview');
                break;
            default:
                console.log(`未知 ${prop}`);
        }
    };

    render() {
        const {classes} = this.props;
        const {handleButtonClick} = this;
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
                    <SelectTags onChange={this.handleSelectChange('tags')} value={this.tags}/>
                    <SelectCategories onChange={this.handleSelectChange('categories')} value={this.categories}/>

                    <main className={classes.layout}>
                        <TextField
                            InputProps={{
                                disableUnderline: true,
                                fullWidth: true
                            }}
                            className={classes.articleInput}
                            rows={20}
                            rowsMax={20}
                            multiline
                            fullWidth
                            onChange={this.handleChange('content')}
                        />

                    </main>
                    <div>
                        <Button onClick={handleButtonClick('save')} variant="contained" size="small" color="primary"
                                className={classes.button}>
                            <PublishIcon/>
                            发布
                        </Button>
                        <Button onClick={handleButtonClick('draft')} variant="contained" size="small"
                                className={classes.button}>
                            <SaveIcon/>
                            保存草稿
                        </Button>
                        <Button onClick={handleButtonClick('preview')} variant="contained" size="small"
                                className={classes.button}>
                            <LocalSeeIcon/>
                            预览
                        </Button>
                        <Button onClick={handleButtonClick('delete')} variant="contained" size="small" color="secondary"
                                className={classes.button}>
                            <DeleteIcon/>
                            删除
                        </Button>
                    </div>
                </Paper>
            </React.Fragment>
        );
    }
}


NewArticle.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(NewArticle);
