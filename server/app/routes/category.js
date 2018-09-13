/**
 * Created by zenghongtu on 13/09/2018.
 * Desc: category
 */

import Router from 'koa-router';
import {baseApi} from '../config';
import jwt from '../middlewares/jwt';
import CategoryControllers from '../controllers/category';

const api = 'categories';

const router = new Router();

router.prefix(`${baseApi}/${api}`);

router.get('/', CategoryControllers.find);

router.post('/', jwt, CategoryControllers.add);

router.get('/:id', CategoryControllers.findById);

router.put('/:id', jwt, CategoryControllers.update);

router.delete('/:id', jwt, CategoryControllers.delete);

export default router;
