/**
 * Created by zenghongtu on 13/09/2018.
 * Desc: category
 */

import Category from '../models/category';

class CategoryControllers {

    async find(ctx) {
        const field = ctx.query.field || '';
        ctx.body = await Category.fetch(field);
    }

    async findById(ctx) {
        const id = ctx.params.id;
        try {
            const category = await Category.findById(id);
            if (!category) {
                ctx.throw(404);
            }
            ctx.body = category;
        } catch (err) {
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.throw(404);
            }
            ctx.throw(500);
        }
    }

    async add(ctx) {
        try {
            const category = await new Category(ctx.request.body).save();
            ctx.body = category;
        } catch (err) {
            ctx.throw(422);
        }
    }

    async update(ctx) {
        try {
            const category = await Category.findByIdAndUpdate(
                ctx.params.id,
                ctx.request.body
            );
            if (!category) {
                ctx.throw(404);
            }
            ctx.body = category;
        } catch (err) {
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.throw(404);
            }
            ctx.throw(500);
        }
    }

    async delete(ctx) {
        try {
            const category = await Category.findByIdAndRemove(ctx.params.id);
            if (!category) {
                ctx.throw(404);
            }
            ctx.body = category;
        } catch (err) {
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.throw(404);
            }
            ctx.throw(500);
        }
    }
}

export default new CategoryControllers();

