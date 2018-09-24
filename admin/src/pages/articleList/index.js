/**
 * Created by zenghongtu on 08/09/2018
 * Desc: index
 */

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import {Link} from 'react-router-dom'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography/Typography";
import Button from '@material-ui/core/Button';
import connect from "react-redux/es/connect/connect";
import {deleteArticle, getArticleList} from "../../http";
import {ERROR} from "../../common/topSnackbar/store/constants";
import {setSnackbarAction} from "../../common/topSnackbar/store";


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 500,
    },
    tableRow: {
        height: '60px'
    },
    countSpan: {
        marginRight: '15px',
        fontWeight: '800'
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    button: {
        marginLeft: '10px'
    },
    margin: {
        margin: '10px',
    },
    light: {
        color: theme.palette.primary.dark,
    },
    dark: {
        color: theme.palette.secondary.dark,
    }
});

class ArticleList extends React.Component {
    state = {
        page: 0,
        limit: 10,
        article_total: 0,
        article_list: []
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    async fetchArticleList() {
        const {page, limit} = this.state;
        const rsp = await getArticleList(page, limit);
        this.setState({
            article_total: rsp.total,
            article_list: rsp.data
        })
    }

    componentDidMount() {
        this.fetchArticleList()
    }

    deleteArticleHanlder = _id => async _ => {
        const {showSnackbar} = this.props;
        try {
            const rsp = await deleteArticle(_id);
            this.fetchArticleList()
        } catch (err) {
            showSnackbar(err.message)
        }
    };

    render() {
        const {classes} = this.props;
        const {article_list, article_total, limit, page} = this.state;
        const emptyRows = limit - Math.min(limit, article_total - page * limit);

        return (
            <React.Fragment>
                <Typography variant="title" gutterBottom={true}>
                    文章管理
                </Typography>
                <Paper className={classes.root}>
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table}>
                            <TableBody>
                                {article_list.length > 0 ? article_list.map(article => {
                                        return (
                                            <TableRow key={article._id} className={classes.tableRow}>
                                                <TableCell component="th" scope="row">
                                                    <Typography variant="subheading" gutterBottom={true}>
                                                        {article.title}
                                                    </Typography>
                                                    <div>
                                                        阅读数:<span
                                                        className={classNames(classes.countSpan, classes.light)}>{article.meta.viewCount}</span>
                                                        评论数:<span
                                                        className={classNames(classes.countSpan, classes.light)}>{article.meta.favoriteCount}</span>
                                                        喜欢数:<span
                                                        className={classNames(classes.countSpan, classes.light)}>{article.meta.commentsCount}</span>
                                                        最后编辑:<span
                                                        className={classNames(classes.countSpan, classes.light)}>{article.updated.slice(0, 10)}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell numeric
                                                           className={article.isPublish ? classes.light : classes.dark}>{article.isPublish ? '已发布' : '草稿'}</TableCell>
                                                <TableCell numeric>
                                                    <Button variant="contained" className={classes.button} component={Link}
                                                            to={`/article/${article._id}`}>
                                                        编辑
                                                    </Button>
                                                    <Button variant="contained" color="primary" className={classes.button}
                                                        // todo
                                                            component={Link} to="/">
                                                        查看
                                                    </Button>
                                                    <Button variant="contained" color="secondary"
                                                            onClick={this.deleteArticleHanlder(article._id)}
                                                            className={classes.button}>
                                                        删除
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    }) :
                                    <Typography variant="body2" gutterBottom={true} className={classes.margin}>
                                        什么都没有,快去写点什么吧~
                                    </Typography>
                                }
                                {emptyRows > 0 && (
                                    <TableRow style={{height: 60 * emptyRows}}>
                                        <TableCell/>
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        count={article_total}
                                        rowsPerPage={limit}
                                        page={page}
                                        onChangePage={this.handleChangePage}
                                        rowsPerPageOptions={[10]}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                </Paper>
            </React.Fragment>
        );
    }
}

ArticleList.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapDispatch = (dispatch) => ({
        showSnackbar(message, status = ERROR, isShow = true) {
            dispatch(setSnackbarAction({
                status,
                isShow,
                message
            }))
        }
    }
);

export default connect(null, mapDispatch)(withStyles(styles)(ArticleList));
