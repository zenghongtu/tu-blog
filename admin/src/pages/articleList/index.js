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
import {getArticleList} from "../../http";

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
        limit: 9,
        article_list: []
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    async fetchArticleList() {
        const {page, limit} = this.state;
        const rsp = await getArticleList(page, limit);
        this.setState({
            article_list: rsp
        })
    }

    componentDidMount() {
        this.fetchArticleList()
    }

    render() {
        const {classes} = this.props;
        const {article_list, rows, limit, page} = this.state;
        const emptyRows = limit - Math.min(limit, article_list.length - page * limit);
        const cur_list = article_list.slice(page * limit, page * limit + limit);

        return (
            <React.Fragment>
                <Typography variant="title" gutterBottom={true}>
                    文章管理
                </Typography>
                <Paper className={classes.root}>
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table}>
                            <TableBody>
                                {cur_list.map(row => {
                                    return (
                                        <TableRow key={row.id} className={classes.tableRow}>
                                            <TableCell component="th" scope="row">
                                                <Typography variant="subheading" gutterBottom={true}>
                                                    {row.title}
                                                </Typography>
                                                <div>
                                                    阅读数:<span
                                                    className={classNames(classes.countSpan, classes.light)}>{row.viewsCount}</span>
                                                    评论数:<span
                                                    className={classNames(classes.countSpan, classes.light)}>{row.likeCount}</span>
                                                    喜欢数:<span
                                                    className={classNames(classes.countSpan, classes.light)}>{row.commentCount}</span>
                                                    最后编辑:<span
                                                    className={classNames(classes.countSpan, classes.light)}>{row.updatedAt.slice(0, 10)}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell numeric
                                                       className={row.is_publish ? classes.light : classes.dark}>{row.is_publish ? '已发布' : '草稿'}</TableCell>
                                            <TableCell numeric>
                                                <Button variant="contained" className={classes.button} component={Link}
                                                        to={`/article/${row.id}`}>
                                                    编辑
                                                </Button>
                                                <Button variant="contained" color="primary" className={classes.button}
                                                        component={Link} to="/open-collective">
                                                    查看
                                                </Button>
                                                <Button variant="contained" color="secondary"
                                                        className={classes.button}>
                                                    删除
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow style={{height: 60 * emptyRows}}>
                                        <TableCell/>
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        count={article_list.length}
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

export default withStyles(styles)(ArticleList);
