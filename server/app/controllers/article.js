/**
 * Created by zenghongtu on 12/09/2018.
 * Desc: article
 */

import Article from '../models/article';
import Comment from '../models/comment';

class ArticleControllers {

    async find(ctx) {
        const limit = ctx.query.limit || null;
        const page = ctx.query.page || null;
        const field = ctx.query.field || null;
        const total = await Article.count();
        const _body = await Article.fetch(+limit, +page, field);
        ctx.body = {total, data: _body}
    }

    async findById(ctx) {
        const id = ctx.params.id;
        try {
            const article = await Article.findByIdAndUpdate(id, {$inc: {'meta.viewCount': 1}}, {new: true});
            if (!article) {
                ctx.throw(404);
            }
            let comments = await Comment
                .find({article: id})
                .populate('from', 'name agent')
                .populate('reply.from reply.to', 'name agent')
                .exec();
            ctx.body = {article, comments};
        } catch (err) {
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.throw(404);
            }
            ctx.throw(500);
        }
    }

    async add(ctx) {
        try {
            ctx.body = await new Article(ctx.request.body).save();
        } catch (err) {
            ctx.throw(422);
        }
    }

    async update(ctx) {
        try {
            const article = await Article.findByIdAndUpdate(
                ctx.params.id,
                ctx.request.body
            );
            if (!article) {
                ctx.throw(404);
            }
            ctx.body = article;
        } catch (err) {
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.throw(404);
            }
            ctx.throw(500);
        }
    }

    async delete(ctx) {
        try {
            const article = await Article.findByIdAndRemove(ctx.params.id);
            if (!article) {
                ctx.throw(404);
            }
            ctx.body = article;
        } catch (err) {
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.throw(404);
            }
            ctx.throw(500);
        }
    }
}

export default new ArticleControllers();

