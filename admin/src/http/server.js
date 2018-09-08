/**
 * Created by zenghongtu on 09/09/2018
 * Desc: server
 */

import $ajax from './config'

export const getSiteInfo = () => {
    return $ajax.get('/siteInfo')
};
