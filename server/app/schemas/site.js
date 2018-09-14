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
    ],
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

SiteSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    next()
});

SiteSchema.statics = {
    fetch: function () {
        return this
            .find({})
            .exec()
    },
    findById: function (id) {
        return this
            .findOne({_id: id})
            .exec()
    }
};



export default SiteSchema
