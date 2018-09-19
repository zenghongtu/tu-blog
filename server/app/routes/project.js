/**
 * Created by zenghongtu on 13/09/2018
 * Desc: project
 */

import Router from 'koa-router';
import {baseApi} from '../config';
import jwt from '../middlewares/jwt';
import ProjectControllers from '../controllers/project';
import record from "../middlewares/record";

const api = 'projects';

const router = new Router();

router.prefix(`${baseApi}/${api}`);

router.get('/', record, ProjectControllers.find);

router.post('/', jwt, ProjectControllers.add);

router.get('/:id', record, ProjectControllers.findById);

router.put('/:id', jwt, ProjectControllers.update);

router.delete('/:id', jwt, ProjectControllers.delete);

export default router;
