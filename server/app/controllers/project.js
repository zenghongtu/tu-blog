/**
 * Created by zenghongtu on 13/09/2018
 * Desc: project
 */

import Project from '../models/project';

class ProjectControllers {

    async find(ctx) {
        const limit = ctx.query.limit || null;
        const page = ctx.query.page || null;
        const field = ctx.query.field || null;
        const total = await Project.count();
        const _body = await Project.fetch(+limit, +page, field);
        ctx.body = {total, data: _body}
    }

    async findById(ctx) {
        const id = ctx.params.id;
        try {
            const project = await Project.findById(id);
            if (!project) {
                ctx.throw(404);
            }
            ctx.body = project;
        } catch (err) {
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.throw(404);
            }
            ctx.throw(500);
        }
    }

    async add(ctx) {
        try {
            const project = await new Project(ctx.request.body).save();
            ctx.body = project;
        } catch (err) {
            ctx.throw(422);
        }
    }

    async update(ctx) {
        try {
            const book = await Project.findByIdAndUpdate(
                ctx.params.id,
                ctx.request.body,
                {new: true}
            );
            if (!project) {
                ctx.throw(404);
            }
            ctx.body = project;
        } catch (err) {
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.throw(404);
            }
            ctx.throw(500);
        }
    }

    async delete(ctx) {
        try {
            const project = await Project.findByIdAndRemove(ctx.params.id);
            if (!project) {
                ctx.throw(404);
            }
            ctx.body = project;
        } catch (err) {
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.throw(404);
            }
            ctx.throw(500);
        }
    }
}

export default new ProjectControllers();
