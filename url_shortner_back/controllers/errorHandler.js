'use strict';

exports.handle = (err, res, code) => {
    console.log('error => ', err);
    return res.status(code).json({ error: err });
};