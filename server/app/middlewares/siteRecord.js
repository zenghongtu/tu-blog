import client from "../utils/redis";
import ipCheck from "../utils/ipCheck";

/**
 * Created by zenghongtu on 15/09/2018
 * Desc: site
 */

export default async (ctx, next) => {
    try {
        const ip = ipCheck(ctx);
        const visitor = await client.incr(ip);
        if (visitor < 2) {
            await client.incr('uniqueVisitors')
        }
        await client.incr('pageViews')
    } catch (e) {
        console.log(e);
    }
    return next()
}
