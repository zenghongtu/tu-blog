/**
 * Created by zenghongtu on 02/09/2018.
 * Desc: home 路由
 */

import Router from 'koa-router';
import {baseApi} from '../config';
import jwt from '../middlewares/jwt';

const router = new Router();

router.get('/home', (ctx, next) => {
    ctx.body = 'Hello World!';
});

export default router
