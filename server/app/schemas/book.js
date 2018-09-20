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
    }]
}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}});


BookSchema.statics = {
    fetch: function (limit, page, field = '') {
        return this
            .find({})
            .skip(page * limit)
            .limit(limit)
            .sort('-created')
            .select(field)
            .populate('articles', 'title')
            .exec();
    },
    findById: function (id) {
        return this
            .findOne({_id: id})
            .populate('articles', 'title')
            .exec()
    }
};

export default BookSchema
