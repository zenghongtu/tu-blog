/**
 * Created by zenghongtu on 12/09/2018.
 * Desc: article
 */

import mongoose from 'mongoose'
import ArticleSchema from '../schemas/article'

const Article = mongoose.model('Article', ArticleSchema);

export default Article


