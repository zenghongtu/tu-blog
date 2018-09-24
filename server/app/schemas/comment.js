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
        content: String,
        created: {
            type: Date,
            default: new Date(),
        }
    }],
    content: String
}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}});


CommentSchema.statics = {
    fetch: function () {
        return this
            .find({})
            .sort('-created')
            .populate('from', 'name agent')
            .populate('reply.from reply.to', 'name agent')
            .exec()
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


