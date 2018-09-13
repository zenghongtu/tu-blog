/**
 * Created by zenghongtu on 13/09/2018.
 * Desc: tag
 */


import Router from 'koa-router';
import {baseApi} from '../config';
import jwt from '../middlewares/jwt';
import TagControllers from '../controllers/tag';

const api = 'tags';

const router = new Router();

router.prefix(`${baseApi}/${api}`);

router.get('/', TagControllers.find);

router.post('/', jwt, TagControllers.add);

router.get('/:id', TagControllers.findById);

router.put('/:id', jwt, TagControllers.update);

router.delete('/:id', jwt, TagControllers.delete);

export default router;
