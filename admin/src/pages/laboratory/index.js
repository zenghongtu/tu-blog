/**
 * Created by zenghongtu on 08/09/2018
 * Desc: index
 */
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
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
    getProjects,
    addProject,
    updateProject,
    deleteProject,
} from "../../http";
import Modal from "@material-ui/core/Modal/Modal";
import TextField from "@material-ui/core/TextField/TextField";
import {ERROR} from "../../common/topSnackbar/store/constants";
import {setSnackbarAction} from "../../common/topSnackbar/store";
import connect from "react-redux/es/connect/connect";

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
    tableSecond: {
        width: '400px'
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
    },
    margin: {
        margin: '10px',
    }
});

class Laboratory extends React.Component {
    state = {
        project_list: [],
        project_total: 0,
        page: 0,
        limit: 9,
        modalOpen: false,
        project_name: '',
        project_url: '',
        project_star: '',
        project_fork: '',
        project_desc: '',
        project_articles: '',
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };
    handleEditProject = (project) => _ => {
        this.setState({
            modalOpen: true,
            _id: project._id,
            project_name: project.name,
            project_url: project.url,
            project_star: project.star,
            project_fork: project.fork,
            project_desc: project.desc,
            project_articles: project.articles.map(article => article._id).join('|'),
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
        this.addNewProject()
    };

    async getProjectList() {
        const rsp = await getProjects();

        this.setState({
            project_total: rsp.total,
            project_list: rsp.data
        })
    }

    async addNewProject() {
        try {
            await addProject({
                name: this.state.project_name,
                url: this.state.project_url,
                star: this.state.project_star,
                fork: this.state.project_fork,
                desc: this.state.project_desc,
                articles: this.state.project_articles.split('|'),
            });
            this.getProjectList();
            this.setState({
                modalOpen: false,
                name: '',
                url: '',
                star: '',
                fork: '',
                desc: '',
                articles: '',
            })
        } catch (err) {
            this.props.showSnackbar(err.message)
        }
    }

    async deleteProject(_id) {
        await deleteProject(_id);
        this.setState(state => {
            const project_list = state.project_list;
            return {
                project_list: project_list.filter(item => item._id !== _id)
            }
        })
    }

    async updateProject() {
        try {
            await updateProject(this.state._id, {
                name: this.state.project_name,
                url: this.state.project_url,
                star: this.state.project_star,
                fork: this.state.project_fork,
                desc: this.state.project_desc,
                articles: this.state.project_articles.split('|'),
            });
            this.getProjectList();
            this.setState({
                modalOpen: false,
                name: '',
                url: '',
                star: '',
                fork: '',
                desc: '',
                articles: '',
            })
        } catch (err) {
            this.props.showSnackbar(err.message)
        }
    }

    componentDidMount() {
        this.getProjectList()
    }

    render() {
        const {classes} = this.props;
        const {project_list, project_total, page, limit} = this.state;
        const emptyRows = limit - Math.min(limit, project_total - page * limit);

        return (
            <React.Fragment>
                <Typography variant="title" gutterBottom={true} className={classes.title}>
                    项目管理
                </Typography>
                <Button variant="fab" mini color="primary" aria-label="Add" className={classes.buttonAdd}
                        onClick={this.handleModalSwitch}>
                    <AddIcon/>
                </Button>
                <Paper className={classes.root}>
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table}>
                            <TableBody>
                                {project_list.length > 0 ? project_list.map(project => {
                                        return (
                                            <TableRow key={project._id} className={classes.tableRow}>
                                                <TableCell className={classes.tableCell} component="th" scope="project">
                                                    <Typography variant="subheading" gutterBottom={true}>
                                                        <a href={project.url}>{project.name}</a>
                                                    </Typography>
                                                </TableCell>

                                                <TableCell className={classes.tableCell} numeric>{project.desc}</TableCell>
                                                <TableCell className={classNames(classes.tableCell, classes.tableSecond)}
                                                           numeric> <TableCell className={classes.tableCell}
                                                                               numeric> {project.articles.map(article => (
                                                    <span
                                                        key={article._id}>{article.title}</span>))}</TableCell></TableCell>
                                                <TableCell className={classNames(classes.tableCell, classes.tableCellLast)}
                                                           numeric>
                                                    <Button variant="contained" className={classes.button}
                                                            onClick={this.handleEditProject(project)}
                                                    >
                                                        编辑
                                                    </Button>
                                                    <Button variant="contained" color="secondary"
                                                            className={classes.button}
                                                            onClick={() => {
                                                                this.deleteProject(project._id)
                                                            }}
                                                    >
                                                        删除
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    }) :
                                    (<TableRow>
                                        <TableCell className={classes.margin}>
                                            什么都没有,快去写点什么吧~
                                        </TableCell>
                                    </TableRow>)
                                }
                                {emptyRows > 0 && (
                                    <TableRow style={{height: 50 * emptyRows}}>
                                        <TableCell/>
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        count={project_total}
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
                                id="project_name"
                                label="name"
                                className={classes.textField}
                                value={this.state.project_name}
                                onChange={this.handleChange('project_name')}
                                margin="normal"
                            />
                            <TextField
                                id="project_url"
                                label="url"
                                className={classes.textField}
                                value={this.state.project_url}
                                onChange={this.handleChange('project_url')}
                                margin="normal"
                            />
                            <TextField
                                id="project_desc"
                                label="description"
                                className={classes.textField}
                                value={this.state.project_desc}
                                onChange={this.handleChange('project_desc')}
                                margin="normal"
                            />
                            <TextField
                                id="project_articles"
                                label="articles"
                                className={classes.textField}
                                placeholder={'输入文章id,多个以"|"分开'}
                                value={this.state.project_articles}
                                onChange={this.handleChange('project_articles')}
                                margin="normal"
                            />
                            <Button variant="contained" className={classes.button}
                                    onClick={this.state._id ? () => this.updateProject()
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

Laboratory.propTypes = {
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

export default connect(null, mapDispatch)(withStyles(styles)(Laboratory));

