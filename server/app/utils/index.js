/**
 * Created by zenghongtu on 02/09/2018.
 * Desc: utils 入口文件
 */


import routesLoader from "./routesLoader";
import bcrypt from "./bcrypt.js";
import date from "./date.js";
import init from "./init.js";
import ipCheck from "./ipCheck.js";
import redis from "./redis.js";
import userAgent from "./userAgent.js";


export default {
    routesLoader,
    bcrypt,
    date,
    init,
    ipCheck,
    redis,
    userAgent,
}
