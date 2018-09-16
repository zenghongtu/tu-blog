/**
 * Created by zenghongtu on 12/09/2018.
 * Desc: user
 */
import mongoose from "mongoose";

import bcryptjs from 'bcryptjs'
import bcrypt from '../utils/bcrypt'

const UserSchema = new mongoose.Schema({
    name: {
        unique: true,
        type: String
    },
    ip: String,
    email: String,
    password: String,
    role: {
        type: Number,
        default: 0
    },
    agent: {
        browser: String,
        version: String,
        os: String,
        platform: String,
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }

    if (user.name === 'tu') {
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
    fetch: function () {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec()
    },
    findById: function (id) {
        return this
            .findOne({_id: id})
            .exec()
    }
};

export default UserSchema
