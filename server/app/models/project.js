/**
 * Created by zenghongtu on 12/09/2018
 * Desc: project
 */

import mongoose from 'mongoose'
import ProjectSchema from '../schemas/project'

const Project = mongoose.model('Project', ProjectSchema);

export default Project
