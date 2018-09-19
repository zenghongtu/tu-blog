/**
 * Created by zenghongtu on 12/09/2018.
 * Desc: category
 */

import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const CategorySchema = new Schema({
    name: {
        unique: true,
        type: String
    },
    articles: [{
        type: ObjectId,
        ref: 'Article'
    }]
}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}});


CategorySchema.statics = {
    fetch: function (field = '') {
        return this
            .find({})
            .select(field)
            .sort('-createdAt')
            .populate('articles', 'title')
            .exec()
    },
    findById: function (id) {
        return this
            .findOne({_id: id})
            .populate('articles', 'title')
            .exec()
    }
};

export default CategorySchema
