/**
 * Created by zenghongtu on 01/09/2018.
 * Desc: 遍历 routes 目录下的路由文件
 */

import glob from 'glob'

export default function (dirname) {
    return new Promise((resolve, reject) => {
        const routers = [];
        glob(
            `${dirname}/*`,
            {ignore: '**/index.js'},
            (err, files) => {
                if (err) {
                    reject(err)
                }
                files.forEach(file => {
                    const router = require(file);
                    routers.push(router)
                });
                resolve(routers)
            }
        )
    })
}
