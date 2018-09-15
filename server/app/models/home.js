/**
 * Created by zenghongtu on 01/09/2018.
 * Desc: 首页
 */

import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    totalPopulation: {
        type: Number,
        required: true
    },
    country: String,
    zipCode: Number,
    updated: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('City', citySchema);
