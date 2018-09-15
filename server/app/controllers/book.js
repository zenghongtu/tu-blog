/**
 * Created by zenghongtu on 13/09/2018
 * Desc: book
 */

import Book from '../models/book';

class BookControllers {

    async find(ctx) {
        const field = ctx.query.field || '';
        ctx.body = await Book.fetch(field);
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
                ctx.request.body
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
