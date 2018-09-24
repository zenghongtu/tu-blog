/**
 * Created by zenghongtu on 12/09/2018.
 * Desc: article
 */

import Article from '../models/article';
import Comment from '../models/comment';
import Category from "../models/category";
import Tag from "../models/tag";

class ArticleControllers {

    async find(ctx) {
        const limit = ctx.query.limit || null;
        const page = ctx.query.page || null;
        const field = ctx.query.field || null;
        const sort = ctx.query.sort || null;
        const total = await Article.count();
        const _body = await Article.fetch(+limit, +page, field, sort);
        ctx.body = {total, data: _body}
    }

    async findById(ctx) {
        const id = ctx.params.id;
        try {
            let article = await Article.findByIdAndUpdate(id, {$inc: {'meta.viewCount': 1}}, {new: true}).populate('tags', 'name').populate('category', 'name');
            if (!article) {
                ctx.throw(404);
            }
            let comments = await Comment
                .find({article: id})
                .sort('-created')
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
            const _body = ctx.request.body;
            const _category_id = _body.category;
            const _tags = _body.tags;
            const article = await new Article(_body).save();
            const _id = article._id;
            await Category.findByIdAndUpdate(_category_id, {$addToSet: {'articles': _id}});
            _tags.forEach(async _tag_id => {
                await Tag.findByIdAndUpdate(_tag_id, {$addToSet: {'articles': _id}})
            });

            ctx.body = article
        } catch (err) {
            ctx.throw(422);
        }
    }

    /*
        todo 修改 article 后更新 category/tag
     */
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
            const _id = article._id;
            const _category_id = article.category;
            const _tags = article.tags;
            await Category.findByIdAndUpdate(_category_id, {$pull: {'articles': _id}});
            _tags.forEach(async _tag_id => {
                await Tag.findByIdAndUpdate(_tag_id, {$pull: {'articles': _id}})
            });
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

