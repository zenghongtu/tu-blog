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

ProjectSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    next()
});

ProjectSchema.statics = {
    fetch: function (limit, page, field = '') {
        return this
            .find({})
            .skip(page)
            .limit(limit)
            .sort('-meta.updateAt')
            .select(field)
            .populate('articles', 'title')
            .exec();
    },
    findById: function (id) {
        return this
            .findOne({_id: id})
            .exec()
    }
};

export default ProjectSchema
