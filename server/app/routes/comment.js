/**
 * Created by zenghongtu on 13/09/2018
 * Desc: comment
 */


import Router from 'koa-router';
import {baseApi} from '../config';
import jwt from '../middlewares/jwt';
import CommentControllers from '../controllers/comment';

const api = 'comments';

const router = new Router();

router.prefix(`${baseApi}/${api}`);

router.get('/', CommentControllers.find);

router.post('/', CommentControllers.add);

router.get('/:id', CommentControllers.findById);

router.put('/:id', jwt, CommentControllers.update);

router.delete('/:id', jwt, CommentControllers.delete);

export default router;
