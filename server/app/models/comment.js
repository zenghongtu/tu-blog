/**
 * Created by zenghongtu on 12/09/2018.
 * Desc: comment
 */


import mongoose from 'mongoose'
import CommentSchema from '../schemas/comment'

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment


