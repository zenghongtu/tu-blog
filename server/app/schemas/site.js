/**
 * Created by zenghongtu on 12/09/2018.
 * Desc: site
 */

import mongoose from "mongoose";

const Schema = mongoose.Schema;


const SiteSchema = new Schema({
    pageViews: {
        type: Number,
        default: 0
    },
    uniqueVisitors: {
        type: Number,
        default: 0
    },
    dayViewsList: [
        {
            dayViews: {
                type: Number,
                default: 0
            },
            time: {
                type: Date,
                default: Date.now()
            }
        }
    ]
});


export default SiteSchema
