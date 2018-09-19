/**
 * Created by zenghongtu on 12/09/2018.
 * Desc: article
 */

import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ArticleSchema = new Schema({
    title: {
        type: String,
        unique: true
    }, // 标题
    desc: String,  // 摘要
    body: {
        type: String,
        required: true
    }, // 内容
    category: {
        type: ObjectId,
        ref: 'Category',
        required: true
    },// 分类
    tags: [{
        type: ObjectId,
        ref: 'Tag'
    }],// 标签
    isPublish: {
        type: Boolean,
        default: true
    },
    meta: {
        favoriteCount: {
            type: Number,
            default: 0
        }, // 喜欢数
        commentsCount: {
            type: Number,
            default: 0
        }, // 评论数
        viewCount: {
            type: Number,
            default: 0
        }, // 浏览数
        createAt: {
            type: Date,
            default: Date.now()
        },// 创建日期
        updateAt: {
            type: Date,
            default: Date.now()
        },// 更新日期
    }
});


// 时间更新
ArticleSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    next()
});

ArticleSchema.statics = {
    fetch: function (limit, page, field = '') {
        return this
            .find({})
            .skip(page)
            .limit(limit)
            .sort('-meta.updateAt')
            .populate('category', 'name')
            .populate('tags', 'name')
            .select(field)
            .exec()
    },
    findById: function (id) {
        return this
            .findOne({_id: id})
            .exec()
    }
};

export default ArticleSchema
