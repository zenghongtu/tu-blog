/**
 * Created by zenghongtu on 19/09/2018.
 * Desc: date
 */

export default () => {
    const d = new Date();
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
}
