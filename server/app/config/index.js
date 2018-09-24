/**
 * Created by zenghongtu on 02/09/2018.
 * Desc: server 配置文件
 */

export const port = process.env.PORT || 9000;
export const admin = process.env.NAME || 'tu';
export const password = process.env.PW || '123';
export const connexionString = ("mongodb://localhost:27017/tublog");
export const baseApi = process.env.NODE_ENV === 'development' ? '' : '';
export const secret = 'this is a secret';
export const expires = 60 * 60 * 12;
export const redis = {
    host: process.env.REDIS_TCP_ADDR || '127.0.0.1',
    port: process.env.REDIS__TCP_PORT || 6379,
    password: process.env.REDIS_PASSWORD || '',
    db: 0
};
