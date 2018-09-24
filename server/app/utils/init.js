/**
 * Created by zenghongtu on 24/09/2018
 * Desc: init
 */

import client from "./redis";
import {
    admin,
    password
} from '../config'
import User from "../models/user";

export default async () => {
    await client.set('start_time', new Date().toISOString());
    await new User({name: admin, password: password, role: 99}).save();
}
