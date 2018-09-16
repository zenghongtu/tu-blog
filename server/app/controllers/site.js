/**
 * Created by zenghongtu on 15/09/2018
 * Desc: site
 */

import Site from '../models/site';
import client from "../utils/redis";

class SiteControllers {

    async find(ctx) {
        try {
            const info_id = await client.get('info_id');
            const pageViews = await client.get('pageViews');
            ctx.body = await Site.findByIdAndUpdate(
                info_id,
                {pageViews},
                {new: true}
            );
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
            const body = ctx.request.body;
            ctx.body = await new Site(body).save();
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
