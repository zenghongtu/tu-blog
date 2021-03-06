/**
 * Created by zenghongtu on 13/09/2018
 * Desc: comment
 */

import Comment from '../models/comment';
import User from "../models/user";
import client from "../utils/redis";

class CommentControllers {

    async find(ctx) {
        const field = ctx.query.field;
        ctx.body = await Comment.fetch(field);
    }

    async findById(ctx) {
        const id = ctx.params.id;
        try {
            const comment = await Comment.find({article: id})
                .sort('-created')
                .populate('from', 'name agent')
                .populate('reply.from reply.to', 'name agent')
                .exec();
            if (!comment) {
                ctx.throw(404);
            }
            ctx.body = comment;
        } catch (err) {
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.throw(404);
            }
            ctx.throw(500);
        }
    }

    /**
     * 新增评论
     * @param ctx
     * @returns {Promise<void>}
     */
    async add(ctx) {
        try {
            if (!ctx.request.header._id) {
                ctx.throw(400);
            }
            const _body = ctx.request.body;
            const _comment = _body.comment;
            const _user = _body.user;
            const comment = await new Comment(_comment).save();
            const con = Object.assign({}, _user, {
                $addToSet: {'comments': comment._id}
            });
            await User.findByIdAndUpdate(_comment.from, con, {upsert: true});
            ctx.body = comment;
        } catch (err) {
            ctx.throw(422);
        }
    }

    /**
     * 回复评论
     * @param ctx
     * @returns {Promise<void>}
     */
    async update(ctx) {
        try {
            if (!ctx.request.header._id) {
                ctx.throw(400);
            }
            const _body = ctx.request.body;
            const _comment = _body.comment;
            const comment = await Comment.findByIdAndUpdate(ctx.params.id, {$addToSet: {reply: _comment}}, {new: true});
            if (!comment) {
                ctx.throw(404);
            }
            const _user = _body.user;
            await client.set('t' + _comment.to, comment.article);
            const con = Object.assign({}, _user, {
                $addToSet: {'comments': comment._id}
            });
            await User.findByIdAndUpdate(_comment.from, con, {upsert: true});
            ctx.body = comment;
        } catch (err) {
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.throw(404);
            }
            ctx.throw(500);
        }
    }

    async delete(ctx) {
        try {
            const comment = await Comment.findByIdAndUpdate(ctx.params.id, {
                content: '该条评论已被删除'
            });
            if (!comment) {
                ctx.throw(404);
            }
            ctx.body = comment;
        } catch (err) {
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.throw(404);
            }
            ctx.throw(500);
        }
    }
}

export default new CommentControllers();
