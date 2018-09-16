/**
 * Created by zenghongtu on 16/09/2018
 * Desc: bcrypt
 */

import bcrypt from 'bcryptjs';

const SALT_WORK_FACTOR = 10;

export default async (password) => {
    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        return await bcrypt.hash(password, salt)
    } catch (e) {
        throw new Error(e)
    }
}

