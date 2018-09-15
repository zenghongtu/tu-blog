import Site from "../models/site";
import client from './redis'

/**
 * Created by zenghongtu on 15/09/2018
 * Desc: init
 */

export default () => {
    Site.fetch().then(async (res) => {
        let site = null;
        if (res.length < 1) {
            site = await new Site({"uniqueVisitors": 1, "pageViews": 1}).save();
        } else {
            site = res[0]
        }
        const id = site._id;
        client.set('info_id', id)
    }).catch(e => {
        console.log(e);
    })
}
