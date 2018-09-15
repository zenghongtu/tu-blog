import jwt from 'koa-jwt';
import {secret} from '../config'

export default jwt({
    secret
});
