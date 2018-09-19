import client from "../utils/redis";
import ipCheck from "../utils/ipCheck";
import userAgent from "../utils/userAgent";
import User from "../models/user";

/**
 * Created by zenghongtu on 15/09/2018
 * Desc: site
 */

export default async (ctx, next) => {
    try {
        let _id = ctx._id;
        if (!_id) {
            const ip = ipCheck(ctx);
            const agent = userAgent(ctx);
            const user = await new User({ip, agent}).save();
            _id = user._id;
            ctx.set('_id', _id);
            await client.incr('uniqueVisitors')
        }
        const visitor = await client.incr(_id);
        await client.incr('pageViews')
    } catch (e) {
        console.log(e);
    }
    return next()
}


