/**
 * Created by zenghongtu on 12/09/2018.
 * Desc: site
 */

import mongoose from 'mongoose'
import SiteSchema from '../schemas/site'

const Site = mongoose.model('Site', SiteSchema);

export default Site
