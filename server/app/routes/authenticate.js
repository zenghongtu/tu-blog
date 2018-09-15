/**
 * Created by zenghongtu on 13/09/2018.
 * Desc: authenticate
 */

import Router from 'koa-router';
import {baseApi} from '../config';
import authenticate from '../middlewares/authenticate';

const api = 'authenticate';

const router = new Router();

router.prefix(`${baseApi}/${api}`);

router.post('/', authenticate);

export default router;
