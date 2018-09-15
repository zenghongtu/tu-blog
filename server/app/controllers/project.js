/**
 * Created by zenghongtu on 13/09/2018
 * Desc: project
 */

import Project from '../models/project';

class ProjectControllers {

    async find(ctx) {
        const field = ctx.query.field || '';
        ctx.body = await Project.fetch(field);
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
            const project = await Project.findByIdAndUpdate(
                ctx.params.id,
                ctx.request.body
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
