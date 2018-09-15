/**
 * Created by zenghongtu on 08/09/2018
 * Desc: index
 */

import React, {Component} from "react";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography/Typography";
import {getSiteInfo} from "../../http/index";
import SiteInfoLineChart from "./chart";

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    }
});

class Dashboard extends Component {
    state = {
        siteInfo: []
    };

    async fetchSiteInfo() {
        const siteInfo = await getSiteInfo();
        this.setState((state) => ({
                siteInfo: siteInfo
            }
        ))
    }

    componentDidMount() {
        this.fetchSiteInfo()
    }

    render() {
        const {classes} = this.props;
        const {siteInfo} = this.state;
        return (
            <div>
                <Typography variant="title" gutterBottom={true} className={classes.title}>
                    网站状况
                </Typography>
                <Paper className={classes.root}>
                    <SiteInfoLineChart data={siteInfo}/>
                </Paper>
            </div>
        )
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
