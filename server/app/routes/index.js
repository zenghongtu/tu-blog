/**
 * Created by zenghongtu on 01/09/2018.
 * Desc: 路由入口文件,遍历每个路由文件
 */

import utils from '../utils';

export default function (app) {
    utils.routesLoader(`${__dirname}`).then(routers => {
        routers.forEach(router => {
            app
                .use(router.default.routes())
                .use(router.default.allowedMethods({
                    throw: true
                }))
        })
    })
}

