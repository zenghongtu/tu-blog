/**
 * Created by zenghongtu on 24/09/2018
 * Desc: init
 */

import client from "./redis";

export default async () => {
    await client.set('start_time', new Date().toISOString())
}
