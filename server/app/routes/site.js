/**
 * Created by zenghongtu on 15/09/2018
 * Desc: site
 */

import Router from 'koa-router';
import {baseApi} from '../config';
import jwt from '../middlewares/jwt';
import SiteControllers from '../controllers/site';
import record from "../middlewares/record";

const api = 'site';

const router = new Router();

router.prefix(`${baseApi}/${api}`);

router.get('/', record, SiteControllers.find);

router.post('/', jwt, SiteControllers.add);

router.get('/:id', SiteControllers.findById);

router.put('/:id', jwt, SiteControllers.update);

router.delete('/:id', jwt, SiteControllers.delete);

export default router;
