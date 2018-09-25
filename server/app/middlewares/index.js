/**
 * Created by zenghongtu on 02/09/2018.
 * Desc: middlewares 入口文件
 */

import authenticate from './authenticate.js';
import jwt from './jwt.js';
import record from './record.js';


export default {
    authenticate,
    jwt,
    record,
}
