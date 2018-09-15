/**
 * Created by zenghongtu on 12/09/2018.
 * Desc: tag
 */

/**
 * Created by zenghongtu on 12/09/2018.
 * Desc: category
 */

import mongoose from 'mongoose'
import TagSchema from '../schemas/tag'

const Tag = mongoose.model('Tag', TagSchema);

export default Tag
