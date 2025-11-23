"use strict"

const categoryModel = require('./category.model')
const response = require('../../../../helpers/response.helper')

const formatFile = [
    "image/svg",
    "image/svg+xml",
    "image/svg+xml-compressed",
]

module.exports.create = async (req, res, next) => {
    try {
        const { title, href } = req.body

        const numberOfCategories = await categoryModel.count({raw: true})

        if (+numberOfCategories === 10) return response(res, 200, "The maximum number of categories should be 10.")

        if (!req.file) return response(res, 400, "icon is required")

        if (!formatFile.includes(req.file.mimetype)) return response(res, 422, "only valid format must be (svg, svg+xml, svg+xml-compressed)")

        const filename = req.file.filename

        console.log(filename)
    }
    catch (error) {
        next(error)
    }
}