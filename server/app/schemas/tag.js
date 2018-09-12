/**
 * Created by zenghongtu on 12/09/2018.
 * Desc: tag
 */

/**
 * Created by zenghongtu on 12/09/2018.
 * Desc: category
 */

import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const TagSchema = new Schema({
    name: {
        unique: true,
        type: String
    },
    articles: [{type: ObjectId, ref: 'Article'}],
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

TagSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    next()
});

TagSchema.statics = {
    fetch: function () {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec()
    },
    findById: function (id) {
        return this
            .findOne({_id: id})
            .exec()
    }
};

export default TagSchema
