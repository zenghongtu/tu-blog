/**
 * Created by zenghongtu on 09/09/2018
 * Desc: chart
 */

import React from 'react'
import {LineChart, ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'

const SiteInfoLineChart = (props) => {
    const {data} = props;
    return (
        // 99% per https://github.com/recharts/recharts/issues/172
        <ResponsiveContainer width="99%" height={320}>
            <LineChart data={data.dayViewsList}>
                <XAxis dataKey="date"/>
                <YAxis/>
                <CartesianGrid vertical={false} strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey="visitorNum" stroke="#82ca9d"/>
                <Line type="monotone" dataKey="pageViews" stroke="#8884d8" activeDot={{r: 8}}/>
            </LineChart>
        </ResponsiveContainer>
    );
};

export default SiteInfoLineChart;
