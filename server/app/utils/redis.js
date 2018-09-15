import Redis from "ioredis";
import {redis} from "../config";

/**
 * Created by zenghongtu on 15/09/2018
 * Desc: redis
 */

const client = new Redis(redis);

export default client
