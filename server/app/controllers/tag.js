/**
 * Created by zenghongtu on 13/09/2018.
 * Desc: tag
 */

import Tag from '../models/tag';

class TagControllers {

    async find(ctx) {
        const field = ctx.query.field || '';
        ctx.body = await Tag.fetch(field);
    }

    async findById(ctx) {
        const id = ctx.params.id;
        try {
            const tag = await Tag.findById(id);
            if (!tag) {
                ctx.throw(404);
            }
            ctx.body = tag;
        } catch (err) {
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.throw(404);
            }
            ctx.throw(500);
        }
    }

    async add(ctx) {
        try {
            ctx.body = await new Tag(ctx.request.body).save();
        } catch (err) {
            ctx.throw(422);
        }
    }

    async update(ctx) {
        try {
            const tag = await Tag.findByIdAndUpdate(
                ctx.params.id,
                ctx.request.body
            );
            if (!tag) {
                ctx.throw(404);
            }
            ctx.body = tag;
        } catch (err) {
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.throw(404);
            }
            ctx.throw(500);
        }
    }

    async delete(ctx) {
        try {
            const tag = await Tag.findByIdAndRemove(ctx.params.id);
            if (!tag) {
                ctx.throw(404);
            }
            ctx.body = tag;
        } catch (err) {
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.throw(404);
            }
            ctx.throw(500);
        }
    }
}

export default new TagControllers();

