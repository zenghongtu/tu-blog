/**
 * Created by zenghongtu on 15/09/2018
 * Desc: site
 */

import Site from '../models/site';

class SiteControllers {

    async find(ctx) {
        try {
            const _site = await Site.fetch();
            const _ = _site[0];
            Site.update({_id: _._id}, {$inc: {'uniqueVisitors': 1}});
            ctx.body = _
        } catch (err) {
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.throw(404);
            }
            ctx.throw(500);
        }
    }

    async findById(ctx) {
        const id = ctx.params.id;
        try {
            const site = await Site.findById(id);
            if (!site) {
                ctx.throw(404);
            }
            ctx.body = site;
        } catch (err) {
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.throw(404);
            }
            ctx.throw(500);
        }
    }

    async add(ctx) {
        try {
            const site = await new Site(ctx.request.body).save();
            ctx.body = site;
        } catch (err) {
            ctx.throw(422);
        }
    }

    async update(ctx) {
        try {
            const site = await Site.findByIdAndUpdate(
                ctx.params.id,
                ctx.request.body
            );
            if (!site) {
                ctx.throw(404);
            }
            ctx.body = site;
        } catch (err) {
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.throw(404);
            }
            ctx.throw(500);
        }
    }

    async delete(ctx) {
        try {
            const site = await Site.findByIdAndRemove(ctx.params.id);
            if (!site) {
                ctx.throw(404);
            }
            ctx.body = site;
        } catch (err) {
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.throw(404);
            }
            ctx.throw(500);
        }
    }
}

export default new SiteControllers();
