"use strict"

const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

module.exports = (filename) => {
    return multer.diskStorage({
        destination: (req, file, cb) => cb(null, path.join(__dirname,'../../public/uploads/', filename)),
        filename: (req, file, cb) => {
            const fileName = `${Date.now()}-${crypto.createHash('sha256').update(file.originalname).digest('hex')}${path.extname(file.originalname)}`
            return cb(null, fileName)
        }
    })
}
