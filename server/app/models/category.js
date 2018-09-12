/**
 * Created by zenghongtu on 12/09/2018.
 * Desc: category
 */

import mongoose from 'mongoose'
import {CategorySchema} from '../schemas/'

const Category = mongoose.model('Category', CategorySchema);

export default Category
