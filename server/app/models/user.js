/**
 * Created by zenghongtu on 12/09/2018.
 * Desc: user
 */
import mongoose from 'mongoose'
import UserSchema from '../schemas/user'

const User = mongoose.model('User', UserSchema);

export default User
