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
import AddIcon from '@material-ui/icons/Add';

import {
    getBooks,
    addBook,
    updateBook,
    deleteBook,
} from "../../http";
import Modal from "@material-ui/core/Modal/Modal";
import TextField from "@material-ui/core/TextField/TextField";

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    title: {
        display: 'inline-block'
    },
    buttonAdd: {
        float: 'right',
        marginTop: '-10px'
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
    modalPaper: {
        width: `75vw`,
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: `translateX(-50%)`,
        overflowY: 'scroll',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    textField: {
        width: '100%'
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

class ReadBook extends React.Component {
    state = {
        book_list: [],
        page: 0,
        limit: 9,
        modalOpen: false,
        id: '',
        book_title: '',
        book_authors: '',
        book_articles: '',
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

    handleEditBook = (row) => _ => {
        this.setState({
            modalOpen: true,
            id: row.id,
            book_title: row.title,
            book_authors: row.authors.join(' | '),
            book_articles: row.articles.map(item => item.article).join(' | '),
        })
    };
    handleModalSwitch = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    };
    handleChange = prop => event => {
        this.setState({
            [prop]: event.target.value
        })
    };
    handleAddButton = () => {
        this.addNewBook()
    };

    async addNewBook() {
        const rsp = await addBook({
            title: this.state.book_title,
            authors: this.state.book_authors,
            articles: this.state.book_articles,
        });
        this.getBookList();
        this.setState({
            modalOpen: false,
            book_title: '',
            book_authors: '',
            book_articles: '',
        })
    }

    async deleteBook(id) {
        const rsp = await deleteBook(id)
    }

    async updateBook() {
        const rps = await updateBook(this.state.id, {
            title: this.state.book_title,
            authors: this.state.book_authors,
            articles: this.state.book_articles,
        });
        this.getBookList();
        this.setState({
            modalOpen: false,
            book_title: '',
            book_authors: '',
            book_articles: '',
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
                <Typography variant="title" gutterBottom={true} className={classes.title}>
                    读书管理
                </Typography>
                <Button variant="fab" mini color="primary" aria-label="Add" className={classes.buttonAdd}
                        onClick={this.handleModalSwitch}>
                    <AddIcon/>
                </Button>
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
                                                <Button variant="contained" className={classes.button}
                                                        onClick={this.handleEditBook(row)}
                                                >
                                                    编辑
                                                </Button>
                                                <Button variant="contained" color="secondary"
                                                        className={classes.button}
                                                        onClick={() => {
                                                            this.deleteBook(row.id)
                                                        }}
                                                >
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
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.modalOpen}
                    onClose={this.handleModalSwitch}
                >
                    <div className={classes.modalPaper}>
                        <div>

                            <TextField
                                id="book_title"
                                label="title"
                                className={classes.textField}
                                value={this.state.book_title}
                                onChange={this.handleChange('book_title')}
                                margin="normal"
                            />
                            <TextField
                                id="book_author"
                                label="authors"
                                className={classes.textField}
                                placeholder={'多个作者以"|"分开'}
                                value={this.state.book_authors}
                                onChange={this.handleChange('book_authors')}
                                margin="normal"
                            />
                            <TextField
                                id="book_article"
                                label="articles"
                                className={classes.textField}
                                placeholder={'输入文章id,多个以"|"分开'}
                                value={this.state.book_articles}
                                onChange={this.handleChange('book_articles')}
                                margin="normal"
                            />
                            <Button variant="contained" className={classes.button}
                                    onClick={this.state.id ? () => this.updateBook()
                                        : this.handleAddButton}>
                                确定
                            </Button>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        );
    }
}

ReadBook.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReadBook);
