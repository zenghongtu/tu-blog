/**
 * Created by zenghongtu on 12/09/2018.
 * Desc: comment
 */


import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const CommentSchema = new Schema({
    article: {
        type: ObjectId,
        ref: 'Article'
    },
    from: {
        type: ObjectId,
        ref: 'User'
    },
    reply: [{
        from: {
            type: ObjectId,
            ref: 'User'
        },
        to: {
            type: ObjectId,
            ref: 'User'
        },
        content: String
    }],
    content: String,
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

CommentSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    next()
});

CommentSchema.statics = {
    fetch: function () {
        return this
            .find({})
            .sort('-meta.updateAt')
            .exec(cb)
    },
    findById: function (id) {
        return this
            .find({article: id})
            .populate('from', 'name agent')
            .populate('reply.from reply.to', 'name agent')
            .exec();
    }
};

export default CommentSchema


