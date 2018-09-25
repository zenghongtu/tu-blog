import User from "../models/user";
import client from "../utils/redis";
import ipCheck from "../utils/ipCheck";
import userAgent from "../utils/userAgent";

/**
 * Created by zenghongtu on 15/09/2018
 * Desc: site
 */

export default async (ctx, next) => {
    try {
        if (ctx.request.method === 'GET') {
            const _header = ctx.request.header;
            let _id = _header._id;
            if (!_id) {
                const ip = ipCheck(ctx);
                const agent = userAgent(ctx);
                const user = await new User({ip, agent}).save();
                _id = user._id;
                ctx.set('_id', _id);
                await client.incr('uniqueVisitors')
            } else {
                let _ida = _header._ida;
                if (_ida) {
                    await client.del('t' + _id)
                } else {
                    const c = await client.get('t' + _id);
                    if (c) {
                        ctx.set('_ida', c);
                    }
                }
            }
            ctx._id = _id;
            await client.incr(_id);
            await client.incr('pageViews')
        }
    } catch (e) {
        console.log(e);
    }
    return next()
}


