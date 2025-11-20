"use strict"

module.exports = async (req, res, next) => {
    try {
        return res.redirect('/404.ejs')
    }
    catch (err) {
        // next(err);
    }
}