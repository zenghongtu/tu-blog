/**
 * Created by zenghongtu on 12/09/2018
 * Desc: project
 */

import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const ProjectSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    url: String,
    stars: Number,
    forks: Number,
    desc: String,
    action: {
        type: String,
        default: 'create',
        set: function (state) {
            return ['create', 'contribute'].indexOf(state) > -1
                ? state
                : 'create'
        }
    },
    articles: [{
        type: ObjectId,
        ref: 'Article'
    }]
}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}});


ProjectSchema.statics = {
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

export default ProjectSchema
