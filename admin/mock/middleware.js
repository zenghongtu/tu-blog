/**
 * Created by zenghongtu on 11/09/2018.
 * Desc: middleware
 */


module.exports = (req, res, next) => {
    if (req.method === 'POST' || req.method === 'PUT') {
        res.status(200).json(req.body);
    } else {
        next();
    }
};
