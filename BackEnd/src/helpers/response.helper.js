"use strict"

module.exports = async (req, res, status, message, route) => {
    try {
        req.flash(status > 199 && status < 300 ? "success": "error", message)
        return res.redirect(route)
    }
    catch(error) {
        return res.status(500).json({ status: 500, message: "OoOps unknown server error" });
    }
}