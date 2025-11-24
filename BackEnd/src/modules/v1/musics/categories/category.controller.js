"use strict"

const categoryModel = require('./category.model')
const response = require('../../../../helpers/response.helper')
const crypto = require('crypto')
const writeFileIcon = require('../../../../utils/icon.file')

module.exports.create = async (req, res, next) => {
    try {
        let { title, href, icon } = req.body

        const numberOfCategories = await categoryModel.count({raw: true})

        if (+numberOfCategories === 10) return response(res, 200, "The maximum number of categories should be 10.")

        const randomId = crypto.randomBytes(8).toString('hex');

        icon = icon.replace(/^<svg/, `<symbol id="${randomId}"`).replace(/<\/svg>$/, '</symbol>');

        const result = writeFileIcon(icon)

        if (result.status !== 200) return response(res, result.status, result.message)

        await categoryModel.create({
            title,
            href,
            icon: randomId,
        })

        return response(res, 201, "Created category successfully")
    }
    catch (error) {
        next(error)
    }
}

module.exports.getAll = async (req, res, next) => {
    try {
        const categories = await categoryModel.findAll({ raw: true })

        return response(res, 200, null, { categories })
    }
    catch (error) {
        next(error)
    }
}