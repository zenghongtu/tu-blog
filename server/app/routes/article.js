/**
 * Created by zenghongtu on 13/09/2018.
 * Desc: article
 */

import Router from 'koa-router';
import {baseApi} from '../config';
import jwt from '../middlewares/jwt';
import ArticleControllers from '../controllers/article';
import record from "../middlewares/record";

const api = 'articles';

const router = new Router();

router.prefix(`${baseApi}/${api}`);

router.get('/', record, ArticleControllers.find);

router.post('/', jwt, ArticleControllers.add);

router.get('/:id', record, ArticleControllers.findById);

router.put('/:id', jwt, ArticleControllers.update);

router.delete('/:id', jwt, ArticleControllers.delete);

export default router;
