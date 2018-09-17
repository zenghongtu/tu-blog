/**
 * Created by zenghongtu on 13/09/2018
 * Desc: book
 */

import Book from '../models/book';

class BookControllers {

    async find(ctx) {
        const limit = ctx.query.limit || null;
        const page = ctx.query.page || null;
        const field = ctx.query.field || null;
        const total = await Book.count();
        const _body = await Book.fetch(+limit, +page, field);
        ctx.body = {total, data: _body}
    }

    async findById(ctx) {
        const id = ctx.params.id;
        try {
            const book = await Book.findById(id);
            if (!book) {
                ctx.throw(404);
            }
            ctx.body = book;
        } catch (err) {
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.throw(404);
            }
            ctx.throw(500);
        }
    }

    async add(ctx) {
        try {
            const book = await new Book(ctx.request.body).save();
            ctx.body = book;
        } catch (err) {
            ctx.throw(422);
        }
    }

    async update(ctx) {
        try {
            const book = await Book.findByIdAndUpdate(
                ctx.params.id,
                ctx.request.body,
                {new: true}
            );
            if (!book) {
                ctx.throw(404);
            }
            ctx.body = book;
        } catch (err) {
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.throw(404);
            }
            ctx.throw(500);
        }
    }

    async delete(ctx) {
        try {
            const book = await Book.findByIdAndRemove(ctx.params.id);
            if (!book) {
                ctx.throw(404);
            }
            ctx.body = book;
        } catch (err) {
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.throw(404);
            }
            ctx.throw(500);
        }
    }
}

export default new BookControllers();
