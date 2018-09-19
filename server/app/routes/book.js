/**
 * Created by zenghongtu on 13/09/2018
 * Desc: book
 */

import Router from 'koa-router';
import {baseApi} from '../config';
import jwt from '../middlewares/jwt';
import BookControllers from '../controllers/book';
import record from "../middlewares/record";

const api = 'books';

const router = new Router();

router.prefix(`${baseApi}/${api}`);

router.get('/', record, BookControllers.find);

router.post('/', jwt, BookControllers.add);

router.get('/:id', BookControllers.findById);

router.put('/:id', jwt, BookControllers.update);

router.delete('/:id', jwt, BookControllers.delete);

export default router;
