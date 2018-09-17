/**
 * Created by zenghongtu on 12/09/2018
 * Desc: book
 */

import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const BookSchema = new Schema({
    title: {
        type: String,
        unique: true
    },
    authors: [{
        type: String
    }],
    articles: [{
        type: ObjectId,
        ref: 'Article'
    }],
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

BookSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    next()
});

BookSchema.statics = {
    fetch: function (limit, page, field = '') {
        return this
            .find({})
            .skip(page)
            .limit(limit)
            .sort('meta.updateAt')
            .select(field)
            .exec()
    },
    findById: function (id) {
        return this
            .findOne({_id: id})
            .exec()
    }
};

export default BookSchema
