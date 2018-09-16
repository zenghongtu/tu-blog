/**
 * Created by zenghongtu on 13/09/2018.
 * Desc: authenticate
 */

import jwt from 'jsonwebtoken';
import User from '../models/user';
import {secret, expires} from '../config'

export default async ctx => {
    const _user = ctx.request.body;
    const name = _user.name;
    const password = _user.password;
    let user = await User.findOne({name: name});
    if (!user) {
        ctx.throw(400, {message: 'Invalid Account'});
    }
    let isMatch = await user.comparePassword(password);
    if (isMatch) {
        ctx.body = {
            token: jwt.sign(
                {
                    id: user._id,
                    name,
                    role: user.role,
                    lastLoginAt: user.updateAt,
                    createAt: user.createAt
                },
                secret,
                {
                    expiresIn: expires
                }
            ),
            isAuthenticated: true,
            message: 'Successful Authentication',
        };
    } else {
        ctx.throw(401, {message: 'Authentication Failed'});

    }
};
