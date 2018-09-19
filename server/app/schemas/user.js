/**
 * Created by zenghongtu on 12/09/2018.
 * Desc: user
 */
import mongoose from "mongoose";
import bcryptjs from 'bcryptjs'
import bcrypt from '../utils/bcrypt'
import {admin} from "../config";

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const UserSchema = new Schema({
    name: {
        unique: true,
        type: String
    },
    ip: String,
    email: String,
    password: String,
    visits: {
        type: Number,
        default: 1,
    },
    role: {
        type: Number,
        default: 0,
    },
    agent: {
        browser: String,
        version: String,
        os: String,
        platform: String,
    },
    comments: [{
        type: ObjectId,
        ref: 'Comment',
    }]
}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}});

UserSchema.pre('save', function (next) {
    var user = this;
    if (user.name === admin) {
        bcrypt(user.password).then(password => {
            user.password = password;
            next()
        }).catch(err => {
            next(err);
        });
    } else {
        user.name += Math.floor(Math.random() * 1e6);  // 避免用户名重复
        next()
    }

});

UserSchema.methods = {
    comparePassword: async function (password) {
        try {
            return await bcryptjs.compare(password, this.password)
        } catch (e) {
            console.log(e)
        }
    }
};

UserSchema.statics = {
    fetch: function (limit, page, field = '') {
        return this
            .find({})
            .skip(page)
            .limit(limit)
            .sort('-createdAt')
            .select(field)
            .sort('-createdAt')
            .populate('comments', 'content')
            .exec()
    },
    findById: function (id) {
        return this
            .findOne({_id: id})
            .populate('comments', 'content')
            .exec()
    }
};

export default UserSchema
