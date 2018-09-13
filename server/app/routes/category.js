/**
 * Created by zenghongtu on 13/09/2018.
 * Desc: category
 */

import Router from 'koa-router';
import {baseApi} from '../config';
import CategoryControllers from '../controllers/category';

const api = 'categories';

const router = new Router();

router.prefix(`${baseApi}/${api}`);

router.get('/', CategoryControllers.find);

router.post('/', CategoryControllers.add);

router.get('/:id', CategoryControllers.findById);

router.put('/:id', CategoryControllers.update);

router.delete('/:id', CategoryControllers.delete);

export default router;
