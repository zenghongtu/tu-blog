/**
 * Created by zenghongtu on 13/09/2018.
 * Desc: article
 */

import Router from 'koa-router';
import {baseApi} from '../config';
import jwt from '../middlewares/jwt';
import ArticleControllers from '../controllers/article';
import siteRecord from "../middlewares/siteRecord";

const api = 'articles';

const router = new Router();

router.prefix(`${baseApi}/${api}`);

router.get('/', siteRecord, ArticleControllers.find);

router.post('/', jwt, ArticleControllers.add);

router.get('/:id', siteRecord, ArticleControllers.findById);

router.put('/:id', jwt, ArticleControllers.update);

router.delete('/:id', jwt, ArticleControllers.delete);

export default router;
