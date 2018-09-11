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
import {
    getBooks,
    addBook,
    editBook,
    deleteBook,
} from "../../http";

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 500,
    },
    tableRow: {
        height: '50px',
        overflow: 'scroll',
    },
    tableCell: {
        wordBreak: 'keep-all',
        textAlign: 'left',
        overflow: 'scroll',
        paddingLeft: '10px',
        paddingRight: '0',
    },
    tableCellLast: {
        width: '160px',
        textAlign: 'center',
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
        book_list: [],
        page: 0,
        limit: 9,
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    async getBookList() {
        const rsp = await getBooks();
        this.setState({
            book_list: rsp
        })
    }

    componentDidMount() {
        this.getBookList()
    }

    render() {
        const {classes} = this.props;
        const {book_list, page, limit} = this.state;
        const emptyRows = limit - Math.min(limit, book_list.length - page * limit);
        const cur_list = book_list.slice(page * limit, page * limit + limit);

        return (
            <React.Fragment>
                <Typography variant="title" gutterBottom={true}>
                    读书管理
                </Typography>
                <Paper className={classes.root}>
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table}>
                            <TableBody>
                                {cur_list.map(row => {
                                    return (
                                        <TableRow key={row.id} className={classes.tableRow}>
                                            <TableCell className={classes.tableCell} component="th" scope="row">
                                                <Typography variant="subheading" gutterBottom={true}>
                                                    {row.title}
                                                </Typography>
                                            </TableCell>
                                            <TableCell className={classes.tableCell}
                                                       numeric>{row.authors.join(' / ')}</TableCell>
                                            <TableCell className={classes.tableCell}
                                                       numeric>{row.articles.map(item => item.article)}</TableCell>
                                            <TableCell className={classNames(classes.tableCell, classes.tableCellLast)}
                                                       numeric>
                                                <Button variant="contained" className={classes.button}>
                                                    编辑
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
                                    <TableRow style={{height: 50 * emptyRows}}>
                                        <TableCell/>
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        count={book_list.length}
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
