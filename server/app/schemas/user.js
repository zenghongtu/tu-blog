/**
 * Created by zenghongtu on 12/09/2018.
 * Desc: user
 */
import mongoose from "mongoose";

const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
    name: {
        unique: true,
        type: String
    },
    email: String,
    password: String,
    role: {
        type: Number,
        default: 0
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

    if (user.role === 99) {
        bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                next()
            })
        })
    } else {
        next()
    }

});

UserSchema.methods = {
    comparePassword: async function (password) {
        try {
            return await bcrypt.compare(password, this.password)
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
