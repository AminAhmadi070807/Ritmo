"use strict"

module.exports = async (req, res, next) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        next();
    }
    catch(error) {
        next(error)
    }
}