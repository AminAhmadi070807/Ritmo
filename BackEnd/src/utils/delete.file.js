"use strict"

const fs = require('fs');

module.exports = async (baseFile, route) => {
    try {
        console.log(baseFile, route)
        if (!baseFile || !route) return { status: 422, message: "baseFile and fileName is required" }

        const isAvailableFile = fs.existsSync(`${baseFile}/${route}`)

        if (isAvailableFile) {
            fs.unlinkSync(`${baseFile}/${route}`)
            return { status: 200, message: "deleted file successfully" }
        }
        else return { status: 404, message: "File not available. or already deleted." }
    }
    catch (error) {
        console.log(error)
        return { status: 500, message: error.message || "Problem deleting file" }
    }
}