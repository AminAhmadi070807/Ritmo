"use strict"

const fs = require('fs');

module.exports = async (baseFile, route) => {
    try {
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