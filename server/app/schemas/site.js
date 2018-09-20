/**
 * Created by zenghongtu on 12/09/2018.
 * Desc: site
 */

import mongoose from "mongoose";
import date from '../utils/date'

const Schema = mongoose.Schema;

const SiteSchema = new Schema({
    date: {
        type: String,
        unique: true,
        default: date()
    },
    pv: {
        type: Number,
        default: 0
    },
    uv: {
        type: Number,
        default: 0
    }
}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}});

SiteSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    }
    next()
});

SiteSchema.statics = {
    fetch: function () {
        return this
            .find({})
            .sort('created')
            .exec()
    },
    findById: function (id) {
        return this
            .findOne({_id: id})
            .exec()
    }
};


export default SiteSchema
