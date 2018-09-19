/**
 * Created by zenghongtu on 13/09/2018.
 * Desc: user
 */

import Router from 'koa-router';
import {baseApi} from '../config';
import jwt from '../middlewares/jwt';
import UserControllers from '../controllers/user';

const api = 'users';

const router = new Router();

router.prefix(`${baseApi}/${api}`);

router.get('/', jwt, UserControllers.find);

router.post('/', UserControllers.add);

router.get('/:id', UserControllers.findById);

router.put('/:id', jwt, UserControllers.update);

router.delete('/:id', jwt, UserControllers.delete);

export default router;
