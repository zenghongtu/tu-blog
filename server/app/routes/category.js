/**
 * Created by zenghongtu on 13/09/2018.
 * Desc: category
 */

import Router from 'koa-router';
import {baseApi} from '../config';
import jwt from '../middlewares/jwt';
import CategoryControllers from '../controllers/category';
import siteRecord from "../middlewares/siteRecord";

const api = 'categories';

const router = new Router();

router.prefix(`${baseApi}/${api}`);

router.get('/', CategoryControllers.find);

router.post('/', jwt, CategoryControllers.add);

router.get('/:id', siteRecord, CategoryControllers.findById);

router.put('/:id', jwt, CategoryControllers.update);

router.delete('/:id', jwt, CategoryControllers.delete);

export default router;
