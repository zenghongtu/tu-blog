/**
 * Created by zenghongtu on 15/09/2018
 * Desc: site
 */

import Site from '../models/site';
import User from '../models/user';
import client from "../utils/redis";
import date from '../utils/date'

class SiteControllers {
    async find(ctx) {
        try {
            let _id = ctx._id;
            const visits = await client.get(_id);
            const pageViews = await client.get('pageViews');
            const uniqueVisitors = await client.get('uniqueVisitors');
            const site = await Site.findOneAndUpdate(
                {date: date()},
                {pageViews, uniqueVisitors},
                {new: true}
            );
            const visitor = await User.findByIdAndUpdate(
                _id,
                {visits},
                {new: true}
            );
            ctx.body = {site, visitor}
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
