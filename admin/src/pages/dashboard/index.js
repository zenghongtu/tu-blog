/**
 * Created by zenghongtu on 08/09/2018
 * Desc: index
 */

import React, {Component} from "react";

import {getSiteInfo} from "../../http/index";

import SiteInfoLineChart from "./chart";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            siteInfo: []
        }
    }

    async fetchSiteInfo() {
        const siteInfo = await getSiteInfo();
        this.setState((state) => ({
                siteInfo
            }
        ))
    }

    componentDidMount() {
        this.fetchSiteInfo()
    }

    render() {
        const {siteInfo} = this.state;
        return (
            <div>
                <h2>流量统计</h2>
                <SiteInfoLineChart data={siteInfo}/>
            </div>
        )
    }
}


export default Dashboard
