"use strict"

module.exports = async (req, res, next) => {
    try {
        return res.redirect('/404')
    }
    catch (err) {
        // next(err);
    }
}