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

import Modal from '@material-ui/core/Modal';
import remark from 'remark'
import reactRenderer from 'remark-react'

import {
    saveArticle,
    deleteArticle,
    updateArticle,
    getArticle
} from '../../http'
import {connect} from "react-redux";
import {setSnackbarAction} from "../../common/topSnackbar/store";
import {ERROR} from "../../common/topSnackbar/store/constants";


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
    title: {
        paddingLeft: '30px',
        paddingRight: '30px',
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
    preview: {
        width: `75vw`,
        height: '80vh',
        position: 'absolute',
        top: '5vh',
        left: '50%',
        transform: `translateX(-50%)`,
        overflowY: 'scroll',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    }
});


const state = {
    title: '',
    desc: '',
    body: '',
    tags: [],
    category: [],
    isPublish: true,
    showPreview: false
};

class Article extends React.Component {
    state = Object.assign({}, state);

    handleFormat = (arr) => {
        return arr.map((item) => {
            return item.value
        })
    };

    handleButtonClick = prop => async _ => {
        const state = this.state;
        const {showSnackbar} = this.props;
        try {
            switch (prop) {
                case 'save':
                    const tags = this.handleFormat(state.tags);
                    const category = this.handleFormat(state.category);
                    state._id ? await updateArticle(Object.assign(state, {tags: tags}, {category: category}))
                        : await saveArticle(Object.assign(state, {tags: tags}, {category: category}));
                    break;
                case 'delete':
                    await deleteArticle(state._id);
                    break;
                case 'draft':
                    const _tags = this.handleFormat(state.tags);
                    const _category = this.handleFormat(state.category);
                    await saveArticle(Object.assign(state, {tags: _tags}, {category: _category}, {isPublish: false}));
                    break;
                case 'preview':
                    this.handlePreview();
                    break;
                default:
                    console.log(`未知操作 ${prop}`);
            }
        } catch (err) {
            showSnackbar(err)
        }
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        if (id) {
            this.fetchArticle(id)
        }
    }

    componentWillReceiveProps() {
        this.setState(state)
    }

    handleChange = prop => event => {
        this.setState({[prop]: event.target.value});
    };

    handleSelectChange = prop => value => {
        this.setState({[prop]: value});
    };

    async fetchArticle(id) {
        const rsp = await getArticle(id);
        const article = rsp[0];
        this.setState({
            _id: article._id,
            title: article.title,
            body: article.body,
            desc: article.desc,
            isPublish: article.isPublish
        })
    }

    handlePreview = _ => {
        this.setState({
            showPreview: !this.state.showPreview
        })
    };

    render() {
        const {classes} = this.props;
        const {handleButtonClick, handleSelectChange, handleChange, state, handlePreview} = this;
        return (
            <React.Fragment>
                <Typography variant="title" gutterBottom={true}>
                    新建文章
                </Typography>

                <Paper className={classes.root}>
                    <FormControl fullWidth className={classes.margin}>
                        <InputLabel htmlFor="title-input" className={classes.title}>
                            标题
                        </InputLabel>
                        <Input id="title-input" onChange={handleChange('title')} value={state.title}/>
                    </FormControl>
                    <SelectTags onChange={handleSelectChange('tags')} value={state.tags}/>
                    <SelectCategories onChange={handleSelectChange('category')} value={state.category}/>


                    <main className={classes.layout}>
                        <TextField
                            InputProps={{
                                disableUnderline: true,
                                fullWidth: true
                            }}
                            placeholder={'描述'}
                            className={classes.articleInput}
                            rows={5}
                            rowsMax={10}
                            multiline
                            fullWidth
                            onChange={handleChange('desc')}
                            value={state.desc}
                        />
                    </main>
                    <main className={classes.layout}>
                        <TextField
                            InputProps={{
                                disableUnderline: true,
                                fullWidth: true
                            }}
                            placeholder={'内容'}
                            className={classes.articleInput}
                            rows={20}
                            rowsMax={20}
                            multiline
                            fullWidth
                            onChange={handleChange('body')}
                            value={state.body}
                        />

                    </main>
                    <div>
                        <Button onClick={handleButtonClick('save')} variant="contained" size="small" color="primary"
                                className={classes.button}>
                            <PublishIcon/>
                            发布
                        </Button>
                        {
                            !state.isPublish && (
                                <Button onClick={handleButtonClick('draft')} variant="contained" size="small"
                                        className={classes.button}>
                                    <SaveIcon/>
                                    保存草稿
                                </Button>
                            )
                        }
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
                <Modal open={state.showPreview} onClose={handlePreview}>
                    <div className={classes.preview}>
                        {remark().use(reactRenderer).processSync(state.desc + '<hr/>' + state.body).contents}
                    </div>
                </Modal>
            </React.Fragment>
        );
    }
}


Article.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapDispatch = (dispatch) => ({
        showSnackbar(err) {
            dispatch(setSnackbarAction({
                status: ERROR,
                isShow: true,
                message: err.message
            }))
        }
    }
);

export default connect(null, mapDispatch)(withStyles(styles)(Article));
