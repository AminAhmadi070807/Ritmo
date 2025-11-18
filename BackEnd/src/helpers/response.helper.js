"use strict"

module.exports = async (res, status, message, data) => {
    try {
        return res.status(status).json({ status, message, data });
    }
    catch(error) {
        return res.status(500).json({ status: 500, message: "OoOps unknown server error" });
    }
}