/**
 * Created by zenghongtu on 12/09/2018
 * Desc: book
 */

import mongoose from 'mongoose'
import {BookSchema} from '../schemas/'

const Book = mongoose.model('Book', BookSchema);

export default Book
