/**
 * Created by zenghongtu on 15/09/2018
 * Desc: ipCheck
 */

export default (ctx) => {
    let ip = ctx.headers['x-forwarded-for'] || ctx.ip;
    if (ip.substr(0, 7) === "::ffff:") {
        ip = ip.substr(7)
    }
    return ip
}
